import Task from "../models/Task.js";
import User from "../models/User.js";
import { getXPForDifficulty, calculateLevel } from "../utils/xpCalculator.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, difficulty } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const xp = getXPForDifficulty(difficulty);

    const task = await Task.create({
      title,
      difficulty,
      xp,
      userId: req.userId
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// COMPLETE TASK
export const completeTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.completed) {
      return res.status(400).json({ message: "Task already completed" });
    }

    task.completed = true;
    task.completedAt = new Date();
    await task.save();

    const user = await User.findById(req.userId);
    user.xp += task.xp;
    user.level = calculateLevel(user.xp);
    await user.save();

    res.json({
      message: "Task completed",
      gainedXP: task.xp,
      level: user.level
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
