import React from 'react';
import { addDoc, collection } from '@firebase/firestore';
import { database } from "../firebase";
import { Dialog } from '@headlessui/react'
import { useState } from 'react'

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

    let [isOpen, setIsOpen] = useState(true);

    return (
        <div>
               <div class="newPost-container">
                        <button onClick={() => setIsOpen(true)} class="newPostInput" > Scribble away... </button>
                        {/* add images later */}
                        <img src="" alt="profile img " style={{resizeMode: 'center', width: 61 , height: 61 ,   borderColor: 'red', borderWidth: 4,borderTopRightRadius:270, borderBottomRightRadius: 270, borderTopLeftRadius:270, borderBottomLeftRadius:270 , position: 'absolute',top: 20,  left: 18, }}/>          
                        <button onClick={() => setIsOpen(true)} class="newPostButton" >Post</button>
                </div>




                <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                    <Dialog.Panel>

                    <div class="newPost-container-expanded">
                        <form onSubmit={handleSubmit}>
                            
                            <textarea type="text" class="newPostInput-expanded" ref={postRef} placeholder="Scribble away..." />
                            {/* add images later */}
                            <img src="" alt="profile img " style={{resizeMode: 'center', width: 61 , height: 61 ,   borderColor: 'red', borderWidth: 4,borderTopRightRadius:270, borderBottomRightRadius: 270, borderTopLeftRadius:270, borderBottomLeftRadius:270 , position: 'absolute',top: 20,  left: 18, }}/>          
                            <button onmouseleave={() => setIsOpen(false)} type="submit" class="newPostButton-expanded" >Post</button>
                        </form>
                    </div>
                    </Dialog.Panel>
                </Dialog>

        </div>
      




    );
  };
  
  export default NewPost;