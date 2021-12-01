const express = require("express");
const tasksRouter = require("./routes/tasksRoute");

const app = express();
app.use(express.json());
app.use("/api/v1/tasks", tasksRouter);

app.listen(3000, console.log("server started on http://localhost:3000"));
