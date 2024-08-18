import React, { useState, useEffect } from "react";
import { Modal, Button, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "../styles/Profile.module.css";
import loadingSpinner from "../assets/loading.gif"; // Updated to use the smaller loading spinner

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [tempProfilePicture, setTempProfilePicture] = useState(""); // Temporary profile picture for the modal
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userResponse = await axios.get("/dj-rest-auth/user/", {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });

        const userId = userResponse.data.pk;

        const response = await axios.get(`/userprofiles/${userId}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        });

        const data = response.data;
        setUserProfile(data);
        setDisplayName(data.display_name || "No display name yet");
        setBio(data.bio || "No bio has been given yet");
        const profileImg = data.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        setProfilePicture(profileImg);
        setTempProfilePicture(profileImg); // Initialize the temp profile picture with the current one
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setErrors({ non_field_errors: ["Failed to load profile data."] });
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTempProfilePicture(URL.createObjectURL(file)); // Update only the temporary profile picture
    }
  };

  const handleSaveProfile = async () => {
    const updatedProfile = {
      display_name: displayName === "No display name yet" ? "" : displayName,
      bio: bio === "No bio has been given yet" ? "" : bio,
    };

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("display_name", updatedProfile.display_name);
      formData.append("bio", updatedProfile.bio);
      if (tempProfilePicture !== profilePicture) { // Check if the profile picture has changed
        formData.append("profile_picture", tempProfilePicture);
      }

      await axios.patch(`/userprofiles/${userProfile.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      setProfilePicture(tempProfilePicture); // Only update the main profile picture after saving
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide success message after 3 seconds
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors(error.response?.data || { non_field_errors: ["Failed to update profile."] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setTempProfilePicture(profilePicture); // Reset the temporary profile picture on cancel
    setIsEditing(false);
  };

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
