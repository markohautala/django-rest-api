import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import styles from '../styles/Home.module.css';

import heartNotLiked from '../assets/househeart-not-liked.png';
import heartLiked from '../assets/househeart-liked.png';

function HousePosts() {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const containerStyle = {
    width: '75%', // Default for larger screens
    margin: '0 auto',
  };

  const responsiveStyles = `
    @media (max-width: 1199px) { /* Medium screens */
      .responsive-container {
        width: 85% !important;
      }
    }
    @media (max-width: 767px) { /* Small screens */
      .responsive-container {
        width: 95% !important;
      }
    }
  `;

  return (
    <div className="responsive-container" style={containerStyle}>
      {/* Inject the media query styles */}
      <style>{responsiveStyles}</style>

      <h2>User is logged in and authenticated</h2>
      <p>Under here are the house posts.</p>

      <div className="card rounded-lg overflow-hidden position-relative">
        {/* Main Image */}
        <img
          src="https://via.placeholder.com/600x400"
          className="card-img-top object-cover"
          alt="House Image"
          style={{ aspectRatio: '3/2', width: '100%' }}
        />

        {/* Glassmorphism Div */}
        <div className={styles.glassmorphismDiv}>
          17 Aug 2024
        </div>

        <div className="card-body">
          <h5 className="card-title">Cozy Countryside Retreat</h5>
          <p className="card-text">
            Escape the city and enjoy the tranquility of this charming country home.
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-link p-0" type="button" onClick={toggleLike}>
              <img
                src={isLiked ? heartLiked : heartNotLiked}
                alt="Like Button"
                style={{ width: '24px', height: '24px' }}
              />
            </button>
            <div className="d-flex align-items-center">
              <img
                src="https://via.placeholder.com/40"
                className="rounded-circle me-2"
                alt="User Avatar"
              />
              <div>John Doe</div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <Accordion>
            <AccordionItem eventKey="0">
              <AccordionHeader className={styles.AccordionHeader}>
                <span className="material-symbols-outlined">chat</span>
                Comments
              </AccordionHeader>
              <AccordionBody>
                <div className="p-2 mb-2 bg-white rounded border">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://via.placeholder.com/40"
                      className="rounded-circle me-2"
                      alt="User Avatar"
                    />
                    <div>
                      <strong>Jane Smith</strong> Wow, this house looks amazing! I'd love to stay here.
                    </div>
                  </div>
                </div>
                <div className="p-2 mb-2 bg-white rounded border">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://via.placeholder.com/40"
                      className="rounded-circle me-2"
                      alt="User Avatar"
                    />
                    <div>
                      <strong>Michael Johnson</strong> I agree, the design and location are perfect!
                    </div>
                  </div>
                </div>
                <div className="p-2 mb-2 bg-white rounded border">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://via.placeholder.com/40"
                      className="rounded-circle me-2"
                      alt="User Avatar"
                    />
                    <div>
                      <strong>Emily Davis</strong> I'm definitely going to check this place out for my next trip!
                    </div>
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add a comment..."
              aria-label="Add a comment"
            />
            <button className={`btn ${styles.SubmitButton}`} type="button">
              Comment
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HousePosts;
