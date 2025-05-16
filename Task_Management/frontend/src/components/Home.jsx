import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTask] = useState([]);
  const fetchTasks = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    const token = user.token;
    try {
      const res = await axios.get("http://localhost:3000/tasks/gettask", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.rows);
      setTask(res.data.rows); // Make sure you're updating state
    } catch (error) {
      console.log(error);
      alert("Failed to fetch tasks");
    }
  };

  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    const token = user.token;
    try {
      console.log(id);
      await axios.delete(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("task deleted");
      fetchTasks();
    } catch (error) {
      alert("something went wrong");
    }
  };
  const handlePriority = (e) => {
    const sortBy = e.target.value;

    const sortedTasks = [...tasks].sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === "taskdate") {
        return new Date(a.taskdate) - new Date(b.taskdate);
      } else {
        fetchTasks();
        return;
      }
    });

    setTask(sortedTasks);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  console.log(tasks);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mb-4">
        <label className="font-semibold mr-2">Sort by:</label>
        <select
          onChange={handlePriority}
          className="p-2 border rounded bg-white text-gray-700"
        >
          <option value="">-- Select --</option>
          <option value="priority">Priority</option>
          <option value="taskdate">Date</option>
          <option value="default">Default</option>
        </select>
      </div>

      <div className="flex flex-col items-center mt-10">
        <h2 className="text-3xl font-bold mb-4">My Tasks</h2>
        <TaskForm fetchTasks={fetchTasks} />
        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Home;