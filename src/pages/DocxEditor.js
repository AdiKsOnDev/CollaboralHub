import { ReactComponent as HomeSVG } from "../Assets/Home_Icon.svg";

import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import 'react-quill/dist/quill.snow.css';
import { collection, query, where, getDocs, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { database } from "../firebase.js";
import { useSearchParams } from "react-router-dom";

const DocxEditor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleChange = (value) => {
    setContent(value.toString());
  };
 
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

  const handleName = (value) => {
    setTitle(value.toString());
  } 

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

      const userChange = await updateDoc(userRef, {files: [...user.files, fileID]})
      const response = await setDoc(doc(database, "Files", fileID), {content, title, fileID}); 
    } else {
      console.log(id);
      const response = await updateDoc(doc(database, "Files", id), {content, title, id});
    }

    navigate("/Dashboard");
  };
 
  const handlePrint = () => {
    console.log("Print document:", content);
  };
 
  const handleInsertImage = () => {
    const imageUrl = prompt("Enter image URL:");
    if (imageUrl) {
      const cursorPosition = content.length;
      setContent(`${content}\n![Image]( ${imageUrl} )\n`);
      setTimeout(() => {
        const quill = document.querySelector('.ql-editor');
        if (quill) quill.setSelection(cursorPosition, 0);
      }, 0);
    }
  };
 
  const handleInsertLink = () => {
    const linkUrl = prompt("Enter link URL:");
    if (linkUrl) {
      const selectedText = window.getSelection().toString();
      const linkText = selectedText || prompt("Enter link text:") || "Link";
      const cursorPosition = content.length;
      setContent(`${content}\n[${linkText}](${linkUrl})\n`);
      setTimeout(() => {
        const quill = document.querySelector('.ql-editor');
        if (quill) quill.setSelection(cursorPosition, 0);
      }, 0);
    }
  };
 
  const handleInsertCodeBlock = () => {
    const cursorPosition = content.length;
    setContent(`${content}\n\`\`\`\n// Your code here\n\`\`\`\n`);
    setTimeout(() => {
      const quill = document.querySelector('.ql-editor');
      if (quill) quill.setSelection(cursorPosition + 4, 0);
    }, 0);
  };
 
  return (
    <div>
      <div className="bg-accent-blue w-full text-white font-semibold flex">
        <a className="px-6 hover:bg-accent-red duration-300" href="/"><HomeSVG className="w-6" /></a>

        <input id="title" name="title" type="text" placeholder="Title" className="p-2 bg-accent-blue border-white border-b-4 m-4 border-solid placeholder-white font-semibold focus:outline-none" value={title} onChange={(e)=> setTitle(e.target.value)} />
        <button className="p-5 hover:bg-accent-red duration-300" onClick={handleSave}>Save</button>
        <button className="p-5 hover:bg-accent-red duration-300" onClick={handlePrint}>Share</button>
      </div>

      <ReactQuill
        className='bg-white h-screen'
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
        }}
      />
    </div>
  );
};
 
export default DocxEditor;
