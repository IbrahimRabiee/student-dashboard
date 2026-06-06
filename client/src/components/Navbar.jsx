import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const [isAuthed, setIsAuthed] = useState(false);
  const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated) {
          setIsAuthed(true);
        } else {
          setIsAuthed(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthed(false);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="flex justify-end w-full bg-gray-600 p-4">
      {isAuthed ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer transition"
        >
          Logout
        </button>
      ) : (
        <div className="space-x-4">
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 bg-gray-800 text-white rounded shadow-sm hover:shadow-lg hover:bg-gray-900 hover:cursor-pointer transition"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-gray-800 text-white rounded shadow-sm hover:shadow-lg hover:bg-gray-900 hover:cursor-pointer transition"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
