import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext";

export function useRedirect(redirectOnAuth) {
  const currentUser = useCurrentUser();
  const navigate = useNavigate(); // useNavigate replaces useHistory

  useEffect(() => {
    if (redirectOnAuth === "loggedIn" && currentUser) {
      navigate("/"); // use navigate instead of history.push
    } else if (redirectOnAuth === "loggedOut" && !currentUser) {
      navigate("/signin"); // use navigate instead of history.push
    }
  }, [currentUser, redirectOnAuth, navigate]); // update dependency array
}
