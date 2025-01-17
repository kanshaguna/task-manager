const { Pool } = require("pg");

const pool = new Pool({
  user: "example",
  password: "your_password_here",
  host: "localhost",
  port: "5432",
  database: "task_manager_db"
  
});

console.log("Connected to DB");

module.exports = pool;
