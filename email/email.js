/**
 * This is the email router. It handles the requests for routes email/*
 * 
 * uri's are relative to email/*
 * so 'email/contact' looks like '/contact' here 
 */
const emailRouter = require('express').Router();
/** Package for sending emails */
const { createTransport } = require('nodemailer');
/** Validators for post requests */
const { body, validationResult } = require('express-validator');

/** The address to send all emails */
const fromEmail = `"Website Contact" ${process.env.FROM_EMAIL}`;
/** The transporter for sending all emails */
const transport = createTransport({
	service: process.env.EMAIL_SERVICE,
	auth: {
		user: process.env.FROM_EMAIL,
		pass: process.env.EMAIL_PASSWORD
	}
});
// get the email html templates
const emailTemplates = require('./email-template');

/**
 * Sends a contact email from a user to us here at codexist
 * 
 * 200 - success
 * 422 - invalid params
 * 500 - server error 
 * 
 * @param {string}  req.body.name
 * @param {string}  req.body.email
 * @param {string}  req.body.message
 */
emailRouter.post('/contact', [
	body('name')
		.trim()
		.exists().withMessage('Required')
		.isLength({ max: 60 }).withMessage('Must not exceed 60 characters'),
	body('message')
		.trim()
		.exists().withMessage('Required')
		.isLength({ max: 500 }).withMessage('Must not exceed 500 characters'),
	body('email')
		.exists().withMessage('Required')
		.isEmail().withMessage('Please enter a valid email address')
		.isLength({ max: 320 }).withMessage('Must not exceed 320 characters')
], (req, res) => {
	try {
		/** handle errors (if any) from the express-validator */
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json(errors.array());

		// Send the email
		transport.sendMail({
			from: fromEmail,
			to: 'jakejohnson05@gmail.com' || process.env.TO_EMAIL,
			subject: 'Contact from your website',
			html: emailTemplates.genContactEmail(req.body.name, req.body.email, req.body.message, req.body.company, req.body.url)
		}).then(_ => res.status(200).json({ sucess: true })
		).catch(_ => res.status(500).json('Issue sending email'))

	} catch (err) { return res.status(500).json('Issue with the contact route' + 'Issue sending email') }
});


module.exports = { emailRouter };
