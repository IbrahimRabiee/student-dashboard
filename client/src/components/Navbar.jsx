import { useNavigate, Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/dashboard" className="font-bold text-neutral-900">
            Student Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`
              }
            >
              Tasks
            </NavLink>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 hover:shadow-lg hover:cursor-pointer transition"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
