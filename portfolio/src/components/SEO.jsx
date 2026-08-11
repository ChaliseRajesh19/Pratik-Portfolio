import React from 'react'
import { Head } from 'vite-react-ssg'

export default function SEO({ title, description, canonicalUrl, url, ogImage, ogType = 'website', type, jsonLd }) {
  const defaultTitle = 'Pratik Bhusal — Graphic Designer & Art Director'
  const defaultDesc = 'Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging.'
  const defaultImage = 'https://pratikbhusal.com/src/assets/logo.png' // Fallback logo image URL
  const defaultUrl = 'https://pratikbhusal.com'

  const activeTitle = title ? `${title} | Pratik Bhusal` : defaultTitle
  const activeDesc = description || defaultDesc
  const activeUrl = canonicalUrl || url || defaultUrl
  const activeOgType = ogType || type || 'website'
  const activeImage = ogImage || defaultImage

  return (
    <Head>
      {/* Basic HTML Meta Tags */}
      <title>{activeTitle}</title>
      <meta name="description" content={activeDesc} />
      <link rel="canonical" href={activeUrl} />

      {/* Facebook / Open Graph Meta Tags */}
      <meta property="og:title" content={activeTitle} />
      <meta property="og:description" content={activeDesc} />
      <meta property="og:image" content={activeImage} />
      <meta property="og:type" content={activeOgType} />
      <meta property="og:url" content={activeUrl} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={activeTitle} />
      <meta name="twitter:description" content={activeDesc} />
      <meta name="twitter:image" content={activeImage} />

      {/* JSON-LD Structured Data Schema */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Head>
  )
}
