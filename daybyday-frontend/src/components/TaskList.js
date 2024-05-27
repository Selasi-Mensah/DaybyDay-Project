import React, { useEffect, useState } from 'react'; // Import React and useEffect hook
import axios from 'axios';
import TaskItem from './TaskItem'; // Import TaskItem component

const TaskList = () => {
  const [tasks, setTasks, refreshTasks] = useState([]);

  // Use useEffect to refresh the task list when the component mounts
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]); // Dependency array ensures this effect runs only when refreshTasks changes

  useEffect(() => {
    // Fetch the list of tasks from the backend
    axios.get('http://127.0.0.1:5000/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} /> // Render TaskItem for each task
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
