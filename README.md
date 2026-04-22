# 📊 Expense Tracker

A minimal full-stack expense tracking application built with a focus on **correctness, reliability, and production-like behavior under real-world conditions**.

---

## 🚀 Live Demo

- Frontend: https://fenmo-assignment-five.vercel.app
- Backend: https://fenmo-assignment-4v21.onrender.com  

> ⚠️ Note: Backend is hosted on free tier and may take ~30 seconds to wake up.

---

## 🧰 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS

**Backend**
- Node.js + Express
- MongoDB (Mongoose)

**Testing**
- Jest + Supertest

---

## ✨ Features

- Add expenses (amount, category, description, date)
- View expense list
- Filter by category
- Sort by date (newest/oldest)
- Total expense calculation
- Category-wise breakdown
- Idempotent API (safe retries)
- Responsive UI with loading states

---

## 🧠 Key Design Decisions

### 1. Idempotent Expense Creation

To handle retries (e.g., double clicks, network issues), each request includes an `idempotencyKey`.

- Duplicate requests return the same existing record  
- Prevents duplicate expense entries  
- Simulates real-world backend robustness  

---

### 2. Money Stored in Smallest Unit (Paise)

Amount is stored as integer:

- Avoids floating point precision issues  
- Common practice in financial systems  

---

### 3. Backend Filtering & Sorting

Filtering and sorting are handled via API:
GET /expenses?category=Food&sort=desc


- Keeps frontend simple  
- Scales better than client-side filtering  

---

### 4. Database Choice

MongoDB was chosen for:

- Fast iteration  
- Flexible schema  
- Minimal setup overhead  

---

### 5. UI Design Philosophy

- Minimal and clean interface  
- Mobile-first responsive layout  
- Skeleton loaders for better perceived performance  
- Focus on clarity over visual complexity  

---

## ⚖️ Trade-offs (Timebox Decisions)

- No authentication system  
- No pagination (assumes small dataset)  
- Basic category input (free text instead of dropdown)  
- Minimal styling instead of full design system  
- No advanced caching or optimization  

---

## ❌ What Was Intentionally Not Done

- No user accounts / multi-user support  
- No edit/delete functionality  
- No offline support  
- No advanced analytics or charts  
- No complex state management (Redux, etc.)  

These were avoided to **prioritize correctness and core functionality**.

---

## 🧪 Testing

Basic tests implemented using Jest + Supertest:

- Idempotency behavior verified  
- Filtering and sorting validated  

Run tests:

```bash
npm run test
