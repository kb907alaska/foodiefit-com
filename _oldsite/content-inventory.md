# Foodie Fit — Legacy Content Inventory & Audit Report

**Original Site**: https://foodiefit.com/  
**Date of Audit**: July 25, 2026  
**Auditor**: Foodie Fit Redesign Team

---

## 1. Page Inventory & Canonical URLs

| Legacy URL | Page Title | Meta Description | Target Redesign Route | Audit Notes |
|------------|------------|------------------|----------------------|-------------|
| `https://foodiefit.com/` | Foodie Fit | Healthy Never Tasted This Good. Fresh meal prep in Las Vegas. | `/` | Hero section, locations list, featured meals, subscription promo. |
| `https://foodiefit.com/order/` | Foodie Fit Meal Ordering | Order healthy meals online for pickup or delivery in Las Vegas. | `/menu/` & `https://foodiefit.com/order/` | Legacy WordPress ordering app. Interfaced via configurable `PUBLIC_ORDER_URL`. |
| `https://foodiefit.com/how-it-works/` | How It Works | How Foodie Fit meal prep works. | `/how-it-works/` | Pick date, pick meals, delivery or store pickup. |
| `https://foodiefit.com/delivery/` | Delivery | Local Las Vegas meal delivery info. | `/delivery/` | Next-day delivery details, local Las Vegas ZIP codes. |
| `https://foodiefit.com/subscriptions/` | Subscriptions | Foodie Fit weekly meal subscription plans. | `/subscriptions/` | Recurring orders, pause/skip anytime. |
| `https://foodiefit.com/locations/` | Store Locations | Foodie Fit stores in Las Vegas & Henderson. | `/locations/` | Green Valley, Summerlin, Northwest. |
| `https://foodiefit.com/locations/green-valley/` | Green Valley Store | 2185 E Windmill Ln #100, Las Vegas, NV 89123 | `/locations/green-valley/` | Corrected text: 3 locations (previously incorrectly said 2). |
| `https://foodiefit.com/locations/summerlin/` | Summerlin Store | 4235 S Fort Apache Rd #220, Las Vegas, NV 89147 | `/locations/summerlin/` | Hours: 8 AM–8 PM daily. |
| `https://foodiefit.com/locations/northwest/` | Northwest Store | 7085 W Ann Rd #140, Las Vegas, NV 89130 | `/locations/northwest/` | Storefront pickup and grab-and-go details. |
| `https://foodiefit.com/corporate-meals/` | Corporate Meals | Office lunch programs & corporate drops. | `/corporate-meals/` | Fixed typo: "Foward To" -> "Forward To". |
| `https://foodiefit.com/custom-meals/` | Custom Meals | Build your own meal prep. | `/custom-meals/` | Custom protein, carb, veg selections by the ounce. |
| `https://foodiefit.com/by-the-pound/` | By The Pound | Bulk meal prep protein and sides. | `/by-the-pound/` | Bulk chicken, steak, rice, roasted veggies. |
| `https://foodiefit.com/gift-cards/` | Gift Cards | Foodie Fit gift certificates. | `/gift-cards/` | E-gift cards for friends and family. |
| `https://foodiefit.com/rewards-referrals/` | Rewards & Referrals | Give $10, Get $10 referral program. | `/rewards-referrals/` | Loyalty points and friend referral credits. |
| `https://foodiefit.com/about/` | About Us | Chef-crafted meals made fresh daily in Las Vegas. | `/about/` | Founder story, kitchen team, food philosophy. |
| `https://foodiefit.com/faqs/` | FAQs | Frequently asked questions about Foodie Fit. | `/faq/` | Categorized answers for delivery, store pickup, macros. |
| `https://foodiefit.com/contact/` | Contact Us | Get in touch with Foodie Fit. | `/contact/` | Customer service form and store direct phone lines. |
| `https://foodiefit.com/blog/` | Blog | Nutrition and meal prep tips in Las Vegas. | `/blog/` | Clean Astro Content Collection implementation. |

---

## 2. Identified Copy & Operational Errors Corrected

1. **Grammar Correction**: `"Meals in hand, just few clicks away."` ➔ Corrected to `"Chef-crafted meals, just a few clicks away."`
2. **Notification Copy Fix**: `"Get a text you when your order..."` ➔ Corrected to `"Get a text update when your order is ready or out for delivery."`
3. **Typo Fix**: `"Office Lunch Your Team Looks Foward To."` ➔ Corrected to `"Office Lunch Your Team Looks Forward To."`
4. **Store Count Inconsistency**: Legacy Green Valley page referenced "two Las Vegas locations", but business now operates **three active retail stores** (Green Valley, Summerlin, Northwest).
5. **Metadata Cleanup**: Omitted legacy WordPress author profiles (`admin`, `wp-user`), publication dates, and theme tags from user-facing UI.

---

## 3. Verified Operational Facts

- **3 Retail Stores**:
  1. Green Valley: 2185 E Windmill Ln #100, Las Vegas, NV 89123 | (702) 844-8848
  2. Summerlin: 4235 S Fort Apache Rd #220, Las Vegas, NV 89147 | (702) 844-8848
  3. Northwest: 7085 W Ann Rd #140, Las Vegas, NV 89130 | (702) 844-8848
- **Hours**: All 3 storefronts open daily 8:00 AM – 8:00 PM.
- **Menu Specs**: 30+ rotating items, updated approx. every 2 weeks. Never intentionally frozen.
- **Delivery**: As early as next day for orders placed before cutoff (6:00 PM). Delivery to Greater Las Vegas & Henderson ZIP codes.
- **Order Minimums**: No minimum order requirement.
