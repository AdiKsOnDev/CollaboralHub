import React, { useState } from "react";
import { useContext } from 'react';


import Note from "./Note";
import CreateArea from "./CreateArea";

const DisplayStickyNotes = () => {



  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    })
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      })
    })
  }

  return (
      <div className= "flex flex-row gap-4">
         
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return <Note 
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />
      })}
      </div>
  );
}

export default DisplayStickyNotes;

