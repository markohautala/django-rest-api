import React, { useState } from 'react';
import axios from 'axios';
import heartNotLiked from '../assets/househeart-not-liked.png';
import heartLiked from '../assets/househeart-liked.png';
import styles from '../styles/HouseHeart.module.css'; // Importing necessary assets and styles

const HouseHearts = ({ postId, currentHeartCount }) => {
    // State variables to manage the like status, heart count, and alert messages
    const [isLiked, setIsLiked] = useState(false);
    const [heartsCount, setHeartsCount] = useState(currentHeartCount);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    // Retrieve user and authentication details from local storage and cookies
    const loggedInUser = JSON.parse(localStorage.getItem('user'))?.username;
    const token = localStorage.getItem('token');
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];

    // Function to handle the like button click, sends a POST request to the server
    const handleLike = () => {
        if (isLiked) {
            setAlertMessage("You have either househearted your own post or househearted a post twice, which cannot be done.");
            setAlertType('error');
            showTemporaryAlert(4000); // Display error message for 4 seconds
            return;
        }

        axios.post('/househearts/', {
            housepost: postId,
            user: loggedInUser,
        }, {
            headers: {
                'Authorization': `Token ${token}`,
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            // Update state to reflect successful like and show success message
            setIsLiked(true);
            setHeartsCount(heartsCount + 1);
            setAlertMessage("You have HouseHearted this post.");
            setAlertType('success');
            showTemporaryAlert(3000); // Display success message for 3 seconds
        })
        .catch(error => {
            // Handle different types of errors and display appropriate messages
            if (error.response && error.response.status === 400) {
                setAlertMessage("You have either househearted your own post or househearted a post twice, which cannot be done.");
                setAlertType('error');
            } else if (error.response && error.response.status === 401) {
                setAlertMessage("You are not authorized to like this post. Please log in.");
                setAlertType('error');
            } else {
                setAlertMessage('Error liking the post.');
                setAlertType('error');
            }
            showTemporaryAlert(3000); // Display error message for 3 seconds
        });
    };

    // Function to show alert messages temporarily
    const showTemporaryAlert = (duration) => {
        setTimeout(() => {
            setAlertMessage('');
        }, duration);
    };

    return (
        <div>
            {/* Button to handle the like action */}
            <button
                className="btn btn-link p-0 d-flex align-items-center"
                type="button"
                onClick={handleLike}
                style={{ textDecoration: 'none' }}
            >
                <img
                    src={isLiked ? heartLiked : heartNotLiked}
                    alt="Like Button"
                    style={{ width: '28.8px', height: '28.8px' }}
                />
                <span style={{ marginLeft: '5px', color: 'black', fontWeight: 'bold' }}>
                    ({heartsCount})
                </span>
            </button>
            {/* Conditionally rendering alert messages based on user interactions */}
            {alertMessage && (
                <div className={`${styles.alert} ${alertType === 'success' ? styles['alert-success'] : styles['alert-error']}`}>
                    {alertMessage}
                </div>
            )}
        </div>
    );
};

export default HouseHearts;
