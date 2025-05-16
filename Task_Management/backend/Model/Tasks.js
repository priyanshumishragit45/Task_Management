const db = require("../config/db");

const sql = `CREATE TABLE IF NOT EXISTS Tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  taskname VARCHAR(100) NOT NULL,
  taskdate VARCHAR(45) NOT NULL,
  user_id INT NOT NULL,
  priority ENUM('High', 'Medium', 'Low'),
  type ENUM('Personal', 'Work'),
  FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
)`;

const createTaskTable = async () => {
  try {
    await db.query(sql);
    console.log("Task table is created");
  } catch (error) {
    console.log(error);
  }
};

createTaskTable();
