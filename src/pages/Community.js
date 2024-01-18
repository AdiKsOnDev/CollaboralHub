import React from 'react';
// import PostHolder from "../components/PostHolder";
// import NewPost from "../components/NewPost";
// import NewsFeed from "../components/NewsFeed";
import Navbar from "../components/Navbar";
import StatusBar from "../components/StatusBar";
export default function Community() {

  return (
    <div className="w-full h-full flex items-center justify-center overflow-y-auto">
        <Navbar/>
        <StatusBar /> 
        {/* <NewPost />
        <PostHolder />
        <NewsFeed /> */}
    </div>
  );
};