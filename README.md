# Store Rating System

A Full Stack Web Application that allows users to rate stores, administrators to manage stores and users, and store owners to monitor ratings submitted for their stores.

## Tech Stack

### Frontend

* React.js
* Vite
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* Sequelize ORM
* JWT Authentication
* bcryptjs

### Database

* MySQL

---

## Features

### System Administrator

* Login to the platform
* Dashboard displaying:

  * Total Users
  * Total Stores
  * Total Ratings
* Add Users
* Add Stores
* View User Details
* View Store Details
* Search and Filter Users
* Search and Filter Stores
* Sort User and Store Listings
* Logout

### Normal User

* Register Account
* Login
* View All Stores
* Search Stores by Name
* Search Stores by Address
* Submit Rating (1-5)
* Modify Existing Rating
* View Personal Submitted Ratings
* Logout

### Store Owner

* Login
* View Store Dashboard
* View Average Rating of Store
* View Users Who Rated Store
* Logout

---

## Project Structure

Rating-System/

├── frontend/

│   ├── src/

│   ├── public/

│   └── package.json

│

├── backend/

│   ├── src/

│   ├── controllers/

│   ├── models/

│   ├── routes/

│   ├── middleware/

│   └── package.json

│

└── README.md

---

## Installation

### Clone Repository

git clone https://github.com/Healreaper2004/Rating-System.git

cd Rating-System

---

## Backend Setup

Move into backend directory:

cd backend

Install dependencies:

npm install

Create a .env file:

PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=rating_system

JWT_SECRET=rating_system_secret_key

Create MySQL Database:

CREATE DATABASE rating_system;

Start Backend Server:

node src/app.js

Expected Output:

✅ MySQL Connected

✅ Tables Created / Synced

🚀 Server running on port 5000

Backend URL:

http://localhost:5000

---

## Frontend Setup

Open a new terminal:

cd frontend

Install dependencies:

npm install

Start Frontend:

npm run dev

Frontend URL:

http://localhost:5173

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### User

GET /api/user/stores

GET /api/user/store/:id

PUT /api/user/password

POST /api/user/rating

PUT /api/user/rating/:storeId

### Admin

GET /api/admin/dashboard

POST /api/admin/add-user

POST /api/admin/add-store

GET /api/admin/users

GET /api/admin/stores

GET /api/admin/user/:id

### Store Owner

GET /api/store/dashboard

---

## Database Schema

### Users

| Field    | Type                       |
| -------- | -------------------------- |
| id       | Integer                    |
| name     | String                     |
| email    | String                     |
| password | String                     |
| address  | String                     |
| role     | ADMIN / USER / STORE_OWNER |

### Stores

| Field   | Type    |
| ------- | ------- |
| id      | Integer |
| name    | String  |
| email   | String  |
| address | String  |
| ownerId | Integer |

### Ratings

| Field   | Type    |
| ------- | ------- |
| id      | Integer |
| rating  | Integer |
| userId  | Integer |
| storeId | Integer |

---

## Validation Rules

### Name

* Minimum 20 characters
* Maximum 60 characters

### Address

* Maximum 400 characters

### Email

* Must follow standard email format

### Password

* Length between 8 and 16 characters
* At least one uppercase letter
* At least one special character

---

## Screenshots

Add screenshots of:

1. Login Page
2. Registration Page
3. Admin Dashboard
4. User Dashboard
5. Store Owner Dashboard

---

## Author

Ayush Arya
B.Tech Computer Science and Engineering
