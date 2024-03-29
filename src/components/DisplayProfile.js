import React, { useState, useEffect, useContext } from "react";
import { ReactComponent as HomeSVG } from "../Assets/Home_Icon.svg";
import Avatar from "@mui/material/Avatar";
import Select from "react-select";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSearchParams } from "react-router-dom";
import {
  collection,
  doc,
  updateDoc,
  getDoc,
} from "@firebase/firestore";
import { database, storage } from "../firebase";
import { query, where, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../context/AuthContext";

const DisplayProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  //=======================================//
  //           Country Picker              //
  //=======================================//
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    const getFiles = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();

      setUserData(user);
    }

    getFiles();

  }, [currentUser])

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
    displayName: "",
    Education: "",
    selectedCountry: "",
    aboutme: "",
    Company: "",
    handle: "",
    Skills: "",
    profileImg: ""
  });
  // =====================================================//

  useEffect(() => {
    const getContent = async () => {
      try {
        const userHandle = searchParams.get("handle");
        const usersCollectionRef = collection(database, "Users");
        const userQuery = query(usersCollectionRef, where("displayName", "==", userHandle));
        const userSnapshot = await getDocs(userQuery);
        
        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0]; // Assuming there's only one user for each handle
          const userData = userDoc.data();

          setFormData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            displayName: userData.displayName,
            Education: userData.Education,
            selectedCountry: userData.selectedCountry,
            aboutme: userData.aboutme,
            Company: userData.Company,
            handle: userData.handle,
            Skills: userData.Skills,
            profileImg: userData.profileImg,
          });
        } else {
          // Handle case where no user is found for the given handle
          console.log("No user found for the provided handle");
        }
      } catch (Exception) {
        console.log("Error making copy ");
      }
    };

    getContent();
  }, [currentUser]);

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
  // =====================================================//
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


    try {
      await updateDoc(doc(database, "Users", currentUser.email), data);
      console.log("skibdidi", currentUser.email);
      alert("Profile Saved !");
    } catch (e) {
      alert("Error adding document: ", e);
    }
  };
  // =====================================================//

  return (
    <>
      <div className="flex flex-col justify-center bg-primary w-screen h-screen overflow-scroll">

        <form onSubmit={handleSubmit}>
          {/* page title */}
          <div className="flex flex-row items-center">
            <a className="p-9 flex justify-center items-center hover:bg-accent-red duration-300" href="/"><HomeSVG className="w-9 h-9" /></a>

            <h2 className="font-semibold text-center text-3xl text-text-color w-full">
              My Profile
            </h2>
          </div>

          {/* Image upload and about me box */}
          <div className="grid grid-rows-8 grid-flow-col gap-4 px-9">
            {/* Image upload */}
            <div className="row-span-8 col-span-1 bg-secondary  rounded-lg p-2">
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
                      className="text-text-color hover:bg-accent-blue bg-accent-red font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 justify-center items-center duration-300"
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
            <div className="row-span-8 col-span-8 bg-secondary grid-flow-col justify-center rounded-lg p-4">
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
          <div className="grid grid-cols-4 gap-4 px-7 m-2 mt-9">
            <div className="col-span-2 bg-secondary grid-flow-col justify-center rounded-lg p-4">
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

            <div className="col-span-2 bg-secondary grid-flow-col justify-center rounded-lg p-4 ">
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

          {/*Input box for displayName and Country   */}
          <div className="grid grid-cols-4 gap-4 px-7 m-2">
            <div className="col-span-2 bg-secondary grid-flow-col justify-center rounded-lg p-4">
              <label className="text-xl font-semibold text-text-color ">
                Username{" "}
              </label>
              <input
                type="text"
                className="p-2 rounded-md w-full object-contain border-2 font-semibold"
                id="displayName"
                name="displayName"
                defaultValue={formData.displayName}
                onChange={handleInputChange}
                placeholder="Unique Username *"
              />
            </div>

            <div class="col-span-2 bg-secondary grid-flow-col justify-center rounded-lg p-4 ">
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
          <div className="grid grid-cols-4 gap-4 px-7 m-2">
            <div className="col-span-2 bg-secondary grid-flow-col justify-center rounded-lg p-4">
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

            <div className="col-span-2 bg-secondary grid-flow-col justify-center rounded-lg p-4 ">
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
          <div className="grid grid-cols-4 gap-4 px-7 m-2">
            <div className="col-span-2 bg-secondary grid-flow-col justify-center rounded-lg p-4">
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

            <div className="col-span-2 bg-secondary grid-flow-col justify-center rounded-lg p-4 ">
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

          <div className="flex w-full justify-center items-center mt-5">
            <button
              className="text-text-color bg-accent-red hover:bg-accent-blue duration-300 font-semibold text-lg px-8 py-2 w-30 rounded-md mb-5 justify-center items-center"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default DisplayProfile;
