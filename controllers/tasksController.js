const Task = require("../models/tasksModel");

const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find();
		res.json({ tasks });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const createTask = async (req, res) => {
	try {
		const task = await Task.create(req.body);
		res.status(201).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const getTaskById = async (req, res) => {
	try {
		const { id: taskId } = req.params;
		const task = await Task.findOne({ _id: taskId });

		if (!task) {
			return res.status(404).json({ msg: `No task with id: ${taskId}` });
		}

		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const deleteTaskById = async (req, res) => {
	try {
		const { id: taskId } = req.params;
		const task = await Task.findOneAndDelete({ _id: taskId });

		if (!task) {
			return res.status(404).json({ msg: `No task with id: ${taskId}` });
		}

		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

const updateTaskById = async (req, res) => {
	try {
		const { id: taskId } = req.params;

		const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
			runValidators: true,
		});

		if (!task) {
			return res.status(404).json({ msg: `No task with id: ${taskId}` });
		}

		res.status(200).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
};

module.exports = {
	createTask,
	getAllTasks,
	getTaskById,
	deleteTaskById,
	updateTaskById,
};
