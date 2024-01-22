'use client';
import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import InfiniteScroll from 'react-infinite-scroll-component';

const style ={
    border: '1px solid red',
    margin: 6,
    padding: 8

}
async function getPosts() {
  const querySnapshot = await getDocs(collection(database, "Posts"));
  const post=[];

  querySnapshot.forEach((doc) => {
    post.push({ id:doc.id, ...doc.data() });
    console.log(doc.id, ' => ', doc.data());
  })
  return post;
}
const PostHolder= () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const post = await getPosts();
      setPostData(post);
    }
    fetchData();
  }, []);

    return (
        // <div >
            

        // {/* <div className="post-container"> */}
      
        //     {/* add images later */}
        //     {/* <img src="" alt="profile img " style={{resizeMode: 'center', width: 61 , height: 61 ,   borderColor: 'red', borderWidth: 4,borderTopRightRadius:270, borderBottomRightRadius: 270, borderTopLeftRadius:270, borderBottomLeftRadius:270 , position: 'absolute',top: 20,  left: 18, }}/>
    
        //     <div className="post-username"> Demo </div>
        //     <div className="post-content"> lorem ipsum  </div>
        //     <div className="post-contentimg">  </div>
        // </div> */}


       
        //     {postData.map((post) => (
        //         <div key={postData.id} > 
        //             <div className="post-container pb-100">  
        //                 <p className="post-username"> {post.userName}</p>
        //                 <p className="post-content">{post.postBody}</p>
        //                 <p className="post-contentimg"> </p>
        //             </div>
        //         </div>
        //     ))}
        // </div>
        <div className="left-[351px] top-[360px] h-[500px] absolute overflow-y-auto h-650">
            <InfiniteScroll dataLength={postData.length}>

            {postData.map((post,index) => (
                <div className="post-container">
                    <img src="" alt="profile img " style={{resizeMode: 'center', width: 61 , height: 61 ,   borderColor: 'red', borderWidth: 4,borderTopRightRadius:270, borderBottomRightRadius: 270, borderTopLeftRadius:270, borderBottomLeftRadius:270 , position: 'absolute',top: 20,  left: 18, }}/>
                    <p className="post-username"> {post.userName}</p>
                    <p className="post-content">{post.postBody}</p>
                    <p className="post-contentimg"> </p>
                    {/* This is a div #{index+1} inside  */}
                    
                    
                    
                </div>


            
            ))}


            </InfiniteScroll>

        </div>

    );
  };

  export default PostHolder;