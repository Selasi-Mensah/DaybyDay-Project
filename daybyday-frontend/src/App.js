import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login setAuth={setIsAuth} />
          </Route>
          <Route path="/dashboard">
            {isAuth ? <Dashboard /> : <p>Please log in</p>}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
