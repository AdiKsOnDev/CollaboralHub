import React from "react";

function Note(props) {

  function handleClick() {
    props.onDelete(props.id); 
  }

  return (
    <div className="w-[198px] h-[252px] bg-white rounded-[15px] shadow flex flex-col justify-between p-2 ">
      <h1 className="p-2 text-xl text-accent-red underline font-semibold">{props.title}</h1>
      <p className="p-2">{props.content}</p>
      <button className="bg-accent-red hover:bg-accent-blue duration-300 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center" onClick={handleClick}> Done </button>
    </div>
  );
}

export default Note;
