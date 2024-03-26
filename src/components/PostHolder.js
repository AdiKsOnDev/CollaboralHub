import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ReactComponent as HeartSVG } from "../Assets/Like-Icon.svg";
import { database } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

async function getPosts() {

  const querySnapshot = await getDocs(collection(database, "Posts"));
  const post = [];

  querySnapshot.forEach((doc) => {
    post.push({ id: doc.id, ...doc.data() });
    // console.log(doc.id, ' => ', doc.data());
  })
  return post;
}

function PostHolder() {
  const [postData, setPostData] = useState([]);
  const [userData, setUserData] = useState();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const post = await getPosts();
      setPostData(post);
    }
    fetchData();
  }, []);

  const handleLike = async (post) => {
    const postRef = doc(database, "Posts", post.id)

    if (post.likedUsers.includes(userData.email)) {
      console.log(post);
      const updatedLikedUsers = post.likedUsers.filter(email => email !== userData.email);
      await updateDoc(postRef, { likedUsers: updatedLikedUsers, likeCount: post.likeCount - 1 });
      setPostData(await getPosts());
    } else {
      await updateDoc(postRef, { likedUsers: [...post.likedUsers, userData.email], likeCount: post.likeCount + 1 });
      setPostData(await getPosts());
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      setUserData(userSnapshot.data());
    }

    getUser();
  }, [])

  return (
    <div className="flex flex-col h-screen overflow-y-scroll text-white px-10">
      {postData.map((post) => (
        <div className="bg-secondary w-full p-7 rounded-xl mb-12">
          <div className="flex flex-row items-center mb-8">
            <img src={post.userPFP} alt="profile img" className="rounded-full w-16 h-16 mr-5 border-accent-red border-4" />
            <p className="font-semibold text-xl">
              <h1 className="flex flex-col">{post.userName} <span className="italic text-sm">@{post.user}</span></h1>
              <h2 className="text-sm italic font-light">{post.uploaded ? (post.uploaded.toDate().toDateString()) : "Not Accessed"}</h2>
            </p>
          </div>

          <div className="flex justify-center w-full mb-8">
            <p className="w-full">{post.postBody}</p>
          </div>

          <div>
            <p className={"flex justify-start items-center w-full"}>
              <HeartSVG
                onClick={() => handleLike(post)}
                className={`h-7 w-7 mr-2 ${post.likedUsers && post.likedUsers.includes(userData.email) ? 'fill-accent-red' : ''} hover:fill-accent-red duration-300`}
              />
              {post.likeCount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostHolder;
