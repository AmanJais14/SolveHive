import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import SubmitProblem from "./components/SubmitProblem";
import ProblemList from "./components/ProblemList";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from "axios";
import { FcIdea } from "react-icons/fc";

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    // On component mount, check if user data is in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 relative ">
        <nav className="bg-gray-800 p-4 sticky top-0">
          <ul className="flex space-x-6 items-center text-white">
            <li>
              <Link to="/" className="hover:bg-gray-700 p-2 rounded-md">
                Home
              </Link>
            </li>
            <li>
              <Link to="/submit" className="hover:bg-gray-700 p-2 rounded-md">
                Submit Problem
              </Link>
            </li>
            {!user && (
              <li>
                <Link
                  to="/register"
                  className="hover:bg-gray-700 p-2 rounded-md"
                >
                  Register
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link to="/login" className="hover:bg-gray-700 p-2 rounded-md">
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:bg-gray-700 p-2 rounded-md text-white bg-red-600"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
        <main className="p-6">
          {/* <h1 className="text-3xl font-bold mb-4">SolveHive</h1>
          <p>
            <i>Where Collective Wisdom Creates Solutions</i>
          </p> */}
          <div className="text-center py-4 bg-gray-100 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">
            SolveHive 
            </h1>
            <p className="text-xl font-semibold text-gray-600">
            <i>Where Collective Wisdom Creates Solutions</i>
            </p>
          </div>
          <Routes>
            <Route
              path="/"
              element={user ? <ProblemList /> : <Navigate to="/login" />}
            />
            <Route
              path="/submit"
              element={user ? <SubmitProblem /> : <Navigate to="/login" />}
            />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
