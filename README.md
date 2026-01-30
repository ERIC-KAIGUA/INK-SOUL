# Tattoo Studio Client Portal

A modern, frontend-only React application simulating a personalized client portal for an independent tattoo artist.

Built as a portfolio project to demonstrate clean React architecture, state persistence, responsive UI/UX, and real-world feature implementation — all without any backend.

For Future improvements, a backend can be a backend can be integrated with real API integration, authentication, admin panel etc...

### Live Demo
🔗 [https://your-username.github.io/tattoo-client-portal] (replace with your actual Vercel/Netlify link)

### Features
- **Personalized Dashboard**  
  Welcome message, next appointment summary, unread messages count, and quick action cards (Book, Inbox, Portfolio, Profile).

- **Direct Chat Inbox**  
  Real-time-feeling conversation thread with the artist  
  - Client ↔ Artist message bubbles  
  - Auto-scroll, timestamps, unread/read status  
  - Simulated artist replies for demo purposes  
  - Persisted across sessions via localStorage

- **Booking System**  
  Multi-step appointment flow:  
  - Select date/time from availability-aware calendar  
  - Enter tattoo details (description, size, placement, notes)  
  - Confirmation screen + auto-added to bookings list  
  - Upcoming & past bookings displayed on dashboard

- **Portfolio Gallery**  
  Responsive image grid showcasing the artist's work (local assets)

- **User Profile**  
  Edit name, contact info, preferred tattoo styles — saved locally

### Tech Stack
- React (Vite / CRA) + React Router  
- Custom hooks for localStorage persistence (`usePersistedUser`, `usePersistedMessages`, `useBookings`)  
- Tailwind CSS (or styled-components / CSS modules) for dark, moody theme  
- date-fns for formatting dates/times  
- Framer Motion (optional) for subtle animations  
- Fully responsive (mobile-first design)

### Key Learnings & Showcased Skills
- Complex local state management without Redux  
- Persistent data across routes/sessions  
- Dynamic, interactive UI patterns (chat, calendar, forms, cards)  
- Clean component architecture & custom hooks  
- Real-world UX details (auto-scroll, unread indicators, empty states, success feedback)

### Running Locally
```bash
git clone https://github.com/your-username/tattoo-client-portal.git
cd tattoo-client-portal
npm install
npm run dev
