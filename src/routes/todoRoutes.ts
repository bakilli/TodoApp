import express from 'express';
import { Task } from '../models/Task';

const router = express.Router();

// Display Tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.render("index", { tasks });
});

// Add Task
router.post("/add", async (req, res) => {
  if (req.body.task) {
    await Task.create({ text: req.body.task });
  }
  res.redirect("/");
});

// Update Task
router.post("/update/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    task.text = req.body.task;
    task.created = new Date();
    await task.save();
    res.json({ success: true, text: task.text });
  } else {
    res.status(404).json({ success: false, error: "Task not found" });
  }
});

// Delete Task
router.get("/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Delete All Tasks
router.get("/deleteAll", async (req, res) => {
  await Task.deleteMany({});
  res.redirect("/");
});

// Delete Completed Tasks
router.get("/deleteCompleted", async (req, res) => {
  await Task.deleteMany({ completed: true });
  res.redirect("/");
});

// Complete Task
router.get("/complete/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    task.completed = !task.completed;
    await task.save();
  }
  res.redirect("/");
});

export default router;