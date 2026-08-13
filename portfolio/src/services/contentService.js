import { createClient } from '@supabase/supabase-js'
import { worksData } from '../data/worksData'
import { blogPosts } from '../data/blogData'
import { ENV } from '../config/env'

// ─── Supabase Client (REQUIRED) ─────────────────────────────────────────────
const supabaseUrl = ENV.SUPABASE_URL
const supabaseAnonKey = ENV.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ FATAL: Supabase credentials missing! Set SUPABASE_URL and SUPABASE_ANON_KEY in env.js')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Default Seed Data ──────────────────────────────────────────────────────
const defaultCapabilities = [
  { id: 'cap-1', name: 'VISUAL BRANDING', "desc": 'Developing cohesive, scalable visual assets, logo identities, adaptive grid systems, and typographic guidelines to align brand perception.', "order": 1 },
  { id: 'cap-2', name: 'EDITORIAL DESIGN', "desc": 'Configuring monographs, booklets, catalogs, and technical publication layouts using mathematical grids and fine horological typefaces.', "order": 2 },
  { id: 'cap-3', name: 'ART DIRECTION', "desc": 'Guiding marketing poster designs, destination brochures, social assets, and live World Cup match campaigns from concept to production.', "order": 3 },
  { id: 'cap-4', name: 'PACKAGING SYSTEMS', "desc": 'Designing sustainable, tactile cosmetic boxes, product containers, concrete vessels, and minimal logistics packaging that feel premium.', "order": 4 },
  { id: 'cap-5', name: 'DIGITAL INTERFACES', "desc": 'Structuring responsive mobile layout deck shuffles, dark-mode styling systems, interactive cursor tracking states, and clean transition flows.', "order": 5 },
]

const defaultMilestones = [
  { id: 'm-1', year: '2023', title: 'STUDIO INCUBATION', "desc": 'Started freelancing and consulting for small scale businesses on visual communication assets.', "order": 1 },
  { id: 'm-2', year: '2024', title: 'REGIONAL EXPANSION', "desc": 'Overhauled brand systems and directed marketing design strategies for medium scale ventures.', "order": 2 },
  { id: 'm-3', year: '2025', title: 'PRODUCT FOCUS', "desc": 'Pivoted to a holistic design model merging packaging structures, print publications, and digital products.', "order": 3 },
  { id: 'm-4', year: '2026', title: 'SUPER-APP DEPLOYMENT', "desc": 'Successfully designed the master visual design system and logistics assets for Pathao Nepal.', "order": 4 },
]

const defaultTestimonials = [
  { id: 'test-1', name: 'Niraj Joshi', role: 'Founder', company: 'Joshi Media', quote: "Pratik's visual systems transformed our digital products. His eye for typography and grid alignment is second to none.", "order": 1, status: 'Published' },
  { id: 'test-2', name: 'Alex Moreau', role: 'Creative Director', company: 'Studio Moreau', quote: 'An absolute master of editorial layouts. The branding guidelines he delivered were clear, adaptive, and visually stunning.', "order": 2, status: 'Published' },
  { id: 'test-3', name: 'Sophie Chen', role: 'Marketing Lead', company: 'Lumina UK', quote: 'We briefed Pratik for our packaging redesign and the feedback process was seamless. Our retail conversions increased significantly.', "order": 3, status: 'Published' },
]

const defaultSettings = {
  id: 1,
  siteTitle: 'Pratik Bhusal — Graphic Designer & Art Director',
  metaDescription: 'Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging.',
  instagram: 'https://www.instagram.com/pratikbhusal_/',
  facebook: 'https://www.facebook.com/pratikbhusal',
  behance: 'https://www.behance.net/pratikbhusal',
  linkedin: 'https://www.linkedin.com/in/pratikbhusal',
  contactEmail: 'pratikbhusal12345@gmail.com',
  whatsappNumber: '+9779800000000',
  cvUrl: '/cv/pratik-bhusal-cv.pdf',
  aboutHeroText: 'I MAKE THINGS WORTH SEEING.',
  aboutBio: `I am Pratik Bhusal, a graphic designer and art director focusing on raw, structural typography, functional packaging guidelines, and holistic brand systems. Design is not just decoration — it is communication engineering. I build visual systems that help brands cut through clutter, establish clear visual architecture, and communicate value instantly to their users. Based in Kathmandu, Nepal, I work with local leaders and international teams to scale brands across packaging boxes, physical publications, and responsive digital interfaces.`,
  homepageHeadline: 'LET\'S MAKE SOMETHING WORTH SEEING.',
  sectionTwoTopWatermark: 'NORDIC',
  sectionTwoBottomWatermark: 'STUDIO',
  sectionTwoSubtitle: '01 — NORDIC BRAND IDENTITY',
  sectionTwoHeadline: 'THE GEOMETRY OF COLD LIGHT.'
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Seed a table with default data if it's currently empty */
async function seedIfEmpty(table, defaults) {
  const { data, error } = await supabase.from(table).select('id').limit(1)
  if (error) {
    console.warn(`[Seed] Could not check table '${table}':`, error.message)
    return
  }
  if (!data || data.length === 0) {
    console.info(`[Seed] Table '${table}' is empty — inserting default seed data...`)
    const { error: insertErr } = await supabase.from(table).insert(defaults)
    if (insertErr) console.warn(`[Seed] Failed to seed '${table}':`, insertErr.message)
    else console.info(`[Seed] ✅ Seeded '${table}' with ${defaults.length} records.`)
  }
}

// ─── CONTENT SERVICES (Supabase Only) ───────────────────────────────────────

export const contentServices = {

  // ─── WORKS ──────────────────────────────────────────────────────────────
  // ─── WORKS ──────────────────────────────────────────────────────────────
  async getWorks() {
    try {
      const { data, error } = await supabase.from('works').select('*').order('id', { ascending: true })
      if (!error && data && data.length > 0) {
        return data.map((w, i) => ({ ...w, id: w.id ?? w.slug ?? `work-${i + 1}` }))
      }
    } catch (e) {
      console.warn('getWorks DB query error:', e)
    }
    // Fallback: Return hardcoded works so they show up in admin panel for editing & saving
    return worksData.map((w, i) => ({
      ...w,
      id: w.id ?? w.slug ?? `work-${i + 1}`,
      status: w.status || 'Published'
    }))
  },

  async saveWork(work) {
    const coverImage = work.featuredImage || work.image || work.cover_image || ''
    const payload = {
      title: work.title || '',
      slug: work.slug || (work.title ? work.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') : `work-${Date.now()}`),
      client: work.client || '',
      category: work.category || '',
      tag: work.tag || '',
      bgWord: work.bgWord || '',
      tagline: work.tagline || work.subtitle || '',
      year: String(work.year || new Date().getFullYear()),
      services: Array.isArray(work.services) ? work.services : (work.services ? String(work.services).split(',').map(s => s.trim()) : []),
      image: coverImage,
      imageAlt: work.imageAlt || work.title || '',
      challenge: work.challenge || '',
      approach: work.approach || '',
      solution: work.solution || '',
      results: work.results || '',
      gallery: Array.isArray(work.gallery) ? work.gallery : [],
      status: work.status || 'Published',
      seoTitle: work.seoTitle || '',
      seoDescription: work.seoDescription || ''
    }
    if (work.id && typeof work.id === 'number') {
      payload.id = work.id
    }
    const { data, error } = await supabase.from('works').upsert(payload).select()
    if (error) {
      console.error('❌ saveWork error:', error)
      throw new Error(`Failed to save work: ${error.message}`)
    }
    return data[0]
  },

  async deleteWork(identifier) {
    const filter = typeof identifier === 'number' ? `id.eq.${identifier}` : `slug.eq.${identifier}`
    const { error } = await supabase.from('works').delete().or(filter)
    if (error) {
      console.error('❌ deleteWork error:', error)
      throw new Error(`Failed to delete work: ${error.message}`)
    }
  },

  // ─── BLOG POSTS ─────────────────────────────────────────────────────────
  async getBlogPosts() {
    try {
      let { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
      if (error || !data || data.length === 0) {
        const res = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
        data = res.data
        error = res.error
      }
      if (!error && data && data.length > 0) {
        return data.map((b, i) => ({
          ...b,
          id: b.id ?? b.slug ?? `blog-${i + 1}`,
          featuredImage: b.cover_image || b.featuredImage || b.image || '',
          image: b.cover_image || b.image || b.featuredImage || '',
          imageAlt: b.cover_image_alt || b.imageAlt || '',
          seoTitle: b.seo_title || b.seoTitle || '',
          seoDescription: b.seo_description || b.seoDescription || '',
          publishDate: b.published_at || b.publishDate || b.date || '',
          status: b.status || 'Published',
        }))
      }
    } catch (e) {
      console.warn('getBlogPosts DB query error:', e)
    }
    // Fallback: Return hardcoded blog posts so they show up in admin panel for editing & saving
    return blogPosts.map((b, i) => ({
      ...b,
      id: b.id ?? b.slug ?? `blog-${i + 1}`,
      status: b.status || 'Published'
    }))
  },

  async saveBlogPost(post) {
    const blogRow = {
      title: post.title,
      content: post.content,
      author: post.author || 'Pratik Bhusal',
      slug: post.slug || (post.title ? post.title.toLowerCase().replace(/\s+/g, '-') : ''),
      category: post.category || 'General',
      excerpt: post.excerpt || '',
      cover_image: post.featuredImage || post.coverImage || post.image || '',
      cover_image_alt: post.imageAlt || post.coverImageAlt || '',
      tags: Array.isArray(post.tags) ? post.tags : (post.tags ? String(post.tags).split(',') : []),
      featured: Boolean(post.featured),
      seo_title: post.seoTitle || '',
      seo_description: post.seoDescription || '',
      status: (post.status || 'draft').toLowerCase(),
      published_at: post.publishDate || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    if (post.id && typeof post.id === 'number') {
      blogRow.id = post.id
    }

    // Try 'blog_posts' table first
    let { data, error } = await supabase.from('blog_posts').upsert(blogRow).select()
    if (error) {
      // Fallback to 'blogs' table
      const res = await supabase.from('blogs').upsert(blogRow).select()
      data = res.data
      error = res.error
    }

    if (error) {
      console.error('❌ saveBlogPost error:', error)
      throw new Error(`Failed to save blog post: ${error.message}`)
    }
    return data[0]
  },

  async deleteBlogPost(identifier) {
    // Try both table names
    await supabase.from('blogs').delete().or(`id.eq.${identifier},slug.eq.${identifier}`)
    const { error } = await supabase.from('blog_posts').delete().or(`id.eq.${identifier},slug.eq.${identifier}`)
    if (error) console.warn('deleteBlogPost:', error.message)
  },

  // ─── TESTIMONIALS ───────────────────────────────────────────────────────
  async getTestimonials() {
    await seedIfEmpty('testimonials', defaultTestimonials)
    const { data, error } = await supabase.from('testimonials').select('*').order('"order"', { ascending: true })
    if (error) {
      console.error('❌ getTestimonials error:', error.message)
      return defaultTestimonials
    }
    return (data || []).map(t => ({
      ...t,
      avatarImage: t.avatar_image || t.avatarImage || t.avatar || ''
    }))
  },

  async saveTestimonial(t) {
    const avatar = t.avatarImage || t.avatar_image || t.avatar || ''
    const payload = {
      id: t.id || `test-${Date.now()}`,
      name: t.name || '',
      role: t.role || '',
      company: t.company || '',
      quote: t.quote || '',
      order: Number(t.order) || 0,
      status: t.status || 'Published',
      avatar_image: avatar
    }
    let { data, error } = await supabase.from('testimonials').upsert(payload).select()
    if (error && (error.message.includes('avatar_image') || error.code === 'PGRST204' || error.message.includes('schema cache'))) {
      delete payload.avatar_image
      const res = await supabase.from('testimonials').upsert(payload).select()
      data = res.data
      error = res.error
    }
    if (error) {
      console.error('❌ saveTestimonial error:', error)
      throw new Error(`Failed to save testimonial: ${error.message}`)
    }
    const saved = (data && data[0]) ? data[0] : payload
    return {
      ...saved,
      avatarImage: saved.avatar_image || saved.avatarImage || avatar,
      avatar_image: saved.avatar_image || avatar,
      avatar: saved.avatar || avatar
    }
  },

  async deleteTestimonial(identifier) {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .or(`id.eq.${identifier},name.eq.${identifier}`)
    if (error) {
      console.error('❌ deleteTestimonial error:', error)
      throw new Error(`Failed to delete testimonial: ${error.message}`)
    }
  },

  // ─── CAPABILITIES ──────────────────────────────────────────────────────
  async getCapabilities() {
    await seedIfEmpty('capabilities', defaultCapabilities)
    const { data, error } = await supabase.from('capabilities').select('*').order('"order"', { ascending: true })
    if (error) {
      console.error('❌ getCapabilities error:', error.message)
      return defaultCapabilities
    }
    return data
  },

  async saveCapability(c) {
    const payload = {
      id: c.id || `cap-${Date.now()}`,
      name: c.name || '',
      desc: c.desc || '',
      order: Number(c.order) || 0
    }
    const { data, error } = await supabase.from('capabilities').upsert(payload).select()
    if (error) {
      console.error('❌ saveCapability error:', error)
      throw new Error(`Failed to save capability: ${error.message}`)
    }
    return data[0]
  },

  async deleteCapability(identifier) {
    const { error } = await supabase
      .from('capabilities')
      .delete()
      .or(`id.eq.${identifier},name.eq.${identifier}`)
    if (error) {
      console.error('❌ deleteCapability error:', error)
      throw new Error(`Failed to delete capability: ${error.message}`)
    }
  },

  // ─── MILESTONES ─────────────────────────────────────────────────────────
  async getMilestones() {
    await seedIfEmpty('milestones', defaultMilestones)
    const { data, error } = await supabase.from('milestones').select('*').order('"order"', { ascending: true })
    if (error) {
      console.error('❌ getMilestones error:', error.message)
      return defaultMilestones
    }
    return data
  },

  async saveMilestone(m) {
    const payload = {
      id: m.id || `m-${Date.now()}`,
      year: String(m.year || ''),
      title: m.title || '',
      desc: m.desc || '',
      order: Number(m.order) || 0
    }
    const { data, error } = await supabase.from('milestones').upsert(payload).select()
    if (error) {
      console.error('❌ saveMilestone error:', error)
      throw new Error(`Failed to save milestone: ${error.message}`)
    }
    return data[0]
  },

  async deleteMilestone(identifier) {
    const { error } = await supabase
      .from('milestones')
      .delete()
      .or(`id.eq.${identifier},title.eq.${identifier}`)
    if (error) {
      console.error('❌ deleteMilestone error:', error)
      throw new Error(`Failed to delete milestone: ${error.message}`)
    }
  },

  // ─── SITE SETTINGS ─────────────────────────────────────────────────────
  async getSettings() {
    const { data, error } = await supabase.from('site_settings').select('*').single()
    if (error || !data) {
      console.warn('getSettings: No settings in DB, seeding defaults...')
      const { data: seeded, error: seedErr } = await supabase.from('site_settings').upsert(defaultSettings).select().single()
      if (seedErr) {
        console.error('❌ Seed settings error:', seedErr.message)
        return defaultSettings
      }
      return seeded
    }
    return data
  },

  async saveSettings(settings) {
    const { data, error } = await supabase.from('site_settings').upsert({ id: 1, ...settings }).select()
    if (error) {
      console.error('❌ saveSettings error:', error)
      throw new Error(`Failed to save settings: ${error.message}`)
    }
    return data[0]
  },

  // ─── FILE STORAGE UPLOAD (Supabase Storage Only) ─────────────────────────
  async uploadFile(file) {
    if (!file) return ''
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
    const fileName = `${Date.now()}-${cleanName}`

    const { data, error } = await supabase.storage.from('assets').upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    })

    if (error) {
      console.error('❌ Supabase Storage Upload Error:', error)
      throw new Error(`Storage error: ${error.message}`)
    }

    const { data: urlData } = supabase.storage.from('assets').getPublicUrl(fileName)
    console.info('✅ Uploaded to Supabase Storage:', urlData.publicUrl)
    return urlData.publicUrl
  }
}
