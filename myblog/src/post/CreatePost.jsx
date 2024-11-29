import React, { useState } from 'react';
import axios from 'axios';
import './Createpost.css';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('author', author);
        formData.append('date', date);
        formData.append('shortDescription', shortDescription);
        formData.append('content', content);
        if (image) {
            if (!image.type.startsWith("image/")) {
                setError('Only image files are allowed');
                return;
            }
            formData.append('image', image);
        }
        formData.append('comments', JSON.stringify([]));

        try {
            const response = await axios.post('http://localhost:5000/api/blogs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Blog created successfully!');
            setError('');
            // Clear the form fields
            setTitle('');
            setAuthor('');
            setDate('');
            setShortDescription('');
            setContent('');
            setImage(null);
        } catch (err) {
            setError('Error creating blog. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="create-blog container my-5">
            <h2 className="text-center">Create a New Blog</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Short Description"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Blog Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
