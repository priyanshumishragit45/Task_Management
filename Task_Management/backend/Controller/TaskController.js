// Import the database connection
const db = require("../config/db");

// CREATE TASK CONTROLLER
exports.createTask = async (req, res) => {
  const { taskname, taskdate, priority, type } = req.body;
  if (!taskname || !taskdate || !type || !priority) {
    return res
      .status(400)
      .json({ success: false, message: "select all the fields" });
  }

  try {
    let sql =
      "INSERT INTO Tasks (taskname,taskdate,priority,type,user_id) VALUES (?,?,?,?,?)";
    await db.query(sql, [taskname, taskdate, priority, type, req.user.id]);
    return res.status(201).json({ success: true, message: "Task added" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Task not added", error });
  }
};

// GET TASKS CONTROLLER
exports.getTask = async (req, res) => {
  let sql = "SELECT * FROM Tasks WHERE user_id =?";
  let [rows] = await db.query(sql, [req.user.id]);
  return res.status(200).json({ success: true, message: "get all task", rows });
};

exports.updateTask = async (req, res) => {
  const { taskname, taskdate, priority, type } = req.body;
  const sql =
    "UPDATE Tasks SET taskname =? ,taskdate =? , priority=?,type =? WHERE id = ? AND user_id =?";
  try {
    await db.query(sql, [
      taskname,
      taskdate,
      priority,
      type,
      req.params.id,
      req.user.id,
    ]);
    return res
      .status(200)
      .json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating tasks" });
  }
};

// DELETE TASK CONTROLLER
exports.deleteTask = async (req, res) => {
  try {
    const sql = "DELETE FROM Tasks WHERE id = ? AND user_id = ?";
    await db.query(sql, [req.params.id, req.user.id]);
    return res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error deleting task" });
  }
};
