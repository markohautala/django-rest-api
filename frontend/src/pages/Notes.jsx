import React, { useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import styles from '../styles/Notes.module.css';

const Notes = () => {
  const [notes, setNotes] = useState([]); // State for notes
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMaxNotesModal, setShowMaxNotesModal] = useState(false); // Modal for max notes reached
  const [currentNote, setCurrentNote] = useState(null);
  const [newNote, setNewNote] = useState({
    title: '',
    description: '',
    url: ''
  });

  // Handle changes in the note form
  const handleNoteChange = (event) => {
    setNewNote({
      ...newNote,
      [event.target.name]: event.target.value,
    });
  };

  // Add a new note
  const addNote = () => {
    if (notes.length >= 2) {
      setShowMaxNotesModal(true); // Show modal if the user already has 2 notes
    } else {
      setNotes([...notes, newNote]);
      setNewNote({ title: '', description: '', url: '' });
    }
  };

  // Open the edit modal and populate fields with the selected note
  const handleEditNote = (index) => {
    setCurrentNote(index);
    setNewNote(notes[index]); // Auto-populate the form fields with the current note's data
    setShowEditModal(true);
  };

  // Open delete modal to confirm deletion
  const handleDeleteNote = (index) => {
    setCurrentNote(index);
    setShowDeleteModal(true);
  };

  // Submit the edited note
  const submitEditNote = () => {
    const updatedNotes = [...notes];
    updatedNotes[currentNote] = newNote;
    setNotes(updatedNotes);
    setShowEditModal(false);
  };

  // Confirm the deletion of the selected note
  const confirmDeleteNote = () => {
    setNotes(notes.filter((_, index) => index !== currentNote));
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.notesContainer}>
      {/* Notes creation section */}
      <h2>Notes</h2>
      <p>Here you can create notes for yourself - maybe about future houseposts. You can create a maximum of two notes.</p>

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
              name="description"
              value={newNote.description}
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
              <p>{note.description}</p>
              {note.url && <a href={note.url} target="_blank" rel="noopener noreferrer">Visit Link</a>}
            </div>
          </Col>
        ))}
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>Edit Note</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newNote.title}
                onChange={handleNoteChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newNote.description}
                onChange={handleNoteChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={newNote.url}
                onChange={handleNoteChange}
              />
            </Form.Group>
            <Button variant="dark" onClick={submitEditNote}>Submit Changes</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>Delete Note</Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this note?
          <div className={styles.modalActions}>
            <Button variant="danger" onClick={confirmDeleteNote}>Delete</Button>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Max Notes Modal */}
      <Modal show={showMaxNotesModal} onHide={() => setShowMaxNotesModal(false)}>
        <Modal.Header closeButton>Note Limit Reached</Modal.Header>
        <Modal.Body>
          You already have two notes created. To create a new one, please delete an existing note or edit one of them.
          <div className={styles.modalActions}>
            <Button variant="dark" onClick={() => setShowMaxNotesModal(false)}>I Understand</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Notes;
