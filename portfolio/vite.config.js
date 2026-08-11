import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'
import fs from 'fs'

// Extract slugs from data files using regex to avoid Node module compilation errors with assets
const getSlugs = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const slugRegex = /slug:\s*['"`]([^'"`]+)['"`]/g
    const slugs = []
    let match
    while ((match = slugRegex.exec(content)) !== null) {
      slugs.push(match[1])
    }
    return slugs
  } catch (e) {
    console.error('Error extracting slugs:', e)
    return []
  }
}

const dynamicRoutes = [
  ...getSlugs('./src/data/worksData.js').map(slug => `/works/${slug}`),
  ...getSlugs('./src/data/blogData.js').map(slug => `/blog/${slug}`),
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://pratikbhusal.com',
      exclude: ['/admin'],
      dynamicRoutes: [
        '/',
        '/about',
        '/works',
        '/blog',
        ...dynamicRoutes
      ]
    })
  ],
  ssr: {
    noExternal: ['react-helmet-async']
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    routes: [
      '/',
      '/about',
      '/works',
      '/blog',
      ...dynamicRoutes
    ]
  }
})
