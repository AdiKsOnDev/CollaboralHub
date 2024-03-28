import React, { useState, useContext, useEffect } from 'react';
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

import { ReactComponent as ProfileSVG } from "../Assets/Profile_Button.svg";
import { auth, database } from "../firebase.js";
import LogoutButton from "./LogoutButton.js";
import { AuthContext } from "../context/AuthContext";

function ProfilePicture({ pfp }) {
  const { currentUser } = useContext(AuthContext);
  const [handle, setHandle] = useState("");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const getHandle = async () => { 
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();

      setHandle("/DisplayProfile?handle=" + user.displayName);
    }

    getHandle();
  }, [currentUser]);

  const handleToggle = () => {
    setMenu(menu ? false : true)
  }

  return (
    <div>
      <img data-testid="PFP" src={pfp} alt="profile img" className="rounded-full w-12 h-12 border-accent-red border-4" onClick={handleToggle} />

      <ul className={`${!menu ? "hidden" : "absolute top-24 right-0" }`}> 
         <li className="w-full py-5 text-white flex bg-secondary justify-center font-semibold rounded-t-xl hover:bg-placeholder duration-300" ><a className="flex justify-center items-center" href={handle}><ProfileSVG className="w-6 h-6 mr-3"/>Profile</a></li>
         <li className="py-5 px-12 bg-accent-red rounded-b-xl hover:bg-accent-blue duration-300 font-semibold"><LogoutButton auth={ auth } /></li>
       </ul>
    </div>
  );
};

export default ProfilePicture;
