// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'; // Use env variable for API URL

const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Helper function for error messages
const handleErrors = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }
};

// Fetch all blog posts
export const fetchBlogs = async () => {
  const response = await fetch(`${API_URL}/blogs`);
  await handleErrors(response);
  return await response.json();
};

// Create a new blog post
export const createBlog = async (blogData) => {
  const response = await fetch(`${API_URL}/blogs`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(blogData),
  });
  await handleErrors(response);
  return await response.json();
};

// Fetch a single blog post by ID
export const fetchBlogById = async (id) => {
  const response = await fetch(`${API_URL}/blogs/${id}`);
  await handleErrors(response);
  return await response.json();
};

// Fetch comments for a specific blog post
export const fetchComments = async (blogId) => {
  const response = await fetch(`${API_URL}/blogs/${blogId}/comments`);
  await handleErrors(response);
  return await response.json();
};

// Post a new comment
export const postComment = async (blogId, commentData) => {
  const response = await fetch(`${API_URL}/blogs/${blogId}/comments`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(commentData),
  });
  await handleErrors(response);
  return await response.json();
};
