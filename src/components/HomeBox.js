import StatusBar from "./StatusBar.js";
import Project from "./Project.js";
import Image from "../Assets/canvas.png";
 
function HomeBox() {
  return (
    <div className="flex flex-col w-3/4 h-full bg-primary overflow-scroll">
      <StatusBar />

      <div className="p-24">
        <h1 className="text-4xl text-text-color font-semibold mb-8">Create a Canvas</h1>

        <div data-testid="canvases" className="flex flex-row">
          <Project image={Image} title="New Canvas" />
          <Project image={Image} title="New Flow Chart" />
          <Project image={Image} title="New Kanban Scheme" />
          <Project image={Image} title="New Mindmap" />
          <Project image={Image} title="New Design Sprint" />
        </div>
      </div>

      <div className="p-24">
        <h1 className="text-4xl text-text-color font-semibold mb-8">Your Canvases</h1>

        <div className="grid grid-cols-4"> 
          
        </div>
      </div>
    </div>
  );
};

export default HomeBox;
