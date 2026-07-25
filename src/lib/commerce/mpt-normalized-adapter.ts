import type { MPTProduct } from '../mpt/types';
import type { Meal, MealCategory, DietaryTag } from './types';

export class MPTNormalizedAdapter {
  /**
   * Transforms raw MPT API product structure into Foodie Fit normalized Meal model.
   */
  static normalizeProduct(p: MPTProduct): Meal {
    let slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!slug) slug = `meal-${p.id.slice(0, 8)}`;

    const desc = p.description || '';
    const calMatch = desc.match(/Calories\s*(\d+)/i) || desc.match(/Cal\s*(\d+)/i);
    const proMatch = desc.match(/Protein\s*(\d+)g?/i) || desc.match(/Pro\s*(\d+)g?/i);
    const carbMatch = desc.match(/Carb\s*(\d+)g?/i) || desc.match(/Carbs\s*(\d+)g?/i);
    const fatMatch = desc.match(/Fat\s*(\d+)g?/i);
    const fiberMatch = desc.match(/(\d+)g?\s*fiber/i);

    const calories = calMatch ? parseInt(calMatch[1], 10) : 400;
    const protein = proMatch ? parseInt(proMatch[1], 10) : 40;
    const carbs = carbMatch ? parseInt(carbMatch[1], 10) : 35;
    const fat = fatMatch ? parseInt(fatMatch[1], 10) : 15;
    const fiber = fiberMatch ? parseInt(fiberMatch[1], 10) : undefined;

    let category: MealCategory = 'active';
    const catNames = (p.categories || []).map(c => c.toLowerCase());
    const tagNames = (p.tags || []).map(t => t.name.toLowerCase());

    if (tagNames.some(t => t.includes('low carb')) || catNames.some(c => c.includes('low carb'))) {
      category = 'low-carb';
    } else if (tagNames.some(t => t.includes('breakfast')) || catNames.some(c => c.includes('breakfast'))) {
      category = 'breakfast';
    } else if (tagNames.some(t => t.includes('snack') || t.includes('dessert'))) {
      category = 'snack-dessert';
    }

    const dietaryTags: DietaryTag[] = [];
    if (desc.toLowerCase().includes('gluten-free')) dietaryTags.push('gluten-free');
    if (desc.toLowerCase().includes('dairy-free')) dietaryTags.push('dairy-free');
    if (desc.toLowerCase().includes('keto')) dietaryTags.push('keto-friendly');
    if (protein >= 45) dietaryTags.push('high-protein');

    const cleanDesc = desc.split('\n')[0].replace(/\*\*/g, '').trim();

    return {
      id: p.id,
      sku: p.sku || 'FF-' + p.id.slice(0, 4).toUpperCase(),
      name: p.name,
      slug,
      category,
      description: cleanDesc.length > 150 ? cleanDesc.slice(0, 150) + '...' : cleanDesc,
      longDescription: desc,
      image: `/images/meals/${slug}.jpg`,
      price: p.price || 10.99,
      leanPrice: p.price || 10.99,
      bulkPrice: (p.price || 10.99) + 2.50,
      calories,
      protein,
      carbs,
      fat,
      fiber,
      ingredients: p.specifications ? p.specifications.split(',').map(s => s.trim()) : ['Chef Selected Premium Ingredients'],
      allergens: desc.match(/Contains:\s*([^\n]+)/i)?.[1]?.split(',').map(s => s.trim()) || [],
      dietaryTags: [...new Set(dietaryTags)] as DietaryTag[],
      portionOptions: [
        { id: 'lean', name: 'Lean Portion', price: p.price || 10.99, calories, protein, carbs, fat },
        { id: 'bulk', name: 'Bulk Portion (+50% Meat)', price: (p.price || 10.99) + 2.50, calories: Math.round(calories * 1.4), protein: Math.round(protein * 1.45), carbs: Math.round(carbs * 1.2), fat: Math.round(fat * 1.3) }
      ],
      heatingInstructions: 'Microwave: Vent lid, heat on High for 90-120 seconds.',
      storageInstructions: 'Keep refrigerated at 38°F or below. Consume within 5 days.',
      featured: true,
      isNew: false,
      available: p.available !== false,
      sortOrder: 1
    };
  }
}
