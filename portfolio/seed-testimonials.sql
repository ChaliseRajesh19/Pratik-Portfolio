-- 1. Create the table
create table if not exists testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null,
  avatar_url  text,
  rating      int  not null default 5,
  text        text not null,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 2. Enable RLS and setup policies
alter table testimonials enable row level security;

create policy "public read"  on testimonials for select using (true);
create policy "admin write"  on testimonials for all    using (auth.role() = 'authenticated');

-- 3. Seed demo data
insert into testimonials (name, role, avatar_url, rating, text) values
  (
    $$Arjun Sharma$$,
    $$Founder, NovaBrand$$,
    null,
    5,
    $$Pratik's design work completely transformed our brand identity. Every pixel was intentional — we saw a 40% boost in engagement within weeks of the rebrand. Absolutely worth every penny.$$
  ),
  (
    $$Emily Watson$$,
    $$Marketing Director, PixelCo$$,
    null,
    5,
    $$The video editing and motion graphics Pratik delivered were beyond our expectations. Our social reach doubled overnight. His creativity and speed are genuinely unmatched.$$
  ),
  (
    $$Raj Patel$$,
    $$CEO, TechVenture$$,
    null,
    5,
    $$Working with Pratik was seamless from start to finish. Professional, creative, and always on time. His eye for detail and storytelling ability make him stand out in a crowded field.$$
  ),
  (
    $$Sophia Lee$$,
    $$Creative Lead, Luminary Studio$$,
    null,
    5,
    $$The thumbnail designs and channel branding gave our YouTube channel a cohesive identity overnight. Subscribers love the new look — our click-through rate improved by over 30%.$$
  ),
  (
    $$Marcus Huber$$,
    $$Product Manager, Orbit SaaS$$,
    null,
    5,
    $$Outstanding attention to detail. Pratik understood our vision immediately and brought it to life in ways we hadn't even imagined. A true visual storyteller and a pleasure to work with.$$
  ),
  (
    $$Priya Kapoor$$,
    $$Startup Founder, Bloom$$,
    null,
    5,
    $$From logo to full brand kit, everything was pixel-perfect and delivered ahead of schedule. Pratik brings an incredible mix of creativity and strategic thinking to every project.$$
  );
