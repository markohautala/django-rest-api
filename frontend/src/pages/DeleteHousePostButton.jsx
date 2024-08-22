import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Alert } from 'react-bootstrap';

function DeleteHousePostButton({ postId, postUser, loggedInUser, onDeleteSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteSuccessMessage, setShowDeleteSuccessMessage] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    const token = localStorage.getItem('token');

    axios.delete(`http://127.0.0.1:8000/houseposts/${postId}/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
    .then(() => {
      setShowModal(false);
      setShowDeleteSuccessMessage(true);

      // Show success message for 2 seconds
      setTimeout(() => {
        setShowDeleteSuccessMessage(false);
        setIsDeleting(false);

        // Show loading spinner for 1 second before redirecting
        setTimeout(() => {
          onDeleteSuccess();
        }, 1000);
      }, 2000);
    })
    .catch(error => {
      console.error('Error deleting house post:', error);
      setIsDeleting(false);
    });
  };

  if (loggedInUser !== postUser) {
    return null;
  }

  return (
    <>
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
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>

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
