# HOUSEGRAM

#### Housegram is a unique social media app designed for dream house enthusiasts. Users can log in to share images of their dream homes, explore other users' posts, and engage with the community by giving "Househearts" and leaving comments on their favorite houses. Whether you're looking for inspiration or just want to showcase your ideal living space, Housegram is the perfect platform to connect with like-minded individuals and celebrate the art of home and house-design.


Backend and integrated frontend repository: https://github.com/markohautala/django-rest-api

Deployed URL:


## How to use the application
- As a user, you can visit hte given deployed url, and from there you can either create a new account, or log in with an existing one. To create and account, navigate to the create account page by clicking in the navigation bar on "create account". Then you will be redirected to the form to create you account. Type in our desired username and create a password - you will be prompted to re-type it, just to make sure they are the same. Remember this password. If the account-creation is successful, you will be redirected to the login-page, whee you now need to login in. On sucessful login, you will be redirected to the "homepage". Here you can see the other users posts from the application.

To be able to create your own housepost and to shre your own dreamhome, navigate to "upload" on the navigationbar - click on the link. Now you will be redirected to the upload page where you can enter a image of your own. The maximum sixe is 4mb on the image size. You also need to add a short title and description of your own. After you feel satisfied with your draft of a housepost, click the submit button. Upon success, you will be redirected to the homepage where you now can see your newly created housepost.

You can also on the homepage look at other peoples houseposts and give them likes or "househearts". You can also add comments that are kind and nice and also read and look at other peoples comments. If you want to delete your comment, you can hover over your own comment and click on the delete button - this will permanently delete the existing comment.

You have your own profile and you can navigate to it using the navigation bar and click on "Profile". On that page, you can now see a image (for now placeholder image - since you have yet to upload such), and you can also see a field for username and description. You can edit them aswell bu clicking on those buttons and click save. You can aswell upload your own avatar image.



## Features
take screenshots and paste them here.


### React components
explain all the components here.


### Security
- DEBUG mode set to off
- Secret key added to Heroku config vars and env.py file and to gitignore (not shared to github)
- All API:s are secret in env.py and in Heroku config vars.
- Industry standard CORS settings added.
- Specified allowed hosts added.


### Database Models

The HousePost application includes several key database models that define the structure and relationships of the data. Below is an overview of each model and how they are connected.

#### 1. UserProfile

**Purpose**:
The `UserProfile` model stores additional information about users that extends the default Django `User` model.

**Fields**:
- `user`: A one-to-one relationship with Django's built-in `User` model.
- `date_created`: The date and time when the profile was created.
- `date_updated`: The date and time when the profile was last updated.
- `display_name`: A custom name that the user can display.
- `bio`: A short biography or description written by the user.
- `profile_picture`: A profile picture uploaded by the user, managed by Cloudinary.

**Relationships**:
- The `UserProfile` model is directly linked to the `User` model via a one-to-one relationship. Each user has one profile.

#### 2. HousePost

**Purpose**:
The `HousePost` model represents posts created by users about houses. These posts include details such as the title, description, and an image of the house.

**Fields**:
- `user`: A foreign key linking each post to a specific user.
- `date_posted`: The date and time when the post was created.
- `date_modified`: The date and time when the post was last updated.
- `house_title`: The title of the house post.
- `description`: A detailed description of the house.
- `house_image`: An image of the house, managed by Cloudinary.

**Relationships**:
- Each `HousePost` is linked to one user via a foreign key (`user`). This establishes a many-to-one relationship where a single user can have multiple posts.

#### 3. HouseHeart

**Purpose**:
The `HouseHeart` model represents a "like" or "heart" that a user gives to a specific house post.

**Fields**:
- `user`: A foreign key linking the heart to the user who liked the post.
- `housepost`: A foreign key linking the heart to the specific house post that was liked.
- `timestamp_created`: The date and time when the heart was created.

**Relationships**:
- Each `HouseHeart` is linked to both a user and a house post via foreign keys. This establishes a many-to-one relationship where a single post can have many hearts, and a single user can like multiple posts.
- The combination of `user` and `housepost` is unique, ensuring that a user can only like a specific post once.

#### 4. HousePostComment

**Purpose**:
The `HousePostComment` model stores comments made by users on house posts.

**Fields**:
- `user`: A foreign key linking the comment to the user who made it.
- `housepost`: A foreign key linking the comment to the specific house post it was made on.
- `timestamp_created`: The date and time when the comment was created.
- `timestamp_modified`: The date and time when the comment was last updated.
- `comment`: The content of the comment.

**Relationships**:
- Each `HousePostComment` is linked to both a user and a house post via foreign keys. This creates a many-to-one relationship where a single post can have many comments, and a single user can comment on multiple posts.

#### Summary of Relationships

- **UserProfile** is a one-to-one extension of the `User` model.
- **HousePost** is related to `User` via a many-to-one relationship.
- **HouseHeart** and **HousePostComment** are each related to both `User` and `HousePost` via many-to-one relationships.

These models work together to create a robust structure for managing user profiles, posts about houses, user interactions (likes/house-hearts), and user-generated comments.


#### UX design decisions
Paste in figma or UX design decisions here.

#### Possible future features

- logged in / authenticated user could have a navbar link that says "househearts" and when the user clicks on that, the user is navigated to a page where the user can see all the posts that the user has "house-hearted".

- A featue that would be good to possibly apply in the future would be the ability to search other users. Right now the "feed" or the homepage lists all the houseposts in the database. So, the ability to follow other users and that the feed/home-page would only display those profile's posts, that would definetily be a cosiderable feature in the future.

- A notification system giving the users notifications when other users give "house-hearts"/likes or comments on ones own posts - boosting the possibility for users to return to the website and post more houseposts and this would eventually make the community grow and self-reminding the webpage to users aout it's existance.

- Right now, the application is just for the purpose of a portfolio project - but if this would eventually become a commercial application, there would be the need of a admin, staff or system in place that would check and approve if the houseposts contains a image of a house. If not, there would be a problem if users expect house-related images and posts but recieve something else.



## Testing
### Lighthouse Testing


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

### Unsolved bugs
- Currently there are no unsolved bugs - but there are features that would be considered "good to add" to the application but there are no unresolved bugs or errors in the application that are known.

### Validator testing
JavaScript testing: https://jshint.com/
Python pep8 linter testing: https://pep8ci.herokuapp.com/


### Languages and Frameworks used
- Backend is built with Django REST framework
- Frontend is built with React
- Styling and grid-layout on the frontend is applied with react-bootstrap
- Custom CSS and HTML has been added aswell.

### Manual testing write up
test everything - write what was exprected and what was the outcome

## Deployment procedure
explain what dependencies need to be installed and so on


### Forking and Cloning the Project - steps
##### To deploy this Django + React project, follow these steps to fork and clone the repository:

#### Fork the Repository:

- Go to the project's GitHub repository at [this page](https://github.com/markohautala/django-rest-api)

- Click on the Fork button in the upper right corner of the page.

- This will create a copy of the repository under your GitHub account.

#### Clone the Forked Repository:

- Go to the GitHub repository https://github.com/markohautala/django-rest-api

- Locate the Code button above the list of files (next to 'Add file') and click it

- choose a preferred cloning option by selecting either HTTPS or GitHub CLI.

- Open Git Bash

- Change the current working directory to the one where you want the cloned directory

- Type git clone and paste the URL from the clipboard ($ git clone https://github.com/markohautala/django-rest-api.git)

- Press Enter to create your local clone

### Setup in the IDE (VS Code)

- Since this is a repository with both the frontend and backend in the same folderstructure. You need to create two localhosts development enviroments. You can first click on "New terminal" and then click again to "Split terminal". This creates to terminals. In on of them, type "python manage.py runserver" to start development server on the backend. On the other terminal, type "cd frontend" (go narrow down to the frontend-folder) and then type "npm start" to run the development server on the frontend. Now you should have the backend on http://127.0.0.1:8000/ and the frontend on http://localhost:3000/.

## Credits
#### Resources used
- For the react-bootstrap elements, this porject has gotten it's information and content from the react-bootstrap documentation: https://react-bootstrap.netlify.app/docs/

- Icons for the page has been gotten from Google Icons: https://favicon.io/favicon-converter/

- The custom loading icon that has been applied to the different react-pages that use POST or GET requests (in submitting forms for example), then there is a loading gif that has been applied. This loading icon was generated with: https://loading.io/

- Secret key generator for Django (in orde to create a new secet key for the backend): https://djecrety.ir/

- The database diagram in this README has been made using this resource: https://dbdiagram.io/home

- The househeart icons for the liked and not-liked icons are gotten from this free resource: https://www.flaticon.com/search?word=house%20heart

#### Other credits
- Inspiration for this application and for some of the features has been gotten from Code Institues walktrough project called "Moments". But in order to make it custom to my projects scope and needs, there has been significant customization made to all the models, views, react-code, UX-design, feature and naming convention troughout the whole application. But, initial inspiration for this project idea was achieved by doing the walktrough project from Code Institute. But just to clarify, this project has it's own uniqueness and my personal toucht it.