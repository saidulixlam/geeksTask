import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Test from './components/Test';
import Results from './components/Results';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('login');
    setIsAuthenticated(loginStatus === 'true');
    const category = localStorage.getItem('category');
    setSelectedCategory(category);
  }, []);

  const handleLogin = (category) => {
    localStorage.setItem('login', 'true');
    localStorage.setItem('category', category);
    setIsAuthenticated(true);
    setSelectedCategory(category);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setSelectedCategory(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/test" /> : <Signup onLogin={handleLogin} />}
        />
        <Route
          path="/test"
          element={
            isAuthenticated ? (
              <Test selectedCategory={selectedCategory} handleLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/results"
          element={
            isAuthenticated ? (
              <Results handleLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
