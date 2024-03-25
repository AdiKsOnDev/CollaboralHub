import React, { useContext, useState } from 'react';
import { collection, query, where, getDoc, getDocs, setDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { database } from '../../firebase';
import { AuthContext } from "../../context/AuthContext"

const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);


  const handleSearch = async () => {
    const q = query(
      collection(database, "Users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }


  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }


  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;


    console.log("combined", combinedId)

    try {
      const res = await getDoc(doc(database, "Chats", combinedId));
      console.log("res runs", res)
      if (!res.exists()) {
        await setDoc(doc(database, "Chats", combinedId), { messages: [] });
        console.log("update chats")
        console.log(currentUser.uid)
        console.log(combinedId)
        await updateDoc(doc(database, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            // photoURL: user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()

        });
        console.log("update current")

        await updateDoc(doc(database, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            // photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()

        });
        console.log("update user")

      }
    } catch (err) { }


    setUser(null);
    setUsername("");


  }

  return (
    <div className='fc-search'>
      <div className='fc-searchform'>
        <input
          type="text"
          className='fc-searchinput'
          placeholder='Find a friend'
          onKeyDown={handleKey}
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && <div className='fc-userchat' onClick={handleSelect}>
        <img src={user.photoURL} alt='' className='fc-searchimg' />
        <div className='fc-userchatinfo'>
          <span> {user.displayName} </span>
        </div>
      </div>
      }

    </div>
  )
}

export default Search;