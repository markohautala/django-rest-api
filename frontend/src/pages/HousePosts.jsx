import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'react-bootstrap';
import axios from 'axios';
import styles from '../styles/Home.module.css';

import heartNotLiked from '../assets/househeart-not-liked.png';
import heartLiked from '../assets/househeart-liked.png';
import loadingSpinner from '../assets/loading.gif';
import Comments from './Comments';
import CommentDelete from './CommentDelete';

const placeholderImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

function HousePosts() {
  const [housePosts, setHousePosts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchHousePosts('http://127.0.0.1:8000/houseposts/');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [nextPage, previousPage]);

  const fetchHousePosts = (url) => {
    setIsLoading(true);
    axios.get(url)
      .then(response => {
        const posts = response.data.results.map(post => ({ ...post, comments: [] }));
        setHousePosts(posts);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);

        const pageMatch = url.match(/page=(\d+)/);
        setCurrentPage(pageMatch ? parseInt(pageMatch[1], 10) : 1);

        posts.forEach(post => {
          if (post.housepostcomments_count > 0) {
            fetchCommentsForPost(post.id);
          }
        });
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching house posts:', error));
  };

  const fetchCommentsForPost = (postId) => {
    axios.get(`http://127.0.0.1:8000/housepostcomments/?housepost=${postId}`)
      .then(response => {
        // Ensure that the response data only includes comments with the matching housepost ID
        const filteredComments = response.data.results.filter(comment => comment.housepost === postId);

        // Sort the comments by their timestamp, oldest first (ascending order)
        const sortedComments = filteredComments.sort((a, b) => new Date(a.timestamp_created) - new Date(b.timestamp_created));

        // Reverse the sorted comments to ensure oldest at the top
        sortedComments.reverse();

        setHousePosts(prevPosts => prevPosts.map(post =>
          post.id === postId ? { ...post, comments: sortedComments } : post
        ));
      })
      .catch(error => console.error(`Error fetching comments for post ${postId}:`, error));
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchHousePosts(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (previousPage) {
      fetchHousePosts(previousPage);
    }
  };

  const containerStyle = {
    width: '75%',
    margin: '0 auto',
  };

  const responsiveStyles = `
    @media (max-width: 1199px) {
      .responsive-container {
        width: 85% !important;
      }
    }
    @media (max-width: 767px) {
      .responsive-container {
        width: 95% !important;
      }
    }
  `;

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
        <img src={loadingSpinner} alt="Loading..." style={{ width: '150px', height: '150px' }} />
      </div>
    );
  }

  return (
    <div className="responsive-container" style={containerStyle}>
      <style>{responsiveStyles}</style>
      <h2>Houseposts Feed</h2>
      <p>Page {currentPage}</p>

      {housePosts.map((post) => (
        <div key={post.id} className="card rounded-lg overflow-hidden position-relative mb-4">
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <img
              src={post.house_image}
              className="card-img-top object-cover"
              alt="House Image"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          <div className={styles.glassmorphismDiv}>
            {post.date_posted}
          </div>

          <div className="card-body">
            <h5 className="card-title">{post.house_title}</h5>
            <p className="card-text">{post.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-link p-0" type="button" onClick={toggleLike}>
                <img
                  src={isLiked ? heartLiked : heartNotLiked}
                  alt="Like Button"
                  style={{ width: '28.8px', height: '28.8px' }}
                />
              </button>
              <div className="d-flex align-items-center">
                <div><strong>User:</strong> {post.user}</div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <Accordion>
              <AccordionItem eventKey={`${post.id}`}>
                <AccordionHeader className={styles.AccordionHeader}>
                  <span className="material-symbols-outlined">chat</span>
                  Comments ({post.housepostcomments_count})
                </AccordionHeader>
                <AccordionBody>
                  {post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                      <div key={index} className="p-2 mb-2 bg-white rounded border d-flex align-items-center">
                        <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                          <img
                            src={comment.profile_image || placeholderImage}
                            className="rounded-circle me-2"
                            alt="User Avatar"
                            style={{ width: '40px', height: '40px' }}
                          />
                          <div>
                            <strong>{comment.user}</strong> {comment.comment}
                            <div className="text-muted">
                              ({comment.timestamp_created})
                            </div>
                          </div>
                        </div>
                        <CommentDelete
                          commentId={comment.id}
                          commentUser={comment.user} // Pass the comment user
                          loggedInUser={'Marko222'} // Pass the logged-in user (replace with actual logged-in user variable)
                          fetchCommentsForPost={() => fetchCommentsForPost(post.id)}
                        />
                      </div>
                    ))
                  ) : (
                    <div>No comments yet on this housepost</div>
                  )}
                </AccordionBody>
              </AccordionItem>
            </Accordion>
            <Comments postId={post.id} fetchCommentsForPost={fetchCommentsForPost} />
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn"
          onClick={handlePreviousPage}
          disabled={!previousPage}
          style={{
            backgroundColor: previousPage ? 'black' : 'grey',
            color: 'white',
            borderColor: 'transparent',
          }}
        >
          Previous
        </button>
        <button
          className="btn"
          onClick={handleNextPage}
          disabled={!nextPage}
          style={{
            backgroundColor: nextPage ? 'black' : 'grey',
            color: 'white',
            borderColor: 'transparent',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HousePosts;
