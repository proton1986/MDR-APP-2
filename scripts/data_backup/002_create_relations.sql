-- 002_create_relations.sql
-- Add foreign key constraints and indexes for relations

-- Add index for author_id in announcements
CREATE INDEX IF NOT EXISTS idx_announcements_author_id ON announcements(author_id);

-- Add index for author_id in news
CREATE INDEX IF NOT EXISTS idx_news_author_id ON news(author_id);

-- Add index for uploader_id in gallery_images
CREATE INDEX IF NOT EXISTS idx_gallery_images_uploader_id ON gallery_images(uploader_id);

-- Add index for user_id in volunteer_applications
CREATE INDEX IF NOT EXISTS idx_volunteer_applications_user_id ON volunteer_applications(user_id);

-- Add index for reporter_id in incident_reports
CREATE INDEX IF NOT EXISTS idx_incident_reports_reporter_id ON incident_reports(reporter_id);
