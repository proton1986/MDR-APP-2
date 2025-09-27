-- Admin Management Tables for MDRRMO System
-- This script creates all necessary tables for the admin management components

-- Personnel Management Table
CREATE TABLE IF NOT EXISTS personnel (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    avatar_url TEXT,
    hire_date DATE,
    emergency_contact VARCHAR(255),
    emergency_phone VARCHAR(50),
    certifications TEXT[],
    skills TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams Management Table
CREATE TABLE IF NOT EXISTS teams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    leader_id UUID REFERENCES personnel(id),
    specialization VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    max_members INTEGER DEFAULT 10,
    equipment_assigned TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members Junction Table
CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    personnel_id UUID REFERENCES personnel(id) ON DELETE CASCADE,
    role VARCHAR(100),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(team_id, personnel_id)
);

-- Schedules Management Table
CREATE TABLE IF NOT EXISTS schedules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    schedule_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    duration_hours DECIMAL(4,2),
    assigned_team_id UUID REFERENCES teams(id),
    type VARCHAR(50) CHECK (type IN ('training', 'patrol', 'maintenance', 'meeting', 'drill', 'inspection')),
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in-progress', 'completed', 'cancelled')),
    location VARCHAR(255),
    notes TEXT,
    created_by UUID REFERENCES personnel(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Emergency Alerts Table
CREATE TABLE IF NOT EXISTS emergency_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) CHECK (type IN ('emergency', 'warning', 'info', 'advisory')),
    priority VARCHAR(20) CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
    affected_areas TEXT[],
    coordinates JSONB, -- Store lat/lng coordinates for mapping
    created_by UUID REFERENCES personnel(id),
    expires_at TIMESTAMP WITH TIME ZONE,
    broadcast_channels TEXT[], -- SMS, radio, social media, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Incidents Management Table
CREATE TABLE IF NOT EXISTS incidents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) CHECK (type IN ('fire', 'flood', 'accident', 'medical', 'earthquake', 'landslide', 'other')),
    severity VARCHAR(20) CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    status VARCHAR(20) DEFAULT 'reported' CHECK (status IN ('reported', 'responding', 'resolved', 'closed')),
    location VARCHAR(255) NOT NULL,
    coordinates JSONB, -- Store lat/lng coordinates
    reported_by VARCHAR(255),
    reporter_contact VARCHAR(100),
    assigned_team_id UUID REFERENCES teams(id),
    response_time_minutes INTEGER,
    resolution_time_minutes INTEGER,
    casualties_count INTEGER DEFAULT 0,
    damage_assessment TEXT,
    photos TEXT[], -- Array of photo URLs
    reported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    responded_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News and Updates Table
CREATE TABLE IF NOT EXISTS news_updates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image_url TEXT,
    category VARCHAR(100),
    tags TEXT[],
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
    author_id UUID REFERENCES personnel(id),
    published_at TIMESTAMP WITH TIME ZONE,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities Management Table
CREATE TABLE IF NOT EXISTS activities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    activity_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    location VARCHAR(255),
    type VARCHAR(100) CHECK (type IN ('training', 'drill', 'community_outreach', 'inspection', 'meeting', 'seminar')),
    status VARCHAR(20) DEFAULT 'planned' CHECK (status IN ('planned', 'ongoing', 'completed', 'cancelled')),
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    organizer_id UUID REFERENCES personnel(id),
    requirements TEXT[],
    materials_needed TEXT[],
    photos TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Management Table
CREATE TABLE IF NOT EXISTS gallery_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50) CHECK (file_type IN ('image', 'video')),
    file_size_bytes BIGINT,
    category VARCHAR(100),
    tags TEXT[],
    location VARCHAR(255),
    taken_date DATE,
    uploaded_by UUID REFERENCES personnel(id),
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resources Management Table
CREATE TABLE IF NOT EXISTS resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50),
    file_size_bytes BIGINT,
    category VARCHAR(100),
    tags TEXT[],
    access_level VARCHAR(20) DEFAULT 'public' CHECK (access_level IN ('public', 'restricted', 'internal')),
    download_count INTEGER DEFAULT 0,
    uploaded_by UUID REFERENCES personnel(id),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maps Management Table
CREATE TABLE IF NOT EXISTS maps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    map_type VARCHAR(100) CHECK (map_type IN ('hazard', 'evacuation', 'facility', 'boundary', 'topographic')),
    file_url TEXT NOT NULL,
    thumbnail_url TEXT,
    coordinates_bounds JSONB, -- Store map bounds
    zoom_levels JSONB,
    layers JSONB, -- Store map layer information
    is_public BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES personnel(id),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hotlines Management Table
CREATE TABLE IF NOT EXISTS hotlines (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    alternate_numbers TEXT[],
    description TEXT,
    category VARCHAR(100) CHECK (category IN ('emergency', 'medical', 'fire', 'police', 'utility', 'government')),
    availability VARCHAR(100) DEFAULT '24/7',
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Public Feedback Table
CREATE TABLE IF NOT EXISTS public_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(100),
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'responded', 'resolved', 'closed')),
    assigned_to UUID REFERENCES personnel(id),
    response TEXT,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Surveys Management Table
CREATE TABLE IF NOT EXISTS surveys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    questions JSONB NOT NULL, -- Store survey questions as JSON
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed', 'archived')),
    start_date DATE,
    end_date DATE,
    max_responses INTEGER,
    current_responses INTEGER DEFAULT 0,
    is_anonymous BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES personnel(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Survey Responses Table
CREATE TABLE IF NOT EXISTS survey_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    survey_id UUID REFERENCES surveys(id) ON DELETE CASCADE,
    respondent_name VARCHAR(255),
    respondent_email VARCHAR(255),
    responses JSONB NOT NULL, -- Store answers as JSON
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weather Advisories Table
CREATE TABLE IF NOT EXISTS weather_advisories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    advisory_type VARCHAR(100) CHECK (advisory_type IN ('typhoon', 'flood', 'drought', 'thunderstorm', 'heat_index', 'cold_surge')),
    severity VARCHAR(20) CHECK (severity IN ('critical', 'high', 'moderate', 'low')),
    affected_areas TEXT[],
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
    valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
    weather_data JSONB, -- Store weather parameters
    recommendations TEXT[],
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
    issued_by UUID REFERENCES personnel(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings Table
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(50) CHECK (setting_type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    category VARCHAR(100),
    is_public BOOLEAN DEFAULT FALSE,
    updated_by UUID REFERENCES personnel(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_personnel_status ON personnel(status);
CREATE INDEX IF NOT EXISTS idx_personnel_department ON personnel(department);
CREATE INDEX IF NOT EXISTS idx_teams_status ON teams(status);
CREATE INDEX IF NOT EXISTS idx_schedules_date ON schedules(schedule_date);
CREATE INDEX IF NOT EXISTS idx_schedules_status ON schedules(status);
CREATE INDEX IF NOT EXISTS idx_alerts_status ON emergency_alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_type ON emergency_alerts(type);
CREATE INDEX IF NOT EXISTS idx_incidents_status ON incidents(status);
CREATE INDEX IF NOT EXISTS idx_incidents_type ON incidents(type);
CREATE INDEX IF NOT EXISTS idx_incidents_reported_at ON incidents(reported_at);
CREATE INDEX IF NOT EXISTS idx_news_status ON news_updates(status);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON news_updates(published_at);
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(activity_date);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON public_feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON public_feedback(created_at);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE personnel ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE maps ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_advisories ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic admin access - can be refined later)
-- Allow authenticated users to read most data
CREATE POLICY "Allow authenticated read access" ON personnel FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read access" ON teams FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read access" ON schedules FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read access" ON emergency_alerts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read access" ON incidents FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read access" ON news_updates FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read access" ON activities FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read access" ON gallery_items FOR SELECT USING (status = 'active');
CREATE POLICY "Allow authenticated read access" ON resources FOR SELECT USING (access_level = 'public' OR auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read access" ON maps FOR SELECT USING (is_public = true OR auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated read access" ON hotlines FOR SELECT USING (status = 'active');
CREATE POLICY "Allow authenticated read access" ON weather_advisories FOR SELECT USING (auth.role() = 'authenticated');

-- Allow admin users full access (you'll need to implement proper role checking)
CREATE POLICY "Allow admin full access" ON personnel FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON teams FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON schedules FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON emergency_alerts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON incidents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON news_updates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON activities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON gallery_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON resources FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON maps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON hotlines FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON public_feedback FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON surveys FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON survey_responses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON weather_advisories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin full access" ON system_settings FOR ALL USING (auth.role() = 'authenticated');

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all tables with updated_at column
CREATE TRIGGER update_personnel_updated_at BEFORE UPDATE ON personnel FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schedules_updated_at BEFORE UPDATE ON schedules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emergency_alerts_updated_at BEFORE UPDATE ON emergency_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updates_updated_at BEFORE UPDATE ON news_updates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_maps_updated_at BEFORE UPDATE ON maps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotlines_updated_at BEFORE UPDATE ON hotlines FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_public_feedback_updated_at BEFORE UPDATE ON public_feedback FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_surveys_updated_at BEFORE UPDATE ON surveys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_weather_advisories_updated_at BEFORE UPDATE ON weather_advisories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
