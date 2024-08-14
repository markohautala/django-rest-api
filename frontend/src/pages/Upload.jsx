import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [postData, setPostData] = useState({
    house_title: '',
    description: '',
    house_image: null,
  });

  const { house_title, description, house_image } = postData;
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      setPostData({
        ...postData,
        house_image: event.target.files[0],
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    }
  };

  return (
    <Row>
      <Col md={6} className="mx-auto">
        <Container className="p-4">
          <h1>Upload a New House Post</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="house_title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="house_title"
                value={house_title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {errors.house_title?.map((message, idx) => (
              <div key={idx} className="text-danger">
                {message}
              </div>
            ))}
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.description?.map((message, idx) => (
              <div key={idx} className="text-danger">
                {message}
              </div>
            ))}
            <Form.Group controlId="house_image">
              <Form.Label>House Image</Form.Label>
              <Form.Control
                type="file"
                name="house_image"
                onChange={handleImageChange}
                required
              />
            </Form.Group>
            {errors.house_image?.map((message, idx) => (
              <div key={idx} className="text-danger">
                {message}
              </div>
            ))}
            <Button className="mt-3" type="submit">
              Upload
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
}

export default Upload;
