//country picker 
import Select from "react-select";
//-------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useId } from 'react';
import Avatar from '@mui/material/Avatar';
import {storage} from "../firebase"; 
import {ref, uploadBytes , getDownloadURL} from "firebase/storage"; 
import { addDoc, collection } from '@firebase/firestore';
import { database } from "../firebase";
import { IconContext } from "react-icons";
import { FiImage } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { LuUpload } from "react-icons/lu";

const CreateProfile = () => {

//-------------------------------
//           Images
//-------------------------------
const [image, setImage] =useState(null);
const [url, setUrl] =useState(null);
const navigate = useNavigate();

const executeImageChange =(e)=>{
    if(e=='.fileInput'){
        handleImageChange();
    }
}

const handleImageChange = (e) => {
    if(e.target.files[0]) {
        setImage(e.target.files[0]);
    }
};
const handleSubmitImage=() => {
    const imageRef =ref(storage , "/image");
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
//-------------------------------
//        Country Picker 
//-------------------------------

const [countries, setCountries] = useState([]);
const [selectedCountry, setSelectedCountry] = useState({});

useEffect(() => {
  fetch(
    "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
  )
    .then((response) => response.json())
    .then((data) => {
      setCountries(data.countries);
      setSelectedCountry(data.userSelectValue);
    });
}, []);


//-------------------------------
  const id = useId();
  const [formData, setFormData] = useState({
    firstname:'',
    lastname:'' ,
    username:'' ,
    aboutme:'', 
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const profileRef= React.useRef();
  const profDbRef = collection( database, "UserProfile");

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstname, lastname ,username } = formData;

    // Basic validation - check if email and password are not empty
    if (!firstname || !lastname || !username ) {
      setFormData({ ...formData, error: 'Please fill out the mandatory fields' });
      return;
    }
    
    // setFormData({ firstname:'', lastname:'' , username:'' , aboutme:'',  });

        let data = {
            id:profileRef,
            firstName: firstname,
            lastName:lastname,
            userName:username,
            aboutMe:aboutme, 
            profileImg:profileImg,

        }

        try {
            addDoc(profDbRef, data);
            navigate("/Community");
        }

        catch(e) {
            alert("Error adding document: ", e);
        }

        

    };
   
  const { firstname, lastname ,username , aboutme, profileImg  } = formData;


  return (
    <div className="flex flex-col bg-secondary w-fit p-10 items-center rounded-lg">
      <h2 className="font-semibold text-center mb-7 text-3xl text-text-color">Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center">

        <div className="p-0 flex flex-row justify-center items-center">
            <Avatar
            src={url}
            sx={{ width: 100, height: 100 }}
            />



        <div className="pb-4 flex flex-col justify-center items-center">

            <IconContext.Provider value={{ color: "white" }}  >
                <FiImage 
                // type="file" 
                size={30} 
                className="m-5"
                id="fileInput"
                // name="profileImg"
                // value={profileImg}
                onClick={executeImageChange}/>
            </IconContext.Provider>

            <input 
                type="file" 
                onChange={handleImageChange} 
                id="profileImg"
                name="profileImg"
                value={profileImg}/>


            <IconContext.Provider value={{ color: "white" }} >
                <LuUpload 
                size={30}  
                onClick={() => handleSubmitImage}
                onChange={handleSubmitImage} 
                />
            </IconContext.Provider>


        </div>
{/* 
            <button onClick={handleSubmitImage}>Submit</button> */}
        </div>


            
          <input
            type="text"
            className='mb-5 p-2 rounded-md bg-text-color'
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={handleInputChange}
            placeholder='First Name '
          />

          <input
            type="text"
            className='mb-5 p-2 rounded-md bg-text-color'
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={handleInputChange}
            placeholder='Last Name '
          />

          {/* username */}
          <input
            type="text"
            className='mb-5 p-2 rounded-md bg-text-color'
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            placeholder='Unique Username' />

            {/* country */}
            <Select
                className='mb-5 p-2 rounded-md bg-text-color' 
                options={countries}
                value={selectedCountry}
                onChange={(selectedOption) => setSelectedCountry(selectedOption)}
            />
            {/* about me */}
            <textarea
                className='mb-5 p-2 rounded-md bg-text-color'
                id="aboutme"
                name="aboutme"
                rows="4"
                value={aboutme}
                onChange={handleInputChange}
                placeholder='Talk a little about yourself...' />

           


          <button className="text-text-color bg-accent-red font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 hover:bg-red-700 duration-300" type="submit">Get Started</button>


        </div>
      </form>


    
    </div>
  );

  };


export default CreateProfile;