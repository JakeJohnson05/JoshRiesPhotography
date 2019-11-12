/** Sequelize is the ORM we are using to interact with the database */
const Sequelize = require('sequelize');

/** The MySql database is running on localhost on the server */
var dbhost = 'localhost';
/** The title of the database */
const database = process.env.DB;
/** Credentials to log into the database */
const dbCreds = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD
}

/** Established connection instance with the database */
const sequelize = new Sequelize(database, dbCreds.username, dbCreds.password, {
	host: dbhost,
	dialect: 'mysql',
	logging: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

// Test the established connection
sequelize.authenticate()
	.then(_ => console.log('Connection established to database'),
		err => console.error('Unable to establish connection to the database:', err));

// Sync the database
sequelize.sync()
	.then(_ => console.log('Database successfully synced'),
		err => console.error('Could not sync with the database:', err));


module.exports = { sequelize }
