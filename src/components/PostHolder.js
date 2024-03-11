import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { RotatingLines } from "react-loader-spinner";

import PostBlock from "./PostBlock.js";


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
      <div className="flex flex-col h-screen items-center overflow-y-scroll text-white px-10">
            {postData.map((post) => (
              <PostBlock post={post} /> 
            ))}
      </div>
  );
};

  export default PostHolder;
