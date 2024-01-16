import StatusBar from "./StatusBar.js";
import Canvas from "./Canvas.js";
import Image from "../Assets/canvas.png";
 
function HomeBox() {
  return (
    <div className="flex flex-col w-full bg-primary">
      <StatusBar />

      <div className="p-24">
        <h1 className="text-4xl text-text-color font-semibold mb-8">Create a Canvas</h1>

        <Canvas image={Image} title="New Canvas" />
      </div>
    </div>
  );
}

export default HomeBox;
