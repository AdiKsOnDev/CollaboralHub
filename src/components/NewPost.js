import React from 'react';
import { addDoc, collection } from '@firebase/firestore';
import { database } from "../firebase";
import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { BiHappyBeaming } from "react-icons/bi";
import { IconContext } from "react-icons";
import PhotoLibrary from "./PhotoLibrary";
import { RxCross2 } from "react-icons/rx";

const NewPost = () => {

    const postRef= React.useRef();
    const ref = collection( database, "Posts");
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(postRef.current.value);
        let data = {
            userName: "New User",
            postBody: postRef.current.value,

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
       }, 6000);

    };

   
    //post box 
    let [isOpen, setIsOpen] = useState(false);

    //emoji picker
    const [inputStr, setInputStr] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
    setInputStr(prevInput=> prevInput + emojiObject.emoji);
    setShowPicker(false);
    };

    return (
      //non-expanded post box
      <div className="w-full mb-5 p-10">
        {!isOpen ? (
          <div class="w-full bg-secondary flex flex-col rounded-2xl p-5">
            <div className="flex flex-row justify-between mb-5">
              <img src="" alt="profile img" className="rounded-full w-16 h-16 mr-5 border-accent-red border-4"/>          
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
                      {/* <input type="file"/> */}
                      <PhotoLibrary />

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
