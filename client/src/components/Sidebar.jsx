import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/authContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/tasks", label: "Tasks", icon: CheckSquare },
    { to: "/courses", label: "Courses", icon: BookOpen },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r border-neutral-200 bg-white px-4 py-6">
      <div className="mb-10">
        <h1 className="text-xl font-bold text-neutral-900">StudentDash</h1>
        <p className="text-sm text-neutral-500">Stay organized</p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-neutral-200 pt-4">
        <p className="mb-3 text-sm font-medium text-neutral-700">
          {user?.username || "Student"}
        </p>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-danger-600 transition hover:cursor-pointer hover:bg-danger-50"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
