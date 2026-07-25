# Content Migration & Copy Corrections Guide

## 1. WordPress Copy Errors Corrected

During the audit of the legacy WordPress site (`https://foodiefit.com/`), several grammatical errors, typos, and operational inconsistencies were identified and fixed:

| Location | Legacy WordPress Copy | Corrected Astro 7 Copy | Reason for Change |
|----------|----------------------|-----------------------|-------------------|
| Header / Hero | `"Meals in hand, just few clicks away."` | `"Chef-crafted meals, just a few clicks away."` | Grammatical correction |
| Delivery SMS | `"Get a text you when your order..."` | `"Get a text update when your order is out for delivery."` | Syntax fix |
| Corporate Page | `"Office Lunch Your Team Looks Foward To."` | `"Office Lunch Your Team Looks Forward To."` | Spelling fix ("Foward" -> "Forward") |
| Green Valley | `"We have two Las Vegas locations..."` | `"We have three Las Vegas store locations..."` | Updated to reflect 3 active retail stores |

---

## 2. Content Collections Editing Workflow

All articles, FAQs, store location details, and legal disclosures are managed as markdown files under `src/content/`:

- **Blog Articles**: `src/content/blog/*.md` (YAML frontmatter for title, publishDate, author, image, category)
- **FAQs**: `src/content/faqs/*.md` (YAML frontmatter for question, category, order)
- **Locations**: `src/content/locations/*.md` (YAML frontmatter for address, hours, phone, googleMapsUrl)
- **Legal Pages**: `src/content/legal/*.md` (YAML frontmatter for title, lastUpdated, summary)

To add a new meal item or update macros, edit `src/data/meals.ts`.
