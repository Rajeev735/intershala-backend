# Smart CRM Backend 🚀

Backend API for the Smart CRM platform built using Node.js, Express.js, TypeScript, MongoDB, and JWT Authentication.

---

# 🔥 Live API

https://intershala-backend-up65.onrender.com

---

# 📌 Features

- JWT Authentication
- Role-Based Access Control
- REST API Architecture
- Lead CRUD APIs
- User Authentication APIs
- Sales User Management
- MongoDB Integration
- Zod Validation
- Docker Support

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Zod

---

# ⚙️ Environment Variables

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Rajeev735/intershala-backend
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

---

# 🐳 Docker Support

This project includes Docker support using a Dockerfile.

## Build Docker Image

```bash
docker build -t smart-crm-backend .
```

---

## Run Docker Container

```bash
docker run -p 5000:5000 smart-crm-backend
```

---

# 🔐 Admin Credentials

```txt
Email: admin@gmail.com
Password: admin123
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login User |
| POST | `/api/auth/create-sales-user` | Create Sales User |

---

## Leads

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leads` | Get Leads |
| POST | `/api/leads` | Create Lead |
| PUT | `/api/leads/:id` | Update Lead |
| DELETE | `/api/leads/:id` | Delete Lead |

---

# 📦 Build Project

```bash
npm run build
```

---

# ▶️ Start Production Server

```bash
npm start
```

---

# 👨‍💻 Author

Rajeev Ranjan
