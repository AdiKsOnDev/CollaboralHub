import { ReactComponent as RobotSVG } from "../Assets/Magic-Wand.svg";

import React, { useContext } from 'react';
import { Timestamp } from 'firebase/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { doc, getDoc } from "firebase/firestore";
import { database } from "../firebase";
import { useState, useEffect } from 'react'
import OpenAI from "openai";
import EmojiPicker from 'emoji-picker-react';
import { BiHappyBeaming } from "react-icons/bi";
import { AuthContext } from "../context/AuthContext";
import { IconContext } from "react-icons";
import { RxCross2 } from "react-icons/rx";

const NewPost = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const postRef= React.useRef();
  const ref = collection( database, "Posts");

  useEffect(() => {
    const getUser = async () => { 
      let userRef = doc(collection(database, "Users"), currentUser.email);
      let userSnapshot = await getDoc(userRef);
      let user = userSnapshot.data();
      setUserData(user);
    };

    getUser();
  }, [currentUser]);

  const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(postRef.current.value);

      let data = {
          userName: userData.firstName + " " + userData.lastName,
          user: userData.displayName,
          userEmail: userData.email,
          postBody: postRef.current.value,
          userPFP: userData.profileImg,
          likeCount: 0,
          likedUsers: [],
          uploaded: Timestamp.now()
      }

      try {
          addDoc(ref, data);
      }

      
      catch(e) {
          console.log("Error adding document: ", e);
      }


      setTimeout(() => {
        setIsOpen(false);
        window.location.reload(true);
     }, 1000);

  };

  const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const handleAI = async () => {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful agent that is meant to take an text input and improve it." }, { role: "user", content: inputStr }],
      model: "gpt-3.5-turbo",
    });

    setInputStr(completion.choices[0].message.content);
  };
   
  //post box 
  let [isOpen, setIsOpen] = useState(false);

  //emoji picker
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (e, emojiObject) => {
    setInputStr(prevInput=> prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    //non-expanded post box
    <div className="w-full mb-5 p-10">
      {!isOpen ? (
        <div class="w-full bg-secondary flex flex-col rounded-2xl p-5">
          <div className="flex flex-row justify-between mb-5">
            <img src={userData.profileImg} alt="profile img" className="rounded-full h-14 w-14 mr-5 border-accent-red border-4"/>          
            <button onClick={() => setIsOpen(true)} class="text-left newPostInput w-full bg-white text-placeholder font-semibold rounded-full px-5" > Scribble away </button>
          </div>

          <div className="flex justify-between">
            <span></span>
            <button onClick={() => setIsOpen(true)} className="text-white bg-accent-blue px-5 py-2 rounded-3xl font-semibold duration-300">Post</button>
          </div>
        </div>
      ) : (

      //expanded post box
        <div class="w-full bg-secondary flex flex-col rounded-2xl p-5">

        
          <div className="flex flex-row w-full">


            {/* <Profile /> */}
          
            <form onSubmit={handleSubmit} className="w-full">
              <textarea 
              type="text" 
              class="w-full rounded-3xl text-placeholder font-semibold p-5 h-64 focus:border-none" 
              ref={postRef} 
              placeholder="Scribble away" 
              onChange={(e) => setInputStr(e.target.value)}
              value={inputStr}

              />
              
              <div className="flex flex-row justify-between">


                {/* Emoji picker goes here */}
                <div className="flex flex-row justify-right">
                      <IconContext.Provider value={{ color: "white" }}>
                        <BiHappyBeaming size={40} onClick={()=> setShowPicker(val=> !val)} />
                      </IconContext.Provider>

                      {showPicker && <EmojiPicker
                      onEmojiClick={onEmojiClick} />
                      }
                  </div>


                {/* Image upload goes here */}
                  <div className="flex flex-row ">
                    <RobotSVG className="h-12 w-12" onClick={handleAI} />
                  </div> 

                {/* add images later */}


      
                {/* {imageList.map((url)=> {
                  return <img src={url} />
                })} */}

                {/* Post button */}
                <button type="submit" className="text-white h-fit bg-accent-blue px-5 py-2 rounded-3xl font-semibold hover:bg-accent-red duration-300">Post</button>
              </div>
            </form>

            {/* close button */}
            <div className="flex-col m-0 p-0">
                <IconContext.Provider value={{ color: "white" }} >
                  <RxCross2 size={15} onClick={() => setIsOpen(false)} />
                </IconContext.Provider>
            </div >
          </div>
        </div>
      )}
    </div>
    );
  };
  
  export default NewPost;
