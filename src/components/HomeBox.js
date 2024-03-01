import { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { database } from "../firebase.js";
import PreviewImage from "../Assets/canvas.png";
import PreviewDocx from "../Assets/PreviewDocx.png";
import StatusBar from "./StatusBar.js";
import Project from "./Project.js";
 
function HomeBox() {
  const { currentUser } = useContext(AuthContext);
  const [userFiles, setUserFiles] = useState([]);
  const [userCanvases, setUserCanvases] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();
      console.log(user);
      
      setUserFiles(user.files);
    };

    getFiles();
  }, [currentUser]);
  
  useEffect(() => {
    const getCanvases = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();
      console.log(user);
      
      setUserCanvases(user.canvases);
    };

    getCanvases();
  }, [currentUser]);

  return (
    <div className="flex flex-col w-3/4 h-full bg-primary overflow-scroll">
      <StatusBar />

      <div data-testid="canvases" className="p-24">
        <h1 className="text-4xl text-text-color font-semibold mb-8">Your Files</h1>

        <div className="grid grid-cols-4"> 
          {userFiles.map((group) => (
            <Project image={PreviewDocx} title={group} />
          ))}
        </div>
      </div>
      
      <div data-testid="canvases" className="p-24">
        <h1 className="text-4xl text-text-color font-semibold mb-8">Your Canvases</h1>

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
