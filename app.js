const express = require("express");
const tasksRouter = require("./routes/tasksRoute");
const connectMongo = require("./db/connectMongo");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasksRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
	try {
		await connectMongo(process.env.MONGO_URI);
		app.listen(port, console.log(`server started on http://localhost:${port}`));
	} catch (error) {
		console.log(error);
	}
};

start();
