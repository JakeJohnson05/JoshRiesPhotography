/*
 * app.js is the entry point to the program. It creates an express server which
 * serves and angular application.
 */

// Configure environment vars
require('dotenv').config();

/** Server for the app and serves compiled angular output */
const express = require('express');
/** Establishes session with the client with cookies */
const session = require('express-session');
/** Store session data in the database */
const SequelizeStore = require('connect-session-sequelize')(session.Store);
/** The Sequelize ORM instance to the mysql database */
const { sequelize } = require('./database');

// Other Imports
const path = require('path');
const http = require('http');
const helmet = require('helmet');
const bodyParser = require('body-parser');
/** Router for the sending of emails */
const { emailRouter } = require('./email/email');

/** The express application */
const app = express();

////////////////////////////////////////////////////////////////////////
// Middleware

// parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/** The number of milliseconds in one hour */
const msInHour = 3600000;
/** The store for the session */
const sessionStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: msInHour * 24
});
// set up the session and config for cookies
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    sameSite: true,
    secure: false,
    maxAge: msInHour * 5,
    httpOnly: true
  }
}));
// Create/Sync tables for the session
sessionStore.sync();
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

/** define the port from environment || 3000 */
const port = process.env.PORT || '3000';
// const hostname = '127.0.0.1';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server running on localhost:${port}`));

// if running in production, listen on the hostname, instead of localhost
// if (!process.env.DEV) server.listen(port, hostname, () => console.log(`Server running on https://${hostname}:${port}`));
// else server.listen(port, () => console.log(`Server running on localhost:${port}`));
