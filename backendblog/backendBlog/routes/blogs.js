const express = require('express');
const pool = require('../db');

// GET /api/blogs - Fetch all blog posts
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM blogs');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/blogs - Create a new blog post
app.post('/', async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO blogs (title, content) VALUES (?, ?)',
      [title, content]
    );
    res.status(201).json({ id: result.insertId, title, content });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;