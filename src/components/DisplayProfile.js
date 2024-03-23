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
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DisplayProfile = () => {
  const { currentUser } = useContext(AuthContext);
  //=======================================//
  const [tempfirstName, setfirstName] = useState("");
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
        const userRef = doc(collection(database, "Users"), currentUser.email);
        const userSnapshot = await getDoc(userRef);
        const user = userSnapshot.data();

        //Creating a copy
        setfirstName(user.firstName);
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
  // send data to firebase
  const handleSave = async (e) => {
    e.preventDefault();

    const userRef = doc(collection(database, "Users"), currentUser.email);
    const userSnapshot = await getDoc(userRef);
    const user = userSnapshot.data();

    let data = {
      email: user.email,
      firstName: tempfirstName,
      lastName: templastName,
      username: tempusername,
      Education: tempEducation,
      selectedCountry: tempselectedCountry,
      aboutme: tempaboutme,
      Company: tempCompany,
      handle: temphandle,
      Skills: tempSkills,
      profileImg: tempprofileImg,
    };
    console.log(data);

    // ============================================//
    try {
      console.log("USER IS --> " + user.email);
      const response = await updateDoc(doc(database, "Users", user.email), data);

      console.log(response);
      alert("Profile Saved!");
    } catch (e) {
      alert("Error adding document: ", e);
    }
  };
  //===============================================//

  return (
    <>
      <div className="flex flex-col bg-secondary w-screen h-screen p-10 rounded-lg">
        <form onSubmit={handleSave}>
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
                  src={tempprofileImg}
                  sx={{ width: 150, height: 150 }}
                  className="m-4 "
                />

                <div className="pb-5 flex flex-row justify-center items-center text-text-color">
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
              <textarea
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="tempaboutme"
                name="tempaboutme"
                rows="8"
                cols="1"
                defaultValue={tempaboutme}
                onChange={(event) => {setaboutme(event.target.value)}}
                placeholder="Talk a little about yourself..."
              />
            </div>
          </div>

          {/*Input box for first and last name   */}
          <div className="grid grid-cols-4 gap-4 m-2">
            <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
              <label className="text-xl font-semibold mb-2 text-text-color ">
                First Name{" "}
              </label>
              <input
                type="text"
                className=" p-2 rounded-md w-full object-contain font-semibold"
                id="tempfirstName"
                name="tempfirstName"
                defaultValue={tempfirstName}
                placeholder="First Name *"
                onChange={(event) => {setfirstName(event.target.value)}}
              />
            </div>

            <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
              <label className="text-xl font-semibold text-text-color ">
                Last Name{" "}
              </label>
              <input
                type="text"
                className=" p-2 rounded-md w-full object-contain font-semibold "
                id="templastName"
                name="templastName"
                defaultValue={templastName}
                onChange={(event) => {setlastName(event.target.value)}}
                placeholder="Last Name *"
              />
            </div>
          </div>

          {/*Input box for Username and Country   */}
          <div className="grid grid-cols-4 gap-4 m-2">
            <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
              <label className="text-xl font-semibold text-text-color ">
                Username{" "}
              </label>
              <input
                type="text"
                className="p-2 rounded-md w-full object-contain border-2 font-semibold"
                id="tempusername"
                name="tempusername"
                defaultValue={tempusername}
                onChange={(event) => {setusername(event.target.value)}}
                placeholder="Unique Username *"
              />
              {/* {username}
            </div> */}
            </div>

            <div class="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
    
              <label className="text-xl font-semibold text-text-color ">
                {" "}
                Country{" "}
              </label>

              <Select
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="selectedCountry"
                name="selectedCountry"
                value={selectedCountry}
                options={countries}
                onChange={(selectedOption) => {
                  setSelectedCountry(selectedOption);
                  setCountry(selectedOption);
                }}
              />
            </div>
          </div>

          {/*Input box for Education and Company   */}
          <div className="grid grid-cols-4 gap-4 m-2">
            <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
              <label className="text-xl font-semibold text-text-color ">
                {" "}
                Education{" "}
              </label>
              <input
                type="text"
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="tempEducation"
                name="tempEducation"
                defaultValue={tempEducation}
                onChange={(event) => {setEducation(event.target.value)}}
                placeholder="Education * "
              />
            </div>

            <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
              <label className="text-xl font-semibold text-text-color ">
                {" "}
                Company Name{" "}
              </label>
              <input
                type="text"
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="tempCompany"
                name="tempCompany"
                defaultValue={tempCompany}
                onChange={(event) => {setCompany(event.target.value)}}
                placeholder="Company Name (if employed)..."
              />
            </div>
          </div>

          {/*Input box for Social Media Handles and Skills   */}
          <div className="grid grid-cols-4 gap-4 m-2">
            <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4">
              <label className="text-xl font-semibold text-text-color ">
                {" "}
                Social Media{" "}
              </label>
              <input
                type="url"
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="temphandle"
                name="temphandle"
                defaultValue={temphandle}
                onChange={(event) => {sethandle(event.target.value)}}
                placeholder="Links to relevant social media handles "
              />
            </div>

            <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
              <label className="text-xl font-semibold text-text-color ">
                {" "}
                Social Media{" "}
              </label>
              <input
                type="text"
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="tempSkills"
                name="tempSkills"
                defaultValue={tempSkills}
                onChange={(event) => {sethandle(event.target.value)}}
                placeholder="Skills"
              />
            </div>
          </div>

          <button
            className="text-text-color 'hover:bg-red-700 bg-accent-red cursor-pointer' font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 justify-center items-center duration-300"
            onClick={handleSave}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};
export default DisplayProfile;
