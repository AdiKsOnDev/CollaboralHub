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
              <div className="bg-secondary w-full p-7 rounded-xl mb-4">
                <div className="flex flex-row items-center mb-5">
                  <img src="" alt="profile img" className="rounded-full w-16 h-16 mr-5 border-accent-red border-4"/>          
                  <p className="font-semibold text-xl"> {post.userName}</p>
                </div>

                <div className="flex justify-center text-center w-full">
                  <p className="w-2/3">{post.postBody}</p>
                </div>

                <div>

                </div>
              </div>
            ))}
      </div>
  );
};

  export default PostHolder;
