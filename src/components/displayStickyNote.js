import React, { useState } from "react";
import { useEffect} from 'react';
import { addDoc, collection, getDocs,deleteDoc, doc } from '@firebase/firestore';
import { database } from "../firebase";
import Note from "./Note";
import CreateArea from "./CreateArea";

async function getTodo() {
    const querySnapshot = await getDocs(collection(database, "Todo"));
    const Todo=[];
  
    querySnapshot.forEach((doc) => {
        Todo.push({ id:doc.id, ...doc.data() });
      
    })
    return Todo;
  }


  
const DisplayStickyNotes = () => {


    const todoRef= React.useRef();
    const ref = collection( database, "Todo");

    const [notes, setNotes] = useState([]);

 
  
    function addNote(newNote) {

        let data = {
            title: newNote.title,
            content: newNote.content,

        }

        try {
            addDoc(ref, data);
            setTimeout(() => {
                
                window.location.reload(true);
             }, 500);
        }
        
        catch(e) {
            console.log("Error adding document: ", e);
        }


    }
  

  

    useEffect(() => {
        async function fetchData() {
          const Todo = await getTodo();
          setNotes(Todo);
        }
        fetchData();
      }, []);

    

    //fix it in firebase 
    async function deleteNote(id) {
        // try {
        //     await deleteDoc(doc(ref, id));
        //     setTimeout(() => {
                
        //         window.location.reload(true);
        //      }, 500);
            
        // } catch (error) {
        //     console.error("Error deleting document: ", error);
        // }

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
          onChange={(e) => setNotes(e.target.value)}
        />
      })}
      </div>

    );
  };
  
  export default DisplayStickyNotes;