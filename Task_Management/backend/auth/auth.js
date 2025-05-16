const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../envConfig");

exports.proctected = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = await jwt.verify(token, JWT_KEY);
    let id = decoded.id;
    let [rows] = await db.query(`SELECT * FROM Users WHERE id =?`, [id]);
    req.user = rows[0];
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
