import React, { useState } from "react";
import { useEffect} from 'react';
import { addDoc, collection, getDocs,deleteDoc, doc } from '@firebase/firestore';
import { database } from "../firebase";
import Note from "./Note";
import CreateArea from "./CreateArea";


// const DisplayStickyNotes = () => {

//   const [notes, setNotes] = useState([]);

//   function addNote(newNote) {
//     setNotes(prevNotes => {
//       return [...prevNotes, newNote];
//     })
//   }

//   function deleteNote(id) {
//     setNotes(prevNotes => {
//       return prevNotes.filter((noteItem, index) => {
//         return index !== id;
//       })
//     })
//   }

//   return (
//       <div className= "flex flex-row gap-4">
         
//       <CreateArea onAdd={addNote} />
//       {notes.map((noteItem, index) => {
//         return <Note 
//           key={index}
//           id={index}
//           title={noteItem.title}
//           content={noteItem.content}
//           onDelete={deleteNote}
//         />
//       })}
//       </div>
//   );
// }

// export default DisplayStickyNotes;

async function getTodo() {
    const querySnapshot = await getDocs(collection(database, "Todo"));
    const Todo=[];
  
    querySnapshot.forEach((doc) => {
        Todo.push({ id:doc.id, ...doc.data() });
      // console.log(doc.id, ' => ', doc.data());
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
        }
        
        catch(e) {
            console.log("Error adding document: ", e);
        }

    //     database.collection("notes").add({
    //     title: newNote.title,
    //     content: newNote.content,
    //   });
    }
  

  

    useEffect(() => {
        async function fetchData() {
          const Todo = await getTodo();
          setNotes(Todo);
        }
        fetchData();
      }, []);

    //   function deleteNote(id) {
    //     todoRef.doc(id).delete();
    // }


    const deleteNote = async (notes) => {
        try {
            await deleteDoc(doc(ref, notes.id));
            
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

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