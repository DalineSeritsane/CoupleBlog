import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './post.css';
import beach from '../Image/beach.jpg'; 


// Default images (placeholders)
const defaultImages = {
  beach: beach,
};

function Post() {
  // States to manage fetched posts, loading state, and error handling
  const [posts, setPosts] = useState([]);  // Initialize posts as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs'); // Replace with actual API endpoint
        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setPosts(response.data);  // Set posts only if the response is an array
        } else {
          setPosts([]);  // In case the response is not an array, set posts as an empty array
        }
      } catch (err) {
        setError('Error fetching posts');
        setPosts([]);  // Ensure posts is always an array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Check that posts is an array before attempting to use .map()
  if (!Array.isArray(posts)) {
    return <div>No posts available</div>;
  }

  return (
    <div className="posts-container">
      {posts.length === 0 ? (
        <div>No posts available</div>  // Handle case with no posts
      ) : (
        posts.map((post, index) => {
          // Fallback to default image if no image URL is provided
          const postImage = post.image ? post.image : defaultImages.beach; // Default to "france" image if no image URL in backend

          return (
            <div className="post" key={index}>
              <img className="postImg" src={postImage} alt={post.title} />
              <div className="postInfo">
                <div className="postCats">
                  {post.categories && post.categories.map((cat, i) => (
                    <span className="postCat" key={i}>{cat}</span>
                  ))}
                </div>
                <span className="postTitle">{post.title}</span>
                <hr />
                <span className="postDate">1 hour ago  {post.date ? post.date : '1 hour ago'}</span> 
              </div>
              <p className="postDesc">
                {post.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga itaque alias architecto, libero facere placeat voluptates! Cum minima sint incidunt id nisi, modi enim ducimus illo sapiente. Labore, doloribus eius.'}
              </p>
              <Link to={`/blog/${post.id}`} className="readMoreLink">
                Read More
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Post;