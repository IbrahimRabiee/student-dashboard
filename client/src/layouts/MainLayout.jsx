import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
