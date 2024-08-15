import React from 'react';
import NavigationBar from './components/NavigationBar';
import Container from "react-bootstrap/Container";
import AppRoutes from './components/Routes';
import "./api/axiosDefaults";
import styles from './App.module.css';


function App() {
  return (
    <div className={styles.App}>
      <NavigationBar />
      <Container className={styles.Main}>
        <AppRoutes />
      </Container>
    </div>
  );
}

export default App;
