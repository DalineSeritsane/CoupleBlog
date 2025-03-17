const API_URL = "http://localhost:7412/posts";

const defaultHeaders = {
  "Content-Type": "application/json",
};

// Handle API errors
const handleErrors = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }
  return response.json();
};

// Fetch all blog posts
export const fetchPosts = async () => {
  try {
    const response = await fetch(API_URL);
    return await handleErrors(response);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};

// Create a new blog post
export const createPost = async (postData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(postData),
    });
    return await handleErrors(response);
  } catch (error) {
    console.error("Failed to create post:", error);
  }
};

// Fetch a single post by ID
export const fetchPostById = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/${postId}`);
    return await handleErrors(response);
  } catch (error) {
    console.error("Failed to fetch post:", error);
  }
};

// Update a blog post
export const updatePost = async (postId, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/${postId}`, {
      method: "PUT",
      headers: defaultHeaders,
      body: JSON.stringify(updatedData),
    });
    return await handleErrors(response);
  } catch (error) {
    console.error("Failed to update post:", error);
  }
};

// Delete a blog post
export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/${postId}`, {
      method: "DELETE",
    });
    return await handleErrors(response);
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
};

// Post a comment to a blog post
export const postComment = async (postId, commentData) => {
  try {
    const response = await fetch(`${API_URL}/${postId}/comments`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(commentData),
    });
    return await handleErrors(response);
  } catch (error) {
    console.error("Failed to post comment:", error);
  }
};