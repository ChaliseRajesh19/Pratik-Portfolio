import React from 'react'
import { useContent } from './context/ContentContext'
import { useParams } from 'react-router-dom'
import SEO from './components/SEO'
import App from './App'

// Core Components
import Hero from './components/Hero'
import SectionTwo from './components/SectionTwo'
import WorksSection from './components/WorksSection'
import RevealMechanicsSection from './components/RevealMechanicsSection'
import AboutSection from './components/AboutSection'
import PhilosophySection from './components/PhilosophySection'
import ExpertiseSection from './components/ExpertiseSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'

// Standalone Core Page Components
import AboutPage from './components/AboutPage'
import WorksListing from './components/WorksListing'
import WorkPost from './components/WorkPost'
import BlogListing from './components/BlogListing'
import BlogPost from './components/BlogPost'
import AdminPanel from './admin/AdminPanel'
import StatsSection from './components/StatsSection'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'

// Reusable Home Page wrapper
function HomeRoute() {
  const { works, testimonials, settings } = useContent()
  const publicWorks = works.filter(w => w.status !== 'Draft')
  const publicTestimonials = testimonials.filter(t => t.status !== 'Draft')

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pratik Bhusal",
    "url": "https://pratikbhusal.com",
    "description": "Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging.",
    "publisher": {
      "@type": "Organization",
      "name": "Pratik Bhusal Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pratikbhusal.com/src/assets/logo.png"
      }
    }
  }

  return (
    <>
      <SEO
        title="Home"
        description="Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging by Pratik Bhusal."
        url="https://pratikbhusal.com"
        ogType="website"
        jsonLd={homeJsonLd}
      />
      <Hero initialSettings={settings} />
      <StatsSection title="[ TRACK RECORD ]" />
      <SectionTwo />
      <WorksSection initialWorks={publicWorks} />
      <RevealMechanicsSection />
      <AboutSection initialSettings={settings} />
      <PhilosophySection />
      <ExpertiseSection />
      <TestimonialsSection initialTestimonials={publicTestimonials} />
      <ContactSection initialSettings={settings} />
    </>
  )
}

function AboutRoute() {
  const { capabilities, milestones, settings } = useContent()
  return (
    <>
      <SEO
        title="About — Pratik Bhusal | Brand & Visual Designer"
        description="Learn about the design philosophy, milestones, and capabilities of Pratik Bhusal, a professional visual designer based in Nepal."
        url="https://pratikbhusal.com/about"
        ogType="website"
      />
      <AboutPage
        initialCapabilities={capabilities}
        initialMilestones={milestones}
        initialSettings={settings}
      />
    </>
  )
}

function WorksListingRoute() {
  const { works } = useContent()
  const publicWorks = works.filter(w => w.status !== 'Draft')
  return (
    <>
      <SEO
        title="Selected Works & Case Studies"
        description="Curated visual systems, brand design, packaging solutions, and editorial typography by Pratik Bhusal."
        url="https://pratikbhusal.com/works"
        ogType="website"
      />
      <WorksListing initialWorks={publicWorks} />
    </>
  )
}

function WorkPostRoute() {
  const { works } = useContent()
  const publicWorks = works.filter(w => w.status !== 'Draft')
  const { slug } = useParams()
  const work = publicWorks.find(w => w.slug === slug)

  const creativeWorkJsonLd = work ? {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": work.seoTitle || work.title,
    "image": work.image,
    "description": work.seoDescription || work.tagline || work.subtitle,
    "creator": {
      "@type": "Person",
      "name": "Pratik Bhusal"
    }
  } : null

  const breadcrumbJsonLd = work ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pratikbhusal.com" },
      { "@type": "ListItem", "position": 2, "name": "Works", "item": "https://pratikbhusal.com/works" },
      { "@type": "ListItem", "position": 3, "name": work.title, "item": `https://pratikbhusal.com/works/${work.slug}` }
    ]
  } : null

  return (
    <>
      {work && (
        <>
          <SEO
            title={work.seoTitle || work.title}
            description={work.seoDescription || work.tagline || work.subtitle}
            ogImage={work.image}
            url={`https://pratikbhusal.com/works/${work.slug}`}
            jsonLd={creativeWorkJsonLd}
          />
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbJsonLd)}
          </script>
        </>
      )}
      <WorkPost initialWorks={publicWorks} slug={slug} />
    </>
  )
}

function BlogListingRoute() {
  const { blogs } = useContent()
  const publicBlogs = blogs.filter(b => b.status !== 'Draft')
  return (
    <>
      <SEO
        title="Journal & Writings"
        description="Read essays on design philosophy, packaging guidelines, typographic architecture, and creative case studies."
        url="https://pratikbhusal.com/blog"
        ogType="website"
      />
      <BlogListing initialBlogs={publicBlogs} />
    </>
  )
}

function BlogPostRoute() {
  const { blogs } = useContent()
  const publicBlogs = blogs.filter(b => b.status !== 'Draft')
  const { slug } = useParams()
  const post = publicBlogs.find(p => p.slug === slug)

  const blogJsonLd = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seoTitle || post.title,
    "image": post.image,
    "datePublished": post.publishDate || post.date || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": "Pratik Bhusal"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pratik Bhusal Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pratikbhusal.com/src/assets/logo.png"
      }
    },
    "description": post.seoDescription || post.excerpt
  } : null

  const breadcrumbJsonLd = post ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pratikbhusal.com" },
      { "@type": "ListItem", "position": 2, "name": "Journal", "item": "https://pratikbhusal.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://pratikbhusal.com/blog/${post.slug}` }
    ]
  } : null

  return (
    <>
      {post && (
        <>
          <SEO
            title={post.seoTitle || post.title}
            description={post.seoDescription || post.excerpt}
            ogImage={post.image}
            ogType="article"
            url={`https://pratikbhusal.com/blog/${post.slug}`}
            jsonLd={blogJsonLd}
          />
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbJsonLd)}
          </script>
        </>
      )}
      <BlogPost initialBlogs={publicBlogs} slug={slug} />
    </>
  )
}

function AdminRoute() {
  return <AdminPanel />
}

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomeRoute />
      },
      {
        path: 'about',
        element: <AboutRoute />
      },
      {
        path: 'works',
        element: <WorksListingRoute />
      },
      {
        path: 'works/:slug',
        element: <WorkPostRoute />
      },
      {
        path: 'blog',
        element: <BlogListingRoute />
      },
      {
        path: 'blog/:slug',
        element: <BlogPostRoute />
      },
      {
        path: 'admin',
        element: <AdminRoute />
      },
      {
        path: 'admin/*',
        element: <AdminRoute />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]
