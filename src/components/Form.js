import React from 'react';
import { useContext, useState } from 'react';
import contextTodo from '../context/contextTodo.js';
import { ADD_TODO } from './actionTypes.js';

function Form() {
  const { todos, dispatch } = useContext(contextTodo);
  const [todoString, setTodoString] = useState('');

  const handleClick = (e) => {
    e.preventDefault();
    
    if (todoString === '') {
      return alert('Please enter todo to add');
    }

    dispatch({
      type: ADD_TODO,
      payload: todoString
    });

    setTodoString('');
    console.log(todos);
  };

  return (
    <>
      <form className='flex flex-col items-center justify-center mr-5 w-48 hover:w-52 hover:text-lg duration-300' onSubmit={handleClick}>
        <input  
          type='text' 
          placeholder= {'Add New \nTo Do List'}
          className="w-[198px] h-[252px] bg-pink-800 rounded-[15px] shadow flex flex-col justify-center items-center text-center"
          onChange={(e) => setTodoString(e.target.value)}
          value={todoString}
        />
      </form>
    </>
  );
}

export default Form;
