const Task = require("../models/task.model.js");

const addTask = async (req, res) => {
  const { task, id } = req.body;

  try {
    if (!task) return res.status(400).send("Please enter the task");
    if (task.length < 10)
      return res
        .status(400)
        .send("Add a minimum of 10 characters for the task");

    const taskDetail = await Task.create({
      task,
      createdBy: id,
    });

    return res.status(200).send(taskDetail);
  } catch (error) {
    return res.status(400).send("Task addition failed");
  }
};

const getAllTasks = async (req, res) => {
  const { id } = req.query;
  try {
    const taskList = await Task.find({ createdBy: id });
    return res.status(200).send(taskList);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const editTask = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).send("Task not found");
    }
    return res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Edit task failed:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const statusChange = async (req, res) => {
  const { id, string } = req.body;

  try {
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).send("Task not found");
    }

    switch (string) {
      case "right":
        switch (task.status) {
          case "backlog":
            task.status = "todo";
            break;
          case "todo":
            task.status = "doing";
            break;
          case "doing":
            task.status = "done";
            break;
        }
        break;
      default:
        switch (task.status) {
          case "done":
            task.status = "doing";
            break;
          case "doing":
            task.status = "todo";
            break;
          case "todo":
            task.status = "backlog";
            break;
        }
        break;
    }

    await task.save();
    return res.send(task);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Task.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).send("Task not found");
    }
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send("Delete failed");
  }
};

module.exports = {
  addTask,
  getAllTasks,
  editTask,
  statusChange,
  deleteTask,
};
