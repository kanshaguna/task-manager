const { Pool } = require("pg");
// require('dotenv').config();

const pool = new Pool({
  user: "example",
  password: "your_password",
  host: "localhost",
  port: "5432",
  database: "task_manager_db"
  
});

console.log("Connected to DB2");

module.exports = pool;
