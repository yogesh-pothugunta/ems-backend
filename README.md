# 🏢 Employee Management System — Backend API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

> A secure and scalable REST API for the Employee Management System with Role-Based Access Control (RBAC), built using Node.js, Express.js, and MongoDB.

---

## 🌐 Live API

```
https://ems-frontend-b5hv.vercel.app
```

> ⚠️ Note: The server may take 30–60 seconds to wake up on first request (free tier).

---

## 🔐 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| 👑 Admin | admin@ems.com | password123 |
| 👩💼 HR Manager | hr@ems.com | password123 |
| 👨💻 Employee | employee@ems.com | password123 |

---

## 🚀 Features

- ✅ JWT-based Authentication with bcrypt password hashing
- ✅ Role-Based Access Control (RBAC) — Admin, HR, Employee
- ✅ Employee CRUD Operations
- ✅ Leave Management System (Apply, Approve, Reject)
- ✅ Attendance Tracking (Check-in / Check-out)
- ✅ Performance Reviews
- ✅ Salary Slip Generation
- ✅ Custom Auth & RBAC Middleware
- ✅ MongoDB Cloud Database (Railway)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | NoSQL Database |
| Mongoose | ODM for MongoDB |
| JSON Web Token (JWT) | Authentication |
| bcryptjs | Password Hashing |
| CORS | Cross-Origin Resource Sharing |
| dotenv | Environment Variables |
| Nodemon | Development Server |

---

## 📁 Project Structure

```
ems-backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Login & Register logic
│   ├── employeeController.js # Employee CRUD logic
│   ├── leaveController.js    # Leave management logic
│   ├── attendanceController.js # Attendance logic
│   └── performanceController.js # Performance review logic
├── middleware/
│   ├── auth.js               # JWT verification middleware
│   └── rbac.js               # Role-based access middleware
├── models/
│   ├── User.js               # User schema
│   ├── Employee.js           # Employee schema
│   ├── LeaveRequest.js       # Leave request schema
│   ├── Attendance.js         # Attendance schema
│   └── Performance.js        # Performance review schema
├── routes/
│   ├── authRoutes.js         # Auth routes
│   ├── employeeRoutes.js     # Employee routes
│   ├── leaveRoutes.js        # Leave routes
│   ├── attendanceRoutes.js   # Attendance routes
│   ├── performanceRoutes.js  # Performance routes
│   └── salaryRoutes.js       # Salary routes
├── .env                      # Environment variables (not pushed)
├── .gitignore
├── package.json
└── server.js                 # Entry point
```

---

## 📡 API Endpoints

### 🔑 Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login and get JWT token |

### 👥 Employees
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/employees` | Admin, HR | Get all employees |
| GET | `/api/employees/me` | Employee | Get own profile |
| GET | `/api/employees/:id` | Admin, HR | Get employee by ID |
| POST | `/api/employees` | Admin | Create new employee |
| PUT | `/api/employees/:id` | Admin, HR | Update employee |
| DELETE | `/api/employees/:id` | Admin | Delete employee |

### 📋 Leave Management
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/leaves/apply` | Employee | Apply for leave |
| GET | `/api/leaves/my` | Employee | Get own leaves |
| GET | `/api/leaves` | Admin, HR | Get all leaves |
| PUT | `/api/leaves/:id` | Admin, HR | Approve / Reject leave |
| DELETE | `/api/leaves/:id` | Employee | Cancel pending leave |

### ✅ Attendance
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/attendance/checkin` | Employee | Check in |
| POST | `/api/attendance/checkout` | Employee | Check out |
| GET | `/api/attendance/my` | Employee | Get own attendance |
| GET | `/api/attendance` | Admin, HR | Get all attendance |
| GET | `/api/attendance/today` | Admin, HR | Get today's attendance |

### ⭐ Performance Reviews
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/performance` | Admin, HR | Add review |
| GET | `/api/performance` | Admin, HR | Get all reviews |
| GET | `/api/performance/my` | Employee | Get own reviews |

### 💰 Salary
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/salary/my` | Employee | Get own salary slip |
| GET | `/api/salary` | Admin, HR | Get all salaries |

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v14+
- MongoDB (local or cloud)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/yogesh-pothugunta/ems-backend.git
cd ems-backend
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env` file**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

**4. Start the development server**
```bash
npm run dev
```

**5. API is running at**
```
http://localhost:5000
```

---

## 🔒 How RBAC Works

```
User Login → JWT Token Generated (role embedded)
     ↓
Every API Request → Auth Middleware (verifies token)
     ↓
RBAC Middleware → Checks user role
     ↓
Admin  → Full access (CRUD, reports, role management)
HR     → View employees, approve leaves, add reviews
Employee → Own profile, apply leave, attendance, salary
```

---

## 🌍 Deployment

| Service | Platform |
|---------|----------|
| Backend API | Render.com |
| Database | Railway MongoDB |

---

## 👨💻 Developer

**Yogesh Pothugunta**
- 📧 yogeshpothugunta07@gmail.com
- 🔗 [LinkedIn](https://www.linkedin.com/in/yogesh-pothugunta-9a9a13403)
- 🐙 [GitHub](https://github.com/yogesh-pothugunta)

---

## 🔗 Related Repository

- 🎨 Frontend: [ems-frontend](https://github.com/yogesh-pothugunta/ems-frontend)
- 🌐 Live App: [https://ems-frontend-b5hv.vercel.app](https://ems-frontend-b5hv.vercel.app)

---
