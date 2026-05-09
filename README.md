# LeadFlow CRM

A modern full-stack CRM (Customer Relationship Management) application built for managing sales leads, tracking pipeline progress, and organizing customer interactions.

This project was developed as part of a Full-Stack Developer Intern take-home assessment and demonstrates frontend development, backend API design, authentication, database management, and full CRUD functionality.

---

## Features

### Authentication

* JWT-based authentication
* Protected frontend routes
* Protected backend APIs
* Secure password hashing with bcrypt

### Lead Management

* Create new leads
* View all leads
* Edit lead details
* Delete leads
* Update lead status
* View detailed lead information

### Lead Notes

* Add internal notes to leads
* Notes timeline with timestamps
* Track communication and follow-ups

### Dashboard

* Total leads
* New leads
* Qualified leads
* Won leads
* Lost leads
* Total estimated deal value
* Total won deal value
* Lead status analytics chart
* Recent leads activity

### Search & Filtering

* Search by:

  * Lead name
  * Company name
  * Email
* Filter by:

  * Status
  * Lead source
  * Assigned salesperson

### UI/UX

* Modern responsive dashboard layout
* Tailwind CSS styling
* Toast notifications
* Reusable components
* Clean SaaS-inspired design

---

# Tech Stack

## Frontend

* React
* TypeScript
* React Router
* Tailwind CSS
* Axios
* Recharts
* React Hot Toast

## Backend

* Node.js
* Express.js
* TypeScript
* JWT Authentication
* bcrypt

## Database

* PostgreSQL
* Prisma ORM

---

# Project Structure

```bash
LeadFlow-CRM/
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── types/
│   │   └── main.tsx
│   │
│   └── package.json
│
├── Backend/
│   ├── prisma/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.ts
│   │
│   └── package.json
│
└── README.md
```

---

# Database Design

The application uses a relational PostgreSQL database managed with Prisma ORM.

## Main Entities

### User

Stores authenticated CRM users.

### Lead

Stores sales lead information including:

* Lead details
* Contact information
* Pipeline status
* Deal value
* Assigned salesperson

### Note

Stores internal lead activity notes linked to specific leads.

---

# Authentication

Authentication is implemented using JWT (JSON Web Tokens).

### Flow

1. User logs in with email/password
2. Backend validates credentials
3. JWT token is generated
4. Token is stored in localStorage
5. Protected routes and APIs require valid token

---

# Test Credentials

```txt
Email: admin@example.com
Password: password123
```

---

# Environment Variables

## Backend `.env`

```env
DATABASE_URL=your_postgresql_connection_url
JWT_SECRET=your_secret_key
PORT=5000
```

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/your-username/LeadFlow-CRM.git
```

---

# Backend Setup

## Navigate to Backend

```bash
cd Backend
```

## Install Dependencies

```bash
npm install
```

## Setup Prisma

```bash
npx prisma migrate dev
```

## Seed Database

```bash
npx prisma db seed
```

## Start Backend Server

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Frontend Setup

## Navigate to Frontend

```bash
cd Frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# API Endpoints

## Authentication

```http
POST /api/auth/login
```

---

## Leads

```http
GET    /api/leads
POST   /api/leads
GET    /api/leads/:id
PUT    /api/leads/:id
DELETE /api/leads/:id
```

---

## Notes

```http
GET  /api/leads/:id/notes
POST /api/leads/:id/notes
```

---

## Dashboard

```http
GET /api/dashboard/stats
```

---

# Reflection

This project was designed to simulate a lightweight CRM system for small sales teams.

During development, I focused on:

* building reusable frontend components
* structuring scalable backend APIs
* maintaining clean separation of concerns
* creating a modern and intuitive UI
* implementing realistic CRM workflows

I chose:

* React + TypeScript for maintainable frontend development
* Express for lightweight API development
* Prisma ORM for type-safe database interactions
* PostgreSQL for reliable relational data management

One of the key learning experiences during this project was debugging full-stack integration issues involving routing, Prisma relationships, authentication state, and frontend/backend synchronization.

---

# Future Improvements

Potential future enhancements include:

* Role-based access control
* Kanban pipeline view
* Email activity tracking
* Lead reminders and tasks
* Pagination and advanced filtering
* File attachments
* Team collaboration features
* Deployment with CI/CD

---

# Author

Mohomed Aathif

Software Engineering Undergraduate
Aspiring Full Stack Developer Intern
