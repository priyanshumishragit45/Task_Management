const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Priyanshu@2003",
  database: "task_management",
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Database connected");
    connection.release();
  } catch (error) {
    console.log(error);
  }
})();

module.exports = db;
