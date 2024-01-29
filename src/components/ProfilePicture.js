import { useContext } from 'react';
import React, { useState } from 'react';

import { ReactComponent as ProfileSVG } from "../Assets/Profile_Button.svg";
import { AuthContext } from '../context/AuthContext';
import { auth } from "../firebase.js";
import LogoutButton from "./LogoutButton.js";

function ProfilePicture() {
  try {
    const { currentUser } = useContext(AuthContext);
  } catch(err) {
    console.log("No User");
  } 
  const [menu, setMenu] = useState(false);

  const handleToggle = () => {
    setMenu(menu ? false : true)
  }

  return (
    <div>
      <img src="" alt="profile img" className="rounded-full w-16 h-16 mr-5 border-accent-red border-4" onClick={handleToggle} />

      { menu ? (
        <ul className="fixed z-50 mt-3 right-7 bg-secondary rounded-xl">
          <li className="w-full py-5 text-white flex justify-center font-semibold rounded-t-xl hover:bg-placeholder duration-300"><ProfileSVG className="w-6 h-6 mr-3"/>Profile</li>
          <li className="py-5 px-12 bg-accent-red rounded-b-xl font-semibold"><LogoutButton auth={ auth } /></li>
        </ul>
      ) : (<div className="hidden"></div>) }
    </div>
  );
};

export default ProfilePicture;
