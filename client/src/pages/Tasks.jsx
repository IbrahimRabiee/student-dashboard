import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { userTasks } from "../services/taskServices";
import TaskCard from "../components/TaskCard";
import TaskFormModal from "../components/TaskFormModal";
import { Plus, CheckCircle, Clock, ListTodo } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { token, logout } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const data = await userTasks(token);
        setTasks(data);
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

    if (token) fetchTasks();
  }, [token, logout]);

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task,
      ),
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500">Loading tasks...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-2xl border border-danger-200 bg-danger-50 p-6 text-danger-600">
        Error: {error}
      </section>
    );
  }

  return (
    <>
      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary-700">Tasks</p>
            <h1 className="mt-2 text-3xl font-bold text-neutral-900">
              Manage your tasks
            </h1>
            <p className="mt-2 text-neutral-500">
              Create, organize, and track your academic work.
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-primary-800 hover:shadow-md"
          >
            <Plus size={18} />
            New Task
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-500">Total</p>
              <ListTodo className="text-primary-700" size={22} />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-neutral-900">
              {totalTasks}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">All tasks</p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-500">Completed</p>
              <CheckCircle className="text-success-600" size={22} />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-neutral-900">
              {completedTasks}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">Finished tasks</p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-500">Pending</p>
              <Clock className="text-warning-500" size={22} />
            </div>
            <h2 className="mt-4 text-3xl font-bold text-neutral-900">
              {pendingTasks}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">Remaining tasks</p>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900">Your tasks</h2>
            <p className="text-sm text-neutral-500">{totalTasks} total</p>
          </div>

          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-16 text-center">
              <div className="mb-4 rounded-2xl bg-primary-50 p-4 text-primary-700">
                <ListTodo size={32} />
              </div>

              <h3 className="text-lg font-bold text-neutral-900">
                No tasks yet
              </h3>

              <p className="mt-2 max-w-sm text-neutral-500">
                Create your first task to start organizing your academic work.
              </p>

              <button
                onClick={() => setIsCreating(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-700 px-5 py-3 font-semibold text-white transition hover:bg-primary-800"
              >
                <Plus size={18} />
                Create task
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  token={token}
                  onDeleteTask={handleTaskDeleted}
                  onUpdateTask={handleTaskUpdated}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {isCreating && (
        <TaskFormModal
          onTaskCreated={handleTaskCreated}
          onClose={() => setIsCreating(false)}
          token={token}
        />
      )}
    </>
  );
};

export default Tasks;
