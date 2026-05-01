# 🚀 ERP System (Laravel + React)

A modern full-stack ERP system built with **Laravel (API)** and **React (Vite + TypeScript)**.
This project demonstrates real-world architecture including authentication, CRUD operations, search, pagination, reusable UI components, and session management.

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React (Vite + TypeScript)
* React Router
* React Hook Form + Zod
* Tailwind CSS
* Axios
* React Hot Toast

### 🔹 Backend

* Laravel
* Laravel Sanctum (Authentication)
* REST API

---

## ✨ Features

### 🔐 Authentication

* Login using API
* Token-based authentication (Sanctum)
* Protected routes
* Auto logout when browser is closed
* Auto logout after **3 minutes of inactivity**

---

### 👤 Customer Management

* Create Customer
* View Customer List
* Update Customer
* Delete Customer (custom modal popup)
* Serial number instead of DB ID

---

### 🔍 Search & Pagination

* Search by name, email, or phone
* Server-side pagination
* Page navigation (Prev / Next / Page numbers)

---

### 🎨 UI/UX

* Professional admin dashboard layout
* Sidebar navigation
* Tailwind CSS responsive UI
* Toast notifications (create / update / delete)
* Custom confirmation modal (no browser alerts)
* Smooth search without losing input focus

---

### ⚙️ Architecture

* Feature-based folder structure
* Reusable components (Modal, UI elements)
* API layer separation
* Scalable and maintainable code

---

## 📂 Project Structure

```id="proj-struct"
Frontend/
│── src/
│   ├── api/                 # Axios client & APIs
│   ├── components/ui/       # Reusable UI components (Modal, etc.)
│   ├── features/
│   │   ├── auth/
│   │   ├── customers/
│   │   │   ├── api/
│   │   │   ├── pages/
│   │   │   └── types.ts
│   ├── hooks/               # Custom hooks (idle logout)
│   ├── layouts/
│   ├── routes/
│   └── App.tsx
```

---

## ⚡ Installation & Setup

### 🔹 Clone Repository

```bash id="clone"
git clone https://github.com/your-username/erp-system.git
cd erp-system
```

---

### 🔹 Backend Setup (Laravel)

```bash id="backend"
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

---

### 🔹 Frontend Setup (React)

```bash id="frontend"
cd Frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (.env)

```id="env-backend"
APP_URL=http://127.0.0.1:8000
```

### Frontend

Update API base URL in:

```id="env-frontend"
src/api/client.ts
```

---

## 🔌 API Endpoints

### Auth

* `POST /api/login`

### Customers

* `GET /api/customers?page=1&search=abc`
* `POST /api/customers`
* `PUT /api/customers/{id}`
* `DELETE /api/customers/{id}`

---

## 🧠 Key Concepts Implemented

* Debounced search (optimized API calls)
* Server-side pagination
* Token-based session handling
* Idle session timeout
* Reusable UI components
* Clean architecture

---

## 🚀 Future Improvements

* Dashboard analytics (charts & stats)
* Role-based access control (Admin/User)
* File upload (documents/images)
* Export data (Excel / CSV)
* Import data (bulk upload)
* Notifications system
* Deployment

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 👨‍💻 Author

**Divyesh Lunagariya**

* 📧 [divyeshlunagariya149@gmail.com](mailto:divyeshlunagariya149@gmail.com)
* 📱 +91 7016697110

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!
