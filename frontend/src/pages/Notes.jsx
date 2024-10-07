import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie'; // For CSRF token
import styles from '../styles/Notes.module.css';
import loadingSpinner from '../assets/loading.gif'; // Your loading spinner

const Notes = () => {
  const [notes, setNotes] = useState([]); // State for fetched notes
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [errors, setErrors] = useState(null); // State to hold errors
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMaxNotesModal, setShowMaxNotesModal] = useState(false); // Modal for max notes reached
  const [currentNote, setCurrentNote] = useState(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '', // Changed from description to content
    url: ''
  });

  // New state for editing notes in the modal
  const [editNote, setEditNote] = useState({
    title: '',
    content: '',
    url: ''
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/notes/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`, // Auth token for logged-in user
          },
        });
        setNotes(response.data.results); // Set notes to the 'results' array
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching notes:', error);
        setErrors('Failed to load notes.');
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    fetchNotes(); // Fetch notes on component mount
  }, []);

  // Handle changes in the note form (main form)
  const handleNoteChange = (event) => {
    setNewNote({
      ...newNote,
      [event.target.name]: event.target.value,
    });
  };

  // Handle changes in the edit modal form
  const handleEditNoteChange = (event) => {
    setEditNote({
      ...editNote,
      [event.target.name]: event.target.value,
    });
  };

  // Add a new note and push to backend
  const addNote = async () => {
    if (notes.length >= 2) {
      setShowMaxNotesModal(true); // Show modal if the user already has 2 notes
    } else {
      try {
        const csrfToken = Cookies.get('csrftoken'); // CSRF token from cookies

        const response = await axios.post('/notes/', newNote, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'X-CSRFToken': csrfToken, // Include CSRF token
          },
        });

        // Add the newly created note to the state
        setNotes([...notes, response.data]);

        // Reset the form fields
        setNewNote({ title: '', content: '', url: '' }); // Resetting content

      } catch (error) {
        console.error('Error adding note:', error);
        setErrors('Failed to create a new note.');
      }
    }
  };

  // Open the edit modal and populate fields with the selected note
  const handleEditNote = (index) => {
    setCurrentNote(index);
    setEditNote({
      title: notes[index].title,
      content: notes[index].content, // Auto-populate with content
      url: notes[index].url
    });
    setShowEditModal(true);
  };

// Submit the edited note and push to backend
const submitEditNote = async () => {
  // Check if currentNote is valid
  if (currentNote === null || currentNote === undefined) {
    console.error("No note selected for editing.");
    return; // Exit if no note is selected for editing
  }

  // Ensure there are actual changes before submitting
  const originalNote = notes[currentNote];
  if (
    editNote.title === originalNote.title &&
    editNote.content === originalNote.content &&
    editNote.url === originalNote.url
  ) {
    console.log("No changes detected, no need to submit.");
    setShowEditModal(false); // Just close the modal if no changes
    return;
  }

  const updatedNotes = [...notes];
  updatedNotes[currentNote] = editNote;

  try {
    const csrfToken = Cookies.get('csrftoken'); // CSRF token from cookies

    // Make PATCH request to update the note
    await axios.patch(`/notes/${notes[currentNote].id}/`, editNote, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'X-CSRFToken': csrfToken, // Include CSRF token
      },
    });

    setNotes(updatedNotes);  // Update notes state with new data
    setShowEditModal(false);  // Close the modal after success

    // Clear the main form after saving changes
    setNewNote({ title: '', content: '', url: '' });
  } catch (error) {
    console.error('Error updating note:', error);
    setErrors('Failed to update the note.');
  }
};


  // Open delete modal to confirm deletion
  const handleDeleteNote = (index) => {
    setCurrentNote(index);
    setShowDeleteModal(true);
  };

  // Confirm the deletion of the selected note and push to backend
  const confirmDeleteNote = async () => {
    const noteToDelete = notes[currentNote];

    try {
      const csrfToken = Cookies.get('csrftoken'); // CSRF token from cookies
      await axios.delete(`/notes/${noteToDelete.id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'X-CSRFToken': csrfToken, // Include CSRF token
        },
      });

      // Remove the note from the state
      setNotes(notes.filter((_, index) => index !== currentNote));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting note:', error);
      setErrors('Failed to delete the note.');
    }
  };

  // Render loading spinner while fetching notes
  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}>
        <img src={loadingSpinner} alt="Loading..." style={{ width: '75px', height: '75px' }} />
      </div>
    );
  }

  return (
    <div className={styles.notesContainer}>
      {/* Notes creation section */}
      <h2>Notes</h2>
      <p>Here you can create notes for yourself - maybe about future houseposts. You can create a maximum of two notes.</p>

      {errors && <Alert variant="danger">{errors}</Alert>} {/* Display any errors */}

      <div className={styles.noteCreationBox}>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newNote.title}
              onChange={handleNoteChange}
              placeholder="Enter title"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="content" // Change from description to content
              value={newNote.content} // Change from description to content
              onChange={handleNoteChange}
              placeholder="Write a description"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>URL (Optional)</Form.Label>
            <Form.Control
              type="url"
              name="url"
              value={newNote.url}
              onChange={handleNoteChange}
              placeholder="Enter a URL"
            />
          </Form.Group>
          <Button variant="dark" onClick={addNote}>Create Note</Button>
        </Form>
      </div>

      {/* Display Notes */}
      <Row className={styles.notesRow}>
        {notes.map((note, index) => (
          <Col md={6} key={index} className={styles.noteCol}>
            <div className={styles.noteCard}>
              <div className={styles.noteHeader}>
                <span className="btn btn-danger btn-sm" onClick={() => handleDeleteNote(index)}>Delete</span>
                <span
                  className={`material-symbols-outlined ${styles.gearIcon}`}
                  onClick={() => handleEditNote(index)}
                >
                  settings
                </span>
              </div>
              <h4>{note.title}</h4>
              <p>{note.content}</p> {/* Change from description to content */}
              {note.url && <a href={note.url} target="_blank" rel="noopener noreferrer">Visit Link</a>}
            </div>
          </Col>
        ))}
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={editNote.title}
                onChange={handleEditNoteChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={editNote.content}
                onChange={handleEditNoteChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={editNote.url}
                onChange={handleEditNoteChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={submitEditNote}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDeleteNote}>Delete</Button>
        </Modal.Footer>
      </Modal>

      {/* Max Notes Modal */}
      <Modal show={showMaxNotesModal} onHide={() => setShowMaxNotesModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Note Limit Reached</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have reached the maximum limit of 2 notes. Please delete an existing note to create a new one.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMaxNotesModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Notes;
