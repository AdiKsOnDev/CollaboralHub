import React from 'react';
import TODOList from "../components/TODO_List";
import 'tailwindcss/tailwind.css';

function StickyN() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <TODOList/>
        </div>
    );
}
export default StickyN;