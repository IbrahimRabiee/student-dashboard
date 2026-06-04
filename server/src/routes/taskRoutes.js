import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import Task from "../models/Task.js";

const tasksRouter = express.Router();

tasksRouter.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (await Task.findOne({ title, user: req.user._id })) {
      return res
        .status(400)
        .json({ message: "Task with this title already exists" });
    }

    const newTask = await new Task({
      title,
      description,
      user: req.user._id,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error || "Error creating task" });
  }
});

tasksRouter.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error || "Error fetching tasks" });
  }
});

tasksRouter.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error || "Error deleting task" });
  }
});

tasksRouter.patch("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title) {
      if (await Task.findOne({ title, user: req.user._id })) {
        return res
          .status(400)
          .json({ message: "Task with this title already exists" });
      }
      task.title = title;
    }

    if (description) {
      task.description = description;
    }

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error || "Error updating task" });
  }
});

export default tasksRouter;
