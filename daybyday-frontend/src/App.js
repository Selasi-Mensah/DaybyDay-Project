import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setAuth={setIsAuth} />} />
          <Route path="/dashboard" element={isAuth ? <Dashboard /> : <p>Please log in</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
