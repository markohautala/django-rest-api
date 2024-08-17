import React from 'react';
import LandingPage from '../pages/LandingPage'; // Corrected path
import HousePosts from '../pages/HousePosts'; // Corrected path

function Home({ isAuthenticated }) {
  return (
    <div>
      {isAuthenticated ? <HousePosts /> : <LandingPage />}
    </div>
  );
}

export default Home;
