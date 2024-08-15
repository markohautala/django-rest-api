import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateAccountForm from '../pages/auth/CreateAccountForm.jsx';
import LogInForm from '../pages/auth/LogInForm.jsx';
import Profile from '../pages/Profile.jsx';
import Upload from '../pages/Upload.jsx';
import Home from '../components/Home.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LogInForm />} />
      <Route path="/create-account" element={<CreateAccountForm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
