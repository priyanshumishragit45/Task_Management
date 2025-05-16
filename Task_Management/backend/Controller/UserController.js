const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../envConfig");

//REGISTER USER----------------------------------------------
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Fill all the fields" });
  } else {
    try {
      let [rows] = await db.query(`SELECT * FROM Users WHERE email =?`, [
        email,
      ]);
      console.log("length of array");
      if (rows.length != 0) {
        return res
          .status(400)
          .json({ success: false, message: "User is already exisiting" });
      }
      //hASHING PASSWORD--------------------------------------------------------------
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await db.query(`INSERT INTO Users (name,email,password) VALUES (?,?,?)`, [
        name,
        email,
        hashedPassword,
      ]);
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: { name, email },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
};

//LOGIN USER------------------------------------------------
exports.login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "User is already exisiting" });
  }
  try {
    let [rows] = await db.query("SELECT * FROM Users WHERE email = ? ", [
      email,
    ]);
    if (rows.length == 0) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exists" });
    }
    let user = rows[0];
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    let token = await jwt.sign({ id: user.id }, JWT_KEY, { expiresIn: "5h" });

    res
      .status(200)
      .json({ success: true, message: "Login succefulll", token, user });
  } catch (error) {}
};
