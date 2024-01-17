import React from 'react';
import { database } from '../firebase';
import { addDoc, collection } from '@firebase/firestore';

const NewPost = () => {
    const postRef= React.useRef();
    const ref = collection( database, "posts");
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(postRef.current.value);
        
        let data = {
            message: postRef.current.value,
        }

        try {
            addDoc(ref, data);
        }
        catch(e) {
            console.log("Error adding document: ", e);
        }
    };

    return (
        <div class="newPost-container">
            
        <form onSubmit={handleSubmit}>
     
            <textarea type="text" class="newPostInput" ref={postRef} placeholder="Scribble away..." />
             {/* add images later */}
             <img src="" alt="profile img " style={{resizeMode: 'center', width: 61 , height: 61 ,   borderColor: 'red', borderWidth: 4,borderTopRightRadius:270, borderBottomRightRadius: 270, borderTopLeftRadius:270, borderBottomLeftRadius:270 , position: 'absolute',top: 20,  left: 18, }}/>          
            <button type="submit" class="newPostButton" >Save</button>
        </form>
    </div>
    );
  };
  
  export default NewPost;
