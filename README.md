# TechInnoSphere — Full-Stack Corporate Site

> **From Vision to Software we Build it All**

This project is a full-stack website with a React frontend and an Express.js backend using an Excel-based database. It features a Git-based auto-sync mechanism to ensure data persistence across cloud deployments.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, ExcelJS
- **Database**: `data/techinnosphere_data.xlsx` (Auto-synced to GitHub)

---

## 🚀 Split Deployment Guide

This project is designed to be split across two platforms for optimal performance and cost-efficiency.

### 1. Backend (Render.com)
The backend handles the API, authentication, and the Excel database.

1.  **Create a New Web Service** on Render.com.
2.  **Connect your GitHub Repository**.
3.  **Root Directory**: `backend`
4.  **Runtime**: `Node`
5.  **Build Command**: `npm install`
6.  **Start Command**: `node index.js`
7.  **Environment Variables**:
    - `JWT_SECRET`: Any random string.
    - `GITHUB_TOKEN`: Your GitHub Personal Access Token (PAT). This is **required** to sync the Excel file back to GitHub.
    - `NODE_ENV`: `production`

> [!IMPORTANT]
> **GitHub Token (PAT)**: To generate a token, go to GitHub Settings > Developer Settings > Personal Access Tokens > Tokens (classic). Select `repo` permissions.

---

### 2. Frontend (GitHub Pages)
The frontend is a static React site that communicates with the Render backend.

1.  **Environment Setup**:
    - Open `frontend/.env` (or create it from `.env.example`).
    - Set `VITE_API_URL` to your Render backend URL (e.g., `https://techinnosphere-backend.onrender.com/api`).
2.  **Build the Project**:
    ```bash
    cd frontend
    npm install
    npm run build
    ```
3.  **Deploy to GitHub Pages**:
    - You can use the `gh-pages` branch or simply upload the contents of `frontend/dist` to your repository's settings.
    - If using a **Custom Domain** (`techinnosphere.com`), ensure you add a `CNAME` file to the `public/` folder or set it in GitHub Settings.

---

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@techinnosphere.com` | `Admin@123` |
| **Employee** | `employee@techinnosphere.com` | `Employee@123` |

---

## 📁 Persistence Mechanism
Since Render's free tier is ephemeral, this app uses **Git Auto-Sync**:
- When you update data via the Admin Panel, the server commits the changes to the Excel file and pushes them back to your GitHub repository.
- This ensures your data persists even if the server restarts.

*Built for TechInnoSphere — 2026*
