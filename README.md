# HouseConnect Pro · Team NodeX

![Live on Vercel](https://img.shields.io/badge/Live-Vercel-black?logo=vercel)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ECF8E?logo=supabase&logoColor=white)
![Gemini AI](https://img.shields.io/badge/AI-Gemini_1.5_Flash-8E75B2)
![Status](https://img.shields.io/badge/Status-Hackathon%20Build-orange)

**Live Website:** https://pih-2026-node-x.vercel.app/

HouseConnect Pro is a modern India-first home services marketplace that helps homeowners find trusted local professionals in minutes.
From plumbing emergencies to electrical work, cleaning, HVAC, painting, and landscaping — the platform is built around speed, trust, and a clean booking flow.

---

## Why this project exists

The home services market is huge, but still messy in many places:
- trust is inconsistent,
- response time is unpredictable,
- and quality varies wildly.

We built HouseConnect Pro to solve this with a practical product loop:
1. Discover verified professionals,
2. Book quickly with clear details,
3. Track and manage jobs,
4. Raise disputes when something goes wrong,
5. Use AI assistance to reduce friction while posting jobs.

---

## Core features

- **Contractor discovery** by service, rating, location, availability, and verification.
- **Job posting flow** with AI-powered description generation (`/api/gemini/generate-desc`).
- **Booking system** with slot-conflict checks to prevent double booking.
- **Dispute management** for refund/quality/no-show/payment/other cases.
- **In-app AI assistant** (`/api/gemini/chat`) with live Supabase-backed context.
- **Responsive marketing + product pages** for home, contractors, bookings, disputes, legal pages, and auth page shell.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js App Router + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (Neo-Brutalist inspired UI direction) |
| Backend | Next.js Route Handlers (`app/api/**`) |
| Data | Supabase (PostgreSQL + RLS policies) |
| AI | Google Gemini (`@google/generative-ai`) + fallback responses |
| Deployment | Vercel |

---

## Project architecture

### High-level flow

`UI Pages` → `Next.js API Routes` → `Supabase Tables`

- UI collects user actions (browse, post, book, dispute, chat)
- Route handlers validate + normalize payloads
- Supabase stores entities and returns relational data
- Gemini routes add AI support for writing and conversational help

---

## Folder structure (important paths)

```text
PIH2026_NodeX/
├─ app/
│  ├─ page.tsx                      # Home (Hero, Stats, Services, Impact, HowItWorks, Testimonials)
│  ├─ contractors/page.tsx          # Browse professionals
│  ├─ contractors/[id]/page.tsx     # Contractor detail view
│  ├─ post-job/page.tsx             # Job posting form
│  ├─ bookings/page.tsx             # Booking management
│  ├─ disputes/page.tsx             # Dispute form/list page
│  ├─ login/page.tsx                # Login UI shell
│  ├─ about|careers|privacy|terms   # Informational/legal pages
│  └─ api/
│     ├─ contractors/route.ts       # GET contractors (+service filter)
│     ├─ jobs/route.ts              # POST jobs
│     ├─ bookings/route.ts          # GET bookings, POST booking
│     ├─ disputes/route.ts          # GET disputes, POST dispute
│     └─ gemini/
│        ├─ generate-desc/route.ts  # AI job description generator
│        └─ chat/route.ts           # AI assistant with DB context
├─ components/
│  ├─ home/                         # Landing sections
│  ├─ contractors/                  # Contractor listing + booking modal
│  ├─ bookings/                     # Booking card + review modal
│  ├─ disputes/                     # Dispute card
│  ├─ ui/                           # Shared chatbot/modal/toast
│  ├─ NavBar.tsx
│  └─ Footer.tsx
├─ lib/
│  ├─ supabaseClient.ts             # Shared Supabase client
│  ├─ utils.ts                      # normalizeText / validators
│  └─ seedContractors.ts
├─ types/
│  ├─ api.ts                        # Request payload types
│  ├─ db.ts
│  └─ index.ts
├─ supabase_schema.sql              # Tables, policies, and seed data
└─ README.md
```

---

## API reference

### `GET /api/contractors`
- Returns all contractors.
- Supports optional `?service=<value>` filter.

### `POST /api/jobs`
- Creates a new job post.
- Validates required fields: service/category, description, location.

### `GET /api/bookings`
- Returns bookings with contractor relation (name, image).

### `POST /api/bookings`
- Creates booking after validation.
- Includes slot collision prevention for same contractor/date/time.
- Marks contractor unavailable when booking is upcoming/pending.

### `GET /api/disputes`
- Returns disputes with booking + contractor relation.

### `POST /api/disputes`
- Creates dispute with strict type/email/description validation.
- Allowed types: `refund`, `quality`, `noshow`, `payment`, `other`.

### `POST /api/gemini/generate-desc`
- Generates short professional job description.
- Falls back to local template if `GEMINI_API_KEY` is absent.

### `POST /api/gemini/chat`
- Contextual assistant for HouseConnect Pro FAQs + contractor discovery.
- Pulls live context from Supabase and answers within product scope.

---

## Database model snapshot

From `supabase_schema.sql`, key tables are:
- `users`
- `contractors`
- `jobs`
- `bookings`
- `disputes`

RLS is enabled, and current policies are intentionally hackathon-friendly for rapid demo flow (public reads and open inserts for select tables).

---

## Local setup

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key_optional
```

> `GEMINI_API_KEY` is optional. If missing, AI routes still work with fallback behavior.

### 3) Run development server

```bash
npm run dev
```

Open: `http://localhost:3000`

---

## Available scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run start     # start production server
npm run lint      # run ESLint
npm run lint:fix  # fix lint issues
npm run format    # run Prettier
```

---

## Design + UX notes

- The product language is intentionally simple, direct, and trust-focused.
- Theme direction reflects a bold, neo-brutalist visual identity while keeping functional readability.
- Interaction model prioritizes “book in minutes” behavior over heavy navigation depth.

---

## Deployment

The app is deployed on Vercel:

**https://pih-2026-node-x.vercel.app/**

For production setup, ensure Vercel environment variables match `.env.local` keys.

---

## Team & hackathon context

- **Team:** NodeX
- **Hackathon:** PIH 2026
- **Hackathon ID:** JVP008
- **Base location:** Sakoli, Bhandara, Maharashtra

---

## Future improvements

- Add auth-bound private data policies for stronger access control.
- Introduce booking lifecycle notifications (email/SMS/WhatsApp).
- Add richer analytics dashboards for contractor and platform performance.
- Expand payment flow from demo mode to full verified production pipeline.

---

## Final note

Built with purpose for real-world service chaos — HouseConnect Pro aims to make “finding the right professional” feel as easy as ordering food.
