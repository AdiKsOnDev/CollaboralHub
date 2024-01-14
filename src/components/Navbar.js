import LogoPNG from "../Assets/logo.png"

function Navbar() {
  return (
    <nav className="flex flex-col justify-center items-center background-secondary">
       <ul>
        <li><LogoPNG /></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Projects</a></li>
        <li><a href="#">Projects</a></li>
      </ul>
    </nav> 
  );
}

export default Navbar;
