/*
 * app.js is the entry point to the program. It creates an express server which
 * serves and angular application.
 */

// configure environment vars
require('dotenv').config();

// imports
const express = require('express');
const path = require('path');
const http = require('http');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { emailRouter } = require('./email/email');

/** The express application */
const app = express();

////////////////////////////////////////////////////////////////////////
// Middleware

// parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// protect against dangerous web vulnerabilities
app.use(helmet());

////////////////////////////////////////////////////////////////////////
// Routes

// point static paths to dist
app.use(express.static(path.join(__dirname, 'dist/joshRiesPhotography/')));
// use the emailRouter for emailing
app.use('/email', emailRouter);
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/joshRiesPhotography/index.html'));
});

////////////////////////////////////////////////////////////////////////
// Start up the Node Server

/** define the port from environment (=3000) */
const port = process.env.PORT || '3000';
// const hostname = '127.0.0.1';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server running on localhost:${port}`));

// if running in production, listen on the hostname, instead of localhost
// if (!process.env.DEV) server.listen(port, hostname, () => console.log(`Server running on https://${hostname}:${port}`));
// else server.listen(port, () => console.log(`Server running on localhost:${port}`));
