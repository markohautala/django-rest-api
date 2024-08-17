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

      // Clear local storage and session storage
      localStorage.clear();
      sessionStorage.clear();

      // Manually clear cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/");
      });

      // Set the current user to null in the context
      setCurrentUser(null);

      // Navigate to the home page
      navigate("/home");
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

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
