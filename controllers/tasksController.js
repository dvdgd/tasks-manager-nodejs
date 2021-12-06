const Task = require("../models/tasksModel");
const asyncWrapper = require("../middlewares/asyncWrapper");

const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find();
	res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
});

const getTaskById = asyncWrapper(async (req, res) => {
	const { id: taskId } = req.params;
	const task = await Task.findOne({ _id: taskId });

	if (!task) {
		return res.status(404).json({ msg: `No task with id: ${taskId}` });
	}
});

const deleteTaskById = asyncWrapper(async (req, res) => {
	const { id: taskId } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskId });

	if (!task) {
		return res.status(404).json({ msg: `No task with id: ${taskId}` });
	}

	res.status(200).json({ task });
});

const updateTaskById = asyncWrapper(async (req, res) => {
	const { id: taskId } = req.params;

	const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
		runValidators: true,
	});

	if (!task) {
		return res.status(404).json({ msg: `No task with id: ${taskId}` });
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
