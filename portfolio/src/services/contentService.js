import { createClient } from '@supabase/supabase-js'
import { worksData } from '../data/worksData'
import { blogPosts } from '../data/blogData'

// Initialize Supabase if keys are provided
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''
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

export const contentServices = {
  // ─── WORKS ───────────────────────────────────────────────────────────────
  async getWorks() {
    if (supabase) {
      const { data, error } = await supabase.from('works').select('*').order('id', { ascending: true })
      if (!error && data) return data
    }
    return getLocal('works', worksData)
  },

  async saveWork(work) {
    if (supabase) {
      const { data, error } = await supabase.from('works').upsert(work).select()
      if (!error && data) return data[0]
    }
    const works = await this.getWorks()
    const idx = works.findIndex(w => w.slug === work.slug || w.id === work.id)
    if (idx !== -1) {
      works[idx] = { ...works[idx], ...work }
    } else {
      works.push({ id: Date.now(), ...work })
    }
    setLocal('works', works)
    return work
  },

  async deleteWork(id) {
    if (supabase) {
      await supabase.from('works').delete().eq('id', id)
      return
    }
    const works = await this.getWorks()
    const filtered = works.filter(w => w.id !== id)
    setLocal('works', filtered)
  },

  // ─── BLOG POSTS ──────────────────────────────────────────────────────────
  async getBlogPosts() {
    if (supabase) {
      const { data, error } = await supabase.from('blog_posts').select('*').order('publishDate', { ascending: false })
      if (!error && data) return data
    }
    return getLocal('blog', blogPosts)
  },

  async saveBlogPost(post) {
    if (supabase) {
      const { data, error } = await supabase.from('blog_posts').upsert(post).select()
      if (!error && data) return data[0]
    }
    const posts = await this.getBlogPosts()
    const idx = posts.findIndex(p => p.slug === post.slug || p.id === post.id)
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], ...post }
    } else {
      posts.push({ id: Date.now(), ...post })
    }
    setLocal('blog', posts)
    return post
  },

  async deleteBlogPost(id) {
    if (supabase) {
      await supabase.from('blog_posts').delete().eq('id', id)
      return
    }
    const posts = await this.getBlogPosts()
    const filtered = posts.filter(p => p.id !== id)
    setLocal('blog', filtered)
  },

  // ─── TESTIMONIALS ────────────────────────────────────────────────────────
  async getTestimonials() {
    if (supabase) {
      const { data, error } = await supabase.from('testimonials').select('*').order('order', { ascending: true })
      if (!error && data) return data
    }
    return getLocal('testimonials', defaultTestimonials)
  },

  async saveTestimonial(t) {
    if (supabase) {
      const { data, error } = await supabase.from('testimonials').upsert(t).select()
      if (!error && data) return data[0]
    }
    const list = await this.getTestimonials()
    const idx = list.findIndex(item => item.id === t.id)
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...t }
    } else {
      list.push({ id: `test-${Date.now()}`, ...t })
    }
    setLocal('testimonials', list)
    return t
  },

  async deleteTestimonial(id) {
    if (supabase) {
      await supabase.from('testimonials').delete().eq('id', id)
      return
    }
    const list = await this.getTestimonials()
    const filtered = list.filter(item => item.id !== id)
    setLocal('testimonials', filtered)
  },

  // ─── CAPABILITIES ────────────────────────────────────────────────────────
  async getCapabilities() {
    if (supabase) {
      const { data, error } = await supabase.from('capabilities').select('*').order('order', { ascending: true })
      if (!error && data) return data
    }
    return getLocal('capabilities', defaultCapabilities)
  },

  async saveCapability(c) {
    if (supabase) {
      const { data, error } = await supabase.from('capabilities').upsert(c).select()
      if (!error && data) return data[0]
    }
    const list = await this.getCapabilities()
    const idx = list.findIndex(item => item.id === c.id)
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...c }
    } else {
      list.push({ id: `cap-${Date.now()}`, ...c })
    }
    setLocal('capabilities', list)
    return c
  },

  async deleteCapability(id) {
    if (supabase) {
      await supabase.from('capabilities').delete().eq('id', id)
      return
    }
    const list = await this.getCapabilities()
    const filtered = list.filter(item => item.id !== id)
    setLocal('capabilities', filtered)
  },

  // ─── MILESTONES ──────────────────────────────────────────────────────────
  async getMilestones() {
    if (supabase) {
      const { data, error } = await supabase.from('milestones').select('*').order('order', { ascending: true })
      if (!error && data) return data
    }
    return getLocal('milestones', defaultMilestones)
  },

  async saveMilestone(m) {
    if (supabase) {
      const { data, error } = await supabase.from('milestones').upsert(m).select()
      if (!error && data) return data[0]
    }
    const list = await this.getMilestones()
    const idx = list.findIndex(item => item.id === m.id)
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...m }
    } else {
      list.push({ id: `m-${Date.now()}`, ...m })
    }
    setLocal('milestones', list)
    return m
  },

  async deleteMilestone(id) {
    if (supabase) {
      await supabase.from('milestones').delete().eq('id', id)
      return
    }
    const list = await this.getMilestones()
    const filtered = list.filter(item => item.id !== id)
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
