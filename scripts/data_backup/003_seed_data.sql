-- 003_seed_data.sql
-- Seed initial data for Supabase/Postgres migration

-- Insert sample users
INSERT INTO users (email, password_hash, role) VALUES
('admin@pioduran.gov.ph', 'hashed_password_1', 'admin'),
('user1@pioduran.gov.ph', 'hashed_password_2', 'user');

-- Insert sample hotline numbers
INSERT INTO hotline_numbers (service, number, status) VALUES
('MDRRMO Emergency', '911 / (052) 234-5678', 'active'),
('Police', '117 / (052) 456-7890', 'active');

-- Insert sample announcements
INSERT INTO announcements (title, content, author_id) VALUES
('Welcome to MDRRMO Portal', 'This is the official portal for disaster risk reduction and management.', (SELECT id FROM users WHERE email='admin@pioduran.gov.ph'));

-- Insert sample news
INSERT INTO news (title, content, author_id) VALUES
('Typhoon Update', 'Latest update on Typhoon.', (SELECT id FROM users WHERE email='admin@pioduran.gov.ph'));

-- Insert sample gallery images
INSERT INTO gallery_images (url, description, uploader_id) VALUES
('https://example.com/image1.jpg', 'Evacuation drill', (SELECT id FROM users WHERE email='admin@pioduran.gov.ph'));

-- Insert sample events
INSERT INTO events (name, description, event_date, location) VALUES
('Disaster Preparedness Seminar', 'Seminar for disaster preparedness.', '2025-10-01', 'Municipal Hall');

-- Insert sample volunteer applications
INSERT INTO volunteer_applications (user_id, status) VALUES
((SELECT id FROM users WHERE email='user1@pioduran.gov.ph'), 'pending');

-- Insert sample incident reports
INSERT INTO incident_reports (reporter_id, description, incident_date, status) VALUES
((SELECT id FROM users WHERE email='user1@pioduran.gov.ph'), 'Flood in Barangay 1', '2025-09-20', 'open');
