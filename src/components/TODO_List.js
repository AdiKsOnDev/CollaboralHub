import React from 'react';
import { useReducer, useEffect, useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { database } from "../firebase.js";
import contextTodo from "../context/contextTodo.js";
import reducer from "./reducer.js";
import DisplayStickyNotes from "./displayStickyNote.js";
import StatusBar from "./StatusBar.js";
 

function TODOList() {
  const { currentUser } = useContext(AuthContext);
  const [userImg, setUserImg] = useState("lol?");

  useEffect(() => {
    const getFiles = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();

      setUserImg(user.profileImg)
    }

    getFiles();
  }, [currentUser])

  const [todos,dispatch]=useReducer(reducer,[])
  const[theme,updateTheme]=useState('light')

  return (
    <div className="flex flex-col w-full h-full bg-primary overflow-scroll">
      <StatusBar image={userImg} />

        
        <contextTodo.Provider value={{todos,dispatch,themes:[theme,updateTheme]}}>

      <div className="flex flex-col p-20" >
        <h1  className="text-4xl text-text-color font-semibold mb-8">TODO List</h1>
        <div className="flex flex-row">
          <div className="flex flex-row">
            <DisplayStickyNotes/>
          </div>
      </div>
      </div>
      </contextTodo.Provider>

    </div>
    );
  };
export default TODOList;
