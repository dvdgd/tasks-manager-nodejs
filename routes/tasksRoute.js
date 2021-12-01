const express = require("express");
const {
	createTask,
	getAllTasks,
	getTaskById,
	deleteTaskById,
	updateTaskById,
} = require("../controllers/tasksController");

const TasksRouter = express.Router();

TasksRouter.route("/").get(getAllTasks).post(createTask);
TasksRouter.route("/:id")
	.get(getTaskById)
	.patch(updateTaskById)
	.delete(deleteTaskById);

module.exports = TasksRouter;
