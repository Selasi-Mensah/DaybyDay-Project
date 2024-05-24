// src/components/TaskCreationForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskCreationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post('http://127.0.0.1:5000/create-task', formData)
        .then(response => {
          console.log('Task created:', response.data);
        })
        .catch(error => {
          console.error('Task creation error:', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
        {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
        {errors.dueDate && <p style={{ color: 'red' }}>{errors.dueDate}</p>}
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskCreationForm;