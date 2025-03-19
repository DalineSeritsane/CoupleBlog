require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./backendBlog/routes/users');
const blogRoutes = require('./backendBlog/routes/blogs');


//Allow requests from your frontend URL
// app.use(cors({
//   origin: 'http://localhost:3000', // Your frontend URL
//   credentials: true,
// }));

const app = express();
const PORT = process.env.PORT;

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); //to parse JSON requests


//server static file
app.use('/uploads', express.static('uploads'));

//Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:7412`);
});