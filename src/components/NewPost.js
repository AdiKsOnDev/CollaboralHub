import React from 'react';
import { addDoc, collection } from '@firebase/firestore';
import { database } from "../firebase";
import { useState } from 'react'

import EmojiPicker from 'emoji-picker-react';
import { BiHappyBeaming } from "react-icons/bi";
import { IconContext } from "react-icons";

import { FiImage } from "react-icons/fi";
import { PhotoLibrary } from "react-images-uploading";
import ImageUploading from 'react-images-uploading';
import { RxCross2 } from "react-icons/rx";
import { LuUpload } from "react-icons/lu";

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



    //image upload

    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
  
    const onChange = (imageList, addUpdateIndex) => {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList);
    };

    return (
      <div className="w-full mb-5 p-10">
        {!isOpen ? (
          <div class="w-full bg-secondary flex flex-col rounded-2xl p-5">
            <div className="flex flex-row justify-between mb-5">
              <img src="" alt="profile img" className="rounded-full w-16 h-16 mr-5 border-accent-red border-4"/>          
              <button onClick={() => setIsOpen(true)} class="text-left newPostInput w-full bg-white text-placeholder font-semibold rounded-full px-5" > Scribble away </button>
            </div>

            <div className="flex justify-between">
              <span></span>
              <button onClick={() => setIsOpen(true)} className="text-white bg-accent-blue px-5 py-2 rounded-3xl font-semibold hover:bg-accent-red duration-300">Post</button>
            </div>
          </div>
        ) : (
          <div class="w-full bg-secondary flex flex-col rounded-2xl p-5">
            <div className="flex flex-row w-full">
              <img src="" alt="profile img " className="rounded-full w-16 h-16 mr-5 border-accent-red border-4"/>        
              
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
                  <div className="flex flex-row">
                        <IconContext.Provider value={{ color: "white" }}>
                          <BiHappyBeaming size={40} onClick={()=> setShowPicker(val=> !val)} />
                        </IconContext.Provider>

                        {showPicker && <EmojiPicker
                        onEmojiClick={onEmojiClick} />
                        }
                    </div>


                  {/* Image upload goes here */}
                    <div className="flex flex-row">
                      
                      <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                      >
                        {({
                          imageList,
                          onImageUpload,
                          onImageUpdate,
                          onImageRemove,
                          isDragging,
                          dragProps,
                        }) => (
                          // write your building UI
                          <div className="upload__image-wrapper">
                            <button
                              style={isDragging ? { color: 'red' } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                              <IconContext.Provider value={{ color: "white" }}>
                                <FiImage size={40}/>
                              </IconContext.Provider>
                            </button>
                            {imageList.map((image, index) => (
                              <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />

                                <div className=" flex flex-row justify-between p-2">
                                      <button onClick={() => onImageUpdate(index)}>
                                        <IconContext.Provider value={{ color: "white" }}>
                                            <LuUpload size={20} />
                                        </IconContext.Provider>
                                      </button>

                                      <button onClick={() => onImageRemove(index)}>
                                        <IconContext.Provider value={{ color: "white" }}>
                                            <RxCross2 size={24}/>
                                        </IconContext.Provider>

                                      </button>
                                </div>

                              </div>
                            ))}
                          </div>
                        )}
                      </ImageUploading>


                    </div> 

                  {/* add images later */}
                  <button onClick={() => setIsOpen(false)} type="submit" className="text-white h-fit bg-accent-blue px-5 py-2 rounded-3xl font-semibold hover:bg-accent-red duration-300">Post</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default NewPost;
