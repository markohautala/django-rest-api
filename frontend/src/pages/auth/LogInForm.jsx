import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSetCurrentUser } from "../../context/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import loadingGif from "../../assets/loading.gif";
import styles from "../../styles/SignInUpForm.module.css";

// Function to save the authentication token and timestamp in local storage
function setTokenTimestamp(data) {
  if (typeof data.key !== 'string') {
    throw new Error("Invalid token: must be a string");
  }

  // Store the token and current timestamp in local storage
  localStorage.setItem('token', data.key);
  localStorage.setItem('tokenTimestamp', Date.now());
}

function SignInForm() {
  const setCurrentUser = useSetCurrentUser(); // Hook to update the current user context
  useRedirect("loggedIn"); // Redirects user to home if they are already logged in

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData; // Destructure state for easier access
  const [errors, setErrors] = useState({}); // State to store any errors
  const navigate = useNavigate(); // Hook for navigation
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setErrors({});
    setLoading(true); // Start loading animation

    const csrfToken = Cookies.get("csrftoken"); // Get CSRF token from cookies

    try {
      // Send login request with username and password
      const { data } = await axios.post("/dj-rest-auth/login/", signInData, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });

      console.log("Login response data:", data);

      // Validate and store the token and timestamp
      setTokenTimestamp(data);

      // Fetch current user details after successful login
      const userResponse = await axios.get("/dj-rest-auth/user/", {
        headers: {
          Authorization: `Token ${data.key}`,
        },
      });

      console.log("User response data:", userResponse.data);

      // Update the current user context with fetched user details
      setCurrentUser(userResponse.data);

      // Store user information in local storage
      localStorage.setItem('user', JSON.stringify(userResponse.data));

      // Redirect to homepage after successful login
      navigate("/");
    } catch (err) {
      console.error("Login error response:", err.response?.data || err.message);
      setErrors(err.response?.data || {
        non_field_errors: ["Something went wrong, please try again."],
      });
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  // Function to handle input field changes
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="container mt-5">
      {/* Display loading spinner if loading */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <img src={loadingGif} alt="Loading..." className={styles.loadingSpinner} />
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center mb-4">Login to your account</h2>
          {/* Display non-field errors */}
          {errors.non_field_errors?.map((message, idx) => (
            <div key={idx} className="alert alert-warning" role="alert">
              {message}
            </div>
          ))}
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                value={password}
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
              {/* Display password errors */}
              {errors.password?.map((message, idx) => (
                <div key={idx} className="alert alert-warning mt-2" role="alert">
                  {message}
                </div>
              ))}
            </div>
            {/* Submit button */}
            <button type="submit" className="btn btn-dark w-100">
              Sign in
            </button>
          </form>
          {/* Button to navigate to create account page */}
          <button
            onClick={() => navigate("/create-account")}
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

export default SignInForm;
