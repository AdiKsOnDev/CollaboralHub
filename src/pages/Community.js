import React from 'react';
import PostHolder from "../components/PostHolder";
import NewPost from "../components/NewPost";
import NewsFeed from "../components/NewsFeed";
// import Navbar from './components/Navbar.js';
import StatusBar from "../components/StatusBar";
export default function Community() {

  return (
    <div className="w-full flex items-center justify-center overscroll-contain">
        <StatusBar /> 
        <NewPost />
        <PostHolder />
        <NewsFeed />
    </div>
  );
};