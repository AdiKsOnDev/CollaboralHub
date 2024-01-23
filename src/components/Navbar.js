import LogoPNG from "../Assets/logo.png";
import { ReactComponent as ProjectsSVG } from "../Assets/Navigation-Projects.svg";
import { ReactComponent as CommunitySVG } from "../Assets/Navigation-Community.svg";
import { ReactComponent as NotesSVG } from "../Assets/Navigation-Notes.svg";
import { ReactComponent as PlannerSVG } from "../Assets/Navigation-Planner.svg";
import { ReactComponent as GroupsSVG } from "../Assets/Navigation-Groups.svg";
import { ReactComponent as SettingsSVG } from "../Assets/Navigation-Settings.svg";

import { auth } from "../firebase.js";

import LogoutButton from "./LogoutButton.js";

function Navbar() {
  return (
    <nav className="flex flex-col justify-start items-center w-1/4 gap-24 bg-secondary">
      <img className="mt-12" src={LogoPNG} alt="Logo" />
      
      <ul className="flex flex-col justify-center items-center w-full">
        <li className="w-full flex items-start justify-center hover:bg-placeholder duration-300">
          <a className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2 duration-300" href="#">
            <ProjectsSVG className="h-12" /> Projects
          </a>
        </li>

        <li className="w-full flex items-start hover:bg-placeholder duration-300">
          <a className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="#">
            <CommunitySVG className="h-12" /> Community Page
          </a>
        </li>

        <li className="w-full flex items-start hover:bg-placeholder duration-300">
          <a className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="#">
            <NotesSVG className="h-12" /> Sticky Notes
          </a>
        </li>

        <li className="w-full flex items-start hover:bg-placeholder duration-300">
          <a className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="#">
            <PlannerSVG className="h-12" /> Planner
          </a>
        </li>

        <li className="w-full flex items-start hover:bg-placeholder duration-300">
          <a className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="#">
            <GroupsSVG className="h-12" /> Groups
          </a>
        </li>
        
        <li className="w-full flex items-start hover:bg-placeholder duration-300">
          <a className="flex flex-row justify-start items-center text-text-color text-xl w-full p-5 font-semibold hover:translate-x-2  duration-300" href="#">
           <SettingsSVG className="h-12" /> Settings
          </a>
        </li>

        <li><LogoutButton auth={auth} /></li>
      </ul>
    </nav> 
  );
}

export default Navbar;
