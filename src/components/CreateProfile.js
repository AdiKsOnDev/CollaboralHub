import React, { useState, useEffect, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Select from 'react-select';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from '@firebase/firestore';
import { database, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";


const CreateProfile = () => {
//=======================================//
//          User Verification            //
//=======================================//

//*************** Adils code ******************// 
const { currentUser } = useContext(AuthContext);

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
    firstName: '',
    lastName: '',
    displayName: '',
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

  const handleSubmitImage = async (e) => {
    e.preventDefault(); 
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
  
  //=======================================//
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

// const profDbRef = collection(database, 'Users');
const navigate= useNavigate();
// send data to firebase  
const handleSubmit = async (e) => {
  e.preventDefault();


  let data = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    displayName: formData.displayName,
    Education: formData.Education,
    selectedCountry: selectedCountry.label,
    aboutme: formData.aboutme,
    Company: formData.Company,
    Skills: formData.Skills,
    handle: formData.handle,
    profileImg: url,
  };

  // ============================================//

  if (!data.firstName || !data.lastName || !data.profileImg || !data.displayName) {
    alert('Please fill out all mandatory fields');
  } else {

  //==============================================//

  try {

    await updateDoc(doc(database, "Users", currentUser.email), data); 
    
    // clearing the form and navigating to new page 
    setFormData({ email:'',firstName: '',lastName:'', displayName: '',Education: '',selectedCountry:'',aboutme: '',Company: '',handle: '',Skills:''});

    navigate("/Login");
  
  } catch (e) {
    alert('Error adding document: ', e);
  }
}
 //===============================================//
 

};

return (
<>
{/* If not logged in  */}

<div className="flex flex-col bg-secondary w-screen h-screen p-20 rounded-lg">

  <form onSubmit={handleSubmit}>

    {/* page title */}
    <h2 className="font-semibold text-center mb-5 text-3xl text-text-color"> Your Profile </h2>

    {/* Image upload and about me box */}
    <div className="grid grid-rows-8 grid-flow-col gap-4 ">

      {/* Image upload */}
      <div className="row-span-8 col-span-1 bg-zinc-700  rounded-lg p-2">
        <div className="p-0 flex flex-col justify-center items-center">
          <Avatar src={url} sx={{ width: 150, height: 150, }}  className="m-4 border-2 border-rose-600"/>

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
      <div className="row-span-8 col-span-8 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
        <div className="text-2xl font-semibold mb-2 text-text-color "> About Me </div>
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
    <div className="grid grid-cols-4 gap-4 m-2">
      <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
        <input
          type="text"
          className=" p-2 rounded-md w-full object-contain border-2 border-rose-600"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name *"/>
      </div>

      <div className="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
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

    {/*Input box for displayName and Country   */}
    <div className="grid grid-cols-4 gap-4 m-2">
      <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
        <input
          type="text"
          className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={handleInputChange}
          placeholder="Unique Username *"/>
      </div>

      <div className="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
        <Select
          className="rounded-md w-full object-contain border-2 border-zinc-50"
          id="selectedCountry"
          name="selectedCountry"
          options={countries}
          value={selectedCountry}
          placeholder="Country of Residence "
          onChange={(selectedOption) => setSelectedCountry(selectedOption)}/>
      </div>
    </div>

    {/*Input box for Education and Company   */}
    <div className="grid grid-cols-4 gap-4 m-2">
      <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
        <input
          type="text"
          className="p-2 rounded-md w-full object-contain border-2 border-zinc-50"
          id="Education"
          name="Education"
          value={formData.Education}
          onChange={handleInputChange}
          placeholder="Education  "/>
      </div>

      <div className="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
        <input
          type="text"
          className="p-2 rounded-md w-full object-contain border-2 border-zinc-50"
          id="Company"
          name="Company"
          value={formData.Company}
          onChange={handleInputChange}
          placeholder="Company Name (if employed)..."/>
      </div>
    </div>

    {/*Input box for Social Media Handles and Skills   */}
    <div className="grid grid-cols-4 gap-4 m-2">
        <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
          <input
            type="url"
            className="p-2 rounded-md w-full object-contain border-2 border-zinc-50"
            id="handle"
            name="handle"
            value={formData.handle}
            onChange={handleInputChange}
            placeholder="Links to relevant social media handles "/>
          </div>

        <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
          <input
            type="text"
            className="p-2 rounded-md w-full object-contain border-2 border-zinc-50"
            id="Skills"
            name="Skills"
            value={formData.Skills}
            onChange={handleInputChange}
            placeholder="Skills"/>
        </div>
    </div>

    <button className="text-text-color 'hover:bg-red-700 bg-accent-red cursor-pointer' font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 justify-center items-center duration-300" disabled={!url} Click={handleSubmit}>Get Started</button>



  </form>
</div>
{/* end of not logged in */}
{/* ================== */}
{/* If logged in  */}


{/* end of logged in */}
</>  
  );
};

export default CreateProfile;
