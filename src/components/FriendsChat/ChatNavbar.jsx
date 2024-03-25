import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
export const ChatNavbar = () => {

  const { currentUser } = useContext(AuthContext);
  return (
    <div className='chatnavbar'>
      <div className='fc-user'>
        <img src={currentUser.photoURL} alt='' className='fc-propic' />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  )
}