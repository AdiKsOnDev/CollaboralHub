import { useEffect, useContext, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { AuthContext } from "../context/AuthContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { database } from "../firebase.js";
import PreviewImage from "../Assets/canvas.png";
import PreviewDocx from "../Assets/PreviewDocx.png";
import StatusBar from "./StatusBar.js";
import Project from "./Project.js";
import ProfilePicture from "./ProfilePicture.js"
 
function HomeBox() {
  const { currentUser } = useContext(AuthContext);
  const [userFiles, setUserFiles] = useState([]);
  const [userCanvases, setUserCanvases] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();

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



  return (
    <div className="flex flex-col w-full h-full bg-primary overflow-scroll">

      <StatusBar />

      <div data-testid="canvases" className="p-24">
        <h1 className="text-4xl text-text-color font-semibold mb-20">Your Files</h1>

        <div className="grid grid-cols-4"> 
          {userFiles.map((file) => (
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
