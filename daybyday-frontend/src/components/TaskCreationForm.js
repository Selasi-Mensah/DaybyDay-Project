import React, { useState } from 'react';
import axios from 'axios';

const TaskCreationForm = ({ refreshTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://127.0.0.1:5000/create-task', {
        title,
        description,
        due_date: dueDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      setError(null);
      refreshTasks();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.errors);
      } else {
        console.error('Error creating task', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </div>
      {error && <div>
        {Object.keys(error).map((key) => (
          <p key={key} style={{ color: 'red' }}>{error[key]}</p>
        ))}
      </div>}
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskCreationForm;
