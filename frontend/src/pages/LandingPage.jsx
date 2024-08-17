import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/image1.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image6 from '../assets/image6.webp';
import image7 from '../assets/image7.webp';
import image9 from '../assets/image9.webp';
import image11 from '../assets/image11.jpg';
import image12 from '../assets/image12.jpg';
import image13 from '../assets/image13.jpg';
import image14 from '../assets/image14.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

function LandingPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    console.log("Cleared local storage and session storage");
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        style={{ height: '500px', width: '100%', borderRadius: '15px', overflow: 'hidden' }}
      >
        <Carousel.Item>
          <img src={image1} alt="First slide of house-image" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image3} alt="Second slide of house-image" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image4} alt="Third slide of house-image" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image6} alt="Fourth slide of house-image" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image7} alt="Fifth slide of house-image" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image9} alt="Sixth slide of house-image" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image11} alt="Seventh slide of house-image" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image12} alt="Eighth slide of house-image" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image13} alt="Ninth slide of house-image" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image14} alt="Tenth slide of house-image" className="d-block w-100" style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} />
        </Carousel.Item>
      </Carousel>

      <Accordion defaultActiveKey="" className="mt-4" style={{ width: '100%', margin: '0 auto' }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Accordion Item #3</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="row mt-4" style={{ width: '100%', margin: '0 auto' }}>
        <div className="col-12 col-md-6 mb-4">
          <Card style={{ height: '100%' }}>
            <Card.Header>Login</Card.Header>
            <Card.Body>
              <Card.Title>Login to your account</Card.Title>
              <Card.Text>
                Access your account by logging in with your credentials.
              </Card.Text>
              <Button
                variant="dark"
                style={{ backgroundColor: "black", color: "white", border: "1px solid black" }}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <Card style={{ height: '100%' }}>
            <Card.Header>Create Account</Card.Header>
            <Card.Body>
              <Card.Title>Create a new account</Card.Title>
              <Card.Text>
                Don't have an account? Sign up now to create one.
              </Card.Text>
              <Button
                variant="dark"
                style={{ backgroundColor: "black", color: "white", border: "1px solid black" }}
                onClick={() => navigate('/create-account')}
              >
                Sign Up
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
