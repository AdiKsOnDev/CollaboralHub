import React, { useState, useRef, useEffect, useContext, props } from "react";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { database, auth } from "../firebase.js";
import { AuthContext } from "../context/AuthContext";

import "./GroupChat.css";

function GroupChat(props) {

  var databaseReadCounter = 0;

  const messagesEndRef = useRef(null);

  const { groupName } = props;
  const { currentUser } = useContext(AuthContext);
  const { isMuted } = props;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  const [showErrorForm, setShowErrorForm] = useState(false);
  const messagesRef = collection(database, "Messages");


  // Scroll to the bottom of the messages container
  const scrollToBottom = async () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {

    const queryMessages = query(
      messagesRef,
      where("groupName", "==", groupName),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {

      databaseReadCounter++;
      console.log("Database read counter: " + databaseReadCounter + " || increased in GroupChat.js, useEffect()");

      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsubscribe();

  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function getMessageTimestamp(message) {
    if (!message.createdAt) {
      return "..."; // or some placeholder text
    }

    const date = message.createdAt.toDate(); // Convert firebase timestamp to JS date object
    const hours = date.getHours().toString().padStart(2, '0'); // Convert hours to string and pad with leading zero if necessary
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Convert minutes to string and pad with leading zero if necessary

    // Construct time string in 24-hour format
    return `${hours}:${minutes}`;

  }

  const handleSendNewMessage = async (event) => {

    event.preventDefault();
    console.log(isMuted);

    if (newMessage === "") {
      console.log("Please enter a message");
      setErrorMessage("Please enter a message");
      setShowErrorForm(true);
      document.getElementsByClassName('overlay')[0].style.display = 'flex';
      console.log(currentUser);
      return;
    } else if (isMuted) {
      console.log("You are muted and are therefore not allowed to send messages to the chat");
      setErrorMessage("You are muted and are therefore not allowed to send messages to the chat");
      setShowErrorForm(true);
      document.getElementsByClassName('overlay')[0].style.display = 'flex';
      return;
    }

    await addDoc(messagesRef, {
      text: newMessage,
      groupName: groupName,
      userID: auth.currentUser.uid,
      userDisplayName: currentUser.displayName,
      userPhotoURL: currentUser.photoURL,
      createdAt: Timestamp.now()
    });

    databaseReadCounter--;
    console.log("Database read counter: " + databaseReadCounter + " || increased in GroupChat.js, handleSendNewMessage()");

    setNewMessage("");
  };

  const handleOkClick = () => {
    setErrorMessage("");
    setShowErrorForm(false);
    document.getElementsByClassName('overlay')[0].style.display = 'none';
  }

  return (

    <div className="group-chat-container">
      <div className="group-messages-container">
        {messages.map((message) => (
          <div key={message.id} className={currentUser.uid === message.userID ? 'group-message-container-they ' : 'group-message-container-me '}>
            <img src={message.userPhotoURL} alt="user" className="group-message-user-icon" />
            <div className='group-message-text-container '>
              {/* <div className="group-message-displayName">{message.userDisplayName}</div> */}
              <div className="group-message-message ">{message.text}</div>
            </div>
            <div className={currentUser.uid === message.userID ? 'group-message-timestamp-me' : 'group-message-timestamp-they'}>{getMessageTimestamp(message)}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>



      <div className="group-message-input-container">
        <form onSubmit={handleSendNewMessage} className="group-message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="group-message-input-field"
            placeholder="Type your message here..."
          />
          <button type="submit" className="text-center font-semibold bg-accent-red rounded-md hover:bg-accent-blue duration-300  text-lg p-4 text-white px-7">
            Send
          </button>
        </form>
      </div>

      {showErrorForm && (
        <div className="popup-form" id="error-form">
          <form onSubmit={handleOkClick} className='popup-form-form' id='error-form-form'>
            <div className='popup-form-text' id='error-form-text'>{errorMessage}</div>
            <button type="submit" className="bob-btn-1" id="error-form-btn">
              Okay
            </button>
          </form>
        </div>

      )}

      <div className='overlay'></div>
    </div>
  )

}

export default GroupChat;