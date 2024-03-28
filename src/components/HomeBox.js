import { ReactComponent as SearchSVG } from "../Assets/Magnifier.svg";

import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("query");
  const [searchQuery, setSearchQuery] = useState(id ? id : '');

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
      
      const files = await Promise.all(user.canvases.map(async (file) => {
        const fileRef = doc(collection(database, "Canvases"), file);
        const fileSnapshot = await getDoc(fileRef);
        return fileSnapshot.data();
      }));

      files.sort((a, b) => a.title.localeCompare(b.title));

      setUserCanvases(files);
    };

    getCanvases();
  }, [currentUser]);

  // Function to filter files based on search query
  const filteredFiles = userFiles.filter(file =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCanvases = userCanvases.filter(canvas =>
    canvas.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full bg-primary overflow-scroll">
      <div data-testid="statusbar" className="flex flex-row justify-between items-center px-10 w-full">
        <div className="w-full lg:w-2/4 p-4 flex flex-col justify-center items-center">
          <div className="flex w-full">
              <input
                type="text"
                placeholder="Search For Projects"
                value={searchQuery}
                className="w-full h-12 lg:h-14 px-4 py-2 border rounded-l-md focus:outline-none text-lg lg:text-xl font-semibold"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="px-4 py-2 h-12 lg:h-14 text-text-color bg-accent-red font-semibold rounded-r-md focus:outline-none text-lg lg:text-xl hover:bg-accent-blue duration-300"
              >
                <SearchSVG className="h-6 lg:h-8 w-6 lg:w-8" />
              </button>
          </div>
        </div>

        <ProfilePicture pfp={userImg} />
      </div>

      {/* Warning message when both filteredFiles and filteredCanvases are empty */}
      {filteredFiles.length === 0 && filteredCanvases.length === 0 && (
        <div className="p-24 text-center text-4xl text-text-color font-semibold mb-10">
          No files found, create a new one <a className="text-accent-red underline hover:text-accent-blue duration-300 cursor-pointer" href="/Choice">HERE.</a>
        </div>
      )}

      {filteredFiles.length > 0 && (
        <div className="p-4 lg:p-24">
          <h1 className="text-lg lg:text-4xl text-text-color font-semibold mb-8 lg:mb-20">Your Files</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> 
            {filteredFiles.map((file) => (
              <Project key={file.fileID} image={PreviewDocx} title={file.title} id={"/DocxEditor?id=" + file.fileID} owner={file.owner} date={file.accessedDate ? (file.accessedDate.toDate().toDateString()) : "Not Accessed"} />
            ))}
          </div> 
        </div>

      )}

      {filteredCanvases.length > 0 && (
        <div data-testid="canvases" className="p-24">
          <h1 className="text-4xl text-text-color font-semibold mb-20">Your Canvases</h1>

          <div className="grid grid-cols-4"> 
            {filteredCanvases.map((canvas) => (
              <Project image={PreviewImage} title={canvas.title} id={"/Canvas?id=" + canvas.canvasID} owner={canvas.owner} date={canvas.accessedDate ? (canvas.accessedDate.toDate().toDateString()) : "Not Accessed"} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeBox;
