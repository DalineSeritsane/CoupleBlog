const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const bcrypt = require('bcrypt');

// Configure multer for file uploads
const upload = multer({
  dest: './uploads/', // Ensure this directory exists
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  }
});

// POST /api/users/register - Register a new user
router.post('/register', upload.single('image'), async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file ? req.file.filename : null;

  // Validation: Check if all required fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    // Check if the email is already taken
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, image) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, image]
    );

    // Send a response back to the client
    res.status(201).json({
      message: 'User registered successfully',
      userId: result.insertId,
      name,
      email,
      image
    });
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'This email is already taken' });
    }
    res.status(500).json({ message: 'Database error, please try again later' });
  }
});

module.exports = router;
