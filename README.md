# ERP System (Laravel + React + Docker)

A modern ERP system built using **Laravel API backend** and **React + TypeScript frontend** with Docker support.

---

# 🚀 Features

## 🔐 Authentication
- Login system
- Protected routes
- Auto logout on browser close
- Auto logout after inactivity

---

## 👥 Customer Management
- Create customer
- Edit customer
- Delete customer
- Search customers
- Pagination
- Export CSV
- Form validation
- Toast notifications
- Confirmation modal

---

## 🏢 Supplier Management
- Create supplier
- Edit supplier
- Delete supplier
- Search suppliers
- Pagination
- Form validation
- Toast notifications
- Confirmation modal

---

# 🎨 Frontend Features
- React + TypeScript
- Tailwind CSS UI
- React Hook Form
- Zod validation
- Responsive layout
- Reusable modal component
- Protected routes
- Loading states
- Debounced search

---

# ⚙️ Backend Features
- Laravel REST APIs
- API Resource routes
- Pagination APIs
- Validation
- Seeders
- MySQL database
- Docker support

---

# 🐳 Docker Setup

## Services
- Laravel Backend
- React Frontend
- MySQL
- phpMyAdmin

---

# 📦 Tech Stack

## Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- React Router
- React Hook Form
- Zod
- React Hot Toast

## Backend
- Laravel
- Sanctum
- MySQL

## DevOps
- Docker
- Docker Compose

---

# 📁 Project Structure

```bash
erp_system/
│
├── Backend/
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── Dockerfile
│
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   ├── components/
│   │   ├── layouts/
│   │   └── routes/
│   └── Dockerfile
│
└── docker-compose.yml
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

# 🐳 Run with Docker

## Start Containers

```bash
docker compose up --build
```

## Run in Background

```bash
docker compose up -d
```

---

# 🌐 Access URLs

| Service | URL |
|---|---|
| React Frontend | http://localhost:5173 |
| Laravel API | http://localhost:8000 |
| phpMyAdmin | http://localhost:8080 |

---

# 🔑 phpMyAdmin Login

| Field | Value |
|---|---|
| Server | mysql |
| Username | root |
| Password | root |

---

# ⚙️ Laravel Setup

## Enter Backend Container

```bash
docker exec -it laravel_backend bash
```

---

## Run Migration

```bash
php artisan migrate
```

---

## Seed Admin User

```bash
php artisan db:seed
```

---

# 👤 Admin Credentials

| Email | Password |
|---|---|
| admin@gmail.com | admin 

---

# 📌 Environment Variables

## Backend `.env`

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=erp_system
DB_USERNAME=root
DB_PASSWORD=root
```

---

# 🧠 Concepts Implemented

- CRUD Operations
- REST APIs
- Form Validation
- Authentication
- Protected Routes
- Pagination
- Search
- Debouncing
- Docker Containers
- API Integration
- Reusable Components
- Loading States
- Confirmation Modals

---

# 🚀 Future Improvements

- Dashboard with charts
- Role & Permission system
- React Query
- Inventory module
- Purchase orders
- File upload
- Excel/PDF export
- Reusable table components
- Deployment setup

---

# 👨‍💻 Author

Divyesh Lunagariya

```