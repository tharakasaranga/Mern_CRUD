import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts = () => {
    axios
      .get('http://localhost:5000/posts')
      .then((res) => {
        if (res.data.success) {
          this.setState({ posts: res.data.existingPosts });
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  };

  handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios
        .delete(`http://localhost:5000/post/delete/${id}`)
        .then(() => {
          alert('Post Deleted Successfully!');
          this.retrievePosts(); // Refresh the posts list
        })
        .catch((error) => console.error('Error deleting post:', error));
    }
  };

  render() {
    return (
      <div>
        <div className="container mt-4">
          <h1 className="mb-4 text-center">Posts</h1>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Post Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.posts.map((post, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        to={`/post/${post._id}`}
                        className="text-decoration-none"
                      >
                        {post.topic}
                      </Link>
                    </td>
                    <td>{post.description}</td>
                    <td>{post.postCategory}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <Link
                          to={`/post/edit/${post._id}`}
                          className="btn btn-warning btn-sm me-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => this.handleDelete(post._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-3">
            <Link to="/post/create" className="btn btn-primary">
              Add New Post
            </Link>
          </div>
        </div>
      </div>
    );
  }
}