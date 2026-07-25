# Foodie Fit — Production Astro 7 Website Redesign

> **"Healthy Never Tasted This Good."**  
> Chef-crafted meals made fresh daily in Las Vegas. Delivered as early as tomorrow or ready at one of three local stores.

---

## Technical Stack Overview

- **Framework**: [Astro 7](https://astro.build/) (Static Site Generation / Cloudflare Pages)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom design system variables (`src/styles/global.css`)
- **Adapter**: `@astrojs/cloudflare` for Cloudflare Pages deployment
- **Content Collections**: Astro Content Collections (`locations`, `faqs`, `blog`, `legal`)
- **Icons**: Lucide Astro / Clean SVG icons
- **Data Layer**: Structured TypeScript menu dataset (`src/data/meals.ts`)

---

## Project Architecture

```text
foodiefit-com/
├── _oldsite/                    # Audit & legacy site documentation
│   ├── content-inventory.md    # Legacy URL audit & copy corrections
│   ├── redirects.json           # 301 redirect map
│   └── sitemap.json             # Original site map
├── public/
│   ├── _headers                 # Security headers & CSP rules
│   ├── _redirects               # Cloudflare Pages 301 redirect rules
│   ├── favicon.svg              # Brand icon
│   └── robots.txt               # Search engine directives
├── src/
│   ├── components/
│   │   ├── forms/              # Corporate & contact forms with honeypot
│   │   ├── global/             # AnnouncementBar, Header, MobileNav, Footer, Breadcrumbs
│   │   ├── home/               # Hero, Craveability, GoalSelector, MacroFinder, Comparison, etc.
│   │   ├── locations/          # Store cards, hours status calculation, directions
│   │   ├── menu/               # MealGrid, MealCard, MenuFilters, MenuToolbar, MacroTable
│   │   └── seo/                # SEO metadata & JSON-LD StructuredData
│   ├── config/
│   │   └── commerce.ts         # Environment variables & store defaults
│   ├── content/                # Content Collections (locations, faqs, blog, legal)
│   ├── data/
│   │   └── meals.ts            # 24+ structured chef-crafted meal records
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Global site shell layout
│   │   └── ArticleLayout.astro # Blog & legal article layout
│   ├── lib/
│   │   └── commerce/           # Demo & External commerce adapters
│   └── styles/
│       └── global.css          # Design tokens & clamp typography
└── package.json
```

---

## Environment Variables

Configure these variables in your deployment environment or `.env`:

```bash
PUBLIC_ORDER_URL=https://foodiefit.com/order/
PUBLIC_ACCOUNT_URL=https://foodiefit.com/user/
PUBLIC_CORPORATE_FORM_ENDPOINT=
PUBLIC_SITE_URL=https://foodiefit.com
PUBLIC_GA_ID=
```

---

## Commerce Integration Status

1. **Ordering & Accounts**: Real "Order Now" and "Account" actions route to `PUBLIC_ORDER_URL` (`https://foodiefit.com/order/`).
2. **Local Menu Demo**: Filtering, searching, macro sliders, portion toggling (Lean vs Bulk), and side-by-side comparison tables operate using structured data in `src/data/meals.ts`.
3. **Phase Two API Readiness**: The adapter layer (`src/lib/commerce/`) isolates all product and cart lookups, allowing an API client to replace static demo data seamlessly.

---

## Local Development & Build Commands

```bash
# Install dependencies
npm install

# Run Astro check & TypeScript validation
npm run check

# Start development server
npm run dev

# Build production bundle for Cloudflare Pages
npm run build
```
