import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { userTasks } from "../services/taskServices";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";
import "react-toastify/dist/ReactToastify.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isCreating, setIsCreating] = useState(false); // State to control the visibility of the CreateTask component
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await userTasks(token);

        if (!data) {
          throw new Error("No data received from API");
        }

        setTasks(data);
      } catch (error) {
        setError(error.message);
        // console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  return (
    <>
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <div
            className={`container mx-auto p-4 ${isCreating ? "blur-xs" : ""}`}
          >
            <div className="flex flex-col gap-8 mt-8">
              <header>
                <h1 className="text-center text-6xl text-blue-900 font-semibold">
                  Tasks
                </h1>
              </header>
              <div className="flex justify-evenly relative text-center flex-wrap gap-8  px-6 py-24 border border-blue-200 rounded-md shadow-sm">
                <div className="flex justify-end absolute top-4 right-4">
                  <button
                    onClick={() => setIsCreating(true)}
                    className="px-6 py-3 font-semibold bg-blue-900 text-white rounded-md hover:cursor-pointer shadow-sm hover:shadow-lg hover:bg-blue-800 transition duration-150"
                  >
                    New Task
                  </button>
                </div>
                {tasks.map((task) => {
                  return (
                    <TaskCard
                      key={task._id}
                      task={task}
                      token={token}
                      onDeleteTask={handleTaskDeleted}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {isCreating && (
            <CreateTask
              onTaskCreated={handleTaskCreated}
              setIsCreating={setIsCreating}
              token={token}
            />
          )}
        </>
      )}
    </>
  );
};

export default Tasks;
