# 🚀 ERP System (Laravel + React)

A modern full-stack ERP system built with **Laravel (API)** and **React (Frontend)**.
This project demonstrates authentication, CRUD operations, reusable UI components, and a scalable architecture.

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

* Login system using API
* Token-based authentication (Sanctum)
* Protected routes

### 👤 Customer Management

* Create Customer
* View Customer List
* Update Customer
* Delete Customer (with custom modal)

### 🎨 UI/UX

* Professional dashboard layout
* Sidebar navigation
* Tailwind-based responsive UI
* Toast notifications (create/update/delete)
* Custom confirmation modal (no browser alerts)

### ⚙️ Architecture

* Feature-based folder structure
* Reusable components
* API layer separation
* Scalable codebase

---

## 📂 Project Structure

```
Frontend/
│── src/
│   ├── api/                # Axios setup
│   ├── components/ui/     # Reusable UI components (Modal, etc.)
│   ├── features/
│   │   ├── auth/
│   │   ├── customers/
│   ├── layouts/
│   ├── routes/
│   ├── pages/
│   └── App.tsx
```

---

## ⚡ Installation & Setup

### 🔹 Clone Repository

```bash
git clone https://github.com/your-username/erp-system.git
cd erp-system
```

---

### 🔹 Backend Setup (Laravel)

```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

---

### 🔹 Frontend Setup (React)

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

### Backend (.env)

```
APP_URL=http://127.0.0.1:8000
```

### Frontend

Set API base URL inside:

```
src/api/client.ts
```

---

## 🔌 API Endpoints

### Auth

* `POST /api/login`

### Customers

* `GET /api/customers`
* `POST /api/customers`
* `PUT /api/customers/{id}`
* `DELETE /api/customers/{id}`

---

## 🧪 Demo Credentials

```
Email: test@example.com
Password: password
```

*(Update based on your seed data)*

---

## 📸 Screenshots

* Login Page
* Dashboard
* Customer List
* Create/Edit Form

---

## 🚀 Future Improvements

* Search & Filtering
* Pagination
* Role-based access control
* Dashboard analytics
* Export (Excel/PDF)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Divyesh Lunagariya**

* 📧 [divyeshlunagariya149@gmail.com](mailto:divyeshlunagariya149@gmail.com)
* 📱 +91 7016697110

---

## ⭐ If you like this project

Give it a ⭐ on GitHub!