# HOUSEGRAM

<p align="center">
  <img src="frontend\src\assets\housegram.png" alt="housegram" width="600">
</p>

#### Housegram is a unique social media app designed for dream house enthusiasts. Users can log in to share images of their dream homes, explore other users' posts, and engage with the community by giving "Househearts" and leaving comments on their favorite houses. Whether you're looking for inspiration or just want to showcase your ideal living space, Housegram is the perfect platform to connect with like-minded individuals and celebrate the art of home and house-design.


Backend and integrated frontend repository: https://github.com/markohautala/django-rest-api

Deployed URL:
https://housegram-fullstack-app-a01c6177ffd8.herokuapp.com/


## How to Use the Application

- As a user, you can visit the deployed URL and create a new account or log in with an existing one. To create an account, navigate to the "Create Account" page by clicking on the "Create Account" link in the navigation bar. You will be redirected to a form where you can enter your desired username and create a password. You will be prompted to re-enter the password to ensure they match. If the account creation is successful, you will be redirected to the login page where you can now log in. Upon successful login, you will be redirected to the homepage, where you can see other users' posts.

- To create your own house post and share your dream home, navigate to the "Upload" page using the navigation bar. On the upload page, you can add an image of your home (maximum size of 4MB), a short title, and a description. Once you are satisfied with your post, click the "Submit" button. Upon success, you will be redirected to the homepage where your newly created house post will be visible.

- On the homepage, you can view other users' house posts, give them likes or "Househearts," and add kind and thoughtful comments. You can also read and view other users' comments. To delete your comment, hover over it and click on the delete button. This will permanently delete the comment.

- You have your own profile that you can navigate to by clicking on "Profile" in the navigation bar. On the profile page, you can see a placeholder image (until you upload your own), your username, and your bio. You can edit these by clicking on the corresponding buttons and saving your changes. You can also upload your own avatar image.

<hr>

## Project goals
- I created this application with the goal of providing a platform for house enthusiasts to share their dream homes and connect with others who have similar interests. The app allows users to post pictures, descriptions, and interact with each other's content, helping to build a vibrant community of home lovers.

<hr>

### **Security**

This app includes several safety measures on both the frontend (what the user sees) and the backend (how the app works behind the scenes) to protect user data and keep the app secure.

---

#### **Frontend Security Measures**

1. **Protection Against CSRF Attacks**:
   - **CSRF Tokens**: The frontend uses special tokens (CSRF tokens) in requests to make sure that actions are being made by the right person and not by someone else trying to trick the system.

2. **Login and Access Control**:
   - **Token-Based Login**: When users log in, they receive a token (like a pass) that is saved in the browser. This token is used to make sure they are allowed to do certain things in the app.
   - **Protected Pages**: Some pages, like the profile or upload page, can only be accessed if the user is logged in. This keeps private information safe.

3. **Form Safety**:
   - **Form Checks**: Before sending any information (like login details), the frontend checks if everything is filled out correctly. This helps catch mistakes early and prevents bad data from being sent.

4. **Handling Errors**:
   - **Safe Error Messages**: If something goes wrong, the app shows simple error messages that don’t give away any sensitive details about the app.

5. **Managing User Sessions**:
   - **Session Timeout**: The app keeps track of how long a user has been logged in. If the user has been inactive for a while, they will be logged out automatically for safety.
   - **Clearing Data on Logout**: When a user logs out, the app makes sure to clear any stored information from the browser to keep their data safe.

---

#### **Backend Security Measures**

1. **Protection Against CSRF Attacks**:
   - **CSRF Middleware**: The backend also uses CSRF tokens to check that actions are coming from the right user and not someone trying to trick the system.

2. **Login and Access Control**:
   - **JWT Authentication**: The app uses a system called JWT (JSON Web Tokens) to manage user logins securely. These tokens are stored in a way that makes them hard to steal.
   - **Custom Permissions**: The app has rules to make sure that only the owner of certain content (like a post) can change it, while others can only view it.

3. **Data Safety**:
   - **Model Validation**: The app checks that certain actions, like liking a post, follow the rules (for example, a user can’t like the same post twice).
   - **Serializer Validation**: The backend checks that the data it receives is correct, such as making sure uploaded images aren’t too large.

4. **Password Security**:
   - **Strong Passwords**: When users create accounts, the app checks that their passwords are strong enough to be safe.
   - **Password Hashing**: User passwords are stored in a safe way so that even if someone gets into the database, they can’t easily read the passwords.

5. **Managing User Sessions**:
   - **Secure Cookies**: The app uses secure settings for cookies (which store user tokens) to protect against attacks.
   - **Clearing Cookies on Logout**: When users log out, the app clears these tokens to prevent unauthorized access later.

6. **Error Handling and Logging**:
   - **Safe Error Handling**: The backend carefully handles errors to make sure no sensitive information is leaked.

7. **User Profiles**:
   - **Automatic Profile Creation**: When a new user signs up, the app automatically creates a profile for them, making sure every user has a profile to manage.

---

These security measures help keep the app safe and make sure that user data is protected.

<hr>

### Database Models

<p align="center">
  <img src="frontend\src\assets\readme-images\database-model-diagram.png" alt="database models relationships" width="400">
</p>


The HousePost application includes several key database models that define the structure and relationships of the data. Below is an overview of each model and how they are connected.

#### 1. UserProfile

**Purpose**:
The UserProfile model stores additional information about users that extends the default Django User model.

**Fields**:
- user: A one-to-one relationship with Django's built-in User model.
- date_created: The date and time when the profile was created.
- date_updated: The date and time when the profile was last updated.
- display_name: A custom name that the user can display.
- bio: A short biography or description written by the user.
- profile_picture: A profile picture uploaded by the user, managed by Cloudinary.

**Relationships**:
- The UserProfile model is directly linked to the User model via a one-to-one relationship. Each user has one profile.

#### 2. HousePost

**Purpose**:
The HousePost model represents posts created by users about houses. These posts include details such as the title, description, and an image of the house.

**Fields**:
- user: A foreign key linking each post to a specific user.
- date_posted: The date and time when the post was created.
- date_modified: The date and time when the post was last updated.
- house_title: The title of the house post.
- description: A detailed description of the house.
- house_image: An image of the house, managed by Cloudinary.

**Relationships**:
- Each HousePost is linked to one user via a foreign key (user). This establishes a many-to-one relationship where a single user can have multiple posts.

#### 3. HouseHeart

**Purpose**:
The HouseHeart model represents a "like" or "heart" that a user gives to a specific house post.

**Fields**:
- user: A foreign key linking the heart to the user who liked the post.
- housepost: A foreign key linking the heart to the specific house post that was liked.
- timestamp_created: The date and time when the heart was created.

**Relationships**:
- Each HouseHeart is linked to both a user and a house post via foreign keys. This establishes a many-to-one relationship where a single post can have many hearts, and a single user can like multiple posts.
- The combination of user and housepost is unique, ensuring that a user can only like a specific post once.

#### 4. HousePostComment

**Purpose**:
The HousePostComment model stores comments made by users on house posts.

**Fields**:
- user: A foreign key linking the comment to the user who made it.
- housepost: A foreign key linking the comment to the specific house post it was made on.
- timestamp_created: The date and time when the comment was created.
- timestamp_modified: The date and time when the comment was last updated.
- comment: The content of the comment.

**Relationships**:
- Each HousePostComment is linked to both a user and a house post via foreign keys. This creates a many-to-one relationship where a single post can have many comments, and a single user can comment on multiple posts.

#### Summary of Relationships

- **UserProfile** is a one-to-one extension of the User model.
- **HousePost** is related to User via a many-to-one relationship.
- **HouseHeart** and **HousePostComment** are each related to both User and HousePost via many-to-one relationships.

These models work together to create a robust structure for managing user profiles, posts about houses, user interactions (likes/house-hearts), and user-generated comments.

### **User Stories Mapped to Project Goals**

This application was developed with the goal of creating a platform where house enthusiasts can share their dream homes and build a community. Below is a table mapping user stories to this main project goal:

| **Project Goal**                                          | **User Story**                                                                                                 |
|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| **Create a platform for sharing dream homes**             | **House Post Management**: Users can create, edit, delete, and view house posts, allowing them to share their homes. |
| **Build a community of house enthusiasts**                | **Househeart Functionality**: Users can "househeart" posts, showing appreciation and building community interaction. |
|                                                           | **View House Posts Feed**: Users can browse through all shared house posts, encouraging exploration and engagement.   |
| **Personalize user experiences**                          | **User Profile Management**: Users can manage their profiles, including their bio and profile picture, making the app more personal. |
|                                                           | **Edit User Profile**: Users can update their profile information, keeping their personal information current.       |
| **Ensure user-friendly interaction**                      | **Sign-Up Form**: Allows new users to join the community easily.                                                   |
|                                                           | **Login Form**: Enables returning users to access their profiles and interact with the app.                         |
|                                                           | **Action Feedback**: Provides clear feedback on actions like post creation or profile updates, ensuring users know what's happening. |
|                                                           | **Navigation**: Users can easily navigate through the app, accessing different features without confusion.           |
| **Secure and manage user data**                           | **User Authentication**: Users can securely sign up, log in, and manage their sessions.                            |
|                                                           | **CORS Management**: Ensures secure communication between the frontend and backend.                                |
|                                                           | **Error Handling**: Users receive clear messages when something goes wrong, improving their experience and security.  |
| **Support image sharing and storage**                     | **Cloudinary Integration**: Users can upload images securely, ensuring their house posts are visually engaging.      |
| **Encourage ongoing user interaction**                    | **Delete House Post**: Users can remove content they no longer wish to share, keeping their profiles up-to-date.     |
|                                                           | **View User Profile**: Users can see their bio and shared posts, encouraging them to keep engaging with the app.     |


<hr>

## Features

Here is a list of all the features in the application and a brief explanation of their purpose:

### Navigation Bar

- The navigation bar is the first thing that the user sees when they visit the application. A non-logged-in user will see options to either log in or sign up.

<p align="center">
  <img src="frontend\src\assets\readme-images\navbar.png" alt="Navbar" width="400">
</p>

### Landing Page

- The landing page shows login and sign-up options further down the page.

<p align="center">
  <img src="frontend\src\assets\readme-images\login-signup.png" alt="Landing Page" width="400">
</p>

### Login Form

- When the user navigates to the login page, they will see this form. It takes a username and password. The user can also choose to "see" or "unsee" the password (default is hidden).

<p align="center">
  <img src="frontend\src\assets\readme-images\loginform.png" alt="Login" width="400">
</p>

### Signup Form

- The signup form takes a username and two password fields for confirmation. It also has an "Instructions" button that shows requirements before signing up.

<p align="center">
  <img src="frontend\src\assets\readme-images\signup-form.png" alt="Signup" width="400">
</p>
<p align="center">
  <img src="frontend\src\assets\readme-images\signup-form-instructions.png" alt="Signup Instructions" width="400">
</p>

### House Posts Feed

- This is the page the user is redirected to after signing up or logging in. The latest house posts appear at the top.

<p align="center">
  <img src="frontend\src\assets\readme-images\feed.png" alt="Feed" width="400">
</p>
<p align="center">
  <img src="frontend\src\assets\readme-images\housepost.png" alt="House Posts" width="400">
</p>

### Househeart and Comment Count

- The househeart and comment functions have a count showing how many users have househearted or commented on a specific post. The househeart icon changes color and increments the count when clicked.

<p align="center">
  <img src="frontend\src\assets\readme-images\count.png" alt="Counts" width="400">
</p>

### Comment Section

- Each comment has a timestamp fetched from the database. If the logged-in user created the comment, a delete button appears. Clicking it shows a modal with options to delete or cancel.

<p align="center">
  <img src="frontend\src\assets\readme-images\comment-timestamp-deletebutton.png" alt="Comment Timestamp" width="400">
</p>

### Housepost Deletion

- If the logged-in user is the creator of a house post, a delete button is shown under the image. Clicking it triggers a modal for confirmation.

<p align="center">
  <img src="frontend\src\assets\readme-images\delete-post-confirmation.png" alt="Delete Housepost" width="400">
</p>

### Loading Indicator

- On all actions that involve user interaction, such as form submissions, a loading icon appears, providing visual feedback to the user.

<p align="center">
  <img src="frontend\src\assets\readme-images\loader-image.png" alt="Loader" width="400">
</p>

### Pagination

- The feed displays only 10 posts at a time due to pagination settings. Navigation buttons for "Next" and "Previous" are shown at the bottom of the page.

<p align="center">
  <img src="frontend\src\assets\readme-images\next-previous.png" alt="Next and Previous" width="400">
</p>

### Comment Input

- Logged-in users can type comments on posts. The send button only becomes active when the user starts typing, preventing empty comments.

<p align="center">
  <img src="frontend\src\assets\readme-images\write-comment.png" alt="Write Comment" width="400">
</p>

### Upload Post

- The upload page allows users to create a house post by uploading an image, title, and description. Once satisfied, they can submit the post and be redirected to the homepage.

<p align="center">
  <img src="frontend\src\assets\readme-images\upload-post.png" alt="Upload" width="400">
</p>

### Profile Management

- Users can visit and edit their profile. Initially, a placeholder image, no display name, and no bio are shown. Users can upload an image, add a display name, and a bio.

<p align="center">
  <img src="frontend\src\assets\readme-images\profile.png" alt="Profile" width="400">
</p>
<p align="center">
  <img src="frontend\src\assets\readme-images\edit-profile.png" alt="Edit Profile" width="400">
</p>

### Logout Functionality

- When a user clicks the logout button, they are redirected to the homepage. The homepage displays a component meant for non-authenticated users, showing the login and signup options.

## UX Design Decisions

The UX design for Housegram was shaped by a clear idea of what the app should do and how users should interact with it. This flexible approach allowed us to make design decisions that focused on making the app easy to use and visually appealing.

<p align="center">
  <img src="frontend\src\assets\readme-images\0.png" alt="landing page mockup" width="400">
</p>
- This is the mockup that was created for the landing page - the page that the user initially sees when they visit the app/page. It shows the navbar with the login and signup buttons as well as a carousel ith house-images, giving the first impression tht this app/service has to do with houses. We also added the bootstrap accordion later on, to give more text-based information about the app.

<p align="center">
  <img src="frontend\src\assets\readme-images\1.png" alt="housepost feed" width="400">
</p>
- This mockup visualises how the housepost section should look like - on on page, there are ten posts and then the user has to navigate to the next page on the application. This mockup just presents the comment, househeart, timestamp and image elements on the post and where they should be placed.

<p align="center">
  <img src="frontend\src\assets\readme-images\2.png" alt="upload housepost" width="400">
</p>
- This mockup visualises the component that takes care of the image-uploading. Here we can see that the user can input a image, title and description and then send it by clicking on submit. Notice that the navbar is different to the first mockup, since now the user is authenticated and logged in.

<p align="center">
  <img src="frontend\src\assets\readme-images\3.png" alt="profile" width="400">
</p>
- This mockup shows the design idea for the profile section - here we can see that the user has a image field or profil picture, and a display name and a biography. And to change these, the user can click edit.

### Visual and Interaction Design

We built the user interface using Bootstrap, which provided solid and intuitive elements that formed the backbone of our design. Bootstrap’s components, like modals, forms, and navigation bars, were chosen because they are familiar to users and work well across different devices. This helped us create a consistent and user-friendly experience throughout the app.

For icons and logos, we used Google Icons because they are simple, clear, and immediately recognizable. For example, we used the gear icon for editing and the delete icon for deleting content. These choices make the app intuitive to use because they follow common conventions that users already understand.

### Color Scheme and Styling

The color scheme was inspired by the logo in the navigation bar. We chose colors that work well together and are easy on the eyes. The idea was to create a clean, minimalist design that looks good and is easy to navigate. We used darker colors with black text for strong contrast and lighter colors with white text for clarity. This helps important elements stand out and makes the app easy to read and interact with.

### Design Choices for User Experience

One of our key design choices was to add a glassmorphism effect to the navigation bar and timestamps on house posts. This effect adds a modern and stylish look while keeping the interface light and visually appealing. Additionally, we decided to round the corners of all elements in the app. This small detail gives the app a softer, more welcoming feel, making it more pleasant to use.

Overall, the design of Housegram is clean, simple, and user-focused, with thoughtful choices that enhance both the look and functionality of the app.


<hr>

## Possible Future Features

- **Househearts Page:** A page where users can see all the posts they have "househearted."
- **Search and Follow Users:** The ability to search for and follow other users, with the homepage displaying posts only from followed profiles.
- **Notification System:** Notifications when users receive "househearts" or comments on their posts, encouraging user engagement.
- **Content Moderation:** If the app becomes commercial, a system or staff to approve house posts would be necessary to ensure content aligns with the app's theme.
- **Search and Filter Posts:** Adding search and filter functionality on the homepage, allowing users to find popular or specific house posts.

<hr>

## Testing

## Browser Compatibility

This project has been thoroughly tested across various web browsers to ensure full compatibility and a consistent user experience. Below is a table that details the browsers that were tested, along with the versions and the results.

| **Browser**        | **Version**       | **Tested** | **Status**        |
|--------------------|-------------------|------------|-------------------|
| Google Chrome      | 113.0 and above   | ✔          | Works without errors |
| Mozilla Firefox    | 102.0 and above   | ✔          | Works without errors |
| Microsoft Edge     | 112.0 and above   | ✔          | Works without errors |
| Safari             | 16.0 and above    | ✔          | Works without errors |

### Mobile-First Design

- A mobile-first design approach has been implemented throughout the project.
- The design has been thoroughly tested on mobile versions of the browsers listed above.
- The user interface adapts seamlessly across different screen sizes, ensuring an optimal experience on both mobile and desktop devices.

### Notes:
- The project has been tested on the latest stable versions of each browser listed above.
- No issues or errors were encountered during testing across all listed browsers.


### Lighthouse Testing Score

<p align="center">
  <img src="frontend\src\assets\readme-images\lighthouse.png" alt="lighthouse testing" width="400">
</p>

<hr>

### Resolved Bugs

This document outlines the bugs encountered during the development process and the solutions implemented to resolve them.

## Bug #1: Plural vs Singular Naming Conventions

**Description:**
A bug was encountered due to inconsistent naming conventions in the application. Entities were named in both plural and singular forms, causing confusion and unexpected behavior in the app. Specifically, when all entities were named in plural except for one in singular, certain functions misinterpreted the data.

**Solution:**
The naming convention was standardized across the entire application, ensuring that all entities were consistently named either in plural or singular form, depending on their context within the app.

## Bug #2: Model Naming Conflict

**Description:**
A conflict arose from inconsistent model naming within the application. The field `user` was named in one model, while another similar field was named `poster` in a different model. This caused a naming collision, leading to runtime errors and making it difficult for the application to differentiate between the two models.

**Solution:**
The model names were refactored to be more descriptive and unique. Each model was given a distinct name that clearly reflected its purpose, avoiding any further conflicts and improving code clarity.


### Bug #3: CORS Issues and 403 Error

**Description:**
When the frontend and backend were separated into different repositories, persistent CORS issues and 403 errors were encountered. These issues stemmed from misconfigured security settings that hindered communication between the frontend and backend.

**Solution:**
The issue was resolved by following the Code Institute guide on merging the frontend with the backend into a single repository. Proper CORS configuration was implemented, which allowed seamless communication between the frontend and backend, resolving the 403 errors.


### Bug #4: Persistent Login After Logout and CSRF Token Issues

**Description:**
After logging out, users were still logged in upon refreshing the page due to persistent JWT tokens and session cookies. Additionally, CSRF tokens were not being set properly, causing issues with logout functionality.

**Solution:**
The issue was resolved by adding a Django view to explicitly set the CSRF token when the frontend loads and updating the logout process to clear JWT tokens, session cookies, and other relevant authentication data on both the server and client sides. This ensured that users were fully logged out and prevented automatic re-login upon page refresh.


### Bug #5: Inability to Post Comments from Frontend

**Description:**
A bug was encountered where users were unable to post comments on house posts from the frontend, even though the functionality worked correctly in the Django REST Framework backend. Despite multiple attempts to debug and fix the issue in the code, the root cause was not immediately apparent.

**Solution:**
The issue was resolved by modifying the `REST_FRAMEWORK` settings in the Django application. Instead of having separate authentication classes for production and development environments, both `TokenAuthentication` and `SessionAuthentication` were enabled simultaneously in all environments:


```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}
```

<hr>

### Unsolved bugs
- Currently there are no unsolved bugs - but there are features that would be considered "good to add" to the application but there are no unresolved bugs or errors in the application that are known.

<hr>

### Validator Testing
- JavaScript testing: [https://jshint.com/](https://jshint.com/)
- Python PEP8 linter testing: [https://pep8ci.herokuapp.com/](https://pep8ci.herokuapp.com/)

All tests have been passed.

<hr>

## Languages and Frameworks Used

- Backend: Django REST framework
- Frontend: React
- Styling: React Bootstrap, custom CSS, and HTML

<p align="center">
  <img src="frontend\src\assets\readme-images\Languages.png" alt="languages" width="400">
</p>



<hr>

### Manual testing write up
#### Test Scenarios and Test Cases

#### Homepage

**Test Scenario 1: Verify homepage content and layout**

| Test Case ID | Test Steps                                                                                                                              |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| TC01         | Open the homepage and verify the presence of the carousel displaying images with appropriate dimensions and layout.                      |
| TC02         | Ensure that the accordion sections ("Creating Your First HousePost", "Connecting with the Community", "Securing Your Profile") expand and collapse correctly. |
| TC03         | Verify that the "Login" and "Create Account" buttons on the homepage navigate to the correct pages.                                      |

#### Login Page

**Test Scenario 2: Verify login functionality**

| Test Case ID | Test Steps                                                                                              |
|--------------|---------------------------------------------------------------------------------------------------------|
| TC04         | Open the login page and verify the presence of the login form with "Username" and "Password" fields.     |
| TC05         | Enter valid credentials and submit the form. Ensure successful login and redirection to the homepage.    |
| TC06         | Enter invalid credentials and submit the form. Ensure that an appropriate error message is displayed.    |
| TC07         | Verify that the "Create a user account" button navigates to the registration page.                       |
| TC08         | Verify that the "Home" link in the navigation bar navigates back to the homepage.                        |

#### Registration Page

**Test Scenario 3: Verify registration functionality**

| Test Case ID | Test Steps                                                                                                 |
|--------------|------------------------------------------------------------------------------------------------------------|
| TC09         | Open the registration page and verify the presence of the registration form with "Username", "Password", and "Confirm Password" fields. |
| TC10         | Enter valid details and submit the form. Ensure successful registration and redirection to the login page.  |
| TC11         | Enter invalid details (e.g., mismatched passwords) and submit the form. Ensure appropriate error messages are displayed. |
| TC12         | Verify that the "Login" button navigates to the login page.                                                 |
| TC13         | Verify that the "Home" link in the navigation bar navigates back to the homepage.                          |

#### Profile Management

**Test Scenario 4: Verify profile viewing and editing**

| Test Case ID | Test Steps                                                                                                      |
|--------------|-----------------------------------------------------------------------------------------------------------------|
| TC14         | Open the profile page and verify the presence of the profile details (display name, bio, and profile picture).  |
| TC15         | Click the "Edit Profile" button and verify that a modal opens with the ability to edit the display name, bio, and profile picture. |
| TC16         | Change the display name, bio, and profile picture, then save the changes. Ensure that the updated profile details are displayed correctly. |
| TC17         | Cancel the profile editing process and ensure that no changes are made to the profile.                          |

#### HousePost Creation

**Test Scenario 5: Verify house post creation functionality**

| Test Case ID | Test Steps                                                                                          |
|--------------|-----------------------------------------------------------------------------------------------------|
| TC18         | Open the "Upload" page and verify the presence of the post creation form with fields for title, description, and image upload. |
| TC19         | Enter valid details (title, description) and select an image file. Submit the form and ensure the post is created successfully. |
| TC20         | Enter a valid title and description but no image. Submit the form and ensure that the post is created successfully with default image handling. |
| TC21         | Verify that the success message is displayed after the post creation and that the user is redirected to the homepage. |
| TC22         | Verify the presence of the uploaded image preview, and test the "Change the image" and "Remove Image" functionalities.           |

#### HousePost Viewing and Deletion

**Test Scenario 6: Verify house post viewing and deletion**

| Test Case ID | Test Steps                                                                                                      |
|--------------|-----------------------------------------------------------------------------------------------------------------|
| TC23         | Open the homepage and verify the presence of the recently created house post in the list of posts.              |
| TC24         | Click on a house post to view its details and verify that the correct title, description, and image are displayed. |
| TC25         | Click the "Delete" button for a house post you created and confirm the deletion. Ensure the post is removed from the list. |

#### Comments on HousePosts

**Test Scenario 7: Verify adding and deleting comments on house posts**

| Test Case ID | Test Steps                                                                                                     |
|--------------|----------------------------------------------------------------------------------------------------------------|
| TC26         | Open a house post and verify the presence of the comments section.                                             |
| TC27         | Add a comment to the post and ensure it is displayed correctly under the post.                                 |
| TC28         | Delete your comment and ensure it is removed from the comments section.                                        |
| TC29         | Verify that only the user who posted the comment has the ability to delete it, and that the delete confirmation modal functions correctly. |

#### HouseHearts (Liking Posts)

**Test Scenario 8: Verify HouseHearts functionality**

| Test Case ID | Test Steps                                                                                                     |
|--------------|----------------------------------------------------------------------------------------------------------------|
| TC30         | Open a house post and verify the presence of the HouseHearts (like) button.                                    |
| TC31         | Click the HouseHearts button and ensure the heart count increases and the heart icon updates to indicate it has been liked. |
| TC32         | Attempt to click the HouseHearts button again and verify that an appropriate error message is displayed (preventing double-liking). |

#### Navigation Bar

**Test Scenario 9: Verify navigation bar functionality**

| Test Case ID | Test Steps                                                                                                     |
|--------------|----------------------------------------------------------------------------------------------------------------|
| TC33         | Verify that the navigation bar is present on all pages.                                                        |
| TC34         | Click on the "Home" link in the navigation bar and ensure it navigates to the homepage.                        |
| TC35         | Click on the "Profile" link in the navigation bar (when logged in) and ensure it navigates to the profile page. |
| TC36         | Click on the "Logout" link in the navigation bar and verify that it logs the user out and redirects to the login page. |
| TC37         | Verify that the "Login" and "Create Account" links are present and functional when not logged in.              |


<hr>


## Deployment Procedure

To successfully deploy this Django + React project, follow the steps outlined below. These steps assume that you are deploying to a production environment.

### 1. Install Required Dependencies

Ensure that all the necessary dependencies are installed. You can install the backend dependencies listed in the `requirements.txt` file by running:

```bash
pip install -r requirements.txt
```

- For the frontend, ensure that Node.js and npm are installed, and run:
```
npm install
```
2. Set Up Environment Variables
For secure and smooth operation in production, you need to configure environment variables. These variables are crucial for configuring Django, Cloudinary, the database, and more. Below is a list of required environment variables:

SECRET_KEY: The secret key for Django. Ensure this is set to a strong, unique value in production.
DEBUG: Set this to False in production to disable debug mode.
DATABASE_URL: The URL for your production database. Typically, this will be a PostgreSQL URL.
CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET: Credentials for Cloudinary, which is used for media storage.
CSRF_TRUSTED_ORIGINS: The domains that are trusted for CSRF protection, including your production domain.
Create an .env file in the root of your project and populate it with these variables:

```
SECRET_KEY=your-secret-key
DEBUG=False
DATABASE_URL=postgres://user:password@hostname:port/dbname
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

3. Configure Django Settings
The settings.py file is pre-configured to load environment variables, manage media files via Cloudinary, and handle static files using WhiteNoise. Ensure that your settings.py is correctly set up to differentiate between development and production environments.

Key Configurations:
Database:

The database configuration automatically reads from the DATABASE_URL environment variable using dj_database_url.

```
DATABASES = {
    'default': dj_database_url.parse(os.environ.get('DATABASE_URL'))
}
```

Static Files:

Ensure that static files are correctly handled by WhiteNoise for efficient serving in production:

```
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

Cloudinary:

Cloudinary is set up to manage media files. The necessary environment variables for Cloudinary should be set as shown below:

```
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET'),
)
```

CORS and CSRF:

The application is configured to handle Cross-Origin Resource Sharing (CORS) and CSRF with the following settings:
```
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1',
]

CSRF_TRUSTED_ORIGINS = ['http://localhost:3000']
```

4. Apply Migrations and Collect Static Files
Before deploying, ensure that you apply migrations to set up the database schema and collect static files:
```
python manage.py migrate
python manage.py collectstatic
```

5. Deploy the Application
Deploy the application using your preferred method. In this production we used Heroku:
- Heroku: Use the Procfile and ensure all necessary environment variables are set in the Heroku dashboard.

<hr>

### Forking and Cloning the Project - steps
##### To deploy this Django + React project, follow these steps to fork and clone the repository:

#### Fork the Repository:

- Go to the project's GitHub repository at [this page](https://github.com/markohautala/django-rest-api)

- Click on the Fork button in the upper right corner of the page.

- This will create a copy of the repository under your GitHub account.

<hr>

#### Clone the Forked Repository:

- Go to the GitHub repository https://github.com/markohautala/django-rest-api

- Locate the Code button above the list of files (next to 'Add file') and click it

- choose a preferred cloning option by selecting either HTTPS or GitHub CLI.

- Open Git Bash

- Change the current working directory to the one where you want the cloned directory

- Type git clone and paste the URL from the clipboard ($ git clone https://github.com/markohautala/django-rest-api.git)

- Press Enter to create your local clone

<hr>

### Setup in the IDE (VS Code)

- Since this is a repository with both the frontend and backend in the same folderstructure. You need to create two localhosts development enviroments. You can first click on "New terminal" and then click again to "Split terminal". This creates to terminals. In on of them, type "python manage.py runserver" to start development server on the backend. On the other terminal, type "cd frontend" (go narrow down to the frontend-folder) and then type "npm start" to run the development server on the frontend. Now you should have the backend on http://127.0.0.1:8000/ and the frontend on http://localhost:3000/.


<hr>


## Credits
#### Resources Used
- For React Bootstrap elements, the project references the React Bootstrap documentation: https://react-bootstrap.netlify.app/docs/
- Icons for the page were sourced from Google Icons: https://favicon.io/favicon-converter/
- The custom loading icon used during form submissions was generated with: https://loading.io/
- Secret key generator for Django: https://djecrety.ir/
- The database diagram in this README was created using: https://dbdiagram.io/home
- Househeart icons were sourced from Flaticon: https://www.flaticon.com/search?word=house%20heart

#### Other credits
- Inspiration for this application and some of its features was drawn from Code Institute's walkthrough project "Moments." However, significant customization has been made to models, views, React code, UX design, features, and naming conventions throughout the entire application. This project has its own unique elements and personal touches. The Upload.jsx component, for example, includes a feature where users can upload an image and preview it before submitting, similar to the feature in the Code Institute project, but with a unique design tailored to this project.