import axios from "axios";
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { database } from "../../firebase.js";
import StatusBar from "../StatusBar.js";
import PreviewImage from "../../Assets/canvas.png";
import GroupCard from "./GroupCard.js";

function GroupsList() {
  const { currentUser } = useContext(AuthContext);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();
      console.log(user);
      
      setUserGroups(user.groups);
    };

    getGroups();
  }, [currentUser]);

  return (
    <div className="flex flex-col w-3/4 h-full bg-primary overflow-scroll">
      <StatusBar />

      <div data-testid="canvases" className="p-24">
        <h1 className="text-4xl text-text-color font-semibold mb-8">Groups</h1>

        <div className="grid grid-cols-4"> 
          {userGroups.map((group) => (
            <GroupCard image={PreviewImage} name={group} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GroupsList;
