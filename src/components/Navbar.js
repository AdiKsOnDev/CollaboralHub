import LogoPNG from "../Assets/logo.png";

function Navbar() {
  return (
    <nav className="flex flex-col justify-start items-center w-1/4 gap-24 h-screen bg-secondary">
      <img className="mt-12" src={LogoPNG} alt="Logo" />
      
      <ul className="flex flex-col justify-center items-center w-full">
        <li className="w-full flex items-start hover:bg-placeholder duration-300"><a className="text-text-color text-xl w-full p-5 font-semibold hover:text-accent-blue hover:translate-x-2  duration-300" href="#">Projects</a></li>
        <li className="w-full flex items-start hover:bg-placeholder duration-300"><a className="text-text-color text-xl w-full p-5 font-semibold hover:text-accent-blue hover:translate-x-2  duration-300" href="#">Community Page</a></li>
        <li className="w-full flex items-start hover:bg-placeholder duration-300"><a className="text-text-color text-xl w-full p-5 font-semibold hover:text-accent-blue hover:translate-x-2  duration-300" href="#">Sticky Notes</a></li>
        <li className="w-full flex items-start hover:bg-placeholder duration-300"><a className="text-text-color text-xl w-full p-5 font-semibold hover:text-accent-blue hover:translate-x-2  duration-300" href="#">Planner</a></li>
        <li className="w-full flex items-start hover:bg-placeholder duration-300"><a className="text-text-color text-xl w-full p-5 font-semibold hover:text-accent-blue hover:translate-x-2  duration-300" href="#">Groups</a></li>
        <li className="w-full flex items-start hover:bg-placeholder duration-300"><a className="text-text-color text-xl w-full p-5 font-semibold hover:text-accent-blue hover:translate-x-2  duration-300" href="#">Settings</a></li>
      </ul>
    </nav> 
  );
}

export default Navbar;
