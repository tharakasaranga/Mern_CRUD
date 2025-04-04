import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    topic: "",
    description: "",
    postCategory: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${id}`)
      .then((res) => {
        if (res.data.success) {
          setPost(res.data.post);
        }
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/post/update/${id}`, post)
      .then((res) => {
        alert("Post updated successfully!");
        navigate("/");
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <div>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Edit Post</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
          <div className="mb-3">
            <label htmlFor="topic" className="form-label">
              Topic:
            </label>
            <input
              type="text"
              name="topic"
              id="topic"
              className="form-control"
              value={post.topic}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={post.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="postCategory" className="form-label">
              Post Category:
            </label>
            <input
              type="text"
              name="postCategory"
              id="postCategory"
              className="form-control"
              value={post.postCategory}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;