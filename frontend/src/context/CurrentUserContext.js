import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from 'react-router-dom';
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

// Create contexts to store the current user and provide a way to update it
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks to easily access the current user and set user contexts
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  // State to hold the current user information
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Function to fetch the current user information on component mount
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data); // Set the current user state with fetched data
    } catch (err) {
      // Handle errors silently (could add error handling here if needed)
    }
  };

  // useEffect to run the handleMount function when the component mounts
  useEffect(() => {
    handleMount();
  }, []);

  // useMemo to set up axios interceptors that handle token refresh and error responses
  useMemo(() => {
    // Request interceptor to refresh the token if needed before making requests
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/"); // Refresh the token if needed
          } catch (err) {
            setCurrentUser(null); // If refresh fails, clear the current user
            navigate("/signin"); // Redirect to the sign-in page
            removeTokenTimestamp(); // Clear token timestamp
            return config;
          }
        }
        return config; // Proceed with the request
      },
      (err) => Promise.reject(err)
    );

    // Response interceptor to handle unauthorized responses
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) { // If the error is 401 (Unauthorized)
          try {
            await axios.post("/dj-rest-auth/token/refresh/"); // Attempt to refresh the token
          } catch (err) {
            setCurrentUser(null); // If refresh fails, clear the current user
            navigate("/signin"); // Redirect to the sign-in page
            removeTokenTimestamp(); // Clear token timestamp
          }
          return axios(err.config); // Retry the original request with the refreshed token
        }
        return Promise.reject(err); // For other errors, just reject the promise
      }
    );
  }, [navigate]); // Re-run this effect when `navigate` changes

  // Return the provider components to wrap the application or parts of it with user context
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children} {/* Render any child components that need access to this context */}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
