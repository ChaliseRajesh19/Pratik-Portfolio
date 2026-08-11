import React, { createContext, useContext, useState, useEffect } from 'react'
import { contentServices } from '../services/contentService'
import { worksData } from '../data/worksData'
import { blogPosts } from '../data/blogData'

const ContentContext = createContext({
  works: worksData,
  blogs: blogPosts,
  testimonials: [],
  capabilities: [],
  milestones: [],
  settings: {
    siteTitle: 'Pratik Bhusal — Graphic Designer & Art Director',
    metaDescription: 'Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging.',
    contactEmail: 'pratikbhusal12345@gmail.com',
    cvUrl: '/cv/pratik-bhusal-cv.pdf',
    aboutHeroText: 'I MAKE THINGS WORTH SEEING.',
    aboutBio: 'I am Pratik Bhusal, a graphic designer and art director focusing on raw, structural typography, functional packaging guidelines, and holistic brand systems.',
    homepageHeadline: 'LET\'S MAKE SOMETHING WORTH SEEING.',
    sectionTwoTopWatermark: 'NORDIC',
    sectionTwoBottomWatermark: 'STUDIO',
    sectionTwoSubtitle: '01 — NORDIC BRAND IDENTITY',
    sectionTwoHeadline: 'THE GEOMETRY OF COLD LIGHT.'
  }
})

export function ContentProvider({ children }) {
  const [works, setWorks] = useState(worksData)
  const [blogs, setBlogs] = useState(blogPosts)
  const [testimonials, setTestimonials] = useState([])
  const [capabilities, setCapabilities] = useState([])
  const [milestones, setMilestones] = useState([])
  const [settings, setSettings] = useState({
    siteTitle: 'Pratik Bhusal — Graphic Designer & Art Director',
    metaDescription: 'Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging.',
    contactEmail: 'pratikbhusal12345@gmail.com',
    cvUrl: '/cv/pratik-bhusal-cv.pdf',
    aboutHeroText: 'I MAKE THINGS WORTH SEEING.',
    aboutBio: 'I am Pratik Bhusal, a graphic designer and art director focusing on raw, structural typography, functional packaging guidelines, and holistic brand systems.',
    homepageHeadline: 'LET\'S MAKE SOMETHING WORTH SEEING.',
    sectionTwoTopWatermark: 'NORDIC',
    sectionTwoBottomWatermark: 'STUDIO',
    sectionTwoSubtitle: '01 — NORDIC BRAND IDENTITY',
    sectionTwoHeadline: 'THE GEOMETRY OF COLD LIGHT.'
  })

  const refreshContent = async () => {
    try {
      const [w, b, t, c, m, s] = await Promise.all([
        contentServices.getWorks(),
        contentServices.getBlogPosts(),
        contentServices.getTestimonials(),
        contentServices.getCapabilities(),
        contentServices.getMilestones(),
        contentServices.getSettings()
      ])
      if (Array.isArray(w)) setWorks(w)
      if (Array.isArray(b)) setBlogs(b)
      if (Array.isArray(t)) setTestimonials(t)
      if (Array.isArray(c)) setCapabilities(c)
      if (Array.isArray(m)) setMilestones(m)
      if (s && typeof s === 'object') setSettings(prev => ({ ...prev, ...s }))
    } catch (err) {
      console.error('Error fetching dynamic content inside ContentProvider:', err)
    }
  }

  useEffect(() => {
    refreshContent()

    const handleContentUpdate = () => {
      refreshContent()
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('portfolio_content_updated', handleContentUpdate)
      window.addEventListener('storage', handleContentUpdate)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('portfolio_content_updated', handleContentUpdate)
        window.removeEventListener('storage', handleContentUpdate)
      }
    }
  }, [])

  return (
    <ContentContext.Provider
      value={{
        works,
        blogs,
        testimonials,
        capabilities,
        milestones,
        settings,
        refreshContent,
        setWorks,
        setBlogs,
        setTestimonials,
        setCapabilities,
        setMilestones,
        setSettings
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
