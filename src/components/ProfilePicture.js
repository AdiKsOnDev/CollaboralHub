import { useContext } from 'react';
import React, { useState, useEffect } from 'react';

import { ReactComponent as ProfileSVG } from "../Assets/Profile_Button.svg";
import { collection, doc, getDoc } from "firebase/firestore";
import { database } from "../firebase.js";
import { AuthContext } from '../context/AuthContext';
import { auth } from "../firebase.js";
import LogoutButton from "./LogoutButton.js";
import { useNavigate } from 'react-router-dom';

function ProfilePicture() {
  const navigate= useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(""); 
  const routeChange = () =>{ 
    navigate("/DisplayProfile");
  };

  useEffect(() => {
    const getUser = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();

      setUserData(user);
      console.log(userData.profileImg);
    }

    getUser();
  }, [currentUser])

  const [menu, setMenu] = useState(false);

  const handleToggle = () => {
    setMenu(menu ? false : true)
  }

  return (
    <div>
      <img src={userData.profileImg} alt="profile img" className="rounded-full w-12 h-12 border-accent-red border-4" onClick={handleToggle} />

      <ul className={`${!menu ? "hidden" : "absolute top-24 right-0" }`}> 
         <li className="w-full py-5 text-white flex bg-secondary justify-center font-semibold rounded-t-xl hover:bg-placeholder duration-300" onClick={routeChange} ><ProfileSVG className="w-6 h-6 mr-3"/>Profile</li>
         <li className="py-5 px-12 bg-accent-red rounded-b-xl hover:bg-accent-blue duration-300 font-semibold"><LogoutButton auth={ auth } /></li>
       </ul>
    </div>
  );
};

export default ProfilePicture;
