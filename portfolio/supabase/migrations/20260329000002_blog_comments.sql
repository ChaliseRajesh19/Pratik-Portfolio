-- Blog Comments
CREATE TABLE IF NOT EXISTS blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id uuid NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  author_name text NOT NULL DEFAULT 'Anonymous',
  text text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read comments
CREATE POLICY "Anyone can read blog comments"
  ON blog_comments FOR SELECT
  USING (true);

-- Allow anyone to insert comments (public commenting)
CREATE POLICY "Anyone can post blog comments"
  ON blog_comments FOR INSERT
  WITH CHECK (true);
