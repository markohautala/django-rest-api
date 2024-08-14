import React from 'react';
import NavigationBar from './components/NavigationBar';
import Container from "react-bootstrap/Container";
import AppRoutes from './components/Routes';
import "./api/axiosDefaults";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <AppRoutes />
      </Container>
    </div>
  );
}

export default App;
