# MERN Full-Stack Application

A modern web application built with **MongoDB**, **Next.js**, **React**, and **Node.js**. Features authentication, role-based access control, admin dashboard, and responsive UI.

## 🚀 Features

- **Authentication**: User registration, login, Google OAuth, password reset
- **Admin Dashboard**: User management, audit logs, role management
- **User Features**: Profiles, dashboard, settings, posts management
- **Modern UI**: Responsive design with Tailwind CSS and TypeScript

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with Google OAuth

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Neha1914/full-stack-app.git
   cd full-stack-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using Next.js, React, MongoDB, and TypeScript** 