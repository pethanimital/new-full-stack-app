# MERN Full-Stack Application

A modern web application built with **MongoDB**, **Next.js**, **React**, and **Node.js**. Features authentication, role-based access control, admin dashboard, and responsive UI.

## Features

- Authentication: User registration, login, Google OAuth, password reset
- Admin Dashboard: User management, audit logs, role management
- User Features: Profiles, dashboard, settings, posts management
- Modern UI: Responsive design with Tailwind CSS and TypeScript

## Tech Stack

- Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS
- Backend: Next.js API Routes, Node.js
- Database: MongoDB with Mongoose ODM
- Authentication: NextAuth.js with Google OAuth

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/pethanimital/new-full-stack-app.git
   cd new-full-stack-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables

   Create a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open your browser

   Navigate to [http://localhost:3000](http://localhost:3000)


---

# Stock Market Prediction App

## How to run the application locally

1. Clone the repository:
```
git clone https://github.com/pethanimital/new-full-stack-app.git
cd new-full-stack-app
```

2. Install dependencies:
```
npm install
```

3. Create a `.env.local` file in the root directory and add:
```
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Start the development server:
```
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Dataset Format and Usage

The historical stock data is stored in `data/historicData.json` in the format:

```json
[
  { "day": 1, "price": 120 },
  { "day": 2, "price": 125 },
  ...
]
```

This data is used to train the Brain.js model.

---

## Model Logic

- A **Brain.js feedforward neural network** is used.
- The model is trained on historical price data to predict the next day's price.
- The predicted result is visualized using Chart.js.

---

## Third-Party Libraries Used

- `react`
- `next`
- `brain.js`
- `chart.js`
- `next-auth`
- `mongodb`
- `bcryptjs`
- `tailwindcss`

---

## Deployed Version

Live Link: https://new-full-stack-app-kcvv.vercel.app  
GitHub Repo: https://github.com/pethanimital/new-full-stack-app
