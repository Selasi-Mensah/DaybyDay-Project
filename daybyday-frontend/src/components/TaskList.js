// src/components/TaskList.js

import React, { useEffect } from 'react'; // Import React and useEffect hook
import axios from 'axios'; // Import axios for making HTTP requests
import TaskItem from './TaskItem'; // Import TaskItem component

const TaskList = ({ tasks, refreshTasks }) => { // Destructure tasks and refreshTasks from props

  // Fetch tasks when the component mounts or refreshTasks changes
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token'); // Get the stored JWT token
      try {
        const response = await axios.get('http://127.0.0.1:5000/tasks', {
          headers: { Authorization: `Bearer ${token}` } // Set authorization header with JWT token
        });
        setTasks(response.data); // Update state with the fetched tasks
      } catch (error) {
        console.error('Error fetching tasks:', error); // Handle error
      }
    };
    fetchTasks();
  }, [refreshTasks]); // Dependency array ensures this effect runs only when refreshTasks changes

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} /> // Render TaskItem for each task
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
