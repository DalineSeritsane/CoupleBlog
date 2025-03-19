require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./backendBlog/routes/users');
const blogRoutes = require('./backendBlog/routes/blogs');

const app = express();


// Enable CORS for specific frontend URL
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL (Uncomment and modify as needed)
  credentials: true,
}));


const PORT = process.env.PORT || 7412;  // Default to 7412 if PORT is not set

// Middleware
app.use(bodyParser.json());  // Parse incoming JSON requests

// Serve static files (like images) from the uploads folder
app.use('/uploads', express.static('uploads'));

// Routes for user and blog handling
app.use('/api', userRoutes);
app.use('/api', blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
