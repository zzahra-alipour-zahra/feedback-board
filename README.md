# 📦 Feedback Board (Fullstack Project)

A simple, lightweight fullstack feedback management system. Users can submit their feedback, and administrators can manage, search, and update the status of the feedback via a protected dashboard.

## 🚀 Features

- **User Side:** Submit feedback (title & message) via a simple UI form.
- **Admin Side:**
  - JWT Authentication login.
  - View, search, and filter feedbacks by status.
  - Pagination (page/limit).
  - Update feedback status (`SUBMITTED`, `IN_REVIEW`, `RESOLVED`).

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js, JWT, Joi (Validation)
- **Database & ORM:** PostgreSQL, Prisma ORM
- **Frontend:** Vanilla JavaScript, TailwindCSS, HTML
- **Infrastructure:** Docker & Docker Compose

---

## 🛠️ Installation & Setup

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
# For Local Development
# DATABASE_URL="postgresql://postgres:postgres@localhost:5432/feedbackdb"

# For Docker
DATABASE_URL="postgresql://postgres:postgres@feedback-db:5432/feedbackdb"

JWT_SECRET="your_secret_key"
PORT=3001
```

### 2. Run with Docker (Recommended)

Build the containers and run the database migrations and seed script:

```bash
docker compose up -d --build
docker exec -it feedback-backend npx prisma migrate dev --name init
docker exec -it feedback-backend npx prisma generate
docker exec -it feedback-backend node src/seed.js
```

_Note: The seed script creates the default admin user (`username: admin` | `password: 1234`)._

### 3. Run Locally (Without Docker)

```bash
npm install
npx prisma migrate dev --name init
node src/seed.js
npm run dev
```

---

## 🌐 Application URLs

Once the application is running, you can access the following pages:

| Page                | URL                                | Credentials / Notes |
| ------------------- | ---------------------------------- | ------------------- |
| **User Feedback**   | `http://localhost:3001/`           | Public              |
| **Admin Login**     | `http://localhost:3001/login.html` | `admin` / `1234`    |
| **Admin Dashboard** | `http://localhost:3001/admin.html` | Requires Login      |

---

## 📬 API Reference

| Method  | Endpoint                        | Description         | Auth Required          |
| ------- | ------------------------------- | ------------------- | ---------------------- |
| `POST`  | `/auth/login`                   | Admin login         | No                     |
| `POST`  | `/feedback`                     | Submit new feedback | No                     |
| `GET`   | `/feedback/admin/feedbacks`     | Get all feedbacks   | **Yes** (Bearer Token) |
| `PATCH` | `/feedback/admin/feedbacks/:id` | Update status       | **Yes** (Bearer Token) |

_A Postman collection (`feedback-board.postman_collection`) is included in the `postman/` folder._

---

## 📁 Project Structure

```text
├── src/
│   ├── app.js, seed.js
│   ├── routes/, controllers/, middleware/, validations/, services/, utils/, db/
├── public/
│   ├── index.html, login.html, admin.html, js/
├── postman/
└── docker-compose.yml
```

---

## ⚠️ Troubleshooting & Common Issues

- **500 Internal Server Error / DB Issues:**
  Ensure your database is synced and generated. Run:
  `npx prisma db push`, `npx prisma generate`, and `node src/seed.js` (inside the docker container if using Docker).
- **Cannot update status on Frontend:**
  Check if the `updateStatus` function is globally available in your JS file and the JWT token is present in `localStorage`.

---

## 🧠 Design Decisions & Notes

- **Express & Vanilla JS:** Chosen for simplicity and lightweight architecture.
- **Prisma + PostgreSQL:** Provides type-safe database access and reliable relational data management.
- **JWT:** Stateless authentication mechanism for protecting admin routes.
- **Future Improvements:** Swagger documentation, Rate limiting, Auto-seed on Docker startup, and migrating the frontend to React/Vue.

---

## 📷 Screenshots

### Home Page

![Home Page](./screenshots/home-page.png)

### Login Page

![Login Page](./screenshots/login-page.png)

### Admin Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)

### Search

![Search](./screenshots/search.png)

### Filter

![Search](./screenshots/filter.png)

### Update Status

![Update Status](./screenshots/update-status.png)

