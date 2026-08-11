var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L;
import { Head, ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { createContext, useState, useEffect, useContext, useCallback, useRef, useMemo } from "react";
import { useNavigate, useLocation, Outlet, useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutDashboard, Briefcase, FileText, MessageSquareQuote, Zap, Clock, Settings, LogOut, PanelLeftOpen, PanelLeftClose, Search, Bell, MessageSquare, Wrench, Flag, Plus, Edit, Database, HardDrive, User, ArrowUpRight, PlusCircle, ChevronUp, ChevronDown, Eye, EyeOff, Pencil, Copy, Trash2, ArrowLeft, Check, X, Upload, AlertTriangle, GripVertical, Save, Info, XCircle, CheckCircle } from "lucide-react";
import { Command } from "cmdk";
import { useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { sortableKeyboardCoordinates, SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const pathao1 = "/assets/pathao%201-Cvzh70DI.png";
const pathao2 = "/assets/pathao2-Ci70cw9P.png";
const pathao6 = "/assets/pathao%206-kR6Jmlxw.png";
const fifaImg = "/assets/fifa-Cmmc8q25.png";
const mechanicC1Img = "/assets/Study%202-Bvk2nAqQ.png";
const mechanicC2Img = "/assets/pp-DgRu1Iab.png";
const untitled1Img = "/assets/Untitled-1-BuDyOjbx.png";
const editorialThumb = "/assets/work2-CZJWi8IE.jpg";
const work4Img = "/assets/work4-SxRdugv5.jpg";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/data/worksData.js");
const worksData = [
  {
    id: 1,
    index: "01",
    slug: "pathao-super-app",
    category: "BRAND IDENTITY & REBRANDING",
    tag: "TRANSFORMATION",
    bgWord: "PATHAO",
    tagline: "THE OVERHAUL OF URBAN MOBILITY.",
    title: "PATHAO NEPAL SUPER-APP VISUAL SYSTEM",
    subtitle: "Comprehensive brand identity overhaul and outdoor visual design system for Nepal’s leading ride-sharing, food delivery, and logistics platform.",
    client: "Pathao Nepal",
    year: "2026",
    services: ["Brand Strategy", "Visual Identity", "Typography", "Campaign Art"],
    image: pathao1,
    images: [pathao1, pathao2, pathao6],
    layout: "skincare-packaging",
    sections: [
      {
        heading: "THE CHALLENGE / BRIEF",
        paragraphs: [
          {
            text: "Pathao Nepal needed to align its visual design language across three core services (ride-sharing, food delivery, and merchant courier services) to create a cohesive user experience under one singular Super-App identity.",
            highlights: ["three core services", "Super-App identity"]
          }
        ]
      },
      {
        heading: "THE APPROACH & DEVELOPMENT",
        paragraphs: [
          {
            text: "We developed an adaptive layout grid that utilizes bold high-visibility colors (Red, Gold, and Black) combined with customized monospace type accents to create structure in dense interface environments.",
            highlights: ["adaptive layout grid", "monospace type accents", "Red, Gold, and Black"]
          }
        ]
      },
      {
        heading: "THE SOLUTION",
        paragraphs: [
          {
            text: "Designed an expansive system of brand guidelines, outdoor transit graphics, digital advertising templates, and spatial courier apparel that feels modern and highly recognizable across Nepal.",
            highlights: ["brand guidelines", "transit graphics", "courier apparel"]
          }
        ]
      },
      {
        heading: "THE OUTCOME & RESULT",
        paragraphs: [
          {
            text: "Unified three distinct sub-brands into one cohesive visual asset, reducing design cycle turnaround by 35% and improving brand recall scores across urban regions.",
            highlights: ["cohesive visual asset", "reducing design cycle turnaround", "brand recall scores"]
          }
        ]
      }
    ],
    gallery: [
      { url: pathao1, caption: "Primary brand identity and merchant guidelines" },
      { url: pathao2, caption: "Responsive app interface templates and icon scales" },
      { url: pathao6, caption: "Logistics packaging assets and delivery box styles" }
    ]
  },
  {
    id: 2,
    index: "02",
    slug: "chronotype-editorial",
    category: "PUBLISHING & EDITORIAL",
    tag: "EDITORIAL",
    bgWord: "CHRONO",
    tagline: "THE GEOMETRY OF TIME & DETAILS.",
    title: "THE CHRONOTYPE EDITORIAL",
    subtitle: "A physical monograph cataloging mechanical clock faces. Heavy black ink, thick textured stock, and extreme micro-typography.",
    client: "Chronotype Press",
    year: "2025",
    services: ["Editorial Design", "Book Design", "Typography", "Print Production"],
    image: editorialThumb,
    images: [editorialThumb],
    layout: "editorial-publishing",
    sections: [
      {
        heading: "THE CHALLENGE / BRIEF",
        paragraphs: [
          {
            text: "To design a limited-edition art monograph cataloging historical mechanical watch mechanisms in a way that respects horological structure without feeling outdated.",
            highlights: ["art monograph", "mechanical watch mechanisms", "horological structure"]
          }
        ]
      },
      {
        heading: "THE APPROACH & DEVELOPMENT",
        paragraphs: [
          {
            text: "Using a tight mathematical grid based on the Golden Ratio, we configured a sequence of high-contrast micro-layouts, heavy black fills, and raw geometric illustrations.",
            highlights: ["mathematical grid", "Golden Ratio", "geometric illustrations"]
          }
        ]
      },
      {
        heading: "THE SOLUTION",
        paragraphs: [
          {
            text: "Engineered a highly precise layout utilizing custom serif typefaces combined with clean monospace sidebars that read like technical specifications.",
            highlights: ["custom serif typefaces", "monospace sidebars", "technical specifications"]
          }
        ]
      },
      {
        heading: "THE OUTCOME & RESULT",
        paragraphs: [
          {
            text: "The monograph was awarded in international book design exhibitions and sold out its limited run of 1,000 copies in under 48 hours.",
            highlights: ["international book design exhibitions", "1,005 copies", "48 hours"]
          }
        ]
      }
    ],
    gallery: [
      { url: editorialThumb, caption: "Open-spread layout highlighting circular mechanism diagrams" }
    ]
  },
  {
    id: 3,
    index: "03",
    slug: "fifa-world-cup",
    category: "SPORTS & SOCIAL MEDIA CAMPAIGN",
    tag: "CAMPAIGN",
    bgWord: "KINETIC",
    tagline: "DYNAMICS IN REPETITION.",
    title: "FIFA WORLD CUP DIGITAL POSTERS",
    subtitle: "High-impact social media creative graphics and promotional artwork for global sports broadcasts.",
    client: "Joshi Media Group",
    year: "2026",
    services: ["Art Direction", "Graphic Design", "Social Media Campaign", "Digital Graphics"],
    image: fifaImg,
    images: [fifaImg],
    layout: "motion-banner",
    sections: [
      {
        heading: "THE CHALLENGE / BRIEF",
        paragraphs: [
          {
            text: "Designing real-time match engagement graphic banners during the World Cup broadcasts that capture intense athletic moments while maintaining legibility in feeds.",
            highlights: ["match engagement graphic banners", "athletic moments", "legibility in feeds"]
          }
        ]
      },
      {
        heading: "THE APPROACH & DEVELOPMENT",
        paragraphs: [
          {
            text: "We combined high-contrast dynamic cutouts of athletes with expressive brush elements and neon overlay gradients that feel kinetic and hyper-focused.",
            highlights: ["high-contrast dynamic cutouts", "expressive brush elements", "neon overlay gradients"]
          }
        ]
      },
      {
        heading: "THE SOLUTION",
        paragraphs: [
          {
            text: "Built a master template matrix allowing digital design teams to populate real-time scores and statistics in under 2 minutes during live broadcasts.",
            highlights: ["template matrix", "real-time scores", "2 minutes"]
          }
        ]
      },
      {
        heading: "THE OUTCOME & RESULT",
        paragraphs: [
          {
            text: "The creative graphics reached over 4 million social engagements, boosting the client’s real-time broadcast impressions by 45%.",
            highlights: ["4 million social engagements", "broadcast impressions by 45%"]
          }
        ]
      }
    ],
    gallery: [
      { url: fifaImg, caption: "Championship match preview graphic template" }
    ]
  },
  {
    id: 4,
    index: "04",
    slug: "matter-and-silence",
    category: "PACKAGING & BRANDING",
    tag: "PACKAGING",
    bgWord: "BOTANIC",
    tagline: "THE DESIGN OF TACTILE SILENCE.",
    title: "MATTER & SILENCE BEAUTY SYSTEM",
    subtitle: "A luxury skincare identity exploring tactile boundaries. Raw pressed card, heavy stone elements, and zero unnecessary decorative lines.",
    client: "Matter & Silence Ltd",
    year: "2025",
    services: ["Packaging Design", "Industrial Design", "Visual Identity", "Tactile Branding"],
    image: work4Img,
    images: [work4Img],
    layout: "packaging-reversed",
    sections: [
      {
        heading: "THE CHALLENGE / BRIEF",
        paragraphs: [
          {
            text: "Matter & Silence requested a premium cosmetic identity that shifts away from standard glossy containers and instead emphasizes raw geological materials and minimalist shelf layouts.",
            highlights: ["premium cosmetic identity", "geological materials", "minimalist shelf layouts"]
          }
        ]
      },
      {
        heading: "THE APPROACH & DEVELOPMENT",
        paragraphs: [
          {
            text: "We selected natural textured matte stocks, minimal debossed sans-serif type labels, and modular concrete container weights that feel balanced and silent.",
            highlights: ["textured matte stocks", "debossed sans-serif type", "concrete container weights"]
          }
        ]
      },
      {
        heading: "THE SOLUTION",
        paragraphs: [
          {
            text: "Designed the physical custom packaging layout alongside the digital visual brand identity to create a holistic tactile brand experience.",
            highlights: ["packaging layout", "brand identity", "tactile brand experience"]
          }
        ]
      },
      {
        heading: "THE OUTCOME & RESULT",
        paragraphs: [
          {
            text: "Recognized for eco-packaging excellence at the Luxury Design Awards and featured in premium retail boutiques in London and Paris.",
            highlights: ["eco-packaging excellence", "Luxury Design Awards", "boutiques in London and Paris"]
          }
        ]
      }
    ],
    gallery: [
      { url: work4Img, caption: "Skincare line mockup featuring concrete tubes and debossed carton packaging" }
    ]
  },
  {
    id: 5,
    index: "05",
    slug: "study-creative-series",
    category: "SOCIAL MEDIA GRAPHIC DESIGN",
    tag: "SYSTEMS",
    bgWord: "ACADEMY",
    tagline: "SCALING CONVERSATIONS IN EDUCATION.",
    title: "STUDY & EDUCATION CREATIVE SERIES",
    subtitle: "Visual identity banners, promotional ads, and social media creative assets crafted for educational consultancy and academic programs.",
    client: "Prime Academy",
    year: "2026",
    services: ["Graphic Design", "Marketing Art", "Campaign Strategy", "Visual Assets"],
    image: mechanicC1Img,
    images: [mechanicC1Img, mechanicC2Img, untitled1Img],
    layout: "social-media-3card-reversed",
    sections: [
      {
        heading: "THE CHALLENGE / BRIEF",
        paragraphs: [
          {
            text: "To modernize Prime Academy’s student recruitment graphics to appeal to digital-native students looking for study abroad opportunities.",
            highlights: ["student recruitment graphics", "digital-native students", "study abroad opportunities"]
          }
        ]
      },
      {
        heading: "THE APPROACH & DEVELOPMENT",
        paragraphs: [
          {
            text: "We replaced cluttered, text-heavy layouts with clean visual typography layouts, bright blue accents, and authentic student lifestyle portrait frames.",
            highlights: ["typography layouts", "bright blue accents", "lifestyle portrait frames"]
          }
        ]
      },
      {
        heading: "THE SOLUTION",
        paragraphs: [
          {
            text: "Crafted a unified visual template system for LinkedIn, Facebook, and Instagram focused on academic progress and destination guidelines.",
            highlights: ["visual template system", "academic progress", "destination guidelines"]
          }
        ]
      },
      {
        heading: "THE OUTCOME & RESULT",
        paragraphs: [
          {
            text: "Increased digital application conversion rates by 28% and established a cohesive professional brand system for the consultancy.",
            highlights: ["application conversion rates by 28%", "professional brand system"]
          }
        ]
      }
    ],
    gallery: [
      { url: mechanicC1Img, caption: "Destinations guideline layout design" },
      { url: mechanicC2Img, caption: "Student success story social media templates" },
      { url: untitled1Img, caption: "Recruitment campaign master poster asset" }
    ]
  },
  {
    id: 6,
    index: "06",
    slug: "social-poster-art",
    category: "DIGITAL CAMPAIGN ARCHIVE",
    tag: "REBRAND",
    bgWord: "BOTTLE",
    tagline: "REDEFINING MINIMAL FLUIDITY.",
    title: "CREATIVE SOCIAL POSTER ART",
    subtitle: "High-resolution promo graphics and visual poster campaign designed for social media engagement.",
    client: "Nepal Art House",
    year: "2026",
    services: ["Graphic Design", "Poster Design", "Creative Direction", "Typography"],
    image: untitled1Img,
    images: [untitled1Img],
    layout: "hero-landscape",
    sections: [
      {
        heading: "THE CHALLENGE / BRIEF",
        paragraphs: [
          {
            text: "Designing a poster art template for a digital campaign that works as both a high-fidelity physical print and a mobile-friendly square social asset.",
            highlights: ["poster art template", "physical print", "social asset"]
          }
        ]
      },
      {
        heading: "THE APPROACH & DEVELOPMENT",
        paragraphs: [
          {
            text: "Using clean overlapping structural typography grid systems combined with textured overlay grain to create depth and character.",
            highlights: ["typography grid systems", "textured overlay grain"]
          }
        ]
      },
      {
        heading: "THE SOLUTION",
        paragraphs: [
          {
            text: "Built a series of six custom poster compositions that translate across digital feeds and physical gallery walls.",
            highlights: ["poster compositions", "digital feeds", "physical gallery walls"]
          }
        ]
      },
      {
        heading: "THE OUTCOME & RESULT",
        paragraphs: [
          {
            text: "Boosted brand workshop registrations by 50% and established a raw, artistic brand texture.",
            highlights: ["workshop registrations by 50%", "artistic brand texture"]
          }
        ]
      }
    ],
    gallery: [
      { url: untitled1Img, caption: "Nepal Art House poster exhibition master layout" }
    ]
  }
];
const pratikIcon = "/assets/Pratik%20icon-JHHBeu6y.png";
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/data/blogData.js");
const blogPosts = [
  {
    title: "HOW TO BRIEF A DESIGNER: A STEP-BY-STEP STRATEGY",
    slug: "how-to-brief-a-designer",
    excerpt: "A comprehensive guide on creating clear, outcome-focused creative briefs that minimize feedback cycles and drive alignment.",
    category: "Design",
    author: {
      name: "Pratik Bhusal",
      avatar: pratikIcon,
      bio: "Graphic Designer & Art Director based in Nepal, specializing in visual identity systems and premium editorial layouts."
    },
    publishDate: "2026-08-01",
    modifiedDate: "2026-08-05",
    readTime: "5 min read",
    featuredImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=630&q=80",
    imageAlt: "A clean minimalist designer workspace with sketches and coffee",
    content: `
## Why a Good Brief Matters
A creative brief is the foundation of any successful design project. It is not simply a list of deliverables or a set of technical constraints; it is a strategic document that aligns the business objectives of the client with the creative execution of the designer. When a brief is incomplete or ambiguous, it leads to endless revision loops, mismatched expectations, and wasted resources.

A structured creative brief ensures that both parties agree on what success looks for the project before a single pixel is moved.

---

## 1. Project Background & Objective
Start by explaining who you are, what your business does, and the core problem you are trying to solve with this project. 
- What is the brand story?
- Why is this project happening now?
- What are the short-term and long-term business goals of this design asset?

For instance, if you are rebranding, is it because you are targeting a new demographic, or because your current visual identity feels outdated? Clear objectives allow the designer to make informed strategic decisions.

> "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs

---

## 2. Defining Your Target Audience
Design is communication, and you cannot communicate effectively if you do not know who you are talking to.
- What are the demographics of your primary user? (age, location, occupation)
- What are their psychographics? (values, interests, pain points)
- How do you want them to feel when they interact with your brand?

A common mistake is trying to appeal to everyone. A focused design that deeply resonates with a specific niche is far more powerful than a generic layout meant to satisfy all demographics.

---

## 3. Scope of Work and Key Deliverables
List the exact assets required. Be as specific as possible:
- If you need a website: how many pages, and what are their functions?
- If you need print assets: what are the exact dimensions, bleed margins, and printing substrates?
- What formats do you expect for the final hand-off? (e.g., SVG, raw Figma file, high-res PDF)

Providing this scope early avoids "scope creep" and helps in calculating accurate timelines and budgets.

---

## 4. Visual Inspiration and Competitor Analysis
Share links to competitor designs or visual styles you appreciate. This does not mean you should copy them; it helps the designer understand your visual vocabulary.
- What brands do you look up to?
- Who are your direct competitors, and how can we differentiate from them?
- Are there specific color schemes or design trends you want to avoid?

A visual moodboard is often the fastest way to align on aesthetic direction.
    `
  },
  {
    title: "THE GEOMETRY OF TYPOGRAPHY: BALANCING FORM & FUNCTION",
    slug: "geometry-of-typography",
    excerpt: "Exploring the mathematical systems behind elegant type scaling, kerning ratios, and layout readability on modern screens.",
    category: "Branding",
    author: {
      name: "Pratik Bhusal",
      avatar: pratikIcon,
      bio: "Graphic Designer & Art Director based in Nepal, specializing in visual identity systems and premium editorial layouts."
    },
    publishDate: "2026-07-15",
    modifiedDate: "2026-07-20",
    readTime: "4 min read",
    featuredImage: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=1200&h=630&q=80",
    imageAlt: "Abstract letters and typographic elements stacked artistically",
    content: `
## The Mathematics of the Printed Word
Typography is where art and engineering intersect. Every typeface has its own internal system of measurement, geometry, and proportion. Balancing these elements is what makes a layout feel natural and highly legible.

---

## 1. Type Scaling Systems
A type scale is a pre-defined set of font sizes that create a logical hierarchy. Instead of choosing arbitrary sizes, designers use mathematical ratios (like the Golden Ratio 1:1.618 or the Major Third 1:1.25) to scale header levels.

For instance, using a Major Third scale:
- Body Text: 16px
- Subtitle: 20px (16 * 1.25)
- H3 Heading: 25px (20 * 1.25)
- H2 Heading: 31px (25 * 1.25)
- H1 Heading: 39px (31 * 1.25)

This mathematical progression creates a subtle sense of order that the human eye appreciates instantly.

---

## 2. Line Length and Layout Rhythm
For long-form body text, reading comfort is dictated by line length (or "measure"). The ideal number of characters per line is generally between 45 and 75 characters.
- Too short, and the eye has to jump back and forth too frequently, causing fatigue.
- Too long, and it is difficult for the reader to find the beginning of the next line.

> "A typeface is an alphabet with a design, not a design with an alphabet." — Hermann Zapf

---

## 3. Spacing: Kerning and Leading
The space between letters (kerning) and the vertical space between lines (leading) are just as important as the letterforms themselves.
- Modern high-contrast display fonts need tight leading to look cohesive.
- Long-form body text requires generous leading (~1.5 to 1.75 times the font size) to let the page breathe.
    `
  },
  {
    title: "CREATING MEMORABLE BRAND SYSTEMS IN 2026",
    slug: "creating-memorable-brand-systems",
    excerpt: "How to design adaptive, holistic brand identities that translate across digital screens, print packaging, and spatial environments.",
    category: "Case Studies",
    author: {
      name: "Pratik Bhusal",
      avatar: pratikIcon,
      bio: "Graphic Designer & Art Director based in Nepal, specializing in visual identity systems and premium editorial layouts."
    },
    publishDate: "2026-06-28",
    modifiedDate: "2026-06-30",
    readTime: "6 min read",
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80",
    imageAlt: "Geometric brand patterns with clean minimalist rendering",
    content: `
## Beyond the Logo
A brand is no longer just a static logo stamped on a business card. Modern branding is a dynamic system of colors, typography, layout structures, motion design, and physical textures that must feel unified across a multitude of channels.

---

## 1. Adaptive Visual Identity
An adaptive brand system expands or contracts based on context. 
- A detailed emblem is used for high-fidelity print.
- A simplified wordmark handles header navs.
- An icon/symbol works for app icons and favicon files.

Differentiating these scales ensures legibility and recognition at any size.

---

## 2. Curating the Color Spectrum
Color evokes emotion instantly. A great brand system uses a highly curated palette with clear hierarchy:
- Primary Color: The dominant color that defines the brand character.
- Secondary Colors: Used to support primary messaging and create visual variety.
- Functional Colors: System colors for success states, warnings, and borders.

Always ensure the color contrast meets WCAG AA standards (minimum 4.5:1 ratio) to guarantee accessibility.

---

## 3. The Power of Custom Patterns
Custom patterns and grid alignments are the unsung heroes of holistic brand identities. They create a distinct visual texture that makes a brand recognizable even when the logo is not present.
    `
  },
  {
    title: "THE SHIFT TO MINIMALIST PACKAGING DESIGN",
    slug: "shift-to-minimalist-packaging",
    excerpt: "An analysis of consumer psychology and shelf aesthetic shifts towards organic shapes and clean typography in packaging design.",
    category: "Design",
    author: {
      name: "Pratik Bhusal",
      avatar: pratikIcon,
      bio: "Graphic Designer & Art Director based in Nepal, specializing in visual identity systems and premium editorial layouts."
    },
    publishDate: "2026-05-12",
    modifiedDate: "2026-05-15",
    readTime: "4 min read",
    featuredImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&h=630&q=80",
    imageAlt: "Minimal packaging boxes stacked against a plain earth-toned background",
    content: `
## Cutting Through the Shelf Noise
In a crowded retail space, brands historically competed by using loud colors, giant fonts, and busy graphics to grab attention. Today, the opposite trend is winning. Minimalist packaging design is cutting through the noise by offering visual calmness.

---

## 1. The Psychology of Minimalism
Minimal packaging signals premium quality, honesty, and transparency. When a product isn't shouting at the consumer, it suggests that the product's quality speaks for itself.
- Less visual elements = faster message processing.
- Clean space allows the consumer to focus on key selling points (e.g., ingredients, brand name).

---

## 2. Typography as the Core Graphic
With minimal packaging, illustration and photography are often secondary or absent. Typography becomes the main visual asset.
- Serif type suggests premium luxury.
- Monospace fonts convey raw authenticity and technical precision.
- Oversized typography creates a bold, modern attitude.

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci

---

## 3. Sustainability and Material Choice
Minimal design aligns naturally with sustainable materials. Raw cardboard, textured matte papers, and soy-based inks are visual assets themselves. The packaging texture becomes a crucial touchpoint for the brand identity.
    `
  }
];
(_c = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _c.call(globalThis, "src/services/contentService.js");
const supabaseUrl = "https://tdgmzwjevbyxzgqjqlir.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZ216d2pldmJ5eHpncWpxbGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNTcxMDQsImV4cCI6MjEwMTkzMzEwNH0.V2TdM_5RDyTwfq365tazGifMPPZ08LHxSBLIyJ4QhBs";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const defaultCapabilities = [
  {
    id: "cap-1",
    name: "VISUAL BRANDING",
    desc: "Developing cohesive, scalable visual assets, logo identities, adaptive grid systems, and typographic guidelines to align brand perception.",
    order: 1
  },
  {
    id: "cap-2",
    name: "EDITORIAL DESIGN",
    desc: "Configuring monographs, booklets, catalogs, and technical publication layouts using mathematical grids and fine horological typefaces.",
    order: 2
  },
  {
    id: "cap-3",
    name: "ART DIRECTION",
    desc: "Guiding marketing poster designs, destination brochures, social assets, and live World Cup match campaigns from concept to production.",
    order: 3
  },
  {
    id: "cap-4",
    name: "PACKAGING SYSTEMS",
    desc: "Designing sustainable, tactile cosmetic boxes, product containers, concrete vessels, and minimal logistics packaging that feel premium.",
    order: 4
  },
  {
    id: "cap-5",
    name: "DIGITAL INTERFACES",
    desc: "Structuring responsive mobile layout deck shuffles, dark-mode styling systems, interactive cursor tracking states, and clean transition flows.",
    order: 5
  }
];
const defaultMilestones = [
  { id: "m-1", year: "2023", title: "STUDIO INCUBATION", desc: "Started freelancing and consulting for small scale businesses on visual communication assets.", order: 1 },
  { id: "m-2", year: "2024", title: "REGIONAL EXPANSION", desc: "Overhauled brand systems and directed marketing design strategies for medium scale ventures.", order: 2 },
  { id: "m-3", year: "2025", title: "PRODUCT FOCUS", desc: "Pivoted to a holistic design model merging packaging structures, print publications, and digital products.", order: 3 },
  { id: "m-4", year: "2026", title: "SUPER-APP DEPLOYMENT", desc: "Successfully designed the master visual design system and logistics assets for Pathao Nepal.", order: 4 }
];
const defaultTestimonials = [
  {
    id: "test-1",
    name: "Niraj Joshi",
    role: "Founder",
    company: "Joshi Media",
    quote: "Pratik's visual systems transformed our digital products. His eye for typography and grid alignment is second to none.",
    order: 1,
    status: "Published"
  },
  {
    id: "test-2",
    name: "Alex Moreau",
    role: "Creative Director",
    company: "Studio Moreau",
    quote: "An absolute master of editorial layouts. The branding guidelines he delivered were clear, adaptive, and visually stunning.",
    order: 2,
    status: "Published"
  },
  {
    id: "test-3",
    name: "Sophie Chen",
    role: "Marketing Lead",
    company: "Lumina UK",
    quote: "We briefed Pratik for our packaging redesign and the feedback process was seamless. Our retail conversions increased significantly.",
    order: 3,
    status: "Published"
  }
];
const defaultSettings = {
  siteTitle: "Pratik Bhusal — Graphic Designer & Art Director",
  metaDescription: "Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging.",
  instagram: "https://www.instagram.com/pratikbhusal_/",
  facebook: "https://www.facebook.com/pratikbhusal",
  behance: "https://www.behance.net/pratikbhusal",
  linkedin: "https://www.linkedin.com/in/pratikbhusal",
  contactEmail: "pratikbhusal12345@gmail.com",
  aboutHeroText: "I MAKE THINGS WORTH SEEING.",
  aboutBio: `I am Pratik Bhusal, a graphic designer and art director focusing on raw, structural typography, functional packaging guidelines, and holistic brand systems. Design is not just decoration — it is communication engineering. I build visual systems that help brands cut through clutter, establish clear visual architecture, and communicate value instantly to their users. Based in Kathmandu, Nepal, I work with local leaders and international teams to scale brands across packaging boxes, physical publications, and responsive digital interfaces.`,
  homepageHeadline: "LET'S MAKE SOMETHING WORTH SEEING."
};
const getLocal = (key, defaultVal) => {
  if (typeof window === "undefined") return defaultVal;
  const stored = localStorage.getItem(`pratik_${key}`);
  if (!stored) {
    localStorage.setItem(`pratik_${key}`, JSON.stringify(defaultVal));
    return defaultVal;
  }
  return JSON.parse(stored);
};
const setLocal = (key, val) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`pratik_${key}`, JSON.stringify(val));
  }
};
const contentServices = {
  // ─── WORKS ───────────────────────────────────────────────────────────────
  async getWorks() {
    if (supabase) {
      const { data, error } = await supabase.from("works").select("*").order("id", { ascending: true });
      if (!error && data) return data;
    }
    return getLocal("works", worksData);
  },
  async saveWork(work) {
    if (supabase) {
      const { data, error } = await supabase.from("works").upsert(work).select();
      if (!error && data) return data[0];
    }
    const works = await this.getWorks();
    const idx = works.findIndex((w) => w.slug === work.slug || w.id === work.id);
    if (idx !== -1) {
      works[idx] = { ...works[idx], ...work };
    } else {
      works.push({ id: Date.now(), ...work });
    }
    setLocal("works", works);
    return work;
  },
  async deleteWork(id) {
    if (supabase) {
      await supabase.from("works").delete().eq("id", id);
      return;
    }
    const works = await this.getWorks();
    const filtered = works.filter((w) => w.id !== id);
    setLocal("works", filtered);
  },
  // ─── BLOG POSTS ──────────────────────────────────────────────────────────
  async getBlogPosts() {
    if (supabase) {
      const { data, error } = await supabase.from("blog_posts").select("*").order("publishDate", { ascending: false });
      if (!error && data) return data;
    }
    return getLocal("blog", blogPosts);
  },
  async saveBlogPost(post) {
    if (supabase) {
      const { data, error } = await supabase.from("blog_posts").upsert(post).select();
      if (!error && data) return data[0];
    }
    const posts = await this.getBlogPosts();
    const idx = posts.findIndex((p) => p.slug === post.slug || p.id === post.id);
    if (idx !== -1) {
      posts[idx] = { ...posts[idx], ...post };
    } else {
      posts.push({ id: Date.now(), ...post });
    }
    setLocal("blog", posts);
    return post;
  },
  async deleteBlogPost(id) {
    if (supabase) {
      await supabase.from("blog_posts").delete().eq("id", id);
      return;
    }
    const posts = await this.getBlogPosts();
    const filtered = posts.filter((p) => p.id !== id);
    setLocal("blog", filtered);
  },
  // ─── TESTIMONIALS ────────────────────────────────────────────────────────
  async getTestimonials() {
    if (supabase) {
      const { data, error } = await supabase.from("testimonials").select("*").order("order", { ascending: true });
      if (!error && data) return data;
    }
    return getLocal("testimonials", defaultTestimonials);
  },
  async saveTestimonial(t) {
    if (supabase) {
      const { data, error } = await supabase.from("testimonials").upsert(t).select();
      if (!error && data) return data[0];
    }
    const list = await this.getTestimonials();
    const idx = list.findIndex((item) => item.id === t.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...t };
    } else {
      list.push({ id: `test-${Date.now()}`, ...t });
    }
    setLocal("testimonials", list);
    return t;
  },
  async deleteTestimonial(id) {
    if (supabase) {
      await supabase.from("testimonials").delete().eq("id", id);
      return;
    }
    const list = await this.getTestimonials();
    const filtered = list.filter((item) => item.id !== id);
    setLocal("testimonials", filtered);
  },
  // ─── CAPABILITIES ────────────────────────────────────────────────────────
  async getCapabilities() {
    if (supabase) {
      const { data, error } = await supabase.from("capabilities").select("*").order("order", { ascending: true });
      if (!error && data) return data;
    }
    return getLocal("capabilities", defaultCapabilities);
  },
  async saveCapability(c) {
    if (supabase) {
      const { data, error } = await supabase.from("capabilities").upsert(c).select();
      if (!error && data) return data[0];
    }
    const list = await this.getCapabilities();
    const idx = list.findIndex((item) => item.id === c.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...c };
    } else {
      list.push({ id: `cap-${Date.now()}`, ...c });
    }
    setLocal("capabilities", list);
    return c;
  },
  async deleteCapability(id) {
    if (supabase) {
      await supabase.from("capabilities").delete().eq("id", id);
      return;
    }
    const list = await this.getCapabilities();
    const filtered = list.filter((item) => item.id !== id);
    setLocal("capabilities", filtered);
  },
  // ─── MILESTONES ──────────────────────────────────────────────────────────
  async getMilestones() {
    if (supabase) {
      const { data, error } = await supabase.from("milestones").select("*").order("order", { ascending: true });
      if (!error && data) return data;
    }
    return getLocal("milestones", defaultMilestones);
  },
  async saveMilestone(m) {
    if (supabase) {
      const { data, error } = await supabase.from("milestones").upsert(m).select();
      if (!error && data) return data[0];
    }
    const list = await this.getMilestones();
    const idx = list.findIndex((item) => item.id === m.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...m };
    } else {
      list.push({ id: `m-${Date.now()}`, ...m });
    }
    setLocal("milestones", list);
    return m;
  },
  async deleteMilestone(id) {
    if (supabase) {
      await supabase.from("milestones").delete().eq("id", id);
      return;
    }
    const list = await this.getMilestones();
    const filtered = list.filter((item) => item.id !== id);
    setLocal("milestones", filtered);
  },
  // ─── SITE SETTINGS ───────────────────────────────────────────────────────
  async getSettings() {
    if (supabase) {
      const { data, error } = await supabase.from("site_settings").select("*").single();
      if (!error && data) return data;
    }
    return getLocal("settings", defaultSettings);
  },
  async saveSettings(settings) {
    if (supabase) {
      const { data, error } = await supabase.from("site_settings").upsert({ id: 1, ...settings }).select();
      if (!error && data) return data[0];
    }
    const current = await this.getSettings();
    const updated = { ...current, ...settings };
    setLocal("settings", updated);
    return updated;
  },
  // ─── FILE STORAGE UPLOAD ─────────────────────────────────────────────────
  async uploadFile(file) {
    if (supabase) {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      const { data, error } = await supabase.storage.from("assets").upload(fileName, file);
      if (!error && data) {
        const { data: urlData } = supabase.storage.from("assets").getPublicUrl(fileName);
        return urlData.publicUrl;
      }
    }
    return URL.createObjectURL(file);
  }
};
(_d = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _d.call(globalThis, "src/context/ContentContext.jsx");
const ContentContext = createContext({
  works: worksData,
  blogs: blogPosts,
  testimonials: [],
  capabilities: [],
  milestones: [],
  settings: {
    siteTitle: "Pratik Bhusal — Graphic Designer & Art Director",
    metaDescription: "Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging.",
    contactEmail: "pratikbhusal12345@gmail.com",
    aboutHeroText: "I MAKE THINGS WORTH SEEING.",
    aboutBio: "I am Pratik Bhusal, a graphic designer and art director focusing on raw, structural typography, functional packaging guidelines, and holistic brand systems.",
    homepageHeadline: "LET'S MAKE SOMETHING WORTH SEEING."
  }
});
function ContentProvider({ children }) {
  const [works, setWorks] = useState(worksData);
  const [blogs, setBlogs] = useState(blogPosts);
  const [testimonials, setTestimonials] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [settings, setSettings] = useState({
    siteTitle: "Pratik Bhusal — Graphic Designer & Art Director",
    metaDescription: "Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging.",
    contactEmail: "pratikbhusal12345@gmail.com",
    aboutHeroText: "I MAKE THINGS WORTH SEEING.",
    aboutBio: "I am Pratik Bhusal, a graphic designer and art director focusing on raw, structural typography, functional packaging guidelines, and holistic brand systems.",
    homepageHeadline: "LET'S MAKE SOMETHING WORTH SEEING."
  });
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [w, b, t, c, m, s] = await Promise.all([
          contentServices.getWorks(),
          contentServices.getBlogPosts(),
          contentServices.getTestimonials(),
          contentServices.getCapabilities(),
          contentServices.getMilestones(),
          contentServices.getSettings()
        ]);
        if (w == null ? void 0 : w.length) setWorks(w);
        if (b == null ? void 0 : b.length) setBlogs(b);
        if (t == null ? void 0 : t.length) setTestimonials(t);
        if (c == null ? void 0 : c.length) setCapabilities(c);
        if (m == null ? void 0 : m.length) setMilestones(m);
        if (s == null ? void 0 : s.siteTitle) setSettings(s);
      } catch (err) {
        console.error("Error fetching dynamic content inside ContentProvider:", err);
      }
    };
    fetchContent();
  }, []);
  return /* @__PURE__ */ jsx(ContentContext.Provider, { value: { works, blogs, testimonials, capabilities, milestones, settings }, children });
}
function useContent() {
  return useContext(ContentContext);
}
(_e = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _e.call(globalThis, "src/components/Navbar.jsx");
const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Works", id: "portfolio" },
  { label: "About", id: "about" },
  { label: "Expertise", id: "expertise" },
  { label: "Blog", id: "blog" },
  { label: "Contact", id: "contact" }
];
const BRAND_TEXT = "PRATIK BHUSAL";
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeNav, setActiveNav] = useState("Home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (currentPath !== "/") {
      if (currentPath.startsWith("/blog")) setActiveNav("Blog");
      else if (currentPath.startsWith("/works")) setActiveNav("Works");
      else if (currentPath.startsWith("/about")) setActiveNav("About");
      else setActiveNav("");
      return;
    }
    const sectionMap = {};
    NAV_ITEMS.forEach(({ label, id }) => {
      sectionMap[id] = label;
    });
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible && sectionMap[visible.target.id]) {
          setActiveNav(sectionMap[visible.target.id]);
        }
      },
      { threshold: 0.3 }
    );
    const timer = setTimeout(() => {
      NAV_ITEMS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 200);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [currentPath]);
  const handleNavClick = useCallback(
    (item) => {
      const label = typeof item === "string" ? item : item.label;
      const id = typeof item === "string" ? item.toLowerCase() : item.id;
      setActiveNav(label);
      setDrawerOpen(false);
      const isHomepage = location.pathname === "/";
      if (isHomepage) {
        if (id === "blog") {
          navigate("/blog");
          return;
        }
        if (id === "portfolio") {
          navigate("/works");
          return;
        }
        if (id === "about") {
          navigate("/about");
          return;
        }
        scrollToSection(id);
      } else {
        if (id === "blog") {
          navigate("/blog");
          return;
        }
        if (id === "portfolio") {
          navigate("/works");
          return;
        }
        if (id === "about") {
          navigate("/about");
          return;
        }
        navigate("/");
        if (id !== "home") {
          setTimeout(() => scrollToSection(id), 200);
        }
      }
    },
    [location.pathname, navigate]
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        className: `fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-[#080808]/90 backdrop-blur-md border-b border-neutral-800/60 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.8)]" : "bg-[#080808]/70 backdrop-blur-sm border-b border-neutral-900/40 py-3.5"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => handleNavClick("Home"),
              className: "flex items-center gap-3 cursor-pointer select-none group",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-md overflow-hidden flex-shrink-0 shadow-md border border-neutral-800", children: /* @__PURE__ */ jsx("img", { src: pratikIcon, alt: "Pratik Bhusal", className: "w-full h-full object-cover" }) }),
                /* @__PURE__ */ jsx("span", { className: "font-bebas text-xl sm:text-2xl tracking-widest text-white group-hover:text-[#1e90ff] transition-colors", children: BRAND_TEXT })
              ]
            }
          ),
          /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center gap-1 bg-[#111111] border border-neutral-800/80 rounded-full px-2 py-1.5 shadow-inner", children: NAV_ITEMS.map(({ label, id }) => {
            const isActive = activeNav === label;
            return /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleNavClick({ label, id }),
                className: `relative px-4 py-1.5 text-xs font-medium tracking-wide cursor-pointer transition-all duration-200 rounded-full ${isActive ? "bg-[#1e90ff] text-black font-bold shadow-[0_0_14px_rgba(30,144,255,0.5)]" : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"}`,
                children: label
              },
              id
            );
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => window.open("https://wa.me/9779762519961", "_blank"),
                className: "hidden sm:inline-flex text-xs font-medium text-neutral-300 hover:text-white px-3 py-2 rounded-lg hover:bg-neutral-800/60 transition-colors cursor-pointer",
                children: "Hire Me"
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => window.open("mailto:pratikbhusal12345@gmail.com", "_blank"),
                className: "hidden sm:flex items-center bg-white hover:bg-neutral-100 transition-all rounded-md p-1 pl-3 font-medium text-xs cursor-pointer shadow-md group",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold mr-2 text-neutral-900 group-hover:text-[#1e90ff] transition-colors", children: "Get in Touch" }),
                  /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded bg-[#1e90ff] flex items-center justify-center text-white", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ jsx("path", { d: "M7 17L17 7" }),
                    /* @__PURE__ */ jsx("path", { d: "M7 7h10v10" })
                  ] }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setDrawerOpen((prev) => !prev),
                "aria-label": "Toggle menu",
                className: "md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer rounded-lg bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 transition-colors p-2",
                children: [
                  /* @__PURE__ */ jsx("span", { className: `block w-5 h-0.5 bg-white transition-all duration-300 ${drawerOpen ? "rotate-45 translate-y-2" : ""}` }),
                  /* @__PURE__ */ jsx("span", { className: `block w-5 h-0.5 bg-white transition-all duration-300 ${drawerOpen ? "opacity-0" : ""}` }),
                  /* @__PURE__ */ jsx("span", { className: `block w-5 h-0.5 bg-white transition-all duration-300 ${drawerOpen ? "-rotate-45 -translate-y-2" : ""}` })
                ]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: drawerOpen && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-lg flex flex-col justify-between p-6",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-6 border-b border-neutral-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-md overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: pratikIcon, alt: "Pratik Bhusal", className: "w-full h-full object-cover" }) }),
              /* @__PURE__ */ jsx("span", { className: "font-bebas text-xl tracking-widest text-white", children: BRAND_TEXT })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setDrawerOpen(false),
                className: "w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-zinc-300 hover:text-white text-lg font-light",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3 my-auto", children: NAV_ITEMS.map(({ label, id }) => {
            const isActive = activeNav === label;
            return /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleNavClick({ label, id }),
                className: `text-left py-3 px-4 rounded-xl text-3xl font-bebas tracking-wider transition-colors ${isActive ? "bg-[#1e90ff] text-black font-bold" : "text-zinc-300 hover:bg-neutral-900"}`,
                children: label
              },
              id
            );
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 pt-6 border-t border-neutral-800", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setDrawerOpen(false);
                  window.open("https://wa.me/9779762519961", "_blank");
                },
                className: "w-full py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-medium text-sm text-center",
                children: "Hire Me"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setDrawerOpen(false);
                  window.open("mailto:pratikbhusal12345@gmail.com", "_blank");
                },
                className: "w-full py-3 rounded-xl bg-[#1e90ff] text-black font-bold text-sm text-center",
                children: "Get in Touch"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "h-16 w-full" })
  ] });
}
(_f = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _f.call(globalThis, "src/App.jsx");
gsap.registerPlugin(ScrollTrigger);
function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isAdminPage = currentPath.startsWith("/admin");
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });
    lenis.on("scroll", ScrollTrigger.update);
    const handleRaf = (time) => {
      lenis.raf(time * 1e3);
    };
    gsap.ticker.add(handleRaf);
    gsap.ticker.lagSmoothing(0);
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => {
      lenis.destroy();
      gsap.ticker.remove(handleRaf);
      ScrollTrigger.getAll().forEach((t) => t.kill(true));
    };
  }, [currentPath]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        const target = anchor.getAttribute("target");
        if (href && href.startsWith("/") && !href.startsWith("//") && target !== "_blank") {
          e.preventDefault();
          ScrollTrigger.getAll().forEach((t) => t.kill(true));
          navigate(href);
          window.scrollTo({ top: 0, behavior: "auto" });
        }
      }
    };
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [navigate]);
  return /* @__PURE__ */ jsx(ContentProvider, { children: /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-[#050505] text-white selection:bg-[#1e90ff] selection:text-black", children: [
    !isAdminPage && /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] }) });
}
(_g = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _g.call(globalThis, "src/components/SEO.jsx");
function SEO({ title, description, canonicalUrl, url, ogImage, ogType = "website", type, jsonLd }) {
  const defaultTitle = "Pratik Bhusal — Graphic Designer & Art Director";
  const defaultDesc = "Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging.";
  const defaultImage = "https://pratikbhusal.com/src/assets/logo.png";
  const defaultUrl = "https://pratikbhusal.com";
  const activeTitle = title ? `${title} | Pratik Bhusal` : defaultTitle;
  const activeDesc = description || defaultDesc;
  const activeUrl = canonicalUrl || url || defaultUrl;
  const activeOgType = ogType || type || "website";
  const activeImage = ogImage || defaultImage;
  return /* @__PURE__ */ jsxs(Head, { children: [
    /* @__PURE__ */ jsx("title", { children: activeTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: activeDesc }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: activeUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: activeTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: activeDesc }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: activeImage }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: activeOgType }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: activeUrl }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: activeTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: activeDesc }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: activeImage }),
    jsonLd && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd) })
  ] });
}
(_h = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _h.call(globalThis, "src/components/HeroTitle.jsx");
function HeroTitle() {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line1Ref.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power4.out", delay: 0.2 }
      );
      gsap.fromTo(
        line2Ref.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power4.out", delay: 0.4 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsx("div", { ref: containerRef, className: "select-none flex flex-col justify-center overflow-hidden py-4", children: /* @__PURE__ */ jsxs("h1", { className: "font-bebas tracking-tighter leading-[0.80] flex flex-col", children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        ref: line1Ref,
        className: "inline-block text-[19vw] sm:text-[18vw] md:text-[16vw] lg:text-[150px] xl:text-[185px] text-white transition-all duration-300 hover:text-brand hover:tracking-normal cursor-default",
        children: "PRATIK"
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        ref: line2Ref,
        className: "inline-block text-[19vw] sm:text-[18vw] md:text-[16vw] lg:text-[150px] xl:text-[185px] text-neutral-400/90 transition-all duration-300 hover:text-white cursor-default",
        children: "BHUSAL"
      }
    )
  ] }) });
}
const psTool = "/assets/photoshop-CULvMUFB.jpg";
const aiTool = "/assets/illustrator-DlMT_z0b.jpg";
const prTool = "/assets/premiere--_cfnWOO.jpg";
const paletteTool = "/assets/palette-fi3odi23.jpg";
(_i = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _i.call(globalThis, "src/components/HeroCard.jsx");
function HeroCard() {
  const [cards, setCards] = useState([
    {
      id: 1,
      number: "01",
      title: "Adobe Photoshop",
      subtitle: "Photo & Digital Art",
      img: psTool
    },
    {
      id: 2,
      number: "02",
      title: "Adobe Illustrator",
      subtitle: "Vector & Branding",
      img: aiTool
    },
    {
      id: 3,
      number: "03",
      title: "Premiere Video Editor",
      subtitle: "Motion & Video Cuts",
      img: prTool
    },
    {
      id: 4,
      number: "04",
      title: "Color & Studio Palette",
      subtitle: "Visual Identity System",
      img: paletteTool
    }
  ]);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const getCardTransform = (index) => {
    switch (index) {
      case 0:
        return { rotate: 14, y: 0, x: 0, scale: 1, zIndex: 4 };
      case 1:
        return { rotate: 5, y: -10, x: 10, scale: 0.97, zIndex: 3 };
      case 2:
        return { rotate: -6, y: -18, x: 20, scale: 0.94, zIndex: 2 };
      case 3:
        return { rotate: -15, y: -26, x: 28, scale: 0.91, zIndex: 1 };
      default:
        return { rotate: 0, y: 0, x: 0, scale: 1, zIndex: 0 };
    }
  };
  const cycleNextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const first = newCards.shift();
      newCards.push(first);
      return newCards;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      cycleNextCard();
    }, 4e3);
    return () => clearInterval(timer);
  }, [cards, isAnimating]);
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center lg:items-end justify-center py-6 select-none", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onClick: cycleNextCard,
      animate: { y: [-4, 4, -4] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      className: "relative w-[280px] sm:w-[320px] h-[340px] flex items-center justify-center group cursor-pointer",
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-brand/20 rounded-full blur-3xl group-hover:bg-brand/40 transition-colors duration-500 pointer-events-none" }),
        cards.map((card, index) => {
          const transform = getCardTransform(index);
          const isTopCard = index === 0;
          return /* @__PURE__ */ jsx(
            motion.div,
            {
              layout: true,
              initial: { y: -380, opacity: 0, scale: 0.75, rotate: transform.rotate * 1.5 },
              animate: {
                y: transform.y,
                x: transform.x,
                rotate: transform.rotate,
                scale: transform.scale,
                opacity: 1
              },
              transition: {
                layout: { type: "spring", stiffness: 220, damping: 22 },
                y: { type: "spring", stiffness: 140, damping: 16, delay: (4 - card.id) * 0.12 },
                opacity: { duration: 0.4 }
              },
              style: { zIndex: transform.zIndex },
              className: `absolute w-[220px] sm:w-[250px] aspect-square rounded-2xl bg-[#080808] border overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] ${isTopCard ? "border-brand shadow-[0_0_30px_rgba(30,144,255,0.45)] hover:scale-[1.04]" : "border-neutral-800/90"}`,
              children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full relative", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: card.img,
                    alt: card.title,
                    className: "w-full h-full object-cover rounded-2xl"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono tracking-widest text-brand font-bold uppercase", children: [
                      "TOOL ",
                      card.number
                    ] }),
                    isTopCard && /* @__PURE__ */ jsx(
                      motion.span,
                      {
                        initial: { opacity: 0, scale: 0.85 },
                        animate: { opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.85 },
                        transition: { duration: 0.2 },
                        className: "text-[9px] px-2.5 py-1 rounded bg-brand text-black font-bold uppercase tracking-wider shadow-md",
                        children: "CLICK TO REVEAL"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("h4", { className: "font-bebas text-xl text-white tracking-wider leading-tight mt-1.5", children: card.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-[9.5px] text-neutral-400 font-mono tracking-tight", children: card.subtitle })
                ] })
              ] })
            },
            card.id
          );
        })
      ]
    }
  ) });
}
(_j = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _j.call(globalThis, "src/components/HeroFooter.jsx");
function HeroFooter() {
  const [isHovered, setIsHovered] = useState(false);
  const text = "SCROLL TO BEGIN";
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs(
    motion.footer,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay: 0.5, ease: "easeOut" },
      className: "relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 py-2 text-[11px] sm:text-xs tracking-[0.2em] text-neutral-500 uppercase font-medium select-none",
      children: [
        /* @__PURE__ */ jsx("div", { children: "GRAPHIC DESIGNER  /  ART WORKER" }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false),
            onClick: scrollToNext,
            className: "flex items-center gap-2 cursor-pointer py-1 px-2 rounded group",
            children: [
              /* @__PURE__ */ jsx("div", { className: "flex", children: text.split("").map((char, index) => /* @__PURE__ */ jsx(
                motion.span,
                {
                  animate: {
                    opacity: isHovered ? 1 : 0.25,
                    color: isHovered ? "#1e90ff" : "#6b7280",
                    y: isHovered ? -1 : 0
                  },
                  transition: {
                    duration: 0.2,
                    delay: isHovered ? index * 0.035 : (text.length - index) * 0.015,
                    ease: "easeOut"
                  },
                  className: "inline-block transition-colors",
                  children: char === " " ? " " : char
                },
                index
              )) }),
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  animate: {
                    opacity: isHovered ? 1 : 0.3,
                    color: isHovered ? "#1e90ff" : "#6b7280",
                    y: isHovered ? [0, 5, 0] : 0
                  },
                  transition: {
                    y: isHovered ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : {},
                    duration: 0.2,
                    delay: isHovered ? text.length * 0.035 : 0
                  },
                  className: "inline-block ml-1 font-bold text-sm",
                  children: "↓"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
(_k = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _k.call(globalThis, "src/components/Hero.jsx");
gsap.registerPlugin(ScrollTrigger);
const MOBILE_DECK = [
  {
    id: 1,
    number: "01",
    title: "Color & Studio Palette",
    subtitle: "Visual Identity System",
    img: paletteTool
  },
  {
    id: 2,
    number: "02",
    title: "Typography Systems",
    subtitle: "Geometric Scaling",
    img: aiTool
  },
  {
    id: 3,
    number: "03",
    title: "Brand Identity",
    subtitle: "Adaptive Logo Systems",
    img: psTool
  },
  {
    id: 4,
    number: "04",
    title: "Digital Interfaces",
    subtitle: "Responsive Products",
    img: prTool
  }
];
function CardInner({ card, isTopCard }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full relative", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: card.img,
        alt: card.title,
        className: "w-full h-full object-cover rounded-2xl"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-4", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono tracking-widest text-[#1e90ff] font-bold uppercase", children: [
        "TOOL ",
        card.number
      ] }),
      /* @__PURE__ */ jsx("h4", { className: "font-bebas text-lg sm:text-xl text-white tracking-wider leading-tight mt-1", children: card.title }),
      /* @__PURE__ */ jsx("p", { className: "text-[9.5px] text-neutral-400 font-mono tracking-tight", children: card.subtitle })
    ] })
  ] });
}
function Hero() {
  const mobileContainerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  useEffect(() => {
    const isMobile = window.matchMedia("(max-w: 767px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isMobile || prefersReducedMotion || !mobileContainerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(card1Ref.current, { rotate: 5, scale: 1, x: 0, opacity: 1 });
      gsap.set(card2Ref.current, { rotate: -4, scale: 0.96, x: 5, opacity: 1 });
      gsap.set(card3Ref.current, { rotate: 8, scale: 0.92, x: 10, opacity: 1 });
      gsap.set(card4Ref.current, { rotate: -12, scale: 0.88, x: 15, opacity: 1 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mobileContainerRef.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1
          // Smooth scrolling scrub binding
        }
      });
      tl.to(card1Ref.current, {
        x: "-130%",
        rotate: -15,
        opacity: 0,
        ease: "power1.inOut"
      }, "stage1");
      tl.to(card2Ref.current, {
        rotate: 0,
        scale: 1,
        x: 0,
        ease: "power1.inOut"
      }, "stage1");
      tl.to(card2Ref.current, {
        x: "130%",
        rotate: 15,
        opacity: 0,
        ease: "power1.inOut"
      }, "stage2");
      tl.to(card3Ref.current, {
        rotate: 0,
        scale: 1,
        x: 0,
        ease: "power1.inOut"
      }, "stage2");
      tl.to(card3Ref.current, {
        x: "-130%",
        rotate: -15,
        opacity: 0,
        ease: "power1.inOut"
      }, "stage3");
      tl.to(card4Ref.current, {
        rotate: 0,
        scale: 1,
        x: 0,
        ease: "power1.inOut"
      }, "stage3");
    });
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxs("section", { id: "home", className: "relative min-h-screen bg-[#050505]", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden md:flex min-h-screen flex-col justify-between px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 pb-4 sm:pb-6 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto py-3 sm:py-6", children: [
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsx(HeroTitle, {}) }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-5", children: /* @__PURE__ */ jsx(HeroCard, {}) })
      ] }),
      /* @__PURE__ */ jsx(HeroFooter, {})
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: mobileContainerRef,
        className: "md:hidden flex flex-col justify-between min-h-screen pt-[88px] pb-4 px-4 bg-[#050505] overflow-hidden",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-full text-left pl-2 mb-2", children: /* @__PURE__ */ jsxs("h1", { className: "font-bebas tracking-tighter leading-[0.76] flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[25vw] sm:text-[21vw] text-white", children: "PRATIK" }),
            /* @__PURE__ */ jsx("span", { className: "text-[25vw] sm:text-[21vw] text-neutral-400/90 pl-[12vw] sm:pl-[10vw]", children: "BHUSAL" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-center my-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative w-[270px] sm:w-[315px] aspect-square flex items-center justify-center", children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#1e90ff]/10 rounded-full blur-3xl pointer-events-none" }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  ref: card4Ref,
                  className: "absolute inset-0 rounded-2xl bg-[#080808] border border-neutral-850 overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)]",
                  style: { transform: "rotate(-12deg) scale(0.88)" },
                  children: /* @__PURE__ */ jsx(CardInner, { card: MOBILE_DECK[3] })
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  ref: card3Ref,
                  className: "absolute inset-0 rounded-2xl bg-[#080808] border border-neutral-850 overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)]",
                  style: { transform: "rotate(8deg) scale(0.92)" },
                  children: /* @__PURE__ */ jsx(CardInner, { card: MOBILE_DECK[2] })
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  ref: card2Ref,
                  className: "absolute inset-0 rounded-2xl bg-[#080808] border border-neutral-850 overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)]",
                  style: { transform: "rotate(-4deg) scale(0.96)" },
                  children: /* @__PURE__ */ jsx(CardInner, { card: MOBILE_DECK[1] })
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  ref: card1Ref,
                  className: "absolute inset-0 rounded-2xl bg-[#080808] border border-[#1e90ff] overflow-hidden shadow-[0_0_20px_rgba(30,144,255,0.35)]",
                  style: { transform: "rotate(5deg) scale(1)" },
                  children: /* @__PURE__ */ jsx(CardInner, { card: MOBILE_DECK[0] })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-5 text-center", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#ff6b35] font-bold uppercase", children: "GRAPHIC DESIGNER / ART WORKER" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center pb-2 mt-auto", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-neutral-500 uppercase animate-pulse", children: "SCROLL TO ROTATE ↓" }) })
        ]
      }
    )
  ] });
}
const section2Img = "/assets/section2-BacRSVr-.jpg";
(_l = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _l.call(globalThis, "src/components/SectionTwo.jsx");
gsap.registerPlugin(ScrollTrigger);
function SectionTwo() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -70 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 90, scale: 0.88, rotateX: 12 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
      gsap.to(topTextRef.current, {
        x: 80,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
      gsap.to(bottomTextRef.current, {
        x: -80,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "services",
      ref: containerRef,
      className: "relative min-h-screen bg-[#050505] text-white flex flex-col justify-between p-4 sm:p-10 lg:p-14 border-t border-neutral-900 overflow-hidden selection:bg-[#1e90ff] selection:text-black select-none",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative z-20 flex items-center justify-between w-full pt-1 pb-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#ff6b35] font-bold tracking-widest", children: "02" }),
          /* @__PURE__ */ jsx("span", { className: "font-bebas text-sm tracking-[0.25em] text-neutral-400 font-medium uppercase", children: "TRANSFORMATION" })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: topTextRef,
            className: "absolute top-12 inset-x-0 flex justify-between px-8 sm:px-16 pointer-events-none opacity-25 font-bebas text-[11vw] leading-none text-neutral-600 tracking-widest select-none",
            children: [
              /* @__PURE__ */ jsx("span", { children: "A" }),
              /* @__PURE__ */ jsx("span", { children: "L" }),
              /* @__PURE__ */ jsx("span", { children: "E" }),
              /* @__PURE__ */ jsx("span", { children: "X" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 grid lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto py-6 sm:py-12", children: [
          /* @__PURE__ */ jsxs("div", { ref: titleRef, className: "lg:col-span-6 space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#ff6b35] font-semibold", children: [
              /* @__PURE__ */ jsx("span", { children: "01" }),
              /* @__PURE__ */ jsx("span", { children: "—" }),
              /* @__PURE__ */ jsx("span", { children: "NORDIC BRAND IDENTITY" })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider leading-[0.95]", children: "THE GEOMETRY OF COLD LIGHT." })
          ] }),
          /* @__PURE__ */ jsx("div", { ref: imageRef, className: "lg:col-span-6 flex justify-center lg:justify-end", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              whileHover: { scale: 1.03, y: -6 },
              transition: { type: "spring", stiffness: 300, damping: 25 },
              className: "relative w-full max-w-xl aspect-[1.6] rounded-2xl overflow-hidden border border-neutral-800/90 bg-[#0a0a0a] shadow-[0_25px_60px_rgba(0,0,0,0.9)] group cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: section2Img,
                    alt: "Nordic Brand Identity Mockup",
                    className: "w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: bottomTextRef,
            className: "absolute bottom-6 inset-x-0 flex justify-between px-8 sm:px-16 pointer-events-none opacity-20 font-bebas text-[11vw] leading-none text-neutral-600 tracking-widest select-none",
            children: [
              /* @__PURE__ */ jsx("span", { children: "M" }),
              /* @__PURE__ */ jsx("span", { children: "O" }),
              /* @__PURE__ */ jsx("span", { children: "R" }),
              /* @__PURE__ */ jsx("span", { children: "E" })
            ]
          }
        )
      ]
    }
  );
}
(_m = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _m.call(globalThis, "src/components/WorksSection.jsx");
gsap.registerPlugin(ScrollTrigger);
function GlowingHoverText({ text, className }) {
  const [isHovered, setIsHovered] = useState(false);
  return /* @__PURE__ */ jsx(
    "div",
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      className: `cursor-pointer select-none ${className}`,
      children: text.split("").map((char, index) => /* @__PURE__ */ jsx(
        motion.span,
        {
          animate: {
            opacity: isHovered ? 1 : 0.85,
            color: isHovered ? "#ffffff" : "#f3f4f6",
            textShadow: isHovered ? "0 0 20px rgba(30,144,255,0.85)" : "none"
          },
          transition: {
            duration: 0.2,
            delay: isHovered ? index * 0.02 : (text.length - index) * 0.01,
            ease: "easeOut"
          },
          className: "inline-block transition-colors",
          children: char === " " ? " " : char
        },
        index
      ))
    }
  );
}
function DraggableCardGroupW1({ images }) {
  const [order, setOrder] = useState([0, 1, 2]);
  const bringToFront = (clickedIdx) => {
    setOrder((prev) => {
      const filtered = prev.filter((i) => i !== clickedIdx);
      return [...filtered, clickedIdx];
    });
  };
  const basePositions = [
    { left: "left-0", top: "top-0", size: "w-44 sm:w-56 aspect-[3/4]", rotate: -4 },
    { left: "left-28 sm:left-44", top: "top-8 sm:top-12", size: "w-56 sm:w-72 aspect-square", rotate: 5 },
    { left: "left-16 sm:left-24", top: "top-28 sm:top-36", size: "w-36 sm:w-48 aspect-[3/4]", rotate: 0 }
  ];
  return /* @__PURE__ */ jsx("div", { className: "relative w-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center lg:justify-start", children: order.map((imgIdx, stackPos) => {
    const pos = basePositions[imgIdx];
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        layout: true,
        drag: true,
        dragConstraints: { left: -140, right: 140, top: -140, bottom: 140 },
        dragElastic: 0.2,
        whileDrag: { scale: 1.08, zIndex: 50, cursor: "grabbing" },
        onDragStart: () => bringToFront(imgIdx),
        onClick: () => bringToFront(imgIdx),
        whileHover: { y: -8, scale: 1.03 },
        transition: { layout: { type: "spring", stiffness: 280, damping: 24 } },
        className: `pkg-card-w1 absolute ${pos.left} ${pos.top} ${pos.size} rounded-2xl overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing`,
        style: { zIndex: (stackPos + 1) * 10 },
        children: /* @__PURE__ */ jsx("img", { src: images[imgIdx], alt: `Pathao ${imgIdx + 1}`, className: "w-full h-full object-cover pointer-events-none select-none" })
      },
      imgIdx
    );
  }) });
}
function DraggableCardGroupW5({ images }) {
  const [order, setOrder] = useState([0, 1, 2]);
  const bringToFront = (clickedIdx) => {
    setOrder((prev) => {
      const filtered = prev.filter((i) => i !== clickedIdx);
      return [...filtered, clickedIdx];
    });
  };
  const basePositions = [
    { right: "right-0", top: "top-3 sm:top-5", size: "w-52 sm:w-64 aspect-[4/3]", rotate: 0 },
    { right: "right-32 sm:right-48", top: "top-12 sm:top-16", size: "w-48 sm:w-60 aspect-[4/3]", rotate: -6 },
    { right: "right-16 sm:right-24", top: "top-32 sm:top-40", size: "w-44 sm:w-56 aspect-[4/3]", rotate: 4 }
  ];
  return /* @__PURE__ */ jsx("div", { className: "relative w-full min-h-[420px] sm:min-h-[480px] flex items-start justify-center lg:justify-end pt-2 sm:pt-4", children: order.map((imgIdx, stackPos) => {
    const pos = basePositions[imgIdx];
    return /* @__PURE__ */ jsx(
      motion.div,
      {
        layout: true,
        drag: true,
        dragConstraints: { left: -140, right: 140, top: -140, bottom: 140 },
        dragElastic: 0.2,
        whileDrag: { scale: 1.08, zIndex: 50, cursor: "grabbing" },
        onDragStart: () => bringToFront(imgIdx),
        onClick: () => bringToFront(imgIdx),
        whileHover: { y: -8, scale: 1.04 },
        transition: { layout: { type: "spring", stiffness: 280, damping: 24 } },
        className: `w5-card absolute ${pos.right} ${pos.top} ${pos.size} rounded-2xl overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing`,
        style: { zIndex: (stackPos + 1) * 10 },
        children: /* @__PURE__ */ jsx("img", { src: images[imgIdx], alt: `Social ${imgIdx + 1}`, className: "w-full h-full object-cover pointer-events-none select-none" })
      },
      imgIdx
    );
  }) });
}
function WorksSection({ initialWorks }) {
  const works = initialWorks && initialWorks.length > 0 ? initialWorks : worksData;
  const containerRef = useRef(null);
  const [w4Hovered, setW4Hovered] = useState(false);
  useEffect(() => {
    const ctx = gsap.context(() => {
      var _a2, _b2, _c2, _d2, _e2, _f2;
      const w1 = (_a2 = containerRef.current) == null ? void 0 : _a2.querySelector(".work-1");
      if (w1) {
        gsap.fromTo(
          w1.querySelectorAll(".w1-text-el"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            stagger: 0.22,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w1,
              start: "top 80%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
        gsap.fromTo(
          w1.querySelectorAll(".pkg-card-w1"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w1,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
      const w2 = (_b2 = containerRef.current) == null ? void 0 : _b2.querySelector(".work-2");
      if (w2) {
        gsap.fromTo(
          w2.querySelectorAll(".w2-text-el"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            stagger: 0.22,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w2,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
        gsap.fromTo(
          w2.querySelector(".w2-img"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w2,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
      const w3 = (_c2 = containerRef.current) == null ? void 0 : _c2.querySelector(".work-3");
      if (w3) {
        gsap.fromTo(
          w3.querySelectorAll(".w3-text-el"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w3,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
        gsap.fromTo(
          w3.querySelector(".w3-img"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w3,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
      const w4 = (_d2 = containerRef.current) == null ? void 0 : _d2.querySelector(".work-4");
      if (w4) {
        gsap.fromTo(
          w4.querySelector(".w4-img"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w4,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
        gsap.fromTo(
          w4.querySelectorAll(".w4-text > *"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            stagger: 0.22,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w4,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
      const w5 = (_e2 = containerRef.current) == null ? void 0 : _e2.querySelector(".work-5");
      if (w5) {
        gsap.fromTo(
          w5.querySelectorAll(".w5-text > *"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            stagger: 0.22,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w5,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
        gsap.fromTo(
          w5.querySelectorAll(".w5-card"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w5,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
      const w6 = (_f2 = containerRef.current) == null ? void 0 : _f2.querySelector(".work-6");
      if (w6) {
        gsap.fromTo(
          w6.querySelectorAll(".w6-text-el"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w6,
              start: "top 80%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
        gsap.fromTo(
          w6.querySelector(".w6-img"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: w6,
              start: "top 80%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: containerRef,
      id: "portfolio",
      className: "relative min-h-screen bg-[#050505] text-white py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-14 border-t border-neutral-900 overflow-hidden selection:bg-[#1e90ff] selection:text-black select-none",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full pb-6 sm:pb-10 lg:pb-12", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#ff6b35] font-bold tracking-widest", children: "03" }),
          /* @__PURE__ */ jsx("span", { className: "font-bebas text-sm tracking-[0.25em] text-neutral-400 font-medium uppercase", children: "SELECTED WORK" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-16 sm:space-y-24 lg:space-y-32", children: works.map((work) => {
          if (work.layout === "skincare-packaging") {
            const imgList = work.images || [work.image, work.image, work.image];
            return /* @__PURE__ */ jsxs("div", { className: "work-1 grid lg:grid-cols-12 gap-10 items-center py-6", children: [
              /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsx(DraggableCardGroupW1, { images: imgList }) }),
              /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
                /* @__PURE__ */ jsxs("span", { className: "w1-text-el text-xs font-mono text-[#ff6b35] tracking-widest uppercase font-semibold block", children: [
                  work.index,
                  "  /  ",
                  work.category
                ] }),
                /* @__PURE__ */ jsx("div", { className: "w1-text-el", children: /* @__PURE__ */ jsx(
                  GlowingHoverText,
                  {
                    text: work.title,
                    className: "font-bebas text-4xl sm:text-5xl lg:text-6xl tracking-wider leading-none"
                  }
                ) }),
                /* @__PURE__ */ jsx("p", { className: "w1-text-el text-sm text-neutral-400 font-sans leading-relaxed max-w-lg", children: work.subtitle })
              ] })
            ] }, work.id);
          }
          if (work.layout === "editorial-publishing") {
            return /* @__PURE__ */ jsxs("div", { className: "work-2 grid lg:grid-cols-12 gap-10 items-center py-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "lg:col-span-6 space-y-6", children: [
                /* @__PURE__ */ jsxs("span", { className: "w2-text-el text-xs font-mono text-[#ff6b35] tracking-widest uppercase font-semibold block", children: [
                  work.index,
                  "  /  ",
                  work.category
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "w2-text-el font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider leading-none", children: work.title }),
                /* @__PURE__ */ jsx("p", { className: "w2-text-el text-sm text-neutral-400 font-sans leading-relaxed max-w-lg", children: work.description }),
                work.quote && /* @__PURE__ */ jsx("blockquote", { className: "w2-text-el font-bebas text-2xl sm:text-3xl text-white tracking-wider pt-4 border-t border-neutral-800/80", children: work.quote })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w2-img lg:col-span-6 flex justify-center lg:justify-end", children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  whileHover: { scale: 1.03, rotate: 1 },
                  transition: { type: "spring", stiffness: 280, damping: 22 },
                  className: "relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: work.image,
                      alt: work.title,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    }
                  )
                }
              ) })
            ] }, work.id);
          }
          if (work.layout === "motion-banner") {
            return /* @__PURE__ */ jsxs("div", { className: "work-3 space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "w3-text-el text-xs font-mono text-neutral-400 tracking-widest uppercase", children: [
                  work.index,
                  "  /  ",
                  work.category
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "w3-text-el font-bebas text-2xl sm:text-3xl text-white tracking-wider", children: work.title })
              ] }),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  whileHover: { scale: 1.01 },
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                  className: "w3-img relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: work.image,
                        alt: work.title,
                        className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-end p-8 sm:p-12 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none", children: /* @__PURE__ */ jsx("h2", { className: "w3-distort font-bebas text-6xl sm:text-8xl lg:text-9xl text-white tracking-wider leading-none drop-shadow-2xl", children: work.overlayTitle || "DISTORTION" }) })
                  ]
                }
              )
            ] }, work.id);
          }
          if (work.layout === "packaging-reversed") {
            return /* @__PURE__ */ jsxs("div", { className: "work-4 grid lg:grid-cols-12 gap-10 items-center py-6", children: [
              /* @__PURE__ */ jsx("div", { className: "w4-img lg:col-span-6 flex justify-center lg:justify-start", children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  onMouseEnter: () => setW4Hovered(true),
                  onMouseLeave: () => setW4Hovered(false),
                  whileHover: { scale: 1.04, y: -6 },
                  transition: { type: "spring", stiffness: 300, damping: 22 },
                  className: "relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.9)] group cursor-pointer",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: work.image,
                      alt: work.title,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "w4-text lg:col-span-6 space-y-6", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono text-[#ff6b35] tracking-widest uppercase font-semibold block", children: [
                  work.index,
                  "  /  ",
                  work.category
                ] }),
                /* @__PURE__ */ jsx(
                  motion.h3,
                  {
                    animate: {
                      color: w4Hovered ? "#ffffff" : "#f3f4f6",
                      textShadow: w4Hovered ? "0 0 22px rgba(30,144,255,0.6)" : "none"
                    },
                    transition: { duration: 0.3 },
                    className: "font-bebas text-4xl sm:text-5xl lg:text-6xl tracking-wider leading-none transition-all",
                    children: work.title
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-400 font-sans leading-relaxed max-w-lg", children: work.description })
              ] })
            ] }, work.id);
          }
          if (work.layout === "social-media-3card-reversed") {
            const imgList = work.images || [work.image, work.image, work.image];
            return /* @__PURE__ */ jsxs("div", { className: "work-5 grid lg:grid-cols-12 gap-10 items-start py-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "w5-text lg:col-span-5 space-y-6 pt-1", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono text-[#ff6b35] tracking-widest uppercase font-semibold block", children: [
                  work.index,
                  "  /  ",
                  work.category
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider leading-none", children: work.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-400 font-sans leading-relaxed max-w-lg", children: work.description })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "lg:col-span-7", children: /* @__PURE__ */ jsx(DraggableCardGroupW5, { images: imgList }) })
            ] }, work.id);
          }
          if (work.layout === "hero-landscape") {
            return /* @__PURE__ */ jsxs("div", { className: "work-6 space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("span", { className: "w6-text-el text-xs font-mono text-[#ff6b35] tracking-widest uppercase font-semibold", children: [
                  work.index,
                  "  /  ",
                  work.category
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "w6-text-el font-bebas text-2xl sm:text-3xl text-white tracking-wider", children: work.title })
              ] }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  whileHover: { scale: 1.01 },
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                  className: "w6-img relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer",
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: work.image,
                      alt: work.title,
                      className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    }
                  )
                }
              )
            ] }, work.id);
          }
          return null;
        }) })
      ]
    }
  );
}
const mechanicAImg = "/assets/work1-BsbYHpmx.jpg";
const mechanicBImg = "/assets/work3-Bg0buynq.jpg";
(_n = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _n.call(globalThis, "src/components/RevealMechanicsSection.jsx");
gsap.registerPlugin(ScrollTrigger);
function RevealCard({ label, desc, children }) {
  const [revealed, setRevealed] = useState(false);
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
  const handleClick = () => {
    if (isTouchDevice) setRevealed((r) => !r);
  };
  const handleMouseEnter = () => {
    if (!isTouchDevice) setRevealed(true);
  };
  const handleMouseLeave = () => {
    if (!isTouchDevice) setRevealed(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx("div", { className: "text-[11px] font-mono text-[#ff6b35] font-semibold tracking-wider uppercase", children: label }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative aspect-[16/10] overflow-hidden border border-neutral-800/80 bg-[#0a0a0a] cursor-pointer",
        onClick: handleClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-full h-full", children }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-[#050505] pointer-events-none",
              style: {
                transform: revealed ? "translateY(-101%)" : "translateY(0%)",
                transition: "transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)"
              }
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none",
              style: {
                opacity: revealed ? 0 : 1,
                transition: "opacity 0.35s ease"
              },
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-8 h-[1px] bg-[#ff6b35]" }),
                /* @__PURE__ */ jsx("span", { className: "font-mono text-[9px] tracking-[0.25em] text-[#ff6b35] uppercase", children: isTouchDevice ? "TAP TO REVEAL" : "HOVER TO REVEAL" }),
                /* @__PURE__ */ jsx("div", { className: "w-8 h-[1px] bg-[#ff6b35]" })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400 font-sans leading-relaxed", children: desc })
  ] });
}
function RevealMechanicsSection() {
  const sectionRef = useRef(null);
  const slitRef = useRef(null);
  const portalMaskRef = useRef(null);
  const portalImgRef = useRef(null);
  const bentoTile1Ref = useRef(null);
  const bentoTile2Ref = useRef(null);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      if (slitRef.current) gsap.set(slitRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
      if (bentoTile1Ref.current) gsap.set([bentoTile1Ref.current, bentoTile2Ref.current], { opacity: 1, y: 0, scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      if (slitRef.current) {
        gsap.fromTo(
          slitRef.current,
          { clipPath: "inset(49% 0% 49% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: slitRef.current,
              start: "top 80%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
              // Exact reverse on scroll up!
            }
          }
        );
      }
      if (portalMaskRef.current && portalImgRef.current) {
        gsap.fromTo(
          portalMaskRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: portalMaskRef.current,
              start: "top 80%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
        gsap.fromTo(
          portalImgRef.current,
          { y: -35 },
          {
            y: 35,
            scrollTrigger: {
              trigger: portalMaskRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );
      }
      const tiles = [bentoTile1Ref.current, bentoTile2Ref.current].filter(Boolean);
      if (tiles.length > 0) {
        gsap.fromTo(
          tiles,
          { opacity: 0, y: "15%", scale: 1.1 },
          {
            opacity: 1,
            y: "0%",
            scale: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tiles[0],
              start: "top 80%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
              // Exact reverse on scroll up!
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: sectionRef,
      id: "reveal-mechanics",
      className: "relative bg-[#050505] text-white py-10 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 border-t border-neutral-900 selection:bg-[#1e90ff] selection:text-black select-none",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full pb-6 border-b border-neutral-900", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#ff6b35] font-bold tracking-widest", children: "04" }),
          /* @__PURE__ */ jsx("span", { className: "font-bebas text-sm tracking-[0.25em] text-neutral-400 font-medium uppercase", children: "MORE BY ME" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 pt-6 sm:pt-10 lg:pt-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[11px] font-mono text-[#ff6b35] font-semibold tracking-wider uppercase", children: "[ NORDIC GLACIER LANDSCAPE ]" }),
            /* @__PURE__ */ jsx("div", { className: "relative aspect-[16/10] overflow-hidden border border-neutral-800/80 bg-[#0a0a0a]", children: /* @__PURE__ */ jsx("div", { ref: slitRef, className: "w-full h-full", style: { clipPath: "inset(49% 0% 49% 0%)" }, children: /* @__PURE__ */ jsx("img", { src: mechanicAImg, alt: "Nordic Glacier Landscape", className: "w-full h-full object-cover" }) }) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400 font-sans leading-relaxed", children: "High-contrast architectural photography capturing raw glacier formations and natural mountain textures." })
          ] }),
          /* @__PURE__ */ jsx(RevealCard, { label: "[ KINETIC TYPOGRAPHY ART ]", desc: "Typographic brand artwork scoping abstract motion graphics inside architectural letterform contours.", children: /* @__PURE__ */ jsxs(
            "svg",
            {
              ref: portalMaskRef,
              viewBox: "0 0 800 500",
              className: "w-full h-full",
              preserveAspectRatio: "xMidYMid slice",
              children: [
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("mask", { id: "alphaPortalMask", children: [
                  /* @__PURE__ */ jsx("rect", { width: "800", height: "500", fill: "black" }),
                  /* @__PURE__ */ jsx("text", { x: "50%", y: "55%", dominantBaseline: "middle", textAnchor: "middle", fill: "white", fontSize: "420", fontWeight: "900", fontFamily: "Bebas Neue, sans-serif", letterSpacing: "0", children: "P" })
                ] }) }),
                /* @__PURE__ */ jsx("g", { mask: "url(#alphaPortalMask)", children: /* @__PURE__ */ jsx("image", { ref: portalImgRef, href: mechanicBImg, x: "-10%", y: "-10%", width: "120%", height: "120%", preserveAspectRatio: "xMidYMid slice" }) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[11px] font-mono text-[#ff6b35] font-semibold tracking-wider uppercase", children: "[ ACADEMIC & BRAND CAMPAIGN ]" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 aspect-[16/10] relative", children: [
              /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden border border-neutral-800/80 bg-[#0a0a0a]", children: /* @__PURE__ */ jsx("div", { ref: bentoTile1Ref, className: "w-full h-full opacity-0", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: mechanicC1Img,
                  alt: "Study in Australia Poster",
                  className: "w-full h-full object-cover"
                }
              ) }) }),
              /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden border border-neutral-800/80 bg-[#0a0a0a]", children: /* @__PURE__ */ jsx("div", { ref: bentoTile2Ref, className: "w-full h-full opacity-0", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: mechanicC2Img,
                  alt: "Commercial Brand Poster",
                  className: "w-full h-full object-cover"
                }
              ) }) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400 font-sans leading-relaxed", children: "Social media advertising artwork designed for academic programs and commercial brand promotions." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-10", children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/works",
            className: "relative overflow-hidden group flex items-center gap-3 border border-neutral-800 px-5 py-2.5 rounded-lg text-xs font-mono tracking-widest text-neutral-400 hover:text-black transition-colors duration-300 bg-[#0a0a0a] cursor-pointer shadow-lg",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#1e90ff] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400 ease-out pointer-events-none" }),
              /* @__PURE__ */ jsx("span", { className: "relative z-10 font-bold transition-colors duration-300", children: "EXPLORE MORE" }),
              /* @__PURE__ */ jsx("span", { className: "relative z-10 w-5 h-5 rounded-md bg-[#1e90ff] group-hover:bg-black flex items-center justify-center transition-colors duration-300 shadow-sm", children: /* @__PURE__ */ jsxs(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "3",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "w-2.5 h-2.5 text-white group-hover:text-[#1e90ff] transition-colors duration-300",
                  children: [
                    /* @__PURE__ */ jsx("line", { x1: "7", y1: "17", x2: "17", y2: "7" }),
                    /* @__PURE__ */ jsx("polyline", { points: "7 7 17 7 17 17" })
                  ]
                }
              ) })
            ]
          }
        ) })
      ]
    }
  );
}
const aboutPortrait = "/assets/Profile-CiDCCGWA.png";
(_o = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _o.call(globalThis, "src/components/AboutSection.jsx");
gsap.registerPlugin(ScrollTrigger);
function AboutSection() {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const portraitRef = useRef(null);
  const bioRef = useRef(null);
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const headlineLines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);
      if (headlineLines.length > 0) {
        gsap.fromTo(
          headlineLines,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: portraitRef.current,
              start: "top 80%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
      if (bioRef.current) {
        gsap.fromTo(
          bioRef.current.children,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 80%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: sectionRef,
      id: "about",
      className: "relative min-h-screen bg-[#050505] text-white py-10 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 border-t border-neutral-900 selection:bg-[#1e90ff] selection:text-black select-none flex flex-col justify-between",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full pb-6 border-b border-neutral-900", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#ff6b35] font-bold tracking-widest", children: "05" }),
          /* @__PURE__ */ jsx("span", { className: "font-bebas text-sm tracking-[0.25em] text-neutral-400 font-medium uppercase", children: "ABOUT THE STUDIO" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "py-8 sm:py-12 lg:py-16 space-y-2 sm:space-y-4 max-w-7xl mx-auto w-full", children: [
          /* @__PURE__ */ jsx(
            "h1",
            {
              ref: line1Ref,
              className: "font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-none opacity-0",
              children: "I DESIGN VISUAL LANGUAGES"
            }
          ),
          /* @__PURE__ */ jsx(
            "h2",
            {
              ref: line2Ref,
              className: "font-bebas text-4xl sm:text-6xl lg:text-7xl tracking-wider text-[#ff6b35] leading-none pl-6 sm:pl-24 lg:pl-36 opacity-0",
              children: "FOR IDEAS THAT DESERVE"
            }
          ),
          /* @__PURE__ */ jsx(
            "h3",
            {
              ref: line3Ref,
              className: "font-bebas text-4xl sm:text-6xl lg:text-7xl tracking-wider text-neutral-400 leading-none text-right pr-4 sm:pr-16 opacity-0",
              children: "TO BE REMEMBERED."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-12 gap-8 lg:gap-16 items-center pt-4 sm:pt-8 pb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-6 flex justify-center lg:justify-start", children: /* @__PURE__ */ jsxs(
            "div",
            {
              ref: portraitRef,
              onMouseEnter: () => setIsPortraitHovered(true),
              onMouseLeave: () => setIsPortraitHovered(false),
              className: "relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-t-full overflow-hidden bg-[#0a0a0a] shadow-[0_30px_75px_rgba(0,0,0,0.95)] group cursor-pointer opacity-0",
              children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    animate: {
                      opacity: isPortraitHovered ? 0.35 : 0
                    },
                    transition: { duration: 0.5 },
                    className: "absolute inset-0 bg-gradient-to-t from-brand/60 via-brand/20 to-transparent z-10 pointer-events-none"
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.img,
                  {
                    animate: {
                      filter: isPortraitHovered ? "brightness(1.12) contrast(1.08)" : "brightness(0.92) contrast(0.98)",
                      opacity: isPortraitHovered ? 1 : 0.88
                    },
                    transition: { duration: 0.5, ease: "easeOut" },
                    src: aboutPortrait,
                    alt: "Pratik Bhusal Portrait",
                    className: "w-full h-full object-cover rounded-t-full relative z-0"
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { ref: bioRef, className: "lg:col-span-6 space-y-6", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#ff6b35] tracking-widest font-semibold uppercase block opacity-0", children: "BIOGRAPHY // PRATIK BHUSAL" }),
            /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-white font-sans leading-relaxed font-normal opacity-0 max-w-xl", children: "Currently operating at the intersection of branding, typography, and raw spatial design. Building systems that do not merely inform, but establish structural memory." }),
            /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed opacity-0 max-w-xl", children: "Operating internationally. Collaborating with architectural studios, luxury fashion houses, and progressive cultural institutions seeking stark, permanent aesthetic signatures." })
          ] })
        ] })
      ]
    }
  );
}
(_p = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _p.call(globalThis, "src/components/PhilosophySection.jsx");
gsap.registerPlugin(ScrollTrigger);
function PhilosophySection() {
  const sectionRef = useRef(null);
  const lineA = useRef(null);
  const lineB = useRef(null);
  const observeRef = useRef(null);
  const questionRef = useRef(null);
  const distortRef = useRef(null);
  const refineRef = useRef(null);
  const createRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const keywords = [
        observeRef.current,
        questionRef.current,
        distortRef.current,
        refineRef.current,
        createRef.current
      ].filter(Boolean);
      if (keywords.length > 0) {
        gsap.fromTo(
          keywords,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
      if (lineA.current && lineB.current) {
        gsap.fromTo(
          [lineA.current, lineB.current],
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 1.4,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 15%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: sectionRef,
      id: "philosophy",
      className: "relative min-h-[90vh] sm:min-h-screen bg-[#050505] text-white py-10 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 border-t border-neutral-900 selection:bg-[#1e90ff] selection:text-black select-none flex flex-col justify-between overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full pb-6 border-b border-neutral-900 relative z-20", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#ff6b35] font-bold tracking-widest", children: "06" }),
          /* @__PURE__ */ jsx("span", { className: "font-bebas text-sm tracking-[0.25em] text-neutral-400 font-medium uppercase", children: "PHILOSOPHY" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none z-0 flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: lineA,
              className: "absolute w-[120%] h-[1px] bg-gradient-to-r from-[#ff6b35]/80 via-[#ff6b35] to-[#ff6b35]/20 origin-center -rotate-[16deg] opacity-0"
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: lineB,
              className: "absolute w-[120%] h-[1px] bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-800 origin-center rotate-[22deg] opacity-0"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 my-auto py-8 sm:py-16 w-full max-w-6xl mx-auto min-h-[340px] sm:min-h-[460px] flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start w-full px-4 sm:px-12", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                ref: observeRef,
                whileHover: { scale: 1.08, color: "#ffffff", textShadow: "0 0 25px rgba(30,144,255,0.7)" },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                className: "font-bebas text-6xl sm:text-8xl lg:text-9xl text-white tracking-wider leading-none -rotate-[12deg] cursor-pointer opacity-0",
                children: "OBSERVE."
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                ref: questionRef,
                whileHover: { scale: 1.08, color: "#ffffff", textShadow: "0 0 25px rgba(30,144,255,0.7)" },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                className: "font-bebas text-5xl sm:text-7xl lg:text-8xl text-neutral-400 tracking-wider leading-none -rotate-[8deg] cursor-pointer opacity-0 pt-8 sm:pt-12",
                children: "QUESTION."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-full px-2 sm:px-8 py-8 sm:py-12", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                ref: distortRef,
                whileHover: { scale: 1.1, textShadow: "0 0 30px rgba(255,107,53,0.9)" },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                className: "font-bebas text-7xl sm:text-9xl lg:text-[10rem] text-[#ff6b35] font-bold tracking-wider leading-none rotate-[14deg] cursor-pointer opacity-0 drop-shadow-[0_15px_35px_rgba(255,107,53,0.3)]",
                children: "DISTORT."
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                ref: refineRef,
                whileHover: { scale: 1.08, color: "#ffffff", textShadow: "0 0 25px rgba(30,144,255,0.7)" },
                transition: { type: "spring", stiffness: 300, damping: 20 },
                className: "font-bebas text-5xl sm:text-7xl lg:text-8xl text-neutral-300 tracking-wider leading-none -rotate-[10deg] cursor-pointer opacity-0 pt-12",
                children: "REFINE."
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full pt-6", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              ref: createRef,
              whileHover: { scale: 1.08, color: "#ffffff", textShadow: "0 0 30px rgba(30,144,255,0.85)" },
              transition: { type: "spring", stiffness: 300, damping: 20 },
              className: "font-bebas text-6xl sm:text-8xl lg:text-9xl text-white tracking-wider leading-none cursor-pointer opacity-0",
              children: "CREATE."
            }
          ) })
        ] })
      ]
    }
  );
}
(_q = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _q.call(globalThis, "src/components/ExpertiseSection.jsx");
gsap.registerPlugin(ScrollTrigger);
function ExpertiseSection() {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  rowRefs.current = [];
  const addRow = (el) => {
    if (el) rowRefs.current.push(el);
  };
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          // pin fires when section reaches top of viewport
          end: "+=100%",
          // pin for one extra viewport-height of scroll
          pin: true,
          // keep section in view while scrolling through
          scrub: 1.2,
          // slight lag for polished feel
          anticipatePin: 1
        }
      });
      const DRIFT = 14;
      rowRefs.current.forEach((row, i) => {
        const sign = i % 2 === 0 ? -1 : 1;
        const drift = DRIFT + i * 1.5;
        tl.fromTo(
          row,
          { x: 0 },
          { x: `${sign * drift}vw`, ease: "none" },
          0
          // all start together at position 0 in the timeline
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "expertise",
      ref: sectionRef,
      className: "relative bg-[#050505] text-white border-t border-neutral-900 select-none",
      style: { minHeight: "100vh", overflow: "hidden" },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative z-20 flex items-center justify-between w-full px-6 sm:px-10 lg:px-14 py-5 border-b border-neutral-900", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#ff6b35] font-bold tracking-widest", children: "07" }),
          /* @__PURE__ */ jsx("span", { className: "font-bebas text-sm tracking-[0.25em] text-neutral-400 uppercase", children: "EXPERTISE" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "absolute top-20 right-10 lg:right-14 font-mono text-[9px] sm:text-[10px] text-neutral-600 tracking-widest z-20 hidden sm:block pointer-events-none", children: "[ HOLISTIC SYSTEMS ]" }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute font-mono text-[9px] sm:text-[10px] text-neutral-600 tracking-widest z-20 hidden sm:block pointer-events-none",
            style: { top: "42%", left: "5%" },
            children: "[ COMPOSITION / GLYPHS ]"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "absolute bottom-10 right-10 lg:right-14 font-mono text-[9px] sm:text-[10px] text-neutral-600 tracking-widest z-20 hidden sm:block pointer-events-none", children: "[ VARIABLE SCREEN SCAPE ]" }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex flex-col justify-center px-4 sm:px-10 lg:px-14",
            style: { minHeight: "calc(100vh - 66px)", gap: "0.15em" },
            children: [
              /* @__PURE__ */ jsx("div", { ref: addRow, className: "will-change-transform", children: /* @__PURE__ */ jsx(
                "span",
                {
                  className: "font-bebas block leading-none tracking-wide text-neutral-500 cursor-default transition-colors duration-300 hover:text-neutral-300",
                  style: { fontSize: "clamp(3rem, 11vw, 9rem)" },
                  children: "BRANDING"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { ref: addRow, className: "will-change-transform flex items-center gap-3 sm:gap-5", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-bebas leading-none tracking-wide text-[#ff6b35] cursor-default flex-shrink-0",
                    style: { fontSize: "clamp(3rem, 11vw, 9rem)" },
                    children: "EDITORIAL"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "flex-shrink-0 overflow-hidden rounded-sm shadow-lg",
                    style: { width: "clamp(60px, 7vw, 120px)", height: "clamp(44px, 5.2vw, 88px)" },
                    children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: editorialThumb,
                        alt: "Editorial design sample",
                        className: "w-full h-full object-cover"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-bebas leading-none tracking-wide text-[#ff6b35] cursor-default flex-shrink-0",
                    style: { fontSize: "clamp(3rem, 11vw, 9rem)" },
                    children: "DESIGN"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { ref: addRow, className: "will-change-transform flex justify-end", children: /* @__PURE__ */ jsx(
                "span",
                {
                  className: "font-bebas block leading-none tracking-wide text-neutral-500 cursor-default transition-colors duration-300 hover:text-neutral-300",
                  style: { fontSize: "clamp(3rem, 11vw, 9rem)" },
                  children: "TYPOGRAPHY"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { ref: addRow, className: "will-change-transform flex items-center gap-3 sm:gap-6", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-bebas leading-none tracking-wide text-neutral-500 cursor-default flex-shrink-0 transition-colors duration-300 hover:text-neutral-300",
                    style: { fontSize: "clamp(2rem, 8.5vw, 7rem)" },
                    children: "ART DIRECTION"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 h-px bg-neutral-600 w-12 sm:w-20 lg:w-28" }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "font-bebas leading-none tracking-wide text-neutral-500 cursor-default flex-shrink-0 transition-colors duration-300 hover:text-neutral-300",
                    style: { fontSize: "clamp(2rem, 8.5vw, 7rem)" },
                    children: "PACKAGING"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { ref: addRow, className: "will-change-transform", children: /* @__PURE__ */ jsx(
                "span",
                {
                  className: "font-bebas block leading-none tracking-wide text-neutral-500 cursor-default transition-colors duration-300 hover:text-neutral-300",
                  style: { fontSize: "clamp(2rem, 8.5vw, 7rem)" },
                  children: "DIGITAL INTERFACES"
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
(_r = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _r.call(globalThis, "src/components/TestimonialsSection.jsx");
const TESTIMONIALS = [
  {
    id: 1,
    name: "Niraj Joshi",
    role: "Founder, Joshi Media",
    quote: "Pratik's visual systems transformed our digital products. His eye for typography and grid alignment is second to none.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    id: 2,
    name: "Alex Moreau",
    role: "Creative Director, Studio Moreau",
    quote: "An absolute master of editorial layouts. The branding guidelines he delivered were clear, adaptive, and visually stunning.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    id: 3,
    name: "Sophie Chen",
    role: "Marketing Lead, Lumina UK",
    quote: "We briefed Pratik for our packaging redesign and the feedback process was seamless. Our retail conversions increased significantly.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    id: 4,
    name: "Marcus Vance",
    role: "Principal Architect, Vance & Co.",
    quote: "Pratik brings architectural layouts to the web. The composition and spacing are exactly what our premium brand needed.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    id: 5,
    name: "Elena Rostova",
    role: "Product Owner, Zenith Apps",
    quote: "We worked on a dark-mode mobile interface system. His capability to balance technical constraints with rich styling was brilliant.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80"
  }
];
function TestimonialsSection({ initialTestimonials }) {
  const list = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : TESTIMONIALS;
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [clickedIdx, setClickedIdx] = useState(null);
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
  const handleRowInteraction = (index, isEnter) => {
    if (isTouchDevice) return;
    if (isEnter) {
      setHoveredIdx(index);
    } else {
      setHoveredIdx(null);
    }
  };
  const handleRowClick = (index) => {
    if (clickedIdx === index) {
      setClickedIdx(null);
    } else {
      setClickedIdx(index);
    }
  };
  const activeIndex = isTouchDevice ? clickedIdx : hoveredIdx;
  const isAnyActive = activeIndex !== null;
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "testimonials",
      className: "relative bg-[#050505] text-white py-10 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-14 border-t border-neutral-900 select-none overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full pb-4 border-b border-neutral-900 mb-10", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#ff6b35] font-bold tracking-widest", children: "08" }),
          /* @__PURE__ */ jsx("span", { className: "font-bebas text-sm tracking-[0.25em] text-neutral-400 uppercase", children: "CLIENT WORDS" })
        ] }),
        /* @__PURE__ */ jsx("dl", { className: "max-w-4xl mx-auto divide-y divide-neutral-900/60 border-b border-neutral-900/60", children: list.map((t, index) => {
          const isActive = activeIndex === index;
          const isDimmed = isAnyActive && !isActive;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "group py-5 sm:py-6 transition-all duration-300",
              style: {
                opacity: isDimmed ? 0.45 : 1
              },
              onMouseEnter: () => handleRowInteraction(index, true),
              onMouseLeave: () => handleRowInteraction(index, false),
              onClick: () => handleRowClick(index),
              children: [
                /* @__PURE__ */ jsxs(
                  "dt",
                  {
                    role: "button",
                    "aria-expanded": isActive,
                    "aria-controls": `quote-content-${t.id}`,
                    tabIndex: 0,
                    onKeyDown: (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleRowClick(index);
                      }
                    },
                    className: "flex items-center justify-between gap-4 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx(
                        "h3",
                        {
                          className: `font-bebas text-2xl sm:text-4xl tracking-wide uppercase transition-all duration-300 ${isActive ? "text-[#ff6b35] scale-[1.02]" : "text-neutral-300 group-hover:text-white"}`,
                          children: t.name
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest flex-shrink-0", children: t.role })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "dd",
                  {
                    id: `quote-content-${t.id}`,
                    className: "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    style: {
                      gridTemplateRows: isActive ? "1fr" : "0fr"
                    },
                    children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { children: isActive && /* @__PURE__ */ jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: 6 },
                        transition: { duration: 0.35, delay: 0.08 },
                        className: "flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pt-5",
                        children: [
                          /* @__PURE__ */ jsx(
                            "img",
                            {
                              src: t.avatarImage || t.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
                              alt: t.name,
                              className: "w-12 h-12 rounded-full object-cover border border-neutral-800/80 shadow-md flex-shrink-0",
                              loading: "lazy"
                            }
                          ),
                          /* @__PURE__ */ jsx("div", { className: "border-l border-[#ff6b35] pl-4 py-0.5", children: /* @__PURE__ */ jsxs("p", { className: "text-neutral-200 font-sans text-base sm:text-[17px] leading-relaxed italic", children: [
                            "“",
                            t.quote,
                            "”"
                          ] }) })
                        ]
                      }
                    ) }) })
                  }
                )
              ]
            },
            t.id
          );
        }) })
      ]
    }
  );
}
(_s = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _s.call(globalThis, "src/components/ContactSection.jsx");
gsap.registerPlugin(ScrollTrigger);
function ContactSection({ initialSettings }) {
  const settings = initialSettings && initialSettings.contactEmail ? initialSettings : { contactEmail: "pratikbhusal12345@gmail.com" };
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const badgeRef = useRef(null);
  const bottomRef = useRef(null);
  const footerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = [
        labelRef.current,
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        badgeRef.current,
        bottomRef.current,
        footerRef.current
      ].filter(Boolean);
      gsap.set(els, { opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom top",
          toggleActions: "play reverse play reverse"
        }
      });
      tl.to(els, {
        opacity: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  const socials = [
    { label: "INSTAGRAM", url: "https://www.instagram.com/pratikbhusal_/" },
    { label: "FACEBOOK", url: "https://www.facebook.com/pratikbhusal" },
    { label: "BEHANCE", url: "https://www.behance.net/pratikbhusal" },
    { label: "LINKEDIN", url: "https://www.linkedin.com/in/pratikbhusal" }
  ];
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "contact",
      ref: sectionRef,
      className: "relative min-h-screen bg-[#050505] text-white flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-4 sm:py-6 border-t border-neutral-900 select-none overflow-hidden",
      children: [
        /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
        @keyframes badge-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .badge-rotating {
          animation: badge-spin 22s linear infinite;
        }
        .badge-interactive-group:hover .badge-rotating {
          animation-duration: 13s;
        }
      ` } }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full pb-4 border-b border-neutral-900", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#ff6b35] font-bold tracking-widest", children: "09" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bebas text-sm tracking-[0.25em] text-neutral-300 uppercase", children: "CONTACT" }),
            /* @__PURE__ */ jsx("span", { className: "text-neutral-600 text-xs", children: "/" }),
            /* @__PURE__ */ jsx(
              motion.button,
              {
                whileHover: { color: "#ff6b35" },
                transition: { duration: 0.2 },
                onClick: () => {
                  const el = document.getElementById("home");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                },
                className: "font-bebas text-sm tracking-[0.25em] text-neutral-400 uppercase cursor-pointer hover:text-[#ff6b35] transition-colors",
                children: "CLOSE"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-8 sm:py-14", children: [
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-7 flex flex-col justify-center", children: [
            /* @__PURE__ */ jsx(
              "p",
              {
                ref: labelRef,
                className: "font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#ff6b35] uppercase mb-6",
                children: "LET'S CONVENE"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "space-y-0 leading-none", children: [
              /* @__PURE__ */ jsx(
                "h1",
                {
                  ref: line1Ref,
                  className: "font-bebas text-[14vw] sm:text-[12vw] lg:text-[7.5vw] xl:text-[6.8vw] leading-[0.9] tracking-wide text-white",
                  children: "LET'S MAKE"
                }
              ),
              /* @__PURE__ */ jsx(
                "h1",
                {
                  ref: line2Ref,
                  className: "font-bebas text-[14vw] sm:text-[12vw] lg:text-[7.5vw] xl:text-[6.8vw] leading-[0.9] tracking-wide text-white",
                  children: "SOMETHING"
                }
              ),
              /* @__PURE__ */ jsx(
                "h1",
                {
                  ref: line3Ref,
                  className: "font-bebas text-[14vw] sm:text-[12vw] lg:text-[7.5vw] xl:text-[6.8vw] leading-[0.9] tracking-wide text-white",
                  children: "WORTH SEEING."
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: badgeRef,
              className: "md:col-span-5 flex items-center justify-center relative min-h-[200px] sm:min-h-[280px]",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute w-[260px] sm:w-[320px] aspect-square rounded-full blur-3xl pointer-events-none",
                    style: {
                      background: "radial-gradient(circle, rgba(255,107,53,0.12) 0%, rgba(0,0,0,0) 70%)"
                    }
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.a,
                  {
                    href: `mailto:${settings.contactEmail}`,
                    whileHover: { scale: 1.06 },
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                    className: "badge-interactive-group relative w-[130px] sm:w-[170px] aspect-square rounded-full flex items-center justify-center cursor-pointer group",
                    children: [
                      /* @__PURE__ */ jsx("div", { className: "badge-rotating absolute inset-0 w-full h-full will-change-transform", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", className: "w-full h-full", children: [
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            id: "badgeCirclePath",
                            d: "M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0",
                            fill: "none"
                          }
                        ),
                        /* @__PURE__ */ jsx("text", { className: "fill-neutral-400 font-mono text-[6.1px] font-bold uppercase tracking-[0.18em]", children: /* @__PURE__ */ jsx("textPath", { href: "#badgeCirclePath", startOffset: "0%", children: "* AVAILABLE FOR WORK * LET'S TALK * GET IN TOUCH * COLLAB *" }) })
                      ] }) }),
                      /* @__PURE__ */ jsx("div", { className: "relative w-12 sm:w-16 aspect-square rounded-full border border-neutral-800/80 bg-[#0c0c0c] flex items-center justify-center shadow-lg group-hover:border-[#ff6b35]/60 transition-colors duration-300", children: /* @__PURE__ */ jsxs(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          strokeWidth: "2.5",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          className: "w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#ff6b35] transition-colors duration-300",
                          children: [
                            /* @__PURE__ */ jsx("line", { x1: "7", y1: "17", x2: "17", y2: "7" }),
                            /* @__PURE__ */ jsx("polyline", { points: "7 7 17 7 17 17" })
                          ]
                        }
                      ) })
                    ]
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: bottomRef,
            className: "flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-4 border-t border-neutral-900",
            children: [
              /* @__PURE__ */ jsxs(
                motion.a,
                {
                  href: `mailto:${settings.contactEmail}`,
                  whileHover: { color: "#ffffff" },
                  transition: { duration: 0.2 },
                  className: "font-mono text-xs sm:text-sm tracking-widest text-neutral-400 uppercase hover:text-white transition-colors cursor-pointer text-center sm:text-left",
                  children: [
                    "EMAIL:  ",
                    settings.contactEmail.toUpperCase()
                  ]
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 sm:gap-6", children: socials.map(({ label, url }, i) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
                /* @__PURE__ */ jsx(
                  motion.a,
                  {
                    href: url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    whileHover: { color: "#ff6b35" },
                    transition: { duration: 0.2 },
                    className: "font-mono text-xs sm:text-sm tracking-widest text-neutral-400 uppercase hover:text-[#ff6b35] transition-colors cursor-pointer",
                    children: label
                  }
                ),
                i < socials.length - 1 && /* @__PURE__ */ jsx("span", { className: "text-neutral-600 text-xs", children: "·" })
              ] }, label)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: footerRef,
            className: "flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 pt-6 pb-2 border-t border-neutral-900/60",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] sm:text-xs tracking-widest text-neutral-500 uppercase text-center md:text-left", children: "VISUAL DESIGN · BRANDING · EDITORIAL" }),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: "https://nirajjoshi.com.np/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "font-mono text-[11px] sm:text-xs tracking-widest uppercase text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer text-center group",
                  children: [
                    "DESIGNED & BUILT BY",
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "text-[#1e90ff] group-hover:text-[#ff6b35] transition-colors duration-300", children: "NIRAJ" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "font-mono text-[11px] sm:text-xs tracking-widest text-neutral-500 uppercase text-center md:text-right", children: "PRATIK BHUSAL © 2026. ALL RIGHTS RESERVED." })
            ]
          }
        )
      ]
    }
  );
}
(_t = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _t.call(globalThis, "src/components/AboutPage.jsx");
gsap.registerPlugin(ScrollTrigger);
function AboutPage({ initialCapabilities, initialMilestones, initialSettings }) {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const bioRef = useRef(null);
  const portraitRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const milestonesRef = useRef(null);
  const ctaRef = useRef(null);
  const ctaTitleRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(null);
  const [clickedIdx, setClickedIdx] = useState(null);
  const isTouchDevice = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
  const defaultCapabilities2 = [
    {
      name: "VISUAL BRANDING",
      desc: "Developing cohesive, scalable visual assets, logo identities, adaptive grid systems, and typographic guidelines to align brand perception."
    },
    {
      name: "EDITORIAL DESIGN",
      desc: "Configuring monographs, booklets, catalogs, and technical publication layouts using mathematical grids and fine horological typefaces."
    },
    {
      name: "ART DIRECTION",
      desc: "Guiding marketing poster designs, destination brochures, social assets, and live World Cup match campaigns from concept to production."
    },
    {
      name: "PACKAGING SYSTEMS",
      desc: "Designing sustainable, tactile cosmetic boxes, product containers, concrete vessels, and minimal logistics packaging that feel premium."
    },
    {
      name: "DIGITAL INTERFACES",
      desc: "Structuring responsive mobile layout deck shuffles, dark-mode styling systems, interactive cursor tracking states, and clean transition flows."
    }
  ];
  const defaultMilestones2 = [
    { year: "2023", title: "STUDIO INCUBATION", desc: "Started freelancing and consulting for small scale businesses on visual communication assets.", order: 1 },
    { year: "2024", title: "REGIONAL EXPANSION", desc: "Overhauled brand systems and directed marketing design strategies for medium scale ventures.", order: 2 },
    { year: "2025", title: "PRODUCT FOCUS", desc: "Pivoted to a holistic design model merging packaging structures, print publications, and digital products.", order: 3 },
    { year: "2026", title: "SUPER-APP DEPLOYMENT", desc: "Successfully designed the master visual design system and logistics assets for Pathao Nepal.", order: 4 }
  ];
  const defaultSettings2 = {
    aboutHeroText: "I MAKE THINGS WORTH SEEING.",
    aboutBio: `I am Pratik Bhusal, a graphic designer and art director focusing on raw, structural typography, functional packaging guidelines, and holistic brand systems. Design is not just decoration — it is communication engineering. I build visual systems that help brands cut through clutter, establish clear visual architecture, and communicate value instantly to their users. Based in Kathmandu, Nepal, I work with local leaders and international teams to scale brands across packaging boxes, physical publications, and responsive digital interfaces.`
  };
  const capabilities = initialCapabilities && initialCapabilities.length > 0 ? initialCapabilities : defaultCapabilities2;
  const milestones = initialMilestones && initialMilestones.length > 0 ? initialMilestones : defaultMilestones2;
  const settings = initialSettings && initialSettings.aboutBio ? initialSettings : defaultSettings2;
  const bioText = settings.aboutBio;
  const bioSentences = bioText.split(new RegExp("(?<=[.?!])\\s+"));
  const handleRowInteraction = (index, isEnter) => {
    if (isTouchDevice) return;
    setActiveIdx(isEnter ? index : null);
  };
  const handleRowClick = (index) => {
    if (clickedIdx === index) {
      setClickedIdx(null);
    } else {
      setClickedIdx(index);
    }
  };
  const activeCapabilityIndex = isTouchDevice ? clickedIdx : activeIdx;
  const isAnyActive = activeCapabilityIndex !== null;
  useEffect(() => {
    var _a2;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([titleRef.current, portraitRef.current, ctaTitleRef.current], { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", filter: "grayscale(0%)" });
      const sentences = (_a2 = bioRef.current) == null ? void 0 : _a2.querySelectorAll(".bio-sentence");
      if (sentences) gsap.set(sentences, { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: "102%" },
        {
          y: "0%",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
      gsap.fromTo(
        portraitRef.current,
        { clipPath: "inset(0 100% 0 0)", filter: "grayscale(100%)", opacity: 0.3 },
        {
          clipPath: "inset(0 0% 0 0)",
          filter: "grayscale(0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: portraitRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
      gsap.to(portraitRef.current, {
        y: "-10%",
        scrollTrigger: {
          trigger: portraitRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      const sentences = bioRef.current.querySelectorAll(".bio-sentence");
      gsap.fromTo(
        sentences,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.16,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 82%",
            end: "bottom 18%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
      const capRows = capabilitiesRef.current.querySelectorAll(".cap-row");
      capRows.forEach((row) => {
        const num = row.querySelector(".cap-num");
        const name = row.querySelector(".cap-name");
        const line = row.querySelector(".cap-line");
        const rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            end: "bottom 12%",
            toggleActions: "play reverse play reverse"
          }
        });
        rowTl.fromTo(num, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }).fromTo(name, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.65, ease: "power2.out" }, "-=0.35").fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");
      });
      const cards = milestonesRef.current.querySelectorAll(".milestone-card");
      cards.forEach((card) => {
        const line = card.querySelector(".card-progress-line");
        const year = card.querySelector(".m-year");
        const title = card.querySelector(".m-title");
        const desc = card.querySelector(".m-desc");
        if (line) {
          gsap.to(line, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 55%",
              scrub: true
            }
          });
        }
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "bottom 12%",
            toggleActions: "play reverse play reverse"
          }
        });
        cardTl.fromTo(year, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5 }).fromTo(title, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.35").fromTo(desc, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35");
      });
      gsap.fromTo(
        ctaTitleRef.current,
        { y: "102%" },
        {
          y: "0%",
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 88%",
            end: "bottom 12%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }, headerRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#050505] text-white min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-14 select-none selection:bg-[#1e90ff] selection:text-black", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "About — Pratik Bhusal | Brand & Visual Designer",
        description: "Learn about the design philosophy, milestones, and capabilities of Pratik Bhusal, a professional visual designer based in Nepal.",
        url: `${siteUrl}/about`,
        type: "website"
      }
    ),
    /* @__PURE__ */ jsx("style", { dangerouslySetInnerHTML: { __html: `
        @keyframes badge-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .badge-rotating {
          animation: badge-spin 22s linear infinite;
        }
        .badge-interactive-group:hover .badge-rotating {
          animation-duration: 13s;
        }
      ` } }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto space-y-16", children: [
      /* @__PURE__ */ jsxs("header", { ref: headerRef, className: "border-b border-neutral-900 pb-8", children: [
        /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-[#ff6b35] tracking-[0.25em] uppercase mb-3", children: "[ ABOUT ME ]" }),
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden relative py-2.5 mb-1", children: /* @__PURE__ */ jsx("h1", { ref: titleRef, className: "font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-none inline-block", children: settings.aboutHeroText }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-8 items-start", children: [
        /* @__PURE__ */ jsx("div", { ref: bioRef, className: "md:col-span-7 space-y-6 max-w-xl text-neutral-300 font-sans text-base sm:text-[17px] leading-relaxed", children: bioSentences.map((sent, idx) => {
          const isFirst = idx === 0;
          return /* @__PURE__ */ jsx(
            "p",
            {
              className: `bio-sentence ${isFirst ? "font-bold text-white text-lg" : ""}`,
              children: sent
            },
            idx
          );
        }) }),
        /* @__PURE__ */ jsx("div", { className: "md:col-span-5 relative overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[4/5] shadow-lg", children: /* @__PURE__ */ jsx(
          "img",
          {
            ref: portraitRef,
            src: aboutPortrait,
            alt: "Pratik Bhusal Portrait",
            className: "w-full h-full object-cover transition-all duration-300",
            style: { willChange: "transform, clip-path, filter" },
            loading: "eager"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("section", { ref: capabilitiesRef, className: "space-y-6 pt-10 border-t border-neutral-900", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase block mb-4", children: "[ CAPABILITIES ]" }),
        /* @__PURE__ */ jsx("dl", { className: "flex flex-col border-b border-neutral-900/60 divide-y divide-neutral-900/60", children: capabilities.map((skill, index) => {
          const isActive = activeCapabilityIndex === index;
          const isDimmed = isAnyActive && !isActive;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              className: "cap-row group py-5 sm:py-6 transition-all duration-300 relative",
              style: {
                opacity: isDimmed ? 0.45 : 1
              },
              onMouseEnter: () => handleRowInteraction(index, true),
              onMouseLeave: () => handleRowInteraction(index, false),
              onClick: () => handleRowClick(index),
              children: [
                /* @__PURE__ */ jsxs(
                  "dt",
                  {
                    role: "button",
                    "aria-expanded": isActive,
                    tabIndex: 0,
                    onKeyDown: (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleRowClick(index);
                      }
                    },
                    className: "flex items-center justify-between gap-4 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "cap-name font-bebas text-3xl sm:text-5xl text-neutral-500 group-hover:text-white transition-colors duration-300", children: skill.name }),
                      /* @__PURE__ */ jsx("span", { className: "cap-num font-mono text-xs text-[#ff6b35] font-bold", children: (index + 1).toString().padStart(2, "0") })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "dd",
                  {
                    className: "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    style: {
                      gridTemplateRows: isActive ? "1fr" : "0fr"
                    },
                    children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { children: isActive && /* @__PURE__ */ jsx(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 8 },
                        animate: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: 4 },
                        transition: { duration: 0.35, delay: 0.08 },
                        className: "pt-4 pb-1 text-sm sm:text-base font-sans text-neutral-400 leading-relaxed border-l-2 border-[#ff6b35] pl-4",
                        children: skill.desc
                      }
                    ) }) })
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "cap-line absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-900/60 origin-left", style: { scaleX: 0 } })
              ]
            },
            index
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { ref: milestonesRef, className: "space-y-8 pt-10 border-t border-neutral-900 relative", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase block", children: "[ MILESTONES & JOURNEY ]" }),
        /* @__PURE__ */ jsx("div", { className: "relative py-2", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10", children: milestones.map((m) => /* @__PURE__ */ jsxs("div", { className: "milestone-card space-y-2 relative pl-6 py-2", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-[3px] top-1 bottom-1 w-[1.5px] bg-neutral-900/60 overflow-hidden", children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "card-progress-line w-full bg-[#1e90ff] origin-top h-0 shadow-[0_0_8px_rgba(30,144,255,0.7)]",
              style: { willChange: "height" }
            }
          ) }),
          /* @__PURE__ */ jsx("span", { className: "m-year font-mono text-xs text-[#1e90ff] font-bold block", children: m.year }),
          /* @__PURE__ */ jsx("h4", { className: "m-title font-bebas text-xl text-white tracking-wide block", children: m.title }),
          /* @__PURE__ */ jsx("p", { className: "m-desc text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed block", children: m.desc })
        ] }, m.year)) }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { ref: ctaRef, className: "pt-16 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-12 pb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden relative py-3 max-w-xl", children: /* @__PURE__ */ jsx("h3", { ref: ctaTitleRef, className: "font-bebas text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide leading-tight inline-block", children: "HAVE A PROJECT IN MIND? LET'S DEFINE IT." }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center relative min-h-[160px] w-full md:w-auto pr-0 md:pr-12", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute w-[200px] aspect-square rounded-full blur-3xl pointer-events-none",
              style: {
                background: "radial-gradient(circle, rgba(255,107,53,0.1) 0%, rgba(0,0,0,0) 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.a,
            {
              href: `mailto:${settings.contactEmail || "pratikbhusal12345@gmail.com"}`,
              whileHover: { scale: 1.06 },
              transition: { type: "spring", stiffness: 300, damping: 20 },
              className: "badge-interactive-group relative w-[130px] sm:w-[150px] aspect-square rounded-full flex items-center justify-center cursor-pointer group",
              children: [
                /* @__PURE__ */ jsx("div", { className: "badge-rotating absolute inset-0 w-full h-full will-change-transform", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", className: "w-full h-full", children: [
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      id: "badgeCirclePathAbout",
                      d: "M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0",
                      fill: "none"
                    }
                  ),
                  /* @__PURE__ */ jsx("text", { className: "fill-neutral-400 font-mono text-[6.1px] font-bold uppercase tracking-[0.18em]", children: /* @__PURE__ */ jsx("textPath", { href: "#badgeCirclePathAbout", startOffset: "0%", children: "* AVAILABLE FOR WORK * LET'S TALK * GET IN TOUCH * COLLAB *" }) })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "relative w-12 sm:w-14 aspect-square rounded-full border border-neutral-800/80 bg-[#0c0c0c] flex items-center justify-center shadow-lg group-hover:border-[#ff6b35]/60 transition-colors duration-300", children: /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    className: "w-5 h-5 text-white group-hover:text-[#ff6b35] transition-colors duration-300",
                    children: [
                      /* @__PURE__ */ jsx("line", { x1: "7", y1: "17", x2: "17", y2: "7" }),
                      /* @__PURE__ */ jsx("polyline", { points: "7 7 17 7 17 17" })
                    ]
                  }
                ) })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
(_u = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _u.call(globalThis, "src/components/WorksListing.jsx");
gsap.registerPlugin(ScrollTrigger);
function WorksListing({ onNavigate, initialWorks }) {
  const works = initialWorks && initialWorks.length > 0 ? initialWorks : worksData;
  const [selectedCat, setSelectedCat] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam) {
        const cat = catParam.toLowerCase();
        if (cat === "branding") return "Branding";
        if (cat === "editorial") return "Editorial";
        if (cat === "digital") return "Digital";
        if (cat === "packaging") return "Packaging";
      }
    }
    return "All";
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];
  const categories = ["All", "Branding", "Editorial", "Digital", "Packaging"];
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);
  const filteredWorks = works.filter((work) => {
    if (selectedCat === "All") return true;
    if (selectedCat === "Branding") return work.category.includes("BRAND") || work.category.includes("REBRAND");
    if (selectedCat === "Editorial") return work.category.includes("EDITORIAL") || work.category.includes("PUBLISH");
    if (selectedCat === "Digital") return work.category.includes("SOCIAL") || work.category.includes("CAMPAIGN");
    if (selectedCat === "Packaging") return work.category.includes("PACKAGING");
    return true;
  });
  useEffect(() => {
    const targets = cardsRef.current.filter(Boolean);
    if (targets.length === 0) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(targets, { opacity: 0, y: 30 });
    const triggers = [];
    targets.forEach((card) => {
      const t = ScrollTrigger.create({
        trigger: card,
        start: "top 90%",
        onEnter: () => {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" });
        },
        onLeave: () => {
          gsap.to(card, { opacity: 0, y: -20, duration: 0.6, ease: "power2.in" });
        },
        onEnterBack: () => {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" });
        },
        onLeaveBack: () => {
          gsap.to(card, { opacity: 0, y: 30, duration: 0.6, ease: "power2.in" });
        }
      });
      triggers.push(t);
    });
    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [selectedCat]);
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#050505] text-white min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-14 select-none selection:bg-[#1e90ff] selection:text-black", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Works & Case Studies — Pratik Bhusal",
        description: "Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium minimal packaging case studies.",
        url: `${siteUrl}/works`,
        type: "website"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxs("header", { className: "border-b border-neutral-900 pb-8 mb-10", children: [
        /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-[#ff6b35] tracking-[0.25em] uppercase mb-3", children: "[ PORTFOLIO / CASE STUDIES ]" }),
        /* @__PURE__ */ jsx("h1", { className: "font-bebas text-6xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-none", children: "WORKS" })
      ] }),
      /* @__PURE__ */ jsxs("div", { ref: dropdownRef, className: "relative w-full max-w-[260px] mb-12 z-30", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-2.5", children: "[ FILTER CATEGORY ]" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsOpen(!isOpen),
            className: "w-full flex items-center justify-between px-4 py-3 rounded-lg bg-[#0c0c0c] border border-neutral-800/80 text-left font-mono text-xs text-neutral-300 hover:text-white hover:border-neutral-700 transition-all cursor-pointer shadow-lg",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold tracking-wider", children: selectedCat.toUpperCase() }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: `w-3.5 h-3.5 text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : ""}`,
                  children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
          motion.ul,
          {
            initial: { opacity: 0, y: -8, scale: 0.98 },
            animate: { opacity: 1, y: 4, scale: 1 },
            exit: { opacity: 0, y: -8, scale: 0.98 },
            transition: { duration: 0.18, ease: "easeOut" },
            className: "absolute left-0 right-0 rounded-lg bg-[#0e0e0e] border border-neutral-800/80 shadow-[0_15px_40px_rgba(0,0,0,0.95)] overflow-hidden",
            children: categories.map((cat) => {
              const isSelected = selectedCat === cat;
              return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setSelectedCat(cat);
                    setIsOpen(false);
                  },
                  className: `w-full text-left px-4 py-3 font-mono text-xs tracking-wider transition-all cursor-pointer ${isSelected ? "bg-[#1e90ff] text-black font-bold border-l-4 border-black" : "text-neutral-400 hover:bg-neutral-900/50 hover:text-white"}`,
                  children: cat.toUpperCase()
                }
              ) }, cat);
            })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12", children: filteredWorks.map((work) => /* @__PURE__ */ jsxs(
        "article",
        {
          ref: addToRefs,
          className: "group cursor-pointer flex flex-col space-y-4 border-b border-neutral-900/50 pb-8",
          onClick: () => onNavigate(`/works/${work.slug}`),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/10] relative", children: [
              /* @__PURE__ */ jsx(
                motion.img,
                {
                  src: work.image,
                  alt: `${work.title} mockup`,
                  className: "w-full h-full object-cover",
                  whileHover: { scale: 1.03 },
                  transition: { type: "spring", stiffness: 300, damping: 24 },
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono text-[#ff6b35] tracking-widest uppercase mb-1", children: work.category }),
                /* @__PURE__ */ jsxs("span", { className: "text-white text-xs font-mono", children: [
                  "YEAR: ",
                  work.year
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-[#ff6b35] tracking-widest uppercase", children: work.client.toUpperCase() }),
              /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-neutral-500 font-bold", children: work.year })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "font-bebas text-2xl sm:text-3xl text-white group-hover:text-[#1e90ff] transition-colors leading-snug tracking-wide", children: work.title })
          ]
        },
        work.slug
      )) })
    ] })
  ] });
}
(_v = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _v.call(globalThis, "src/components/WorkPost.jsx");
gsap.registerPlugin(ScrollTrigger);
function WorkPost({ slug, onNavigate, initialWorks }) {
  const works = initialWorks && initialWorks.length > 0 ? initialWorks : worksData;
  const work = works.find((w) => w.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const heroRef = useRef(null);
  const bgLettersRef = useRef(null);
  const metaLeftRef = useRef(null);
  const metaRightRef = useRef(null);
  const eyebrowRef = useRef(null);
  const imageFrameRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const bodyContainerRef = useRef(null);
  const progressRailRef = useRef(null);
  const sectionsRef = useRef([]);
  sectionsRef.current = [];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setLightboxIndex(null);
  }, [slug]);
  useEffect(() => {
    if (!work) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([bgLettersRef.current, metaLeftRef.current, metaRightRef.current, eyebrowRef.current, imageFrameRef.current], { opacity: 1 });
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], { y: 0, opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(bgLettersRef.current, { opacity: 0, scale: 0.94 });
      gsap.set([metaLeftRef.current, metaRightRef.current, eyebrowRef.current], { opacity: 0, y: 15 });
      gsap.set([titleLine1Ref.current, titleLine2Ref.current], { y: "102%", opacity: 1 });
      gsap.set(imageFrameRef.current, { opacity: 0, scale: 0.94 });
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(bgLettersRef.current, {
        opacity: 0.08,
        scale: 1,
        duration: 1.1,
        ease: "power2.out"
      }).to([metaLeftRef.current, metaRightRef.current, eyebrowRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.7").to([titleLine1Ref.current, titleLine2Ref.current].filter(Boolean), {
        y: "0%",
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out"
      }, "-=0.45").to(imageFrameRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.75,
        ease: "power2.out"
      }, "-=0.55");
      gsap.to(bgLettersRef.current, {
        y: "-12%",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      gsap.to(imageFrameRef.current, {
        y: "-5%",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      if (progressRailRef.current && bodyContainerRef.current) {
        gsap.to(progressRailRef.current, {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: bodyContainerRef.current,
            start: "top 35%",
            end: "bottom 65%",
            scrub: true
          }
        });
      }
      const activeSections = sectionsRef.current.filter(Boolean);
      activeSections.forEach((sec, idx) => {
        const title = sec.querySelector(".section-title");
        const line = sec.querySelector(".section-line");
        const sentences = sec.querySelectorAll(".sec-sentence");
        const sweeps = sec.querySelectorAll(".highlight-sweep");
        ScrollTrigger.create({
          trigger: sec,
          start: "top 40%",
          end: "bottom 40%",
          onToggle: (self) => {
            const dot = sec.querySelector(".section-dot");
            if (dot) {
              if (self.isActive) {
                dot.classList.add("bg-[#1e90ff]", "scale-125");
                dot.classList.remove("bg-neutral-800");
              } else {
                dot.classList.add("bg-neutral-800");
                dot.classList.remove("bg-[#1e90ff]", "scale-125");
              }
            }
          }
        });
        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true
          }
        });
        if (title) {
          revealTl.fromTo(
            title,
            { y: "102%" },
            { y: "0%", duration: 0.95, ease: "power3.out" }
          );
        }
        if (line) {
          revealTl.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.85, ease: "power2.out" },
            "-=0.55"
          );
        }
        if (sentences.length > 0) {
          revealTl.fromTo(
            sentences,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              stagger: 0.16,
              ease: "power2.out",
              onComplete: () => {
                if (sweeps.length > 0) {
                  gsap.to(sweeps, {
                    scaleX: 1,
                    duration: 0.75,
                    stagger: 0.15,
                    ease: "power2.out"
                  });
                }
              }
            },
            "-=0.5"
          );
        }
      });
    }, heroRef);
    return () => ctx.revert();
  }, [slug, work]);
  useEffect(() => {
    if (lightboxIndex === null || !(work == null ? void 0 : work.gallery)) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % work.gallery.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + work.gallery.length) % work.gallery.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, work]);
  const minSwipeDistance = 50;
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || !(work == null ? void 0 : work.gallery)) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setLightboxIndex((prev) => (prev + 1) % work.gallery.length);
    } else if (isRightSwipe) {
      setLightboxIndex((prev) => (prev - 1 + work.gallery.length) % work.gallery.length);
    }
  };
  const handleMouseMove = (e) => {
    if (!imageWrapperRef.current || window.matchMedia("(hover: none)").matches) return;
    const card = imageWrapperRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rX = -(y / (rect.height / 2)) * 5;
    const rY = x / (rect.width / 2) * 5;
    gsap.to(card, {
      rotateX: rX,
      rotateY: rY,
      transformPerspective: 800,
      ease: "power1.out",
      duration: 0.35,
      overwrite: "auto"
    });
  };
  const handleMouseLeave = () => {
    if (!imageWrapperRef.current) return;
    gsap.to(imageWrapperRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.5,
      overwrite: "auto"
    });
  };
  if (!work) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-[#050505] text-white min-h-screen flex flex-col items-center justify-center px-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-bebas text-6xl text-white tracking-widest mb-4", children: "404" }),
      /* @__PURE__ */ jsx("p", { className: "text-neutral-400 font-mono text-sm uppercase tracking-wider mb-8", children: "Project Not Found" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onNavigate("/works"),
          className: "px-6 py-2.5 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer",
          children: "BACK TO WORKS"
        }
      )
    ] });
  }
  const currentIndex = works.findIndex((w) => w.slug === slug);
  const nextProject = works[(currentIndex + 1) % works.length];
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const currentUrl = `${siteUrl}/works/${work.slug}`;
  let categoryUrl = "/works";
  if (work.category.includes("BRAND") || work.category.includes("REBRAND")) categoryUrl = "/works?category=branding";
  else if (work.category.includes("EDITORIAL") || work.category.includes("PUBLISH")) categoryUrl = "/works?category=editorial";
  else if (work.category.includes("SOCIAL") || work.category.includes("CAMPAIGN")) categoryUrl = "/works?category=digital";
  else if (work.category.includes("PACKAGING")) categoryUrl = "/works?category=packaging";
  const taglineWords = work.tagline ? work.tagline.split(" ") : ["THE", "PROJECT", "SHOWCASE."];
  const lineCount = Math.ceil(taglineWords.length / 2);
  const line1Text = taglineWords.slice(0, lineCount).join(" ");
  const line2Text = taglineWords.slice(lineCount).join(" ");
  const renderSentenceText = (text, highlights) => {
    if (!highlights || highlights.length === 0) return text;
    const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length);
    const escaped = sortedHighlights.map((h) => h.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
    const regex = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) => {
      const isMatch = sortedHighlights.some((h) => h.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return /* @__PURE__ */ jsxs("span", { className: "relative inline-block px-1.5 py-0.5 mx-0.5 text-white font-semibold rounded overflow-hidden select-none", children: [
          /* @__PURE__ */ jsx("span", { className: "highlight-sweep absolute inset-0 bg-[#ff6b35] origin-left scale-x-0", style: { willChange: "transform" } }),
          /* @__PURE__ */ jsx("span", { className: "relative z-10", children: part })
        ] }, index);
      }
      return part;
    });
  };
  const getSentences = (pText) => {
    return pText.split(new RegExp("(?<=[.?!])\\s+"));
  };
  const addSectionToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };
  return /* @__PURE__ */ jsxs("article", { className: "relative bg-[#050505] text-white min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-14 selection:bg-[#1e90ff] selection:text-black", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: `${work.title} — Case Study`,
        description: work.subtitle,
        image: work.image,
        type: "article",
        url: currentUrl
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => onNavigate("/works"),
        className: "absolute left-6 top-[72px] sm:left-10 lg:left-14 group flex items-center gap-2 text-[13px] font-mono font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer z-20",
        children: [
          /* @__PURE__ */ jsx("span", { className: "group-hover:-translate-x-1 transition-transform text-sm", children: "←" }),
          "BACK TO WORKS"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto space-y-16", children: [
      /* @__PURE__ */ jsxs(
        "section",
        {
          ref: heroRef,
          className: "relative min-h-[50vh] flex flex-col justify-center py-8 border-b border-neutral-900 overflow-hidden",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                ref: bgLettersRef,
                className: "absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-8",
                style: { willChange: "transform, opacity" },
                children: /* @__PURE__ */ jsx("span", { className: "font-bebas text-[35vw] text-neutral-800/20 tracking-tighter uppercase leading-none select-none", children: work.bgWord || work.client.split(" ")[0] })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-center justify-between w-full pb-6 border-b border-neutral-900/50 mb-10", children: [
              /* @__PURE__ */ jsx("span", { ref: metaLeftRef, className: "font-bebas text-2xl text-[#ff6b35] tracking-widest block font-bold", children: work.index }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  ref: metaRightRef,
                  href: categoryUrl,
                  className: "font-mono text-xs text-neutral-400 hover:text-[#1e90ff] tracking-[0.2em] uppercase transition-colors",
                  children: work.tag || "CASE STUDY"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center", children: [
              /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 space-y-6", children: [
                /* @__PURE__ */ jsxs(
                  "p",
                  {
                    ref: eyebrowRef,
                    className: "font-mono text-[10px] sm:text-xs text-[#ff6b35] tracking-[0.2em] uppercase",
                    children: [
                      work.index,
                      " — ",
                      work.category
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("h1", { className: "font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-none", children: [
                  /* @__PURE__ */ jsx("span", { className: "block overflow-hidden relative h-[1.1em]", children: /* @__PURE__ */ jsx("span", { ref: titleLine1Ref, className: "inline-block origin-left", children: line1Text }) }),
                  /* @__PURE__ */ jsx("span", { className: "block overflow-hidden relative h-[1.1em] mt-2", children: /* @__PURE__ */ jsx("span", { ref: titleLine2Ref, className: "inline-block origin-left text-neutral-400/90", children: line2Text }) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { ref: imageFrameRef, className: "lg:col-span-5 flex justify-center lg:justify-end", children: /* @__PURE__ */ jsx(
                "div",
                {
                  ref: imageWrapperRef,
                  onMouseMove: handleMouseMove,
                  onMouseLeave: handleMouseLeave,
                  className: "relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_25px_65px_rgba(0,0,0,0.85)] border border-neutral-850/80 cursor-pointer",
                  style: { transformStyle: "preserve-3d", willChange: "transform" },
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: work.image,
                      alt: `${work.title} presentation`,
                      className: "w-full h-full object-cover rounded-2xl pointer-events-none select-none",
                      style: { transform: "translateZ(20px)" }
                    }
                  )
                }
              ) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("header", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b border-neutral-900 text-xs font-mono", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-neutral-500 block uppercase", children: "[ CLIENT ]" }),
          /* @__PURE__ */ jsx("span", { className: "text-white font-bold block text-[13px]", children: work.client })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-neutral-500 block uppercase", children: "[ YEAR ]" }),
          /* @__PURE__ */ jsx("span", { className: "text-white font-bold block text-[13px]", children: work.year })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx("span", { className: "text-neutral-500 block uppercase", children: "[ ROLE / SERVICES ]" }),
          /* @__PURE__ */ jsx("span", { className: "text-white font-bold block text-[13px] leading-relaxed", children: work.services.join(", ") })
        ] })
      ] }) }),
      work.sections && work.sections.length > 0 && /* @__PURE__ */ jsxs("div", { ref: bodyContainerRef, className: "relative pl-0 sm:pl-16 md:pl-20 py-8", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-[2px] top-4 bottom-4 w-[1px] bg-neutral-900/60 overflow-hidden hidden sm:block", children: /* @__PURE__ */ jsx(
          "div",
          {
            ref: progressRailRef,
            className: "w-full bg-[#1e90ff] origin-top h-0 shadow-[0_0_8px_rgba(30,144,255,0.7)]",
            style: { willChange: "height" }
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "space-y-16 sm:space-y-24", children: work.sections.map((sec, index) => /* @__PURE__ */ jsxs(
          "section",
          {
            ref: addSectionToRefs,
            className: "relative space-y-4 max-w-3xl",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute left-[-24px] top-[14px] w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-850 flex items-center justify-center z-10 hidden sm:flex", children: /* @__PURE__ */ jsx("div", { className: "section-dot w-1.5 h-1.5 rounded-full bg-neutral-800 transition-all duration-300" }) }),
              /* @__PURE__ */ jsx("div", { className: "overflow-hidden mb-1", children: /* @__PURE__ */ jsx("h2", { className: "section-title font-bebas text-2xl sm:text-3xl text-white tracking-wider leading-none", children: sec.heading }) }),
              /* @__PURE__ */ jsx("div", { className: "section-line w-full h-[1px] bg-neutral-900 origin-left" }),
              /* @__PURE__ */ jsx("div", { className: "pt-2 space-y-5 font-sans text-neutral-300 text-base sm:text-[17px] leading-relaxed", children: sec.paragraphs.map((p, pIdx) => {
                const sentences = getSentences(p.text);
                return /* @__PURE__ */ jsx("p", { className: "overflow-hidden flex flex-wrap gap-x-1.5", children: sentences.map((sent, sentIdx) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "sec-sentence inline-block transition-all duration-500 opacity-0 transform translate-y-[12px]",
                    children: renderSentenceText(sent, p.highlights)
                  },
                  sentIdx
                )) }, pIdx);
              }) })
            ]
          },
          index
        )) })
      ] }),
      work.gallery && work.gallery.length > 0 && /* @__PURE__ */ jsxs("section", { className: "space-y-8 mt-16 pt-10 border-t border-neutral-900", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase", children: "[ GALLERY & SPECIFICATIONS ]" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6", children: work.gallery.map((item, idx) => /* @__PURE__ */ jsx(
          "figure",
          {
            onClick: () => setLightboxIndex(idx),
            className: "group cursor-zoom-in relative",
            children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/10] relative", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.url,
                  alt: item.caption,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-103",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" })
            ] })
          },
          idx
        )) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "mt-20 pt-12 border-t border-neutral-900 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 text-left", children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-neutral-500 tracking-widest uppercase", children: "[ CURRENT LAYOUT INDEX ]" }),
          /* @__PURE__ */ jsxs("span", { className: "font-bebas text-lg text-white block", children: [
            work.index,
            " / ",
            works.length.toString().padStart(2, "0")
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => onNavigate(`/works/${nextProject.slug}`),
            className: "group flex flex-col items-end gap-1.5 cursor-pointer text-right",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-[#ff6b35] tracking-widest uppercase", children: "NEXT PROJECT →" }),
              /* @__PURE__ */ jsx("span", { className: "font-bebas text-2xl sm:text-3xl text-neutral-300 group-hover:text-white transition-colors tracking-wide leading-none uppercase", children: nextProject.title })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: lightboxIndex !== null && work.gallery && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.25 },
        className: "fixed inset-0 z-[100] bg-black/96 backdrop-blur-[8px] flex flex-col items-center justify-center",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 z-0 cursor-zoom-out",
              onClick: () => setLightboxIndex(null)
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-6 left-6 right-6 z-10 flex items-center justify-between pointer-events-none", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs text-neutral-400 font-bold uppercase select-none", children: [
              "VIEW: ",
              (lightboxIndex + 1).toString().padStart(2, "0"),
              " / ",
              work.gallery.length.toString().padStart(2, "0")
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setLightboxIndex(null),
                className: "w-10 h-10 rounded-full bg-neutral-900/60 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors pointer-events-auto cursor-pointer",
                "aria-label": "Close lightbox",
                children: "✕"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 w-full max-w-[95vw] flex items-center justify-between px-2 sm:px-6", children: [
            work.gallery.length > 1 && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setLightboxIndex((prev) => (prev - 1 + work.gallery.length) % work.gallery.length),
                className: "w-11 h-11 rounded-full bg-neutral-900/75 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer select-none",
                "aria-label": "Previous slide",
                children: "←"
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                onTouchStart: handleTouchStart,
                onTouchMove: handleTouchMove,
                onTouchEnd: handleTouchEnd,
                className: "flex-1 flex flex-col items-center max-w-[88vw] sm:max-w-[80vw] relative cursor-grab active:cursor-grabbing",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "relative w-full aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsx(
                    motion.img,
                    {
                      src: work.gallery[lightboxIndex].url,
                      alt: "Enlarged gallery showcase",
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      exit: { opacity: 0 },
                      transition: { duration: 0.28, ease: "easeInOut" },
                      className: "max-h-[72vh] sm:max-h-[76vh] object-contain rounded-lg border border-neutral-850 shadow-[0_30px_70px_rgba(0,0,0,0.98)] select-none pointer-events-none"
                    },
                    lightboxIndex
                  ) }) }),
                  work.gallery.length > 1 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-2.5 mt-6 pointer-events-auto", children: work.gallery.map((_, idx) => {
                    const isActive = lightboxIndex === idx;
                    return /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setLightboxIndex(idx),
                        className: `h-2 rounded-full transition-all duration-300 cursor-pointer ${isActive ? "w-6 bg-[#1e90ff] shadow-[0_0_8px_rgba(30,144,255,0.8)]" : "w-2 bg-neutral-700 hover:bg-neutral-500"}`,
                        "aria-label": `Go to slide ${idx + 1}`
                      },
                      idx
                    );
                  }) })
                ]
              }
            ),
            work.gallery.length > 1 && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setLightboxIndex((prev) => (prev + 1) % work.gallery.length),
                className: "w-11 h-11 rounded-full bg-neutral-900/75 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer select-none",
                "aria-label": "Next slide",
                children: "→"
              }
            )
          ] }),
          work.gallery.length > 1 && /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 z-10 pointer-events-none select-none", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-[9px] text-neutral-500 tracking-[0.2em] uppercase", children: "USE ← / → ARROWS TO SWITCH · ESC TO CLOSE" }) })
        ]
      }
    ) })
  ] });
}
(_w = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _w.call(globalThis, "src/components/BlogListing.jsx");
function BlogListing({ onNavigate, initialBlogs }) {
  const blogs = initialBlogs && initialBlogs.length > 0 ? initialBlogs : blogPosts;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);
  const cardsRef = useRef([]);
  cardsRef.current = [];
  const categories = ["All", "Design", "Branding", "Case Studies"];
  const filteredPosts = blogs.filter(
    (post) => selectedCategory === "All" || post.category === selectedCategory
  );
  useEffect(() => {
    const targets = cardsRef.current.filter(Boolean);
    if (targets.length === 0) return;
    gsap.fromTo(
      targets,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        overwrite: "auto"
      }
    );
  }, [selectedCategory, visibleCount]);
  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1, visibleCount);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#050505] text-white min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-14 select-none selection:bg-[#1e90ff] selection:text-black", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Journal & Insights — Pratik Bhusal",
        description: "Read articles and deep-dives on digital design strategy, branding systems, visual scaling systems, and minimal typography.",
        url: `${siteUrl}/blog`,
        type: "website"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxs("header", { className: "border-b border-neutral-900 pb-8 mb-10", children: [
        /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-[#ff6b35] tracking-[0.25em] uppercase mb-3", children: "[ INSIGHTS / WRITING ]" }),
        /* @__PURE__ */ jsx("h1", { className: "font-bebas text-6xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-none", children: "JOURNAL" })
      ] }),
      featuredPost && /* @__PURE__ */ jsxs(
        "article",
        {
          ref: addToRefs,
          className: "group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-neutral-900 pb-12 mb-12",
          onClick: () => onNavigate(`/blog/${featuredPost.slug}`),
          children: [
            /* @__PURE__ */ jsx("div", { className: "lg:col-span-7 overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/9]", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: featuredPost.featuredImage,
                alt: featuredPost.imageAlt,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-103",
                loading: "eager",
                fetchpriority: "high"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 flex flex-col justify-center space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs font-mono text-[#ff6b35] font-semibold tracking-wider", children: [
                /* @__PURE__ */ jsx("span", { children: featuredPost.category.toUpperCase() }),
                /* @__PURE__ */ jsx("span", { children: "·" }),
                /* @__PURE__ */ jsx("span", { className: "text-neutral-500", children: featuredPost.readTime })
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "font-bebas text-3xl sm:text-4xl lg:text-5xl text-white group-hover:text-[#1e90ff] transition-colors leading-none tracking-wide", children: featuredPost.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-400 font-sans leading-relaxed", children: featuredPost.excerpt }),
              /* @__PURE__ */ jsx("time", { className: "text-xs font-mono text-neutral-500", dateTime: featuredPost.publishDate, children: new Date(featuredPost.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              }) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("nav", { className: "flex flex-wrap gap-2.5 mb-10", "aria-label": "Blog categories", children: categories.map((cat) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setSelectedCategory(cat);
            setVisibleCount(3);
          },
          className: `px-5 py-2 rounded-full font-mono text-xs tracking-wider transition-all cursor-pointer ${selectedCategory === cat ? "bg-[#1e90ff] text-black font-bold shadow-[0_0_12px_rgba(30,144,255,0.45)]" : "bg-neutral-900/60 border border-neutral-800/60 text-neutral-400 hover:text-white hover:border-neutral-700"}`,
          children: cat.toUpperCase()
        },
        cat
      )) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12", children: gridPosts.map((post) => /* @__PURE__ */ jsxs(
        "article",
        {
          ref: addToRefs,
          className: "group cursor-pointer flex flex-col space-y-4 border-b border-neutral-900/50 pb-8",
          onClick: () => onNavigate(`/blog/${post.slug}`),
          children: [
            /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/10]", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: post.featuredImage,
                alt: post.imageAlt,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-103",
                loading: "lazy"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs font-mono text-[#ff6b35] font-semibold tracking-wider", children: [
              /* @__PURE__ */ jsx("span", { children: post.category.toUpperCase() }),
              /* @__PURE__ */ jsx("span", { children: "·" }),
              /* @__PURE__ */ jsx("span", { className: "text-neutral-500", children: post.readTime })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "font-bebas text-2xl sm:text-3xl text-white group-hover:text-[#1e90ff] transition-colors leading-snug tracking-wide", children: post.title }),
            /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed", children: post.excerpt }),
            /* @__PURE__ */ jsx("time", { className: "text-xs font-mono text-neutral-500", dateTime: post.publishDate, children: new Date(post.publishDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            }) })
          ]
        },
        post.slug
      )) }),
      filteredPosts.length > visibleCount && /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-16", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleLoadMore,
          className: "group flex items-center gap-3 border border-neutral-800 hover:border-[#1e90ff]/40 px-6 py-3 rounded-full text-xs font-mono tracking-widest text-neutral-400 hover:text-white transition-all bg-[#0a0a0a] cursor-pointer shadow-lg",
          children: [
            "LOAD MORE INSIGHTS",
            /* @__PURE__ */ jsx("span", { className: "w-5 h-5 rounded-full bg-[#1e90ff] flex items-center justify-center text-black group-hover:bg-[#ff6b35] transition-colors duration-300", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", className: "text-white", children: [
              /* @__PURE__ */ jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
              /* @__PURE__ */ jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
            ] }) })
          ]
        }
      ) })
    ] })
  ] });
}
(_x = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _x.call(globalThis, "src/components/BlogPost.jsx");
function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
}
function extractHeaders(content) {
  const lines = content.split("\n");
  const headers = [];
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ")) {
      headers.push({ level: 2, text: trimmed.substring(3), id: slugify(trimmed.substring(3)) });
    } else if (trimmed.startsWith("### ")) {
      headers.push({ level: 3, text: trimmed.substring(4), id: slugify(trimmed.substring(4)) });
    }
  });
  return headers;
}
function renderMarkdownContent(content) {
  const lines = content.split("\n");
  const elements = [];
  let inList = false;
  let listItems = [];
  const pushList = () => {
    if (listItems.length > 0) {
      elements.push(
        /* @__PURE__ */ jsx("ul", { className: "list-disc pl-5 my-6 space-y-2 text-neutral-300 leading-relaxed font-sans text-base sm:text-lg", children: listItems.map((item, idx) => /* @__PURE__ */ jsx("li", { children: item }, idx)) }, `list-${elements.length}`)
      );
      listItems = [];
      inList = false;
    }
  };
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      inList = true;
      listItems.push(trimmed.substring(2));
      return;
    } else {
      if (inList) pushList();
    }
    if (trimmed.startsWith("### ")) {
      elements.push(
        /* @__PURE__ */ jsx("h3", { id: slugify(trimmed.substring(4)), className: "font-bebas text-2xl sm:text-3xl text-white mt-8 mb-4 tracking-wide scroll-mt-24", children: trimmed.substring(4) }, index)
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        /* @__PURE__ */ jsx("h2", { id: slugify(trimmed.substring(3)), className: "font-bebas text-3xl sm:text-4xl text-white mt-10 mb-4 tracking-wide border-b border-neutral-900 pb-2 scroll-mt-24", children: trimmed.substring(3) }, index)
      );
    } else if (trimmed.startsWith("> ")) {
      elements.push(
        /* @__PURE__ */ jsxs("blockquote", { className: "border-l-4 border-[#ff6b35] pl-6 my-8 py-2 text-xl sm:text-2xl text-neutral-200 italic font-serif leading-relaxed", children: [
          "“",
          trimmed.substring(2).replace(/"/g, ""),
          "”"
        ] }, index)
      );
    } else if (trimmed === "---") {
      elements.push(/* @__PURE__ */ jsx("hr", { className: "border-neutral-900 my-8" }, index));
    } else if (trimmed.length > 0) {
      elements.push(
        /* @__PURE__ */ jsx("p", { className: "text-neutral-300 font-sans text-base sm:text-lg leading-relaxed mb-6", children: trimmed }, index)
      );
    }
  });
  if (inList) pushList();
  return elements;
}
function BlogPost({ slug, onNavigate, initialBlogs }) {
  const blogs = initialBlogs && initialBlogs.length > 0 ? initialBlogs : blogPosts;
  const [copied, setCopied] = useState(false);
  const post = blogs.find((p) => p.slug === slug);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);
  if (!post) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-[#050505] text-white min-h-screen flex flex-col items-center justify-center px-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-bebas text-6xl text-white tracking-widest mb-4", children: "404" }),
      /* @__PURE__ */ jsx("p", { className: "text-neutral-400 font-mono text-sm uppercase tracking-wider mb-8", children: "Post Not Found" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onNavigate("/blog"),
          className: "px-6 py-2.5 rounded-lg border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer",
          children: "BACK TO JOURNAL"
        }
      )
    ] });
  }
  const headers = extractHeaders(post.content);
  const relatedPosts = blogs.filter((p) => p.slug !== slug).slice(0, 2);
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const currentUrl = `${siteUrl}/blog/${post.slug}`;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxs("article", { className: "relative bg-[#050505] text-white min-h-screen pt-24 pb-16 px-6 sm:px-10 lg:px-14 selection:bg-[#1e90ff] selection:text-black", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: `${post.title} — Journal`,
        description: post.excerpt,
        image: post.featuredImage,
        type: "article",
        publishDate: post.publishDate,
        authorName: post.author.name,
        url: currentUrl
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => onNavigate("/blog"),
        className: "absolute left-6 top-[72px] sm:left-10 lg:left-14 group flex items-center gap-2 text-[13px] font-mono font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer z-20",
        children: [
          /* @__PURE__ */ jsx("span", { className: "group-hover:-translate-x-1 transition-transform text-sm", children: "←" }),
          "BACK TO JOURNAL"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("header", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase", children: [
          "[ ",
          post.category.toUpperCase(),
          " ]"
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-none", children: post.title }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-neutral-900", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs font-mono text-neutral-400", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "BY ",
              post.author.name.toUpperCase()
            ] }),
            /* @__PURE__ */ jsx("span", { children: "·" }),
            /* @__PURE__ */ jsx("time", { dateTime: post.publishDate, children: new Date(post.publishDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }) }),
            /* @__PURE__ */ jsx("span", { children: "·" }),
            /* @__PURE__ */ jsx("span", { className: "text-neutral-500", children: post.readTime })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3.5", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleCopyLink,
                className: "text-xs font-mono text-neutral-500 hover:text-white transition-colors cursor-pointer",
                children: copied ? "COPIED!" : "COPY LINK"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-neutral-800 text-[10px]", children: "·" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-xs font-mono text-neutral-500 hover:text-[#1e90ff] transition-colors",
                children: "X / TWITTER"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-neutral-800 text-[10px]", children: "·" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-xs font-mono text-neutral-500 hover:text-[#1e90ff] transition-colors",
                children: "LINKEDIN"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "my-10 overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/9]", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: post.featuredImage,
          alt: post.imageAlt,
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
        /* @__PURE__ */ jsxs("aside", { className: "lg:col-span-4 lg:sticky lg:top-24 space-y-4 lg:pr-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-mono text-xs text-[#ff6b35] tracking-widest uppercase pb-2 border-b border-neutral-900", children: "[ TABLE OF CONTENTS ]" }),
          /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-2.5", children: headers.map((header) => /* @__PURE__ */ jsx(
            "a",
            {
              href: `#${header.id}`,
              className: `font-mono text-[11px] tracking-wider transition-colors hover:text-[#1e90ff] leading-relaxed ${header.level === 3 ? "pl-4 text-neutral-500" : "text-neutral-400"}`,
              children: header.text.toUpperCase()
            },
            header.id
          )) })
        ] }),
        /* @__PURE__ */ jsx("main", { className: "lg:col-span-8 max-w-2xl prose prose-invert font-sans", children: renderMarkdownContent(post.content) })
      ] }),
      /* @__PURE__ */ jsx("footer", { className: "mt-16 pt-8 border-t border-neutral-900", children: /* @__PURE__ */ jsxs("div", { className: "bg-[#080808] border border-neutral-900 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: post.author.avatar,
            alt: post.author.name,
            className: "w-16 h-16 rounded-full object-cover border border-neutral-800"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center sm:text-left space-y-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-[#ff6b35] tracking-widest uppercase", children: "[ ABOUT THE AUTHOR ]" }),
          /* @__PURE__ */ jsx("h4", { className: "font-bebas text-xl text-white tracking-wide", children: post.author.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-neutral-400 font-sans leading-relaxed", children: post.author.bio })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "mt-20 pt-10 border-t border-neutral-900", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-mono text-xs text-[#ff6b35] tracking-[0.2em] uppercase mb-8", children: "[ RELATED READING ]" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-8", children: relatedPosts.map((related) => /* @__PURE__ */ jsxs(
          "article",
          {
            onClick: () => onNavigate(`/blog/${related.slug}`),
            className: "group cursor-pointer flex flex-col space-y-3",
            children: [
              /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl bg-[#0a0a0a] border border-neutral-800/80 aspect-[16/10]", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: related.featuredImage,
                  alt: related.imageAlt,
                  className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-103",
                  loading: "lazy"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs font-mono text-[#ff6b35] font-semibold tracking-wider", children: [
                /* @__PURE__ */ jsx("span", { children: related.category.toUpperCase() }),
                /* @__PURE__ */ jsx("span", { children: "·" }),
                /* @__PURE__ */ jsx("span", { className: "text-neutral-500", children: related.readTime })
              ] }),
              /* @__PURE__ */ jsx("h4", { className: "font-bebas text-xl text-white group-hover:text-[#1e90ff] transition-colors leading-snug tracking-wide", children: related.title })
            ]
          },
          related.slug
        )) })
      ] })
    ] })
  ] });
}
(_y = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _y.call(globalThis, "src/admin/AdminSidebar.jsx");
const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "works", label: "Works", icon: Briefcase },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { id: "capabilities", label: "Capabilities", icon: Zap },
  { id: "milestones", label: "Milestones", icon: Clock },
  { id: "settings", label: "Settings", icon: Settings }
];
function AdminSidebar({ activeTab, onTabChange, isCollapsed, onToggleCollapse }) {
  const adminEmail = "pratikbhusal12345@gmail.com";
  useEffect(() => {
    localStorage.setItem("pb_admin_sidebar_collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);
  const handleLogout = () => {
    localStorage.removeItem("pratik_admin_auth");
    window.location.reload();
  };
  return /* @__PURE__ */ jsxs(
    motion.aside,
    {
      animate: { width: isCollapsed ? 64 : 256 },
      className: "flex flex-col h-screen sticky top-0 bg-zinc-950 border-r border-zinc-800 shrink-0 z-20",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "h-14 flex items-center px-4 border-b border-zinc-800 overflow-hidden shrink-0", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-indigo-500 shrink-0" }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: !isCollapsed && /* @__PURE__ */ jsx(
            motion.span,
            {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -10 },
              className: "ml-3 font-semibold text-zinc-50 whitespace-nowrap",
              children: "PB ADMIN"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "flex-1 py-4 px-2 space-y-1 overflow-y-auto overflow-x-hidden", children: TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => onTabChange(tab.id),
              title: isCollapsed ? tab.label : void 0,
              className: `relative w-full flex items-center px-3 py-2 text-left rounded-md transition-colors z-10 focus:outline-none ${!isActive && "hover:bg-zinc-800/30"}`,
              children: [
                isActive && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    layoutId: "sidebar-active",
                    className: "absolute inset-0 bg-zinc-800 rounded-md -z-10",
                    transition: { type: "spring", stiffness: 300, damping: 30 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  Icon,
                  {
                    size: 20,
                    className: `shrink-0 ${isActive ? "text-indigo-400" : "text-zinc-400"}`
                  }
                ),
                /* @__PURE__ */ jsx(AnimatePresence, { children: !isCollapsed && /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, width: 0 },
                    animate: { opacity: 1, width: "auto" },
                    exit: { opacity: 0, width: 0 },
                    className: `ml-3 whitespace-nowrap overflow-hidden ${isActive ? "text-zinc-50 font-medium" : "text-zinc-400"} hover:text-zinc-50 transition-colors`,
                    children: tab.label
                  }
                ) })
              ]
            },
            tab.id
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-2 border-t border-zinc-800 flex flex-col gap-1 overflow-hidden shrink-0", children: [
          !isCollapsed && /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-xs text-zinc-500 truncate", title: adminEmail, children: adminEmail }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleLogout,
              title: isCollapsed ? "Logout" : void 0,
              className: "flex items-center px-3 py-2 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50 rounded-md transition-colors w-full focus:outline-none",
              children: [
                /* @__PURE__ */ jsx(LogOut, { size: 20, className: "shrink-0" }),
                /* @__PURE__ */ jsx(AnimatePresence, { children: !isCollapsed && /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, width: 0 },
                    animate: { opacity: 1, width: "auto" },
                    exit: { opacity: 0, width: 0 },
                    className: "ml-3 whitespace-nowrap overflow-hidden",
                    children: "Logout"
                  }
                ) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: onToggleCollapse,
              title: isCollapsed ? "Expand" : "Collapse",
              className: "flex items-center px-3 py-2 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50 rounded-md transition-colors w-full focus:outline-none",
              children: [
                isCollapsed ? /* @__PURE__ */ jsx(PanelLeftOpen, { size: 20, className: "shrink-0" }) : /* @__PURE__ */ jsx(PanelLeftClose, { size: 20, className: "shrink-0" }),
                /* @__PURE__ */ jsx(AnimatePresence, { children: !isCollapsed && /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, width: 0 },
                    animate: { opacity: 1, width: "auto" },
                    exit: { opacity: 0, width: 0 },
                    className: "ml-3 whitespace-nowrap overflow-hidden",
                    children: "Collapse"
                  }
                ) })
              ]
            }
          )
        ] })
      ]
    }
  );
}
(_z = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _z.call(globalThis, "src/admin/AdminTopBar.jsx");
const TAB_TITLES = {
  dashboard: "Dashboard",
  works: "Works & Case Studies",
  blog: "Blog Posts",
  testimonials: "Testimonials",
  capabilities: "Capabilities",
  milestones: "Milestones",
  settings: "Settings"
};
function AdminTopBar({ onOpenCommandPalette, activeTab }) {
  const adminEmail = "pratikbhusal12345@gmail.com";
  const initial = adminEmail.charAt(0).toUpperCase();
  const title = TAB_TITLES[activeTab] || "Dashboard";
  return /* @__PURE__ */ jsxs("header", { className: "h-14 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10 px-6 flex items-center justify-between shrink-0", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold text-zinc-50 capitalize", children: title }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onOpenCommandPalette,
          className: "flex items-center space-x-2 bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-1.5 hover:bg-zinc-800 transition-colors focus:outline-none",
          children: [
            /* @__PURE__ */ jsx(Search, { size: 16, className: "text-zinc-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-zinc-400", children: "Search..." }),
            /* @__PURE__ */ jsx("kbd", { className: "hidden sm:inline-flex items-center justify-center rounded bg-zinc-900 border border-zinc-700 px-1.5 font-mono text-[10px] font-medium text-zinc-400", children: "⌘K" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("button", { className: "text-zinc-400 hover:text-zinc-50 transition-colors focus:outline-none", children: /* @__PURE__ */ jsx(Bell, { size: 20 }) }),
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-medium text-sm", children: initial })
    ] })
  ] });
}
(_A = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _A.call(globalThis, "src/admin/CommandPalette.jsx");
const CommandPalette = ({ isOpen, onClose, onNavigate, works = [], blogs = [], testimonials = [] }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          document.dispatchEvent(new CustomEvent("toggle-command-palette"));
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-start justify-center pt-[20vh]", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "fixed inset-0 bg-black/60 backdrop-blur-sm"
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.96 },
        transition: { type: "spring", stiffness: 300, damping: 30 },
        className: "relative z-50 w-full max-w-xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl",
        children: /* @__PURE__ */ jsxs(Command, { className: "flex h-full w-full flex-col overflow-hidden bg-transparent", label: "Global Command Menu", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b border-zinc-800 px-3", children: [
            /* @__PURE__ */ jsx(Search, { className: "mr-2 h-5 w-5 shrink-0 text-zinc-500" }),
            /* @__PURE__ */ jsx(
              Command.Input,
              {
                autoFocus: true,
                placeholder: "Type a command or search...",
                className: "flex h-14 w-full rounded-md bg-transparent py-3 text-sm text-zinc-50 outline-none placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(Command.List, { className: "max-h-[300px] overflow-y-auto overflow-x-hidden p-2 text-zinc-50 transition-all [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-track]:bg-transparent", children: [
            /* @__PURE__ */ jsx(Command.Empty, { className: "py-6 text-center text-sm text-zinc-500", children: "No results found." }),
            /* @__PURE__ */ jsxs(Command.Group, { heading: "Navigation", className: "px-2 py-1.5 text-xs font-medium text-zinc-500 [&_[cmdk-group-items]]:mt-1", children: [
              /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
                onNavigate("dashboard");
                onClose();
              }, children: [
                /* @__PURE__ */ jsx(LayoutDashboard, { className: "mr-2 h-4 w-4" }),
                "Dashboard"
              ] }),
              /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
                onNavigate("works");
                onClose();
              }, children: [
                /* @__PURE__ */ jsx(Briefcase, { className: "mr-2 h-4 w-4" }),
                "Works"
              ] }),
              /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
                onNavigate("blog");
                onClose();
              }, children: [
                /* @__PURE__ */ jsx(FileText, { className: "mr-2 h-4 w-4" }),
                "Blog"
              ] }),
              /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
                onNavigate("testimonials");
                onClose();
              }, children: [
                /* @__PURE__ */ jsx(MessageSquare, { className: "mr-2 h-4 w-4" }),
                "Testimonials"
              ] }),
              /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
                onNavigate("capabilities");
                onClose();
              }, children: [
                /* @__PURE__ */ jsx(Wrench, { className: "mr-2 h-4 w-4" }),
                "Capabilities"
              ] }),
              /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
                onNavigate("milestones");
                onClose();
              }, children: [
                /* @__PURE__ */ jsx(Flag, { className: "mr-2 h-4 w-4" }),
                "Milestones"
              ] }),
              /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
                onNavigate("settings");
                onClose();
              }, children: [
                /* @__PURE__ */ jsx(Settings, { className: "mr-2 h-4 w-4" }),
                "Settings"
              ] })
            ] }),
            /* @__PURE__ */ jsxs(Command.Group, { heading: "Quick Actions", className: "px-2 py-1.5 text-xs font-medium text-zinc-500 [&_[cmdk-group-items]]:mt-1", children: [
              /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
                onNavigate("works", "new");
                onClose();
              }, children: [
                /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
                "New Work"
              ] }),
              /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
                onNavigate("blog", "new");
                onClose();
              }, children: [
                /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
                "New Blog Post"
              ] }),
              /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
                onNavigate("testimonials", "new");
                onClose();
              }, children: [
                /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
                "New Testimonial"
              ] })
            ] }),
            (works == null ? void 0 : works.length) > 0 && /* @__PURE__ */ jsx(Command.Group, { heading: "Recent Works", className: "px-2 py-1.5 text-xs font-medium text-zinc-500 [&_[cmdk-group-items]]:mt-1", children: works.slice(0, 5).map((work) => /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
              onNavigate("works", work);
              onClose();
            }, children: [
              /* @__PURE__ */ jsx(Edit, { className: "mr-2 h-4 w-4" }),
              work.title
            ] }, work.id)) }),
            (blogs == null ? void 0 : blogs.length) > 0 && /* @__PURE__ */ jsx(Command.Group, { heading: "Recent Posts", className: "px-2 py-1.5 text-xs font-medium text-zinc-500 [&_[cmdk-group-items]]:mt-1", children: blogs.slice(0, 5).map((blog) => /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => {
              onNavigate("blog", blog);
              onClose();
            }, children: [
              /* @__PURE__ */ jsx(Edit, { className: "mr-2 h-4 w-4" }),
              blog.title
            ] }, blog.id)) })
          ] })
        ] })
      }
    )
  ] }) });
};
const CommandItem = ({ children, onSelect }) => {
  return /* @__PURE__ */ jsx(
    Command.Item,
    {
      onSelect,
      className: "relative flex cursor-pointer select-none items-center rounded-sm border-l-2 border-transparent px-2 py-2 text-sm text-zinc-400 outline-none hover:bg-zinc-800 hover:text-zinc-50 aria-selected:border-indigo-500 aria-selected:bg-indigo-500/20 aria-selected:text-indigo-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      children
    }
  );
};
(_B = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _B.call(globalThis, "src/admin/DashboardView.jsx");
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};
const fadeUp$1 = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
};
function SkeletonCard() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3 animate-pulse", children: [
    /* @__PURE__ */ jsx("div", { className: "h-3 w-24 bg-zinc-800 rounded" }),
    /* @__PURE__ */ jsx("div", { className: "h-10 w-16 bg-zinc-800 rounded" }),
    /* @__PURE__ */ jsx("div", { className: "h-3 w-32 bg-zinc-800 rounded" })
  ] });
}
function StatCard({ icon: Icon, label, count, publishedCount, color, onClick }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      variants: fadeUp$1,
      whileHover: { y: -2, transition: { duration: 0.2 } },
      onClick,
      className: "bg-zinc-900 border border-zinc-800 rounded-xl p-6 cursor-pointer hover:border-zinc-700 transition-colors group",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center ${color}`, children: /* @__PURE__ */ jsx(Icon, { size: 20 }) }),
          /* @__PURE__ */ jsx(ArrowUpRight, { size: 16, className: "text-zinc-600 group-hover:text-zinc-400 transition-colors" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1", children: label }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-zinc-100 tabular-nums", children: count }),
          publishedCount !== void 0 && /* @__PURE__ */ jsxs("span", { className: "text-xs text-emerald-400 font-medium", children: [
            publishedCount,
            " live"
          ] })
        ] })
      ]
    }
  );
}
function DashboardView({
  works,
  blogs,
  testimonials,
  capabilities,
  milestones,
  isLoading,
  onNavigate,
  supabaseConnected
}) {
  const activeWorks = works.filter((w) => w.status !== "Draft").length;
  const activeBlogs = blogs.filter((b) => b.status !== "Draft").length;
  const activeTestimonials = testimonials.filter((t) => t.status !== "Draft").length;
  const ADMIN_EMAIL = "pratikbhusal12345@gmail.com";
  const quickActions = [
    { label: "New Case Study", icon: Briefcase, tab: "works", action: "new" },
    { label: "New Blog Post", icon: FileText, tab: "blog", action: "new" },
    { label: "New Testimonial", icon: MessageSquareQuote, tab: "testimonials", action: "new" }
  ];
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "h-8 w-48 bg-zinc-800 rounded animate-pulse mb-2" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 w-72 bg-zinc-800/60 rounded animate-pulse" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx(SkeletonCard, {}, i)) })
    ] });
  }
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      variants: container,
      initial: "hidden",
      animate: "show",
      className: "space-y-8",
      children: [
        /* @__PURE__ */ jsxs(motion.div, { variants: fadeUp$1, children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-zinc-100", children: "Dashboard" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-zinc-500 mt-1", children: "Overview of your portfolio content" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsx(
            StatCard,
            {
              icon: Briefcase,
              label: "Case Studies",
              count: works.length,
              publishedCount: activeWorks,
              color: "bg-indigo-500/15 text-indigo-400",
              onClick: () => onNavigate("works")
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              icon: FileText,
              label: "Blog Posts",
              count: blogs.length,
              publishedCount: activeBlogs,
              color: "bg-violet-500/15 text-violet-400",
              onClick: () => onNavigate("blog")
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              icon: MessageSquareQuote,
              label: "Testimonials",
              count: testimonials.length,
              publishedCount: activeTestimonials,
              color: "bg-amber-500/15 text-amber-400",
              onClick: () => onNavigate("testimonials")
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              icon: Zap,
              label: "Capabilities",
              count: capabilities.length,
              color: "bg-emerald-500/15 text-emerald-400",
              onClick: () => onNavigate("capabilities")
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              icon: Clock,
              label: "Milestones",
              count: milestones.length,
              color: "bg-cyan-500/15 text-cyan-400",
              onClick: () => onNavigate("milestones")
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { variants: fadeUp$1, className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-zinc-400 uppercase tracking-wider", children: "Quick Actions" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: quickActions.map((action) => /* @__PURE__ */ jsxs(
            motion.button,
            {
              whileTap: { scale: 0.97 },
              onClick: () => onNavigate(action.tab, action.action),
              className: "flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-indigo-500/40 hover:bg-zinc-800/80 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer",
              children: [
                /* @__PURE__ */ jsx(Plus, { size: 16, className: "text-indigo-400" }),
                action.label
              ]
            },
            action.label
          )) })
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: fadeUp$1,
            className: "bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4",
            children: [
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-zinc-400 uppercase tracking-wider", children: "System Status" }),
              /* @__PURE__ */ jsxs("div", { className: "divide-y divide-zinc-800", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm text-zinc-500", children: [
                    /* @__PURE__ */ jsx(Database, { size: 16 }),
                    /* @__PURE__ */ jsx("span", { children: "Database Backend" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: `text-xs font-medium px-2.5 py-1 rounded-full ${supabaseConnected ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-amber-500/15 text-amber-400 border border-amber-500/30"}`, children: supabaseConnected ? "Supabase Cloud" : "LocalStorage Fallback" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm text-zinc-500", children: [
                    /* @__PURE__ */ jsx(HardDrive, { size: 16 }),
                    /* @__PURE__ */ jsx("span", { children: "Image Storage" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: `text-xs font-medium px-2.5 py-1 rounded-full ${supabaseConnected ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-zinc-800 text-zinc-400 border border-zinc-700"}`, children: supabaseConnected ? "Supabase Storage" : "Object URLs" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm text-zinc-500", children: [
                    /* @__PURE__ */ jsx(User, { size: 16 }),
                    /* @__PURE__ */ jsx("span", { children: "Admin Account" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-zinc-300", children: ADMIN_EMAIL })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
(_C = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _C.call(globalThis, "src/admin/EmptyState.jsx");
function EmptyState({ title, description, actionLabel, onAction, icon: IconComponent }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "flex flex-col items-center justify-center py-16 px-4 text-center",
      children: [
        IconComponent && /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(IconComponent, { size: 48, className: "text-zinc-600" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-zinc-300 mb-2", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-zinc-500 max-w-sm mx-auto mb-6", children: description }),
        onAction && actionLabel && /* @__PURE__ */ jsx(
          motion.button,
          {
            whileTap: { scale: 0.97 },
            onClick: onAction,
            className: "bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-2 font-medium transition-colors",
            children: actionLabel
          }
        )
      ]
    }
  );
}
(_D = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _D.call(globalThis, "src/admin/DataTable.jsx");
function DataTable({
  columns,
  data = [],
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
  searchQuery = "",
  searchKeys = [],
  isLoading = false,
  emptyTitle = "No items found",
  emptyDescription = "Get started by creating a new item.",
  onCreateNew,
  selectedIds = /* @__PURE__ */ new Set(),
  onSelectToggle,
  onSelectAll
}) {
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((item) => {
      return searchKeys.some((key) => {
        const val = item[key];
        return val && String(val).toLowerCase().includes(lowerQuery);
      });
    });
  }, [data, searchQuery, searchKeys]);
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const handleSelectAll = (e) => {
    if (onSelectAll) {
      onSelectAll(e.target.checked);
    }
  };
  const renderStatus = (val) => {
    const isPublished = val === "Published" || val === true || val === "published";
    if (isPublished) {
      return /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30", children: "Published" });
    }
    return /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700", children: "Draft" });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "w-full bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "p-4 flex flex-col gap-4", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-zinc-800 animate-pulse rounded" }),
      columns.map((_2, j) => /* @__PURE__ */ jsx("div", { className: "h-6 bg-zinc-800 animate-pulse rounded flex-1" }, j))
    ] }, i)) }) });
  }
  if (data.length === 0 && !searchQuery) {
    return /* @__PURE__ */ jsx(
      EmptyState,
      {
        title: emptyTitle,
        description: emptyDescription,
        actionLabel: "Create New",
        onAction: onCreateNew,
        icon: PlusCircle
      }
    );
  }
  const allSelected = paginatedData.length > 0 && paginatedData.every((item) => selectedIds.has(item.id));
  const someSelected = paginatedData.some((item) => selectedIds.has(item.id)) && !allSelected;
  return /* @__PURE__ */ jsxs("div", { className: "w-full bg-zinc-900 border border-zinc-800 rounded-lg shadow-sm flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left text-sm text-zinc-400 border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-zinc-900 border-b border-zinc-800 text-zinc-400", children: /* @__PURE__ */ jsxs("tr", { children: [
        onSelectToggle && /* @__PURE__ */ jsx("th", { className: "px-4 py-3 w-10", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            className: "rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-indigo-500",
            checked: allSelected,
            ref: (input) => {
              if (input) input.indeterminate = someSelected;
            },
            onChange: handleSelectAll
          }
        ) }),
        columns.map((col) => /* @__PURE__ */ jsx(
          "th",
          {
            className: `px-4 py-3 font-medium ${col.sortable ? "cursor-pointer select-none hover:text-zinc-200 group" : ""}`,
            onClick: () => col.sortable ? requestSort(col.key) : null,
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              col.label,
              col.sortable && (sortConfig == null ? void 0 : sortConfig.key) === col.key && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { rotate: sortConfig.direction === "asc" ? 180 : 0 },
                  animate: { rotate: sortConfig.direction === "asc" ? 0 : 180 },
                  transition: { duration: 0.2 },
                  children: /* @__PURE__ */ jsx(ChevronUp, { size: 14 })
                }
              ),
              col.sortable && (sortConfig == null ? void 0 : sortConfig.key) !== col.key && /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: "opacity-0 group-hover:opacity-50" })
            ] })
          },
          col.key
        )),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-zinc-800", children: paginatedData.length > 0 ? paginatedData.map((item) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: "group hover:bg-zinc-800/50 transition-colors",
          children: [
            onSelectToggle && /* @__PURE__ */ jsx("td", { className: "px-4 py-3 w-10", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                className: "rounded border-zinc-700 bg-zinc-800 text-indigo-500 focus:ring-indigo-500",
                checked: selectedIds.has(item.id),
                onChange: () => onSelectToggle(item.id)
              }
            ) }),
            columns.map((col) => /* @__PURE__ */ jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: col.render ? col.render(item[col.key], item) : col.key === "status" ? renderStatus(item[col.key]) : item[col.key] }, col.key)),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
              onToggleStatus && /* @__PURE__ */ jsx(
                motion.button,
                {
                  whileTap: { scale: 0.95 },
                  onClick: () => onToggleStatus(item),
                  className: "p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 rounded transition-colors",
                  title: "Toggle Status",
                  children: item.status === "Published" || item.status === true || item.status === "published" ? /* @__PURE__ */ jsx(Eye, { size: 16 }) : /* @__PURE__ */ jsx(EyeOff, { size: 16 })
                }
              ),
              onEdit && /* @__PURE__ */ jsx(
                motion.button,
                {
                  whileTap: { scale: 0.95 },
                  onClick: () => onEdit(item),
                  className: "p-1.5 text-zinc-400 hover:text-indigo-400 hover:bg-zinc-700 rounded transition-colors",
                  title: "Edit",
                  children: /* @__PURE__ */ jsx(Pencil, { size: 16 })
                }
              ),
              onDuplicate && /* @__PURE__ */ jsx(
                motion.button,
                {
                  whileTap: { scale: 0.95 },
                  onClick: () => onDuplicate(item),
                  className: "p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-700 rounded transition-colors",
                  title: "Duplicate",
                  children: /* @__PURE__ */ jsx(Copy, { size: 16 })
                }
              ),
              onDelete && /* @__PURE__ */ jsx(
                motion.button,
                {
                  whileTap: { scale: 0.95 },
                  onClick: () => onDelete(item),
                  className: "p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 rounded transition-colors",
                  title: "Delete",
                  children: /* @__PURE__ */ jsx(Trash2, { size: 16 })
                }
              )
            ] }) })
          ]
        },
        item.id
      )) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: columns.length + (onSelectToggle ? 2 : 1), className: "px-4 py-8 text-center text-zinc-500", children: "No matching results found." }) }) })
    ] }) }),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-zinc-900 border-t border-zinc-800 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-zinc-500", children: [
        "Showing ",
        (currentPage - 1) * itemsPerPage + 1,
        " to ",
        Math.min(currentPage * itemsPerPage, sortedData.length),
        " of ",
        sortedData.length,
        " entries"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
            disabled: currentPage === 1,
            className: "px-3 py-1 bg-zinc-800 text-zinc-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors",
            children: "Previous"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
            disabled: currentPage === totalPages,
            className: "px-3 py-1 bg-zinc-800 text-zinc-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors",
            children: "Next"
          }
        )
      ] })
    ] })
  ] });
}
(_E = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _E.call(globalThis, "src/admin/EditForm.jsx");
const getSeoTitleColor = (length) => {
  if (length === 0) return "#71717a";
  if (length < 30) return "#71717a";
  if (length <= 60) return "#22c55e";
  if (length <= 70) return "#f59e0b";
  return "#ef4444";
};
const getSeoDescColor = (length) => {
  if (length === 0) return "#71717a";
  if (length < 100) return "#71717a";
  if (length <= 160) return "#22c55e";
  if (length <= 180) return "#f59e0b";
  return "#ef4444";
};
const generateSlug = (text) => {
  if (!text) return "";
  return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");
};
const ImageUpload = ({ label, value, onChange, className = "" }) => {
  const [uploading, setUploading] = useState(false);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await contentServices.uploadFile(file);
      if (url) {
        onChange(url);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `space-y-2 ${className}`, children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400", children: label }),
    value ? /* @__PURE__ */ jsxs("div", { className: "relative rounded-xl overflow-hidden border border-zinc-700 bg-zinc-800/50", children: [
      /* @__PURE__ */ jsx("img", { src: value, alt: "Preview", className: "w-full h-auto max-h-64 object-cover" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(""),
          className: "absolute top-2 right-2 p-1.5 bg-black/60 text-zinc-300 hover:text-white rounded-md backdrop-blur-sm",
          children: /* @__PURE__ */ jsx(X, { size: 16 })
        }
      )
    ] }) : /* @__PURE__ */ jsxs("label", { className: "flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 hover:border-indigo-500 rounded-xl p-8 text-center cursor-pointer transition-colors bg-zinc-900/30", children: [
      /* @__PURE__ */ jsx(Upload, { className: "text-zinc-500 mb-3", size: 24 }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-zinc-400", children: uploading ? "Uploading..." : "Click or drag image to upload" }),
      /* @__PURE__ */ jsx("input", { type: "file", className: "hidden", accept: "image/*", onChange: handleFileChange, disabled: uploading })
    ] })
  ] });
};
const TagsInput = ({ tags = [], onChange }) => {
  const [input, setInput] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = input.trim();
      if (val && !tags.includes(val)) {
        onChange([...tags, val]);
      }
      setInput("");
    }
  };
  const removeTag = (indexToRemove) => {
    onChange(tags.filter((_, i) => i !== indexToRemove));
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: tags.map((tag, idx) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 text-sm text-zinc-300", children: [
      tag,
      /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeTag(idx), className: "text-zinc-500 hover:text-zinc-300", children: /* @__PURE__ */ jsx(X, { size: 14 }) })
    ] }, idx)) }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: input,
        onChange: (e) => setInput(e.target.value),
        onKeyDown: handleKeyDown,
        placeholder: "Type and press Enter to add...",
        className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-shadow"
      }
    )
  ] });
};
function EditForm({ item, type, onCancel, onSave, allWorks = [], allBlogs = [] }) {
  var _a2;
  const [formData, setFormData] = useState(() => ({
    ...item,
    services: item.services || [],
    gallery: item.gallery || [],
    caseStudy: item.caseStudy || { sections: [] }
  }));
  const originalDataRef = useRef(formData);
  const [activeTab, setActiveTab] = useState("Content");
  const [isSaved, setIsSaved] = useState(false);
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalDataRef.current);
  const getTabs = () => {
    if (type === "works") return ["Content", "Case Study", "Gallery", "SEO"];
    if (type === "blogs") return ["Content", "SEO"];
    return [];
  };
  const tabs = getTabs();
  useEffect(() => {
    const draftKey = `admin_draft_${type}_${item.id || "new"}`;
    const interval = setInterval(() => {
      if (hasChanges) {
        localStorage.setItem(draftKey, JSON.stringify(formData));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2e3);
      }
    }, 12e3);
    return () => clearInterval(interval);
  }, [formData, type, item.id, hasChanges]);
  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    const val = inputType === "checkbox" ? checked : value;
    setFormData((prev) => {
      const next = { ...prev, [name]: val };
      if (name === "title" && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        next.slug = generateSlug(val);
      }
      return next;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full bg-zinc-950 text-zinc-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50 sticky top-0 z-10 backdrop-blur-md", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("button", { onClick: onCancel, className: "p-2 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 rounded-lg transition-colors", children: /* @__PURE__ */ jsx(ArrowLeft, { size: 20 }) }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-lg capitalize flex items-center gap-2", children: [
          item.id ? "Edit" : "New",
          " ",
          type.slice(0, -1),
          type === "works" || type === "blogs" ? /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 text-xs rounded-full border ${formData.status === "Published" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-zinc-800 text-zinc-400 border-zinc-700"}`, children: formData.status || "Draft" }) : null
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(AnimatePresence, { children: isSaved && /* @__PURE__ */ jsxs(
          motion.span,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0 },
            className: "text-xs text-zinc-400 flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsx(Check, { size: 14, className: "text-green-500" }),
              " Draft saved"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs(
          motion.button,
          {
            whileTap: { scale: 0.97 },
            onClick: handleSubmit,
            className: "relative px-5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg font-medium transition-colors",
            children: [
              "Save Changes",
              hasChanges && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 w-3 h-3 bg-amber-500 border-2 border-zinc-950 rounded-full" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      tabs.length > 0 && /* @__PURE__ */ jsx("div", { className: "px-6 pt-6 border-b border-zinc-800", children: /* @__PURE__ */ jsx("div", { className: "flex gap-6", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab),
          className: `pb-4 text-sm font-medium transition-colors relative ${activeTab === tab ? "text-indigo-400" : "text-zinc-400 hover:text-zinc-200"}`,
          children: [
            tab,
            activeTab === tab && /* @__PURE__ */ jsx(motion.div, { layoutId: "activeTab", className: "absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" })
          ]
        },
        tab
      )) }) }),
      /* @__PURE__ */ jsx("div", { className: "p-6 max-w-4xl mx-auto", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 10 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -10 },
          transition: { duration: 0.2 },
          children: /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
            type === "works" && activeTab === "Content" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Title" }),
                  /* @__PURE__ */ jsx("input", { name: "title", value: formData.title || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Slug" }),
                  /* @__PURE__ */ jsx("input", { name: "slug", value: formData.slug || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono text-sm" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Tagline" }),
                  /* @__PURE__ */ jsx("textarea", { name: "tagline", value: formData.tagline || "", onChange: handleChange, rows: 2, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Client" }),
                  /* @__PURE__ */ jsx("input", { name: "client", value: formData.client || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Year" }),
                    /* @__PURE__ */ jsx("input", { type: "number", name: "year", value: formData.year || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Index (Order)" }),
                    /* @__PURE__ */ jsx("input", { type: "number", name: "index", value: formData.index || 0, onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Category" }),
                  /* @__PURE__ */ jsxs("select", { name: "category", value: formData.category || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30", children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "Select Category" }),
                    /* @__PURE__ */ jsx("option", { value: "Web Design", children: "Web Design" }),
                    /* @__PURE__ */ jsx("option", { value: "Development", children: "Development" }),
                    /* @__PURE__ */ jsx("option", { value: "Branding", children: "Branding" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Services" }),
                  /* @__PURE__ */ jsx(TagsInput, { tags: formData.services, onChange: (tags) => setFormData({ ...formData, services: tags }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Status" }),
                  /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["Draft", "Published"].map((status) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setFormData({ ...formData, status }),
                      className: `flex-1 py-2 text-sm font-medium rounded-md border ${formData.status === status ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/50" : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:bg-zinc-800"}`,
                      children: status
                    },
                    status
                  )) })
                ] })
              ] })
            ] }),
            type === "works" && activeTab === "Case Study" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-zinc-200", children: "Case Study Sections" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      var _a3;
                      const sections = ((_a3 = formData.caseStudy) == null ? void 0 : _a3.sections) || [];
                      setFormData({ ...formData, caseStudy: { ...formData.caseStudy, sections: [...sections, { heading: "", paragraphs: [{ text: "", highlights: [] }] }] } });
                    },
                    className: "flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 rounded-md transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(Plus, { size: 16 }),
                      " Add Section"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-8", children: (((_a2 = formData.caseStudy) == null ? void 0 : _a2.sections) || []).map((section, sIdx) => /* @__PURE__ */ jsxs("div", { className: "p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      placeholder: "Section Heading (e.g. The Challenge)",
                      value: section.heading,
                      onChange: (e) => {
                        const newSections = [...formData.caseStudy.sections];
                        newSections[sIdx].heading = e.target.value;
                        setFormData({ ...formData, caseStudy: { ...formData.caseStudy, sections: newSections } });
                      },
                      className: "bg-transparent border-b border-zinc-700 focus:border-indigo-500 px-1 py-1 text-lg font-medium text-zinc-200 focus:outline-none w-2/3"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        const newSections = formData.caseStudy.sections.filter((_, i) => i !== sIdx);
                        setFormData({ ...formData, caseStudy: { ...formData.caseStudy, sections: newSections } });
                      },
                      className: "text-red-400 hover:text-red-300 p-1",
                      children: /* @__PURE__ */ jsx(X, { size: 18 })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 pl-4 border-l-2 border-zinc-800", children: [
                  (section.paragraphs || []).map((p, pIdx) => /* @__PURE__ */ jsxs("div", { className: "space-y-2 relative", children: [
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        placeholder: "Paragraph text...",
                        value: p.text,
                        onChange: (e) => {
                          const newSections = [...formData.caseStudy.sections];
                          newSections[sIdx].paragraphs[pIdx].text = e.target.value;
                          setFormData({ ...formData, caseStudy: { ...formData.caseStudy, sections: newSections } });
                        },
                        rows: 3,
                        className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none text-sm"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        placeholder: "Highlights (comma separated words to bold)",
                        value: (p.highlights || []).join(", "),
                        onChange: (e) => {
                          const newSections = [...formData.caseStudy.sections];
                          newSections[sIdx].paragraphs[pIdx].highlights = e.target.value.split(",").map((h) => h.trim()).filter(Boolean);
                          setFormData({ ...formData, caseStudy: { ...formData.caseStudy, sections: newSections } });
                        },
                        className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-xs"
                      }
                    ),
                    section.paragraphs.length > 1 && /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
                      const newSections = [...formData.caseStudy.sections];
                      newSections[sIdx].paragraphs = newSections[sIdx].paragraphs.filter((_, i) => i !== pIdx);
                      setFormData({ ...formData, caseStudy: { ...formData.caseStudy, sections: newSections } });
                    }, className: "absolute top-2 -right-8 text-zinc-500 hover:text-red-400", children: /* @__PURE__ */ jsx(X, { size: 16 }) })
                  ] }, pIdx)),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        const newSections = [...formData.caseStudy.sections];
                        newSections[sIdx].paragraphs.push({ text: "", highlights: [] });
                        setFormData({ ...formData, caseStudy: { ...formData.caseStudy, sections: newSections } });
                      },
                      className: "text-xs text-indigo-400 hover:text-indigo-300",
                      children: "+ Add Paragraph"
                    }
                  )
                ] })
              ] }, sIdx)) })
            ] }),
            type === "works" && activeTab === "Gallery" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-zinc-200", children: "Image Gallery" }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setFormData({ ...formData, gallery: [...formData.gallery || [], { url: "", caption: "" }] }),
                    className: "flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-sm text-zinc-200 rounded-md transition-colors",
                    children: [
                      /* @__PURE__ */ jsx(Plus, { size: 16 }),
                      " Add Image Slot"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-4", children: (formData.gallery || []).map((item2, idx) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl", children: [
                /* @__PURE__ */ jsx("div", { className: "w-1/3", children: /* @__PURE__ */ jsx(
                  ImageUpload,
                  {
                    value: item2.url,
                    onChange: (url) => {
                      const newGallery = [...formData.gallery];
                      newGallery[idx].url = url;
                      setFormData({ ...formData, gallery: newGallery });
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-3", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      placeholder: "Caption (optional)",
                      value: item2.caption || "",
                      onChange: (e) => {
                        const newGallery = [...formData.gallery];
                        newGallery[idx].caption = e.target.value;
                        setFormData({ ...formData, gallery: newGallery });
                      },
                      className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm"
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsx("button", { type: "button", disabled: idx === 0, onClick: () => {
                      const newG = [...formData.gallery];
                      [newG[idx - 1], newG[idx]] = [newG[idx], newG[idx - 1]];
                      setFormData({ ...formData, gallery: newG });
                    }, className: "p-1.5 bg-zinc-800 text-zinc-400 rounded-md hover:bg-zinc-700 disabled:opacity-50", children: /* @__PURE__ */ jsx(ChevronUp, { size: 16 }) }),
                    /* @__PURE__ */ jsx("button", { type: "button", disabled: idx === formData.gallery.length - 1, onClick: () => {
                      const newG = [...formData.gallery];
                      [newG[idx + 1], newG[idx]] = [newG[idx], newG[idx + 1]];
                      setFormData({ ...formData, gallery: newG });
                    }, className: "p-1.5 bg-zinc-800 text-zinc-400 rounded-md hover:bg-zinc-700 disabled:opacity-50", children: /* @__PURE__ */ jsx(ChevronDown, { size: 16 }) }),
                    /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => {
                      setFormData({ ...formData, gallery: formData.gallery.filter((_, i) => i !== idx) });
                    }, className: "ml-auto p-1.5 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20", children: [
                      /* @__PURE__ */ jsx(X, { size: 16 }),
                      " Remove"
                    ] })
                  ] })
                ] })
              ] }, idx)) })
            ] }),
            (type === "works" || type === "blogs") && activeTab === "SEO" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-2xl", children: [
              /* @__PURE__ */ jsx(
                ImageUpload,
                {
                  label: "Social Share Image (OG Image)",
                  value: formData.seoImage || "",
                  onChange: (val) => setFormData({ ...formData, seoImage: val })
                }
              ),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400", children: "SEO Title" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs", style: { color: getSeoTitleColor((formData.seoTitle || "").length) }, children: [
                    (formData.seoTitle || "").length,
                    " / 60"
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    name: "seoTitle",
                    value: formData.seoTitle || "",
                    onChange: handleChange,
                    className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400", children: "SEO Description" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-xs", style: { color: getSeoDescColor((formData.seoDescription || "").length) }, children: [
                    (formData.seoDescription || "").length,
                    " / 160"
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    name: "seoDescription",
                    value: formData.seoDescription || "",
                    onChange: handleChange,
                    rows: 3,
                    className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none"
                  }
                )
              ] })
            ] }),
            type === "blogs" && activeTab === "Content" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Title" }),
                  /* @__PURE__ */ jsx("input", { name: "title", value: formData.title || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-lg font-medium" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Slug" }),
                  /* @__PURE__ */ jsx("input", { name: "slug", value: formData.slug || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono text-sm text-zinc-400" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Excerpt" }),
                  /* @__PURE__ */ jsx("textarea", { name: "excerpt", value: formData.excerpt || "", onChange: handleChange, rows: 3, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Content (Markdown/HTML)" }),
                  /* @__PURE__ */ jsx("textarea", { name: "content", value: formData.content || "", onChange: handleChange, rows: 20, className: "w-full bg-zinc-950 border border-zinc-700 rounded-md px-4 py-3 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono text-sm leading-relaxed" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsx(ImageUpload, { label: "Featured Image", value: formData.featuredImage || "", onChange: (val) => setFormData({ ...formData, featuredImage: val }) }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Status" }),
                    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["Draft", "Published"].map((status) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setFormData({ ...formData, status }),
                        className: `flex-1 py-1.5 text-sm font-medium rounded-md border ${formData.status === status ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/50" : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700"}`,
                        children: status
                      },
                      status
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Category" }),
                    /* @__PURE__ */ jsx("input", { name: "category", value: formData.category || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Publish Date" }),
                    /* @__PURE__ */ jsx("input", { type: "date", name: "publishDate", value: formData.publishDate || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm [color-scheme:dark]" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Read Time (mins)" }),
                    /* @__PURE__ */ jsx("input", { type: "number", name: "readTime", value: formData.readTime || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-1.5 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm" })
                  ] })
                ] })
              ] })
            ] }),
            type === "testimonials" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-xl", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6", children: [
                /* @__PURE__ */ jsx("div", { className: "w-32", children: /* @__PURE__ */ jsx(ImageUpload, { label: "Avatar", value: formData.avatar || "", onChange: (val) => setFormData({ ...formData, avatar: val }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Name" }),
                    /* @__PURE__ */ jsx("input", { name: "name", value: formData.name || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Role" }),
                      /* @__PURE__ */ jsx("input", { name: "role", value: formData.role || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Company" }),
                      /* @__PURE__ */ jsx("input", { name: "company", value: formData.company || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" })
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Quote" }),
                /* @__PURE__ */ jsx("textarea", { name: "quote", value: formData.quote || "", onChange: handleChange, rows: 4, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none text-lg" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Order" }),
                  /* @__PURE__ */ jsx("input", { type: "number", name: "order", value: formData.order || 0, onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Status" }),
                  /* @__PURE__ */ jsxs("select", { name: "status", value: formData.status || "Active", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30", children: [
                    /* @__PURE__ */ jsx("option", { value: "Active", children: "Active" }),
                    /* @__PURE__ */ jsx("option", { value: "Hidden", children: "Hidden" })
                  ] })
                ] })
              ] })
            ] }),
            type === "capabilities" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-xl", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Capability Name" }),
                /* @__PURE__ */ jsx("input", { name: "name", value: formData.name || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-lg font-medium" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Description" }),
                /* @__PURE__ */ jsx("textarea", { name: "desc", value: formData.desc || "", onChange: handleChange, rows: 4, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Order" }),
                /* @__PURE__ */ jsx("input", { type: "number", name: "order", value: formData.order || 0, onChange: handleChange, className: "w-24 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" })
              ] })
            ] }),
            type === "milestones" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-xl", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "col-span-1", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Year" }),
                  /* @__PURE__ */ jsx("input", { name: "year", value: formData.year || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-mono" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "col-span-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Title" }),
                  /* @__PURE__ */ jsx("input", { name: "title", value: formData.title || "", onChange: handleChange, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 font-medium" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Description" }),
                /* @__PURE__ */ jsx("textarea", { name: "desc", value: formData.desc || "", onChange: handleChange, rows: 3, className: "w-full bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-zinc-400 mb-1", children: "Order" }),
                /* @__PURE__ */ jsx("input", { type: "number", name: "order", value: formData.order || 0, onChange: handleChange, className: "w-24 bg-zinc-900 border border-zinc-700 rounded-md px-3 py-2 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" })
              ] })
            ] })
          ] })
        },
        activeTab || "single-form"
      ) }) })
    ] })
  ] });
}
(_F = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _F.call(globalThis, "src/admin/DeleteModal.jsx");
function DeleteModal({ isOpen, onClose, onConfirm, itemName, itemType }) {
  const cancelBtnRef = useRef(null);
  const [shake, setShake] = useState(false);
  useEffect(() => {
    if (isOpen && cancelBtnRef.current) {
      setTimeout(() => {
        var _a2;
        return (_a2 = cancelBtnRef.current) == null ? void 0 : _a2.focus();
      }, 100);
    }
  }, [isOpen]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  const handleConfirm = () => {
    onConfirm();
  };
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4",
      onClick: handleBackdropClick,
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { scale: 0.95, opacity: 0 },
          animate: shake ? { scale: 1, opacity: 1, x: [-10, 10, -10, 10, 0] } : { scale: 1, opacity: 1, x: 0 },
          exit: { scale: 0.95, opacity: 0 },
          transition: shake ? { duration: 0.4 } : { type: "spring", stiffness: 300, damping: 30 },
          className: "w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl",
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "text-amber-500", size: 24 }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-zinc-50", children: [
                "Delete ",
                itemType,
                "?"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-zinc-400", children: [
                'Are you sure you want to delete "',
                itemName,
                '"? This action cannot be undone.'
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex w-full gap-3 pt-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  ref: cancelBtnRef,
                  type: "button",
                  onClick: onClose,
                  className: "flex-1 px-4 py-2 bg-transparent border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg font-medium transition-colors",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleConfirm,
                  className: "flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-red-500/20",
                  children: "Delete"
                }
              )
            ] })
          ] })
        }
      )
    }
  ) });
}
(_G = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _G.call(globalThis, "src/admin/DragReorderList.jsx");
function SortableItem({ id, item, index, renderItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: setNodeRef,
      style,
      className: `relative ${isDragging ? "shadow-xl scale-[1.02] opacity-90" : ""}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 z-10", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            ...attributes,
            ...listeners,
            className: "p-1.5 text-zinc-500 hover:text-zinc-300 cursor-grab active:cursor-grabbing rounded",
            children: /* @__PURE__ */ jsx(GripVertical, { size: 18 })
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "pl-12", children: renderItem(item, index) })
      ]
    }
  );
}
function DragReorderList({ items, onReorder, renderItem }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newArray = arrayMove(items, oldIndex, newIndex);
      onReorder(newArray);
    }
  };
  return /* @__PURE__ */ jsx(
    DndContext,
    {
      sensors,
      collisionDetection: closestCenter,
      onDragEnd: handleDragEnd,
      children: /* @__PURE__ */ jsx(
        SortableContext,
        {
          items: items.map((item) => item.id),
          strategy: verticalListSortingStrategy,
          children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: items.map((item, index) => /* @__PURE__ */ jsx(
            SortableItem,
            {
              id: item.id,
              item,
              index,
              renderItem
            },
            item.id
          )) })
        }
      )
    }
  );
}
(_H = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _H.call(globalThis, "src/admin/SettingsView.jsx");
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
};
function FieldGroup({ label, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-zinc-500 uppercase tracking-wider", children: label }),
    children
  ] });
}
function TextInput({ value, onChange, placeholder, type = "text", required = false }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      required,
      value: value || "",
      onChange: (e) => onChange(e.target.value),
      placeholder,
      className: "w-full bg-zinc-900 border border-zinc-800 rounded-md px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all"
    }
  );
}
function TextArea({ value, onChange, placeholder, rows = 3, required = false }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      required,
      value: value || "",
      onChange: (e) => onChange(e.target.value),
      placeholder,
      rows,
      className: "w-full bg-zinc-900 border border-zinc-800 rounded-md px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all resize-y"
    }
  );
}
function SettingsView({ initialSettings, onSave, showToast }) {
  const [settings, setSettings] = useState({ ...initialSettings });
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  useEffect(() => {
    setSettings({ ...initialSettings });
    setIsDirty(false);
  }, [initialSettings]);
  const update = (field, val) => {
    setSettings((prev) => ({ ...prev, [field]: val }));
    setIsDirty(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(settings);
      setIsDirty(false);
      setSavedAt(/* @__PURE__ */ new Date());
      if (showToast) showToast("Settings saved successfully", "success");
    } catch (err) {
      if (showToast) showToast("Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    motion.form,
    {
      variants: fadeUp,
      initial: "hidden",
      animate: "show",
      onSubmit: handleSubmit,
      className: "space-y-8 pb-16",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-zinc-100", children: "Site Settings" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-zinc-500 mt-1", children: "Manage global site configuration" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            savedAt && !isDirty && /* @__PURE__ */ jsxs(
              motion.span,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "text-xs text-zinc-500",
                children: [
                  "Saved ",
                  savedAt.toLocaleTimeString()
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.button,
              {
                type: "submit",
                whileTap: { scale: 0.97 },
                disabled: saving,
                className: `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${isDirty ? "bg-indigo-500 hover:bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-400 cursor-default"}`,
                children: [
                  /* @__PURE__ */ jsx(Save, { size: 16 }),
                  saving ? "Saving..." : "Save Settings",
                  isDirty && /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-white animate-pulse" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-zinc-400 uppercase tracking-wider pb-3 border-b border-zinc-800", children: "Metadata & Header" }),
            /* @__PURE__ */ jsx(FieldGroup, { label: "Website Title", children: /* @__PURE__ */ jsx(
              TextInput,
              {
                value: settings.siteTitle,
                onChange: (v) => update("siteTitle", v),
                required: true
              }
            ) }),
            /* @__PURE__ */ jsx(FieldGroup, { label: "Default Meta Description", children: /* @__PURE__ */ jsx(
              TextArea,
              {
                value: settings.metaDescription,
                onChange: (v) => update("metaDescription", v),
                required: true
              }
            ) }),
            /* @__PURE__ */ jsx(FieldGroup, { label: "Homepage Hero Title", children: /* @__PURE__ */ jsx(
              TextInput,
              {
                value: settings.homepageHeadline,
                onChange: (v) => update("homepageHeadline", v),
                required: true
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-zinc-400 uppercase tracking-wider pb-3 border-b border-zinc-800", children: "Social Channels & Contact" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsx(FieldGroup, { label: "Instagram", children: /* @__PURE__ */ jsx(
                TextInput,
                {
                  value: settings.instagram,
                  onChange: (v) => update("instagram", v),
                  placeholder: "https://instagram.com/...",
                  required: true
                }
              ) }),
              /* @__PURE__ */ jsx(FieldGroup, { label: "Facebook", children: /* @__PURE__ */ jsx(
                TextInput,
                {
                  value: settings.facebook,
                  onChange: (v) => update("facebook", v),
                  placeholder: "https://facebook.com/...",
                  required: true
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsx(FieldGroup, { label: "Behance", children: /* @__PURE__ */ jsx(
                TextInput,
                {
                  value: settings.behance,
                  onChange: (v) => update("behance", v),
                  placeholder: "https://behance.net/...",
                  required: true
                }
              ) }),
              /* @__PURE__ */ jsx(FieldGroup, { label: "LinkedIn", children: /* @__PURE__ */ jsx(
                TextInput,
                {
                  value: settings.linkedin,
                  onChange: (v) => update("linkedin", v),
                  placeholder: "https://linkedin.com/in/...",
                  required: true
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(FieldGroup, { label: "Contact Email", children: /* @__PURE__ */ jsx(
              TextInput,
              {
                value: settings.contactEmail,
                onChange: (v) => update("contactEmail", v),
                type: "email",
                required: true
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-zinc-400 uppercase tracking-wider pb-3 border-b border-zinc-800", children: "About Page Overrides" }),
          /* @__PURE__ */ jsx(FieldGroup, { label: "About Hero Title", children: /* @__PURE__ */ jsx(
            TextInput,
            {
              value: settings.aboutHeroText,
              onChange: (v) => update("aboutHeroText", v),
              required: true
            }
          ) }),
          /* @__PURE__ */ jsx(FieldGroup, { label: "Biography Text", children: /* @__PURE__ */ jsx(
            TextArea,
            {
              value: settings.aboutBio,
              onChange: (v) => update("aboutBio", v),
              rows: 6,
              required: true
            }
          ) })
        ] })
      ]
    }
  );
}
(_I = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _I.call(globalThis, "src/admin/ToastProvider.jsx");
const ToastContext = createContext();
function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
let toastIdCount = 0;
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = "info") => {
    const id = ++toastIdCount;
    setToasts((prev) => {
      const newToasts = [{ id, message, type }, ...prev];
      return newToasts.slice(0, 5);
    });
    setTimeout(() => {
      removeToast(id);
    }, 4e3);
    return id;
  }, []);
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast2) => toast2.id !== id));
  }, []);
  const showToast = useCallback((message, type = "info") => addToast(message, type), [addToast]);
  const toast = {
    success: (message) => addToast(message, "success"),
    error: (message) => addToast(message, "error"),
    warning: (message) => addToast(message, "warning"),
    info: (message) => addToast(message, "info")
  };
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { toast, showToast }, children: [
    children,
    /* @__PURE__ */ jsx("div", { className: "fixed top-4 right-4 z-50 flex flex-col gap-2 admin-toast-container", children: /* @__PURE__ */ jsx(AnimatePresence, { children: toasts.map((t) => /* @__PURE__ */ jsx(ToastItem, { toast: t, onRemove: () => removeToast(t.id) }, t.id)) }) })
  ] });
}
function ToastItem({ toast, onRemove }) {
  const icons = {
    success: /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-500" }),
    error: /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-red-500" }),
    warning: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-amber-500" }),
    info: /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 text-blue-500" })
  };
  const bgColors = {
    success: "bg-zinc-900 border-green-500/20",
    error: "bg-zinc-900 border-red-500/20",
    warning: "bg-zinc-900 border-amber-500/20",
    info: "bg-zinc-900 border-blue-500/20"
  };
  const progressColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500"
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, x: 100, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
      transition: { type: "spring", stiffness: 300, damping: 30 },
      className: `relative overflow-hidden w-80 rounded-lg border ${bgColors[toast.type]} shadow-lg admin-toast`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start p-4 pr-10", children: [
          /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mr-3", children: icons[toast.type] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-zinc-50", children: toast.message }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onRemove,
              className: "absolute top-4 right-3 text-zinc-400 hover:text-zinc-50 transition-colors",
              children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { width: "100%" },
            animate: { width: "0%" },
            transition: { duration: 4, ease: "linear" },
            className: `absolute bottom-0 left-0 h-1 ${progressColors[toast.type]}`
          }
        )
      ]
    }
  );
}
(_J = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _J.call(globalThis, "src/admin/AdminPanel.jsx");
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const ADMIN_EMAIL = "pratikbhusal12345@gmail.com";
  const ADMIN_PASSWORD = "admin@pratik";
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("pratik_admin_auth", "true");
        setError("");
        onLogin();
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 400);
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-zinc-950 flex items-center justify-center px-6", children: /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20, scale: 0.96 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
      className: "w-full max-w-sm",
      children: /* @__PURE__ */ jsxs("div", { className: "bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl shadow-black/40", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2.5 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-indigo-500" }),
          /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-zinc-100 tracking-wide", children: "PB Admin" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold text-zinc-100", children: "Welcome back" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-zinc-500 mt-1", children: "Sign in to manage your portfolio" })
        ] }),
        error && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-4",
            children: error
          }
        ),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-zinc-500 uppercase tracking-wider", children: "Email" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                required: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "admin@example.com",
                className: "w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-zinc-500 uppercase tracking-wider", children: "Password" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "password",
                required: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "••••••••",
                className: "w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              type: "submit",
              whileTap: { scale: 0.97 },
              disabled: loading,
              className: "w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg py-3 text-sm cursor-pointer transition-colors disabled:opacity-60",
              children: loading ? "Signing in..." : "Sign In"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-zinc-600 text-center mt-6", children: "Secure admin access only" })
      ] })
    }
  ) });
}
function ContentTabView({
  type,
  data,
  isLoading,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
  onCreateNew,
  tabTitle,
  tabSubtitle,
  columns,
  searchKeys,
  emptyTitle,
  emptyDescription,
  emptyIcon,
  showToast,
  onReorder
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState(/* @__PURE__ */ new Set());
  const [deleteTarget, setDeleteTarget] = useState(null);
  const isOrderable = type === "capabilities" || type === "milestones";
  const handleSelectToggle = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleSelectAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(/* @__PURE__ */ new Set());
    } else {
      setSelectedIds(new Set(data.map((d) => d.id)));
    }
  };
  const handleBulkDelete = async () => {
    for (const id of selectedIds) {
      await onDelete({ id }, true);
    }
    setSelectedIds(/* @__PURE__ */ new Set());
  };
  const confirmDelete = (item) => {
    setDeleteTarget(item);
  };
  const executeDelete = async () => {
    if (deleteTarget) {
      await onDelete(deleteTarget);
      setDeleteTarget(null);
    }
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold text-zinc-100", children: tabTitle }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-zinc-500 mt-1", children: tabSubtitle })
          ] }),
          /* @__PURE__ */ jsxs(
            motion.button,
            {
              whileTap: { scale: 0.97 },
              onClick: onCreateNew,
              className: "flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg px-4 py-2.5 text-sm cursor-pointer transition-colors",
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-lg leading-none", children: "+" }),
                "Create New"
              ]
            }
          )
        ] }),
        !isOrderable && /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: `Search ${tabTitle.toLowerCase()}...`,
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all"
            }
          ),
          /* @__PURE__ */ jsx("svg", { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
        ] }),
        isOrderable ? /* @__PURE__ */ jsx(
          DragReorderList,
          {
            items: data,
            onReorder,
            renderItem: (item, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 group hover:border-zinc-700 transition-colors", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  type === "milestones" && /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-indigo-400 font-bold", children: item.year }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-zinc-200", children: item.name || item.title })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-zinc-500 mt-1 truncate", children: item.desc })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
                /* @__PURE__ */ jsx(
                  motion.button,
                  {
                    whileTap: { scale: 0.95 },
                    onClick: () => onEdit(item),
                    className: "p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer",
                    children: /* @__PURE__ */ jsx(Pencil, { size: 15 })
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.button,
                  {
                    whileTap: { scale: 0.95 },
                    onClick: () => confirmDelete(item),
                    className: "p-1.5 rounded-md hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer",
                    children: /* @__PURE__ */ jsx(Trash2, { size: 15 })
                  }
                )
              ] })
            ] })
          }
        ) : (
          /* Data Table for works, blog, testimonials */
          /* @__PURE__ */ jsx(
            DataTable,
            {
              columns,
              data,
              onEdit,
              onDelete: confirmDelete,
              onDuplicate,
              onToggleStatus,
              searchQuery,
              searchKeys,
              isLoading,
              emptyTitle,
              emptyDescription,
              onCreateNew,
              selectedIds,
              onSelectToggle: handleSelectToggle,
              onSelectAll: handleSelectAll
            }
          )
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: selectedIds.size > 0 && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 },
            className: "fixed bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 rounded-xl px-6 py-3 shadow-2xl shadow-black/60 flex items-center gap-4 z-50",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-zinc-300", children: [
                selectedIds.size,
                " selected"
              ] }),
              /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileTap: { scale: 0.97 },
                  onClick: handleBulkDelete,
                  className: "flex items-center gap-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-400 px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx(Trash2, { size: 14 }),
                    "Delete"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setSelectedIds(/* @__PURE__ */ new Set()),
                  className: "text-sm text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer",
                  children: "Clear"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          DeleteModal,
          {
            isOpen: !!deleteTarget,
            onClose: () => setDeleteTarget(null),
            onConfirm: executeDelete,
            itemName: (deleteTarget == null ? void 0 : deleteTarget.title) || (deleteTarget == null ? void 0 : deleteTarget.name) || "this item",
            itemType: type
          }
        )
      ]
    }
  );
}
function AdminDashboard() {
  const { showToast } = useToast();
  const [works, setWorks] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [settings, setSettings] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingItem, setEditingItem] = useState(null);
  const [editType, setEditType] = useState(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("pb_admin_sidebar_collapsed") === "true";
    }
    return false;
  });
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    const customHandler = () => setCommandPaletteOpen(true);
    window.addEventListener("keydown", handler);
    window.addEventListener("toggle-command-palette", customHandler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("toggle-command-palette", customHandler);
    };
  }, []);
  const loadData = useCallback(async () => {
    try {
      const [w, b, t, c, m, s] = await Promise.all([
        contentServices.getWorks(),
        contentServices.getBlogPosts(),
        contentServices.getTestimonials(),
        contentServices.getCapabilities(),
        contentServices.getMilestones(),
        contentServices.getSettings()
      ]);
      setWorks(w);
      setBlogs(b);
      setTestimonials(t);
      setCapabilities(c);
      setMilestones(m);
      setSettings(s || {});
    } catch (err) {
      console.error("Error loading admin data:", err);
      showToast("Failed to load data", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);
  useEffect(() => {
    loadData();
  }, [loadData]);
  const handleCreateNew = useCallback((type) => {
    const templates = {
      works: {
        title: "",
        slug: "",
        client: "",
        category: "BRAND IDENTITY & REBRANDING",
        tag: "TRANSFORMATION",
        bgWord: "",
        tagline: "",
        year: (/* @__PURE__ */ new Date()).getFullYear().toString(),
        services: [],
        image: "",
        gallery: [],
        sections: [],
        challenge: "",
        approach: "",
        solution: "",
        results: "",
        status: "Draft",
        index: (works.length + 1).toString().padStart(2, "0")
      },
      blog: {
        title: "",
        slug: "",
        excerpt: "",
        category: "Design",
        publishDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        content: "",
        featuredImage: "",
        image: "",
        status: "Draft",
        imageAlt: "",
        seoTitle: "",
        seoDescription: "",
        readTime: "5 min read"
      },
      testimonials: {
        name: "",
        role: "",
        company: "",
        quote: "",
        order: testimonials.length + 1,
        status: "Published",
        avatarImage: ""
      },
      capabilities: {
        name: "",
        desc: "",
        order: capabilities.length + 1
      },
      milestones: {
        year: (/* @__PURE__ */ new Date()).getFullYear().toString(),
        title: "",
        desc: "",
        order: milestones.length + 1
      }
    };
    const mappedType = type === "blog" ? "blogs" : type;
    setEditType(mappedType);
    setEditingItem(templates[type] || templates[mappedType] || {});
  }, [works.length, testimonials.length, capabilities.length, milestones.length]);
  const handleNavigate = useCallback((tab, action) => {
    setActiveTab(tab);
    setEditingItem(null);
    setEditType(null);
    if (action === "new") {
      setTimeout(() => {
        handleCreateNew(tab);
      }, 50);
    }
  }, [handleCreateNew]);
  const handleCommandNavigate = useCallback((tab, item) => {
    setCommandPaletteOpen(false);
    setActiveTab(tab);
    if (item === "new") {
      setEditingItem(null);
      setEditType(null);
      setTimeout(() => handleCreateNew(tab), 50);
    } else if (item && typeof item === "object") {
      setEditType(tab === "blog" ? "blogs" : tab);
      setEditingItem(item);
    } else {
      setEditingItem(null);
      setEditType(null);
    }
  }, [handleCreateNew]);
  const handleSave = useCallback(async (data) => {
    try {
      if (editType === "works") {
        await contentServices.saveWork(data);
      } else if (editType === "blogs") {
        await contentServices.saveBlogPost(data);
      } else if (editType === "testimonials") {
        await contentServices.saveTestimonial(data);
      } else if (editType === "capabilities") {
        await contentServices.saveCapability(data);
      } else if (editType === "milestones") {
        await contentServices.saveMilestone(data);
      }
      setEditingItem(null);
      setEditType(null);
      showToast("Saved successfully", "success");
      loadData();
    } catch (err) {
      showToast("Failed to save — please try again", "error");
      console.error(err);
    }
  }, [editType, works, blogs, testimonials, capabilities, milestones, showToast, loadData]);
  const handleDelete = useCallback(async (item, skipToast) => {
    try {
      const type = activeTab;
      if (type === "works") {
        setWorks((prev) => prev.filter((w) => w.id !== item.id));
        await contentServices.deleteWork(item.id);
      } else if (type === "blog") {
        setBlogs((prev) => prev.filter((b) => b.id !== item.id));
        await contentServices.deleteBlogPost(item.id);
      } else if (type === "testimonials") {
        setTestimonials((prev) => prev.filter((t) => t.id !== item.id));
        await contentServices.deleteTestimonial(item.id);
      } else if (type === "capabilities") {
        setCapabilities((prev) => prev.filter((c) => c.id !== item.id));
        await contentServices.deleteCapability(item.id);
      } else if (type === "milestones") {
        setMilestones((prev) => prev.filter((m) => m.id !== item.id));
        await contentServices.deleteMilestone(item.id);
      }
      if (!skipToast) showToast("Deleted successfully", "success");
    } catch (err) {
      showToast("Failed to delete", "error");
      loadData();
    }
  }, [activeTab, showToast, loadData]);
  const handleDuplicate = useCallback((item) => {
    const copy = { ...item, id: void 0, title: `${item.title || item.name} (Copy)`, slug: item.slug ? `${item.slug}-copy` : void 0 };
    if (copy.name) copy.name = `${item.name} (Copy)`;
    setEditType(activeTab === "blog" ? "blogs" : activeTab);
    setEditingItem(copy);
  }, [activeTab]);
  const handleToggleStatus = useCallback(async (item) => {
    const newStatus = item.status === "Published" ? "Draft" : "Published";
    const updated = { ...item, status: newStatus };
    try {
      if (activeTab === "works") {
        setWorks((prev) => prev.map((w) => w.id === item.id ? updated : w));
        await contentServices.saveWork(updated);
      } else if (activeTab === "blog") {
        setBlogs((prev) => prev.map((b) => b.id === item.id ? updated : b));
        await contentServices.saveBlogPost(updated);
      } else if (activeTab === "testimonials") {
        setTestimonials((prev) => prev.map((t) => t.id === item.id ? updated : t));
        await contentServices.saveTestimonial(updated);
      }
      showToast(`${newStatus === "Published" ? "Published" : "Unpublished"} successfully`, "success");
    } catch (err) {
      showToast("Failed to update status", "error");
      loadData();
    }
  }, [activeTab, showToast, loadData]);
  const handleReorder = useCallback(async (newItems) => {
    const reordered = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
    try {
      if (activeTab === "capabilities") {
        setCapabilities(reordered);
        for (const item of reordered) {
          await contentServices.saveCapability(item);
        }
      } else if (activeTab === "milestones") {
        setMilestones(reordered);
        for (const item of reordered) {
          await contentServices.saveMilestone(item);
        }
      }
      showToast("Order updated", "success");
    } catch (err) {
      showToast("Failed to reorder", "error");
      loadData();
    }
  }, [activeTab, showToast, loadData]);
  const handleSaveSettings = useCallback(async (newSettings) => {
    await contentServices.saveSettings(newSettings);
    setSettings(newSettings);
  }, []);
  const handleToggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("pb_admin_sidebar_collapsed", String(next));
      return next;
    });
  }, []);
  const worksColumns = useMemo(() => [
    { key: "index", label: "#", sortable: true },
    { key: "title", label: "Title", sortable: true, render: (v) => /* @__PURE__ */ jsx("span", { className: "font-medium text-zinc-100", children: v }) },
    { key: "client", label: "Client", sortable: true },
    { key: "year", label: "Year", sortable: true },
    { key: "status", label: "Status", sortable: true }
  ], []);
  const blogColumns = useMemo(() => [
    { key: "title", label: "Title", sortable: true, render: (v) => /* @__PURE__ */ jsx("span", { className: "font-medium text-zinc-100", children: v }) },
    { key: "category", label: "Category", sortable: true },
    { key: "publishDate", label: "Published", sortable: true },
    { key: "status", label: "Status", sortable: true }
  ], []);
  const testimonialColumns = useMemo(() => [
    { key: "order", label: "#", sortable: true },
    { key: "name", label: "Client", sortable: true, render: (v) => /* @__PURE__ */ jsx("span", { className: "font-medium text-zinc-100", children: v }) },
    { key: "company", label: "Company", sortable: true },
    { key: "quote", label: "Quote", render: (v) => /* @__PURE__ */ jsx("span", { className: "text-zinc-500 truncate max-w-xs block", children: v }) },
    { key: "status", label: "Status", sortable: true }
  ], []);
  const renderContent = () => {
    if (editingItem) {
      return /* @__PURE__ */ jsx(
        EditForm,
        {
          item: editingItem,
          type: editType,
          onCancel: () => {
            setEditingItem(null);
            setEditType(null);
          },
          onSave: handleSave,
          allWorks: works,
          allBlogs: blogs
        },
        editingItem.id || "new"
      );
    }
    switch (activeTab) {
      case "dashboard":
        return /* @__PURE__ */ jsx(
          DashboardView,
          {
            works,
            blogs,
            testimonials,
            capabilities,
            milestones,
            isLoading,
            onNavigate: handleNavigate,
            supabaseConnected: !!supabase
          }
        );
      case "works":
        return /* @__PURE__ */ jsx(
          ContentTabView,
          {
            type: "works",
            data: works,
            isLoading,
            onEdit: (item) => {
              setEditType("works");
              setEditingItem(item);
            },
            onDelete: handleDelete,
            onDuplicate: handleDuplicate,
            onToggleStatus: handleToggleStatus,
            onCreateNew: () => handleCreateNew("works"),
            tabTitle: "Works & Case Studies",
            tabSubtitle: "Manage your portfolio projects",
            columns: worksColumns,
            searchKeys: ["title", "client"],
            emptyTitle: "No works yet",
            emptyDescription: "Create your first case study to showcase your design projects.",
            emptyIcon: Briefcase,
            showToast
          }
        );
      case "blog":
        return /* @__PURE__ */ jsx(
          ContentTabView,
          {
            type: "blog",
            data: blogs,
            isLoading,
            onEdit: (item) => {
              setEditType("blogs");
              setEditingItem(item);
            },
            onDelete: handleDelete,
            onDuplicate: handleDuplicate,
            onToggleStatus: handleToggleStatus,
            onCreateNew: () => handleCreateNew("blog"),
            tabTitle: "Blog Posts",
            tabSubtitle: "Manage your journal writings",
            columns: blogColumns,
            searchKeys: ["title", "category"],
            emptyTitle: "No blog posts yet",
            emptyDescription: "Start writing your first article about design.",
            emptyIcon: FileText,
            showToast
          }
        );
      case "testimonials":
        return /* @__PURE__ */ jsx(
          ContentTabView,
          {
            type: "testimonials",
            data: testimonials,
            isLoading,
            onEdit: (item) => {
              setEditType("testimonials");
              setEditingItem(item);
            },
            onDelete: handleDelete,
            onDuplicate: handleDuplicate,
            onToggleStatus: handleToggleStatus,
            onCreateNew: () => handleCreateNew("testimonials"),
            tabTitle: "Testimonials",
            tabSubtitle: "Manage client reviews",
            columns: testimonialColumns,
            searchKeys: ["name", "company"],
            emptyTitle: "No testimonials yet",
            emptyDescription: "Add client feedback to build trust on your portfolio.",
            emptyIcon: MessageSquareQuote,
            showToast
          }
        );
      case "capabilities":
        return /* @__PURE__ */ jsx(
          ContentTabView,
          {
            type: "capabilities",
            data: capabilities,
            isLoading,
            onEdit: (item) => {
              setEditType("capabilities");
              setEditingItem(item);
            },
            onDelete: handleDelete,
            onCreateNew: () => handleCreateNew("capabilities"),
            onReorder: handleReorder,
            tabTitle: "Capabilities",
            tabSubtitle: "Manage your skill areas — drag to reorder",
            emptyTitle: "No capabilities yet",
            emptyDescription: "Add your design capabilities and expertise.",
            emptyIcon: Zap,
            showToast
          }
        );
      case "milestones":
        return /* @__PURE__ */ jsx(
          ContentTabView,
          {
            type: "milestones",
            data: milestones,
            isLoading,
            onEdit: (item) => {
              setEditType("milestones");
              setEditingItem(item);
            },
            onDelete: handleDelete,
            onCreateNew: () => handleCreateNew("milestones"),
            onReorder: handleReorder,
            tabTitle: "Milestones",
            tabSubtitle: "Manage your journey timeline — drag to reorder",
            emptyTitle: "No milestones yet",
            emptyDescription: "Add your career journey and key milestones.",
            emptyIcon: Clock,
            showToast
          }
        );
      case "settings":
        return /* @__PURE__ */ jsx(
          SettingsView,
          {
            initialSettings: settings,
            onSave: handleSaveSettings,
            showToast
          }
        );
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "h-screen w-full overflow-hidden bg-zinc-950 text-zinc-200 flex admin-panel", children: [
    /* @__PURE__ */ jsx(
      AdminSidebar,
      {
        activeTab,
        onTabChange: (tab) => {
          setActiveTab(tab);
          setEditingItem(null);
          setEditType(null);
        },
        isCollapsed: sidebarCollapsed,
        onToggleCollapse: handleToggleSidebar
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col h-screen overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        AdminTopBar,
        {
          onOpenCommandPalette: () => setCommandPaletteOpen(true),
          activeTab
        }
      ),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto p-6 lg:p-8", children: /* @__PURE__ */ jsx("div", { className: "max-w-6xl", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          transition: { duration: 0.15 },
          children: renderContent()
        },
        editingItem ? "edit" : activeTab
      ) }) }) })
    ] }),
    /* @__PURE__ */ jsx(
      CommandPalette,
      {
        isOpen: commandPaletteOpen,
        onClose: () => setCommandPaletteOpen(false),
        onNavigate: handleCommandNavigate,
        works,
        blogs,
        testimonials
      }
    )
  ] });
}
function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("pratik_admin_auth") === "true";
    }
    return false;
  });
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx(LoginScreen, { onLogin: () => setIsAuthenticated(true) });
  }
  return /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsx(AdminDashboard, {}) });
}
(_K = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _K.call(globalThis, "src/routes.jsx");
function HomeRoute() {
  const { works, testimonials, settings } = useContent();
  const publicWorks = works.filter((w) => w.status !== "Draft");
  const publicTestimonials = testimonials.filter((t) => t.status !== "Draft");
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
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Home",
        description: "Explore Selected branding visual identities, structural publishing editorial layouts, dynamic social campaigns, and premium packaging by Pratik Bhusal.",
        url: "https://pratikbhusal.com",
        ogType: "website",
        jsonLd: homeJsonLd
      }
    ),
    /* @__PURE__ */ jsx(Hero, { initialSettings: settings }),
    /* @__PURE__ */ jsx(SectionTwo, {}),
    /* @__PURE__ */ jsx(WorksSection, { initialWorks: publicWorks }),
    /* @__PURE__ */ jsx(RevealMechanicsSection, {}),
    /* @__PURE__ */ jsx(AboutSection, { initialSettings: settings }),
    /* @__PURE__ */ jsx(PhilosophySection, {}),
    /* @__PURE__ */ jsx(ExpertiseSection, {}),
    /* @__PURE__ */ jsx(TestimonialsSection, { initialTestimonials: publicTestimonials }),
    /* @__PURE__ */ jsx(ContactSection, { initialSettings: settings })
  ] });
}
function AboutRoute() {
  const { capabilities, milestones, settings } = useContent();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "About — Pratik Bhusal | Brand & Visual Designer",
        description: "Learn about the design philosophy, milestones, and capabilities of Pratik Bhusal, a professional visual designer based in Nepal.",
        url: "https://pratikbhusal.com/about",
        ogType: "website"
      }
    ),
    /* @__PURE__ */ jsx(
      AboutPage,
      {
        initialCapabilities: capabilities,
        initialMilestones: milestones,
        initialSettings: settings
      }
    )
  ] });
}
function WorksListingRoute() {
  const { works } = useContent();
  const publicWorks = works.filter((w) => w.status !== "Draft");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Selected Works & Case Studies",
        description: "Curated visual systems, brand design, packaging solutions, and editorial typography by Pratik Bhusal.",
        url: "https://pratikbhusal.com/works",
        ogType: "website"
      }
    ),
    /* @__PURE__ */ jsx(WorksListing, { initialWorks: publicWorks })
  ] });
}
function WorkPostRoute() {
  const { works } = useContent();
  const publicWorks = works.filter((w) => w.status !== "Draft");
  const { slug } = useParams();
  const work = publicWorks.find((w) => w.slug === slug);
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
  } : null;
  const breadcrumbJsonLd = work ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pratikbhusal.com" },
      { "@type": "ListItem", "position": 2, "name": "Works", "item": "https://pratikbhusal.com/works" },
      { "@type": "ListItem", "position": 3, "name": work.title, "item": `https://pratikbhusal.com/works/${work.slug}` }
    ]
  } : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    work && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        SEO,
        {
          title: work.seoTitle || work.title,
          description: work.seoDescription || work.tagline || work.subtitle,
          ogImage: work.image,
          url: `https://pratikbhusal.com/works/${work.slug}`,
          jsonLd: creativeWorkJsonLd
        }
      ),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) })
    ] }),
    /* @__PURE__ */ jsx(WorkPost, { initialWorks: publicWorks, slug })
  ] });
}
function BlogListingRoute() {
  const { blogs } = useContent();
  const publicBlogs = blogs.filter((b) => b.status !== "Draft");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Journal & Writings",
        description: "Read essays on design philosophy, packaging guidelines, typographic architecture, and creative case studies.",
        url: "https://pratikbhusal.com/blog",
        ogType: "website"
      }
    ),
    /* @__PURE__ */ jsx(BlogListing, { initialBlogs: publicBlogs })
  ] });
}
function BlogPostRoute() {
  const { blogs } = useContent();
  const publicBlogs = blogs.filter((b) => b.status !== "Draft");
  const { slug } = useParams();
  const post = publicBlogs.find((p) => p.slug === slug);
  const blogJsonLd = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.seoTitle || post.title,
    "image": post.image,
    "datePublished": post.publishDate || post.date || (/* @__PURE__ */ new Date()).toISOString(),
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
  } : null;
  const breadcrumbJsonLd = post ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pratikbhusal.com" },
      { "@type": "ListItem", "position": 2, "name": "Journal", "item": "https://pratikbhusal.com/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://pratikbhusal.com/blog/${post.slug}` }
    ]
  } : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    post && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        SEO,
        {
          title: post.seoTitle || post.title,
          description: post.seoDescription || post.excerpt,
          ogImage: post.image,
          ogType: "article",
          url: `https://pratikbhusal.com/blog/${post.slug}`,
          jsonLd: blogJsonLd
        }
      ),
      /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(breadcrumbJsonLd) })
    ] }),
    /* @__PURE__ */ jsx(BlogPost, { initialBlogs: publicBlogs, slug })
  ] });
}
function AdminRoute() {
  return /* @__PURE__ */ jsx(AdminPanel, {});
}
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(HomeRoute, {})
  },
  {
    path: "/about",
    element: /* @__PURE__ */ jsx(AboutRoute, {})
  },
  {
    path: "/works",
    element: /* @__PURE__ */ jsx(WorksListingRoute, {})
  },
  {
    path: "/works/:slug",
    element: /* @__PURE__ */ jsx(WorkPostRoute, {})
  },
  {
    path: "/blog",
    element: /* @__PURE__ */ jsx(BlogListingRoute, {})
  },
  {
    path: "/blog/:slug",
    element: /* @__PURE__ */ jsx(BlogPostRoute, {})
  },
  {
    path: "/admin",
    element: /* @__PURE__ */ jsx(AdminRoute, {})
  },
  {
    path: "/admin/*",
    element: /* @__PURE__ */ jsx(AdminRoute, {})
  }
];
(_L = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _L.call(globalThis, "src/main.jsx");
const createRoot = ViteReactSSG(
  {
    routes,
    RootComponent: App
  }
);
export {
  createRoot
};
