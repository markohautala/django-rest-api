import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import styles from '../styles/Home.module.css'; // Importing necessary libraries and styles

function Comments({ postId, fetchCommentsForPost, incrementCommentCount }) {
  // State variables to manage the comment input, errors, loading state, and success message
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle changes in the comment input field
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Handle the submission of the comment
  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    // Check if the comment is empty and set an error if it is
    if (comment.trim() === '') {
      setErrors('Comment cannot be empty');
      return;
    }

    setLoading(true); // Indicate that the submission is in progress
    setErrors(null); // Clear any previous errors

    // Retrieve CSRF token and authentication token for the request
    const csrfToken = Cookies.get('csrftoken');
    const token = localStorage.getItem('token');

    // If no token is found, display an error and stop the submission
    if (!token) {
      setErrors('Authentication token not found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      // Send the comment to the server
      const response = await axios.post('http://127.0.0.1:8000/housepostcomments/', {
        housepost: postId,
        comment: comment.trim(),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
          Authorization: `Token ${token}`,
        },
        withCredentials: true,
      });

      // Reset the comment input, refetch comments, and increment the comment count on success
      setComment('');
      fetchCommentsForPost(postId);
      incrementCommentCount();
      setSuccessMessage('Comment added to housepost successfully.');

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error) {
      // Handle errors during the submission and display appropriate messages
      console.error('Error submitting comment:', error);
      const errorMsg = error.response?.data?.detail || 'Failed to submit the comment. Please try again.';
      setErrors(errorMsg);
    } finally {
      setLoading(false); // Reset the loading state
    }
  };

  return (
    <>
      {/* Display success message as an alert if available */}
      {successMessage && (
        <div style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          zIndex: 1000,
        }}>
          <Alert variant="success">
            {successMessage}
          </Alert>
        </div>
      )}
      {/* Form for submitting comments */}
      <Form onSubmit={handleCommentSubmit}>
        <div className="input-group mt-3">
          <Form.Control
            as="textarea"
            className="form-control"
            placeholder="Add a comment..."
            aria-label="Add a comment"
            value={comment}
            onChange={handleCommentChange}
            disabled={loading}
            rows={2}
          />
          <button
            className={`btn ${styles.SubmitButton}`}
            type="submit"
            disabled={loading || comment.trim() === ''}
          >
            {loading ? 'Submitting...' : 'Comment'}
            {!loading && <span className="material-symbols-outlined">send</span>}
          </button>
        </div>
        {/* Display error messages if any */}
        {errors && (
          <div className="text-danger mt-2">
            {errors}
          </div>
        )}
      </Form>
    </>
  );
}

export default Comments; // Exporting the Comments component
