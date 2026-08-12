import { useEffect } from 'react';

const SITE_NAME = 'Pratik Bhusal';
const SITE_URL  = 'https://creativepratik.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

/**
 * useSEO — manages all head meta tags for a page.
 *
 * @param {object} opts
 * @param {string}  opts.title          — page title (appended with " | Pratik Bhusal")
 * @param {string}  opts.description    — meta description (≤160 chars recommended)
 * @param {string}  [opts.canonicalPath]— e.g. "/blogs" (default: current pathname)
 * @param {string}  [opts.ogImage]      — absolute URL for og:image
 * @param {string}  [opts.ogType]       — "website" | "article" (default: "website")
 * @param {string}  [opts.robots]       — robots directive (default: "index,follow")
 * @param {object}  [opts.jsonLd]       — JSON-LD structured data object
 * @param {string[]}[opts.keywords]     — keywords array
 */
export function useSEO({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  robots = 'index,follow',
  jsonLd,
  keywords = [],
} = {}) {

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const ogImg    = ogImage || DEFAULT_OG_IMAGE;
    const canonical = canonicalPath
      ? `${SITE_URL}${canonicalPath}`
      : `${SITE_URL}${window.location.pathname}`;

    // ── Helper: get-or-create a <meta> or <link> ─────────────────────────
    const setMeta = (selector, attr, val) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
        // Parse selector attributes like [property="og:title"]
        const attrMatch = selector.match(/\[([^\]="]+)="([^"]+)"\]/);
        if (attrMatch) el.setAttribute(attrMatch[1], attrMatch[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
      return el;
    };

    // ── Title ──────────────────────────────────────────────────────────────
    document.title = fullTitle;

    // ── Standard metas ─────────────────────────────────────────────────────
    setMeta('meta[name="description"]',    'content', description || '');
    setMeta('meta[name="robots"]',         'content', robots);
    setMeta('meta[name="theme-color"]',    'content', '#0b0d1a');
    if (keywords.length) {
      setMeta('meta[name="keywords"]', 'content', keywords.join(', '));
    }

    // ── Open Graph ──────────────────────────────────────────────────────────
    setMeta('meta[property="og:type"]',        'content', ogType);
    setMeta('meta[property="og:title"]',       'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description || '');
    setMeta('meta[property="og:url"]',         'content', canonical);
    setMeta('meta[property="og:image"]',       'content', ogImg);
    setMeta('meta[property="og:image:width"]', 'content', '1200');
    setMeta('meta[property="og:image:height"]','content', '630');
    setMeta('meta[property="og:site_name"]',   'content', SITE_NAME);

    // ── Twitter Card ────────────────────────────────────────────────────────
    setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]',       'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description || '');
    setMeta('meta[name="twitter:image"]',       'content', ogImg);
    setMeta('meta[name="twitter:site"]',        'content', '@creativepratik_');
    setMeta('meta[name="twitter:creator"]',     'content', '@creativepratik_');

    // ── Canonical link ──────────────────────────────────────────────────────
    let linkEl = document.querySelector('link[rel="canonical"]');
    if (!linkEl) {
      linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'canonical');
      document.head.appendChild(linkEl);
    }
    linkEl.setAttribute('href', canonical);

    // ── JSON-LD ─────────────────────────────────────────────────────────────
    const LD_ID = 'jsonld-structured-data';
    let ldScript = document.getElementById(LD_ID);
    if (jsonLd) {
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.id   = LD_ID;
        ldScript.type = 'application/ld+json';
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(jsonLd);
    } else if (ldScript) {
      ldScript.remove();
    }

    // ── Cleanup: reset title on unmount ─────────────────────────────────────
    return () => {
      document.title = SITE_NAME;
    };
  }, [title, description, canonicalPath, ogImage, ogType, robots, jsonLd]);
}
