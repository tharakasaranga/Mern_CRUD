import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts = () => {
    axios.get('http://localhost:5000/posts')
      .then(res => {
        if (res.data.success) {
          this.setState(
            { posts: res.data.existingPosts },
            () => console.log(this.state.posts) // Log after state update
          );
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };

  render() {
    return (
      <div>
        <h1>Posts</h1>
        <table border="1" cellpadding="20" cellspacing="5">
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
                <td>{post._id}</td>
                <td>{post.topic}</td>
                <td>{post.description}</td>
                <td>{post.postCategory}</td>
                <td>

                  <div style = {{display:'flex'}}>
                    <div style = {{marginLeft:'10px'}}><a href={`/post/${post._id}`} className="btn btn-warning">Edit</a></div>
                    <div style = {{marginLeft:'10px'}}><a href={`/post/delete/${post._id}`} className="btn btn-danger">Delete</a></div>
                  </div>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
