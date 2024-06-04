import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskContent, setTaskContent] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tasks', { content: taskContent });
      setTaskContent('');
      fetchTasks();
    } catch (err) {
      alert('Failed to create task');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Task"
          value={taskContent}
          onChange={e => setTaskContent(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
