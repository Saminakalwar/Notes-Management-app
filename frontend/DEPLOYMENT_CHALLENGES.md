🚀 MERN Deployment Summary (Vercel + Railway + MongoDB Atlas)
🧩 1. Project Structure

I organized project like this:

root/
├── backend (Node + Express)
└── frontend (React + Vite)

🗄️ 2. Database Setup (MongoDB Atlas)
Created cluster in MongoDB Atlas
Created database user
Whitelisted access (0.0.0.0/0 for production simplicity)
Copied connection string

Used in backend:
MONGO_URI=my_mongodb_atlas_url

⚙️ 3. Backend Setup (Railway)
Backend stack:
Node.js + Express
MongoDB Atlas
JWT Auth
Important backend code fixes
CORS setup:
const allowedOrigins = [
"http://localhost:5173",
process.env.CLIENT_URL,
];

Environment variables added in Railway:
MONGO_URI=...
JWT_SECRET=...
CLIENT_URL=https://my-frontend.vercel.app

Deployment steps:
Connected GitHub repo to Railway
Selected main branch
Auto-deploy enabled
Fixed MongoDB connection issues
Fixed DNS timeout locally (not production issue)

Backend deployed at:
https://my-backend.up.railway.app

🎯 4. Frontend Setup (React + Vite)
Axios setup:
baseURL: import.meta.env.VITE_API_BASE_URL

Auth flow:
localStorage token storage
axios interceptor for auth header
auto logout on 401
Environment variable:
VITE_API_BASE_URL=https://notes-management-app-production.up.railway.app/api

🚀 5. Vercel Deployment (Frontend)
Main issue fixed:
Initially selected ❌ Node.js (wrong)
Fixed to ✅ Vite

Vercel configuration:
Root directory: frontend
Framework: Vite
Build: npm run build
Output: dist
Added SPA routing fix:

Created: vercel.json
{
"rewrites": [{ "source": "/(.*)", "destination": "/" }]
}

Frontend deployed at:

https://notes-management-app-lime.vercel.app

🔗 6. Final Integration Fix (CORS Issue)
Problem:

Frontend blocked by CORS:

No 'Access-Control-Allow-Origin'
Fix:

Added correct frontend URL in Railway:

CLIENT_URL=https://notes-management-app-lime.vercel.app

Then:

Redeployed backend
🔄 7. Git Workflow Used
Frontend branch:

git checkout develop
git push origin develop

Backend branch:
git checkout main
git push origin main

Sync branches:
git checkout develop
git merge main
git push origin develop

🌐 8. Final Architecture
Frontend (Vercel)
↓
Backend API (Railway)
↓
Database (MongoDB Atlas)

⚡ 9. Key Issues Solved

✔ MongoDB DNS timeout locally
✔ Vercel wrong framework (Node.js → Vite fix)
✔ Missing Root Directory
✔ CORS blocking requests
✔ Environment variable setup
✔ Git branch confusion (main vs develop)
✔ Monorepo deployment issue

🎯 10. Final Result

successfully deployed:

✔ React frontend on Vercel
✔ Node/Express backend on Railway
✔ MongoDB Atlas database connected
✔ Full authentication flow working
✔ Production-ready MERN stack app

🧠 One-line learning summary

“Frontend and backend are deployed independently, connected via environment variables, and integrated using API base URL + CORS configuration.”
