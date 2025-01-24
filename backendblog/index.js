

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const userRoutes = require('./backendBlog/routes/users');

const blogsRoutes = require('./backendBlog/routes/blogs');

const path = require('path');

require('dotenv').config();



const app = express();

const PORT = process.env.PORT || 5000; // Fallback if .env is missing



app.use(cors());

app.use(bodyParser.json());



// Serve static files from the uploads folder

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle all other requests by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});


// Define routes

app.use('/api/users', userRoutes);

app.use('/api/blogs', blogsRoutes);



app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});



