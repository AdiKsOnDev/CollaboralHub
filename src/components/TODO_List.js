import React from 'react';
import { useReducer, useState } from "react";
import Form from "./Form.js";
import contextTodo from "../context/contextTodo.js";
import reducer from "./reducer.js";
import DisplayStickyNotes from "./displayStickyNote.js";
import StatusBar from "./StatusBar.js";
import Img from "../Assets/stickyNote.png";
import SavedNotes from "./SavedNotes.js";
 

function TODOList() {
  const [todos,dispatch]=useReducer(reducer,[])
   const[theme,updateTheme]=useState('light')

    return (
      <div className="flex flex-col w-full h-full bg-primary overflow-scroll">
        <StatusBar />

          
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

  
        <div className="p-24">
          <h1 className="text-4xl text-text-color font-semibold mb-8">Saved Notes</h1>
  
          <div className="grid grid-cols-4 gap-4">  
            <SavedNotes img={Img} heading="Monday" />
            <SavedNotes img={Img} heading="Tuesday" />
            <SavedNotes img={Img} heading="Wednesday" />
            <SavedNotes img={Img} heading="Thursday" />
            <SavedNotes img={Img} heading="Friday" />
            <SavedNotes img={Img} heading="Saturday" />
            <SavedNotes img={Img} heading="Sunday" />
            <SavedNotes img={Img} heading="All Week" />
          </div>
        </div>
      </div>
      );
    };
export default TODOList;
