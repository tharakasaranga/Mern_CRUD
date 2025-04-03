import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {posts: []};
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts = () => {
    axios.get('http://localhost:5000/posts')
      .then(res => {
        if (res.data.success) {
          this.setState({ posts: res.data.existingPosts });
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };

  render() {
    return (
      <div>
          <NavBar />

        <h1>Posts</h1>
        <table  border="1" cellPadding="5px">
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
              <tr>
                <th>{index+1}</th>
                <td>
                  <a href = {`/post/{posts._id}`} style = {{textDecoration:'none'}}>{post.topic}</a>
                </td>
                <td>{post.description}</td>
                <td>{post.postCategory}</td>
                <td>
                  <div style={{ display: 'flex' }}>
                    <div style={{ marginLeft: '10px' }}>
                      <Link to={`/post/${post._id}`} className="btn btn-warning">Edit</Link>
                    </div>
                    <div style={{ marginLeft: '10px' }}>
                      <Link to={`/post/delete/${post._id}`} className="btn btn-danger">Delete</Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          </table>
          <button><a href="/add" style = {{textDecoration:'none'}}>Add new Post</a></button>

      </div>
    );
  }
}
