const express = require("express");
const tasksRouter = require("./routes/tasksRoute");
const connectMongo = require("./db/connectMongo");
const notFound = require("./middlewares/notFound");
require("dotenv").config();

const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);

const start = async () => {
	try {
		await connectMongo(process.env.MONGO_URI);
		app.listen(3000, console.log("server started on http://localhost:3000"));
	} catch (error) {
		console.log(error);
	}
};

start();
