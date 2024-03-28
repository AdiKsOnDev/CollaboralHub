import { ReactComponent as HomeSVG } from "../Assets/Home_Icon.svg";
import { ReactComponent as RobotSVG } from "../Assets/AI-Icon.svg";

import ReactQuill from 'react-quill';
import { Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useContext, useState, useCallback } from 'react';
import { AuthContext } from "../context/AuthContext";
import 'react-quill/dist/quill.snow.css';
import '../Quill.css';
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "../firebase.js";
import { useSearchParams } from "react-router-dom";
import OpenAI from "openai";
import io, { Socket } from "socket.io-client";
import { throttle, debounce } from 'lodash';

const filterIncomingChanges = (incomingChanges) => {
  // No conflict resolution needed for HTML content
  return incomingChanges;
};

// Function to apply changes (replace entire content with new HTML)
const applyChanges = (currentContent, changes) => {
  // Simply replace the entire content with the new HTML
  return changes;
};

const DelayHandler = () => {
  const [content, setContent] = useState('');

  const handleChange = useCallback(throttle((value) => {
    setContent(value);
    // Place your socket emit code or any other update logic here
  }, 1000), []); // Adjust the 1000 ms delay to suit your needs

  return (
    <input
      type="text"
      value={content}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

const DocxEditor = () => {
  const roomID = uuidv4();
  const [aiInput, setAIInput] = useState("");
  const [showAIWindow, setShowAIWindow] = useState(false);
  const [showRoomWindow, setShowRoomWindow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true });

  // Socket.io Variables
  let changes = {};
  const [socket, setSocket] = useState();
  const [room, setRoom] = useState(roomID);
  const [isExternalUpdate, setIsExternalUpdate] = useState(false);

  useEffect(() => {
    // Create a Socket
    // const socket = io.connect("http://localhost:8080");
    const socket = io.connect("https://synergyserver-dev-eddj.1.us-1.fl0.io");

    setSocket(socket);

    // Clean up the connection when the component unmounts
    return () => {
      console.log("DISCONNECTED");
      socket.disconnect();
    }
  }, []);  

  useEffect(() => {
    changes = content;
    console.log(changes);

    sendBoard();
  }, [content]);

  const sendBoard = () => {
    if (socket) {
      socket?.emit("board sent", changes, room);
      console.log("Sent the changes to room --> " + room);
    }
  };

  // useEffect() when new message arrives
  useEffect(() => {
    console.log("INCOMING");
    // Handle incoming messages
     socket?.on("board rec", (incomingChanges) => {
        console.log("Incoming Changes: " + incomingChanges);
        const filteredChanges = filterIncomingChanges(incomingChanges);
        const newContent = applyChanges(content, filteredChanges);

        if (newContent !== content) {
          setContent(newContent);
        }
    });
  }, [socket]);

  const setRoomfunc = (event, room) => {
    event.preventDefault(setRoom(room));
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button
      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'script', 'align', 'direction',
    'link', 'image', 'video', 'color', 'background'
  ];

  const handleChange = useCallback(debounce((value) => {
    if (!isExternalUpdate) { // Make sure to define isExternalUpdate state correctly
      setContent(value);
      // Emit changes to the server or update Firestore
    }
  }, 300), [isExternalUpdate]);

  useEffect(() => {
    const getContent = async () => {
      try {
        const id = searchParams.get("id").toString();

        console.log(id);

        const fileRef = doc(collection(database, "Files"), id);
        const fileSnapshot = await getDoc(fileRef);
        const file = fileSnapshot.data();

        setContent(file.content);
        setTitle(file.title);
      } catch (Exception) {
        console.log("NO ID");
      }
    };

    getContent();
    }, [searchParams])  

  const handleSave = async () => {
    if (!content) {
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
      const owner = user.displayName;

      await updateDoc(userRef, {files: [...user.files, fileID]})
      await setDoc(doc(database, "Files", fileID), {content, title, fileID, accessedDate, owner}); 
    } else {
      const accessedDate = Timestamp.now();
      const userRef = doc(collection(database, "Users"), currentUser.email);
      const userSnapshot = await getDoc(userRef);
      const user = userSnapshot.data();
      const owner = user.displayName; 

      console.log(id);
      await updateDoc(doc(database, "Files", id), {content, title, id, accessedDate, owner});
    }

    navigate("/Dashboard");
  };
 
  const handleAI = async () => {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a text generating agent, and whatever you generate has to be styled using HTML tags" }, { role: "user", content: aiInput }],
      model: "gpt-3.5-turbo",
    });

    setContent(content + " " + completion.choices[0].message.content);
  };
 
  const handleAIWindow = () => {
    setShowAIWindow(!showAIWindow);
  };

  const handleRoomWindow = () => {
    setShowRoomWindow(!showRoomWindow);
  };

  return (
    <div>
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
        <button className="px-5 hover:bg-accent-red duration-300" onClick={handleAIWindow}>
          <RobotSVG className="w-9 h-9" />
        </button>

        {showAIWindow && (
          <div className="flex justify-center items-center bg-none p-4">
            <input
              type="text"
              placeholder="Enter your AI input"
              value={aiInput}
              onChange={(e) => setAIInput(e.target.value)}
              className="border border-gray-300 text-primary p-2 outline-none"
            />
            <button onClick={handleAI} className="bg-accent-red text-white rounded-r-md hover:bg-accent-blue duration-300 px-4 py-2">
              Generate
            </button>
          </div>
          )
        }
      </div>

      <ReactQuill 
        theme="snow" 
        value={content} 
        onChange={handleChange} 
        modules={modules}
        formats={formats}
        className="bg-primary text-white w-full h-[800px]"
      />
    </div>
  );
};
 
export default DocxEditor;
