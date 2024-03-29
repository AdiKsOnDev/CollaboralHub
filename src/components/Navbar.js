import { ReactComponent as ProjectsSVG } from "../Assets/Navigation-Projects.svg";
import { ReactComponent as NotesSVG } from "../Assets/Navigation-Notes.svg";
import { ReactComponent as PlannerSVG } from "../Assets/Navigation-Planner.svg";
import { ReactComponent as GroupsSVG } from "../Assets/Navigation-Groups.svg";
import { ReactComponent as MenuBarSVG } from "../Assets/Menu-Bar.svg";
import { ReactComponent as HomeSVG } from "../Assets/Home_Icon.svg";
import { ReactComponent as PlusSVG } from "../Assets/New-Icon.svg";
import Logo from "../Assets/Logo.png";
import { MdCall } from "react-icons/md";


import React, { useState } from 'react';

function Navbar({ page }) {
  const [menuBar, setMenuBar] = useState(false);

  const toggleMenu = () => {
    setMenuBar(menuBar ? false : true);

    return;
  }

  return (
    <nav className={`flex flex-col justify-between items-center gap-24 ${!menuBar ? "w-24" : "w-1/4"} h-screen bg-secondary duration-300`}>
      <li className={`w-full flex items-start justify-center shadow-none hover:bg-accent-red duration-300`}>
        <button data-testid="navbar" className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold" onClick={toggleMenu}>
          <MenuBarSVG className="h-12" /> {menuBar ? <h1 className="duration-300">Side Menu</h1> : ""}
        </button>
      </li>

      <ul className="flex flex-col justify-center items-center w-full">

        <li className={`w-full flex items-start justify-center ${page === "community" ? "bg-accent-blue shadow-neon" : "shadow-none"} hover:bg-accent-red duration-300`}>
          <a data-testid="navbar" className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="/">
            <HomeSVG className="h-8" /> {menuBar ? <h1 className="duration-300">Home</h1> : ""}
          </a>
        </li>

        <li className={`w-full flex items-start justify-center ${page === "home" ? "bg-accent-blue shadow-neon" : "shadow-none"} hover:bg-accent-red duration-300`}>
          <a data-testid="navbar" className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2 duration-300" href="/Dashboard">
            <ProjectsSVG className="h-12" /> {menuBar ? <h1 className="duration-300">Your Files</h1> : ""}
          </a>
        </li>

        <li className={`w-full flex items-start justify-center ${page === "notes" ? "bg-accent-blue shadow-neon" : "shadow-none"} hover:bg-accent-red duration-300`}>
          <a data-testid="navbar" className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="/Notes">
            <NotesSVG className="h-12" /> {menuBar ? <h1 className="duration-300">Sticky Notes</h1> : ""}
          </a>
        </li>

        <li className={`w-full flex items-start justify-center ${page === "planner" ? "bg-accent-blue shadow-neon" : "shadow-none"} hover:bg-accent-red duration-300`}>
          <a data-testid="navbar" className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="/Planner">
            <PlannerSVG className="h-12" /> {menuBar ? <h1 className="duration-300">Calendar</h1> : ""}
          </a>
        </li>

        <li className={`w-full flex items-start justify-center ${page === "groups" ? "bg-accent-blue shadow-neon" : "shadow-none"} hover:bg-accent-red duration-300`}>
          <a className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="/GroupsPanel">
            <GroupsSVG className="h-12" /> {menuBar ? <h1 className="duration-300">Groups</h1> : ""}
          </a>
        </li>

        <li className={`w-full flex items-start justify-center ${page === "docx" ? "bg-accent-blue shadow-neon" : "shadow-none"} hover:bg-accent-red duration-300`}>
          <a className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="/Choice">
            <PlusSVG className="h-12" /> {menuBar ? <h1 className="duration-300">New File</h1> : ""}
          </a>
        </li>

      </ul>

      <li className={`w-full flex items-start justify-center ${page === "stats" ? "bg-accent-blue shadow-neon" : "shadow-none"} hover:bg-accent-red duration-300`}>
        <a className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="https://collaboralhub.000.pe/">
          <img src={Logo} className="h-12" /> {menuBar ? <h1 className="duration-300">ThinkLabs</h1> : ""}
        </a>
      </li>
    </nav>
  );
}

export default Navbar;
