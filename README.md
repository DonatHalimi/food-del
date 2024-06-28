# Food Delivery App

Welcome to the Food Delivery App! This project is a comprehensive solution for managing a food delivery service, with separate components for the admin panel, frontend, and backend.

### Live Demo
You can check out the live demo of the Food Delivery App [here](https://food-del-frontend-d926.onrender.com/).

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)

## Overview
The Food Delivery App is designed to streamline the process of managing a food delivery service. It includes functionalities for managing orders, customers, menus, and more through an admin panel, while providing a seamless user experience for customers through the frontend interface.

## Features
- Admin panel for managing orders, customers, and menus
- User-friendly frontend for customers to browse menus and place orders
- Backend server to handle data processing and storage

## Technologies Used
- React.js (Frontend)
- Node.js (Backend)
- Express.js (Backend)
- MongoDB (Database)
- Other supporting libraries and frameworks

## Getting Started
Follow these steps to get the project up and running on your local machine.

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (which includes npm)

### Installation
1. **Clone the repository:**
   ```
   git clone https://github.com/DonatHalimi/food-del.git
   cd food-del
   ```

2. **Install dependencies for the admin panel:**
   ```
   cd admin
   npm install
   ```

3. **Install dependencies for the frontend:**
   ```
   cd ../frontend
   npm install
   ```

4. **Install dependencies for the backend:**
   ```
   cd ../backend
   npm install
   ```

5. **Start the project:**
   Go to the root directory of the project and run:
   ```
   cd ..
   npm start
   ```
   This command will start all parts of the project (admin panel, frontend, and backend) simultaneously.

## Project Structure
- **admin/**: Contains the admin panel code.
- **frontend/**: Contains the client-side application code.
- **backend/**: Contains the server-side application code.

## Usage
After running `npm start`, the following services should be running:
- **Admin Panel**: Typically accessible via `http://localhost:5173`
- **Frontend**: Typically accessible via `http://localhost:3000`
- **Backend**: Server should be running on `http://localhost:4000`

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
