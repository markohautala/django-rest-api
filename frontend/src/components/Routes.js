import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from '../pages/auth/LogInForm'; // Corrected path
import Signup from '../pages/auth/CreateAccountForm'; // Corrected path
import Upload from '../pages/Upload'; // Corrected path
import Profile from '../pages/Profile'; // Corrected path

function AppRoutes({ isAuthenticated }) {
  return (
    <Routes>
      <Route path="/home" element={<Home isAuthenticated={isAuthenticated} />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
      <Route path="/create-account" element={!isAuthenticated ? <Signup /> : <Navigate to="/home" />} />
      <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/home" />} />
      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/home" />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default AppRoutes;
