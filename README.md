# 📋 Task Manager App

A full-stack task manager application built with:

- ⚛️ **React + TypeScript** (frontend)
- 🐍 **Flask + Python** (backend)
- 🐬 **MySQL** (database)

This app allows users to sign up, log in, manage their tasks and subtasks with a clean and responsive interface.

---

## 🚀 Features

- 🔐 User authentication using JWT
- 📝 Task CRUD (Create, Read, Update, Delete)
- 🧩 Subtasks (expand/collapse under parent tasks)
- 🔍 Filtering & search by status and title
- 🖥 Responsive UI (Table view for desktop, cards for mobile)
- ✅ Comments and organized codebase with components, context, and services

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
```

### 2. Backend Setup (Flask + MySQL)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

#### Database setup:

- Install MySQL
- Create the database:

```sql
CREATE DATABASE task_manager;
```

- Configure your credentials in `.env` (see `.env.example`):

```env
DATABASE_URL=mysql+mysqlconnector://root:YOUR_PASSWORD@localhost/task_manager
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
```

- Run the app:

```bash
python app.py
```

### 3. Frontend Setup (React + Vite + Tailwind)

```bash
cd ../frontend/task-manager-frontend
npm install
npm run dev
```

---

## 📡 API Documentation

### 🔐 Authentication

| Method | Endpoint  | Description           |
| ------ | --------- | --------------------- |
| POST   | `/signup` | Register new user     |
| POST   | `/login`  | Login and receive JWT |

### 📋 Tasks

| Method | Endpoint      | Description                   |
| ------ | ------------- | ----------------------------- |
| GET    | `/tasks`      | Get all tasks of current user |
| POST   | `/tasks`      | Create a new task             |
| PUT    | `/tasks/<id>` | Update a task                 |
| DELETE | `/tasks/<id>` | Delete a task                 |

### 🧩 Subtasks

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | `/tasks/<id>/subtasks` | Get subtasks of a task |
| POST   | `/tasks/<id>/subtasks` | Add subtask to a task  |

#### Example request (POST /tasks):

```json
{
  "title": "Create frontend",
  "description": "Build React UI",
  "status": "pending",
  "due_date": "2025-04-10"
}
```

#### Example response:

```json
{
  "message": "Task created successfully"
}
```

---

## 🧪 Testing Guide

> Currently no unit tests implemented.
> You can test API endpoints using Postman or Thunder Client.

---

## 🌐 Deployment

> App not deployed yet. (You can run it locally as shown above)

---

## 📎 Repository

[GitHub Repo](https://github.com/YOUR_USERNAME/task-manager)

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/` folder:

```env
DATABASE_URL=mysql+mysqlconnector://root:your_password@localhost/task_manager
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
```

You can refer to `backend/.env.example` as a template.
