import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { database } from "../firebase.js";
import PostHolder from "../components/PostHolder";
import NewPost from "../components/NewPost";
import NewsFeed from "../components/NewsFeed";
import Navbar from '../components/Navbar.js';
import StatusBar from "../components/StatusBar";
import { getAuth, updateProfile } from 'firebase/auth';

export default function Community() {
  const { currentUser } = useContext(AuthContext);
  const [userImg, setUserImg] = useState("lol?");

  useEffect(() => {
    const getFiles = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();
      const auth = getAuth();

      console.log("hao", currentUser.uid)
      updateProfile(auth.currentUser, {
        displayName: user.displayName,
        photoURL: user.profileImg
      })
      setUserImg(user.profileImg)
    }

    getFiles();
  }, [currentUser])

  return (
    <div className="w-screen h-screen flex flex-row">
      <Navbar page="community" />

      <div className="w-full">
        <div className="flex flex-row">
          <StatusBar image={userImg} />
        </div>

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
