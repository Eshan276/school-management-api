# School Management API

## Overview

The School Management API is a Node.js application that allows users to manage school data. It provides endpoints to add new schools and retrieve a list of schools sorted by proximity to a specified location.

## PostMan Docs

-[POSTMAN- CLICK HERE](https://documenter.getpostman.com/view/30488948/2sAXjF8Zx9)

## Features

- **Add School**: Endpoint to add a new school to the database.
- **List Schools**: Endpoint to retrieve a list of schools sorted by proximity to a user's location.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for Node.js.
- **MySQL**: Relational database for storing school data.
- **Vercel**: Hosting platform for deploying the application.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Eshan276/school-management-api.git
   cd school-management-api

   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Configure Database**

   - This step is OPTIONAL
   - Create a `.env` file in the root directory with the following content:

     ```bash
     DATABASE_URL=mysql://avnadmin:AVNS_USUYip9GH0gEQNxYxQW@mysql-21357908-eshandas2002-9c89.h.aivencloud.com:17612/defaultdb?ssl-mode=REQUIRED

     ```

4. **Start the Server**

   ```bash
   node app.js
   ```

   The server will start on `http://localhost:3000`.

## API Endpoints

### Add School

- **Endpoint:** `/api/addSchool`
- **Method:** `POST`
- **Payload:**

  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 40.7128,
    "longitude": -74.006
  }
  ```

- **Response:** `200 OK` on success, `400 Bad Request` on validation errors.

### List Schools

- **Endpoint:** `/api/listSchools`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude`: User's latitude.
  - `longitude`: User's longitude.
- **Response:**

  ```json
  [
    {
      "id": 1,
      "name": "School Name",
      "address": "School Address",
      "latitude": 40.7128,
      "longitude": -74.006,
      "distance": "2.50 km"
    }
  ]
  ```

## Deployment

The application is deployed on Vercel. You can access the live API at:

- [Production URL](https://school-management-iqywxiv7j-eshan-das-projects.vercel.app/api/)

## Contact

For any questions, please contact [eshandas2002@gmail.com](mailto:eshandas2002@gmail..com).
