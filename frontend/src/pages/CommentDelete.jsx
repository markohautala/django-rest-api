import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function CommentDelete({ commentId, commentUser, loggedInUser, fetchCommentsForPost }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const deleteUrl = `http://127.0.0.1:8000/housepostcomments/${commentId}/`;
      await axios.delete(deleteUrl, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      fetchCommentsForPost(); // Refresh comments after deletion
      setShowModal(false); // Close the modal after successful deletion
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete the comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Only render the delete button if the logged-in user matches the comment user
  if (commentUser !== loggedInUser) {
    return null; // Don't render the delete button
  }

  // Inline styles for positioning the delete button
  const deleteButtonStyle = {
    marginLeft: 'auto', // Pushes the button to the right
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <>
      <button
        className="btn btn-danger btn-sm"
        style={deleteButtonStyle}
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>

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
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentDelete;
