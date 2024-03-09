import React, { useState } from "react";

function CreateArea(props) {

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const {name, value} = event.target; // this is both event.target.name AND event.target.value.

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    })

    event.preventDefault();
  }

  return (
    <div >
      <form className="w-[198px] h-[252px] bg-rose-600 shadow flex flex-col justify-between m-0 p-2" >
        <input className="w-full outline-none text-lg resize-none bg-rose-600 text-white placeholder-white"   name="title" onChange={handleChange} value={note.title} placeholder="Title" />
        <textarea className="w-full outline-none text-lg resize-none bg-rose-600 text-white placeholder-white"  name="content" onChange={handleChange} value={note.content} placeholder="Take a note..." rows="3" />
        <button className="bg-lime-500 hover:bg-accent-red text-white font-bold py-2 px-4 rounded-full flex items-center justify-center" onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;

