-- 001_create_tables.sql
-- Create main tables for Supabase/Postgres migration

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hotline_numbers (
    id SERIAL PRIMARY KEY,
    service VARCHAR(100) NOT NULL,
    number VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP DEFAULT NOW(),
    author_id uuid REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP DEFAULT NOW(),
    author_id uuid REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS gallery_images (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    description TEXT,
    uploaded_at TIMESTAMP DEFAULT NOW(),
    uploader_id uuid REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS volunteer_applications (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS incident_reports (
    id SERIAL PRIMARY KEY,
    reporter_id uuid REFERENCES users(id),
    description TEXT NOT NULL,
    incident_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'open',
    created_at TIMESTAMP DEFAULT NOW()
);
