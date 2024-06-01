import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, refreshTasks }) => {
  const handleDelete = async () => {
    await axios.delete(`/tasks/${task.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    refreshTasks();
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {task.due_date}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={handleDelete}>Delete</button>
      <button>Edit</button>
    </div>
  );
};

export default TaskItem;
