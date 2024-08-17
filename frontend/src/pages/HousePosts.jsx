import React from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import styles from '../styles/Home.module.css';

function HousePosts() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
        <h2>User is logged in and authenticated</h2>
        <p>Under here are the house posts.</p>

        <div className="card rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/600x400"
            className="card-img-top object-cover"
            alt="House Image"
            style={{ aspectRatio: '3/2', width: '100%' }}
          />
          <div className="card-body">
            <h5 className="card-title">Cozy Countryside Retreat</h5>
            <p className="card-text">
              Escape the city and enjoy the tranquility of this charming country home.
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-link p-0" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-heart"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
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
    </div>
  );
}

export default HousePosts;
