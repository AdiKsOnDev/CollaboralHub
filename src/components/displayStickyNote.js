import React from 'react';
import { useContext } from 'react';
import contextTodo from "../context/contextTodo.js";
import { REMOVE_TODO } from './actionTypes.js';

const DisplayStickyNotes = () => {
  const { todos, dispatch, themes } = useContext(contextTodo);
  const [themeMode, setThemeMode] = themes;

  return (
      <div className= "flex flex-row gap-4">
          {todos.map((todo, index) => (
              <div key={index} className="w-[198px] h-[245px] bg-amber-200 rounded-[15px] shadow flex flex-col justify-center items-center">
                  <h1 className="text-black font-regular text-center">{todo}</h1>
                  <button onClick={() => dispatch({ type: REMOVE_TODO, payload: todo })}>x</button>
              </div>
          ))}
      </div>
  );
}

export default DisplayStickyNotes;
