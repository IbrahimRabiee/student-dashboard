# Student Dashboard

## Overview

Student Dashboard is a full-stack web application built with React, Express, MongoDB, and JWT authentication.

The project focuses on implementing modern authentication and authorization workflows, protected API routes, user-owned resources, and scalable frontend architecture patterns.

The application demonstrates a complete authentication workflow, protected API routes, MongoDB persistence, and user-owned task management using modern full-stack development practices.

---

## Features

### Authentication & Security

- JWT-based authentication
- Password hashing using bcrypt
- Protected backend routes
- Authorization middleware
- React Context for authentication state management

### Task Management

- Create tasks
- View personal tasks
- Delete tasks
- User-owned task architecture
- MongoDB persistence

### Frontend Architecture

- React Context API
- Service layer architecture
- Protected routes
- Component-based UI structure

---

## Tech Stack

### Frontend

- React
- React Router
- Context API
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (JSON Web Tokens)
- bcrypt

---

## Project Structure

```txt
project/
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── layouts/
│ │ ├── pages/
│ │ ├── services/
│ │ └── utils/
│
├── server/
│ ├── src/
│ │ ├── config/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ └── utils/
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/IbrahimRabiee/student-dashboard.git
```

### Install frontend dependencies

```bash
cd client
npm install
```

### Install backend dependencies

```bash
cd ../server
npm install
```

### Configure environment variables

Create a `.env` file inside the server directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start the application

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

---

## Development Workflow

- Main branch contains stable code
- New features are developed in feature branches
- Features are merged into main through Pull Requests

---

## Roadmap

### Authentication

- Refresh token support
- Google OAuth login
- Email verification
- Password reset functionality

### Task Management

- Update tasks
- Task status tracking
- Due dates
- Task categories

### Student Dashboard Features

- Course management
- Assignment tracking
- Grades management
- Notifications

### Deployment

- Frontend deployment
- Backend deployment
- CI/CD pipeline

---

## Skills Demonstrated

This project is being developed to strengthen practical experience in:

- Full-stack application architecture
- Authentication and authorization
- Database modeling
- REST API design
- React state management
- Git and collaborative workflows
