const PostHolder = () => {
    return (
        <div className="post-container">
      
            {/* add images later */}
            <img src="" alt="profile img " style={{resizeMode: 'center', width: 61 , height: 61 ,   borderColor: 'red', borderWidth: 4,borderTopRightRadius:270, borderBottomRightRadius: 270, borderTopLeftRadius:270, borderBottomLeftRadius:270 , position: 'absolute',top: 20,  left: 18, }}/>
    
            <div className="post-username"> Demo </div>
            <div className="post-content"> lorem ipsum  </div>
            <div className="post-contentimg">  </div>
        </div>
    );
  };
  
  export default PostHolder;