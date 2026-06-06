import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex">
        <Outlet />
      </main>
      <ToastContainer className="top-24! right-10!" />
      {/* <footer /> */}
    </div>
  );
};

export default MainLayout;
