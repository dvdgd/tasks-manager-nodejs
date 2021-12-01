const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "must provide name for task"],
		trim: true,
		maxlength: [20, "name can note be more than 20 characters"],
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("Task", TaskSchema);
