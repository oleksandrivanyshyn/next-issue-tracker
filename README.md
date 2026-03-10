
# 🐞 Next Issue Tracker

A full-stack, production-ready issue tracking application designed for managing software bugs and project tasks. Built with the **Next.js App Router**, it features secure authentication, interactive dashboard analytics.

🔗 **Live Demo:** [Open App (Vercel)](https://next-issue-tracker-taupe.vercel.app/) 

## 🛠 Tech Stack

**Frontend & Framework:**
- **Next.js** (React Framework with App Router)
- **TypeScript** (End-to-end type safety)
- **Tailwind CSS** (Utility-first styling)
- **React Query** (Client-side data fetching and state)

**Backend & Data:**
- **Next.js API Routes** (Serverless backend)
- **Prisma** (Next-generation ORM)
- **PostgreSQL / MySQL** (Relational Database via Prisma)
- **NextAuth.js** (Authentication and session management)/route.ts]

**Validation & Observability:**
- **Zod** (Schema validation for API requests and forms)
- **Sentry** (Performance and error tracking)

---

## 🚀 Getting Started

Follow these steps to set up the full-stack application locally.

### 🛠️ Local Development Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/oleksandrivanyshyn/next-issue-tracker.git](https://github.com/oleksandrivanyshyn/next-issue-tracker.git)
cd next-issue-tracker

```

2. **Install dependencies:**

```bash
npm install

```

3. **Set up environment variables:**
Create a `.env` file in the root directory. You will need to configure your database connection, NextAuth secrets, and Sentry credentials:

```env
DATABASE_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

```

4. **Initialize the Database:**
Apply Prisma migrations to set up your database schema and generate prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

5. **Run the development server:**

```bash
npm run dev

```

6. **Access the App:**

* Open [http://localhost:3000](https://localhost:3000) in your browser.

---

## 📂 Project Highlights

### ✅ Architecture & Data Integrity

* **Full-Stack Next.js:** Seamlessly combines server-side rendering (SSR), API routes, and client-side interactivity in a single codebase.
* **Type-Safe ORM:** Uses Prisma to ensure that database queries are fully typed from the backend all the way to the frontend React components.
* **Robust Validation:** Implements strict data validation on both the client (forms) and server (API) using predefined schemas.

### 🖼 Features

* **Interactive Dashboard:** View project health at a glance with graphical issue summaries and charts tracking Open, In Progress, and Closed tasks.
* **Comprehensive Issue Management:** Full CRUD capabilities to create new issues, edit details, delete, and explicitly assign tasks to registered users.
* **Dynamic Table & Filtering:** Easily navigate large amounts of data using built-in pagination and status filters (Open/In Progress/Closed).
* **Production Observability:** Fully integrated with Sentry for real-time error logging and performance monitoring on both the edge and server.


Would you like me to suggest some GitHub Topics (tags) to go along with this one?
