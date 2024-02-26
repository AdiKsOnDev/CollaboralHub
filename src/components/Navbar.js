import LogoPNG from "../Assets/logo.png";
import { ReactComponent as ProjectsSVG } from "../Assets/Navigation-Projects.svg";
import { ReactComponent as CommunitySVG } from "../Assets/Navigation-Community.svg";
import { ReactComponent as NotesSVG } from "../Assets/Navigation-Notes.svg";
import { ReactComponent as PlannerSVG } from "../Assets/Navigation-Planner.svg";
import { ReactComponent as GroupsSVG } from "../Assets/Navigation-Groups.svg";
import { ReactComponent as SettingsSVG } from "../Assets/Navigation-Settings.svg";
import { ReactComponent as MenuBarSVG } from "../Assets/Menu-Bar.svg";

import ProfilePicture from "./ProfilePicture.js";

import { auth } from "../firebase.js";
import React, { useState } from 'react';

function Navbar({ page }) {
  const [menuBar, setMenuBar] = useState(false);

  const toggleMenu = () => {
    setMenuBar(menuBar ? false : true);

    return;
  }

  return (
    <nav className={`flex flex-col justify-start items-center gap-24 ${ !menuBar ? "w-24" : "w-1/4" } h-screen bg-secondary duration-300`}>
      <ul className="flex flex-col justify-center items-center w-full">
        <li className={`w-full flex items-start justify-center mb-14 hover:bg-accent-red duration-300`}>
          <button data-testid="navbar" className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold" onClick={toggleMenu}>
            <MenuBarSVG className="h-12" /> {menuBar ? <h1 className="duration-300">Side Menu</h1> : ""} 
          </button>
        </li>
        <li className={`w-full flex items-start justify-center ${ page === "home" ? "bg-accent-blue" : "" } hover:bg-accent-red duration-300`}>
          <a data-testid="navbar" className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2 duration-300" href="/">
            <ProjectsSVG className="h-12" /> {menuBar ? <h1 className="duration-300">Your Files</h1> : ""}
          </a>
        </li>

        <li className={`w-full flex items-start justify-center ${ page === "community" ? "bg-accent-blue" : "" } hover:bg-accent-red duration-300`}>
          <a data-testid="navbar" className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="/Community">
            <CommunitySVG className="h-12" /> {menuBar ? <h1 className="duration-300">Community Page</h1> : ""}
          </a>
        </li>

        <li className={`w-full flex items-start justify-center ${ page === "notes" ? "bg-accent-blue" : "" } hover:bg-accent-red duration-300`}>
          <a data-testid="navbar" className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="/Notes">
            <NotesSVG className="h-12" /> {menuBar ? <h1 className="duration-300">Sticky Notes</h1> : ""}
          </a>
        </li>

        <li className={`w-full flex items-start justify-center ${ page === "planner" ? "bg-accent-blue" : "" } hover:bg-accent-red duration-300`}>
          <a data-testid="navbar" className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="/Planner">
            <PlannerSVG className="h-12" /> {menuBar ? <h1 className="duration-300">Calendar</h1> : ""}
          </a>
        </li>

        <li className={`w-full flex items-start justify-center ${ page === "groups" ? "bg-accent-blue" : "" } hover:bg-accent-red duration-300`}>
          <a className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="/Call">
            <GroupsSVG className="h-12" /> {menuBar ? <h1 className="duration-300">Groups</h1> : ""}
          </a>
        </li>

        <li className={`w-full flex items-start justify-center ${ page === "docx" ? "bg-accent-blue" : "" } hover:bg-accent-red duration-300`}>
          <a className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="/DocxEditor">
            <NotesSVG className="h-12" /> {menuBar ? <h1 className="duration-300">Docx Editor</h1> : ""}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
