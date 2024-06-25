# Frontend

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
 
## Overview

The frontend setup utilizes React with Vite for fast development using HMR (Hot Module Replacement). ESLint is configured to enforce code quality standards. The directory structure organizes code into src, with specific folders for assets, components, context providers, and pages to maintain clarity and reusability across the application.

## Getting Started

### If you want to run the whole project, refer to the [root project's README](../README.md#installation).
#
### If you want to run only the frontend of the project, follow the below steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-repo.git
   cd frontend
    ```
2. Install dependencies:

   ```
    npm install
    ```
3. Start the development server:

   ```
   npm run dev
    ```

##### After running the above, http://localhost:3000 will open automatically in your default browser.

## Directory Structure

- ``src``: Contains all the source code for the frontend.
- ``src/assets``: Contains all the static assets used in the application.
- ``src/components``: Contains reusable components used across the application.
- ``src/context``: Contains the context providers used for state management.
- ``src/pages``: Contains the different pages of the application.
