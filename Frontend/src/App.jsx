import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import SubmitProblem from './components/SubmitProblem';
import ProblemList from './components/ProblemList';
import Register from './components/Register';
import Login from './components/Login';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    // On component mount, check if user data is in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setUser(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-6 items-center text-white">
            <li>
              <Link to="/" className="hover:bg-gray-700 p-2 rounded-md">Home</Link>
            </li>
            <li>
              <Link to="/submit" className="hover:bg-gray-700 p-2 rounded-md">Submit Problem</Link>
            </li>
            {!user && 
              <li>
                <Link to="/register" className="hover:bg-gray-700 p-2 rounded-md">Register</Link>
              </li>
            }
            {!user && 
              <li>
                <Link to="/login" className="hover:bg-gray-700 p-2 rounded-md">Login</Link>
              </li>
            }
            {user && 
              <li>
                <button 
                  onClick={handleLogout} 
                  className="hover:bg-gray-700 p-2 rounded-md text-white bg-red-600"
                >
                  Logout
                </button>
              </li>
            }
          </ul>
        </nav>
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-4">Crowdsourced Problem-Solving Platform</h1>
          <Routes>
            <Route path="/" element={user ? <ProblemList /> : <Navigate to="/login" />} />
            <Route path="/submit" element={user ? <SubmitProblem /> : <Navigate to="/login" />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
