-- Seed data for admin management system
-- This script populates the tables with initial sample data

-- Insert sample personnel
INSERT INTO personnel (name, position, department, email, phone, status) VALUES
('Juan Dela Cruz', 'MDRRMO Head', 'Management', 'juan.delacruz@pioduran.gov.ph', '(052) 234-5678', 'active'),
('Maria Santos', 'Emergency Response Coordinator', 'Operations', 'maria.santos@pioduran.gov.ph', '(052) 234-5679', 'active'),
('Pedro Garcia', 'Search and Rescue Specialist', 'Operations', 'pedro.garcia@pioduran.gov.ph', '(052) 234-5680', 'active'),
('Ana Lopez', 'Communications Officer', 'Communications', 'ana.lopez@pioduran.gov.ph', '(052) 234-5681', 'active'),
('Carlos Rivera', 'Equipment Manager', 'Logistics', 'carlos.rivera@pioduran.gov.ph', '(052) 234-5682', 'active'),
('Miguel Torres', 'Training Coordinator', 'Training', 'miguel.torres@pioduran.gov.ph', '(052) 234-5683', 'active');

-- Insert sample teams
INSERT INTO teams (name, description, leader_id, specialization, status) VALUES
('Emergency Response Team Alpha', 'Primary emergency response unit for immediate disaster response', 
 (SELECT id FROM personnel WHERE name = 'Juan Dela Cruz'), 'Emergency Response', 'active'),
('Search and Rescue Team', 'Specialized team for search and rescue operations', 
 (SELECT id FROM personnel WHERE name = 'Pedro Garcia'), 'Search & Rescue', 'active'),
('Communications Team', 'Handles emergency communications and public information', 
 (SELECT id FROM personnel WHERE name = 'Ana Lopez'), 'Communications', 'active');

-- Insert team members
INSERT INTO team_members (team_id, personnel_id, role) VALUES
((SELECT id FROM teams WHERE name = 'Emergency Response Team Alpha'), (SELECT id FROM personnel WHERE name = 'Maria Santos'), 'Deputy Leader'),
((SELECT id FROM teams WHERE name = 'Emergency Response Team Alpha'), (SELECT id FROM personnel WHERE name = 'Carlos Rivera'), 'Equipment Specialist'),
((SELECT id FROM teams WHERE name = 'Search and Rescue Team'), (SELECT id FROM personnel WHERE name = 'Miguel Torres'), 'Training Officer'),
((SELECT id FROM teams WHERE name = 'Communications Team'), (SELECT id FROM personnel WHERE name = 'Maria Santos'), 'Backup Coordinator');

-- Insert sample schedules
INSERT INTO schedules (title, description, schedule_date, start_time, end_time, assigned_team_id, type, status, location, created_by) VALUES
('Emergency Response Training', 'Monthly emergency response drill and training session', 
 CURRENT_DATE + INTERVAL '7 days', '09:00', '13:00', 
 (SELECT id FROM teams WHERE name = 'Emergency Response Team Alpha'), 'training', 'scheduled', 'MDRRMO Training Center',
 (SELECT id FROM personnel WHERE name = 'Juan Dela Cruz')),
('Equipment Maintenance Check', 'Regular maintenance and inspection of emergency equipment', 
 CURRENT_DATE + INTERVAL '3 days', '14:00', '16:00', 
 (SELECT id FROM teams WHERE name = 'Emergency Response Team Alpha'), 'maintenance', 'scheduled', 'Equipment Storage',
 (SELECT id FROM personnel WHERE name = 'Carlos Rivera'));

-- Insert sample emergency alerts
INSERT INTO emergency_alerts (title, message, type, priority, status, affected_areas, created_by, expires_at) VALUES
('Typhoon Warning Signal #2', 'Typhoon approaching Pio Duran area. Residents are advised to prepare for strong winds and heavy rainfall.', 
 'emergency', 'high', 'active', ARRAY['Pio Duran', 'Surrounding Municipalities'], 
 (SELECT id FROM personnel WHERE name = 'Ana Lopez'), NOW() + INTERVAL '2 days'),
('Flash Flood Advisory', 'Heavy rainfall may cause flash floods in low-lying areas. Exercise caution when traveling.', 
 'warning', 'medium', 'active', ARRAY['Barangay Centro', 'Barangay Poblacion'], 
 (SELECT id FROM personnel WHERE name = 'Ana Lopez'), NOW() + INTERVAL '12 hours');

-- Insert sample incidents
INSERT INTO incidents (title, description, type, severity, status, location, reported_by, reporter_contact, assigned_team_id, reported_at) VALUES
('House Fire in Barangay Centro', 'Residential fire reported at Block 5, Lot 12. Fire department dispatched.', 
 'fire', 'high', 'responding', 'Barangay Centro, Block 5, Lot 12', 'Maria Santos', '(052) 234-5679', 
 (SELECT id FROM teams WHERE name = 'Emergency Response Team Alpha'), NOW() - INTERVAL '2 hours'),
('Road Accident on National Highway', 'Vehicle collision involving two motorcycles. Minor injuries reported.', 
 'accident', 'medium', 'resolved', 'National Highway, KM 15', 'Pedro Garcia', '(052) 234-5680', 
 (SELECT id FROM teams WHERE name = 'Search and Rescue Team'), NOW() - INTERVAL '6 hours');

-- Insert sample news updates
INSERT INTO news_updates (title, content, excerpt, category, status, author_id, published_at) VALUES
('MDRRMO Conducts Quarterly Disaster Preparedness Training', 
 'The Municipal Disaster Risk Reduction and Management Office successfully conducted its quarterly disaster preparedness training for all personnel and volunteers. The training covered emergency response protocols, search and rescue techniques, and community evacuation procedures.',
 'MDRRMO completes quarterly training for disaster preparedness and emergency response.',
 'Training', 'published', (SELECT id FROM personnel WHERE name = 'Juan Dela Cruz'), NOW() - INTERVAL '1 day'),
('New Emergency Equipment Acquired', 
 'The MDRRMO has acquired new emergency response equipment including rescue boats, communication radios, and medical supplies to enhance our disaster response capabilities.',
 'New emergency equipment enhances MDRRMO response capabilities.',
 'Equipment', 'published', (SELECT id FROM personnel WHERE name = 'Carlos Rivera'), NOW() - INTERVAL '3 days');

-- Insert sample activities
INSERT INTO activities (title, description, activity_date, start_time, end_time, location, type, status, organizer_id) VALUES
('Community Disaster Preparedness Seminar', 'Educational seminar for community members on disaster preparedness and emergency response.',
 CURRENT_DATE + INTERVAL '10 days', '09:00', '12:00', 'Pio Duran Municipal Hall', 'seminar', 'planned',
 (SELECT id FROM personnel WHERE name = 'Miguel Torres')),
('Monthly Equipment Inspection', 'Regular inspection and maintenance of all emergency response equipment.',
 CURRENT_DATE + INTERVAL '5 days', '08:00', '17:00', 'MDRRMO Equipment Storage', 'inspection', 'planned',
 (SELECT id FROM personnel WHERE name = 'Carlos Rivera'));

-- Insert sample hotlines
INSERT INTO hotlines (service_name, phone_number, alternate_numbers, description, category, availability, is_primary, display_order, status) VALUES
('MDRRMO Emergency Hotline', '911', ARRAY['(052) 234-5678'], 'Primary emergency hotline for disaster-related emergencies', 'emergency', '24/7', true, 1, 'active'),
('Police Emergency', '117', ARRAY['(052) 456-7890'], 'Police emergency hotline', 'police', '24/7', true, 2, 'active'),
('Fire Department', '116', ARRAY['(052) 456-7891'], 'Fire emergency hotline', 'fire', '24/7', true, 3, 'active'),
('Medical Emergency', '911', ARRAY['(052) 456-7892'], 'Medical emergency and ambulance services', 'medical', '24/7', true, 4, 'active'),
('Municipal Hall', '(052) 234-5600', NULL, 'Pio Duran Municipal Hall main line', 'government', '8:00 AM - 5:00 PM', false, 5, 'active');

-- Insert sample public feedback
INSERT INTO public_feedback (name, email, subject, message, category, priority, status) VALUES
('John Doe', 'john.doe@email.com', 'Suggestion for Emergency Evacuation Routes', 
 'I would like to suggest adding more evacuation route signs in our barangay to help residents during emergencies.',
 'Suggestion', 'normal', 'new'),
('Jane Smith', 'jane.smith@email.com', 'Request for Disaster Preparedness Training', 
 'Our community would like to request a disaster preparedness training session for our barangay.',
 'Request', 'normal', 'new');

-- Insert sample weather advisory
INSERT INTO weather_advisories (title, description, advisory_type, severity, affected_areas, valid_from, valid_until, issued_by) VALUES
('Thunderstorm Advisory', 'Moderate to heavy thunderstorms expected in the afternoon. Residents are advised to stay indoors and avoid outdoor activities.',
 'thunderstorm', 'moderate', ARRAY['Pio Duran', 'Jovellar', 'Tiwi'], 
 NOW(), NOW() + INTERVAL '8 hours', (SELECT id FROM personnel WHERE name = 'Ana Lopez'));

-- Insert sample system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, category, is_public) VALUES
('site_name', 'MDRRMO Pio Duran', 'string', 'Official site name', 'general', true),
('emergency_contact', '911', 'string', 'Primary emergency contact number', 'emergency', true),
('office_address', 'Pio Duran Municipal Hall, Albay', 'string', 'Official office address', 'general', true),
('office_hours', '8:00 AM - 5:00 PM, Monday to Friday', 'string', 'Official office hours', 'general', true),
('max_file_upload_size', '10485760', 'number', 'Maximum file upload size in bytes (10MB)', 'system', false),
('enable_public_registration', 'false', 'boolean', 'Allow public user registration', 'system', false);
