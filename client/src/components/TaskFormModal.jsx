import { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/taskServices";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskFormModel = ({
  mode = "create",
  task,
  onTaskCreated,
  onTaskUpdated,
  onClose,
  token,
}) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [titleValidation, setTitleValidation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      return setTitleValidation("Title is required");
    }

    if (title.trim().length < 3 || title.trim().length > 100) {
      return setTitleValidation("Title must be between 3 and 100 characters");
    }
    setSubmitting(true);

    const isEditMode = mode === "edit";
    try {
      const data = isEditMode
        ? await updateTask(token, task._id, title.trim(), description)
        : await createTask(token, title.trim(), description);

      if (!data) {
        throw new Error("No data received from API");
      }

      if (isEditMode) {
        onTaskUpdated(data);
        toast.success("Task updated successfully!");
      } else {
        onTaskCreated(data);
        toast.success("Task created successfully!");
      }

      onClose();
    } catch (error) {
      return setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Close modal on Escape key press (for FUN:))
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-125 h-125 flex flex-col items-center bg-white p-6 border border-blue-200 rounded-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <IoIosClose
          onClick={() => {
            onClose();
          }}
          className="absolute top-4 right-4 text-4xl text-red-600 cursor-pointer"
        />
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          {mode === "create" ? "Create New Task" : "Edit Task"}
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col w-full mt-10 gap-2"
        >
          <div className="flex flex-col justify-start items-start gap-1">
            <input
              value={title}
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleValidation(null);
                setError(null);
              }}
              onBlur={(e) =>
                !e.target.value.trim()
                  ? setTitleValidation("Title is required")
                  : setTitleValidation(null)
              }
              placeholder="Task title"
              className={`border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500 ${titleValidation ? "border-red-500" : ""}`}
            />
            <span
              className={`text-sm text-red-500 ml-2 ${titleValidation ? "opacity-100" : "opacity-0"}`}
            >
              {titleValidation ? titleValidation : ""}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-1">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              className="border w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500 ml-2">Optional</span>
          </div>
          {/* <input
                      type="text"
                      placeholder="Task due date"
                      className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    /> */}
          <p className="text-red-500">{error}</p>
          <div
            className={
              mode === "edit"
                ? "flex justify-end gap-4 mt-4"
                : "flex justify-end mt-4"
            }
          >
            {mode === "edit" && (
              <button
                type="button"
                className={`px-6 py-3  ${submitting ? "opacity-50 pointer-events-none cursor-not-allowed" : ""} font-semibold bg-gray-300 text-gray-700 rounded-md hover:cursor-pointer shadow-sm hover:shadow-lg hover:bg-gray-400 transition duration-150`}
                onClick={() => onClose()}
                disabled={submitting}
              >
                Discard
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-3  ${submitting ? "opacity-50 pointer-events-none cursor-not-allowed" : ""} font-semibold bg-blue-800 text-white rounded-md hover:cursor-pointer shadow-sm hover:shadow-lg hover:bg-blue-900 transition duration-150`}
            >
              {submitting
                ? mode === "edit"
                  ? "Updating..."
                  : "Creating..."
                : mode === "edit"
                  ? "Update Task"
                  : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModel;
