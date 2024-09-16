import React, { useState, useEffect } from "react";
import { Modal, Button, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Profile.module.css";
import loadingSpinner from "../assets/loading.gif";

function Profile() {
  // State management
  const [userProfile, setUserProfile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [tempProfilePicture, setTempProfilePicture] = useState("");
  const [tempProfilePictureFile, setTempProfilePictureFile] = useState(null); // Added state for the image file
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Effect to fetch user profile data when the component mounts
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
        setTempProfilePicture(profileImg);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setErrors({ non_field_errors: ["Failed to load profile data."] });
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle image upload to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Use your Cloudinary upload preset

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dtjbfg6km/image/upload', formData);
      return response.data.secure_url; // Return Cloudinary URL
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };

  // Handle profile picture changes in the modal
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTempProfilePicture(URL.createObjectURL(file)); // Update the preview with the selected image
      setTempProfilePictureFile(file); // Save the file object for uploading
    }
  };

  // Handle saving the edited profile
  const handleSaveProfile = async () => {
    const updatedProfile = {
      display_name: displayName === "No display name yet" ? "" : displayName,
      bio: bio === "No bio has been given yet" ? "" : bio,
    };

    setIsLoading(true);

    try {
      let profilePictureUrl = profilePicture;

      if (tempProfilePictureFile) {
        profilePictureUrl = await uploadImageToCloudinary(tempProfilePictureFile);
      }

      const formData = new FormData();
      formData.append("display_name", updatedProfile.display_name);
      formData.append("bio", updatedProfile.bio);
      if (profilePictureUrl !== profilePicture) {
        formData.append("profile_picture", profilePictureUrl);
      }

      await axios.patch(`https://housegram-fullstack-app-a01c6177ffd8.herokuapp.com/userprofiles/${userProfile.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      setProfilePicture(profilePictureUrl);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors(error.response?.data || { non_field_errors: ["Failed to update profile."] });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancelling profile edits
  const handleCancelEdit = () => {
    setTempProfilePicture(profilePicture);
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
          top: '100px',
          right: '20px',
          zIndex: 1000,
          width: '250px',
          textAlign: 'center',
          padding: '10px',
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

      <Modal
        show={isEditing}
        onHide={handleCancelEdit}
        size="lg"
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
                  className="mt-3 img-fluid rounded-circle"
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
