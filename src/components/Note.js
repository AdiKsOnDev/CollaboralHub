import React from "react";

function Note(props) {

  function handleClick() {
    props.onDelete(props.id); 
  }

  return (
    <div className="w-[198px] h-[252px] bg-yellow-200 rounded-[15px] shadow flex flex-col justify-between p-2">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button className="bg-lime-500 hover:bg-accent-red text-white font-bold py-2 px-4 rounded-full flex items-center justify-center" onClick={handleClick}> Done </button>
    </div>
  );
}

export default Note;
