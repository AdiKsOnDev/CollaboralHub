import React from 'react';
import TODOList from "../components/TODO_List";
import Navbar from '../components/Navbar.js';
import 'tailwindcss/tailwind.css';

function StickyNotes() {
    return (
        <div className="w-screen h-full flex">
            <Navbar page="notes" />
            <TODOList/>
        </div>
    );
}
export default StickyNotes;
