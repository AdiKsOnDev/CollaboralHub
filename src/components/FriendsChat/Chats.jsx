import React, { useEffect, useState, useContext } from 'react'
import { database } from '../../firebase';
import { AuthContext } from "../../context/AuthContext"
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { ChatContext } from '../../context/ChatContext';

function Chats() {

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);


  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(database, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        setLoading(false);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  console.log(chats);

  return (
    <div className='fc-chats'>
      {loading ? (
        // Render a loading indicator, e.g., a spinner
        <div>Loading...</div>
      ) : (
        // Render the chat content
        Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
          <div className='fc-userchat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
            {chat[1]?.userInfo && (
              <>
                <img src={chat[1].userInfo.photoURL} alt='' className='fc-searchimg' />
                <div className='fc-userchatinfo'>
                  <span className='fc-username'> {chat[1].userInfo.displayName} </span>
                  <p className='fc-latestmsg'>{chat[1].lastMessage?.text}</p>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );

}


export default Chats;