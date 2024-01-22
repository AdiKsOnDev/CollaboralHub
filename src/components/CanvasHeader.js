import { ReactComponent as HomeSVG } from "../Assets/Home_Icon.svg";

function CanvasHeader() {
  return (
    <header className="flex flex-row items-center bg-primary justify-between px-8 w-full border-solid border-b-4 border-placeholder">
      <div className="flex flex-row items-center w-fit p-1">
        <a href="/"><HomeSVG className="w-8 mr-10" /></a>
        
        <button className="px-4 py-2 h-fit rounded-lg font-semibold text-text-color bg-accent-blue hover:bg-accent-red duration-300">Share</button>
      </div>

      <h1 className="text-white font-semibold h-fit"><span className="text-placeholder font-italic">Team-Name</span> / Draft File</h1>

      <div></div>
    </header>
  );
}

export default CanvasHeader;
