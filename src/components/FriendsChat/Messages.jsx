import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { database } from '../../firebase';


const Messages = () => {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext);


  useEffect(() => {
    const unSub = onSnapshot(doc(database, "Chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })

    return () => {
      unSub()
    }
  }, [data.chatId])



  return (
    <div className='fc-messages'>
      {messages.map(m => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}


export default Messages