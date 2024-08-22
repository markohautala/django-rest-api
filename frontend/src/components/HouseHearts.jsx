import React, { useState } from 'react';
import axios from 'axios';
import heartNotLiked from '../assets/househeart-not-liked.png';
import heartLiked from '../assets/househeart-liked.png';
import styles from '../styles/HouseHeart.module.css'; // Corrected path to the CSS module

const HouseHearts = ({ postId, currentHeartCount }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [heartsCount, setHeartsCount] = useState(currentHeartCount);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const loggedInUser = JSON.parse(localStorage.getItem('user'))?.username;
    const token = localStorage.getItem('token');
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];

    const handleLike = () => {
        if (isLiked) {
            setAlertMessage("You have either househearted your own post or househearted a post twice, which cannot be done.");
            setAlertType('error');
            showTemporaryAlert(4000); // Show the alert for 3 seconds
            return;
        }

        axios.post('http://127.0.0.1:8000/househearts/', {
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
            setIsLiked(true);
            setHeartsCount(heartsCount + 1);
            setAlertMessage("You have HouseHearted this post.");
            setAlertType('success');
            showTemporaryAlert(3000); // Show the success message for 3 seconds
        })
        .catch(error => {
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
            showTemporaryAlert(3000); // Show the error message for 3 seconds
        });
    };

    const showTemporaryAlert = (duration) => {
        setTimeout(() => {
            setAlertMessage('');
        }, duration);
    };

    return (
        <div>
            <button
                className="btn btn-link p-0 d-flex align-items-center"
                type="button"
                onClick={handleLike}
                style={{ textDecoration: 'none' }} // Remove text decoration
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
            {alertMessage && (
                <div className={`${styles.alert} ${alertType === 'success' ? styles['alert-success'] : styles['alert-error']}`}>
                    {alertMessage}
                </div>
            )}
        </div>
    );
};

export default HouseHearts;
