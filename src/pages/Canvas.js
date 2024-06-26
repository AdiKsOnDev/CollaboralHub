import { T, TLRecord, Tldraw, createTLStore, defaultShapeUtils } from "@tldraw/tldraw";
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState, useCallback } from 'react';
import { useSearchParams } from "react-router-dom";
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "../firebase.js";
import { AuthContext } from "../context/AuthContext";
import "@tldraw/tldraw/tldraw.css";
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as HomeSVG } from "../Assets/Home_Icon.svg";

export default function Canvas() {
  const roomID = uuidv4();
  let changes = {};
  const [showRoomWindow, setShowRoomWindow] = useState(false);
  const [title, setTitle] = useState("");
  const [socket, setSocket] = useState();
  const [room, setRoom] = useState(roomID);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const store = createTLStore({
    shapeUtils: defaultShapeUtils,
  });

  useEffect(() => {
    const getContent = async () => {
      try {
        const id = searchParams.get("id").toString();

        console.log(id);

        const fileRef = doc(collection(database, "Canvases"), id);
        const fileSnapshot = await getDoc(fileRef);
        const file = fileSnapshot.data();

        store.loadSnapshot(file.content);
        setTitle(file.title);
      } catch (Exception) {
        console.log("NO ID");
      }
    };

    getContent();
    }, [searchParams, store])  
  useEffect(() => {
    // create the socket connection only once
    const socket = io.connect("https://synergyserver-dev-eddj.1.us-1.fl0.io");
    // const socket = io.connect("http://localhost:8080");
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
    let id = null;

    try {
      id = searchParams.get("id").toString();
    } catch (Exception) {
      console.log("NO ID Passed");
    }
    const content = store.getSnapshot();

    if (id === null) {
      const canvasID = uuidv4();

      console.log("SAVED: " + title)
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();
      const accessedDate = Timestamp.now();
      const owner = user.displayName;

      await updateDoc(userRef, {canvases: [...user.canvases, canvasID]})
      await setDoc(doc(database, "Canvases", canvasID), {content, title, canvasID, accessedDate, owner}); 
    } else {
      const accessedDate = Timestamp.now();
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();
      const owner = user.displayName; 

      console.log(id);
      await updateDoc(doc(database, "Canvases", id), {content, title, id, accessedDate, owner});
    }

    navigate("/Dashboard");
  }

  //use Effect if message received
  useEffect(() => {
    // handle the incoming messages
    socket?.on("board rec", (changes) => {
      console.log("CURRENT ROOM IS -->" + room)
      console.log("INCOMING!");
      const toRemove = [];
      const toPut = [];

      for (const [id, record] of Object.entries(changes.added)) {
        toPut.push(record);
      }
      for (const [id, record] of Object.entries(changes.updated)) {
        if (
          id !== "instance:instance" &&
          id !== "camera:page:page" &&
          id !== "pointer:pointer"
        ) {
          toPut.push(record[1]);
        }
      }

      for (const [id, record] of Object.entries(changes.removed)) {
        toRemove.push(record.id);
      }

      console.log("TO ADD --->" + toPut);
      store.mergeRemoteChanges(() => {
        if (toRemove.length) store.remove(toRemove);
        if (toPut.length) store.put(toPut);
      });
    });
  }, [socket, store, room]);

  const setRoomfunc = (event, room) => {
    event.preventDefault();
    setRoom(room);
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
              value={room}
              onChange={(e)=> setRoom(e.target.value)}
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

