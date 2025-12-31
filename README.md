# Event Booking System (MERN Stack)

A full-stack **Event Booking System** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
The application allows users to browse events, book seats, manage their bookings, and enables admins to manage events and view all bookings.

---

##  Features

### 👤 User Features
- User registration & login (JWT authentication)
- Browse available events
- View event details (date, location, price, available seats)
- Book events
- Prevent duplicate bookings
- Prevent booking past events
- View personal bookings
- Cancel bookings (with seat restoration)

### Admin Features
- Admin login with role-based access
- Create new events
- Manage event seat availability
- View all bookings across users
- Monitor booked seats per event

### Security
- JWT-based authentication
- Protected routes
- Admin-only routes
- Secure API endpoints

---

## Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS (custom styling)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

### Tools
- MongoDB Compass
- Thunder Client / Postman
- VS Code

---

## Project Structure
# 🎟️ Event Booking System (MERN Stack)

A full-stack **Event Booking System** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
The application allows users to browse events, book seats, manage their bookings, and enables admins to manage events and view all bookings.

---

## 🚀 Features

### 👤 User Features
- User registration & login (JWT authentication)
- Browse available events
- View event details (date, location, price, available seats)
- Book events
- Prevent duplicate bookings
- Prevent booking past events
- View personal bookings
- Cancel bookings (with seat restoration)

### 🛠️ Admin Features
- Admin login with role-based access
- Create new events
- Manage event seat availability
- View all bookings across users
- Monitor booked seats per event

### 🔐 Security
- JWT-based authentication
- Protected routes
- Admin-only routes
- Secure API endpoints

---

## 🧱 Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS (custom styling)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

### Tools
- MongoDB Compass
- Thunder Client / Postman
- VS Code

---

## 📂 Project Structure

Event-Booking-System/
│
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── auth/
│ │ ├── utils/
│ │ ├── App.js
│ │ └── App.css
│ └── package.json
│
└── README.md


▶️ Running the Project Locally
1️⃣ Clone the repository
git clone https://github.com/your-username/event-booking-system.git
cd event-booking-system
2️⃣ Start Backend
cd backend
npm install
npm start
3️⃣ Start Frontend
cd frontend
npm install
npm start
Frontend will run on:
http://localhost:3000
Backend will run on:
http://localhost:5000

API Endpoints Overview

Auth
POST /api/auth/register
POST /api/auth/login

Events
GET /api/events
POST /api/events (Admin only)

Bookings
POST /api/bookings
GET /api/bookings/my
DELETE /api/bookings/:id
GET /api/bookings/admin (Admin only)

Scrrenshots
<img width="959" height="503" alt="image" src="https://github.com/user-attachments/assets/15d35996-3c06-40f4-8fe6-bb099cb8798c" />
<img width="948" height="509" alt="image" src="https://github.com/user-attachments/assets/debca779-f45c-42f7-93a3-abff444121cb" />
<img width="948" height="509" alt="image" src="https://github.com/user-attachments/assets/a0ad78a8-9204-480f-b936-467d0f866753" />
<img width="958" height="515" alt="image" src="https://github.com/user-attachments/assets/7da22c49-bee5-4780-ad34-aa9ca59edf8b" />
<img width="941" height="509" alt="image" src="https://github.com/user-attachments/assets/83529607-7d08-4d4b-8047-1758ecd733ac" />

Author
Vuggu Sai Chaitra
GitHub: https://github.com/chaitra33








