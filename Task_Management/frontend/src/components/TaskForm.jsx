import axios from "axios";
import React, { useState } from "react";

const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({
    taskname: "",
    taskdate: "",
    priority: "",
    type: "",
  });

  const hadnleInput = (e) => {
    let { name, value } = e.target;
    setTask((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Unauthorized! Please log in first.");
        return;
      } else {
        let token = user.token;
        await axios.post("http://localhost:3000/tasks/addtask", task, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("task added successfully");
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Failed to add task. Please try again."
      );
    }
  };
  console.log(task);
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-lg w-96 space-y-3"
    >
      <input
        type="text"
        placeholder="Task Title"
        required
        className="w-full p-2 border rounded"
        name="taskname"
        value={task.taskname}
        onChange={hadnleInput}
      />

      <input
        type="date"
        required
        className="w-full p-2 border rounded"
        name="taskdate"
        value={task.taskdate}
        onChange={hadnleInput}
      />

      <select
        name="priority"
        value={task.priority}
        onChange={hadnleInput}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        name="type"
        value={task.type}
        onChange={hadnleInput}
        className="w-full p-2 border rounded"
        required
      >
        <option value="">Select Type</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
