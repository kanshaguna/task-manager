import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTaskDesc, setEditTaskDesc] = useState("");
  const [editTaskId, setEditTaskId] = useState(0);
  const [editTaskChecked, setEditTaskChecked] = useState(false);

  useEffect(() => {
    const resp = axios.get("/task").then((resp) => {
      setTasks(resp.data);
    });
  }, []);

  async function addTask(e) {
    const data = {
      desc: inputTask,
      completed: "false",
    };
    const resp = await axios.post("/task", data);
    if (resp.data.success) {
      setTasks((prevTasks) => [...prevTasks, resp.data.newTodo.rows[0]]);
    }
    setInputTask("");
  }

  async function editTask(e, task) {
    e.preventDefault();
    setEditMode(true);
    setEditTaskDesc(task.task_desc);
    setEditTaskId(task.task_id);
    setEditTaskChecked(task.task_completed);
  }

  async function updateTask(e) {
    const data = {
      desc: editTaskDesc,
      completed: editTaskChecked,
    };
    const resp = await axios.put(`/task/${editTaskId}`, data);
    setEditMode(true);
    console.log(resp);
  }

  async function deleteTask(e, task) {
    const resp = await axios.delete(`/task/${task.task_id}`);
    if (resp.data.success) {
      setTasks((prevTasks) =>
        prevTasks.filter((t) => t.task_id != task.task_id)
      );
    }
  }

  async function clearAllTasks(e) {
    const resp = await axios.delete("/tasks");
    setTasks([]);
  }

  if (editMode) {
    return (
      <form
        onSubmit={updateTask}
        className="flex flex-col items-center gap-8 pt-8 pb-24 "
      >
        <div className="text-2xl">Edit Task</div>
        <div className="flex gap-4 pl-16">
          <label className="text-xl">Task :</label>
          <input
            className="text-xl rounded-lg shadow-md text-center bg-orange-200"
            type="text"
            placeholder="Enter Todo"
            value={editTaskDesc}
            onChange={(e) => setEditTaskDesc(e.target.value)}
          />
        </div>
        <div className="flex gap-4 pr-36">
          <label className="text-xl">Completed:</label>
          <input
            type="checkbox" className="w-6 h-8 accent-green-500"
            checked={editTaskChecked}
            onChange={(e) => setEditTaskChecked(e.target.checked)} 
          />
        </div>
        <button className="bg-emerald-600 hover:bg-green-500 text-white py-1 px-2 rounded-md">
          Submit
        </button>
      </form>
    );
  }


  return (
    <div className="flex flex-col items-center gap-8 pt-8 pb-32 ">
      <div className="text-2xl #1c1917">Task Manager</div>
      <div className="flex gap-2 mr-10">
        <input
          className="text-xl rounded-lg shadow-md bg-orange-200 text-center"
          type="text"
          placeholder="Enter Todo"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="text-lg bg-cyan-600 hover:bg-red-500 text-white py-1 px-2 rounded-xl"
        >
          Add
        </button>
        <button
          onClick={clearAllTasks}
          className="text-lg bg-gray-500 hover:bg-gray-400 text-white py-1 px-2 rounded-xl"
        >
          Clear
        </button>
      </div>
      
       {tasks.length >= 1 && (
        <div className="flex flex-col gap-2 border bg-slate-800 rounded-lg p-2 w-3/6">
          {tasks.map((task, index) => {
            return (
              <div
                className="flex items-center justify-between bg-slate-600 rounded-md p-2 text-white"
                key={task.task_id}
              >
                <div className="pl-1 flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={task.task_completed}
                    readOnly
                  />
                  <div className="text-lg">{task.task_desc}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => editTask(e, task)}
                    className="bg-emerald-600 hover:bg-green-500 text-white py-1 px-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => deleteTask(e, task)}
                    className="bg-amber-600 hover:bg-red-500 text-white py-1 px-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
       )}
      
      </div>

  );
}

export default App;
