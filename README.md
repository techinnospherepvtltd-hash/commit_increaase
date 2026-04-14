# TechInnoSphere — Full-Stack Unified App

> **From Vision to Software we Build it All**

A unified full-stack application with a **React frontend**, **Express.js backend**, and **Excel-based database**. Optimized for single-domain deployment (e.g., Hostinger).

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js (CommonJS) |
| **Database** | Excel file (`data/techinnosphere_data.xlsx`) via ExcelJS |
| **Auth** | JWT + bcrypt password hashing |
| **Deployment** | Single Unified Process (Express serves static Frontend) |

---

## 🚀 Quick Start

### 1. Setup
```bash
# Install all dependencies and seed the database
npm run setup
```

### 2. Development
```bash
# Start both frontend and backend together
npm run dev
```
- **Live Site**: [http://localhost:8080](http://localhost:8080)
- **Admin Panel**: [http://localhost:8080/admin/login](http://localhost:8080/admin/login)

---

## 📁 Project structure

```
techinnosphere_fullweb_admin/
├── backend/              # Express API (Port 5000)
├── frontend/             # React App (Port 8080)
│   └── dist/             # Production build (generated)
├── data/                 # Excel database location
└── package.json          # Root orchestration
```

---

## 🌐 Deployment to GitHub / Hostinger

This project is set up to run as a **single unified application**. The backend automatically serves the built frontend.

### 1. Build the project
```bash
npm run build
```
This builds the React app into `frontend/dist`.

### 2. Deployment Instructions
1.  **GitHub**: Push the entire folder to your repository.
2.  **Hostinger Git Integration**:
    - Connect your GitHub repo in the Hostinger hPanel.
    - Set the **deployment directory** to the root.
    - Use `npm install` and `npm run build`.
3.  **Run with PM2**:
    ```bash
    pm2 start backend/index.js --name techinnosphere
    ```

---

## 🔑 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@techinnosphere.com` | `Admin@123` |
| **Employee** | `employee@techinnosphere.com` | `Employee@123` |

---

*Built for TechInnoSphere — 2026*
