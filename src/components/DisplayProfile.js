import React, { useState, useEffect, useRef , useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Select from 'react-select';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection ,doc, getDocs, updateDoc, getDoc } from '@firebase/firestore';
import { database, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";

const DisplayProfile = () => {
    const { currentUser } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [email, setemail] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setusername] = useState("");
    const [Education, setEducation] = useState("");
    const [selectedCountry, setselectedCountry] = useState("");
    const [aboutme, setaboutme] = useState("");
    const [Company, setCompany] = useState("");
    const [handle, sethandle] = useState("");
    const [Skills, setSkills] = useState("");
    const [profileImg, setprofileImg]= useState("");

    // =====================================================//

        const [userData, setUserData] = useState(null);
        // const uniqueId = "YOUR_UNIQUE_ID"; // Replace this with the actual unique ID
        // const uniqueId = doc(collection(database, "Users"), currentUser.email);

        useEffect(() => {
          const fetchData = async () => {
            try {
                // console.log(currentUser);
                const docRef = doc(collection(database, "Users"), currentUser.email);


              if (docRef.exists) {
                setUserData(docRef.data());
                // console.log(docRef.data());
              } else {
                console.log("No such document!");
              }
            } catch (error) {
              console.error("Error fetching document: ", error);
            }
          };
      
          fetchData();
      
          // Clean up function to unsubscribe when the component unmounts
          return () => {};
        }, []); 

    // =====================================================//

    // const userRef = doc(collection(database, "Users"), currentUser.email);
    // console.log(userRef);

    // useEffect(() => {
    //     const getContent = async () => {
    //       try {
    //         // const id = searchParams.get("id").toString();

    //         // const userRef = doc(collection(database, "Users"), currentUser.id);
    //         // console.log(userRef);
    //         // const userRef = doc(collection(database, "Users"), id);
    //         // const userSnapshot = await getDoc(userRef);
    //         // console.log(userSnapshot);
    //         // const user = userSnapshot.data();
      
    //         // console.log(user);
    //         // console.log(user.firstName);
    //         // setemail(currentUser.email);
    //         // setfirstName(user.firstName);
    //         // setlastName(user.lastName);
    //         // setusername(user.username);
    //         // setEducation(user.Education);
    //         // setselectedCountry(user.selectedCountry);
    //         // setaboutme(user.aboutme);
    //         // setCompany(user.Company);
    //         // sethandle(user.handle);
    //         // setSkills(user.Skills);
    //         // setprofileImg(user.setprofileImg);

    //       } catch (Exception) {
    //         console.log("Error getting docs ");
    //       }
    //     };
    
    //     getContent();
    //     }, [searchParams])  


return (
<>
{/* If not logged in  */}

<div className="flex flex-col bg-secondary w-screen h-screen p-20 rounded-lg">

  <form 
//   onSubmit={handleSubmit}
  >

    {/* page title */}
    <h2 className="font-semibold text-center mb-5 text-3xl text-text-color"> Your Profile </h2>

    {/* Image upload and about me box */}
    <div class="grid grid-rows-8 grid-flow-col gap-4 ">

      {/* Image upload */}
      <div class="row-span-8 col-span-1 bg-zinc-700  rounded-lg p-2">
        <div className="p-0 flex flex-col justify-center items-center">
          <Avatar
        //    src={currentUser.photoUrl}
           sx={{ width: 150, height: 150 }}  className="m-4 "/>

          <div className="pb-5 flex flex-row justify-center items-center text-text-color"> 
             

            <input
              type="file"
            //   onChange={handleImageChange}
              className="w-3/4 p-0 m-0"
              id="profileImg"
              name="profileImg"/>


            <button 
            // onClick={handleSubmitImage}
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
          value={aboutme}
        //   onChange={handleInputChange}
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
          value={currentUser.displayName}
        //   onChange={handleInputChange}
          placeholder="First Name *"/>
      </div>

      <div class="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
        <input
          type="text"
          className=" p-2 rounded-md w-full object-contain border-2 border-rose-600 "
          id="lastName"
          name="lastName"
          value={lastName}
        //   onChange={handleInputChange}
          placeholder="Last Name *"/>
      </div>
    </div>

    {/*Input box for Username and Country   */}
    <div class="grid grid-cols-4 gap-4 m-2">
      <div class="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
        <div
        //   type="text"
          className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
        //   id="username"
        //   name="username"
        //   value={username}
        //   onChange={handleInputChange}
          placeholder="Unique Username *">
            {username}
            </div>

      </div>

      <div class="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
        <Select
          className="rounded-md w-full object-contain border-2 border-rose-600"
          id="selectedCountry"
          name="selectedCountry"
        //   options={countries}
          value={selectedCountry}
          placeholder="Country of Residence *"
        //   onChange={(selectedOption) => setSelectedCountry(selectedOption)}
          />
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
          value={Education}
        //   onChange={handleInputChange}
        //   placeholder="Education * "
          />
      </div>

      <div class="col-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
        <input
          type="text"
          className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
          id="Company"
          name="Company"
          value={Company}
        //   onChange={handleInputChange}
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
            value={handle}
            // onChange={handleInputChange}
            placeholder="Links to relevant social media handles "/>
          </div>

        <div class="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
          <input
            type="text"
            className="p-2 rounded-md w-full object-contain border-2 border-rose-600"
            id="Skills"
            name="Skills"
            value={Skills}
            // onChange={handleInputChange}
            placeholder="Skills"/>
        </div>
    </div>

    <button className="text-text-color 'hover:bg-red-700 bg-accent-red cursor-pointer' font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 justify-center items-center duration-300" 
    // disabled={!url} 
    // Click={handleSubmit}
    >Get Started</button>



  </form>
</div>
end of not logged in

</>  
  );
};

export default DisplayProfile;