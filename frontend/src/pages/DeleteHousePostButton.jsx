import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function DeleteHousePostButton({ postId, postUser, loggedInUser, onDeleteSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    axios.delete(`http://127.0.0.1:8000/houseposts/${postId}/`)
      .then(() => {
        setShowModal(false);
        onDeleteSuccess();
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
          borderRadius: '8px', // Less rounded corners
          width: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          textDecoration: 'none', // Remove underline
          marginRight: '10px', // Add space on the left
          marginTop: '10px', // Add space on the top
          float: 'right', // Ensure the button stays to the right
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
    </>
  );
}

export default DeleteHousePostButton;
