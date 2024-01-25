import StatusBar from "./StatusBar.js";
import Project from "./Project.js";
import Image from "../Assets/canvas.png";
import Img from "../Assets/sticky_note.png";
import SavedNotes from "./SavedNotes.js";
 

function TODOList() {
    return (
        <div className="flex flex-col w-3/4 h-full bg-primary overflow-scroll">
          <StatusBar />
    
          <div className="p-24">
            <h1 className="text-4xl text-text-color font-semibold mb-8">TODO List</h1>
    
            <div className="flex flex-row">
              <Project image={Image} title="Add New To Do List" />
            </div>
          </div>
    
          <div className="p-24">
            <h1 className="text-4xl text-text-color font-semibold mb-8">Saved Notes</h1>
    
            <div className="grid grid-cols-4"> 
              <SavedNotes img={Img} heading="Friday" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
              <Project image={Image} title="New Design Sprint" />
            </div>
          </div>
        </div>
      );
    };
export default TODOList;
