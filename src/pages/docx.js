import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
 
const DocxEditor = () => {
  const [content, setContent] = useState('');
 
  const handleChange = (value) => {
    setContent(value);
  };
 
  const handleSave = () => {
    console.log("Document saved:", content);
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
      <div className="editor-toolbar">
        <button onClick={handleSave}>Save</button>
        <button onClick={handlePrint}>Print</button>
        <button onClick={handleInsertImage}>Insert Image</button>
        <button onClick={handleInsertLink}>Insert Link</button>
        <button onClick={handleInsertCodeBlock}>Insert Code Block</button>
      </div>
      <ReactQuill
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
//Hi