// seed-testimonials.mjs
// Run with: node seed-testimonials.mjs
//
// Seeds 6 demo testimonials into your Supabase `testimonials` table.
// No avatar images are included — the frontend will fall back to
// gradient initials automatically. You can upload photos later from
// the Admin Panel (Testimonials → Edit).

import { createClient } from '@supabase/supabase-js'

// ── Credentials ──────────────────────────────────────────────────────
// The anon key is blocked by RLS for inserts (by design).
// Use your SERVICE ROLE key here — it bypasses RLS.
//
// 👉 Find it at: Supabase Dashboard → Project Settings → API
//                → "service_role" key  (keep it secret!)
//
const SUPABASE_URL          = 'https://ujrmasdqypgyqjewxwpq.supabase.co'
const SUPABASE_SERVICE_KEY  = 'PASTE_YOUR_SERVICE_ROLE_KEY_HERE'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// ── Demo data ────────────────────────────────────────────────────────
const DEMO_TESTIMONIALS = [
  {
    name: 'Arjun Sharma',
    role: 'Founder, NovaBrand',
    avatar_url: null,
    rating: 5,
    text: "Pratik's design work completely transformed our brand identity. Every pixel was intentional — we saw a 40% boost in engagement within weeks of the rebrand. Absolutely worth every penny.",
  },
  {
    name: 'Emily Watson',
    role: 'Marketing Director, PixelCo',
    avatar_url: null,
    rating: 5,
    text: 'The video editing and motion graphics Pratik delivered were beyond our expectations. Our social reach doubled overnight. His creativity and speed are genuinely unmatched.',
  },
  {
    name: 'Raj Patel',
    role: 'CEO, TechVenture',
    avatar_url: null,
    rating: 5,
    text: 'Working with Pratik was seamless from start to finish. Professional, creative, and always on time. His eye for detail and storytelling ability make him stand out in a crowded field.',
  },
  {
    name: 'Sophia Lee',
    role: 'Creative Lead, Luminary Studio',
    avatar_url: null,
    rating: 5,
    text: "The thumbnail designs and channel branding gave our YouTube channel a cohesive identity overnight. Subscribers love the new look — our click-through rate improved by over 30%.",
  },
  {
    name: 'Marcus Huber',
    role: 'Product Manager, Orbit SaaS',
    avatar_url: null,
    rating: 5,
    text: 'Outstanding attention to detail. Pratik understood our vision immediately and brought it to life in ways we hadn\'t even imagined. A true visual storyteller and a pleasure to work with.',
  },
  {
    name: 'Priya Kapoor',
    role: 'Startup Founder, Bloom',
    avatar_url: null,
    rating: 5,
    text: 'From logo to full brand kit, everything was pixel-perfect and delivered ahead of schedule. Pratik brings an incredible mix of creativity and strategic thinking to every project.',
  },
]

// ── Insert ───────────────────────────────────────────────────────────
async function seed() {
  console.log('🌱  Seeding 6 demo testimonials...\n')

  const { data, error } = await supabase
    .from('testimonials')
    .insert(DEMO_TESTIMONIALS)
    .select()

  if (error) {
    console.error('❌  Seeding failed:', error.message)
    console.error('   Hint: make sure the `testimonials` table exists (run the SQL from the plan first).')
    process.exit(1)
  }

  console.log(`✅  Inserted ${data.length} testimonials successfully!\n`)
  data.forEach((t, i) => console.log(`   ${i + 1}. ${t.name} — ${t.role}`))
  console.log('\n📌  Tip: upload client photos from Admin → Manage Testimonials → Edit.')
}

seed()
