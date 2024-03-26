//mine 
import {useState} from "react";
import {storage} from "../firebase"; 
import {ref, uploadBytes , getDownloadURL} from "firebase/storage"; 
import Avatar from '@mui/material/Avatar';

function ProfilePic(){

const [image, setImage] =useState(null);
const [url, setUrl] =useState(null);

const handleImageChange = (e) => {
    if(e.target.files[0]) {
        setImage(e.target.files[0]);
    }
};
const handleSubmit=() => {
    const imageRef = ref(storage , "/image");
    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setUrl(url);
      }).catch(error => {
        console.log(error.message, " error getting the image url " );
      })
    setImage(null);    
    })
    .catch((error)=> {
        console.log(error.message);
    })
};

return(
    <div className="p-5 pr-0">
        <Avatar
        src={url}
        sx={{ width: 80, height: 80 }}
        />
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleSubmit}>Submit</button>
    </div>
)

}

export default ProfilePic;

