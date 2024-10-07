import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie'; // Library to manage cookies, used here for CSRF tokens
import styles from '../styles/Notes.module.css'; // Custom styles for the Notes component
import loadingSpinner from '../assets/loading.gif'; // Loading spinner image

const Notes = () => {
  // State hooks for managing different aspects of the Notes component
  const [notes, setNotes] = useState([]); // Stores the list of notes fetched from the backend
  const [isLoading, setIsLoading] = useState(true); // Manages loading state while fetching data
  const [errors, setErrors] = useState(null); // Stores any error messages encountered during requests
  const [showEditModal, setShowEditModal] = useState(false); // Controls visibility of the Edit Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Controls visibility of the Delete Modal
  const [showMaxNotesModal, setShowMaxNotesModal] = useState(false); // Controls visibility of the "max notes reached" modal
  const [currentNote, setCurrentNote] = useState(null); // Stores the index of the currently selected note
  const [newNote, setNewNote] = useState({ // Stores the data for the new note to be created
    title: '',
    content: '',
    url: ''
  });

  // State for the note being edited in the modal
  const [editNote, setEditNote] = useState({
    title: '',
    content: '',
    url: ''
  });

  // Fetch the notes from the backend when the component is first mounted
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/notes/', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`, // Pass the authentication token for the request
          },
        });
        setNotes(response.data.results); // Update the notes state with the data from the API
        setIsLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching notes:', error);
        setErrors('Failed to load notes.'); // Show error message if the request fails
        setIsLoading(false); // Stop loading even in case of error
      }
    };

    fetchNotes(); // Call the function to fetch notes on component mount
  }, []); // Empty dependency array ensures this runs once after the initial render

  // Updates the newNote state as the user types in the form fields
  const handleNoteChange = (event) => {
    setNewNote({
      ...newNote,
      [event.target.name]: event.target.value, // Dynamically update fields (title, content, url)
    });
  };

  // Updates the editNote state as the user modifies the fields in the Edit Modal
  const handleEditNoteChange = (event) => {
    setEditNote({
      ...editNote,
      [event.target.name]: event.target.value, // Dynamically update fields for the note being edited
    });
  };

  // Adds a new note by sending a POST request to the backend
  const addNote = async () => {
    if (notes.length >= 2) { // Limit the user to a maximum of 2 notes
      setShowMaxNotesModal(true); // Show modal if the limit is reached
    } else {
      try {
        const csrfToken = Cookies.get('csrftoken'); // Retrieve CSRF token for security
        const response = await axios.post('/notes/', newNote, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`, // Authentication token
            'X-CSRFToken': csrfToken, // Include CSRF token in request headers
          },
        });
        // Add the newly created note to the state
        setNotes([...notes, response.data]); // Append new note to existing notes
        setNewNote({ title: '', content: '', url: '' }); // Reset form fields after submission
      } catch (error) {
        console.error('Error adding note:', error);
        setErrors('Failed to create a new note.'); // Show error if the request fails
      }
    }
  };

  // Opens the Edit Modal and pre-populates the form with the selected note's details
  const handleEditNote = (index) => {
    setCurrentNote(index); // Store the index of the note being edited
    setEditNote({
      title: notes[index].title,
      content: notes[index].content, // Set the content of the note being edited
      url: notes[index].url,
    });
    setShowEditModal(true); // Show the Edit Modal
  };

  // Submits the edited note by sending a PATCH request to update the note on the backend
  const submitEditNote = async () => {
    if (currentNote === null || currentNote === undefined) { // Ensure a note is selected for editing
      console.error("No note selected for editing.");
      return; // Exit if no note is selected
    }

    // Check if there are actual changes before submitting the update
    const originalNote = notes[currentNote];
    if (
      editNote.title === originalNote.title &&
      editNote.content === originalNote.content &&
      editNote.url === originalNote.url
    ) {
      console.log("No changes detected, no need to submit.");
      setShowEditModal(false); // Close modal if no changes were made
      return;
    }

    const updatedNotes = [...notes]; // Create a copy of the current notes state
    updatedNotes[currentNote] = editNote; // Update the selected note with new data

    try {
      const csrfToken = Cookies.get('csrftoken'); // Retrieve CSRF token for security
      await axios.patch(`/notes/${notes[currentNote].id}/`, editNote, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`, // Authentication token
          'X-CSRFToken': csrfToken, // Include CSRF token
        },
      });

      setNotes(updatedNotes); // Update state with the edited note
      setShowEditModal(false); // Close the Edit Modal on success
    } catch (error) {
      console.error('Error updating note:', error);
      setErrors('Failed to update the note.'); // Display error if the update fails
    }
  };

  // Opens the Delete Modal and sets the note to be deleted
  const handleDeleteNote = (index) => {
    setCurrentNote(index); // Store the index of the note to be deleted
    setShowDeleteModal(true); // Show the Delete Modal
  };

  // Confirms and deletes the selected note by sending a DELETE request to the backend
  const confirmDeleteNote = async () => {
    const noteToDelete = notes[currentNote]; // Retrieve the selected note

    try {
      const csrfToken = Cookies.get('csrftoken'); // Retrieve CSRF token for security
      await axios.delete(`/notes/${noteToDelete.id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`, // Authentication token
          'X-CSRFToken': csrfToken, // Include CSRF token in request headers
        },
      });

      // Remove the deleted note from the state
      setNotes(notes.filter((_, index) => index !== currentNote)); // Filter out the deleted note
      setShowDeleteModal(false); // Close the Delete Modal
    } catch (error) {
      console.error('Error deleting note:', error);
      setErrors('Failed to delete the note.'); // Show error if deletion fails
    }
  };

  // Render a loading spinner if data is still being fetched
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
      {/* Section for creating a new note */}
      <h2>Notes</h2>
      <p>Here you can create notes for yourself - maybe about future houseposts. You can create a maximum of two notes.</p>

      {/* Display errors if any */}
      {errors && <Alert variant="danger">{errors}</Alert>}

      {/* Form for creating a new note */}
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
              name="content" // Update from description to content
              value={newNote.content} // Update from description to content
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
          <Button variant="dark" onClick={addNote}>Create Note</Button> {/* Trigger addNote on click */}
        </Form>
      </div>

      {/* Section for displaying the existing notes */}
      <Row className={styles.notesRow}>
        {notes.map((note, index) => (
          <Col md={6} key={index} className={styles.noteCol}>
            <div className={styles.noteCard}>
              <div className={styles.noteHeader}>
                <span className="btn btn-danger btn-sm" onClick={() => handleDeleteNote(index)}>Delete</span> {/* Trigger deletion */}
                <span
                  className={`material-symbols-outlined ${styles.gearIcon}`}
                  onClick={() => handleEditNote(index)} // Trigger edit modal
                >
                  settings
                </span>
              </div>
              <h4>{note.title}</h4>
              <p>{note.content}</p> {/* Display note content */}
              {note.url && <a href={note.url} target="_blank" rel="noopener noreferrer">Visit Link</a>} {/* Optional URL */}
            </div>
          </Col>
        ))}
      </Row>

      {/* Edit Note Modal */}
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
          <Button variant="primary" onClick={submitEditNote}>Save Changes</Button> {/* Submit edit */}
        </Modal.Footer>
      </Modal>

      {/* Delete Note Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDeleteNote}>Delete</Button> {/* Confirm deletion */}
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
