import React, { useContext } from 'react'
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../../context/ChatContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faPlus, faEllipsisH } from "@fortawesome/free-solid-svg-icons";


const Chat = () => {

  const { data } = useContext(ChatContext);
  return (
    <div className='fc-chat'>
      <div className='fc-chatinfo'>
        <span>{data.user?.displayName}</span>
        <div className="fc-chaticons">
          {/* <img src='' alt='cam'/> */}
          < FontAwesomeIcon icon={faVideo} size="xl" alt="Camera" />
          {/* <img src='' alt='add'/> */}
          < FontAwesomeIcon icon={faPlus} size="xl" alt="Add" />
          {/* <img src='' alt='more'/> */}
          < FontAwesomeIcon icon={faEllipsisH} size="xl" alt="Add" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat;