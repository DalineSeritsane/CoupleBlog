const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json()); // To parse JSON request body
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request body

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting:', error);
    return;
  }
  console.log('Connected as ID ' + connection.threadId);
});

const upload = multer({
  dest: './uploads/',
  limits: { fileSize: 1000000 } // 1MB file size limit
});

app.post('/api/register', upload.single('image'), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || !req.file) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const image = req.file.filename;

    const query = "INSERT INTO users (name, email, password, image) VALUES (?, ?, ?, ?)";
    connection.query(query, [name, email, hashedPassword, image], (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).send({ message: 'Error inserting data' });
      }
      res.send({ message: 'User registered successfully' });
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
