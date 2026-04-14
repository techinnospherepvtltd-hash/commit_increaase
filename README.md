# TechInnoSphere — Corporate Website

> **From Vision to Software we Build it All**

A full-stack corporate website with a React frontend, Express.js backend, and Excel-based database. Features a role-based admin panel for managing projects, services, jobs, and users.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | Excel file (`data/techinnosphere_data.xlsx`) via ExcelJS |
| **Auth** | JWT (jsonwebtoken) + bcrypt password hashing |
| **UI Library** | Shadcn/UI (Radix UI primitives) |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **npm** installed

### 1. Install Dependencies

```bash
# Install all dependencies (frontend + backend)
npm run setup
```

Or manually:

```bash
npm install
cd server && npm install
cd ..
```

### 2. Seed the Database

```bash
npm run seed
```

This creates `data/techinnosphere_data.xlsx` with sample data and default user accounts.

### 3. Start Development

```bash
npm run dev
```

This starts both servers concurrently:
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5000

---

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@techinnosphere.com` | `Admin@123` |
| **Employee** | `employee@techinnosphere.com` | `Employee@123` |

Access the admin panel at: **http://localhost:8080/admin**

---

## 👥 User Roles

### Admin
- Full CRUD on **Projects**, **Services**, **Jobs**
- **User management** (add, edit, delete users)
- Access to all admin sections

### Employee
- Can **add** new Projects and Services
- **Cannot** edit, delete, or manage users/jobs
- Limited dashboard view

---

## 📁 Project Structure

```
techinnosphere-core-main/
├── data/                         # Excel database
│   └── techinnosphere_data.xlsx
├── server/                       # Express.js backend
│   ├── index.js                  # Server entry point
│   ├── middleware/auth.js        # JWT middleware
│   ├── routes/                   # API routes
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── services.js
│   │   ├── jobs.js
│   │   ├── users.js
│   │   └── settings.js
│   └── utils/
│       ├── excel.js              # Excel read/write helpers
│       └── seed.js               # Database seeder
├── src/                          # React frontend
│   ├── api/client.ts             # API client
│   ├── context/AuthContext.tsx    # Auth state
│   ├── components/               # Shared components
│   ├── pages/                    # Public pages
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Work.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Careers.tsx
│   │   └── admin/                # Admin panel
│   │       ├── AdminLogin.tsx
│   │       ├── AdminLayout.tsx
│   │       ├── Dashboard.tsx
│   │       ├── ManageProjects.tsx
│   │       ├── ManageServices.tsx
│   │       ├── ManageJobs.tsx
│   │       └── ManageUsers.tsx
│   └── index.css                 # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 🌐 API Endpoints

### Public (No Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| GET | `/api/services` | List all services |
| GET | `/api/jobs` | List all job listings |
| GET | `/api/settings` | Get site settings |
| POST | `/api/contact` | Submit contact form |

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login, returns JWT |
| POST | `/api/auth/logout` | Logout, clears cookie |
| GET | `/api/auth/me` | Get current user info |

### Protected (JWT Required)
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/api/projects` | Admin, Employee | Create project |
| PUT | `/api/projects/:id` | Admin | Update project |
| DELETE | `/api/projects/:id` | Admin | Delete project |
| POST | `/api/services` | Admin, Employee | Create service |
| PUT | `/api/services/:id` | Admin | Update service |
| DELETE | `/api/services/:id` | Admin | Delete service |
| POST | `/api/jobs` | Admin | Create job |
| PUT | `/api/jobs/:id` | Admin | Update job |
| DELETE | `/api/jobs/:id` | Admin | Delete job |
| GET | `/api/users` | Admin | List users |
| POST | `/api/users` | Admin | Create user |
| PUT | `/api/users/:id` | Admin | Update user |
| DELETE | `/api/users/:id` | Admin | Delete user |
| PUT | `/api/settings` | Admin | Update settings |

---

## 🏗 Production Build & Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with the optimized frontend.

### Deploy to Hostinger (or similar)

1. **Upload** the entire project to your hosting
2. **Install dependencies**: `npm install && cd server && npm install`
3. **Seed the database**: `npm run seed`
4. **Set environment variables** in `.env`:
   ```
   JWT_SECRET=your_secure_random_secret_here
   PORT=5000
   NODE_ENV=production
   ```
5. **Start the server**: `npm start`

The Express server serves both the API and the production frontend build from `/dist`.

### Using PM2 (Recommended)

```bash
npm install -g pm2
pm2 start server/index.js --name techinnosphere
pm2 save
```

---

## 📝 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_SECRET` | `techinnosphere_jwt_secret_2026` | Secret for signing JWT tokens |
| `PORT` | `5000` | Backend server port |
| `NODE_ENV` | `development` | Environment mode |

---

## 📄 Excel Database

The database is a single Excel file at `data/techinnosphere_data.xlsx` with these sheets:

| Sheet | Purpose |
|-------|---------|
| **Projects** | Portfolio projects displayed on the Work page |
| **Services** | Service offerings displayed on the Services page |
| **Jobs** | Career listings on the Careers page |
| **Users** | Admin/employee accounts with hashed passwords |
| **Settings** | Site configuration (company name, contact info) |

All changes made through the admin panel update this file instantly.

---

## ⚙️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run setup` | Install all deps + seed database |
| `npm run dev` | Start frontend + backend concurrently |
| `npm run dev:client` | Start only Vite frontend |
| `npm run dev:server` | Start only Express backend |
| `npm run seed` | Generate/reset the Excel database |
| `npm run build` | Production frontend build |
| `npm start` | Start production server |

---

*Built with ❤️ by TechInnoSphere*
