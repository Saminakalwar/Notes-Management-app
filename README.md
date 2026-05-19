# 📝 Notes Management App

A full-stack MERN Notes Management application with authentication, profile management, rich note editing, and cloud image uploads.

---

## 🌐 Live Demo

- Frontend: https://notes-management-app-lime.vercel.app
- Backend API: https://notes-management-app-production.up.railway.app

---

## 🚀 Features

### 🔐 Authentication

- JWT-based login & registration
- Protected routes
- Persistent login sessions
- Auto logout on invalid/expired token

### 📝 Notes Management

- Create, edit, delete notes
- Rich text note editor
- Real-time search & filtering
- Responsive notes dashboard

### 👤 Profile Management

- Update user profile
- Upload/remove profile picture
- Cloudinary image storage
- Permanent account deletion

### 🎨 UI / UX

- Fully responsive design
- Dark/Light theme support
- Toast notifications
- Custom confirmation modals

### ⚙️ Backend Features

- RESTful API architecture
- Structured logging with Pino
- MongoDB + Mongoose integration
- Express middleware architecture

---

## 🏗️ Tech Stack

| Layer          | Technology                   |
| -------------- | ---------------------------- |
| Frontend       | React.js, Vite, Tailwind CSS |
| Backend        | Node.js, Express.js          |
| Database       | MongoDB Atlas                |
| Authentication | JWT                          |
| Image Storage  | Cloudinary                   |
| Deployment     | Vercel, Railway              |
| Logging        | Pino Logger                  |

---

## 📸 Screenshots

### Login Page

### Dashboard

### Profile Page

---

## 📂 Project Structure

```txt
notes-management-app/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   └── index.jsx
    │
    ├── public/
    ├── vite.config.js
    ├── vercel.json
    └── package.json
```

## ⚙️ Local Development Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/notes-management-app.git
cd notes-management-app

### 2️⃣Backend Setup

cd backend
npm install

### Create .env inside /backend:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173

Run backend:
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install

Create .env inside /frontend:

VITE_API_BASE_URL=http://localhost:5000/api

Run frontend:
npm run dev

### ☁️ Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Railway       |
| Database | MongoDB Atlas |


### 🚀 Production Deployment

Frontend (Vercel)
Framework Preset: Vite
Root Directory: frontend
Build Command:
npm run build

Output Directory:
dist

Backend (Railway)
Connected GitHub repository
Auto deploy enabled
Environment variables configured

Production Environment Variables
Backend

MONGO_URI=
JWT_SECRET=
CLIENT_URL=https://your-frontend.vercel.app
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Frontend
VITE_API_BASE_URL=https://your-backend.up.railway.app/api


## 🔑Important Configuration

vercel.json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}

### CORS Setup

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
];

## 🧠 Developer Notes

Uses React Context API for lightweight global state management
Axios interceptors automatically attach JWT tokens
Images optimized client-side before upload
SPA routing handled using vercel.json
Structured request logging implemented using Pino

## ✨ Key Learning Outcomes

Full-stack MERN deployment
Cloud hosting with Vercel & Railway
JWT authentication workflow
MongoDB Atlas integration
Environment variable management
CORS configuration handling
Monorepo deployment setup

## 🧰 Available Scripts

Frontend
npm run dev
npm run build
npm run preview

    Backend
    npm run dev
    npm start

## 🧾 License

This project is open-source and available under the MIT License.
```
