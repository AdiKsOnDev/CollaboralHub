import { ReactComponent as TrashSVG } from "../Assets/Trash.svg";
 
import { doc, collection, getDocs, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { database } from '../firebase';

function Project({canvasID, fileID, image, title, id, owner, file, date}) {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [userRefDat, setUserRef] = useState();

  useEffect(() => {
    const getFiles = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();

      setUserData(user);
      setUserRef(userRef);
    }

    getFiles();

  }, [currentUser])

  return (
    <div className="flex flex-col mb-12">
      <a href={id} className="flex flex-col items-center justify-center mr-5 w-64 mb-5 hover:w-72 hover:text-lg duration-300">
        <img className={`w-full h-30 rounded-lg ${fileID == "" ? "shadow-neon-red" : "shadow-neon-blue"} duration-300`} src={image} alt="Canvas" />
        
        <h1 className="text-text-color text-lg font-semibold w-full mb-2 pl-2 mt-3">{title}</h1>
        <h2 className="text-text-color text-sm font-light italic pl-2 w-full">Accessed by: {owner}</h2>
        <h3 className="text-text-color text-sm font-light italic pl-2 w-full">Last Edited: {date}</h3>
      </a>

      <TrashSVG className="w-8 h-8 pl-2 hover:fill-accent-red duration-300" onClick={async () => {
                  if (fileID == ""){
                    deleteDoc(doc(database, "Canvases", file.canvasID));
                    userData.canvases = userData.canvases.filter(item => item !== file.canvasID);
                    updateDoc(userRefDat, {canvases: userData.canvases});
                  } else {
                    deleteDoc(doc(database, "Files", file.fileID));
                    userData.files = userData.files.filter(item => item !== file.fileID);
                    updateDoc(userRefDat, {files: userData.files});
                  }
                }}
      />
    </div>
  )
};

export default Project;
