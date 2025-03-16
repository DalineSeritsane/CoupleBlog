const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = requir('my')
const userRoutes = require('../backendblog/backendBlog/routes/users');  //path of users
const blogsRoutes = require('../backendblog/backendBlog/routes/blogs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT ; 

// CORS configuration to allow frontend requests
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/blogs', blogsRoutes); //for '/api/blogs' endpoints

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});