'use client';
import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import InfiniteScroll from 'react-infinite-scroll-component';

async function getPosts() {
  const querySnapshot = await getDocs(collection(database, "Posts"));
  const post=[];

  querySnapshot.forEach((doc) => {
    post.push({ id:doc.id, ...doc.data() });
    // console.log(doc.id, ' => ', doc.data());
  })
  return post;
}

const PostHolder= () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const post = await getPosts();
      setPostData(post);
    }
    fetchData();
  }, []);

  return (
      <div className="flex flex-col justify-center items-center text-white px-10">
          <InfiniteScroll dataLength={postData.length} >
              {postData.map((post) => (
                  <div className="bg-secondary p-10 flex- rounded-xl mb-5">
                    <div className="flex flex-row items-center mb-5">
                      <img src="" alt="profile img" className="rounded-full w-16 h-16 mr-5 border-accent-red border-4"/>          
                      <p className="font-semibold text-xl"> {post.userName}</p>
                    </div>
                    <div className="flex justify-center w-full">
                      <p className="w-2/3">{post.postBody}</p>
                    </div>
                  </div>
              ))}
          </InfiniteScroll>
      </div>
  );
};

  export default PostHolder;
