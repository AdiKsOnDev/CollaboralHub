// //country picker 
// import Select from "react-select";
// //-------------------------------------------------------------------------
// import React, { useState, useEffect,useRef } from 'react';
// import { useId } from 'react';
// import Avatar from '@mui/material/Avatar';
// import {storage} from "../firebase"; 
// import {ref, uploadBytes , getDownloadURL} from "firebase/storage"; 
// import { addDoc, collection } from '@firebase/firestore';
// import { database } from "../firebase";
// import { IconContext } from "react-icons";
// import { FiImage } from "react-icons/fi";
// import { useNavigate } from 'react-router-dom';
// import { LuUpload } from "react-icons/lu";

// import { v4 as uuidv4 } from 'uuid';

// //UN-COMMENT AFTER TESTING 
// import {v4} from 'uuid';

// {/* ============chat=============== */}
// //import { v4 as uuidv4 } from 'uuid'
// {/* ============chat=============== */}

// const CreateProfile = () => {

// //-------------------------------
// //     Setting Data 
// //-------------------------------

// //Uncomment after testing 
// // const [fullname,setfullname]= useState();
// // const [username, setusername]= useState();
// // const [Occupation, setOccupation]= useState();
// // const [Country, setcountry]= useState();
// // const [aboutme, setaboutme]= useState();
// // const [Company, setCompany]= useState();
// // const [handle, sethandle]= useState();
// // const [profileImg, setprofileImg]= useState(null);
// // const [image, setImage] =useState(null);


// {/* ============chat=============== */}

// const fullname = useRef(null);
// const username = useRef();
// const Occupation = useRef();
// const Country = useRef();
// const aboutme = useRef();
// const Company = useRef();
// const handle = useRef();
// const profileImg = useRef(null);

// {/* ============chat=============== */}


// //-------------------------------
// //           Images
// //-------------------------------
// const [url, setUrl] =useState(null);

// // const executeImageChange =(e)=>{
// //     if(e == this.fileInput){
// //         handleImageChange();
// //     }
// // }
// //=================================

// // UN-COMMMENT THIS AFTER TESTING 

// const handleImageChange = (e) => {
//     if(e.target.files[0]) {
//         setImage(e.target.files[0]);
//     }
// };
// const handleSubmitImage=() => {
//     const imageRef =ref(storage , `image/ ${v4()}`);
//     uploadBytes(imageRef, image).then(() => {
//       getDownloadURL(imageRef).then((url) => {
//         // setUrl(url);
//         setUrl(url);
//       }).catch(error => {
//         console.log(error.message, " error getting the image url " );
//       })
//     setImage(null);
//     alert("Image Uploaded");    
//     })
//     .catch((error)=> {
//         console.log(error.message);
//     })
// };

// {/* ============chat=============== */}
// // const handleSubmitImage = () => {
// //     const imageRef = ref(storage, `image/${v4()}`);
// //     if (image) {
// //       uploadBytes(imageRef, image)
// //         .then(() => {
// //           getDownloadURL(imageRef)
// //             .then((url) => {
// //               setUrl((prevUrls) => [...prevUrls, url]);
// //             })
// //             .catch((error) => {
// //               console.log(error.message, ' error getting the image url ');
// //             });
// //           setImage(null);
// //           alert('Image Uploaded');
// //         })
// //         .catch((error) => {
// //           console.log(error.message);
// //         });
// //     } else {
// //       alert('Please select an image first.');
// //     }
// //   };
  






// {/* ============chat=============== */}




// //dummy code 

// // const uploadFile = () => {
// //     if (!imageUpload) return;
// //     const imageRef = getStorage(storage, `posts/${imageUpload.name}_${uuidv4()}`);
// //     uploadBytes(imageRef, imageUpload).then((snapshot) => {
// //       getDownloadURL(snapshot.ref).then((url) => {
// //         setImageUrls((prevUrls) => [...prevUrls, url]);
// //       });
// //     });
// //   };
// //-------------------------------
// //        Country Picker 
// //-------------------------------

// const [countries, setCountries] = useState([]);
// const [selectedCountry, setSelectedCountry] = useState({});

// useEffect(() => {
//   fetch(
//     "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       setCountries(data.countries);
//       setSelectedCountry(data.userSelectValue);
//     });
// }, []);


// //-------------------------------
//   const id = useId();
//   const [formData, setFormData] = useState({
//     fullname: '',
//     username:'',
//     Occupation: '',
//     aboutme: '',
//     Company: '',
//     handle: '',
//     image: '',
//   });


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

// //   const profileRef= React.useRef();
// //   const profDbRef = collection( database, "UserProfile");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const { fullname, username ,Occupation,   } = formData;

// //     // Basic validation - check if email and password are not empty
// //     if (!fullname || !username || !Occupation ) {
// //       setFormData({ ...formData, error: 'Please fill out the mandatory fields' });
// //       return;
// //     }
    
// //     // setFormData({ firstname:'', lastname:'' , username:'' , aboutme:'',  });

// //         let data = {
// //             id:profileRef,
// //             firstName: firstname,
// //             lastName:lastname,
// //             userName:username,
// //             aboutMe:aboutme, 
// //             profileImg:profileImg,

// //         }

// //         try {
// //             addDoc(profDbRef, data);
// //             navigate("/Community");
// //         }

// //         catch(e) {
// //             alert("Error adding document: ", e);
// //         }

        

// //     };
   
  
// // const { fullname, username ,Occupation, aboutme, Company, handle, profileImg  } = formData;

// //setting data 

// //=================================


// const profDbRef = collection( database, "UserProfile");

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   let data = {
//     fullname: fullname.current.value,
//     username: username.current.value,
//     Occupation: Occupation.current.value,
//     aboutme: aboutme.current.value,
//     Company: Company.current.value,
//     handle: handle.current.value,
//     image: image,
//   };

//   try {
//     await addDoc(profDbRef, data);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }

//   setTimeout(() => {
//     window.location.reload(true);
//   }, 6000);
// };

// //=================================


//   return (
//     <div className="flex flex-col bg-secondary w-fit p-10 items-center rounded-lg">
//       <h2 className="font-semibold text-center mb-7 text-3xl text-text-color">Your Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="flex flex-col justify-center items-center">

//         <div className="p-0 flex flex-row justify-center items-center">
//             <Avatar
//             src={url}
//             sx={{ width: 100, height: 100 }}
//             />

//             <div className="pb-4 flex flex-col justify-center items-center">

//                 {/* <IconContext.Provider value={{ color: "white" }}  >
//                     <FiImage 
//                     // type="file" 
//                     size={30} 
//                     className="m-5"
//                     name="profileImg"
//                     value={profileImg}
//                     onChange={handleImageChange}/>
//                 </IconContext.Provider> */}

//                 <input 
//                     type="file" 
//                     ref={profileImg}
//                     onChange={handleImageChange} 
//                     className='w-3/4'
//                     id="profileImg"
//                     name="profileImg"/> 

//                 {/* <IconContext.Provider value={{ color: "white" }} >
//                     <LuUpload 
//                     size={30}  
//                     onClick={() => handleSubmitImage}
//                     onChange={handleSubmitImage} 
//                     />
//                 </IconContext.Provider> */}

//                 <button 
//                 onClick={handleSubmitImage}
//                 className=' w-45 p-2 rounded-md bg-text-color'
//                 >Upload</button>
//             </div>

            
//         </div>


            
//           <input
//             type="text"
//             className='mb-5 p-2 w-3/4 rounded-md bg-text-color'
//             id="fullname"
//             name="fullname"
//             value={fullname}
//             ref={fullname}
//             onChange={handleInputChange}
//             placeholder='Full Name *'
//           />

//           {/* username */}
//           <input
//             type="text"
//             className='mb-5 p-2 w-3/4 rounded-md bg-text-color'
//             id="username"
//             name="username"
//             value={username}
//             ref={username}
//             onChange={handleInputChange}
//             placeholder='Unique Username *' />


//             {/* country */}
//           {/* <Select
//             className='mb-5 p-2 w-3/4  rounded-md bg-text-color' 
//             options={countries}
//             ref={Country}
//             value={selectedCountry}
//             placeholder='Located In *' 
//             onChange={(selectedOption) => setSelectedCountry(selectedOption) && handleInputChange }
//             /> */}

//             {/* ============chat=============== */}

//             <Select
//             className='mb-5 p-2 w-3/4  rounded-md bg-text-color'
//             options={countries}
//             ref={Country}
//             value={selectedCountry}
//             placeholder='Located In *'
//             onChange={(selectedOption) => {
//                 setSelectedCountry(selectedOption);
//                 handleInputChange({
//                 target: { name: 'Country', value: selectedOption },
//                 });
//             }}
//             />

//             {/* ============chat=============== */}

//             {/* current occupation */}
//           <input
//             type="text"
//             className='mb-5 p-2 w-3/4 rounded-md bg-text-color'
//             id="Occupation"
//             name="Occupation"
//             ref={Occupation}
//             value={Occupation}
//             onChange={handleInputChange}
//             placeholder='Occupation * '
//           />

//         {/* current company name */}
//           <input
//             type="text"
//             className='mb-5 p-2 w-3/4 rounded-md bg-text-color'
//             id="Company"
//             name="Company"
//             ref={Company}
//             value={Company}
//             onChange={handleInputChange}
//             placeholder='Company Name (if employed)...'
//           />

//           {/* current company name */}
//           <input
//             type="url"
//             className='mb-5 p-2 w-3/4 rounded-md bg-text-color'
//             id="handle"
//             name="handle"
//             ref={handle}
//             value={handle}
//             onChange={handleInputChange}
//             placeholder='Links to relevant social media handles '
//           />

//             {/* about me */}
//           <textarea
//             className='mb-5 p-2 w-3/4 rounded-md bg-text-color'
//             id="aboutme"
//             name="aboutme"
//             ref={aboutme}
//             rows="4"
//             col="5"
//             value={aboutme}
//             onChange={handleInputChange}
//             placeholder='Talk a little about yourself...' />

           


//           <button className="text-text-color bg-accent-red font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 hover:bg-red-700 duration-300" type="submit">Get Started</button>


//         </div>
//       </form>


    
//     </div>
//   );

//   };


// export default CreateProfile;


import React, { useState, useEffect, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Select from 'react-select';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from '@firebase/firestore';
import { database, storage } from '../firebase';
import { LuUpload } from 'react-icons/lu';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const CreateProfile = () => {
  const [fullname, setfullname] = useState('');
  const [username, setusername] = useState('');
  const [Occupation, setOccupation] = useState('');
//   const [Country, setcountry] = useState('');
  const [aboutme, setaboutme] = useState('');
  const [Company, setCompany] = useState('');
  const [handle, sethandle] = useState('');
  const [profileImg, setprofileImg] = useState(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  const navigate= useNavigate();

//   const country = formData.selectedCountry;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    Occupation: '',
    selectedCountry:'',
    aboutme: '',
    Company: '',
    handle: '',
    profileImg: '',
    Skills:'',
  });
  

  const profDbRef = collection(database, 'UserProfile');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case 'Country':
//         setSelectedCountry(value);
//         break;
//       case 'image':
//         setImage(e.target.files[0]);
//         break;
//       default:
//         // Handle other input changes
//         break;
//     }
//   };

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
    // else {
    //   alert('Please select an image first.');
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
    //   fullname:fullname,
    //   username:username,
    //   Occupation:Occupation,
    //   aboutme:aboutme,
    //   Company:Company,
    //   handle:handle,
    //   image: url,

      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      Occupation: formData.Occupation,
      selectedCountry: formData.selectedCountry,
      aboutme: formData.aboutme,
      Company: formData.Company,
      handle: formData.handle,
      profileImg: url,
    };

    try {
      handleSubmitImage();
      await addDoc(profDbRef, data);
    } catch (e) {
      alert('Error adding document: ', e);
    }

    // setTimeout(() => {
    //   window.location.reload(true);
    // }, 6000);

    setFormData({ firstName: '',lastName:'', username: '',Occupation: '',selectedCountry:'',aboutme: '',Company: '',handle: '',profileImg: '',Skills:'',});
    navigate("/Community");

 
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

  return (
    <>
     {/* <div className="flex flex-col bg-secondary w-screen h-screen p-10 items-center rounded-lg"> */}

      <form onSubmit={handleSubmit}  className="flex flex-col bg-secondary w-screen h-screen p-20 rounded-lg">


      <h2 className="font-semibold text-center mb-5 text-3xl text-text-color">
        Your Profile
      </h2>

      <div class="grid grid-rows-8  grid-flow-col gap-4 ">
        <div class="row-span-8 col-span-1 bg-zinc-700  rounded-lg p-2">
          
          <div className="p-0 flex flex-col justify-center items-center">
            <Avatar src={url} sx={{ width: 150, height: 150 }}  className="m-4 "/>

            <div className="pb-5 flex flex-col justify-center items-center text-text-color">

           
              <input
                type="file"
                onChange={handleImageChange}
                className="w-3/4 p-0 m-0"
                id="profileImg"
                name="profileImg"
              />

              {/* <button
                onClick={handleSubmitImage}
                className="w-45 p-2 rounded-md bg-text-color"
              >
                Upload
              </button> */}
            </div>
          </div>
          
        </div>
        {/* <div class="col-span-2  bg-gray-400 items-center rounded-lg">02</div> */}
        <div class="row-span-8 col-span-8 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
        
        <div class="text-2xl font-semibold mb-2 text-text-color ">
           About Me
        </div>
        
        
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




      <div class="grid grid-cols-4 gap-4 m-2">

        <div class="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">

        {/* <div class="text-2xl font-semibold mb-2 text-text-color ">
           About Me
        </div> */}


        <input
            type="text"
            className=" p-2 rounded-md w-full object-contain border-2 border-rose-600"
            id="fullname"
            name="fullname"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name *"
          />

        </div>

        <div class="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">

        <input
            type="text"
            className=" p-2 rounded-md w-full object-contain border-2 border-rose-600 "
            id="fullname"
            name="fullname"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name *"
          />
        
        </div>
      </div>

{/*  */}




<div class="grid grid-cols-4 gap-4 m-2">

        <div class="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">

        {/* <div class="text-2xl font-semibold mb-2 text-text-color ">
           About Me
        </div> */}
          <input
            type="text"
            className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Unique Username *"
          />


        </div>

        <div class="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">

        <Select
            className="rounded-md w-full object-contain border-2 border-rose-600"
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption) => {
                setSelectedCountry(selectedOption);
                handleInputChange({
                target: { name: 'Country', value: selectedOption.code },
                });
            }}
            />
        
        </div>
      </div>



{/*  */}



<div class="grid grid-cols-4 gap-4 m-2">

        <div class="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">

        {/* <div class="text-2xl font-semibold mb-2 text-text-color ">
           About Me
        </div> */}
          <input
            type="text"
            className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
            id="Occupation"
            name="Occupation"
            value={formData.Occupation}
            onChange={handleInputChange}
            placeholder="Education * "
          />


        </div>

        <div class="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">

        <input
            type="text"
            className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
            id="Company"
            name="Company"
            value={formData.Company}
            onChange={handleInputChange}
            placeholder="Company Name (if employed)..."
          />

        
        </div>
      </div>


{/*  */}



{/*  */}
<div class="grid grid-cols-4 gap-4 m-2">

        <div class="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">

        {/* <div class="text-2xl font-semibold mb-2 text-text-color ">
           About Me
        </div> */}
          <input
            type="url"
            className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
            id="handle"
            name="handle"
            value={formData.handle}
            onChange={handleInputChange}
            placeholder="Links to relevant social media handles "
          />


        </div>

        <div class="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">

        <input
            type="text"
            className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
            id="Skills"
            name="Skills"
            value={formData.Skills}
            onChange={handleInputChange}
            placeholder="Skills"
          />

        
        </div>
      </div>

{/*  */}


</form>

<button className="text-text-color bg-accent-red font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 hover:bg-red-700 duration-300" onClick={handleSubmit}>Get Started</button>







{/*  */}

        {/* <div className="flex flex-col justify-center items-center"> */}

          {/* Profile image  */}
          {/* <div className="p-0 flex flex-row justify-center items-center">
            <Avatar src={url} sx={{ width: 100, height: 100 }} /> */}

            {/* <div className="pb-4 flex flex-col justify-center items-center"> */}
              {/* <input
                type="file"
                onChange={handleImageChange}
                className="w-3/4"
                id="profileImg"
                name="profileImg"
              /> */}

              {/* <button
                onClick={handleSubmitImage}
                className="w-45 p-2 rounded-md bg-text-color"
              >
                Upload
              </button> */}
            {/* </div> */}
          {/* </div> */}

          {/* <input
            type="text"
            className="mb-5 p-2 w-3/4 rounded-md bg-text-color"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            placeholder="Full Name *"
          /> */}

          {/* <input
            type="text"
            className="mb-5 p-2 w-3/4 rounded-md bg-text-color"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Unique Username *"
          /> */}

          {/* Country
          <Select
            className="mb-5 p-2 w-3/4 rounded-md bg-text-color"
            options={countries}
            value={formData.selectedCountry}
            onChange={(selectedOption) => {
              setSelectedCountry(selectedOption);
              handleInputChange({
                target: { name: 'Country', value: selectedOption },
              });
            }}
          /> */}

            {/* <Select
            className="mb-5 p-2 w-3/4 rounded-md bg-text-color"
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption) => {
                setSelectedCountry(selectedOption);
                handleInputChange({
                target: { name: 'Country', value: selectedOption.code },
                });
            }}
            /> */}

            {/* <Select
            className="mb-5 p-2 w-3/4 rounded-md bg-text-color"
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption) => {
                setSelectedCountry(selectedOption);
                handleInputChange({
                target: { name: 'Country', value: selectedOption.code },
                });
            }}
            /> */}



          {/* <input
            type="text"
            className="mb-5 p-2 w-3/4 rounded-md bg-text-color"
            id="Occupation"
            name="Occupation"
            value={formData.Occupation}
            onChange={handleInputChange}
            placeholder="Occupation * "
          /> */}

          {/* <input
            type="text"
            className="mb-5 p-2 w-3/4 rounded-md bg-text-color"
            id="Company"
            name="Company"
            value={formData.Company}
            onChange={handleInputChange}
            placeholder="Company Name (if employed)..."
          /> */}

          {/* <input
            type="url"
            className="mb-5 p-2 w-3/4 rounded-md bg-text-color"
            id="handle"
            name="handle"
            value={formData.handle}
            onChange={handleInputChange}
            placeholder="Links to relevant social media handles "
          /> */}

      

        

{/* 
        </div> */}
      {/* </form> */}


    
    {/* // </div> */}

    </>
  );

  };


export default CreateProfile;
