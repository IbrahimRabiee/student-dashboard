import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="flex justify-end  bg-gray-300 p-4">
      <button
        className="text-blue-500 hover:underline cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
