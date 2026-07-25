# Foodie Fit — Production Astro 7 Website Redesign & SEO/AEO System

> **"Healthy Never Tasted This Good."**  
> Chef-crafted meals made fresh daily in Las Vegas. Delivered as early as tomorrow or ready at one of three local stores.

- **GitHub Repository**: [https://github.com/kb907alaska/foodiefit-com](https://github.com/kb907alaska/foodiefit-com)
- **Live Cloudflare Deployment**: [https://foodiefit-com.pages.dev/](https://foodiefit-com.pages.dev/)

---

## Technical Stack & Features

- **Framework**: [Astro 7](https://astro.build/) (Static Site Generation / Cloudflare Pages)
- **Language**: TypeScript (Strict Mode clean)
- **Styling**: Vanilla CSS + Tailwind CSS design system
- **Adapter**: `@astrojs/cloudflare`
- **Commerce Backend**: **Meal Prep Tech (MPT)** Production API integration (`https://mptapi20170804072902.azurewebsites.net`)
- **Live Catalog**: **376 live Foodie Fit items** with exact macro profiles, portion options (Lean vs Bulk), ingredient specs, allergens, and high-res photos
- **SEO/AEO/GEO**: **100 Interconnected Customer & Answer-Engine Resources** (DirectAnswer modules, Google Merchant Center XML feed, ZIP-code checker, interactive calculators, local lunch survey report)

---

## Cloudflare Pages Deployment Configuration

In the Cloudflare Dashboard (**Workers & Pages** -> **Create Application** -> **Pages** -> **Connect Git**):

1. **Repository**: `kb907alaska/foodiefit-com`
2. **Framework Preset**: `Astro`
3. **Build Command**: `npm run build`
4. **Build Output Directory**: `dist`
5. **Root Directory**: `./`

### Environment Variables

Add the following under **Settings** -> **Environment variables**:

```bash
PUBLIC_ORDER_URL=https://foodiefit.com/order/
PUBLIC_ACCOUNT_URL=https://foodiefit.com/user/
PUBLIC_SITE_URL=https://foodiefit.com
PUBLIC_MEALPREP_CLIENT_KEY=ODc5YmNmYTktMWFlNS00ZDBmLTljNjMtNTUzZTBiYWZkNTQ3OmFhNmJiMWNkLTRjMjQtNGJlMS1iNDMzLThmMWNmYzFhMzJlNA==
MEALPREP_API_KEY=ODc5YmNmYTktMWFlNS00ZDBmLTljNjMtNTUzZTBiYWZkNTQ3OmFhNmJiMWNkLTRjMjQtNGJlMS1iNDMzLThmMWNmYzFhMzJlNA==
```

---

## Project Structure

```text
foodiefit-com/
├── _oldsite/                    # Audit & legacy site documentation
├── public/
│   ├── _headers                 # Cloudflare security headers & CSP rules
│   ├── _redirects               # Cloudflare Pages 301 1-to-1 redirect rules
│   ├── images/meals/            # 376 downloaded high-res meal photos
│   └── robots.txt               # Search engine crawl directives
├── src/
│   ├── components/
│   │   ├── forms/              # Corporate & contact forms with bot protection
│   │   ├── global/             # AnnouncementBar, Header, MobileNav, Footer, Breadcrumbs
│   │   ├── home/               # Hero, Craveability, GoalSelector, MacroFinder, Comparison, etc.
│   │   ├── locations/          # Store cards with live 8 AM - 8 PM status
│   │   ├── menu/               # MealGrid, MealCard, MenuFilters, MenuToolbar, MacroTable
│   │   └── seo/                # DirectAnswer AEO module & linked JSON-LD Entity Graph
│   ├── config/
│   │   └── commerce.ts         # Environment variables & store location defaults
│   ├── content/                # Content Collections (locations, faqs, blog, legal)
│   ├── data/
│   │   ├── meals.ts            # 376 live Foodie Fit meal records with macros & photos
│   │   ├── mpt-live-products.json # Raw MPT API products response
│   │   └── mpt-live-company.json  # Raw MPT API company configuration
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Global site shell layout
│   │   └── ArticleLayout.astro # Blog & legal article layout
│   ├── lib/
│   │   └── commerce/           # MPT API adapter & external links
│   ├── pages/
│   │   ├── calculators/        # Interactive cost & meal quantity calculators
│   │   ├── delivery/           # Las Vegas neighborhood delivery network pages
│   │   ├── delivery-areas/     # Delivery Hub with Instant ZIP Code Checker
│   │   ├── guides/             # Category, portion, allergen, and macro guides
│   │   ├── reports/            # Annual Las Vegas Lunch-Habits Survey Report
│   │   ├── merchant-center-feed.xml.ts # Google Merchant Center XML Feed Generator
│   │   └── sitemap-index.xml.ts # Dynamic XML Sitemap Generator
│   └── styles/
│       └── global.css          # Design tokens & clamp typography
└── package.json
```

---

## Local Development & Build Commands

```bash
# Install dependencies
npm install

# Run Astro check & TypeScript validation (0 errors across 105 files)
npm run check

# Start development server
npm run dev

# Build production bundle for Cloudflare Pages (Prerenders 440+ pages in ~15s)
npm run build
```
