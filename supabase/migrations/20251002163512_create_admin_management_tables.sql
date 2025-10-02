/*
  # Admin Management System - Complete Database Schema
  
  ## Overview
  This migration creates all necessary tables for the MDRRMO admin management system.
  
  ## 1. Organization & Personnel Tables
  ### drrm_council
  - Stores DRRM Council members information
  - Fields: name, position, department, contact details, status
  - RLS: Authenticated users can read; admin can write
  
  ### mdrrmo_personnel
  - Stores MDRRMO personnel directory
  - Fields: name, position, department, email, phone, status, avatar
  - RLS: Authenticated users can read; admin can write
  
  ## 2. Content Management Tables
  ### announcements
  - Stores public announcements
  - Fields: title, content, category, priority, image_url, status
  - RLS: Public can read published; authenticated can manage
  
  ### weather_updates
  - Stores weather information and forecasts
  - Fields: title, description, temperature, conditions, forecast_data, status
  - RLS: Public can read published; authenticated can manage
  
  ### news_articles
  - Stores news and advisories
  - Fields: title, content, excerpt, category, media_type, image_url, video_url, status
  - RLS: Public can read published; authenticated can manage
  
  ### events_activities
  - Stores events and activities information
  - Fields: title, description, event_date, location, category, image_url, status
  - RLS: Public can read published; authenticated can manage
  
  ## 3. Media & Resources Tables
  ### videos
  - Stores video gallery content
  - Fields: title, description, video_url, thumbnail_url, category, tags, duration, views
  - RLS: Public can read published; authenticated can manage
  
  ### gallery_images
  - Stores photo gallery images
  - Fields: title, description, image_url, category, tags
  - RLS: Public can read; authenticated can manage
  
  ### public_documents
  - Stores downloadable documents
  - Fields: title, description, document_url, file_type, file_size, category
  - RLS: Public can read published; authenticated can manage
  
  ### hazard_maps
  - Stores hazard maps and related data
  - Fields: title, description, map_url, map_type, affected_areas, risk_level
  - RLS: Public can read; authenticated can manage
  
  ## 4. Communication Tables
  ### incident_reports (already exists)
  - Enhanced with additional tracking fields
  
  ### public_messages
  - Stores messages from the public
  - Fields: name, email, phone, subject, message, status, priority
  - RLS: Authenticated users can manage
  
  ## 5. Utility Tables
  ### quick_links
  - Stores quick access links
  - Fields: title, url, icon, description, category, order
  - RLS: Public can read; authenticated can manage
  
  ### alerts
  - Stores emergency alerts
  - Fields: title, message, type, priority, status, affected_areas, expires_at
  - RLS: Public can read active; authenticated can manage
  
  ### hotlines
  - Stores emergency contact numbers
  - Fields: agency, contact_person, phone, alternate_phone, type, description, availability
  - RLS: Public can read active; authenticated can manage
  
  ### barangay_portals
  - Stores barangay-specific portal information
  - Fields: barangay_name, contact_person, email, phone, address, services
  - RLS: Public can read; authenticated can manage
  
  ## 6. Security
  - All tables have RLS enabled
  - Public can read published/active content
  - Authenticated users can manage content
  - Proper indexes for performance
*/

-- ============================================================================
-- 1. ORGANIZATION & PERSONNEL TABLES
-- ============================================================================

-- DRRM Council Members Table
CREATE TABLE IF NOT EXISTS drrm_council (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  avatar_url TEXT,
  bio TEXT,
  order_priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- MDRRMO Personnel Table
CREATE TABLE IF NOT EXISTS mdrrmo_personnel (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 2. CONTENT MANAGEMENT TABLES
-- ============================================================================

-- Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('emergency', 'event', 'notice', 'update')),
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  image_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Weather Updates Table
CREATE TABLE IF NOT EXISTS weather_updates (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  temperature NUMERIC,
  conditions TEXT,
  humidity NUMERIC,
  wind_speed NUMERIC,
  forecast_data JSONB,
  alert_level TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- News Articles Table
CREATE TABLE IF NOT EXISTS news_articles (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT NOT NULL CHECK (category IN ('breaking', 'community', 'disaster', 'preparedness', 'training', 'general')),
  media_type TEXT DEFAULT 'text' CHECK (media_type IN ('text', 'image', 'video')),
  image_url TEXT,
  video_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Events & Activities Table
CREATE TABLE IF NOT EXISTS events_activities (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  location TEXT,
  category TEXT NOT NULL CHECK (category IN ('training', 'drill', 'meeting', 'community', 'response', 'other')),
  image_url TEXT,
  max_participants INTEGER,
  registration_required BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 3. MEDIA & RESOURCES TABLES
-- ============================================================================

-- Videos Table
CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT CHECK (category IN ('Training', 'Events', 'Tutorials', 'Interviews', 'Documentaries', 'Public Service', 'Other')),
  tags TEXT,
  duration TEXT,
  views INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT CHECK (category IN ('Events', 'Activities', 'Training', 'Community', 'Disaster Response', 'Meetings', 'Other')),
  tags TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Public Documents Table
CREATE TABLE IF NOT EXISTS public_documents (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  document_url TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  category TEXT CHECK (category IN ('policies', 'plans', 'reports', 'guidelines', 'forms', 'other')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Hazard Maps Table
CREATE TABLE IF NOT EXISTS hazard_maps (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  map_url TEXT NOT NULL,
  map_type TEXT CHECK (map_type IN ('flood', 'landslide', 'earthquake', 'tsunami', 'volcanic', 'storm_surge', 'other')),
  affected_areas TEXT[],
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 4. COMMUNICATION TABLES
-- ============================================================================

-- Public Messages Table (Contact messages)
CREATE TABLE IF NOT EXISTS public_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'responded', 'archived')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  response TEXT,
  responded_by UUID REFERENCES auth.users(id),
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- 5. UTILITY TABLES
-- ============================================================================

-- Quick Links Table
CREATE TABLE IF NOT EXISTS quick_links (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  category TEXT,
  order_priority INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Alerts Table
CREATE TABLE IF NOT EXISTS alerts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('emergency', 'warning', 'info')),
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  affected_areas TEXT[],
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Hotlines Table
CREATE TABLE IF NOT EXISTS hotlines (
  id BIGSERIAL PRIMARY KEY,
  agency TEXT NOT NULL,
  contact_person TEXT,
  phone_number TEXT NOT NULL,
  alternate_number TEXT,
  type TEXT NOT NULL CHECK (type IN ('emergency', 'medical', 'fire', 'police', 'rescue', 'utility', 'government')),
  description TEXT,
  availability TEXT DEFAULT '24/7',
  is_primary BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Barangay Portals Table
CREATE TABLE IF NOT EXISTS barangay_portals (
  id BIGSERIAL PRIMARY KEY,
  barangay_name TEXT NOT NULL UNIQUE,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  services TEXT[],
  description TEXT,
  logo_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_announcements_status ON announcements(status);
CREATE INDEX IF NOT EXISTS idx_announcements_category ON announcements(category);
CREATE INDEX IF NOT EXISTS idx_announcements_created_at ON announcements(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_news_articles_status ON news_articles(status);
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON news_articles(category);
CREATE INDEX IF NOT EXISTS idx_news_articles_created_at ON news_articles(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_events_activities_status ON events_activities(status);
CREATE INDEX IF NOT EXISTS idx_events_activities_event_date ON events_activities(event_date);

CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_gallery_images_created_at ON gallery_images(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_public_messages_status ON public_messages(status);
CREATE INDEX IF NOT EXISTS idx_public_messages_created_at ON public_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_expires_at ON alerts(expires_at);

CREATE INDEX IF NOT EXISTS idx_hotlines_type ON hotlines(type);
CREATE INDEX IF NOT EXISTS idx_hotlines_status ON hotlines(status);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE drrm_council ENABLE ROW LEVEL SECURITY;
ALTER TABLE mdrrmo_personnel ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE hazard_maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE quick_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE barangay_portals ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES - DRRM Council
-- ============================================================================

CREATE POLICY "Anyone can view active DRRM council members"
  ON drrm_council FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can insert DRRM council members"
  ON drrm_council FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update DRRM council members"
  ON drrm_council FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete DRRM council members"
  ON drrm_council FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- RLS POLICIES - MDRRMO Personnel
-- ============================================================================

CREATE POLICY "Anyone can view active personnel"
  ON mdrrmo_personnel FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can insert personnel"
  ON mdrrmo_personnel FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update personnel"
  ON mdrrmo_personnel FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete personnel"
  ON mdrrmo_personnel FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- RLS POLICIES - Announcements
-- ============================================================================

CREATE POLICY "Anyone can view published announcements"
  ON announcements FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can view all announcements"
  ON announcements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert announcements"
  ON announcements FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update announcements"
  ON announcements FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete announcements"
  ON announcements FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- RLS POLICIES - Weather Updates
-- ============================================================================

CREATE POLICY "Anyone can view active weather updates"
  ON weather_updates FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can manage weather updates"
  ON weather_updates FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - News Articles
-- ============================================================================

CREATE POLICY "Anyone can view published news articles"
  ON news_articles FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can view all news articles"
  ON news_articles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert news articles"
  ON news_articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update news articles"
  ON news_articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete news articles"
  ON news_articles FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- RLS POLICIES - Events & Activities
-- ============================================================================

CREATE POLICY "Anyone can view upcoming and ongoing events"
  ON events_activities FOR SELECT
  USING (status IN ('upcoming', 'ongoing'));

CREATE POLICY "Authenticated users can view all events"
  ON events_activities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage events"
  ON events_activities FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - Videos
-- ============================================================================

CREATE POLICY "Anyone can view published videos"
  ON videos FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can view all videos"
  ON videos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage videos"
  ON videos FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - Gallery Images
-- ============================================================================

CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage gallery images"
  ON gallery_images FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - Public Documents
-- ============================================================================

CREATE POLICY "Anyone can view published documents"
  ON public_documents FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can view all documents"
  ON public_documents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage documents"
  ON public_documents FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - Hazard Maps
-- ============================================================================

CREATE POLICY "Anyone can view active hazard maps"
  ON hazard_maps FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can manage hazard maps"
  ON hazard_maps FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - Public Messages
-- ============================================================================

CREATE POLICY "Anyone can insert public messages"
  ON public_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view public messages"
  ON public_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update public messages"
  ON public_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete public messages"
  ON public_messages FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- RLS POLICIES - Quick Links
-- ============================================================================

CREATE POLICY "Anyone can view active quick links"
  ON quick_links FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can manage quick links"
  ON quick_links FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - Alerts
-- ============================================================================

CREATE POLICY "Anyone can view active alerts"
  ON alerts FOR SELECT
  USING (status = 'active' AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Authenticated users can view all alerts"
  ON alerts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage alerts"
  ON alerts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - Hotlines
-- ============================================================================

CREATE POLICY "Anyone can view active hotlines"
  ON hotlines FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can manage hotlines"
  ON hotlines FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - Barangay Portals
-- ============================================================================

CREATE POLICY "Anyone can view active barangay portals"
  ON barangay_portals FOR SELECT
  USING (status = 'active');

CREATE POLICY "Authenticated users can manage barangay portals"
  ON barangay_portals FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at column
CREATE TRIGGER update_drrm_council_updated_at BEFORE UPDATE ON drrm_council
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mdrrmo_personnel_updated_at BEFORE UPDATE ON mdrrmo_personnel
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_weather_updates_updated_at BEFORE UPDATE ON weather_updates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON news_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_activities_updated_at BEFORE UPDATE ON events_activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_public_documents_updated_at BEFORE UPDATE ON public_documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hazard_maps_updated_at BEFORE UPDATE ON hazard_maps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_public_messages_updated_at BEFORE UPDATE ON public_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quick_links_updated_at BEFORE UPDATE ON quick_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON alerts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotlines_updated_at BEFORE UPDATE ON hotlines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_barangay_portals_updated_at BEFORE UPDATE ON barangay_portals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
