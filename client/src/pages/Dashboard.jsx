import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { dashboardData } from "../services/dashboardServices";
import { Link } from "react-router-dom";
import { CheckCircle, Clock, ListTodo, Plus } from "lucide-react";

const Dashboard = () => {
  // const [userData, setUserData] = useState();
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
        console.log("Dashboard data:", data);

        // setUserData(data);
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
    <section className="space-y-8">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <>
          <div
            role="alert"
            className="rounded-md text-danger-700 bg-danger-50 border border-danger-200 p-4 shadow-sm"
          >
            {error}
          </div>
        </>
      ) : (
        <>
          <div>
            <p className="text-sm font-medium text-primary-700">Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-neutral-900">
              Welcome back, {user?.username || "Student"} 👋
            </h1>
            <p className="mt-2 text-neutral-500">
              Here is a quick overview of your study workspace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-500">
                  Total tasks
                </p>
                <ListTodo className="text-primary-700" size={22} />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-neutral-900">12</h2>
              <p className="mt-1 text-sm text-neutral-500">All active tasks</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-500">
                  Completed
                </p>
                <CheckCircle className="text-success-600" size={22} />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-neutral-900">7</h2>
              <p className="mt-1 text-sm text-neutral-500">Tasks finished</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-500">Pending</p>
                <Clock className="text-warning-500" size={22} />
              </div>
              <h2 className="mt-4 text-3xl font-bold text-neutral-900">5</h2>
              <p className="mt-1 text-sm text-neutral-500">Tasks remaining</p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-500">Progress</p>
                <span className="text-sm font-semibold text-primary-700">
                  58%
                </span>
              </div>

              <div className="mt-5 h-3 rounded-full bg-neutral-100">
                <div className="h-3 w-[58%] rounded-full bg-primary-700" />
              </div>

              <p className="mt-3 text-sm text-neutral-500">
                Weekly completion rate
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-neutral-900">
                  Recent tasks
                </h2>
                <Link
                  to="/tasks"
                  className="text-sm font-semibold text-primary-700 hover:text-primary-800"
                >
                  View all
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  "Finish auth UI",
                  "Review MongoDB models",
                  "Improve tasks page",
                ].map((task) => (
                  <div
                    key={task}
                    className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-3"
                  >
                    <span className="font-medium text-neutral-700">{task}</span>
                    <span className="rounded-full bg-warning-100 px-3 py-1 text-xs font-medium text-warning-700">
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900">
                Quick actions
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                Jump into your most common actions.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  to="/tasks"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary-700 px-4 py-3 font-semibold text-white transition hover:bg-primary-800"
                >
                  <Plus size={18} />
                  New task
                </Link>

                <Link
                  to="/tasks"
                  className="flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                  View tasks
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Dashboard;
