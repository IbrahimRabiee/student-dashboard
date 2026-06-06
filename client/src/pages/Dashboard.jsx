import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { dashboardData } from "../services/dashboardServices";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { user, token } = useAuth();
  const { logout } = useAuth();

  useEffect(() => {
    document.title = "Dashboard - Student Dashboard";

    const fetchData = async () => {
      try {
        const data = await dashboardData(token);

        // ✅ success
        // console.log("Dashboard data:", data);

        setUserData(data);
        setError(null);
      } catch (error) {
        if (
          error.message === "Token expired" ||
          error.message === "Invalid token" ||
          error.message === "Unauthorized"
        ) {
          logout();
          return;
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <>
            <div role="alert">{error}</div>
          </>
        ) : (
          <>
            <h1>Dashboard</h1>
            <p>
              {"Welcome to the Dashboard!"}{" "}
              <span className="text-2xl font-bold text-blue-950">
                {userData.username || user.username}
              </span>
            </p>
            <h1 className="text-2xl font-bold text-blue-950">
              <Link to="/tasks" className="text-blue-950 hover:underline">
                View Tasks
              </Link>
            </h1>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
