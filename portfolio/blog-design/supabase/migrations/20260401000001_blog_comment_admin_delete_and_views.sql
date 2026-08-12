-- Allow authenticated admins to delete blog comments
CREATE POLICY "Authenticated users can delete blog comments"
  ON blog_comments FOR DELETE
  USING (auth.role() = 'authenticated');

-- Track unique blog views per browser/device token
CREATE TABLE IF NOT EXISTS blog_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id uuid NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  device_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (blog_id, device_id)
);

ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;

-- Prevent direct reads of device identifiers from the public client
CREATE POLICY "No direct reads for blog views"
  ON blog_views FOR SELECT
  USING (false);

-- Public RPC to register a device view once per blog and return the latest total
CREATE OR REPLACE FUNCTION public.register_blog_view(target_blog_id uuid, target_device_id text)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  normalized_device_id text := nullif(trim(target_device_id), '');
  total_views bigint;
BEGIN
  IF target_blog_id IS NULL THEN
    RAISE EXCEPTION 'blog id is required';
  END IF;

  IF normalized_device_id IS NULL THEN
    RAISE EXCEPTION 'device id is required';
  END IF;

  INSERT INTO public.blog_views (blog_id, device_id)
  VALUES (target_blog_id, normalized_device_id)
  ON CONFLICT (blog_id, device_id) DO NOTHING;

  SELECT COUNT(*)
  INTO total_views
  FROM public.blog_views
  WHERE blog_id = target_blog_id;

  RETURN COALESCE(total_views, 0);
END;
$$;

-- Public RPC to fetch view counts for all blogs without exposing device ids
CREATE OR REPLACE FUNCTION public.get_blog_view_counts()
RETURNS TABLE (blog_id uuid, view_count bigint)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT blogs.id AS blog_id, COUNT(blog_views.id)::bigint AS view_count
  FROM public.blogs
  LEFT JOIN public.blog_views
    ON blog_views.blog_id = blogs.id
  GROUP BY blogs.id;
$$;

GRANT EXECUTE ON FUNCTION public.register_blog_view(uuid, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_blog_view_counts() TO anon, authenticated;
