import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";  // Adjust to your backend URL
axios.defaults.withCredentials = true;  // Ensures cookies are sent with requests

// Function to get CSRF token from cookies
const getCSRFToken = () => {
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return csrfToken;
};

// Interceptor to add CSRF token to headers of all requests
axios.interceptors.request.use((config) => {
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const axiosReq = axios.create();
export const axiosRes = axios.create();
