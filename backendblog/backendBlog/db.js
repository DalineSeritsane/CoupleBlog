const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: 'SwartsLD123', 
    database: 'projectdb'
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the MySQL database');
  });
  
  module.exports = connection;