-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CONTRACTORS TABLE
CREATE TABLE contractors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  service TEXT NOT NULL,
  rating NUMERIC(3, 1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  price TEXT,
  image TEXT,
  available BOOLEAN DEFAULT TRUE,
  verified BOOLEAN DEFAULT FALSE,
  location TEXT,
  response_time TEXT,
  completed_jobs INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- JOBS TABLE
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  urgency TEXT NOT NULL,
  budget_min INTEGER,
  budget_max INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BOOKINGS TABLE
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  contractor_id INTEGER REFERENCES contractors(id),
  date DATE NOT NULL,
  time TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'upcoming', -- upcoming, completed, pending, cancelled
  price INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DISPUTES TABLE
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id),
  name TEXT,
  email TEXT,
  type TEXT NOT NULL, -- refund, quality, noshow, payment, other
  description TEXT NOT NULL,
  status TEXT DEFAULT 'In Review', -- In Review, Resolved, Rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================
-- RLS POLICIES
-- ============================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

-- Users can read/write their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Contractors are public (read-only + anonymous insert for demo)
CREATE POLICY "Contractors are public" ON contractors FOR SELECT USING (true);
CREATE POLICY "Anyone can insert contractors" ON contractors FOR INSERT WITH CHECK (true);

-- Jobs: Public read + anonymous insert for demo
CREATE POLICY "Jobs are publicly readable" ON jobs FOR SELECT USING (true);
CREATE POLICY "Anyone can insert jobs" ON jobs FOR INSERT WITH CHECK (true);

-- Bookings: Public read + anonymous insert for demo
CREATE POLICY "Bookings are publicly readable" ON bookings FOR SELECT USING (true);
CREATE POLICY "Anyone can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update bookings" ON bookings FOR UPDATE USING (true);

-- Disputes: Public read + anonymous insert for demo
CREATE POLICY "Disputes are publicly readable" ON disputes FOR SELECT USING (true);
CREATE POLICY "Anyone can insert disputes" ON disputes FOR INSERT WITH CHECK (true);

-- ============================
-- SEED DATA: 15 Indian Contractors
-- ============================
INSERT INTO contractors (name, service, rating, reviews, price, image, available, verified, location, response_time, completed_jobs, description) VALUES
('Rajesh Kumar', 'Plumbing', 4.8, 142, '₹500/hr', '🔧', true, true, 'Mumbai, Maharashtra', '< 30 min', 287, 'Expert plumber with 12+ years of experience in residential and commercial repairs. Specializes in leak detection, pipe fitting, and water heater installations.'),
('Priya Sharma', 'Cleaning', 4.9, 203, '₹400/hr', '🧹', true, true, 'Delhi, NCR', '< 1 hr', 412, 'Professional deep cleaning expert. Provides eco-friendly home and office cleaning services with premium products. Trusted by 200+ families.'),
('Amit Patel', 'Electrical', 4.7, 98, '₹600/hr', '⚡', true, true, 'Bangalore, Karnataka', '< 45 min', 193, 'Licensed electrician with expertise in wiring, panel upgrades, smart home installations, and safety inspections. ISI certified.'),
('Sunita Reddy', 'Painting', 4.6, 76, '₹450/hr', '🎨', true, false, 'Hyderabad, Telangana', '< 2 hr', 148, 'Creative interior and exterior painting professional. Specializes in texture finishes, waterproofing, and decorative wall art.'),
('Vikram Singh', 'HVAC', 4.8, 115, '₹700/hr', '❄️', true, true, 'Pune, Maharashtra', '< 1 hr', 224, 'Certified HVAC technician specializing in split AC installation, VRF systems, and centralized air conditioning for offices.'),
('Deepa Nair', 'Cleaning', 4.7, 167, '₹350/hr', '✨', true, true, 'Chennai, Tamil Nadu', '< 30 min', 334, 'Premium housekeeping service provider. Expert in post-construction cleaning, sofa/carpet shampooing, and kitchen deep cleaning.'),
('Mohammed Irfan', 'Plumbing', 4.5, 89, '₹450/hr', '🚿', true, true, 'Kolkata, West Bengal', '< 1 hr', 176, 'Experienced plumber specializing in bathroom renovations, water purifier installations, and drainage solutions across Kolkata.'),
('Ananya Gupta', 'Landscaping', 4.9, 134, '₹550/hr', '🌿', true, true, 'Jaipur, Rajasthan', '< 2 hr', 267, 'Professional landscaper and garden designer. Creates beautiful terrace gardens, vertical gardens, and low-maintenance outdoor spaces.'),
('Karthik Menon', 'Electrical', 4.6, 72, '₹550/hr', '💡', false, true, 'Kochi, Kerala', '< 1 hr', 139, 'Expert in solar panel installations, inverter setups, and complete home electrical rewiring. Energy audit specialist.'),
('Lakshmi Iyer', 'HVAC', 4.4, 56, '₹650/hr', '🌡️', true, false, 'Coimbatore, Tamil Nadu', '< 3 hr', 98, 'HVAC specialist with focus on energy-efficient cooling solutions. Handles Daikin, Mitsubishi, and Blue Star systems.'),
('Ravi Teja', 'Painting', 4.8, 121, '₹500/hr', '🖌️', true, true, 'Visakhapatnam, Andhra Pradesh', '< 1 hr', 241, 'Professional painter with Asian Paints and Berger certified training. Expert in waterproofing, POP work, and wall textures.'),
('Neha Deshmukh', 'Cleaning', 4.5, 88, '₹380/hr', '🧼', true, true, 'Nagpur, Maharashtra', '< 45 min', 175, 'Affordable yet premium cleaning services. Specializes in move-in/move-out cleaning, pest control, and sanitization.'),
('Arjun Mehta', 'Landscaping', 4.7, 63, '₹600/hr', '🌳', true, true, 'Ahmedabad, Gujarat', '< 2 hr', 126, 'Landscape architect creating sustainable garden designs. Expertise in drip irrigation, lawn care, and rooftop farming.'),
('Pooja Bhatia', 'Electrical', 4.9, 156, '₹650/hr', '🔌', true, true, 'Chandigarh, Punjab', '< 30 min', 312, 'Top-rated electrician in Chandigarh. Specializes in home automation, CCTV installation, and modular switchboard fitting.'),
('Suresh Yadav', 'Plumbing', 4.3, 45, '₹400/hr', '🔩', true, false, 'Lucknow, Uttar Pradesh', '< 1 hr', 89, 'Reliable plumber for everyday fixes — leaky taps, clogged drains, toilet repairs, and geyser servicing at affordable rates.');

-- ============================
-- SEED DATA: Sample Jobs
-- ============================
INSERT INTO jobs (title, category, description, location, urgency, budget_min, budget_max) VALUES
('Kitchen Sink Repair', 'Plumbing', 'My kitchen sink is leaking from the base. Need urgent repair.', 'Mumbai, Maharashtra', 'urgent', 500, 2000),
('Living Room Painting', 'Painting', 'Need to repaint 3BHK living room and bedroom. Asian Paints preferred.', 'Delhi, NCR', 'flexible', 5000, 15000),
('AC Installation', 'HVAC', 'Install 2 split ACs (1.5 ton each) in new flat. Copper piping needed.', 'Bangalore, Karnataka', 'soon', 3000, 8000),
('Full House Deep Clean', 'Cleaning', 'Post-renovation deep cleaning for 2BHK apartment.', 'Pune, Maharashtra', 'soon', 2000, 5000),
('Terrace Garden Setup', 'Landscaping', 'Want to create a small terrace garden with potted plants and seating area.', 'Jaipur, Rajasthan', 'flexible', 8000, 20000);

-- ============================
-- SEED DATA: Sample Bookings
-- ============================
INSERT INTO bookings (contractor_id, date, time, status, price) VALUES
(1, '2026-03-05', 'Morning (9AM–12PM)', 'upcoming', 1500),
(2, '2026-03-03', 'Afternoon (12PM–5PM)', 'upcoming', 2400),
(5, '2026-02-25', 'Morning (9AM–12PM)', 'completed', 4200),
(3, '2026-03-07', 'Evening (5PM–8PM)', 'pending', 3600);

-- ============================
-- SEED DATA: Sample Disputes
-- ============================
INSERT INTO disputes (name, email, type, description, status) VALUES
('Rohit Verma', 'rohit.v@gmail.com', 'quality', 'The painting work was not up to mark. Several patches visible.', 'In Review'),
('Sneha Kapoor', 'sneha.k@yahoo.com', 'noshow', 'Contractor did not show up on the scheduled date.', 'Resolved');
