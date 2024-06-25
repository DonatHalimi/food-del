# Backend

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [API Endpoints](#api-endpoints)
- [Directory Structure](#directory-structure)

## Overview

The backend setup uses Node.js with Express for building web applications and APIs. MongoDB is employed with Mongoose as the Object Data Modeling (ODM) library for database interactions. Security features include JWT (JSON Web Token) for authentication and bcrypt for password hashing. The project structure is organized with clear separation of concerns, including models for data representation, controllers for handling business logic, routes for defining API endpoints, and configuration files for environment-specific settings.

## Getting Started

### If you want to run the whole project, refer to the [root project's README](../README.md#installation).
#
### If you want to run only the frontend of the project, follow the below steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-repo.git
   cd backend
    ```
2. Install dependencies:

   ```
    npm install
    ```
3. Create a `.env` file in the root directory and add the following variables:

   ```
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server:

   ```
   npm run server
    ```

##### After running the above, the server will be running on http://localhost:4000 

## Dependencies

The following dependencies are used in the backend:
- ``express``: Web framework for Node.js.
- ``mongoose``: Object Data Modeling (ODM) library for MongoDB.
- ``bcrypt``: Library for hashing passwords.
- ``jsonwebtoken``: Library for generating JSON Web Tokens.
- ``multer``: Middleware for handling multipart/form-data, which is primarily used for uploading files.
- ``dotenv``: Library for loading environment variables from a .env file.

## API Endpoints

- ``/api/register``: Register a new user.
- ``/api/login``: Login with an existing user.
- ``/api/food/add``: Add a new food item.
- ``/api/food/list``: List all food items.
- ``/api/food/remove``: Remove a food item.

## Directory Structure

- ``backend``: Contains all the backend code.
- ``backend/models``: Contains the Mongoose models used for data persistence.
- ``backend/controllers``: Contains the controllers for handling API requests.
- ``backend/routes``: Contains the route handlers for the API endpoints.
- ``backend/config``: Contains the configuration files for the application.
- ``backend/uploads``: Contains the uploaded images.