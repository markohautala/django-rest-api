// src/pages/Upload.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Image, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';

function Upload() {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    image: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    image: '',
  });

  const { title, description, image } = postData;
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (image) {
        URL.revokeObjectURL(image);
      }

      setPostData({
        ...postData,
        image: file,
      });

      setErrors({
        ...errors,
        image: '',
      });
    }
  };

  const handleRemoveImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    setPostData({
      ...postData,
      image: '',
    });

    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      title: '',
      description: '',
      image: '',
    };

    if (!title) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!description) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!image) {
      newErrors.image = 'Image is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append('house_title', title);
      formData.append('description', description);
      formData.append('house_image', image);

      try {
        const response = await axiosReq.post('/houseposts/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Form submission successful:', response.data);
        navigate('/');
      } catch (error) {
        console.error('Error submitting form:', error.response?.data || error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...error.response?.data,
        }));
      }
    }
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <Container className="mt-5">
      <div className="card p-4" style={{ borderRadius: '10px' }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={4} className="d-flex flex-column align-items-center mb-4 mb-md-0">
              <Form.Group className="text-center">
                {image ? (
                  <>
                    <figure onClick={() => document.getElementById('image-upload').click()} style={{ cursor: 'pointer' }}>
                      <Image
                        src={URL.createObjectURL(image)}
                        rounded
                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
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
                      height: '200px',
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
                  onChange={handleChangeImage}
                  style={{ display: 'none' }}
                />
                {errors.image && <Form.Text className="text-danger">{errors.image}</Form.Text>}
              </Form.Group>
            </Col>

            <Col xs={12} md={8}>
              <Form.Group>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  placeholder="Enter a title"
                  required
                  autoComplete="off"
                />
                {errors.title && <Form.Text className="text-danger">{errors.title}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  placeholder="Write a description"
                  required
                  autoComplete="off"
                />
                {errors.description && <Form.Text className="text-danger">{errors.description}</Form.Text>}
              </Form.Group>

              <Button variant="dark" type="submit">
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
