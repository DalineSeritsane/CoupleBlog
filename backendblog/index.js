const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require("mysql");
const userRoutes = require('../backendblog/backendBlog/routes/users');  //path of users
const blogsRoutes = require('../backendblog/backendBlog/routes/blogs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT ; 

app.use(cors());
app.use(express.json());

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

//Connect to db
const db = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  port:process.env.DB_PORT,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
})

//Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
  

//Get all posts
app.get("/posts", (req, res) => {
  const sql = "SELECT * FROM posts";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//Get a single post by ID
app.get("/posts/:id",(req, res) =>{
  const { id } = req.params;
  db.query("SELECT * FROM posts WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching post:", err);
      return res.status(500).json({ message: "Error fetching post" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(results[0]);
  });
});


//POST blogs
app.post("/posts", (req, res) => {
  const sql = "INSERT INTO blogs (`title`, `content`, `comment`) VALUES (?)";
  const blogs = [
    req.body.title,
    req.body.content,
    req.body.comment,
  ];

  db.query(sql, [blogs], (err, result) => {
    if (err) return res.json({ error: err });
    return res.json({ 
      id: data.insertId,
      title:req.body.title,
      content: req.body.content,
      comment:req.body.comment,
      message: "Blog added successfully!", result });
  });
});
 //Edit data for blog[']

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body; // Extract title and content from request body

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const sql = "UPDATE blogs SET title = ?, content = ? WHERE id = ?";
  db.query(sql, [title, content, id], (err, result) => {
    if (err) {
      console.error("Error updating blog:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ message: "Blog updated successfully", updatedId: id });
  });
});


//DELETE blog
app.delete("/posts/:id", (req, res)=> {
  const id= req.params.id;
  const sql= "DELETE FROM "
})

// Routes
app.use('/api/users'); 
app.use('/api/blogs'); //for '/api/blogs' endpoints

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});