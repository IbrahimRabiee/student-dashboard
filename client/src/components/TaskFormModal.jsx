import { useState, useEffect } from "react";
import { X, FileText, AlignLeft } from "lucide-react";
import { createTask, updateTask } from "../services/taskServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskFormModal = ({
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

  const isEditMode = mode === "edit";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return setTitleValidation("Title is required");
    }

    if (trimmedTitle.length < 3 || trimmedTitle.length > 100) {
      return setTitleValidation("Title must be between 3 and 100 characters");
    }

    setSubmitting(true);

    try {
      const data = isEditMode
        ? await updateTask(token, task._id, trimmedTitle, description)
        : await createTask(token, trimmedTitle, description);

      if (isEditMode) {
        onTaskUpdated(data);
        toast.success("Task updated successfully!");
      } else {
        onTaskCreated(data);
        toast.success("Task created successfully!");
      }

      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/30 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-white/70 bg-white/95 p-6 shadow-2xl backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary-700">
              {isEditMode ? "Edit task" : "New task"}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900">
              {isEditMode ? "Update your task" : "Create a new task"}
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              {isEditMode
                ? "Make changes to your task details."
                : "Add a task to keep your study workflow organized."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-neutral-700">
              Task title
            </label>

            <div
              className={`mt-2 flex items-center gap-3 rounded-xl border px-4 py-3 transition focus-within:ring-[1.5px] ${
                titleValidation
                  ? "border-danger-500 focus-within:ring-danger-400"
                  : "border-neutral-300 focus-within:ring-primary-600"
              }`}
            >
              <FileText size={20} className="text-neutral-400" />

              <input
                value={title}
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleValidation("");
                  setError(null);
                }}
                onBlur={(e) =>
                  !e.target.value.trim()
                    ? setTitleValidation("Title is required")
                    : setTitleValidation("")
                }
                placeholder="e.g. Review MongoDB models"
                className="w-full bg-transparent text-neutral-800 outline-none placeholder:text-neutral-400"
              />
            </div>

            {titleValidation && (
              <p className="mt-1 text-sm text-danger-500">{titleValidation}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-700">
              Description
            </label>

            <div className="mt-2 flex items-start gap-3 rounded-xl border border-neutral-300 px-4 py-3 transition focus-within:ring-[1.5px] focus-within:ring-primary-600">
              <AlignLeft size={20} className="mt-1 text-neutral-400" />

              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError(null);
                }}
                placeholder="Add extra details, notes, or context..."
                rows={4}
                className="w-full resize-none bg-transparent text-neutral-800 outline-none placeholder:text-neutral-400"
              />
            </div>

            <p className="mt-1 text-sm text-neutral-400">Optional</p>
          </div>

          {error && (
            <p className="rounded-xl bg-danger-50 px-4 py-3 text-sm text-danger-600">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            {isEditMode && (
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Discard
              </button>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-primary-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-primary-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update task"
                  : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
