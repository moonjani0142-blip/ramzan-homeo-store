# Ramzan Homeo Store & Clinic

## Overview
A Medicine Supply Management System for Ramzan Homeo Store & Clinic. This is a full-stack web application with a React frontend and Express.js backend.

## Project Structure
```
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── pages/       # Page components (admin & user)
│   │   ├── layouts/     # Layout components
│   │   ├── context/     # React context (Auth)
│   │   └── App.jsx      # Main routing
│   └── vite.config.js   # Vite config (port 5000)
├── server/              # Express.js backend
│   ├── routes/          # API routes
│   ├── models/          # Mongoose models
│   ├── middleware/      # Auth middleware
│   └── server.js        # Server entry point (port 3001)
└── package.json         # Root package with dev scripts
```

## Tech Stack
- **Frontend**: React 18, Vite, TailwindCSS, React Router, Axios
- **Backend**: Express.js, Mongoose, JWT authentication
- **Database**: MongoDB (requires MONGODB_URI environment variable)

## Running the Application
The app runs with `npm run dev` which starts both:
- Frontend on port 5000 (exposed to users)
- Backend on port 3001 (internal API)

## Database Setup
This application requires MongoDB. Set the `MONGODB_URI` secret/environment variable with your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ramzan-homeo
```

## Features
- User authentication (login/register)
- Admin dashboard with stats
- Product/inventory management
- Order management
- Invoice generation
- Store management
- Potency range management

## Recent Changes
- Created all backend routes, models, and middleware
- Created all frontend admin pages (Inventory, Orders, Invoices, Stores, Products, PotencyRange, CashFlow, AdminManagement, UserManagement)
- Created all user pages (UserDashboard, BrowseProducts, Cart, UserOrders, Profile)
- Configured Vite for Replit environment (port 5000, allowedHosts: true)
- Backend configured on port 3001
