import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests

const TaskForm = ({ refreshTasks }) => {
  // Define state variables for the form inputs
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const token = localStorage.getItem('token'); // Get the stored JWT token
    const data = { title, description, due_date: dueDate, priority }; // Create task data object
    
    try {
      // Make a POST request to create a new task
      await axios.post('/tasks', data, {
        headers: { Authorization: `Bearer ${token}` } // Set authorization header with JWT token
      });
      refreshTasks(); // Refresh the task list after creating a new task
    } catch (error) {
      console.error("There was an error creating the task!", error); // Log any errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update state on input change
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Update state on input change
        ></textarea>
      </div>
      <div>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)} // Update state on input change
          required
        />
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)} // Update state on input change
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
