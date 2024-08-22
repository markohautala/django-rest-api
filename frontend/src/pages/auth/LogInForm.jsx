import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSetCurrentUser } from "../../context/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import loadingGif from "../../assets/loading.gif";
import styles from "../../styles/SignInUpForm.module.css";

// Updated setTokenTimestamp function to ensure it correctly handles the token
function setTokenTimestamp(data) {
  if (typeof data.key !== 'string') {
    throw new Error("Invalid token: must be a string");
  }

  // Assuming setTokenTimestamp stores the token and timestamp correctly
  localStorage.setItem('token', data.key);
  localStorage.setItem('tokenTimestamp', Date.now());
}

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Manage loading state
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    const csrfToken = Cookies.get("csrftoken");

    try {
      // Log in the user and get the authentication token
      const { data } = await axios.post("/dj-rest-auth/login/", signInData, {
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });

      console.log("Login response data:", data);

      // Validate that data.key is a string
      if (typeof data.key !== 'string') {
        throw new Error("Invalid token: must be a string");
      }

      // Save the token and timestamp
      setTokenTimestamp(data);

      // Fetch the current user details using the token
      const userResponse = await axios.get("/dj-rest-auth/user/", {
        headers: {
          Authorization: `Token ${data.key}`,
        },
      });

      console.log("User response data:", userResponse.data);

      // Set the current user context
      setCurrentUser(userResponse.data);

      // Store the user information in localStorage
      localStorage.setItem('user', JSON.stringify(userResponse.data)); // Store user info

      // Redirect to homepage after successful login
      navigate("/");
    } catch (err) {
      console.error("Login error response:", err.response?.data || err.message);
      setErrors(err.response?.data || {
        non_field_errors: ["Something went wrong, please try again."],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
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
              <span
                className="material-symbols-outlined position-absolute"
                style={{ top: "40px", right: "10px", cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
              {errors.password?.map((message, idx) => (
                <div key={idx} className="alert alert-warning mt-2" role="alert">
                  {message}
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Sign in
            </button>
          </form>
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
