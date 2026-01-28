import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy"
    },
    xp: {
      type: Number,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    completedAt: Date
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
