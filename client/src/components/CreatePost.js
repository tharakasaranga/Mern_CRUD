import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const CreatePost = () => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [postCategory, setPostCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      topic,
      description,
      postCategory,
    };

    try {
      const response = await axios.post('http://localhost:5000/post/save', newPost);
      if (response.data.success) {
        alert('Post added successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Error adding post. Please try again.');
    }
  };

  return (
    <div>

      <div className="container mt-4">
        <h1 className="mb-4 text-center">Add New Post</h1>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
          <div className="mb-3">
            <label htmlFor="topic" className="form-label">
              Topic:
            </label>
            <input
              type="text"
              className="form-control"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="postCategory" className="form-label">
              Post Category:
            </label>
            <input
              type="text"
              className="form-control"
              id="postCategory"
              value={postCategory}
              onChange={(e) => setPostCategory(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Add Post
            </button>
            <Link to="/" className="btn btn-secondary ms-2">Back to Posts</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;