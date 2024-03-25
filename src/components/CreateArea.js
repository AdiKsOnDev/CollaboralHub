import React, { useState } from "react";

function CreateArea(props) {
  

  let previousLength = 0;

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChangeBody(event) {
        const bullet = "\u2022";
        const newLength = event.target.value.length;
        const characterCode = event.target.value.substr(-1).charCodeAt(0);


        if (newLength > previousLength) {
            if (characterCode === 10) {
            event.target.value = `${event.target.value}${bullet} `;
            } else if (newLength === 1) {
            event.target.value = `${bullet} ${event.target.value}`;
            }
        }
        
        previousLength = newLength;

    const {name, value} = event.target; // this is both event.target.name AND event.target.value.

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }


  function handleChangeTitle(event) {

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
      <form className="w-[198px] h-[252px] bg-accent-red shadow flex flex-col rounded-[15px] justify-between m-0 p-2 " >
        <input className="w-full outline-none text-xl p-2 resize-none bg-accent-red text-white font-semibold placeholder-white "  name="title" onChange={handleChangeTitle} value={note.title} placeholder="Title" />
        <textarea className="w-full outline-none text-lg p-2 resize-none bg-accent-red text-white placeholder-white "  name="content" onChange={handleChangeBody} value={note.content} placeholder="Add new list..." rows="6" />
        <button className="bg-accent-blue hover:bg-white hover:text-primary duration-300 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center" onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;

