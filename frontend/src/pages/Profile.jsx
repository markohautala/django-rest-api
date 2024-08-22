import React, { useState, useEffect } from "react";
import { Modal, Button, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import styles from "../styles/Profile.module.css";
import loadingSpinner from "../assets/loading.gif"; // Updated to use the smaller loading spinner

function Profile() {
  // State management
  const [userProfile, setUserProfile] = useState(null); // Stores the user profile data
  const [displayName, setDisplayName] = useState(""); // Stores the display name
  const [bio, setBio] = useState(""); // Stores the bio
  const [profilePicture, setProfilePicture] = useState(""); // Stores the profile picture URL
  const [tempProfilePicture, setTempProfilePicture] = useState(""); // Temporary profile picture for editing
  const [isEditing, setIsEditing] = useState(false); // Controls whether the profile is in edit mode
  const [isLoading, setIsLoading] = useState(true); // Manages loading state during data fetching or saving
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Controls the visibility of the success message
  const [errors, setErrors] = useState({}); // Stores any errors encountered
  const navigate = useNavigate();  // Initialize useNavigate for navigation

  // Effect to fetch user profile data when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch the current user's basic info
        const userResponse = await axios.get("/dj-rest-auth/user/", {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`, // Include the auth token in the headers
          },
        });

        const userId = userResponse.data.pk; // Get the user's ID from the response

        // Fetch the full profile details using the user's ID
        const response = await axios.get(`/userprofiles/${userId}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`, // Include the auth token in the headers
          },
        });

        const data = response.data;
        setUserProfile(data); // Store the profile data in state
        setDisplayName(data.display_name || "No display name yet"); // Set display name with a fallback
        setBio(data.bio || "No bio has been given yet"); // Set bio with a fallback
        const profileImg = data.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"; // Default profile picture if none exists
        setProfilePicture(profileImg);
        setTempProfilePicture(profileImg); // Initialize the temporary profile picture
        setIsLoading(false); // Data fetching complete, disable loading
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setErrors({ non_field_errors: ["Failed to load profile data."] });
        setIsLoading(false);
      }
    };

    fetchUserProfile(); // Trigger the fetch on component mount
  }, []);

  // Handle profile picture changes in the modal
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTempProfilePicture(URL.createObjectURL(file)); // Update the preview with the selected image
    }
  };

  // Handle saving the edited profile
  const handleSaveProfile = async () => {
    const updatedProfile = {
      display_name: displayName === "No display name yet" ? "" : displayName, // Remove placeholder text
      bio: bio === "No bio has been given yet" ? "" : bio, // Remove placeholder text
    };

    setIsLoading(true); // Start loading state

    try {
      const formData = new FormData();
      formData.append("display_name", updatedProfile.display_name);
      formData.append("bio", updatedProfile.bio);
      if (tempProfilePicture !== profilePicture) { // Only append the picture if it has changed
        formData.append("profile_picture", tempProfilePicture);
      }

      // Send the PATCH request to update the profile
      await axios.patch(`/userprofiles/${userProfile.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem('token')}`, // Include the auth token in the headers
        },
      });

      setProfilePicture(tempProfilePicture); // Update the main profile picture after saving
      setShowSuccessMessage(true); // Show success message
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide success message after 3 seconds
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors(error.response?.data || { non_field_errors: ["Failed to update profile."] });
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  // Handle cancelling profile edits
  const handleCancelEdit = () => {
    setTempProfilePicture(profilePicture); // Reset the temporary profile picture to the original
    setIsEditing(false); // Exit edit mode
  };

  // Loading spinner while fetching data
  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}>
        <img src={loadingSpinner} alt="Loading..." style={{ width: '75px', height: '75px' }} />
      </div>
    );
  }

  return (
    <div className={styles.profileCard}>
      {/* Success message display */}
      {showSuccessMessage && (
        <Alert variant="success" style={{
          position: 'fixed',
          top: '100px',  // Distance from the top of the page
          right: '20px',  // Distance from the right side of the page
          zIndex: 1000,
          width: '250px',  // Smaller width
          textAlign: 'center',
          padding: '10px',  // Smaller padding
        }}>
          Profile saved successfully!
        </Alert>
      )}

      {/* Profile picture and details */}
      <img
        src={profilePicture}
        alt="Profile"
        className={styles.profileImage}
      />
      <div className={styles.profileDetails}>
        <h1 className={styles.profileName}>
          {displayName}
        </h1>
        <p className={styles.profileBio}>
          {bio}
        </p>
        <Button variant="dark" onClick={() => setIsEditing(true)}>Edit Profile</Button>
      </div>

      {/* Modal for Editing Profile */}
      <Modal
        show={isEditing}
        onHide={handleCancelEdit}
        size="lg" // Make the modal larger
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4}>
              <div>
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                />
                <img
                  src={tempProfilePicture}
                  alt="Profile Preview"
                  className="mt-3 img-fluid rounded-circle" // Make the image preview round
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
            </Col>
            <Col md={8}>
              <div>
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  className="form-control"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  className="form-control"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCancelEdit}>Cancel</Button>
          <Button variant="dark" onClick={handleSaveProfile}>Save Profile</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
