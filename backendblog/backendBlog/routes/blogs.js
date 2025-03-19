const express = require('express');
const multer = require('multer');
const db = require('../db');
const path = require('path');
const fs = require('fs');

const router = express.Router(); 

// Set storage engine for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Upload folder
  },
  filename: (req, file, cb) => {
    const imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  }
});

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit size to 1MB
}).single('image');

//  GET /api/blogs - Fetch all blog posts
router.get('/', async (req, res) => {
  try {
    const [posts] = await db.query('SELECT * FROM projectdb.posts');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

//  GET /api/blogs/:id - Get post by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [posts] = await db.query('SELECT * FROM projectdb.posts WHERE id = ?', [id]);
    if (!posts.length) return res.status(404).json({ message: 'Blog not found' });
    res.json(posts[0]); // Fixed variable typo from `post[0]` to `posts[0]`
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching blog post' });
  }
});

// POST /api/blogs - Create a new blog post
router.post('/', upload, async (req, res) => {
  const { title, author, shortDescription, content } = req.body;
  const imageName = req.file ? req.file.filename : '';
  const date = new Date().toISOString();

  try {
    const [result] = await db.query(
      'INSERT INTO projectdb.posts (title, author, date, short_description, content, image) VALUES (?, ?, ?, ?, ?, ?)',
      [title, author, date, shortDescription, content, imageName]
    );
    const newBlog = { id: result.insertId, title, author, date, shortDescription, content, image: imageName };
    res.status(201).json({ message: 'Blog created successfully', post: newBlog }); 
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

//  POST /api/blogs/:id/comments - Add a comment
router.post('/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { username, comment } = req.body;
  
  try {
    const [result] = await db.query(
      'INSERT INTO projectdb.comments (posts_id, username, comment_content) VALUES (?, ?, ?)',
      [id, username, comment]
    );
    const newComment = { id: result.insertId, username, comment };
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
});

// POST /api/blogs/:id/comments/:commentId/reply - Add reply to comment
router.post('/:id/comments/:commentId/reply', async (req, res) => {
  const { commentId } = req.params;
  const { username, reply } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO projectdb.replies (comment_id, username, reply_content) VALUES (?, ?, ?)',
      [commentId, username, reply]
    );
    const newReply = { id: result.insertId, username, reply };
    res.status(201).json(newReply);
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ message: 'Error adding reply' });
  }
});

// DELETE /api/blogs/:id/comments/:commentId - Delete a comment
router.delete('/:id/comments/:commentId', async (req, res) => {
  const { commentId } = req.params;

  try {
    await db.query('DELETE FROM projectdb.comments WHERE id = ?', [commentId]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
});


module.exports = router;
