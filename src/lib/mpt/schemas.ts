import type { MPTProduct } from './types';

/**
 * Validates and sanitizes raw MPT API product responses.
 * Provides fallback objects if API fields are missing.
 */
export class MPTSchemas {
  static validateProduct(p: unknown): MPTProduct {
    if (!p || typeof p !== 'object') {
      throw new Error('Invalid product object received from MPT API');
    }

    const raw = p as Record<string, unknown>;

    return {
      id: String(raw.id || `fallback-${Math.random().toString(36).substring(7)}`),
      sku: typeof raw.sku === 'string' ? raw.sku : undefined,
      name: String(raw.name || 'Chef Selected Specialty Meal'),
      description: typeof raw.description === 'string' ? raw.description : '',
      specifications: typeof raw.specifications === 'string' ? raw.specifications : '',
      price: typeof raw.price === 'number' ? raw.price : 10.99,
      categories: Array.isArray(raw.categories) ? raw.categories.map(String) : [],
      tags: Array.isArray(raw.tags) ? raw.tags as any[] : [],
      images: Array.isArray(raw.images) ? raw.images as any[] : [],
      variations: Array.isArray(raw.variations) ? raw.variations as any[] : [],
      available: raw.available !== false
    };
  }
}
