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
  // Access current user context and define state for navbar expansion
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  // Handle user logout by clearing session and navigating to home page
  const handleLogout = async () => {
    try {
      const csrfToken = getCSRFToken();

      if (!csrfToken) {
        console.error("CSRF token not found.");
        return;
      }

      await axios.post('/dj-rest-auth/logout/', {}, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
        },
        withCredentials: true,  // Ensure credentials are sent with the request
      });

      // Clear local storage, session storage, and cookies
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/");
      });

      // Reset the current user context and navigate to the home page
      setCurrentUser(null);
      navigate("/home");
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  // Handle navigation link click and collapse navbar
  const handleNavClick = (path) => {
    setExpanded(false);
    navigate(path);
  };

  // Main content of the component
  return (
    <Navbar expand="lg" className={styles.NavigationBar} fixed="top" expanded={expanded}>
      <Container>
        {/* Brand logo and name, navigate to home when clicked */}
        <Navbar.Brand className={styles.NavbarBrand}>
          <NavLink to="/" onClick={() => setExpanded(false)} className={styles.BrandLink}>
            <img src={logo2} alt="logo" height={50} className={styles.BrandLogo} />
            <span className={styles.BrandText}>HOUSEGRAM</span>
          </NavLink>
        </Navbar.Brand>

        {/* Toggle button for collapsing the navbar on smaller screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />

        {/* Collapsible navigation links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Display different navigation links based on authentication status */}
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
                <NavLink to="/notes" className={styles.NavLink}>
                <span class="material-symbols-outlined">edit_note</span> Notes
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
