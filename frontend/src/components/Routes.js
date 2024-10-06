import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from '../pages/auth/LogInForm';
import Signup from '../pages/auth/CreateAccountForm';
import Upload from '../pages/Upload';
import Profile from '../pages/Profile';
import Notes from '../pages/Notes';

function AppRoutes({ isAuthenticated }) {
  return (
    <Routes>
      {/* Route for Home page; always accessible */}
      <Route path="/home" element={<Home isAuthenticated={isAuthenticated} />} />

      {/* Route for Login page; redirects to Home if already authenticated */}
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />

      {/* Route for Signup page; redirects to Home if already authenticated */}
      <Route path="/create-account" element={!isAuthenticated ? <Signup /> : <Navigate to="/home" />} />

      {/* Route for Upload page; accessible only when authenticated, otherwise redirects to Home */}
      <Route path="/upload" element={isAuthenticated ? <Upload /> : <Navigate to="/home" />} />

      {/* Route for Notes page; accessible only when authenticated, otherwise redirects to Home */}
      <Route path="/notes" element={isAuthenticated ? <Notes /> : <Navigate to="/home" />} />

      {/* Route for Profile page; accessible only when authenticated, otherwise redirects to Home */}
      <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/home" />} />

      {/* Catch-all route; redirects any unknown paths to Home */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default AppRoutes;
