import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function CommentDelete({ commentId, commentUser, loggedInUser, fetchCommentsForPost }) {
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal
  const [loading, setLoading] = useState(false); // State to manage loading status during deletion

  // Function to handle the deletion of a comment
  const handleDelete = async () => {
    setLoading(true); // Start loading animation

    const token = localStorage.getItem('token'); // Retrieve the authentication token from local storage
    if (!token) {
      alert('Authentication token not found. Please log in.');
      setLoading(false); // Stop loading if there's no token
      return;
    }

    try {
      const deleteUrl = `/housepostcomments/${commentId}/`; // URL for deleting the specific comment
      await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Token ${token}`, // Include the token in the request header for authentication
        },
      });

      fetchCommentsForPost(); // Refresh the comments after successful deletion
      setShowModal(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete the comment. Please try again.');
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  // Only render the delete button if the logged-in user is the owner of the comment
  if (commentUser !== loggedInUser) {
    return null; // Do not render anything if the user is not authorized to delete the comment
  }

  // Inline styles for positioning the delete button
  const deleteButtonStyle = {
    marginLeft: 'auto', // Aligns the button to the right
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <>
      {/* Delete button triggers the modal */}
      <button
        className="btn btn-danger btn-sm"
        style={deleteButtonStyle}
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>

      {/* Modal to confirm the deletion of the comment */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your comment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'} {/* Show 'Deleting...' while the deletion is in progress */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentDelete;
