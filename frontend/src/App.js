import React, { useEffect, useState } from 'react';
import NavigationBar from './components/NavigationBar';
import Container from "react-bootstrap/Container";
import AppRoutes from './components/Routes';
import "./api/axiosDefaults";
import styles from './App.module.css';
import { useCurrentUser } from './context/CurrentUserContext';
import axios from 'axios';

function App() {
  const currentUser = useCurrentUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        await axios.get('/set-csrf/');
        console.log('CSRF token should now be set.');
      } catch (err) {
        console.error('Failed to set CSRF token:', err);
      }
    };

    fetchCSRFToken();

    if (currentUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  return (
    <div className={styles.App}>
      <NavigationBar isAuthenticated={isAuthenticated} />
      <Container className={styles.Main}>
        <AppRoutes isAuthenticated={isAuthenticated} />
      </Container>
    </div>
  );
}

export default App;
