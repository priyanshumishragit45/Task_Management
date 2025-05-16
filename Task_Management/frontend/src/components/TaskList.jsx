function TaskList({ tasks, handleDelete }) {
  console.log(tasks);

  return (
    <div className="bg-white p-4 rounded shadow-lg w-150">
      <h2 className="text-lg font-bold mb-2">My Tasks</h2>
      <ul>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="p-2 border-b flex justify-around">
              <div className="w-1/5">{task.taskname}</div>
              <div className="w-1/5">{task.taskdate}</div>
              <div className="w-1/5">{task.priority}</div>
              <div className="w-1/5">{task.type}</div>
              <button
                onClick={() => {
                  handleDelete(task.id);
                }}
                className="bg-red-500 px-2.5 py-1 rounded-2xl"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TaskList;
