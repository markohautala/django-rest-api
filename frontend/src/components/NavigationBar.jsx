import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo2 from "../assets/logo2.png";
import styles from "../styles/NavigationBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUserContext';
import axios from 'axios';

// Function to get CSRF token from cookies
const getCSRFToken = () => {
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return csrfToken;
};

function NavigationBar({ isAuthenticated }) {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  // Handle user login
  const handleLogin = async (credentials) => {
    try {
      const csrfToken = getCSRFToken();
      const response = await axios.post('/dj-rest-auth/login/', credentials, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });
      setCurrentUser(response.data.user); // Update context with user data
      navigate('/home'); // Redirect after login
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      const csrfToken = getCSRFToken();
      await axios.post('/dj-rest-auth/logout/', {}, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });
      setCurrentUser(null); // Clear user context
      navigate('/home'); // Redirect after logout
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Add a new note function
  const addNote = async (newNote) => {
    if (!newNote.title || !newNote.content) {
      console.error("Title and content are required.");
      return; // Basic validation
    }

    try {
      const csrfToken = getCSRFToken();
      const token = localStorage.getItem('token'); // Get token for auth

      const response = await axios.post('/notes/', newNote, {
        headers: {
          Authorization: `Token ${token}`,
          'X-CSRFToken': csrfToken,
        },
      });

      console.log("Note created:", response.data);
      // Update your notes state if needed
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Handle navigation link click and collapse navbar
  const handleNavClick = (path) => {
    setExpanded(false);
    navigate(path);
  };

  return (
    <Navbar expand="lg" className={styles.NavigationBar} fixed="top" expanded={expanded}>
      <Container>
        <Navbar.Brand className={styles.NavbarBrand}>
          <NavLink to="/" onClick={() => setExpanded(false)} className={styles.BrandLink}>
            <img src={logo2} alt="logo" height={50} className={styles.BrandLogo} />
            <span className={styles.BrandText}>HOUSEGRAM</span>
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <NavLink to="/home" className={styles.NavLink} onClick={() => handleNavClick("/home")}>
                  <span className="material-symbols-outlined">home</span> Home
                </NavLink>
                <NavLink to="/upload" className={styles.NavLink} onClick={() => handleNavClick("/upload")}>
                  <span className="material-symbols-outlined">add_photo_alternate</span> Upload
                </NavLink>
                <NavLink to="/profile" className={styles.NavLink} onClick={() => handleNavClick("/profile")}>
                  <span className="material-symbols-outlined">account_box</span> Profile
                </NavLink>
                <NavLink to="/notes" className={styles.NavLink} onClick={() => handleNavClick("/notes")}>
                  <span className="material-symbols-outlined">edit_note</span> Notes
                </NavLink>
                <NavLink to="#" onClick={handleLogout} className={styles.NavLink}>
                  <span className="material-symbols-outlined">logout</span> Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className={styles.NavLink} onClick={() => handleNavClick("/login")}>
                  <span className="material-symbols-outlined">key</span> Login
                </NavLink>
                <NavLink to="/create-account" className={styles.NavLink} onClick={() => handleNavClick("/create-account")}>
                  <span className="material-symbols-outlined">person_add</span> Create Account
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
