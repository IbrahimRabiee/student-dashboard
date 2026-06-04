import { useState, useEffect } from "react";
import { createTask } from "../services/taskServices";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTask = ({ onTaskCreated, setIsCreating, token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleValidation, setTitleValidation] = useState("");
  const [error, setError] = useState(null);

  const handleCreateTask = async (e) => {
    e.preventDefault();

    // Validation
    if (!title) {
      return setTitleValidation("Title is required");
    }

    if (title.length < 3 || title.length > 100) {
      return setTitleValidation("Title must be between 3 and 100 characters");
    }

    // API call to create task
    try {
      const data = await createTask(token, title, description);
      if (!data) {
        throw new Error("No data received from API");
      }
      onTaskCreated(data);
      toast.success("Task created successfully!");
      handleClose();
    } catch (error) {
      setError(error.message);
      console.error("Error creating task:", error);
    }
  };

  const handleClose = () => {
    setIsCreating(false);
    setTitle("");
    setDescription("");
    setTitleValidation(null);
    setError(null);
  };

  // Close modal on Escape key press (for FUN:))
  const useEscape = () => {
    useEffect(() => {
      const handleEsc = (e) => {
        if (e.keyCode === 27) handleClose();
      };
      window.addEventListener("keydown", handleEsc);

      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    }, []);
  };

  return (
    <div
      onKeyDown={useEscape()}
      className="fixed inset-0  flex items-center justify-center"
    >
      <div className="w-125 h-125 flex flex-col items-center bg-white p-6 border border-blue-200 rounded-md shadow-lg relative">
        <IoIosClose
          onClick={() => {
            handleClose();
          }}
          className="absolute top-4 right-4 text-4xl text-blue-900 cursor-pointer"
        />
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Create New Task
        </h2>
        <form
          onSubmit={(e) => handleCreateTask(e)}
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
                !e.target.value
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
            <input
              value={description}
              type="text"
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
          <button
            type="submit"
            className="mt-4 px-6 py-3 font-semibold bg-blue-900 text-white rounded-md hover:cursor-pointer shadow-sm hover:shadow-lg hover:bg-blue-800 transition duration-150"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
