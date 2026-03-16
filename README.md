# Task Manager Application

## Overview

This is a full-stack Task Management Dashboard built with **React** (Vite), **Tailwind CSS**, and **Redux Toolkit** on the frontend, and **Node.js**, **Express**, and **MongoDB** on the backend. It features robust task tracking through a drag-and-drop Kanban board, customizable task fields, and secure user authentication.

## Approach

**Frontend (`/frontend`)**:
- **Framework**: Bootstrapped with **Vite** for fast, optimized builds.
- **State Management**: Uses **Redux Toolkit** (`@reduxjs/toolkit`) for a structured and scalable way to handle application states, such as authentication and task data.
- **UI & Styling**: Built using **React**, styled via **Tailwind CSS** and **shadcn/ui** for modern, cohesive, and responsive components.
- **Kanban Board**: Includes drag-and-drop capabilities powered by `@hello-pangea/dnd`, allowing for smooth interactions when managing tasks across columns (Todo, In Progress, Done).
- **Routing**: Employs **React Router** for seamless navigation between Auth (Login/Signup) and the Dashboard.

**Backend (`/backend`)**:
- **Server**: Provides RESTful APIs using **Express**.
- **Database**: Utilizes **MongoDB** (via `mongoose`) for flexible, document-based data storage, perfect for task objects that include custom fields like tags and priorities.
- **Security**: Authentication is handled with **JSON Web Tokens (JWT)**, and password hashing is managed securely with **bcryptjs**.

## Assumptions Made

- **Node.js**: It is assumed that you have Node.js (v18+) and npm installed locally.
- **Database**: The application relies on a MongoDB cluster (like MongoDB Atlas) or a local MongoDB instance. We assume you will create a `.env` file that points `MONGODB_URI` to a working database.
- **Port Availability**: It is assumed that ports `5001` (for the backend) and typical Vite ports (like `5173`) are available locally.

## How to Run Locally

### 1. Clone the repository
Navigate to the project's root folder (`Task-Manager`):
```bash
cd Task-Manager
```

### 2. Backend Setup
Navigate to the `backend` directory, install dependencies, and set up your environment variables.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder (if missing) and populate it with the following keys:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
# Start the Node server
node server.js
```

### 3. Frontend Setup
Open a new terminal session, navigate to the `frontend` directory, install dependencies, and start the Vite dev server.

```bash
cd frontend
npm install
```

Start the frontend application:
```bash
npm run dev
```

Your React application should now be running (usually accessible at `http://localhost:5173`) and seamlessly communicating with the local backend on `http://localhost:5001`!
