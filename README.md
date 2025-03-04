# **Food Ordering Service**

**Website Link**: https://food-order-front.onrender.com

## 📌 Overview
Food Ordering Service is a full-stack web application designed to make ordering your favorite meals fast and convenient. With a user-friendly interface and a robust backend, users can browse a diverse menu, manage their cart, and place orders effortlessly. Administrators can securely manage products, orders, and users via a dedicated admin panel.

🚀 **Note:** This project is actively maintained and open-source.

## 🔧 Features
- **User Authentication:**
  - Secure registration and login with password hashing.
  - Optional two-factor authentication (2FA) using Google Authenticator.
- **Menu & Order Management:**
  - Browse an extensive menu with detailed product information, images, and categories.
  - Add products to your cart, update quantities, and remove items.
  - Place orders with detailed shipping information and real-time order tracking.
- **Admin Panel:**
  - Log in using the same authentication system.
  - Manage products: add, update, and delete dishes.
  - View all orders with comprehensive details (delivery status shown as icons, shipping address, order items, total price, and creation date).
  - View and manage all registered users.

## 📁 Project Structure
- `client/` – React frontend application.
- `server/` – Node.js/Express backend application.
  - `controllers/` – Business logic for API requests.
  - `models/` – Mongoose models (User, Product, Cart, Order).
  - `routes/` – API route definitions (auth, cart, order, admin, etc.).
  - `tests/` – Backend tests (using Jest, Supertest, and mongodb-memory-server).
  - `db/` – Database connection configuration.
- `.env` – Environment variables configuration.
