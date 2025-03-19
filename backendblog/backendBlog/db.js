const mysql = require("mysql2");
const util = require('util');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SwartsLD123',
    database: 'projectdb',
    connectTimeout: 10000 // Timeout in milliseconds (10 seconds)
});

// Convert db.query to a Promise-based function
const dbQuery = util.promisify(connection.query).bind(connection);

// Check connection to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Export dbQuery for use in other files
module.exports = { dbQuery };
