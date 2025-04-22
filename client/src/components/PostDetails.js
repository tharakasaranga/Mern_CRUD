import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; 


const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${id}`)
      .then((res) => {
        if (res.data.success) {
          setPost(res.data.post);
        }
      })
      .catch((err) => {
        console.error('Error fetching post details:', err);
      });
  }, [id]);

  return (
    <div>
      <div className="container mt-4">
        <h1 className="mb-4 text-center">Post Details</h1>
        {post ? (
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title">{post.topic}</h2>
              <p className="card-text">
                <strong>Description:</strong> {post.description}
              </p>
              <p className="card-text">
                <strong>Category:</strong> {post.postCategory}
              </p>
              <div className="mt-3 text-center">
                <Link to="/" className="btn btn-secondary me-2">
                  Back to Posts
                </Link>
                <Link to={`/post/edit/${id}`} className="btn btn-warning">
                  Edit Post
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading post details...</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;