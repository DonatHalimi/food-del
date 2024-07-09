# Admin

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Admin Screenshots](#admin-screenshots)
- [Directory Structure](#directory-structure)

## Overview

The admin setup utilizes React with Vite for fast development using HMR (Hot Module Replacement). ESLint is configured to enforce code quality standards. The directory structure organizes code into `src`, with specific folders for assets, components, and pages dedicated to administrative functionalities, ensuring clarity and reusability across the admin application.

## Getting Started

### If you want to run the whole project, refer to the [root project's README](../README.md#installation).
#
### If you want to run only the admin part of the project, follow the below steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-repo.git
   cd admin
    ```
2. Install dependencies:

   ```
    npm install
    ```
3. Start the development server:

   ```
   npm run dev
    ```

##### After running the above, http://localhost:5173 will open automatically in your default browser.

## Admin Screenshots
#### Admin Dashboard
![admin-dashboard](https://github.com/DonatHalimi/food-del/assets/118883706/2970a23d-512e-4205-ab1c-fac9ede8f74e)

#### Add Food
![add-food](https://github.com/DonatHalimi/food-del/assets/118883706/a8f947c6-b6ec-4df2-a1a4-96ed73179e70)

#### Food List
![food-list](https://github.com/DonatHalimi/food-del/assets/118883706/4409cb7e-675d-4c63-b437-765ee55bc868)

#### Order List
![orders-list](https://github.com/DonatHalimi/food-del/assets/118883706/b22f5a09-f188-440b-9cb1-25599d802e74)

#### Add Category
![add-category](https://github.com/DonatHalimi/food-del/assets/118883706/7d398fa4-61b0-42f5-b7d0-64c57d868113)

#### Category List
![category-list](https://github.com/DonatHalimi/food-del/assets/118883706/193db2e9-60f7-46ac-a8ca-eecec85b8a0a)

#### Add User
![add-user](https://github.com/DonatHalimi/food-del/assets/118883706/25060f3c-31ac-4945-80a0-46bba303aa74)

#### User List
![user-list](https://github.com/DonatHalimi/food-del/assets/118883706/f572d137-133b-4869-895c-a9a532ae3dce)

#### Add Country (used in frontend when selecting the country for shipping address)
![add-country](https://github.com/DonatHalimi/food-del/assets/118883706/3d418e71-58cd-46ad-89e7-ce00cfcc1ae2)

#### Country List
![country-list](https://github.com/DonatHalimi/food-del/assets/118883706/f30ceb9e-4654-44b1-ab5c-f5cc0de300b5)

#### Add City (used in frontend when selecting the city of selected country for shipping address)
![add-city](https://github.com/DonatHalimi/food-del/assets/118883706/3e2fbf30-f44e-4b5e-8c33-02e0efea3339)

#### City List
![city-list](https://github.com/DonatHalimi/food-del/assets/118883706/41ea77c6-1389-45ec-8c7e-b259b7b0e077)

## Directory Structure

- ``src``: Contains all the source code for the admin.
- ``src/assets``: Contains all the static assets used in the application.
- ``src/components``: Contains reusable components used across the application.
- ``src/pages``: Contains the different pages of the application.
