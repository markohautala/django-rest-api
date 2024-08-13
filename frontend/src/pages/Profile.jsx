import React from "react";
import styles from "../styles/Profile.module.css"; // Import the CSS module

function Profile() {
  const user = {
    name: "John Doe", // Replace with actual user data
    bio: "Software developer with a passion for creating web applications. Software developer with a passion for creating web applications. Software developer with a passion for creating web applications. Software developer with a passion for creating web applications.",
    profileImage: "https://via.placeholder.com/150", // Replace with actual user profile image URL
  };

  return (
    <div className={styles.profileCard}>
      <img
        src={user.profileImage}
        alt="Profile"
        className={styles.profileImage}
      />
      <div className={styles.profileDetails}>
        <h1 className={styles.profileName}>{user.name}</h1>
        <p className={styles.profileBio}>{user.bio}</p>
      </div>
    </div>
  );
}

export default Profile;
