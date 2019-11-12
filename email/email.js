/**
 * This is the email router. It handles the requests for routes email/*
 * On this small app, it just makes the send email contact request
 * 
 * uri's are relative to `email/*` so `email/contact` looks like `/contact` here
 */
const emailRouter = require('express').Router();
/** Package for sending emails */
const { createTransport } = require('nodemailer');
/** Validators for post requests */
const { body, validationResult } = require('express-validator');
/** Contains functions which generate email html */
const emailTemplates = require('./email-template');

/** The from address when sending emails */
const fromEmail = `"Website Contact" ${process.env.FROM_EMAIL}`;
/** The email transporter */
const transport = createTransport({
	service: process.env.EMAIL_SERVICE,
	auth: {
		user: process.env.FROM_EMAIL,
		pass: process.env.FROM_EMAIL_PASSWORD
	}
});

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
		.exists({ checkFalsy: true }).withMessage('required')
		.isLength({ max: 60 }).withMessage('maxlength'),
	body('message')
		.trim()
		.exists({ checkFalsy: true }).withMessage('required')
		.isLength({ max: 500 }).withMessage('maxlength'),
	body('email')
		.exists({ checkFalsy: true }).withMessage('required')
		.isEmail().withMessage('email')
		.isLength({ max: 320 }).withMessage('maxlength')
], (req, res) => {
	try {
		/** Contains the errors (if any) from the express-validator */
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json(errors.array());

		// Send the email
		transport.sendMail({
			from: fromEmail,
			to: process.env.FROM_EMAIL,
			subject: 'Contact from your website',
			html: emailTemplates.genContactEmail(req.body.name, req.body.email, req.body.message, req.body.company, req.body.url)
		}).then(_ => res.status(200).json({ sucess: true })
		).catch(_ => res.status(500).json('Issue sending email'))

	} catch (err) { return res.status(500).json('Issue sending email') }
});


module.exports = { emailRouter };
