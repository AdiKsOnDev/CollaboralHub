import React from 'react';
import PostHolder from "../components/PostHolder";
import NewPost from "../components/NewPost";
import NewsFeed from "../components/NewsFeed";
import Navbar from '../components/Navbar.js';
import StatusBar from "../components/StatusBar";
export default function Community() {

  return (
    <div className="w-screen h-screen flex flex-row">
      <Navbar />

      <div className="w-full">
        <StatusBar />

        <div className="flex flex-row p-5 h-90">
          <div className="flex flex-col w-full">
            <NewPost />
            <PostHolder />
          </div>

        <NewsFeed />
        </div>
      </div>
    </div>
  );
};
