function PostBlock({post}) {
  return (
    <div className="bg-secondary w-full p-10 rounded-xl mb-4">
      <div className="flex flex-row items-center mb-5">
        <img src="" alt="profile img" className="rounded-full w-16 h-16 mr-5 border-accent-red border-4"/>          
        <p className="font-semibold text-xl"> {post.userName}</p>
      </div>
      <div className="flex justify-center text-center w-full">
        <p className="w-2/3">{post.postBody}</p>
      </div>
    </div>
  ) 
}

export default PostBlock;
