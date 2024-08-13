// src/components/Routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from '../pages/auth/SignUpForm.jsx';
import LogInForm from '../pages/auth/LogInForm.jsx';
import Profile from '../pages/Profile.jsx';
import Upload from '../pages/Upload.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LogInForm />} />
      <Route path="/create-account" element={<SignUpForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
