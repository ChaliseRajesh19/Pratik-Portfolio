import { useEffect } from 'react'

export default function SEO({ title, description, image, type = 'website', publishDate, authorName, url }) {
  useEffect(() => {
    // 1. Update Title
    document.title = title

    // Helper to find or create meta tags
    const updateMetaTag = (property, value, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`
      let tag = document.querySelector(selector)
      if (!tag) {
        tag = document.createElement('meta')
        if (isProperty) tag.setAttribute('property', property)
        else tag.setAttribute('name', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', value)
    }

    // Helper to find or create link tags
    const updateLinkTag = (rel, href) => {
      let tag = document.querySelector(`link[rel="${rel}"]`)
      if (!tag) {
        tag = document.createElement('link')
        tag.setAttribute('rel', rel)
        document.head.appendChild(tag)
      }
      tag.setAttribute('href', href)
    }

    // 2. Base meta tags
    updateMetaTag('description', description)

    // 3. Open Graph
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=630&q=80', true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:url', url || window.location.href, true)

    // 4. Twitter Cards
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=630&q=80')

    // 5. Canonical
    updateLinkTag('canonical', url || window.location.href)

    // 6. JSON-LD Schemas
    const existingSchema = document.getElementById('json-ld-schema')
    if (existingSchema) existingSchema.remove()

    const schemaScript = document.createElement('script')
    schemaScript.id = 'json-ld-schema'
    schemaScript.type = 'application/ld+json'

    let schemaData = {}
    const siteUrl = window.location.origin

    if (type === 'article') {
      schemaData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': siteUrl },
              { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': `${siteUrl}/blog` },
              { '@type': 'ListItem', 'position': 3, 'name': title, 'item': url || window.location.href }
            ]
          },
          {
            '@type': 'BlogPosting',
            'headline': title,
            'image': image,
            'datePublished': publishDate,
            'dateModified': publishDate,
            'author': {
              '@type': 'Person',
              'name': authorName || 'Pratik Bhusal',
              'url': siteUrl
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Pratik Bhusal',
              'logo': {
                '@type': 'ImageObject',
                'url': `${siteUrl}/src/assets/Pratik icon.png`
              }
            },
            'description': description,
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': url || window.location.href
            }
          }
        ]
      }
    } else {
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Pratik Bhusal Portfolio',
        'url': siteUrl,
        'description': description
      }
    }

    schemaScript.text = JSON.stringify(schemaData)
    document.head.appendChild(schemaScript)

    return () => {
      const schema = document.getElementById('json-ld-schema')
      if (schema) schema.remove()
    }
  }, [title, description, image, type, publishDate, authorName, url])

  return null
}
