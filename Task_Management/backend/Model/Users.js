const db = require("../config/db");

let sql = `CREATE TABLE IF NOT EXISTS Users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100)NOT NULL
) `;

const createUserTable = async () => {
  try {
    await db.query(sql);
    console.log("User table is created");
  } catch (error) {
    console.log(error);
  }
};
createUserTable();
