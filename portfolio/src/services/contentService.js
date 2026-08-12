import { createClient } from '@supabase/supabase-js'
import { worksData } from '../data/worksData'
import { blogPosts } from '../data/blogData'
import { ENV } from '../config/env'

// Initialize Supabase using central config
const supabaseUrl = ENV.SUPABASE_URL
const supabaseAnonKey = ENV.SUPABASE_ANON_KEY
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Initial Seed data structures
const defaultCapabilities = [
  {
    id: 'cap-1',
    name: 'VISUAL BRANDING',
    desc: 'Developing cohesive, scalable visual assets, logo identities, adaptive grid systems, and typographic guidelines to align brand perception.',
    order: 1
  },
  {
    id: 'cap-2',
    name: 'EDITORIAL DESIGN',
    desc: 'Configuring monographs, booklets, catalogs, and technical publication layouts using mathematical grids and fine horological typefaces.',
    order: 2
  },
  {
    id: 'cap-3',
    name: 'ART DIRECTION',
    desc: 'Guiding marketing poster designs, destination brochures, social assets, and live World Cup match campaigns from concept to production.',
    order: 3
  },
  {
    id: 'cap-4',
    name: 'PACKAGING SYSTEMS',
    desc: 'Designing sustainable, tactile cosmetic boxes, product containers, concrete vessels, and minimal logistics packaging that feel premium.',
    order: 4
  },
  {
    id: 'cap-5',
    name: 'DIGITAL INTERFACES',
    desc: 'Structuring responsive mobile layout deck shuffles, dark-mode styling systems, interactive cursor tracking states, and clean transition flows.',
    order: 5
  }
]

const defaultMilestones = [
  { id: 'm-1', year: '2023', title: 'STUDIO INCUBATION', desc: 'Started freelancing and consulting for small scale businesses on visual communication assets.', order: 1 },
  { id: 'm-2', year: '2024', title: 'REGIONAL EXPANSION', desc: 'Overhauled brand systems and directed marketing design strategies for medium scale ventures.', order: 2 },
  { id: 'm-3', year: '2025', title: 'PRODUCT FOCUS', desc: 'Pivoted to a holistic design model merging packaging structures, print publications, and digital products.', order: 3 },
  { id: 'm-4', year: '2026', title: 'SUPER-APP DEPLOYMENT', desc: 'Successfully designed the master visual design system and logistics assets for Pathao Nepal.', order: 4 }
]

const defaultTestimonials = [
  {
    id: 'test-1',
    name: 'Niraj Joshi',
    role: 'Founder',
    company: 'Joshi Media',
    quote: "Pratik's visual systems transformed our digital products. His eye for typography and grid alignment is second to none.",
    order: 1,
    status: 'Published'
  },
  {
    id: 'test-2',
    name: 'Alex Moreau',
    role: 'Creative Director',
    company: 'Studio Moreau',
    quote: 'An absolute master of editorial layouts. The branding guidelines he delivered were clear, adaptive, and visually stunning.',
    order: 2,
    status: 'Published'
  },
  {
    id: 'test-3',
    name: 'Sophie Chen',
    role: 'Marketing Lead',
    company: 'Lumina UK',
    quote: 'We briefed Pratik for our packaging redesign and the feedback process was seamless. Our retail conversions increased significantly.',
    order: 3,
    status: 'Published'
  }
]

const defaultSettings = {
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

// Local Storage Initializers (Fallbacks)
const getLocal = (key, defaultVal) => {
  if (typeof window === 'undefined') return defaultVal
  const stored = localStorage.getItem(`pratik_${key}`)
  if (!stored) {
    localStorage.setItem(`pratik_${key}`, JSON.stringify(defaultVal))
    return defaultVal
  }
  return JSON.parse(stored)
}

const setLocal = (key, val) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`pratik_${key}`, JSON.stringify(val))
  }
}

export const formatSupabaseError = (error, tableName) => {
  if (!error) return null;
  const code = error.code || 'PGRST205';
  const msg = error.message || '';
  if (code === 'PGRST205' || msg.includes('schema cache') || msg.includes('does not exist') || msg.includes('Could not find')) {
    return `Supabase Schema Error (${code}): Table 'public.${tableName}' not found in database. Saved locally.`;
  }
  if (code === '42501' || msg.includes('row-level security') || msg.includes('RLS')) {
    return `Supabase Permission Error (42501): RLS policy blocking write to '${tableName}'. Saved locally.`;
  }
  if (code === '23505') {
    return `Supabase Constraint Error (23505): Duplicate entry in '${tableName}'. Saved locally.`;
  }
  return `Supabase Error (${code}): ${msg || 'Operation failed'}. Saved locally.`;
};

export const contentServices = {
  // ─── WORKS ───────────────────────────────────────────────────────────────
  async getWorks() {
    if (supabase) {
      const { data, error } = await supabase.from('works').select('*').order('id', { ascending: true })
      if (!error && data) {
        return data.map((w, idx) => ({ ...w, id: w.id ?? w.slug ?? `work-${idx + 1}` }))
      }
      if (error) {
        console.warn('Supabase getWorks fallback:', error.message || error)
      }
    }
    const list = getLocal('works', worksData)
    return (list || []).map((work, idx) => ({
      ...work,
      id: work.id ?? work.slug ?? `work-${idx + 1}`
    }))
  },

  async saveWork(work) {
    let supabaseErr = null;
    if (supabase) {
      const { data, error } = await supabase.from('works').upsert(work).select()
      if (!error && data) return data[0]
      if (error) {
        console.error('Supabase saveWork error:', error)
        supabaseErr = formatSupabaseError(error, 'works')
      }
    }
    const works = await this.getWorks()
    const targetStr = String(work.id || work.slug || work.title)
    const idx = works.findIndex(w => String(w.id) === targetStr || String(w.slug) === targetStr)
    if (idx !== -1) {
      works[idx] = { ...works[idx], ...work }
    } else {
      works.push({ id: work.id || Date.now(), ...work })
    }
    setLocal('works', works)
    if (supabaseErr) throw new Error(supabaseErr)
    return work
  },

  async deleteWork(identifier) {
    const targetStr = String(identifier)
    if (supabase) {
      try {
        await supabase.from('works').delete().or(`id.eq.${identifier},slug.eq.${identifier},title.eq.${identifier}`)
      } catch (e) {
        console.warn('Supabase delete work fallback', e)
      }
    }
    const current = getLocal('works', worksData)
    const filtered = (current || []).filter(w => 
      String(w.id) !== targetStr && 
      String(w.slug) !== targetStr && 
      String(w.title) !== targetStr
    )
    setLocal('works', filtered)
  },

  // ─── BLOG POSTS ──────────────────────────────────────────────────────────
  async getBlogPosts() {
    if (supabase) {
      // Try 'blogs' table (blog-design schema) first
      let { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
      if (error || !data) {
        const res = await supabase.from('blog_posts').select('*')
        data = res.data
        error = res.error
      }
      if (!error && data) {
        return data.map((b, idx) => ({
          ...b,
          id: b.id ?? b.slug ?? `blog-${idx + 1}`,
          featuredImage: b.cover_image || b.featuredImage || b.image || '',
          image: b.cover_image || b.image || b.featuredImage || '',
          imageAlt: b.cover_image_alt || b.imageAlt || '',
          seoTitle: b.seo_title || b.seoTitle || '',
          seoDescription: b.seo_description || b.seoDescription || '',
          publishDate: b.published_at || b.publishDate || b.date || '',
          status: b.status || 'Draft',
        }))
      }
    }
    const list = getLocal('blog', blogPosts)
    return (list || []).map((post, idx) => ({
      ...post,
      id: post.id ?? post.slug ?? `blog-${idx + 1}`
    }))
  },

  async saveBlogPost(post) {
    let supabaseErr = null;
    if (supabase) {
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
      if (post.id) blogRow.id = post.id

      // Try inserting into 'blogs' table first
      const { data, error } = await supabase.from('blogs').upsert(blogRow).select()
      if (!error && data) return data[0]

      // Fallback to 'blog_posts' table
      const { data: dataFallback, error: errFallback } = await supabase.from('blog_posts').upsert(post).select()
      if (!errFallback && dataFallback) return dataFallback[0]

      if (error || errFallback) {
        console.error('Supabase saveBlogPost error:', error || errFallback)
        supabaseErr = formatSupabaseError(error || errFallback, 'blogs')
      }
    }

    const posts = await this.getBlogPosts()
    const targetStr = String(post.id || post.slug || post.title)
    const idx = posts.findIndex(p => String(p.id) === targetStr || String(p.slug) === targetStr)
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], ...post }
    } else {
      posts.push({ id: post.id || Date.now(), ...post })
    }
    setLocal('blog', posts)
    if (supabaseErr) throw new Error(supabaseErr)
    return post
  },

  async deleteBlogPost(identifier) {
    const targetStr = String(identifier)
    if (supabase) {
      try {
        await supabase.from('blogs').delete().or(`id.eq.${identifier},slug.eq.${identifier},title.eq.${identifier}`)
        await supabase.from('blog_posts').delete().or(`id.eq.${identifier},slug.eq.${identifier},title.eq.${identifier}`)
      } catch (e) {
        console.warn('Supabase delete blog fallback', e)
      }
    }
    const current = getLocal('blog', blogPosts)
    const filtered = (current || []).filter(p => 
      String(p.id) !== targetStr && 
      String(p.slug) !== targetStr && 
      String(p.title) !== targetStr
    )
    setLocal('blog', filtered)
  },

  // ─── TESTIMONIALS ────────────────────────────────────────────────────────
  async getTestimonials() {
    if (supabase) {
      const { data, error } = await supabase.from('testimonials').select('*').order('order', { ascending: true })
      if (!error && data) return data
      if (error) {
        console.warn('Supabase getTestimonials fallback:', error.message || error)
      }
    }
    return getLocal('testimonials', defaultTestimonials)
  },

  async saveTestimonial(t) {
    let supabaseErr = null;
    if (supabase) {
      const { data, error } = await supabase.from('testimonials').upsert(t).select()
      if (!error && data) return data[0]
      if (error) {
        console.error('Supabase saveTestimonial error:', error)
        supabaseErr = formatSupabaseError(error, 'testimonials')
      }
    }
    const list = await this.getTestimonials()
    const targetStr = String(t.id)
    const idx = list.findIndex(item => String(item.id) === targetStr)
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...t }
    } else {
      list.push({ id: t.id || `test-${Date.now()}`, ...t })
    }
    setLocal('testimonials', list)
    if (supabaseErr) throw new Error(supabaseErr)
    return t
  },

  async deleteTestimonial(identifier) {
    const targetStr = String(identifier)
    if (supabase) {
      try {
        await supabase.from('testimonials').delete().or(`id.eq.${identifier},name.eq.${identifier}`)
      } catch (e) {
        console.warn('Supabase delete testimonial fallback', e)
      }
    }
    const current = getLocal('testimonials', defaultTestimonials)
    const filtered = (current || []).filter(item => 
      String(item.id) !== targetStr && 
      String(item.name) !== targetStr
    )
    setLocal('testimonials', filtered)
  },

  // ─── CAPABILITIES ────────────────────────────────────────────────────────
  async getCapabilities() {
    if (supabase) {
      const { data, error } = await supabase.from('capabilities').select('*').order('order', { ascending: true })
      if (!error && data) return data
      if (error) console.warn('Supabase getCapabilities fallback:', error.message || error)
    }
    return getLocal('capabilities', defaultCapabilities)
  },

  async saveCapability(c) {
    let supabaseErr = null;
    if (supabase) {
      const { data, error } = await supabase.from('capabilities').upsert(c).select()
      if (!error && data) return data[0]
      if (error) {
        console.error('Supabase saveCapability error:', error)
        supabaseErr = formatSupabaseError(error, 'capabilities')
      }
    }
    const list = await this.getCapabilities()
    const idx = list.findIndex(item => item.id === c.id)
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...c }
    } else {
      list.push({ id: c.id || `cap-${Date.now()}`, ...c })
    }
    setLocal('capabilities', list)
    if (supabaseErr) throw new Error(supabaseErr)
    return c
  },

  async deleteCapability(identifier) {
    const targetStr = String(identifier)
    if (supabase) {
      try {
        await supabase.from('capabilities').delete().or(`id.eq.${identifier},name.eq.${identifier}`)
      } catch (e) {
        console.warn('Supabase delete capability fallback', e)
      }
    }
    const current = getLocal('capabilities', defaultCapabilities)
    const filtered = (current || []).filter(item => 
      String(item.id) !== targetStr && 
      String(item.name) !== targetStr
    )
    setLocal('capabilities', filtered)
  },

  // ─── MILESTONES ──────────────────────────────────────────────────────────
  async getMilestones() {
    if (supabase) {
      const { data, error } = await supabase.from('milestones').select('*').order('order', { ascending: true })
      if (!error && data) return data
      if (error) console.warn('Supabase getMilestones fallback:', error.message || error)
    }
    return getLocal('milestones', defaultMilestones)
  },

  async saveMilestone(m) {
    let supabaseErr = null;
    if (supabase) {
      const { data, error } = await supabase.from('milestones').upsert(m).select()
      if (!error && data) return data[0]
      if (error) {
        console.error('Supabase saveMilestone error:', error)
        supabaseErr = formatSupabaseError(error, 'milestones')
      }
    }
    const list = await this.getMilestones()
    const targetStr = String(m.id)
    const idx = list.findIndex(item => String(item.id) === targetStr)
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...m }
    } else {
      list.push({ id: m.id || `m-${Date.now()}`, ...m })
    }
    setLocal('milestones', list)
    if (supabaseErr) throw new Error(supabaseErr)
    return m
  },

  async deleteMilestone(identifier) {
    const targetStr = String(identifier)
    if (supabase) {
      try {
        await supabase.from('milestones').delete().or(`id.eq.${identifier},title.eq.${identifier}`)
      } catch (e) {
        console.warn('Supabase delete milestone fallback', e)
      }
    }
    const current = getLocal('milestones', defaultMilestones)
    const filtered = (current || []).filter(item => 
      String(item.id) !== targetStr && 
      String(item.title) !== targetStr
    )
    setLocal('milestones', filtered)
  },

  // ─── SITE SETTINGS ───────────────────────────────────────────────────────
  async getSettings() {
    if (supabase) {
      const { data, error } = await supabase.from('site_settings').select('*').single()
      if (!error && data) return data
    }
    return getLocal('settings', defaultSettings)
  },

  async saveSettings(settings) {
    if (supabase) {
      const { data, error } = await supabase.from('site_settings').upsert({ id: 1, ...settings }).select()
      if (!error && data) return data[0]
    }
    const current = await this.getSettings()
    const updated = { ...current, ...settings }
    setLocal('settings', updated)
    return updated
  },

  // ─── FILE STORAGE UPLOAD ─────────────────────────────────────────────────
  async uploadFile(file) {
    if (supabase) {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
      const { data, error } = await supabase.storage.from('assets').upload(fileName, file)
      if (!error && data) {
        const { data: urlData } = supabase.storage.from('assets').getPublicUrl(fileName)
        return urlData.publicUrl
      }
    }
    // Fallback: compress then convert to base64 data URL for local persistence
    return new Promise((resolve, reject) => {
      const img = new Image()
      const objectUrl = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(objectUrl)
        const MAX_W = 1200
        const scale = img.width > MAX_W ? MAX_W / img.width : 1
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = objectUrl
    })
  }
}
