import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Button, Image, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../assets/loading.gif'; // Updated path
import styles from '../styles/SignInUpForm.module.css'; // Updated path

function Upload() {
  const [postData, setPostData] = useState({
    house_title: '',
    description: '',
    house_image: null,
  });

  const { house_title, description, house_image } = postData;
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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
      fileInput.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append('house_title', house_title);
    formData.append('description', description);
    if (house_image) {
      formData.append('house_image', house_image);
    }

    const csrfToken = Cookies.get('csrftoken');

    try {
      await axios.post('http://localhost:8000/houseposts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
        },
      });
      navigate('/'); // Redirect to homepage after successful upload
    } catch (err) {
      setErrors(err.response?.data || { non_field_errors: ["Something went wrong, please try again."] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (house_image) {
        URL.revokeObjectURL(house_image);
      }
    };
  }, [house_image]);

  return (
    <Container className="mt-5">
      {loading && (
        <div className={styles.loadingOverlay}>
          <img src={loadingGif} alt="Loading..." className={styles.loadingSpinner} />
        </div>
      )}
      <div className="card p-4" style={{ borderRadius: '10px' }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={4} className="d-flex flex-column align-items-center mb-4 mb-md-0">
              <Form.Group className="text-center">
                {house_image ? (
                  <>
                    <figure onClick={() => document.getElementById('image-upload').click()} style={{ cursor: 'pointer' }}>
                      <Image
                        src={URL.createObjectURL(house_image)}
                        rounded
                        style={{ width: '100%', height: '400px', objectFit: 'cover' }} // Increased height
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
                      height: '400px', // Increased height
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
                      Click or tap to upload image of dream house
                    </p>
                  </Form.Label>
                )}
                <Form.Control
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                {errors.house_image && <Form.Text className="text-danger">{errors.house_image}</Form.Text>}
              </Form.Group>
            </Col>

            <Col xs={12} md={8}>
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
                  style={{ fontSize: '1.25rem', padding: '10px' }} // Increased font size and padding
                />
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
                  style={{ fontSize: '1.25rem', padding: '10px' }} // Increased font size and padding
                />
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
