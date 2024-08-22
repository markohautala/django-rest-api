import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useRedirect } from "../../hooks/useRedirect";
import loadingGif from "../../assets/loading.gif";
import styles from "../../styles/SignInUpForm.module.css";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap components

function SignUpForm() {
  useRedirect("loggedIn"); // Redirect user if they are already logged in
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData; // Destructure state for easy access
  const [errors, setErrors] = useState({}); // State to track form errors
  const [loading, setLoading] = useState(false); // State to track loading status
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // Navigation function from react-router-dom

  // Handle input changes and update state
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true); // Start loading animation

    // Check if passwords match
    if (password1 !== password2) {
      setErrors({ non_field_errors: ["The passwords don't match"] });
      setLoading(false); // Stop loading animation
      return;
    }

    const csrfToken = Cookies.get("csrftoken"); // Get CSRF token from cookies

    try {
      // Attempt to sign up the user
      await axios.post("/dj-rest-auth/registration/", signUpData, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
      navigate("/login"); // Redirect to login page on success
    } catch (err) {
      setErrors(err.response?.data || { non_field_errors: ["An error occurred. Please try again."] });
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="container mt-5">
      {/* Display loading spinner while submitting */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <img src={loadingGif} alt="Loading..." className={styles.loadingSpinner} />
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center mb-4">Create an account</h2>
          {/* Display non-field errors */}
          {errors.non_field_errors?.map((message, idx) => (
            <div key={idx} className="alert alert-warning" role="alert">
              {message}
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                required
              />
              {/* Display username errors */}
              {errors.username?.map((message, idx) => (
                <div key={idx} className="alert alert-warning mt-2" role="alert">
                  {message}
                </div>
              ))}
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password1" className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password1"
                name="password1"
                value={password1}
                onChange={handleChange}
                required
              />
              {/* Toggle password visibility */}
              <span
                className="material-symbols-outlined position-absolute"
                style={{ top: "40px", right: "10px", cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
              {/* Display password1 errors */}
              {errors.password1?.map((message, idx) => (
                <div key={idx} className="alert alert-warning mt-2" role="alert">
                  {message}
                </div>
              ))}
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password2" className="form-label">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                onChange={handleChange}
                required
              />
              {/* Toggle confirm password visibility */}
              <span
                className="material-symbols-outlined position-absolute"
                style={{ top: "40px", right: "10px", cursor: "pointer" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "visibility_off" : "visibility"}
              </span>
              {/* Display password2 errors */}
              {errors.password2?.map((message, idx) => (
                <div key={idx} className="alert alert-warning mt-2" role="alert">
                  {message}
                </div>
              ))}
            </div>
            {/* Submit button */}
            <button type="submit" className="btn btn-dark w-100">Sign Up</button>
          </form>

          {/* Button to navigate to the login page */}
          <button
            onClick={() => navigate("/login")}
            className="btn btn-white mt-3 w-100"
            style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}
          >
            Already have an account? Log in
          </button>

          {/* Instructions section with a gear icon to open modal */}
          <div className="text-center mt-3 d-flex justify-content-center align-items-center">
            <span className="me-2">Instructions</span> {/* Text to the left of the icon */}
            <span
              className="material-symbols-outlined"
              style={{ cursor: "pointer" }}
              onClick={() => setShowModal(true)}
            >
              settings
            </span>
          </div>
        </div>
      </div>

      {/* Modal displaying password requirements */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Password Requirements</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Your password can’t be too similar to your username.</li>
            <li>Your password must contain at least 8 characters.</li>
            <li>Your password can’t be a commonly used password.</li>
            <li>Your password can’t be entirely numeric.</li>
            <li>Username: letters, digits and @/./+/-/_ only.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignUpForm;
