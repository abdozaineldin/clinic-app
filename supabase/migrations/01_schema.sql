-- Dr. Manal Sarhan Dermatology Clinic - Supabase Schema Migration

-- 1. Homepage Single Row Table
CREATE TABLE IF NOT EXISTS homepage (
    id BIGINT PRIMARY KEY DEFAULT 1,
    hero_title TEXT NOT NULL,
    hero_subtitle TEXT NOT NULL,
    hero_image_url TEXT,
    stats_years_experience INT DEFAULT 14,
    stats_happy_patients TEXT DEFAULT '+5,000',
    stats_branches_count INT DEFAULT 3,
    stats_specialties_count INT DEFAULT 20,
    CONSTRAINT single_homepage_row CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS homepage_why_choose_us (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    icon_name TEXT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

-- 2. About Page Tables
CREATE TABLE IF NOT EXISTS about_page (
    id BIGINT PRIMARY KEY DEFAULT 1,
    doctor_photo_url TEXT,
    bio TEXT NOT NULL,
    philosophy_quote TEXT NOT NULL,
    CONSTRAINT single_about_row CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS about_timeline (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    year TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS about_certifications (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    logo_url TEXT,
    name TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS about_press_logos (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    logo_url TEXT,
    name TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

-- 3. Beauty Center Page Tables
CREATE TABLE IF NOT EXISTS beauty_center_page (
    id BIGINT PRIMARY KEY DEFAULT 1,
    hero_image_url TEXT,
    hero_tagline TEXT NOT NULL,
    CONSTRAINT single_beauty_center_row CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS beauty_center_featured_services (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    icon_name TEXT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS beauty_center_why_choose_us (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    icon_name TEXT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS beauty_center_gallery_images (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    image_url TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

-- 4. Branches
CREATE TABLE IF NOT EXISTS branches (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    working_hours TEXT NOT NULL,
    phone TEXT NOT NULL,
    latitude DOUBLE PRECISION DEFAULT 30.0444,
    longitude DOUBLE PRECISION DEFAULT 31.2357,
    image_url TEXT
);

-- 5. Services
CREATE TABLE IF NOT EXISTS services (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT
);

-- 6. Before & After Cases
CREATE TABLE IF NOT EXISTS before_afters (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    treatment_name TEXT NOT NULL,
    category TEXT NOT NULL,
    sessions_count INT DEFAULT 1,
    body_area TEXT NOT NULL,
    before_image_url TEXT NOT NULL,
    after_image_url TEXT NOT NULL
);

-- 7. Blog Articles
CREATE TABLE IF NOT EXISTS articles (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    published_date TEXT NOT NULL,
    reading_time TEXT DEFAULT '5 دقائق',
    cover_image_url TEXT
);

-- 8. FAQs
CREATE TABLE IF NOT EXISTS faqs (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL
);

-- 9. Patient Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    patient_name TEXT NOT NULL,
    patient_photo_url TEXT,
    rating INT DEFAULT 5,
    comment TEXT NOT NULL,
    service_tag TEXT NOT NULL,
    posted_date TEXT NOT NULL
);

-- 10. Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Bookings with Slot Conflict Uniqueness Constraint
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    branch_id BIGINT REFERENCES branches(id) ON DELETE CASCADE,
    service_id BIGINT REFERENCES services(id) ON DELETE CASCADE,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    patient_name TEXT NOT NULL,
    patient_phone TEXT NOT NULL,
    patient_email TEXT,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unique index to prevent double bookings on active (non-cancelled) slots
CREATE UNIQUE INDEX IF NOT EXISTS unique_active_booking 
ON bookings (branch_id, date, time) 
WHERE status != 'cancelled';

-- =================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================

-- Content tables array: enable RLS and set policies
DO $$
DECLARE
    tbl TEXT;
    content_tables TEXT[] := ARRAY[
        'homepage', 'homepage_why_choose_us',
        'about_page', 'about_timeline', 'about_certifications', 'about_press_logos',
        'beauty_center_page', 'beauty_center_featured_services', 'beauty_center_why_choose_us', 'beauty_center_gallery_images',
        'branches', 'services', 'before_afters', 'articles', 'faqs', 'reviews'
    ];
BEGIN
    FOREACH tbl IN ARRAY content_tables LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', tbl);
        
        -- Public read access
        EXECUTE format('DROP POLICY IF EXISTS "Public select for %I" ON %I;', tbl, tbl);
        EXECUTE format('CREATE POLICY "Public select for %I" ON %I FOR SELECT USING (true);', tbl, tbl);
        
        -- Authenticated admin full write access
        EXECUTE format('DROP POLICY IF EXISTS "Admin write for %I" ON %I;', tbl, tbl);
        EXECUTE format('CREATE POLICY "Admin write for %I" ON %I FOR ALL TO authenticated USING (true) WITH CHECK (true);', tbl, tbl);
    END LOOP;
END $$;

-- Contact Messages RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public insert contact_messages" ON contact_messages;
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin view/update contact_messages" ON contact_messages;
CREATE POLICY "Admin view/update contact_messages" ON contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Bookings RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public insert bookings" ON bookings;
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public view bookings for slot check" ON bookings;
CREATE POLICY "Public view bookings for slot check" ON bookings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage bookings" ON bookings;
CREATE POLICY "Admin manage bookings" ON bookings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =================================================================
-- STORAGE BUCKET CREATION & POLICIES
-- =================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access to media" ON storage.objects;
CREATE POLICY "Public Access to media" ON storage.objects FOR SELECT USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Authenticated Uploads to media" ON storage.objects;
CREATE POLICY "Authenticated Uploads to media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');

DROP POLICY IF EXISTS "Authenticated Updates to media" ON storage.objects;
CREATE POLICY "Authenticated Updates to media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media');

DROP POLICY IF EXISTS "Authenticated Deletes from media" ON storage.objects;
CREATE POLICY "Authenticated Deletes from media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media');
