const { Router } = require("express");

const router = Router();

const {
  registerUser,
  getUsers,
  login,
} = require("../Controller/UserController");

router.post("/register", registerUser);
router.post("/login", login);

module.exports = router;
