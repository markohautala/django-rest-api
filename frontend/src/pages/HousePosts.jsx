import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionBody,
} from "react-bootstrap";
import axios from "axios";
import styles from "../styles/Home.module.css";

import loadingSpinner from "../assets/loading.gif";
import Comments from "./Comments";
import CommentDelete from "./CommentDelete";
import DeleteHousePostButton from "./DeleteHousePostButton";
import HouseHearts from "../components/HouseHearts";

const placeholderImage =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

function HousePosts() {
  // State variables to store posts, pagination info, and loading status
  const [housePosts, setHousePosts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loggedInUser = JSON.parse(localStorage.getItem("user"))?.username;

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchHousePosts("/houseposts/");
  }, []);

  // Scroll to the top of the page when navigating between pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [nextPage, previousPage]);

  // Function to fetch house posts from the server
  const fetchHousePosts = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        const posts = response.data.results.map((post) => ({
          ...post,
          comments: [],
        }));
        setHousePosts(posts);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);

        // Set current page based on URL
        const pageMatch = url.match(/page=(\d+)/);
        setCurrentPage(pageMatch ? parseInt(pageMatch[1], 10) : 1);

        // Fetch comments for posts that have them
        posts.forEach((post) => {
          if (post.housepostcomments_count > 0) {
            fetchCommentsForPost(post.id);
          }
        });
      })
      .finally(() => {
        setIsLoading(false); // Stop loading after fetching
      })
      .catch((error) => console.error("Error fetching house posts:", error));
  };

  // Function to fetch comments for a specific post
  const fetchCommentsForPost = (postId) => {
    axios
      .get(`/housepostcomments/?housepost=${postId}`)
      .then((response) => {
        // Filter and sort comments by timestamp
        const filteredComments = response.data.results.filter(
          (comment) => comment.housepost === postId
        );
        const sortedComments = filteredComments.sort(
          (a, b) =>
            new Date(a.timestamp_created) - new Date(b.timestamp_created)
        );
        sortedComments.reverse();

        // Update the post's comments
        setHousePosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, comments: sortedComments } : post
          )
        );
      })
      .catch((error) =>
        console.error(`Error fetching comments for post ${postId}:`, error)
      );
  };

  // Function to increment the comment count of a specific post
  const incrementCommentCount = (postId) => {
    setHousePosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              housepostcomments_count: post.housepostcomments_count + 1,
            }
          : post
      )
    );
  };

  // Handlers for pagination
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

  // Style for the container and responsiveness
  const containerStyle = {
    width: "75%",
    margin: "0 auto",
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

  // Loading screen while posts are being fetched
  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <img
          src={loadingSpinner}
          alt="Loading..."
          style={{ width: "150px", height: "150px" }}
        />
      </div>
    );
  }

  // Main content of the component
  return (
    <div className="responsive-container" style={containerStyle}>
      <style>{responsiveStyles}</style>
      <h2>Houseposts Feed</h2>
      <p>Page {currentPage}</p>

      {/* Iterate over each house post and display its details */}
      {housePosts.map((post) => (
        <div
          key={post.id}
          className="card rounded-lg overflow-hidden position-relative mb-4"
        >
          <div
            style={{ width: "100%", overflow: "hidden", position: "relative" }}
          >
            <img
              src={post.house_image}
              className="card-img-top object-cover"
              alt="House Image"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            {/* Show delete button if the post belongs to the logged-in user */}
            {loggedInUser === post.user && (
              <DeleteHousePostButton
                postId={post.id}
                postUser={post.user}
                loggedInUser={loggedInUser}
                onDeleteSuccess={() => {
                  window.location.href = "/";
                }}
              />
            )}
          </div>

          {/* Display the date the post was made */}
          <div className={styles.glassmorphismDiv}>{post.date_posted}</div>

          <div className="card-body">
            {/* Display the title and description of the house post */}
            <h5 className="card-title">{post.house_title}</h5>
            <p className="card-text">{post.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              {/* Component to display and handle likes (HouseHearts) */}
              <HouseHearts
                postId={post.id}
                currentHeartCount={post.househearts_count}
                fetchHousePosts={() =>
                  fetchHousePosts("https://housegram-fullstack-app-a01c6177ffd8.herokuapp.com/houseposts/")
                }
              />
              {/* Display the username of the post's author */}
              <div className="d-flex align-items-center">
                <div>
                  <strong>User:</strong> {post.user}
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <Accordion>
              {/* Accordion to show comments on the post */}
              <AccordionItem eventKey={`${post.id}`}>
                <AccordionHeader className={styles.AccordionHeader}>
                  <span className="material-symbols-outlined">chat</span>
                  Comments ({post.housepostcomments_count})
                </AccordionHeader>
                <AccordionBody>
                  {/* If there are comments, display each one with details and delete option */}
                  {post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                      <div
                        key={index}
                        className="p-2 mb-2 bg-white rounded border d-flex align-items-center"
                      >
                        <div
                          className="d-flex align-items-center"
                          style={{ flexGrow: 1 }}
                        >
                          <img
                            src={comment.profile_image || placeholderImage}
                            className="rounded-circle me-2"
                            alt="User Avatar"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                            }} // Ensure image is not squeezed
                          />
                          <div>
                            <strong>{comment.user}</strong> {comment.comment}
                            <div className="text-muted">
                              ({comment.timestamp_created})
                            </div>
                          </div>
                        </div>
                        {/* Component to delete a comment if the user is authorized */}
                        <CommentDelete
                          commentId={comment.id}
                          commentUser={comment.user}
                          loggedInUser={loggedInUser} // Pass the actual logged-in user variable
                          fetchCommentsForPost={() =>
                            fetchCommentsForPost(post.id)
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <div>No comments yet on this housepost</div>
                  )}
                </AccordionBody>
              </AccordionItem>
            </Accordion>
            {/* Component to add a new comment to the post */}
            <Comments
              postId={post.id}
              fetchCommentsForPost={fetchCommentsForPost}
              incrementCommentCount={() => incrementCommentCount(post.id)} // Pass the function to increment the count
            />
          </div>
        </div>
      ))}

      {/* Pagination buttons to navigate between pages of posts */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn"
          onClick={handlePreviousPage}
          disabled={!previousPage}
          style={{
            backgroundColor: previousPage ? "black" : "grey",
            color: "white",
            borderColor: "transparent",
          }}
        >
          Previous
        </button>
        <button
          className="btn"
          onClick={handleNextPage}
          disabled={!nextPage}
          style={{
            backgroundColor: nextPage ? "black" : "grey",
            color: "white",
            borderColor: "transparent",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HousePosts; // Export the HousePosts component
