import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext";

// Custom hook to redirect users based on their authentication status
export function useRedirect(redirectOnAuth) {
  const currentUser = useCurrentUser();  // Get the current user from context
  const navigate = useNavigate();  // Get the navigate function to handle navigation

  useEffect(() => {
    // Redirect logic based on user authentication status
    if (redirectOnAuth === "loggedIn" && currentUser) {
      navigate("/");  // If the user is logged in, redirect to the home page
    } else if (redirectOnAuth === "loggedOut" && !currentUser) {
      navigate("/signin");  // If the user is logged out, redirect to the sign-in page
    }
  }, [currentUser, redirectOnAuth, navigate]);  // Dependency array ensures this effect runs when these values change
}
