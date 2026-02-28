-- HOUSECONNECT PRO / LIVE SUPABASE DATABASE SCHEMA
-- TIMESTAMP: 2026-03-01
-- This schema represents the ACTUAL state of the project: eevlrtkfrpppxipvbcuk

-- 1. USERS TABLE
CREATE TABLE public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text,
  role text DEFAULT 'homeowner'::text,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. CONTRACTORS TABLE
CREATE TABLE public.contractors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  service text NOT NULL,
  location text,
  rating numeric DEFAULT 0,
  reviews integer DEFAULT 0,
  price text,
  image text,
  description text,
  verified boolean DEFAULT false,
  available boolean DEFAULT true,
  completed_jobs integer DEFAULT 0,
  response_time text,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. JOBS TABLE
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id),
  title text,
  service text NOT NULL,
  description text,
  location text,
  budget text,
  status text DEFAULT 'open'::text,
  created_at timestamp with time zone DEFAULT now()
);

-- 4. BOOKINGS TABLE
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id),
  contractor_id uuid REFERENCES public.contractors(id),
  job_id uuid REFERENCES public.jobs(id),
  date date NOT NULL,
  time text,
  status text DEFAULT 'upcoming'::text,
  price integer DEFAULT 0,
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

-- 5. DISPUTES TABLE
CREATE TABLE public.disputes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id),
  booking_id uuid REFERENCES public.bookings(id),
  name text,
  email text,
  type text NOT NULL,
  description text NOT NULL,
  status text DEFAULT 'In Review'::text,
  created_at timestamp with time zone DEFAULT now()
);
