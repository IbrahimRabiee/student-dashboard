import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { deleteTask } from "../services/taskServices";
import { toast } from "react-toastify";

const TaskCard = ({ token, task, onDeleteTask }) => {
  const handleDeleteTask = async () => {
    // API call to delete task
    try {
      const data = await deleteTask(token, task._id);

      if (!data) {
        throw new Error("No data received from API");
      }
      toast.success(data.message || "Task deleted successfully!");
      onDeleteTask(task._id);
    } catch (error) {
      toast.error("Error deleting task: " + error.message);
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div
      key={task._id}
      className="w-80 h-auto max-h-60 bg-blue-200 border border-gray-300 rounded-md p-4 flex flex-col gap-4 shadow-sm hover:shadow-lg transition duration-300 hover:scale-105 hover:bg-blue-300 hover:cursor-pointer"
    >
      <div className="flex justify-end">
        <FaEdit className="text-2xl text-blue-600 cursor-pointer hover:text-blue-700 transition duration-150" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-blue-900">{task.title}</h2>
        <p className="text-gray-700 mt-2">{task.description}</p>
      </div>
      <div className="flex justify-end">
        <MdDelete
          onClick={() => handleDeleteTask()}
          className="text-2xl text-red-600 cursor-pointer hover:text-red-700 transition duration-150"
        />
      </div>
    </div>
  );
};

export default TaskCard;
