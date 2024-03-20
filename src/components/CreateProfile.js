import React, { useState, useEffect, useRef , useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Select from 'react-select';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection ,doc,getDoc } from '@firebase/firestore';
import { database, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";




const CreateProfile = () => {
//=======================================//
//          User Verification            //
//=======================================//

//*************** Adils code ******************// 
const { currentUser } = useContext(AuthContext);
const [searchParams, setSearchParams] = useSearchParams();
const [email, setEmail] = useState("");


useEffect(() => {

  const getContent = async () => {
    try {
      const useremail = searchParams.get("email").toString();

      console.log(useremail);

      const UserRef = doc(collection(database, "Users"), useremail);
      const fileSnapshot = await getDoc(UserRef);
      const file = fileSnapshot.data();

      setEmail(file.email);

    } catch (Exception) {
      console.log("NO EMAIL");
    }
  };

  getContent();
  }, [searchParams])  

//*********************************************// 


//=======================================//
//           Country Picker              //
//=======================================//
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

 //=======================================//

  const [formData, setFormData] = useState({
    email:'',
    firstName: '',
    lastName: '',
    username: '',
    Education: '',
    selectedCountry:'',
    aboutme: '',
    Company: '',
    handle: '',
    Skills:'',
  });
  

  //=======================================//
  //          Text Field Uploading         //
  //=======================================//

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //=======================================//

  //=======================================//
  //          Image Uploading              //
  //=======================================//


  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitImage = () => {
    const imageRef = ref(storage, `image/${uuidv4()}`);
    if (image) {
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url);
              console.log(url);
            })
            .catch((error) => {
              console.log(error.message, ' error getting the image url ');
            });
          setImage(null);
          alert('Image Uploaded');
        })
        .catch((error) => {
          console.log(error.message);
        });
    } 
    else {
      alert('Please select an image first.');
    }
  };
  

  useEffect(() => {
    fetch(
      'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code'
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

//=======================================//

const profDbRef = collection(database, 'Users');
const navigate= useNavigate();
// send data to firebase  
const handleSubmit = async (e) => {
  e.preventDefault();

  let data = {
    email: email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    username: formData.username,
    Education: formData.Education,
    selectedCountry: selectedCountry.label,
    aboutme: formData.aboutme,
    Company: formData.Company,
    handle: formData.handle,
    profileImg: url,
  };

  try {
    await addDoc(profDbRef, data);
    // navigate("/Community");
  
  } catch (e) {
    alert('Error adding document: ', e);
  }
 //================
  // clearing the form and navigating to new page 
  setFormData({ email:'',firstName: '',lastName:'', username: '',Education: '',selectedCountry:'',aboutme: '',Company: '',handle: '',Skills:'',});
  
};

return (
<>
{
<div className="flex flex-col bg-secondary w-screen h-screen p-20 rounded-lg">

  <form onSubmit={handleSubmit}>

    {/* page title */}
    <h2 className="font-semibold text-center mb-5 text-3xl text-text-color"> Your Profile </h2>

    {/* Image upload and about me box */}
    <div class="grid grid-rows-8 grid-flow-col gap-4 ">

      {/* Image upload */}
      <div class="row-span-8 col-span-1 bg-zinc-700  rounded-lg p-2">
        <div className="p-0 flex flex-col justify-center items-center">
          <Avatar src={url} sx={{ width: 150, height: 150 }}  className="m-4 "/>

          <div className="pb-5 flex flex-row justify-center items-center text-text-color"> 
             

            <input
              type="file"
              onChange={handleImageChange}
              className="w-3/4 p-0 m-0"
              id="profileImg"
              name="profileImg"/>


            <button 
            onClick={handleSubmitImage}
            className="text-text-color px-1 py-1 'hover:bg-red-700 bg-accent-red cursor-pointer' w-25 rounded-md justify-center items-center duration-300" >
              Set Image
            </button> 

          </div>
        </div>    
      </div>

      {/*Input box for about me */}
      <div class="row-span-8 col-span-8 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
        <div class="text-2xl font-semibold mb-2 text-text-color "> About Me </div>
        <textarea
          className='p-2 rounded-md w-full object-contain '
          id="aboutme"
          name="aboutme"
          rows="8"
          cols="1"
          value={formData.aboutme}
          onChange={handleInputChange}
          placeholder='Talk a little about yourself...' />
      </div>
    </div>

    {/*Input box for first and last name   */}
    <div class="grid grid-cols-4 gap-4 m-2">
      <div class="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
        <input
          type="text"
          className=" p-2 rounded-md w-full object-contain border-2 border-rose-600"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name *"/>
      </div>

      <div class="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
        <input
          type="text"
          className=" p-2 rounded-md w-full object-contain border-2 border-rose-600 "
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name *"/>
      </div>
    </div>

    {/*Input box for Username and Country   */}
    <div class="grid grid-cols-4 gap-4 m-2">
      <div class="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
        <input
          type="text"
          className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Unique Username *"/>
      </div>

      <div class="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
        <Select
          className="rounded-md w-full object-contain border-2 border-rose-600"
          id="selectedCountry"
          name="selectedCountry"
          options={countries}
          value={selectedCountry}
          placeholder="Country of Residence *"
          onChange={(selectedOption) => setSelectedCountry(selectedOption)}/>
      </div>
    </div>

    {/*Input box for Education and Company   */}
    <div class="grid grid-cols-4 gap-4 m-2">
      <div class="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
        <input
          type="text"
          className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
          id="Education"
          name="Education"
          value={formData.Education}
          onChange={handleInputChange}
          placeholder="Education * "/>
      </div>

      <div class="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
        <input
          type="text"
          className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
          id="Company"
          name="Company"
          value={formData.Company}
          onChange={handleInputChange}
          placeholder="Company Name (if employed)..."/>
      </div>
    </div>

    {/*Input box for Social Media Handles and Skills   */}
    <div class="grid grid-cols-4 gap-4 m-2">
        <div class="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
          <input
            type="url"
            className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
            id="handle"
            name="handle"
            value={formData.handle}
            onChange={handleInputChange}
            placeholder="Links to relevant social media handles "/>
          </div>

        <div class="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
          <input
            type="text"
            className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
            id="Skills"
            name="Skills"
            value={formData.Skills}
            onChange={handleInputChange}
            placeholder="Skills"/>
        </div>
    </div>

    <button className="text-text-color {{ disabled ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-red-700 bg-accent-red cursor-pointer' }} font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 justify-center items-center duration-300" disabled={!url} Click={handleSubmit}>Get Started</button>



  </form>
</div>
}
</>  
  );
};

export default CreateProfile;