const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db");
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Home Page" });
});

app.get("/task", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM task_table");
    res.json(todos.rows);
  } catch (error) {
    res.json({ error });
  }
});

app.post("/task", async (req, res) => {
  try {
    const { desc, completed } = req.body;
    console.log(desc,completed)
    const newTodo = await pool.query(
      "INSERT INTO task_table (task_desc, task_completed) VALUES($1, $2) RETURNING *",
      [desc, completed]
    );
    res.json({ newTodo, msg: "Task Added", success: true });
  } catch (error) {
    res.json({ error });
  }
});
app.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "SELECT * FROM task_table WHERE task_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (error) {
    res.json({ error });
  }
});

app.put("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { desc, completed } = req.body;
    const todo = await pool.query(
      "UPDATE todo SET todo_desc = $1, todo_completed = $2 WHERE todo_id = $3",
      [desc, completed, id]
    );
    res.json({ msg: "Task updated!", success: true });
  } catch (error) {
    res.json({ error });
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delTodo = await pool.query("DELETE FROM task_table WHERE task_id = $1", [
      id,
    ]);
    res.json({ msg: "Task deleted!", success: true });
  } catch (error) {
    res.json(error);
  }
});

app.delete("/tasks", async (req, res) => {
  try {
    const delAllTodos = await pool.query("DELETE FROM task_table");
    res.json({ msg: "All tasks deleted!", success: true });
  } catch (error) {
    res.json(error);
  }
});

app.listen(3000, () => {
  console.log(`App running on PORT 3000...`);
});

