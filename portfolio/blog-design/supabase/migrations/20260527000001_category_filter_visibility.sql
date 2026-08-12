ALTER TABLE categories
ADD COLUMN IF NOT EXISTS show_filter boolean DEFAULT true;

UPDATE categories
SET show_filter = true
WHERE show_filter IS NULL;
