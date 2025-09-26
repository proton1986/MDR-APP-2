-- 006_create_policies.sql
-- Example RLS policies for basic access control

-- Allow users to select their own row
CREATE POLICY select_own_user ON users
FOR SELECT
USING (auth.uid()::uuid = id);

-- Allow users to insert their own row
CREATE POLICY insert_own_user ON users
FOR INSERT
WITH CHECK (auth.uid()::uuid = id);

-- Allow admins to select all users
CREATE POLICY admin_select_all_users ON users
FOR SELECT
USING (role = 'admin');

-- Allow all users to select hotline numbers
CREATE POLICY select_hotline_numbers ON hotline_numbers
FOR SELECT
USING (true);

-- Allow all users to select announcements, news, gallery_images, events
CREATE POLICY select_public_data ON announcements FOR SELECT USING (true);
CREATE POLICY select_public_data ON news FOR SELECT USING (true);
CREATE POLICY select_public_data ON gallery_images FOR SELECT USING (true);
CREATE POLICY select_public_data ON events FOR SELECT USING (true);

-- Allow users to select their own volunteer applications and incident reports
CREATE POLICY select_own_volunteer_applications ON volunteer_applications FOR SELECT USING (user_id = auth.uid()::uuid);
CREATE POLICY select_own_incident_reports ON incident_reports FOR SELECT USING (reporter_id = auth.uid()::uuid);
