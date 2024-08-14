import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUpForm from '../pages/auth/SignUpForm.jsx';
import SignInForm from '../pages/auth/SignInForm.jsx';
import Profile from '../pages/Profile.jsx';
import Upload from '../pages/Upload.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/create-account" element={<SignUpForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
