'use client';
import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import InfiniteScroll from 'react-infinite-scroll-component';

async function getPosts() {
  const querySnapshot = await getDocs(collection(database, "Posts"));
  const post=[];

  querySnapshot.forEach((doc) => {
    post.push({ id:doc.id, ...doc.data() });
    // console.log(doc.id, ' => ', doc.data());
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

        <div className="left-[351px] top-[280px] absolute overflow-y-auto " style={{ height: '65%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>

            <InfiniteScroll dataLength={postData.length} >
        
                {postData.map((post) => (
                    <div className="post-container">
                        <img src="" alt="profile img " style={{resizeMode: 'center', width: 61 , height: 61 ,   borderColor: 'red', borderWidth: 4,borderTopRightRadius:270, borderBottomRightRadius: 270, borderTopLeftRadius:270, borderBottomLeftRadius:270 , position: 'absolute',top: 20,  left: 18, }}/>
                        <p className="post-username"> {post.userName}</p>
                        <p className="post-content">{post.postBody}</p>
                        <p className="post-contentimg"> </p>  
                    </div>
                ))}

            </InfiniteScroll>

        </div>

    );
  };

  export default PostHolder;