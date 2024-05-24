// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/login', formData)
      .then(response => {
        setLoggedIn(true);
      })
      .catch(error => {
        console.error('Login error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" onChange={handleChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;