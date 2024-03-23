import {
  T,
  TLRecord,
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  useEditor,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { collection, query, where, getDocs, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "../firebase.js";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import io, { Socket } from "socket.io-client";
import { useEffect, useState, useContext } from "react";
import { ReactComponent as HomeSVG } from "../Assets/Home_Icon.svg";

export default function () {
  let changes = {};
  const [showRoomWindow, setShowRoomWindow] = useState(false);
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [socket, setSocket] = useState();
  const [room, setRoom] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const store = createTLStore({
    shapeUtils: defaultShapeUtils,
  });

  useEffect(() => {
    // create the socket connection only once
    const socket = io.connect("http://localhost:8080");
    setSocket(socket);

    return () => socket.disconnect();
  }, []);

  store.listen((entry) => {
    changes = entry.changes;

    if (entry.source === "user") {
      sendBoard();
    }
  });

  const sendBoard = () => {
    socket?.emit("board sent", changes, room);
    console.log(room);
  };

  const handleSave = async () => {
    if (!store) {
      return;
    }
    
    let id = null;

    try {
      id = searchParams.get("id").toString();
    } catch (Exception) {
      console.log("NO ID Passed");
    }

    if (id === null) {
      const fileID = uuidv4();

      console.log("SAVED: " + title)
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();
      const accessedDate = Timestamp.now();
      const owner = user.lastname + ", " + user.name;

      const userChange = await updateDoc(userRef, {canvases: [...user.files, fileID]})
      const response = await setDoc(doc(database, "Canvases", fileID), {store, title, fileID, accessedDate, owner}); 
    } else {
      const accessedDate = Timestamp.now();
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();
      const owner = user.lastname + ", " + user.name;

      console.log(id);
      const response = await updateDoc(doc(database, "Canvases", id), {store, title, id, accessedDate, owner});
    }

    navigate("/Dashboard");
  };

  //use Effect if message recevied
  useEffect(() => {
    // handle the incoming messages
    console.log("INCOMING CHANGES");
    socket?.on("board rec", (changes: any) => {
      const toRemove = [];
      const toPut = [];

      for (const [id, record] of Object.entries(changes.added)) {
        toPut.push(record);
      }
      for (const [id, record] of Object.entries(changes.updated)) {
        if (
          id != "instance:instance" &&
          id != "camera:page:page" &&
          id != "pointer:pointer"
        ) {
          toPut.push(record[1]);
        }
      }

      for (const [id, record] of Object.entries(changes.removed)) {
        toRemove.push(record.id);
      }

      store.mergeRemoteChanges(() => {
        if (toRemove.length) store.remove(toRemove);
        if (toPut.length) store.put(toPut);
      });
    });
  }, [socket]);

  const setRoomfunc = (event, room) => {
    event.preventDefault(setRoom(room));
  };

  const handleRoomWindow = () => {
    setShowRoomWindow(!showRoomWindow);
  };

  return (
    <>
      <div className="bg-secondary w-full text-white font-semibold flex">
        <a className="px-6 flex justify-center items-center hover:bg-accent-red duration-300" href="/"><HomeSVG className="w-7 h-7" /></a>

        <input id="title" name="title" type="text" placeholder="Title" className="p-2 bg-secondary border-white border-b-4 m-4 border-solid placeholder-white font-semibold focus:outline-none" value={title} onChange={(e)=> setTitle(e.target.value)} />

        <button className="p-5 hover:bg-accent-red duration-300" onClick={handleSave}>Save</button>

        <button className="p-5 hover:bg-accent-red duration-300" onClick={handleRoomWindow}>Share</button>

        {showRoomWindow && (
          <div className="flex justify-center items-center bg-none p-4">
            <input
              placeholder="Enter the Room Code"
              className="border border-gray-300 text-primary p-2 outline-none"
              type="text"
              onChange={(event) => setRoomfunc(event, event.target.value)}
            />
            <button className="bg-accent-red text-white rounded-r-md hover:bg-accent-blue duration-300 px-4 py-2" onClick={() => socket?.emit("join room", room)}>
              {" "}
              Join Room
            </button>
          </div>
        )}
      </div>

      <div style={{ position: "fixed", inset: 80 }}>
        <Tldraw store={store} />
      </div>
    </>
  );
}
