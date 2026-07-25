# Foodie Fit — 20-Point API-Driven Architecture Specification

## Architecture Overview

**Astro 7 + Tailwind Public Website → Cloudflare Integration Layer → Meal Prep Tech Ordering System**

The Foodie Fit platform delivers a high-performance, conversion-focused, secure web application. Live menu items, pricing, macros, ingredients, and photos are driven automatically via the **Meal Prep Tech (MPT) Production API**, eliminating the need for a legacy WordPress CMS or manual database entry.

---

## The 20 Architectural Pillars & Implementation Matrix

### 1. Ultra-Fast Load Speeds
- **Implementation**: Static Site Generation (SSG) via Astro 7. Zero PHP, database queries, or page-builder overhead at runtime.
- **Result**: Sub-second TTFB and global CDN edge distribution via Cloudflare Pages.

### 2. Target 95–100 PageSpeed Scores
- **Implementation**: Pre-rendered HTML, inline critical CSS via Tailwind, zero blocking scripts, and WebP image optimization.

### 3. Reduced Security Attack Surface
- **Implementation**: Zero public WordPress login (`/wp-login.php`), zero PHP files, zero database query vectors. All outbound commerce links validated against `CommerceUrlAllowlist`.

### 4. Zero Plugin Dependency Conflicts
- **Implementation**: Native Astro components replace Porto, WPBakery, Contact Form 7, and third-party WordPress plugins.

### 5. Secure MPT API Integration Layer
- **Implementation**: Server-side credentials (`MEALPREP_API_KEY`) and proxy adapters (`src/lib/commerce/`) isolate raw API keys from client HTML bundles.

### 6. Enhanced Mobile Ordering & UX
- **Implementation**: Sticky mobile bottom navigation, touch-optimized portion toggles (Lean vs Bulk), sticky filter toolbars, and instant ZIP-code checkers.

### 7. Immediate Menu Synchronization
- **Implementation**: 376 live items populated automatically from MPT Azure API (`/products/all`), updating calories, protein, carbs, fat, pricing, and availability.

### 8. Multi-Dimensional Meal Filtering
- **Implementation**: Instant client-side macro sliders (calories, protein, carbs, fat), dietary preference checkboxes (Gluten-Free, Dairy-Free, Keto, High-Protein), and category tabs (Active, Low-Carb, Breakfast, Snacks).

### 9. Indexable Individual Meal Pages
- **Implementation**: Dynamic Astro route `/menu/[slug]/` generating 376 permanent SEO URLs with full macro breakdowns, ingredient lists, allergen warnings, heating instructions, and JSON-LD Product schema.

### 10. High-Intent Local SEO Infrastructure
- **Implementation**: Dedicated high-converting local landing pages for Green Valley, Summerlin, Northwest Las Vegas, Henderson, Enterprise, Spring Valley, Centennial Hills, and North Las Vegas.

### 11. Complete Schema.org Structured Data
- **Implementation**: `StructuredData.astro` rendering linked JSON-LD for `Organization`, `LocalBusiness`, `Product`, `Offer`, `FAQPage`, `BreadcrumbList`, and `Article`.

### 12. Answer Engine & AI Visibility (AEO/GEO)
- **Implementation**: Direct-answer AEO components (`DirectAnswer.astro`), Google Merchant Center RSS/XML feed (`/merchant-center-feed.xml`), and 100 interconnected customer guides.

### 13. WCAG 2.2 AA Accessibility Standards
- **Implementation**: Focus rings, skip-to-content links (`#main-content`), high-contrast color tokens, ARIA labels, and `prefers-reduced-motion` CSS rules.

### 14. Automatic Responsive Image Optimization
- **Implementation**: Pre-sized WebP photos, explicit `width`/`height` attributes, lazy loading (`loading="lazy"`), and descriptive alt text for all 376 live meal photos.

### 15. Zero Layout Shifting (CLS = 0)
- **Implementation**: Aspect-ratio containers and reserved bounding boxes ensuring smooth, shift-free page rendering.

### 16. API-Driven Catalog Engine (No CMS Needed)
- **Implementation**: Replaces manual CMS data entry by ingesting live product records, variations, and specs directly from MPT API.

### 17. E-Commerce Conversion & Event Tracking
- **Implementation**: Native `dataLayer` event dispatches for menu views, filter selections, macro calculator completions, and checkout handoffs.

### 18. Privacy-Conscious Third-Party Script Control
- **Implementation**: Analytics scripts (GA4, Meta, TikTok, Klaviyo) load only when required, adhering to CSP directives in `public/_headers`.

### 19. Enterprise Cloudflare Security & Edge Delivery
- **Implementation**: Automated preview builds, 1-click rollbacks, strict Content Security Policy (`object-src 'none'`, `frame-ancestors 'none'`), and Turnstile bot protection.

### 20. Modular Component Scalability
- **Implementation**: Reusable Astro components allowing seamless addition of new retail locations, B2B corporate meal programs, and nutrition calculators.
