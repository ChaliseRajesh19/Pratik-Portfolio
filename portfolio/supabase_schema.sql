-- ─── SUPABASE PORTFOLIO DATABASE SCHEMA ───
-- Copy and paste this script into the Supabase SQL Editor (https://supabase.com) to initialize all tables.

-- 1. WORKS / CASE STUDIES
CREATE TABLE IF NOT EXISTS works (
  id BIGSERIAL PRIMARY KEY,
  index TEXT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  client TEXT,
  category TEXT,
  tag TEXT,
  "bgWord" TEXT,
  tagline TEXT,
  year TEXT,
  services TEXT[], -- Array of services/role tags
  image TEXT, -- Thumbnail image URL
  "imageAlt" TEXT, -- Required alt text for SEO
  challenge TEXT,
  approach TEXT,
  solution TEXT,
  results TEXT,
  gallery JSONB DEFAULT '[]'::jsonb, -- Array of gallery items {url, caption}
  status TEXT DEFAULT 'Draft',
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. JOURNAL BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  category TEXT,
  "publishDate" DATE DEFAULT CURRENT_DATE,
  "readTime" TEXT DEFAULT '5 min read',
  "featuredImage" TEXT,
  "imageAlt" TEXT,
  content TEXT, -- Markdown body text
  status TEXT DEFAULT 'Draft',
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  quote TEXT,
  "order" INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Published',
  avatar_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. CAPABILITIES
CREATE TABLE IF NOT EXISTS capabilities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  "desc" TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 5. MILESTONES
CREATE TABLE IF NOT EXISTS milestones (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  "desc" TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 6. SITE SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  "siteTitle" TEXT,
  "metaDescription" TEXT,
  instagram TEXT,
  facebook TEXT,
  behance TEXT,
  linkedin TEXT,
  "contactEmail" TEXT,
  "aboutHeroText" TEXT,
  "aboutBio" TEXT,
  "homepageHeadline" TEXT,
  CONSTRAINT single_row CHECK (id = 1) -- Enforces only one settings record
);

-- ─── INITIAL SYSTEM SEEDS ───

-- Seed default Site Settings
INSERT INTO site_settings (id, "siteTitle", "metaDescription", instagram, facebook, behance, linkedin, "contactEmail", "aboutHeroText", "aboutBio", "homepageHeadline")
VALUES (
  1,
  'Pratik Bhusal — Graphic Designer & Art Director',
  'Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging.',
  'https://www.instagram.com/pratikbhusal_/',
  'https://www.facebook.com/pratikbhusal',
  'https://www.behance.net/pratikbhusal',
  'https://www.linkedin.com/in/pratikbhusal',
  'pratikbhusal12345@gmail.com',
  'I MAKE THINGS WORTH SEEING.',
  'I am Pratik Bhusal, a graphic designer and art director focusing on raw, structural typography, functional packaging guidelines, and holistic brand systems. Design is not just decoration — it is communication engineering. I build visual systems that help brands cut through clutter, establish clear visual architecture, and communicate value instantly to their users. Based in Kathmandu, Nepal, I work with local leaders and international teams to scale brands across packaging boxes, physical publications, and responsive digital interfaces.',
  'LET''S MAKE SOMETHING WORTH SEEING.'
) ON CONFLICT (id) DO NOTHING;

-- Seed default Capabilities
INSERT INTO capabilities (id, name, "desc", "order") VALUES
('cap-1', 'VISUAL BRANDING', 'Developing cohesive, scalable visual assets, logo identities, adaptive grid systems, and typographic guidelines to align brand perception.', 1),
('cap-2', 'EDITORIAL DESIGN', 'Configuring monographs, booklets, catalogs, and technical publication layouts using mathematical grids and fine horological typefaces.', 2),
('cap-3', 'ART DIRECTION', 'Guiding marketing poster designs, destination brochures, social assets, and live World Cup match campaigns from concept to production.', 3),
('cap-4', 'PACKAGING SYSTEMS', 'Designing sustainable, tactile cosmetic boxes, product containers, concrete vessels, and minimal logistics packaging that feel premium.', 4),
('cap-5', 'DIGITAL INTERFACES', 'Structuring responsive mobile layout deck shuffles, dark-mode styling systems, interactive cursor tracking states, and clean transition flows.', 5)
ON CONFLICT (id) DO NOTHING;

-- Seed default Milestones
INSERT INTO milestones (id, year, title, "desc", "order") VALUES
('m-1', '2023', 'STUDIO INCUBATION', 'Started freelancing and consulting for small scale businesses on visual communication assets.', 1),
('m-2', '2024', 'REGIONAL EXPANSION', 'Overhauled brand systems and directed marketing design strategies for medium scale ventures.', 2),
('m-3', '2025', 'PRODUCT FOCUS', 'Pivoted to a holistic design model merging packaging structures, print publications, and digital products.', 3),
('m-4', '2026', 'SUPER-APP DEPLOYMENT', 'Successfully designed the master visual design system and logistics assets for Pathao Nepal.', 4)
ON CONFLICT (id) DO NOTHING;

-- Seed default Testimonials
INSERT INTO testimonials (id, name, role, company, quote, "order", status) VALUES
('test-1', 'Niraj Joshi', 'Founder', 'Joshi Media', 'Pratik''s visual systems transformed our digital products. His eye for typography and grid alignment is second to none.', 1, 'Published'),
('test-2', 'Alex Moreau', 'Creative Director', 'Studio Moreau', 'An absolute master of editorial layouts. The branding guidelines he delivered were clear, adaptive, and visually stunning.', 2, 'Published'),
('test-3', 'Sophie Chen', 'Marketing Lead', 'Lumina UK', 'We briefed Pratik for our packaging redesign and the feedback process was seamless. Our retail conversions increased significantly.', 3, 'Published')
ON CONFLICT (id) DO NOTHING;
