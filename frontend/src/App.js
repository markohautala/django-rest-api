// src/App.js
import React from 'react';
import NavigationBar from './components/NavigationBar';
import styles from './App.module.css';
import Container from 'react-bootstrap/Container';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './components/Routes';

function App() {
  return (
    <AuthProvider>
      <div className={styles.App}>
        <NavigationBar />
        <Container className={styles.Main}>
          <AppRoutes />
        </Container>
      </div>
    </AuthProvider>
  );
}

export default App;
