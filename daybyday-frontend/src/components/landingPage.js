import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Welcome to the Task Scheduler</h1>
      <p>Please register or log in to continue.</p>
      <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
    </div>
  );
}

export default LandingPage;
