// src/components/TaskCreationForm.js

import React, { useState } from 'react'; // Import necessary hooks
import axios from 'axios'; // Import axios for making HTTP requests

const TaskCreationForm = ({ refreshTasks }) => { // Destructure refreshTasks from props
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const token = localStorage.getItem('token'); // Get the stored JWT token
      try {
        await axios.post('http://127.0.0.1:5000/create-task', {
          title: formData.title,
          description: formData.description,
          due_date: formData.dueDate
        }, {
          headers: { Authorization: `Bearer ${token}` } // Set authorization header with JWT token
        });
        refreshTasks(); // Refresh the task list after creating a new task
      } catch (error) {
        console.error('Error creating task', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
        {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
        {errors.dueDate && <p style={{ color: 'red' }}>{errors.dueDate}</p>}
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskCreationForm;
