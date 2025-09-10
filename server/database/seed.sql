-- Users table (Freelancer/Agency Only)
CREATE TABLE IF NOT EXISTS users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'agency' CHECK (role = 'agency'),  -- only agencies/freelancers
  profile_picture TEXT,       -- optional URL to profile picture
  bio TEXT,                   -- optional bio
  website TEXT,               -- optional personal/company website
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Clients table (linked to agency/freelancer)
CREATE TABLE IF NOT EXISTS clients (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  agency_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  company_name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  agency_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'on_hold')),
  priority TEXT NOT NULL CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')) DEFAULT 'MEDIUM',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  amount NUMERIC(12, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'paid', 'overdue')),
  description TEXT,            -- description of invoice items
  due_date DATE,
  sent_at TIMESTAMPTZ,        -- when invoice was sent
  paid_at TIMESTAMPTZ,        -- when invoice was paid
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Optional: dashboard stats table (if you want to precompute metrics)
CREATE TABLE IF NOT EXISTS dashboard_stats (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  agency_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_projects INT DEFAULT 0,
  total_clients INT DEFAULT 0,
  total_revenue NUMERIC(12, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
