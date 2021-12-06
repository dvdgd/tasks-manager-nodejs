const Task = require("../models/tasksModel");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/customError");

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find();
	res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
});

const getTaskById = asyncWrapper(async (req, res, next) => {
	const { id: taskId } = req.params;
	const task = await Task.findOne({ _id: taskId });

	if (!task) {
		return next(createCustomError(`No task with id: ${taskId}`, 404));
	}

	res.status(200).json({ task });
});

const deleteTaskById = asyncWrapper(async (req, res, next) => {
	const { id: taskId } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskId });

	if (!task) {
		return next(createCustomError(`No task with id: ${taskId}`, 404));
	}

	res.status(200).json({ task });
});

const updateTaskById = asyncWrapper(async (req, res, next) => {
	const { id: taskId } = req.params;

	const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
		runValidators: true,
	});

	if (!task) {
		return next(createCustomError(`No task with id: ${taskId}`, 404));
	}

	res.status(200).json({ task });
});

module.exports = {
	createTask,
	getAllTasks,
	getTaskById,
	deleteTaskById,
	updateTaskById,
};
