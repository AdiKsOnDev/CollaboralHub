import StatusBar from "./StatusBar.js";
import Project from "./Project.js";
import Image from "../Assets/canvas.png";
 
function HomeBox() {
  return (
    <div className="flex flex-col w-3/4 h-full bg-primary overflow-scroll">
      <StatusBar />

      <div className="p-24">
        <h1 className="text-4xl text-text-color font-semibold mb-8">Your Canvases</h1>

        <div className="grid grid-cols-4"> 
          <Project image={Image} title="New Canvas" />
        </div>
      </div>
    </div>
  );
};

export default HomeBox;
