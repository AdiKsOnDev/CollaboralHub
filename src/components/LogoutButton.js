import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function LogoutButton({ auth, component }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      // Handle successful logout if needed
      navigate("/Login");
      console.log("Logged Out");
    })
    .catch((error) => {
      // Handle logout error if needed
      console.error("Logout error", error);
    });
  }

  return (
    <button
      className={`text-text-color hover:text-accent-blue duration-300`}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
