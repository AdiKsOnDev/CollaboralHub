// import React from "react";
// import { useEffect, useState } from "react";
// import { useAuth } from "../firebase";





// export default function Profile(){

//     const currentUser = useAuth();
//     const [photoURL, setPhotoURL] = useState("");


//     function handleChange(){
       
//     }

//     function handleClick(){
        
//     }

//     useEffect(()=> {
//         setPhotoURL(currentUser.photoURL);
//     },[currentUser])
//     currentUser.photoURL = "../Assets/default-avatar.png";


//     return(

//         <div >
//             <input type="file" onChange={handleChange} />
//             <button onClick={handleClick}>Upload</button>
//             <img src={photoURL} alt="Avatar" className="rounded-full border-red-950 "/>
//         </div>
//     )
// }