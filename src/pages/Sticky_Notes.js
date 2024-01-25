import React from 'react';
import TODOList from "../components/TODO_List";
import Navbar from '../components/Navbar.js';
import 'tailwindcss/tailwind.css';

function StickyN() {
    return (
        <div className="w-screen h-full flex">
            <TODOList/>
        </div>
    );
}
export default StickyN;