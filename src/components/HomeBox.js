import { ReactComponent as SearchSVG } from "../Assets/Magnifier.svg";

import { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { database } from "../firebase.js";
import PreviewImage from "../Assets/canvas.png";
import ProfilePicture from "./ProfilePicture.js";
import PreviewDocx from "../Assets/PreviewDocx.png";
import StatusBar from "./StatusBar.js";
import Project from "./Project.js";
 
function HomeBox() {
  const { currentUser } = useContext(AuthContext);
  const [userImg, setUserImg] = useState("lol?");
  const [userFiles, setUserFiles] = useState([]);
  const [userCanvases, setUserCanvases] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');  

  useEffect(() => {
    const getFiles = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();

      setUserImg(user.profileImg)

      // Getting the files from collection Files
      const files = await Promise.all(user.files.map(async (file) => {
        const fileRef = doc(collection(database, "Files"), file);
        const fileSnapshot = await getDoc(fileRef);
        return fileSnapshot.data();
      }));

      // Sort files array by file names
      files.sort((a, b) => a.title.localeCompare(b.title));

      setUserFiles(files);
    };

    getFiles();
  }, [currentUser]);
  
  useEffect(() => {
    const getCanvases = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();
      
      setUserCanvases(user.canvases);
    };

    getCanvases();
  }, [currentUser]);

  // Function to filter files based on search query
  const filteredFiles = userFiles.filter(file =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full bg-primary overflow-scroll">
      <div data-testid="statusbar" className="flex flex-row justify-between items-center px-10 w-full">
        <div className="container w-2/4 p-4 flex flex-col justify-center items-center">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search For Projects"
              value={searchQuery}
              className="w-full h-14 px-4 py-2 border rounded-l-md focus:outline-none text-xl font-semibold"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="px-4 py-2 h-14 text-text-color bg-accent-red font-semibold rounded-r-md focus:outline-none text-xl hover:bg-accent-blue duration-300"
            >
              <SearchSVG className="h-8 w-8" />
            </button>
          </div>
        </div>

        <ProfilePicture pfp={userImg} />
      </div>

      <div className="p-24">
        <h1 className="text-4xl text-text-color font-semibold mb-20">Your Files</h1>
        <div className="grid grid-cols-4"> 
          {filteredFiles.map((file) => (
            <Project image={PreviewDocx} title={file.title} id={"/DocxEditor?id=" + file.fileID} owner={file.owner} date={file.accessedDate ? (file.accessedDate.toDate().toDateString()) : "Not Accessed"} />
          ))}
        </div> 
      </div>
      
      <div data-testid="canvases" className="p-24">
        <h1 className="text-4xl text-text-color font-semibold mb-20">Your Canvases</h1>

        <div className="grid grid-cols-4"> 
          {userCanvases.map((canvas) => (
            <Project image={PreviewImage} title={canvas} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBox;
