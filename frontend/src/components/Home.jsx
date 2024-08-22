import React from 'react';
import LandingPage from '../pages/LandingPage'; // Importing the LandingPage component from the correct path
import HousePosts from '../pages/HousePosts'; // Importing the HousePosts component from the correct path

function Home({ isAuthenticated }) {
  return (
    <div>
      {isAuthenticated ? <HousePosts /> : <LandingPage />}
      {/* If the user is authenticated, display the HousePosts component; otherwise, display the LandingPage component */}
    </div>
  );
}

export default Home;
