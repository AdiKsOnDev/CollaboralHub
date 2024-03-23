import React, { useState, useEffect, useRef, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Select from "react-select";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  getDoc,
  setDoc,
} from "@firebase/firestore";
import { database, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import { EditText, EditTextarea } from "react-edit-text";



const DisplayProfile = () => {
  const { currentUser } = useContext(AuthContext);

    //=======================================//

    const [tempData, setTempData] = useState({
      tempfirstName: "",
      templastName: "",
      tempusername: "",
      tempEducation: "",
      tempselectedCountry: "",
      tempaboutme: "",
      tempCompany: "",
      temphandle: "",
      tempSkills: "",
      tempprofileImg: "",
    });
  
    //=======================================//
  // const [firstName, setfirstName] = useState();
  const [tempfirstName, setfirstName] = useState();
  const [templastName, setlastName] = useState("");
  const [tempusername, setusername] = useState("");
  const [tempEducation, setEducation] = useState("");
  const [tempselectedCountry, setCountry] = useState("");
  const [tempaboutme, setaboutme] = useState("");
  const [tempCompany, setCompany] = useState("");
  const [temphandle, sethandle] = useState("");
  const [tempSkills, setSkills] = useState("");
  const [tempprofileImg, setprofileImg] = useState("");



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

  // =====================================================//

  useEffect(() => {
    const getContent = async () => {
      try {
        // const id = searchParams.get("id").toString();

        // console.log(id);

        const userRef = doc(collection(database, "Users"), currentUser.email);
        const userSnapshot = await getDoc(userRef);
        const user = userSnapshot.data();

        //Creating a copy
        setfirstName(user.firstName);
        //==============================//
        setlastName(user.lastName);
        setusername(user.username);
        setEducation(user.Education);
        setCountry(user.selectedCountry);
        setaboutme(user.aboutme);
        setCompany(user.Company);
        sethandle(user.handle);
        setSkills(user.Skills);
        setprofileImg(user.profileImg);
      } catch (Exception) {
        console.log("Error making copy ");
      }
    };

    getContent();
  });

  // =====================================================//


  // =====================================================//

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Corrected line
    setTempData({
      ...tempData,
      [name]: value,
    });
  };

  // //emoji picker
  // const [inputStr, setInputStr] = useState("");
  // const [showPicker, setShowPicker] = useState(false);

  // const onEmojiClick = (event, emojiObject) => {
  // setInputStr(prevInput=> prevInput + emojiObject.emoji);
  // setShowPicker(false);
  // };
  //=======================================//

  // send data to firebase
  const handleSave = async (e) => {
    e.preventDefault();

    let tempDataSave = {
      firstName: tempData.tempfirstName,
      lastName: tempData.templastName,
      username: tempData.tempusername,
      Education: tempData.tempEducation,
      selectedCountry: tempselectedCountry.label,
      aboutme: tempData.tempaboutme,
      Company: tempData.tempCompany,
      Skills: tempData.tempSkills,
      handle: tempData.temphandle,
      // profileImg: url,
    };

    // ============================================//


    //==============================================//

    try {
      await setDoc(doc(database, "Users", currentUser.email), tempDataSave);
      // clearing the form and navigating to new page
      setTempData({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        Education: "",
        selectedCountry: "",
        aboutme: "",
        Company: "",
        handle: "",
        Skills: "",
      });
    } catch (e) {
      alert("Error adding document: ", e);
    }
  };
  //===============================================//

  return (
    <>
      {/* If not logged in  */}

      <div className="flex flex-col bg-secondary w-screen h-screen p-10 rounded-lg">
        <form //   onSubmit={handleSubmit}
        >
          {/* page title */}
          <h2 className="font-semibold text-center mb-5 text-3xl text-text-color">
            Your Profile
          </h2>

          {/* Image upload and about me box */}
          <div className="grid grid-rows-8 grid-flow-col gap-4 ">
            {/* Image upload */}
            <div className="row-span-8 col-span-1 bg-zinc-700  rounded-lg p-2">
              <div className="p-0 flex flex-col justify-center items-center">
                <Avatar
                  //  src={profileImg}
                  sx={{ width: 150, height: 150 }}
                  className="m-4 "
                />

                <div className="pb-5 flex flex-row justify-center items-center text-text-color">
                  {/* 
            <input
              type="file"
            //   onChange={handleImageChange}
              className="w-3/4 p-0 m-0"
              id="profileImg"
              name="profileImg"/> */}

                  <button
                    // onClick={handleSubmitImage}
                    className="text-text-color 'hover:bg-red-700 bg-accent-red cursor-pointer' font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 justify-center items-center duration-300"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            {/*Input box for about me */}
            <div className="row-span-8 col-span-8 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
              <div className="text-2xl font-semibold mb-2 text-text-color ">
                About Me
              </div>
              <EditText
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="tempaboutme"
                name="tempaboutme"
                rows="8"
                cols="1"
                value={tempaboutme}
                onChange={handleInputChange}
                placeholder="Talk a little about yourself..."
                editButtonProps={{ style: { marginLeft: "5px", width: 16 } }}
                showEditButton
              />
            </div>
          </div>

          {/*Input box for first and last name   */}
          <div className="grid grid-cols-4 gap-4 m-2">
            <div className="col-span-2 row-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
              <label className="text-xl font-semibold mb-2 text-text-color ">First Name </label>
              <EditText
                type="text"
                className=" p-2 rounded-md w-full object-contain  font-semibold"
                id="tempfirstName"
                name="tempfirstName"
                value={tempfirstName}
                placeholder="First Name *"
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
                editButtonProps={{ style: { marginLeft: "5px", width: 16 } }}
                showEditButton
              />
            </div>

            <div className="col-span-2 row-span-2  bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
            <label className="text-xl font-semibold mb-2 text-text-color ">Last Name </label>
              <EditText
                type="text"
                className=" p-2 rounded-md w-full object-contain font-semibold "
                id="templastName"
                name="templastName"
                value={templastName}
                onChange={handleInputChange}
                placeholder="Last Name *"
                editButtonProps={{ style: { marginLeft: "1px", width: 16 } }}
                showEditButton
              />
            </div>
          </div>

          {/*Input box for Username and Country   */}
          <div className="grid grid-cols-4 gap-4 m-2">
            <div className="col-span-2 row-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
            <label className="text-xl font-semibold mb-2 text-text-color ">Username </label>
              <EditText
                type="text"
                // className="p-2 rounded-md w-full object-contain border-2 border-rose-600 font-semibold"
                id="tempusername"
                name="tempusername"
                value={tempusername}
                onChange={handleInputChange}
                placeholder="Unique Username *"
                editButtonProps={{ style: { marginLeft: "5px", width: 16 } }}
                showEditButton
              />
              {/* {username}
            </div> */}
            </div>

            <div class="col-span-2 row-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
              {/* <Select
          className="rounded-md w-full object-contain border-2 border-rose-600"
          id="selectedCountry"
          name="selectedCountry"
          options={countries}
          value={Country}
          placeholder="Country of Residence *"
        //   onChange={(selectedOption) => setSelectedCountry(selectedOption)}
          /> */}
              <label className="text-xl font-semibold mb-2 text-text-color "> Country </label>
              
              <EditText
                className="p-2 rounded-md w-3/4 object-contain font-semibold"
                value={tempselectedCountry}
                editButtonProps={{ style: { marginLeft: "5px", width: 16 } }}
                showEditButton
              />
            </div>
          </div>

          {/*Input box for Education and Company   */}
          <div className="grid grid-cols-4 gap-4 m-2">
            <div className="col-span-2 row-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
            <label className="text-xl font-semibold mb-2 text-text-color "> Education </label>
              <EditText
                type="text"
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="tempEducation"
                name="tempEducation"
                value={tempEducation}
                onChange={handleInputChange}
                editButtonProps={{ style: { marginLeft: "5px", width: 16 } }}
                showEditButton
                placeholder="Education * "
              />
            </div>

            <div className="col-span-2 row-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
            <label className="text-xl font-semibold mb-2 text-text-color "> Company Name </label>
              <EditText
                type="text"
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="tempCompany"
                name="tempCompany"
                value={tempCompany}
                onChange={handleInputChange}
                placeholder="Company Name (if employed)..."
                editButtonProps={{ style: { marginLeft: "5px", width: 16 } }}
                showEditButton
              />
            </div>
          </div>

          {/*Input box for Social Media Handles and Skills   */}
          <div className="grid grid-cols-4 gap-4 m-2">
            <div className="col-span-2 row-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
            <label className="text-xl font-semibold mb-2 text-text-color "> Social Media </label>
              <EditText
                type="url"
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="temphandle"
                name="temphandle"
                value={temphandle}
                onChange={handleInputChange}
                placeholder="Links to relevant social media handles "
                editButtonProps={{ style: { marginLeft: "5px", width: 16 } }}
                showEditButton
              />
            </div>

            <div className="col-span-2 row-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
              <label className="text-xl font-semibold mb-2 text-text-color "> Social Media </label>
              <EditText
                type="text"
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="tempSkills"
                name="tempSkills"
                value={tempSkills}
                onChange={handleInputChange}
                placeholder="Skills"
                editButtonProps={{ style: { marginLeft: "5px", width: 16 } }}
                showEditButton
              />
            </div>
          </div>

          <button
            className="text-text-color 'hover:bg-red-700 bg-accent-red cursor-pointer' font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 justify-center items-center duration-300"
            onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};
export default DisplayProfile;
