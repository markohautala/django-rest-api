import React from "react";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image6 from "../assets/image6.webp";
import image7 from "../assets/image7.webp";
import image9 from "../assets/image9.webp";
import image11 from "../assets/image11.jpg";
import image12 from "../assets/image12.jpg";
import image13 from "../assets/image13.jpg";
import image14 from "../assets/image14.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

function LandingPage() {
  const [index, setIndex] = useState(0); // State to manage the active slide in the carousel
  const navigate = useNavigate(); // Hook to navigate programmatically between routes

  // Function to handle slide selection in the carousel
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex); // Update the active slide index
  };

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      {/* Custom styles for Accordion components */}
      <style>
        {`
          .accordion {
            --bs-accordion-active-bg: #ffffff !important;
          }
        `}
      </style>

      {/* Image Carousel */}
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        {/* Individual slides in the carousel */}
        <Carousel.Item>
          <img
            src={image1}
            alt="First slide of house-image"
            className="d-block w-100"
            style={{
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image3}
            alt="Second slide of house-image"
            className="d-block w-100"
            style={{
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image4}
            alt="Third slide of house-image"
            className="d-block w-100"
            style={{
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image6}
            alt="Fourth slide of house-image"
            className="d-block w-100"
            style={{
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image7}
            alt="Fifth slide of house-image"
            className="d-block w-100"
            style={{
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image9}
            alt="Sixth slide of house-image"
            className="d-block w-100"
            style={{
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image11}
            alt="Seventh slide of house-image"
            className="d-block w-100"
            style={{
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image12}
            alt="Eighth slide of house-image"
            className="d-block w-100"
            style={{
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image13}
            alt="Ninth slide of house-image"
            className="d-block w-100"
            style={{
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image14}
            alt="Tenth slide of house-image"
            className="d-block w-100"
            style={{
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </Carousel.Item>
      </Carousel>

      {/* Accordion with information sections */}
      <Accordion
        defaultActiveKey=""
        className="mt-4"
        style={{ width: "100%", margin: "0 auto" }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Creating Your First HousePost</Accordion.Header>
          <Accordion.Body>
            When you join our community, sharing your home is easy and fun! A
            HousePost allows you to upload pictures of your home, add
            descriptions, and share your unique space with others. Whether it’s
            a cozy corner of your living room or your backyard oasis, your
            HousePost can showcase it all. After creating your post, others can
            view, comment, and give you HouseHearts, making it a great way to
            connect with fellow home enthusiasts.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Connecting with the Community</Accordion.Header>
          <Accordion.Body>
            Engage with like-minded individuals by exploring and interacting
            with the community’s HousePosts. You can browse through a variety of
            homes, leave comments, and give HouseHearts to show your
            appreciation. The community section is a vibrant place where users
            can share design ideas, home improvement tips, and inspiration.
            Every interaction helps build a stronger community, where everyone’s
            creativity and style are celebrated.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Securing Your Profile</Accordion.Header>
          <Accordion.Body>
            We prioritize your privacy and security. When you create an account,
            your data is protected with top-tier authentication methods,
            ensuring that only you have access to your profile and personal
            information. You can easily edit your profile to update your
            information or preferences. Rest assured, your activity within the
            app is secure, and we continuously work to maintain a safe
            environment for all our users.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Call to Action Cards */}
      <div className="row mt-4" style={{ width: "100%", margin: "0 auto" }}>
        <div className="col-12 col-md-6 mb-4">
          <Card style={{ height: "100%" }}>
            <Card.Header>Login</Card.Header>
            <Card.Body>
              <Card.Title>Login to your account</Card.Title>
              <Card.Text>
                Access your account by logging in with your credentials.
              </Card.Text>
              <Button
                variant="dark"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid black",
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <Card style={{ height: "100%" }}>
            <Card.Header>Create Account</Card.Header>
            <Card.Body>
              <Card.Title>Create a new account</Card.Title>
              <Card.Text>
                Don't have an account? Sign up now to create one.
              </Card.Text>
              <Button
                variant="dark"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid black",
                }}
                onClick={() => navigate("/create-account")}
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
