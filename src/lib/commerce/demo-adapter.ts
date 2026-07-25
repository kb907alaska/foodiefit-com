import type { Meal, FilterOptions } from './types';

export class DemoCommerceAdapter {
  static filterMeals(meals: Meal[], options: FilterOptions): Meal[] {
    return meals.filter((meal) => {
      // Search query
      if (options.search && options.search.trim() !== '') {
        const query = options.search.toLowerCase();
        const matchesName = meal.name.toLowerCase().includes(query);
        const matchesDesc = meal.description.toLowerCase().includes(query);
        const matchesIngredients = meal.ingredients.some(i => i.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIngredients) return false;
      }

      // Category
      if (options.category && options.category !== 'all') {
        if (meal.category !== options.category) return false;
      }

      // Max Calories
      if (options.maxCalories && meal.calories > options.maxCalories) {
        return false;
      }

      // Min Protein
      if (options.minProtein && meal.protein < options.minProtein) {
        return false;
      }

      // Max Carbs
      if (options.maxCarbs && meal.carbs > options.maxCarbs) {
        return false;
      }

      // Max Fat
      if (options.maxFat && meal.fat > options.maxFat) {
        return false;
      }

      // Dietary tags (MUST include all requested tags)
      if (options.dietaryTags && options.dietaryTags.length > 0) {
        const hasAllTags = options.dietaryTags.every(tag => meal.dietaryTags.includes(tag));
        if (!hasAllTags) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (options.sortBy) {
        case 'protein-desc':
          return b.protein - a.protein;
        case 'calories-asc':
          return a.calories - b.calories;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return a.sortOrder - b.sortOrder;
      }
    });
  }

  static getStoreOpenStatus(openHour = 8, closeHour = 20): { isOpen: boolean; text: string } {
    // Current Vegas time simulation
    const now = new Date();
    const currentHour = now.getHours();
    
    if (currentHour >= openHour && currentHour < closeHour) {
      return { isOpen: true, text: 'Open Now (Closing at 8:00 PM)' };
    } else {
      return { isOpen: false, text: 'Closed Now (Opens at 8:00 AM)' };
    }
  }
}
