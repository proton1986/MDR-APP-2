-- 007_create_views_and_functions.sql
-- Example views and functions for reporting and convenience

-- View: Recent incident reports
CREATE OR REPLACE VIEW recent_incident_reports AS
SELECT * FROM incident_reports WHERE incident_date > NOW() - INTERVAL '30 days';

-- Function: Get active hotline numbers
CREATE OR REPLACE FUNCTION get_active_hotlines()
RETURNS TABLE(service VARCHAR, number VARCHAR) AS $$
  SELECT service, number FROM hotline_numbers WHERE status = 'active';
$$ LANGUAGE sql;
