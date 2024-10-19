# Educational Platefore

## Description

**Educational Platefore** is a comprehensive API-based platform designed to enhance teaching and learning experiences. Built using NestJS, MySQL, TypeORM, and JWT for authentication, this project provides a robust back-end system for managing educational resources, including courses, assignments, attendance, and more. Swagger has been integrated for API documentation, making it easy for developers to explore and integrate with the API.

---

## Key Features

- **User Authentication & Authorization**: Secure access using JWT.
- **Course Management**: CRUD operations for courses and their materials.
- **Assignments & Submissions**: Manage assignments and track submissions.
- **Lecture & Attendance**: Track lectures and student attendance.
- **Learning Modules**: Includes quizzes, feedback, and interactive assignments.
- **API Documentation**: Swagger documentation for seamless API exploration.

---

## Tech Stack

- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: MySQL
- **ORM**: [TypeORM](https://typeorm.io/)
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: [Swagger](https://swagger.io/)

---

## Installation

  ```bash
  npm install
  ```

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14.x or later)
- [MySQL](https://www.mysql.com/) (v8.x or later)
- [NestJS CLI](https://nestjs.com/)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/educational-platefore.git
   cd educational-platefore

   Create a .env file with the following environment variables:

2. **Create a .env file with the following environment variables:**
  ```bash
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=education_platform
  JWT_SECRET=your_jwt_secret_key
  ```

3. **Run MySQL and create the database:**
  - You will find the database sql file in the root directory.


4. **Start the server:**

  ```bash
  npm run start
  ```

Access Swagger documentation: Navigate to http://localhost:3000/api-docs to explore the API using Swagger.

![educational platform apis](https://github.com/user-attachments/assets/2ba6d901-83d6-4b7b-bc55-7539ce87ee11)
