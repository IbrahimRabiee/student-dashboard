// import React from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const Home = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="container mx-auto p-4 flex justify-between items-center">
      <h1>Home</h1>
      <nav>
        <ul className="flex space-x-4 font-medium text-primary-500">
          <li className="hover:text-primary-700">
            <Link to="/login">Login</Link>
          </li>
          <li className="hover:text-primary-700">
            <Link to="/register">Register</Link>
          </li>
          <li className="hover:text-primary-700">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
