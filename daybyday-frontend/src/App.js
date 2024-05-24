import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import TaskForm from './components/TaskForm'; // Import TaskForm component
import TaskList from './components/TaskList'; // Import TaskList component
import TaskCreationForm from './components/TaskCreationForm';

const App = () => {
  const [tasks, setTasks] = useState([]); // State variable to hold the list of tasks

  // Function to refresh the task list by fetching tasks from the backend
  const refreshTasks = async () => {
    const token = localStorage.getItem('token'); // Get the stored JWT token
    const response = await axios.get('/tasks', {
      headers: { Authorization: `Bearer ${token}` } // Set authorization header with JWT token
    });
    setTasks(response.data); // Update state with the fetched tasks
  };

  
function App() {
  return (
    <div className="App">
      <h1>Create a New Task</h1>
      <TaskCreationForm />
    </div>
  );
}

  return (
    <div>
      <h1>DayByDay Task Scheduler</h1>
      <TaskForm refreshTasks={refreshTasks} /> {/* Render TaskForm and pass refreshTasks function */}
      <TaskList tasks={tasks} refreshTasks={refreshTasks} /> {/* Render TaskList and pass tasks and refreshTasks */}
    </div>
  );
};

export default App;
