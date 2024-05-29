// src/App.js

import React, { useState, useEffect } from 'react'; // Import necessary hooks
import axios from 'axios'; // Import axios for making HTTP requests
import TaskForm from './components/TaskForm'; // Import TaskForm component
import TaskList from './components/TaskList'; // Import TaskList component
import TaskCreationForm from './components/TaskCreationForm'; // Import TaskCreationForm component

const App = () => {
  const [tasks, setTasks] = useState([]); // State variable to hold the list of tasks

  // Function to refresh the task list by fetching tasks from the backend
  const refreshTasks = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the stored JWT token
      const response = await axios.get('http://127.0.0.1:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` } // Set authorization header with JWT token
      });
      setTasks(response.data); // Update state with the fetched tasks
    } catch (error) {
      console.error('Error fetching tasks:', error); // Handle error
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    refreshTasks(); // Refresh tasks when the component mounts
  }, []);

  return (
    <div>
      <h1>DayByDay Task Scheduler</h1>
      <TaskForm refreshTasks={refreshTasks} /> {/* Render TaskForm and pass refreshTasks function */}
      <TaskCreationForm refreshTasks={refreshTasks} /> {/* Render TaskCreationForm and pass refreshTasks function */}
      <TaskList tasks={tasks} refreshTasks={refreshTasks} /> {/* Render TaskList and pass tasks and refreshTasks */}
    </div>
  );
};

export default App;
