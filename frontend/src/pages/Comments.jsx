import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import styles from '../styles/Home.module.css';

function Comments({ postId, fetchCommentsForPost, incrementCommentCount }) {
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (comment.trim() === '') {
      setErrors('Comment cannot be empty');
      return;
    }

    setLoading(true);
    setErrors(null);

    const csrfToken = Cookies.get('csrftoken');
    const token = localStorage.getItem('token');

    if (!token) {
      setErrors('Authentication token not found. Please log in.');
      setLoading(false);
      return;
    }

    try {
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

      setComment('');
      fetchCommentsForPost(postId); // Refetch the comments
      incrementCommentCount(); // Increment the comment count in the UI
      setSuccessMessage('Comment added to housepost successfully.');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Hide the success message after 3 seconds

    } catch (error) {
      console.error('Error submitting comment:', error);
      const errorMsg = error.response?.data?.detail || 'Failed to submit the comment. Please try again.';
      setErrors(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {successMessage && (
        <div style={{
          position: 'fixed',
          top: '100px', // 100px from the top
          right: '20px', // 20px from the right
          zIndex: 1000, // Ensure it's above other elements
        }}>
          <Alert variant="success">
            {successMessage}
          </Alert>
        </div>
      )}
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
        {errors && (
          <div className="text-danger mt-2">
            {errors}
          </div>
        )}
      </Form>
    </>
  );
}

export default Comments;
