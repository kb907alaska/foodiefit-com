export type MealCategory = 'low-carb' | 'active' | 'breakfast' | 'snack-dessert';

export type DietaryTag = 'gluten-free' | 'dairy-free' | 'nut-free' | 'soy-free' | 'high-protein' | 'low-carb' | 'keto-friendly';

export interface PortionOption {
  id: 'lean' | 'bulk' | 'regular';
  name: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: MealCategory;
  description: string;
  longDescription: string;
  image: string;
  price: number;
  leanPrice?: number;
  bulkPrice?: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sodium?: number; // mg
  fiber?: number; // g
  ingredients: string[];
  allergens: string[];
  dietaryTags: DietaryTag[];
  portionOptions: PortionOption[];
  heatingInstructions: string;
  storageInstructions: string;
  featured?: boolean;
  isNew?: boolean;
  available: boolean;
  sortOrder: number;
}

export interface FilterOptions {
  search?: string;
  category?: MealCategory | 'all';
  maxCalories?: number;
  minProtein?: number;
  maxCarbs?: number;
  maxFat?: number;
  dietaryTags?: DietaryTag[];
  portion?: 'lean' | 'bulk' | 'all';
  sortBy?: 'featured' | 'protein-desc' | 'calories-asc' | 'price-asc' | 'price-desc' | 'name-asc';
}

export interface StoreLocation {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  openHour: number;
  closeHour: number;
}
