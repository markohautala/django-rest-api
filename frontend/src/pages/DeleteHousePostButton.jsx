import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Alert } from 'react-bootstrap';

function DeleteHousePostButton({ postId, postUser, loggedInUser, onDeleteSuccess }) {
  // State management
  const [showModal, setShowModal] = useState(false); // Controls the visibility of the confirmation modal
  const [isDeleting, setIsDeleting] = useState(false); // Tracks whether the deletion is in progress
  const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] = useState(false); // Controls the visibility of the success message

  // Function to handle the deletion of the house post
  const handleDelete = () => {
    setIsDeleting(true); // Start the loading state

    const token = localStorage.getItem('token'); // Get the authentication token from local storage

    // Send a DELETE request to the server to delete the house post
    axios.delete(`/houseposts/${postId}/`, {
      headers: {
        'Authorization': `Token ${token}`, // Include the token in the request headers
      },
    })
    .then(() => {
      setShowModal(false); // Close the modal after successful deletion
      setShowDeleteSuccessMessage(true); // Show the success message

      // Show the success message for 2 seconds, then trigger the onDeleteSuccess callback
      setTimeout(() => {
        setShowDeleteSuccessMessage(false); // Hide the success message
        setIsDeleting(false); // Reset the loading state

        // Show loading spinner for 1 second before redirecting or performing the success action
        setTimeout(() => {
          onDeleteSuccess(); // Call the success callback function to perform further actions
        }, 1000);
      }, 2000);
    })
    .catch(error => {
      console.error('Error deleting house post:', error); // Log any errors during deletion
      setIsDeleting(false); // Reset the loading state in case of an error
    });
  };

  // Only render the delete button if the logged-in user is the owner of the post
  if (loggedInUser !== postUser) {
    return null; // Do not render anything if the user is not authorized to delete the post
  }

  return (
    <>
      {/* Delete button triggers the modal */}
      <button
        className="btn btn-link p-0"
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: 'black',
          color: 'white',
          borderRadius: '8px',
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          textDecoration: 'none',
          marginRight: '10px',
          marginTop: '10px',
          float: 'right',
        }}
      >
        <span className="material-symbols-outlined">delete</span>
      </button>

      {/* Modal to confirm the deletion of the house post */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you wish to delete this housepost? Once clicked, the deletion is irreversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'} {/* Show 'Deleting...' while the action is in progress */}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success message shown after successful deletion */}
      {showDeleteSuccessMessage && (
        <Alert variant="success" style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          zIndex: 1000,
          width: '250px',
          textAlign: 'center',
          padding: '10px',
        }}>
          HousePost deleted successfully
        </Alert>
      )}
    </>
  );
}

export default DeleteHousePostButton;
