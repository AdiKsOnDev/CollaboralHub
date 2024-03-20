import React from 'react'
import { ChatNavbar } from './ChatNavbar';
import Search from './Search';
import Chats from './Chats';

function Sidebar() {
  return (
    <div className='fc-sidebar'>
      <ChatNavbar />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar;