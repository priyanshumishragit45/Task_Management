const express = require("express");
const cors = require("cors");

//! Load environment variables
const { PORT } = require("./envConfig");

//! Initialize database connection
const db = require("./config/db");

//! Importing models
const userSchema = require("./Model/Users");
const taskSchema = require("./Model/Tasks");

const app = express();

//! MIDDLEWARES --------------------------------------------

app.use(cors());
app.use(express.json());
app.use("/users", require("./router/UserRouter"));
app.use("/tasks", require("./router/TaskRouter"));

//! Start the server
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Server is running");
});
