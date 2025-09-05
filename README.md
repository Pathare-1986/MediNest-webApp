## Project Summary

MediNest is a full-stack medical appointment platform with three apps in one repository:
- Patient-facing website for discovering doctors, booking appointments, managing profile and appointments, and making payments.
- Admin dashboard for managing doctors, monitoring platform metrics, and overseeing all appointments.
- Doctor dashboard for managing availability, viewing and updating appointment statuses, and editing profile.

Key features:
- Doctor browsing, speciality filtering, and related doctors suggestions
- Patient registration/login, profile management, and appointment history
- Appointment booking with slots, cancellations, and status updates
- Admin tools: doctor list, add doctor, availability toggle, latest bookings feed, KPIs
- Doctor tools: appointments list, complete/cancel actions, profile update
- Image uploads via Cloudinary, secure auth with JWT, MongoDB persistence
- Razorpay payment flow endpoints prepared (frontend hooks included)

# MediNest Web App

A monorepo containing three apps:
- `backend`: Node/Express API with MongoDB and Cloudinary
- `frontend`: Patient-facing React app (Vite + Tailwind)
- `admin`: Admin/Doctor React app (Vite + Tailwind)

## Tech Stack
- Frontend (Patient): React 19, Vite 7, React Router 7, Tailwind CSS 3
- Admin/Doctor: React 19, Vite 7, Tailwind CSS 3
- Backend: Node.js 18+, Express 5, Mongoose 8, Multer, JWT
- Database: MongoDB (Atlas or local)
- Storage/CDN: Cloudinary
- Payments: Razorpay (server endpoints prepared)

## Prerequisites
- Node.js 18+
- npm 9+
- MongoDB (Atlas or local) connection string
- Cloudinary account (for image uploads)

## Environment Variables
Create a `.env` file for each app as shown.

### backend/.env
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### frontend/.env
```
VITE_BACKEND_URL=http://localhost:4000
```

### admin/.env
```
VITE_BACKEND_URL=http://localhost:4000
```

## Install Dependencies
From the repo root, run:
```bash
npm --prefix backend install
npm --prefix frontend install
npm --prefix admin install
```

## Run the Apps (Development)
Open three terminals or run in background processes.

### 1) Backend API
```bash
npm --prefix backend start
```
The server starts at `http://localhost:4000`.

### 2) Frontend (Patient)
```bash
npm --prefix frontend run dev
```
- Vite dev server at `http://localhost:5173`

### 3) Admin/Doctor App
```bash
npm --prefix admin run dev
```
- Vite dev server at `http://localhost:5174`

## Production Builds
```bash
npm --prefix frontend run build
npm --prefix admin run build
```
The backend is already run via `node backend/server.js` (ensure env set). Serve built assets with your preferred hosting if needed.

## Project Structure
```
backend/
  config/
  controllers/
  middlewares/
  models/
  routes/
  server.js
frontend/
  src/
  index.html
  vite.config.js
admin/
  src/
  index.html
  vite.config.js
```

## Notable Tech
- React 19, React Router 7, Vite 7, Tailwind 3
- Express 5, Mongoose 8, JWT, Multer, Cloudinary
- Razorpay integration endpoints present

## Common Tasks
- Update API base URL: `VITE_BACKEND_URL` in `frontend/.env` and `admin/.env`
- Login persistence: tokens stored in `localStorage` (`token`, `aToken`, `dToken`)
- Image uploads: handled by backend via Multer -> Cloudinary

## API Routes (High-Level)
- `GET /api/doctor/list`
- Admin: `/api/admin/*` (login, doctors, availability, appointments, dashboard)
- User: `/api/user/*` (register, login, profile, appointments, payments)
- Doctor: `/api/doctor/*` (login, appointments, complete/cancel, dashboard, profile)

## Notes
- CORS is enabled with credentials; ensure frontend/admin origins match when deploying.
- Ensure MongoDB and Cloudinary credentials are valid before starting the backend.
