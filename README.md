# HOUSEGRAM

#### Housegram is a unique social media app designed for dream house enthusiasts. Users can log in to share images of their dream homes, explore other users' posts, and engage with the community by giving "Househearts" and leaving comments on their favorite houses. Whether you're looking for inspiration or just want to showcase your ideal living space, Housegram is the perfect platform to connect with like-minded individuals and celebrate the art of home and house-design.


Backend and integrated frontend repository: https://github.com/markohautala/django-rest-api

Deployed URL:


## How to use the application

## Features

#### UX design decisions

#### Possible future features

## Testing

### Lighthouse Testing

### Resolved Bugs

# Bug Report

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


### Bug #4:

### Bug #5:

### Bug #6:

### Bug #7:

### Bug #8:

### Unsolved bugs

### Validator testing

### Languages and Frameworks used

### Manual testing write up

## Deployment procedure

### Forking and Cloning the Project - steps

#### Deploying on Heroku steps

### Setup in the IDE (VS Code)

Since this is a repository with both the frontend and backend in the same folderstructure. You need to create two localhosts development enviroments. You can first click on "New terminal" and then click again to "Split terminal". This creates to terminals. In on of them, type "python manage.py runserver" to start development server on the backend. On the other terminal, type "cd frontend" (go narrow down to the frontend-folder) and then type "npm start" to run the development server on the frontend. Now you should have the backend on http://127.0.0.1:8000/ and the frontend on http://localhost:3000/.

## Credits


https://react-bootstrap.netlify.app/docs/components/cards

