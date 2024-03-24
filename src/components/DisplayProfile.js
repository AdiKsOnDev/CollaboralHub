import React, { useState, useEffect, useRef, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Select from "react-select";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BsHouse } from "react-icons/bs";
import { IconContext } from "react-icons";
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
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DisplayProfile = () => {
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

  // =====================================================//

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    Education: "",
    selectedCountry: "",
    aboutme: "",
    Company: "",
    handle: "",
    Skills: "",
    profileImg:""
  });
  // =====================================================//

  useEffect(() => {
    const getContent = async () => {
      try {
        const userRef = doc(collection(database, "Users"), currentUser.email);
        const userSnapshot = await getDoc(userRef);
        const user = userSnapshot.data();
  
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          Education: user.Education,
          selectedCountry: user.selectedCountry,
          aboutme: user.aboutme,
          Company: user.Company,
          handle: user.handle,
          Skills: user.Skills,
          profileImg: user.profileImg,
        });
      } catch (Exception) {
        console.log("Error making copy ");
      }
    };
  
    getContent();
  }, []);

  // =====================================================//
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
  //=======================================//
  const [buttonPressed, setButtonPressed] = useState(false);
  const [changed, isChanged] = useState(false);
  const handleButtonPress = (e) => {
    e.preventDefault(); 

    // Toggle buttonPressed state
    setButtonPressed(prevState => !prevState);

    // Toggle changed state based on the new value of buttonPressed
    isChanged(prevState => !prevState);
  };
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

            })
            .catch((error) => {
              console.log(error.message, ' error getting the image url ');
            });
          setImage(null);
          alert('Image Uploaded');

          setTimeout(() => {
            setButtonPressed(false);
          }, 2000);
          
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
  const navigate= useNavigate();
  const back = (e) => {
    e.preventDefault();
    navigate("/Community");
  }
  // =====================================================//
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      Education: formData.Education,
      selectedCountry: selectedCountry.label,
      aboutme: formData.aboutme,
      Company: formData.Company,
      Skills: formData.Skills,
      handle: formData.handle,
      profileImg: url,
    };


    try {
      await updateDoc(doc(database, "Users", currentUser.email), data);
      alert("Profile Saved !");
    } catch (e) {
      alert("Error adding document: ", e);
    }
  };
  // =====================================================//

  return (
    <>
      <div className="flex flex-col bg-secondary w-screen h-screen p-2 rounded-lg overflow-hidden">

        <form onSubmit={handleSubmit}>
          {/* page title */}
            <div className="flex flex-row p-0 ">
              <IconContext.Provider value={{ color: "white" }}  >
                <BsHouse size={20} onClick={back} />
              </IconContext.Provider>

              <h2 className="font-semibold text-center text-3xl pl-14 pb-2 text-text-color">
                My Profile
              </h2>
            </div>
      
          {/* Image upload and about me box */}
          <div className="grid grid-rows-8 grid-flow-col gap-4 ">
            {/* Image upload */}
            <div className="row-span-8 col-span-1 bg-zinc-700  rounded-lg p-2">
              <div className="p-0 flex flex-col justify-center items-center">

                    {changed ? 
                      <Avatar
                        src={url}
                        sx={{ width: 150, height: 150 }}
                        className="m-4 "
                      />

                    : 
                      <Avatar
                        src={formData.profileImg}
                        sx={{ width: 150, height: 150 }}
                        className="m-4 "
                      />
                    }
                  
                <div className="pb-5 flex flex-row justify-center items-center text-text-color">
                  
                  
                  {!buttonPressed && (
                        <button
                          onClick={handleButtonPress}
                          className="text-text-color 'hover:bg-red-700 bg-accent-red cursor-pointer' font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 justify-center items-center duration-300"
                        >
                          Edit
                        </button>
                      )}
               
                  {buttonPressed && (
                      <>
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="w-3/4 p-0 m-0 text-text-color 'hover:bg-red-700  "
                          id="profileImg"
                          name="profileImg"
                        />
                        <button
                          onClick={handleSubmitImage}
                          className="text-text-color 'hover:bg-red-700 bg-accent-red cursor-pointer' font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 justify-center items-center duration-300"
                        >
                          Upload
                        </button>
                      </>
                    )}

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
                id="aboutme"
                name="aboutme"
                rows="8"
                cols="1"
                defaultValue={formData.aboutme}
                onChange={handleInputChange}
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
                id="firstName"
                name="firstName"
                defaultValue={formData.firstName}
                placeholder="First Name *"
                onChange={handleInputChange}
              />
            </div>

            <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
              <label className="text-xl font-semibold text-text-color ">
                Last Name{" "}
              </label>
              <input
                type="text"
                className=" p-2 rounded-md w-full object-contain font-semibold "
                id="lastName"
                name="lastName"
                defaultValue={formData.lastName}
                onChange={handleInputChange}
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
                id="username"
                name="username"
                defaultValue={formData.username}
                onChange={handleInputChange}
                placeholder="Unique Username *"
              />
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
                deafultValue={selectedCountry || ''}
                placeholder={formData.selectedCountry}
                options={countries}
                onChange={(selectedOption) => {
                  setSelectedCountry(selectedOption); 
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
                id="Education"
                name="Education"
                defaultValue={formData.Education}
                onChange={handleInputChange}
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
                id="Company"
                name="Company"
                defaultValue={formData.Company}
                onChange={handleInputChange}
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
                id="handle"
                name="handle"
                defaultValue={formData.handle}
                onChange={handleInputChange}
                placeholder="Links to relevant social media handles "
              />
            </div>

            <div className="col-span-2 bg-zinc-700 grid-flow-col justify-center rounded-lg p-4 ">
              <label className="text-xl font-semibold text-text-color ">
                {" "}
                Skills{" "}
              </label>
              <input
                type="text"
                className="p-2 rounded-md w-full object-contain font-semibold"
                id="Skills"
                name="Skills"
                defaultValue={formData.Skills}
                onChange={handleInputChange}
                placeholder="Skills"
              />
            </div>
          </div>

          <button
            className="text-text-color 'hover:bg-red-700 bg-accent-red cursor-pointer' font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 justify-center items-center duration-300"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};
export default DisplayProfile;
