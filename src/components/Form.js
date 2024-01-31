import React, { useState, useContext, useRef, useEffect } from 'react';
import contextTodo from '../context/contextTodo.js';
import { ADD_TODO } from './actionTypes.js';

function Form() {
  const { dispatch } = useContext(contextTodo);
  const [todoString, setTodoString] = useState('');
  const [style, setStyle] = useState({});
  const contentEditableRef = useRef(null);

  useEffect(() => {
    if (contentEditableRef.current) {
      contentEditableRef.current.textContent = todoString;
    }
  }, [todoString]);

  const handleSubmit = () => {
    if (!todoString.trim()) {
      alert('Please enter todo to add');
      return;
    }

    dispatch({
      type: ADD_TODO,
      payload: todoString
    });

    setTodoString('');
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const applyStyle = (newStyle) => {
    setStyle({ ...style, ...newStyle });
  };

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else {
      setTodoString(e.currentTarget.textContent);
    }
  };

  return (
    <>
      <div className="w-[198px] h-[252px] bg-pink-800 rounded-[15px] shadow flex flex-col justify-between p-2">
        <div className="flex justify-center items-center gap-2 mb-2">
          <button
            className="px-0.5 py-0 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => applyStyle({ fontWeight: style.fontWeight === 'bold' ? 'normal' : 'bold' })}>
            Bold
          </button>
          <button
            className="px-0.5 py-0 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => applyStyle({ fontStyle: style.fontStyle === 'italic' ? 'normal' : 'italic' })}>
            Italic
          </button>
          <button
            className="px-0.5 py-0 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => applyStyle({ textDecoration: style.textDecoration === 'underline' ? 'none' : 'underline' })}>
            Underline
          </button>
        </div>
        <div
          contentEditable
          ref={contentEditableRef}
          className="flex-grow text-center"
          style={style}
          onInput={(e) => handleInput(e)}
          onKeyDown={(e) => handleInput(e)}
        />
      </div>
    </>
  );
}

export default Form;