import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import PostDetails from './components/PostDetails';


export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/create" element={<CreatePost />} />
            <Route path="/post/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
