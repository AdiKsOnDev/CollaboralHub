import React from 'react';
import {firestore} from '../Firebase';
import { addDoc, collection } from '@firebase/firestore';
import PostHolder from "../components/PostHolder";

export default function Home() {
    const messagRef= React.useRef();
    const ref = collection( firestore, "posts");
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(messagRef.current.value);
        
        let data = {
            message: messagRef.current.value,

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
                <input type="text" className="newPostInput" ref={messagRef} placeholder="Scribble away..." />
                 {/* add images later */}
                 <img src="" alt="profile img " style={{resizeMode: 'center', width: 61 , height: 61 ,   borderColor: 'red', borderWidth: 4,borderTopRightRadius:270, borderBottomRightRadius: 270, borderTopLeftRadius:270, borderBottomLeftRadius:270 , position: 'absolute',top: 20,  left: 18, }}/>          
                <button type="submit"  class="newPostButton" >Save</button>
            </form>

            <PostHolder />
        </div>
    );
}