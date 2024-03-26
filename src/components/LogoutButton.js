import { signOut } from "firebase/auth";

function LogoutButton({ auth, component }) {
  // const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      // Handle successful logout if needed
      // navigate("/Login");
      console.log("Logged Out");
    })
    .catch((error) => {
      // Handle logout error if needed
      console.error("Logout error", error);
    });
  }

  return (
    <button
      href="/Login"
      className={`text-text-color`}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
