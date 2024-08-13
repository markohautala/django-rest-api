import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import loadingGif from "../../assets/loading.gif";  // If you're using a loading GIF
import styles from "../../styles/SignInUpForm.module.css"; // If you're using custom styles

function LogInForm() {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Get the login function from AuthContext
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Manage loading state
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/dj-rest-auth/login/",
        signInData,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );
      const token = response.data.key;
      login(token); // Store token and update auth state
      navigate("/");
    } catch (error) {
      console.error('Login error response:', error.response?.data || error.message);
      setError(error.response?.data || "An error occurred");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mt-5">
      {loading && (
        <div className={styles.loadingOverlay}>
          <img src={loadingGif} alt="Loading..." className={styles.loadingSpinner} />
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center mb-4">Login to your account</h2>
          {error && (
            <div className="alert alert-warning" role="alert">
              {error.non_field_errors
                ? error.non_field_errors.join(", ")
                : "There was an issue with your login. Please try again."}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={signInData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={signInData.password}
                onChange={handleChange}
                required
              />
              <span
                className="material-symbols-outlined position-absolute"
                style={{ top: "40px", right: "10px", cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Login
            </button>
          </form>

          <button
            onClick={() => navigate("/signup")}
            className="btn btn-white mt-3 w-100"
            style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}
          >
            Create a user account
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
