import axios from "axios";

// Set up default configuration for axios
axios.defaults.baseURL = "http://localhost:8000";  // Base URL for all axios requests, adjust to your backend URL
axios.defaults.withCredentials = true;  // Ensure that cookies are sent with every request, important for authentication

// Function to retrieve CSRF token from cookies
const getCSRFToken = () => {
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))  // Look for the 'csrftoken' cookie
    ?.split('=')[1];  // Extract the token value from the cookie
  return csrfToken;
};

// Add a request interceptor to automatically include CSRF token in request headers
axios.interceptors.request.use((config) => {
  const csrfToken = getCSRFToken();  // Get the CSRF token from cookies
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;  // Attach the CSRF token to the headers of each request
  }
  return config;  // Return the modified config
}, (error) => {
  return Promise.reject(error);  // Handle any errors that occur during request setup
});

// Create separate axios instances for making requests and handling responses
export const axiosReq = axios.create();  // Instance for making API requests
export const axiosRes = axios.create();  // Instance for handling API responses
