import { useState } from "react";
import TaskFormModal from "./TaskFormModal";
import { Pencil, Trash2, CheckCircle, Circle } from "lucide-react";
import { deleteTask } from "../services/taskServices";
import { toast } from "react-toastify";

const TaskCard = ({ token, task, onDeleteTask, onUpdateTask }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteTask = async () => {
    try {
      setDeleting(true);

      const data = await deleteTask(token, task._id);

      toast.success(data.message || "Task deleted successfully!");
      onDeleteTask(task._id);
    } catch (error) {
      toast.error("Error deleting task: " + error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <article className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-tranneutral-y-1 hover:shadow-md">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            {task.completed ? (
              <CheckCircle size={18} className="text-success-600" />
            ) : (
              <Circle size={18} className="text-neutral-400" />
            )}

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                task.completed
                  ? "bg-success-50 text-success-700"
                  : "bg-warning-50 text-warning-700"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
            <button
              type="button"
              onClick={() => setIsUpdating(true)}
              className="rounded-lg p-2 text-neutral-500 transition hover:bg-primary-50 hover:text-primary-700"
              aria-label="Edit task"
            >
              <Pencil size={17} />
            </button>

            <button
              type="button"
              onClick={handleDeleteTask}
              disabled={deleting}
              className={`rounded-lg p-2 transition ${
                deleting
                  ? "cursor-not-allowed text-neutral-300"
                  : "text-neutral-500 hover:bg-danger-50 hover:text-danger-600"
              }`}
              aria-label="Delete task"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>

        <h3 className="line-clamp-2 text-lg font-bold text-neutral-900">
          {task.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-500">
          {task.description || "No description provided."}
        </p>

        <div className="mt-5 border-t border-neutral-100 pt-4">
          <p className="text-xs text-neutral-400">Created task</p>
        </div>
      </article>

      {isUpdating && (
        <TaskFormModal
          mode="edit"
          task={task}
          token={token}
          onTaskUpdated={onUpdateTask}
          onClose={() => setIsUpdating(false)}
        />
      )}
    </>
  );
};

export default TaskCard;
