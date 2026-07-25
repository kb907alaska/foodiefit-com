import type { APIRoute } from 'astro';
import { MEALS_DATA } from '../data/meals';

const staticPages = [
  '/',
  '/menu/',
  '/how-it-works/',
  '/delivery/',
  '/subscriptions/',
  '/custom-meals/',
  '/by-the-pound/',
  '/gift-cards/',
  '/rewards-referrals/',
  '/locations/',
  '/locations/green-valley/',
  '/locations/summerlin/',
  '/locations/northwest/',
  '/corporate-meals/',
  '/about/',
  '/faq/',
  '/contact/',
  '/blog/',
  '/privacy/',
  '/terms/',
  '/accessibility/',
  '/nutrition-allergen-disclaimer/',
  '/delivery-policy/',
  '/refund-cancellation-policy/',
  '/high-protein-meals/',
  '/low-carb-meals/',
  '/balanced-meals/',
  '/breakfast-meal-prep/',
  '/healthy-snacks-drinks/',
  '/one-time-orders/',
  '/meal-prep-pickup/',
  '/delivery-areas/',
  '/delivery/las-vegas/',
  '/delivery/henderson/',
  '/delivery/summerlin/',
  '/delivery/spring-valley/',
  '/delivery/enterprise/',
  '/delivery/paradise/',
  '/delivery/centennial-hills/',
  '/delivery/north-las-vegas/',
  '/guides/meal-category-guide/',
  '/guides/lean-vs-bulk/',
  '/guides/how-to-read-macros/',
  '/guides/ingredient-allergen-center/',
  '/guides/freshness-and-storage/',
  '/calculators/meal-prep-cost-calculator/',
  '/calculators/protein-per-dollar/'
];

export const GET: APIRoute = async () => {
  const pageUrls = staticPages.map(p => `
    <url>
      <loc>https://foodiefit.com${p}</loc>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>`).join('\n');

  const mealUrls = MEALS_DATA.map(m => `
    <url>
      <loc>https://foodiefit.com/menu/${m.slug}/</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pageUrls}
  ${mealUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
