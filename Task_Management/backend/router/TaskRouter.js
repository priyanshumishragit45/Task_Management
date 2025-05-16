const { Router } = require("express");
const { proctected } = require("../auth/auth");
const router = Router();

const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../Controller/TaskController");

router.post("/addtask", proctected, createTask);
router.get("/gettask", proctected, getTask);
router.put("/:id", proctected, updateTask);
router.delete("/:id", proctected, deleteTask);
module.exports = router;
