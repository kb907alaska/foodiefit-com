import type { APIRoute } from 'astro';
import { MEALS_DATA } from '../data/meals';

export const GET: APIRoute = async () => {
  const itemsXml = MEALS_DATA.map((meal) => `
    <item>
      <g:id>${meal.id}</g:id>
      <g:title><![CDATA[${meal.name} - Foodie Fit Meal Prep]]></g:title>
      <g:description><![CDATA[${meal.description} (${meal.protein}g Protein, ${meal.calories} Calories)]]></g:description>
      <g:link>https://foodiefit.com/menu/${meal.slug}/</g:link>
      <g:image_link>${meal.image}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${meal.price.toFixed(2)} USD</g:price>
      <g:brand>Foodie Fit</g:brand>
      <g:gtin>${meal.sku}</g:gtin>
      <g:mpn>${meal.sku}</g:mpn>
      <g:google_product_category>Food, Beverages &amp; Tobacco &gt; Food Items &gt; Prepared Foods</g:google_product_category>
      <g:custom_label_0>${meal.category}</g:custom_label_0>
      <g:custom_label_1>${meal.protein}g_protein</g:custom_label_1>
    </item>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Foodie Fit Las Vegas Meal Prep Feed</title>
    <link>https://foodiefit.com</link>
    <description>Google Merchant Center Feed for Foodie Fit Fresh Prepared Meals in Las Vegas</description>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
