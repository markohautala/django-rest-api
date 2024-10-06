import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Button, Image, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../assets/loading.gif'; // Path to loading gif
import styles from '../styles/SignInUpForm.module.css'; // Path to custom styles

function Upload() {
  // State management
  const [postData, setPostData] = useState({
    house_title: '',
    description: '',
    house_image: null,
  });

  const { house_title, description, house_image } = postData; // Destructure post data state
  const [errors, setErrors] = useState({}); // State to manage form errors
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [success, setSuccess] = useState(false); // State to manage success message visibility
  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes for text fields
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image file changes
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Revoke previous object URL to avoid memory leaks
      if (house_image) {
        URL.revokeObjectURL(house_image);
      }

      setPostData({
        ...postData,
        house_image: file,
      });

      setErrors({
        ...errors,
        house_image: '',
      });
    }
  };

  // Handle removing the selected image
  const handleRemoveImage = () => {
    if (house_image) {
      URL.revokeObjectURL(house_image);
    }
    setPostData({
      ...postData,
      house_image: null,
    });

    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      fileInput.value = ''; // Clear the file input
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true
    setErrors({});

    const formData = new FormData();
    formData.append('house_title', house_title);
    formData.append('description', description);
    if (house_image) {
      formData.append('house_image', house_image);
    }

    const csrfToken = Cookies.get('csrftoken'); // Get CSRF token from cookies
    const authToken = localStorage.getItem('token'); // Get the auth token from local storage



    try {
      await axios.post('/houseposts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
          'Authorization': `Token ${authToken}`, // Auth token for user authentication


        },
      });
      setSuccess(true); // Show success message
      setTimeout(() => {
        setSuccess(false); // Hide success message after 3 seconds
        navigate('/'); // Redirect to homepage after successful upload
      }, 3000);
    } catch (err) {
      setErrors(err.response?.data || { non_field_errors: ["Something went wrong, please try again."] });
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Cleanup image URL on component unmount
  useEffect(() => {
    return () => {
      if (house_image) {
        URL.revokeObjectURL(house_image);
      }
    };
  }, [house_image]);

  return (
    <Container className="mt-5">
      {/* Loading spinner */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <img src={loadingGif} alt="Loading..." className={styles.loadingSpinner} />
        </div>
      )}
      {/* Success messages for different screen sizes */}
      {success && (
        <Alert
          variant="success"
          style={{
            position: 'fixed',
            right: '20px',
            top: '80px',
            zIndex: 1000,
            width: 'auto',
            maxWidth: '300px',
            marginRight: '20px',
          }}
          className="d-none d-lg-block"
        >
          HousePost successfully created
        </Alert>
      )}
      {success && (
        <Alert
          variant="success"
          style={{
            position: 'fixed',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            width: 'auto',
            maxWidth: '300px',
          }}
          className="d-lg-none"
        >
          HousePost successfully created
        </Alert>
      )}
      {/* Form for creating a HousePost */}
      <div className="card p-4" style={{ borderRadius: '10px' }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={12} lg={4} className="d-flex flex-column align-items-center mb-4">
              <Form.Group className="text-center">
                {/* Image preview or upload button */}
                {house_image ? (
                  <>
                    <figure onClick={() => document.getElementById('image-upload').click()} style={{ cursor: 'pointer' }}>
                      <Image
                        src={URL.createObjectURL(house_image)}
                        rounded
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                      />
                    </figure>
                    <div className="d-flex flex-column align-items-center">
                      <Button
                        variant="outline-primary"
                        className="mt-2"
                        onClick={() => document.getElementById('image-upload').click()}
                      >
                        Change the image
                      </Button>
                      <Button
                        variant="outline-danger"
                        className="mt-2"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </Button>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex flex-column align-items-center"
                    htmlFor="image-upload"
                    style={{
                      width: '100%',
                      height: '400px',
                      border: '2px dashed #ccc',
                      borderRadius: '10px',
                      backgroundColor: '#f8f9fa',
                      justifyContent: 'center',
                      display: 'flex',
                      cursor: 'pointer',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#6c757d' }}>
                      add_photo_alternate
                    </span>
                    <p className="mt-2 text-center" style={{ color: '#6c757d' }}>
                      Click or tap to upload image of your dream house
                    </p>
                  </Form.Label>
                )}
                {/* Hidden file input for image upload */}
                <Form.Control
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                {/* Error message for image upload */}
                {errors.house_image && <Form.Text className="text-danger">{errors.house_image}</Form.Text>}
              </Form.Group>
            </Col>

            <Col xs={12} md={12} lg={8}>
              <Form.Group>
                <Form.Label htmlFor="house_title">Title</Form.Label>
                <Form.Control
                  type="text"
                  id="house_title"
                  name="house_title"
                  value={house_title}
                  onChange={handleChange}
                  placeholder="Enter a title"
                  required
                  autoComplete="off"
                  style={{ fontSize: '1.25rem', padding: '10px' }}
                />
                {/* Error message for title */}
                {errors.house_title && <Form.Text className="text-danger">{errors.house_title}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  placeholder="Write a description"
                  required
                  autoComplete="off"
                  style={{ fontSize: '1.25rem', padding: '10px' }}
                />
                {/* Error message for description */}
                {errors.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
              </Form.Group>

              <Button variant="dark" type="submit" style={{ fontSize: '1.25rem', padding: '10px 20px' }}>
                Add Housepost
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
}

export default Upload;
