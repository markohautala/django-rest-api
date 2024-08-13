import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo2 from "../assets/logo2.png";
import styles from "../styles/NavigationBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function NavigationBar() {
  const { isAuthenticated, logout } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    setExpanded(false);
    navigate(path);
  };

  return (
    <Navbar expand="lg" className={styles.NavigationBar} fixed="top" expanded={expanded}>
      <Container>
        <Navbar.Brand className={styles.NavbarBrand}>
          <NavLink to="/" onClick={() => setExpanded(false)} className={styles.BrandLink}>
            <img
              src={logo2}
              alt="logo"
              height={50}
              className={styles.BrandLogo}
            />
            <span className={styles.BrandText}>HOUSEGRAM</span>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <NavLink to="/" className={styles.NavLink} onClick={() => handleNavClick("/")}>
                  <span className="material-symbols-outlined">home</span> Home
                </NavLink>
                <NavLink to="/upload" className={styles.NavLink} onClick={() => handleNavClick("/upload")}>
                  <span className="material-symbols-outlined">add_photo_alternate</span> Upload
                </NavLink>
                <NavLink to="/profile" className={styles.NavLink} onClick={() => handleNavClick("/profile")}>
                  <span className="material-symbols-outlined">account_box</span> Profile
                </NavLink>
                <NavLink
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    setExpanded(false);
                  }}
                  className={styles.NavLink}
                >
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
