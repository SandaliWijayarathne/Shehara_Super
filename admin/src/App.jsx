import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Admin from './Pages/Admin/Admin';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute';

const App = () => {
  const isAuthenticated = localStorage.getItem('admin-auth-token');

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/login" replace /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
