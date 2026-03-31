ALTER TABLE works
ADD COLUMN IF NOT EXISTS video_url text DEFAULT '';

ALTER TABLE works
ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

ALTER TABLE categories
ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

UPDATE works
SET display_order = 0
WHERE display_order IS NULL;

UPDATE categories
SET display_order = 0
WHERE display_order IS NULL;
