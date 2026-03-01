# HouseConnect Pro · Team NodeX

[![Live on Vercel](https://img.shields.io/badge/Live-Vercel-black?logo=vercel)](https://pih-2026-node-x.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-20232A?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/dashboard)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini_1.5_Flash-8E75B2)](https://ai.google.dev/)
[![Status](https://img.shields.io/badge/Status-Hackathon%20Build-orange)](#)

[![🚀 Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://pih-2026-node-x.vercel.app/)

---

## Overview

HouseConnect Pro is built to solve a very common real-world problem — finding reliable local service providers quickly and with confidence. Today, people often depend on random contacts, ads, or unverified listings, which leads to delays, poor service quality, and trust issues.

This platform brings everything into one place, allowing users to discover, compare, and book trusted local professionals within minutes. From urgent home repairs to everyday services like cleaning or maintenance, HouseConnect Pro focuses on speed, transparency, and a smooth, dependable experience.

---

## Why this project exists

Finding trusted help for everyday home services is still harder than it should be. People often struggle to identify reliable professionals, face unpredictable response times, and deal with inconsistent service quality.

There is no simple, unified system that ensures trust, transparency, and convenience in one place. This gap creates frustration for users who just want quick, dependable solutions without the risk of bad experiences.

We built HouseConnect Pro to solve this with a practical product loop:

1. Discover verified professionals  
2. Book quickly with clear details  
3. Track and manage jobs  
4. Raise disputes when something goes wrong  
5. Use AI assistance to reduce friction while posting jobs  

---

## Core features

- **Contractor discovery** by service, rating, location, availability, and verification  
- **Job posting flow** with AI-powered description generation (`/api/gemini/generate-desc`)  
- **Booking system** with slot-conflict checks to prevent double booking  
- **Dispute management** for refund/quality/no-show/payment/other cases  
- **In-app AI assistant** (`/api/gemini/chat`) with live Supabase-backed context  
- **Responsive marketing + product pages**  

---

## Tech stack

| Layer      | Technology                                                     |
| ---------- | -------------------------------------------------------------- |
| Frontend   | Next.js App Router + React 19 + TypeScript                     |
| Styling    | Tailwind CSS v4                                                |
| Backend    | Next.js Route Handlers (`app/api/**`)                          |
| Data       | Supabase (PostgreSQL + RLS policies)                           |
| AI         | Google Gemini (`@google/generative-ai`)                        |
| Deployment | Vercel                                                         |

---

## Project architecture

### High-level flow

`UI Pages` → `Next.js API Routes` → `Supabase Tables`

- UI handles user actions (browse, post, book, dispute, chat)  
- API routes validate and process data  
- Supabase stores and returns structured data  
- Gemini enhances experience with AI features  

---

## Folder structure

```text
PIH2026_NodeX/
├─ app/
│  ├─ page.tsx
│  ├─ contractors/
│  ├─ post-job/
│  ├─ bookings/
│  ├─ disputes/
│  ├─ login/
│  └─ api/
├─ components/
├─ lib/
├─ types/
├─ supabase_schema.sql
└─ README.md
```

## API reference

- `GET /api/contractors` → fetch contractors
- `POST /api/jobs` → create job
- `GET /api/bookings` → fetch bookings
- `POST /api/bookings` → create booking
- `GET /api/disputes` → fetch disputes
- `POST /api/disputes` → create dispute
- `POST /api/gemini/generate-desc` → AI description
- `POST /api/gemini/chat` → AI assistant

## Database model

**Tables used:**
- `users`
- `contractors`
- `jobs`
- `bookings`
- `disputes`

## Local setup

```bash
npm install
npm run dev
```

**Create .env.local:**
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
```

## Deployment

**Live at:**  
[https://pih-2026-node-x.vercel.app/](https://pih-2026-node-x.vercel.app/)

## Team & hackathon

- **Team:** NodeX
- **Hackathon:** PIH 2026
- **ID:** JVP008

## Future improvements

- Secure auth-based access control
- Notifications (email/SMS)
- Analytics dashboard
- Full payment integration
