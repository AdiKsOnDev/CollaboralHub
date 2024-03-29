import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { database } from '../firebase';

function Project({canvasID, fileID, image, title, id, owner, file, date}) {
  return (
    <div>
      <a href={id} className="flex flex-col items-center justify-center mr-5 mb-12 w-64 hover:w-72 hover:text-lg duration-300">
        <img className={`w-full h-30 rounded-lg ${fileID == "" ? "shadow-neon-red" : "shadow-neon-blue"} duration-300`} src={image} alt="Canvas" />
        
        <h1 className="text-text-color text-lg font-semibold w-full mb-2 pl-2 mt-3">{title}</h1>
        <h2 className="text-text-color text-sm font-light italic pl-2 w-full">Accessed by: {owner}</h2>
        <h3 className="text-text-color text-sm font-light italic pl-2 w-full">Last Edited: {date}</h3>
      </a>

      <button onClick={async () => {
                  deleteDoc(doc(database, fileID == "" ? "Canvases" : "Files", file.canvasID));
                }}
      >
        Delete
      </button>
    </div>
  )
};

export default Project;
