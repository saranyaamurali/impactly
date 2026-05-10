# Impactly - NGO-Corporate CSR Matching Platform

Impactly is a full-stack platform designed to maximize the societal value of Corporate Social Responsibility (CSR) initiatives. It enables the discovery of NGOs and verified CSR projects, matchmaking between NGOs and corporates, comprehensive impact tracking, and transparent collaboration—all on a modern web interface.

**Current Status:** ✅ Development Environment Running (May 2026)
- Backend: Node.js/Express running on port 5000
- Frontend: React running on port 3000
- Database: MongoDB Atlas (Cloud)

---

## Table of Contents

- [Quick Start](#quick-start)
- [Test Credentials](#test-credentials)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Structure](#api-structure)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Quick Start

```bash
# Install dependencies (root, backend, and frontend)
npm install

# Start both backend and frontend concurrently
npm start
# or for development mode with hot reload:
npm run dev
```

**Application URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- MongoDB Atlas: Connected via credentials in `.env`

---

## Test Credentials

Use these credentials to test the different user roles:

### 🔐 Admin Login
- **URL:** http://localhost:3000/admin/login
- **Email:** `admin@impactly.com`
- **Password:** `admin`
- **Access:** Full platform control - approve projects, verify NGOs, manage partnerships, view all analytics

### 🏢 Corporate Login
- **URL:** http://localhost:3000/corporate/login
- **Email:** `corporate@example.com`
- **Password:** `corporate123`
- **Access:** Create/manage CSR projects, track impact metrics

### 🤝 NGO Login
- **URL:** http://localhost:3000/ngo/login
- **Email:** `ngo@example.com`
- **Password:** `ngo123`
- **Access:** Manage profile, upload compliance documents, propose partnerships, view matches

**Registration URLs** (to create new test accounts):
- NGO Register: http://localhost:3000/ngo/register
- Corporate Register: http://localhost:3000/corporate/register

> **Note:** Default credentials work with the development environment. For production, use environment variables to set secure credentials.

---

## Features

- **CSR/NGO Search & Discovery:** Search directories of NGOs and CSR projects; filter by focus area, region, or profile.
- **Intelligent Matchmaking:** Automated matching and proposal workflow between NGOs and corporate projects.
- **Impact Tracking Dashboard:** Real-time metrics for tracking beneficiaries, funding, and project progress, with SDG alignment.
- **Profile Management:** NGOs, corporates, and admins have custom dashboards to edit profiles and manage their activities.
- **Document Vault & Compliance:** NGOs can upload certifications and audit reports for compliance and verification.
- **Knowledge Center:** Access to curated CSR articles, legal resources, and best practices.
- **Secure Authentication:** Role-based login system using JWT.
- **Admin Control:** Platform-wide admin dashboard for user, content, and proposal management.

---

## Architecture

The platform follows a classic **MERN** stack design with clean domain separation:

```text
┌───────────────┐      ┌─────────────┐        ┌────────────┐
│  React Frontend     │  Node.js REST API   │ MongoDB Atlas │
│  (Port 3000)  │      │  (Port 5000)   │        │ (Cloud)    │
└───────────────┘      └─────────────┘        └────────────┘
    (User Flow)             (Business Logic)     (Data Layer)
```

**Frontend (React):**
- Single Page Application (SPA) with React Router
- Role-based components (NGO Dashboard, Corporate Dashboard, Admin Dashboard)
- Modular component structure
- RESTful API integration via Axios
- Form validation and error handling

**Backend (Node.js/Express):**
- RESTful API with proper route organization
- Middleware for authentication (JWT), file upload (Multer), and logging (Morgan)
- Mongoose ODM for MongoDB integration
- Service layer for business logic
- Controller layer for request handling
- Model layer with comprehensive schemas

**Database (MongoDB Atlas):**
- Cloud-hosted MongoDB with automated backups
- Collections: Users, NGOs, Corporates, CSRProjects, Partnerships, ImpactUpdates, CsrArticles
- Indexes for optimized query performance
- Replica set for high availability

---

## Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Runtime** | Node.js | v22.22.2 |
| **Backend Framework** | Express.js | ^4.21.2 |
| **Frontend Framework** | React | ^18.x |
| **ODM/Database Driver** | Mongoose | ^8.15.2 |
| **Authentication** | JWT (jsonwebtoken) | ^9.1.0 |
| **Password Hashing** | bcryptjs | ^2.4.3 |
| **File Upload** | Multer | ^2.1.1 |
| **Logging** | Morgan | ^1.10.0 |
| **CORS** | cors | ^2.8.5 |
| **Database** | MongoDB Atlas | (Cloud) |
| **HTTP Client** | Axios | ^1.6.0 |
| **Routing** | React Router | ^6.x |
| **Build Tool** | Concurrently | ^8.2.0 |
| **Dev Tools** | Nodemon, ESLint, Jest | Latest |
| **Language** | JavaScript (ES6+) | — |

---

## Setup Instructions

### Prerequisites

- Node.js v22+ (recommend v22.22.2)
- npm v10+
- MongoDB Atlas account (free tier supported)
- Git

### 1. Clone the Repo

```bash
git clone https://github.com/saranyaamurali/impactly.git
cd impactly-ngo-admin
```

### 2. Environment Configuration

Create `.env` files in both `backend` and `frontend` directories.


### 3. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 4. Running the App

**Development Mode (Recommended):**
```bash
npm run dev
# This runs both backend and frontend concurrently with hot reload
```

**Production Mode:**
```bash
npm start
```

**Individually:**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

### 5. Verify Installation

After running `npm run dev`, you should see:

**Backend:**
```
🚀 Impactly API Server running on port 5000
✅ MongoDB connected: [cluster-url]
```

**Frontend:**
```
Compiled successfully!
Local: http://localhost:3000
```

Open http://localhost:3000 in your browser and use the [Test Credentials](#test-credentials) to log in.

---

## API Structure

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes

- `POST /auth/register-ngo` – NGO registration
- `POST /auth/login-ngo` – NGO login
- `POST /auth/register-corporate` – Corporate registration
- `POST /auth/login-corporate` – Corporate login
- `POST /auth/register-admin` – Admin registration (protected)
- `POST /auth/login-admin` – Admin login

### NGO Endpoints (`/ngo`)

- `GET /profile` – Get own NGO profile (JWT Protected)
- `PUT /profile` – Update NGO profile
- `GET /stats` – Get NGO impact statistics
- `GET /partnerships` – List all partnerships
- `POST /documents/upload` – Upload compliance documents (certifications, audit reports)
- `POST /partnerships/propose` – Propose partnership with corporate

### Corporate Endpoints (`/corporate`)

- `GET /profile` – Get corporate profile
- `PUT /profile` – Update corporate profile
- `GET /dashboard` – View corporate dashboard
- `GET /projects` – List corporate's CSR projects
- `POST /projects` – Create new CSR project

### CSR Project Endpoints (`/csr-project`)

- `GET /public` – Get all public CSR projects
- `GET /public/:id` – Get CSR project details
- `GET /my-projects` – Get user's CSR projects (JWT Protected)
- `POST /` – Create new CSR project
- `GET /information` – Get CSR information
- `GET /:id/impact` – Get impact metrics for a project
- `POST /:id/impact` – Add impact update

### Partnership Endpoints (`/partnerships`)

- `GET /` – Get all partnerships
- `POST /` – Create partnership proposal
- `PUT /:id` – Update partnership status
- `GET /:id` – Get partnership details

### Admin Endpoints (`/admin`)

- `GET /dashboard` – Global statistics and analytics
- `GET /projects/pending` – Get pending CSR projects
- `POST /projects/:id/approve` – Approve project
- `POST /projects/:id/reject` – Reject project
- `GET /partnerships/pending` – Get pending partnerships
- `POST /partnerships/:id/approve` – Approve partnership
- `POST /partnerships/:id/reject` – Reject partnership
- `GET /ngos/pending` – Get pending NGO verifications
- `POST /ngos/:id/verify` – Verify NGO
- `POST /ngos/:id/reject` – Reject NGO verification

### Ecosystem Endpoints (`/ecosystem`)

- `GET /companies` – Get all registered corporates
- `GET /ngos` – Get all registered NGOs

### Knowledge Center Endpoints (`/csr-article`)

- `GET /` – Get all CSR articles
- `POST /` – Create article (Admin protected)
- `GET /:id` – Get article details
- `PUT /:id` – Update article
- `DELETE /:id` – Delete article

### Matchmaking Endpoints (`/matchmaking`)

- `GET /` – Get matchmaking suggestions
- `GET /ngo/:ngoId` – Get matches for specific NGO
- `GET /corporate/:corporateId` – Get matches for specific corporate

> **Authentication:** All protected endpoints require a Bearer JWT token in the Authorization header:
> ```
> Authorization: Bearer <your-jwt-token>
> ```

---

## Usage

### 1. Register & Login

1. **Admin Setup:**
   - Backend automatically creates admin user on first run
   - Default: `admin@impactly.com` / `admin`
   - Navigate to http://localhost:3000/admin/login

2. **NGO Registration:**
   - Click "Register as NGO" on homepage or go to http://localhost:3000/ngo/register
   - Fill in NGO details (name, mission, focus areas, states)
   - Upload compliance documents in dashboard

3. **Corporate Registration:**
   - Click "Register as Corporate" or go to http://localhost:3000/corporate/register
   - Fill in company details
   - Create CSR projects for NGOs to match against

### 2. Browse & Apply (Matchmaking)

- **NGOs:** 
  - Log in to dashboard
  - View "Matchmaking" tab to see available CSR projects
  - Submit partnership proposals with expected outcomes
  - Track proposal status in partnerships section

- **Corporates:**
  - Create CSR projects with budget and objectives
  - View incoming partnership proposals
  - Approve/reject proposals

### 3. Admin Verification

- **Admins:**
  - Review pending NGO verifications in dashboard
  - View compliance documents uploaded by NGOs
  - Approve/reject NGOs for verification
  - Approve/reject CSR projects
  - Manage partnership approvals
  - View platform-wide analytics

### 4. Track Impact

- Use the "Impact Tracking" dashboard for real-time metrics:
  - Number of beneficiaries
  - Funding allocated vs. disbursed
  - Project progress updates
  - SDG alignment metrics

### 5. Use Knowledge Center

- Browse curated articles on CSR best practices
- Access legal compliance guidelines
- Learn about SDG frameworks and alignment

### 6. Document Management

- NGOs can upload and manage compliance documents:
  - Certifications (ISO, CSR certifications, etc.)
  - Annual audit reports
  - License documents
- Documents are base64-encoded and stored in MongoDB
- Admin can review documents during verification

---

## Project Structure

```
impactly-ngo-admin/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/              # Business logic for each route
│   │   ├── adminController.js
│   │   ├── ngoController.js
│   │   ├── corporateController.js
│   │   ├── csrProjectController.js
│   │   ├── matchmakingController.js
│   │   └── ...
│   ├── models/                   # Mongoose schemas
│   │   ├── User.js
│   │   ├── NGO.js
│   │   ├── Corporate.js
│   │   ├── CSRProject.js
│   │   ├── Partnership.js
│   │   ├── ImpactUpdate.js
│   │   └── ...
│   ├── routes/                   # API endpoint definitions
│   │   ├── authRoutes.js
│   │   ├── ngoRoutes.js
│   │   ├── corporateRoutes.js
│   │   ├── adminRoutes.js
│   │   └── ...
│   ├── middleware/               # Custom middleware
│   │   ├── authMiddleware.js    # JWT verification
│   │   └── uploadMiddleware.js  # File upload handling
│   ├── services/                 # Business services
│   │   └── dataStore.js
│   ├── validators/               # Input validation
│   ├── utils/                    # Utilities (seeding, helpers)
│   │   └── seedAdmin.js
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server entry point
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   │   ├── MainLayout.jsx
│   │   │   ├── ProjectCard.js
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/                # Page components for routing
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── NgoDashboardPage.jsx
│   │   │   ├── CorporateDashboardPage.js
│   │   │   ├── MatchmakingPage.jsx
│   │   │   ├── HomePage.js
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── api.js            # Axios API client
│   │   ├── styles/               # CSS styling
│   │   │   ├── global.css
│   │   │   ├── HomePage.css
│   │   │   └── ...
│   │   ├── context/              # React Context for state
│   │   ├── assets/               # Images, icons, etc.
│   │   ├── App.js                # Root component
│   │   ├── index.js              # React entry point
│   │   └── index.css
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── public/index.html
├── .env.example                  # Example env file
├── package.json                  # Root npm configuration
├── README.md                     # This file
└── .gitignore
```

---

## Troubleshooting

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find and kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Then restart
npm run dev
```

### MongoDB Connection Failed

**Error:** `❌ MongoDB connection failed: connect ECONNREFUSED`

**Solution:**
1. Verify MongoDB Atlas cluster is active
2. Check `.env` file has correct `MONGODB_URI`
3. Verify IP whitelist in MongoDB Atlas includes your machine
4. Test connection string with MongoDB Compass

### React Dependencies Error

**Error:** `npm ERR! peer dep missing`

**Solution:**
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Verify `CLIENT_URL` in backend `.env` matches frontend URL
2. Check `REACT_APP_API_URL` in frontend `.env`
3. Ensure backend CORS middleware is enabled

### ESLint Warnings (Non-blocking)

**Issue:** Unused variables and missing dependencies warnings

**Status:** These are development-only warnings and don't affect functionality. They will be cleaned up in future releases.

**Fix individually:**
```javascript
// eslint-disable-next-line no-unused-vars
const unusedVar = 'value';
```

### Session/Token Issues

**Problem:** Getting logged out unexpectedly

**Solution:**
- Token expiry is set to 7 days in JWT_EXPIRY
- Clear browser localStorage and re-login
- Check console for token errors

---

## Contributing

Pull requests and issues are welcome!

1. Fork the project.
2. Create your feature branch (`git checkout -b feat/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feat/AmazingFeature`).
5. Open a pull request.

---

## License

This project is licensed under the ISC License.

---

## Acknowledgements

Impactly was built for the greater cause of enhancing transparency, accountability, and social good within CSR initiatives.
