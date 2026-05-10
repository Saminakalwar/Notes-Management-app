📝 MERN Notes App

A full-stack MERN application for creating, editing, searching, and managing notes with user authentication, profile management, and dark/light theme support.

🚀 Features

🔐 User Authentication (JWT based login/register)

🧑‍💼 Profile Management

Upload, update, and remove profile picture (Cloudinary)
Update personal details
Delete account permanently



🗒️ Notes CRUD

Create, edit, delete, and view notes
Real-time search with instant filtering


🎨 UI / UX

Tailwind CSS with dark/light theme toggle
Responsive layout with Navbar & Sidebar
Custom modals for confirmations



☁️ Cloud Integration

Profile images stored in Cloudinary



⚙️ Backend Logging

Pino logger for structured request tracking



🏗️ Tech Stack
Layer :	Technology
Frontend :	React.js, Tailwind CSS, Vite
Backend	: Node.js, Express.js
Database :	MongoDB (Mongoose)
Auth :	JWT (JSON Web Tokens)
Image Uploads :	Cloudinary
Logging	: Pino Logger




📂 Project Structure
mern-notes-app/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── notesController.js
│   │   └── profileController.js
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
    ├── public/
    └── index.css




⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/yourusername/mern-notes-app.git
cd mern-notes-app

2️⃣ Backend setup
cd backend
npm install


Create a .env file in /backend:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Run backend:

npm run dev



3️⃣ Frontend setup
cd ../frontend
npm install
npm run dev


Access the app:

http://localhost:5173/


🧩 Environment Variables

Key	Description
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret for token signing
CLOUDINARY_*	Cloudinary credentials for image upload
PORT	Backend server port



🧠 Folder Highlights

contexts/ → React Context API for Auth, Notes, and Profile.

services/api.js → Axios instance with auth token interceptor.

components/ → UI elements (Navbar, Modals, SearchBar, etc.)

pages/ → Login, Signup, Dashboard, Profile.



🧰 Scripts

Frontend

npm run dev       # Start dev server
npm run build     # Build production app


Backend

npm run dev       # Run backend in watch mode
npm start         # Run backend in production



🧑‍💻 Developer Notes

Uses React Context API instead of Redux for lightweight state management.
Backend logs each request via Pino logger with unique request IDs.
Profile pictures are optimized client-side before upload using browser-image-compression.



🧾 License

This project is open-source and available under the MIT License.