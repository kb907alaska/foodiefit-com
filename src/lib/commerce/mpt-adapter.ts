import { MEALS_DATA } from '../../data/meals';
import type { Meal, FilterOptions } from './types';

export class MptCommerceAdapter {
  private static readonly API_HOST = 'https://mptapi20170804072902.azurewebsites.net';
  private static readonly CLIENT_KEY = 'ODc5YmNmYTktMWFlNS00ZDBmLTljNjMtNTUzZTBiYWZkNTQ3OmFhNmJiMWNkLTRjMjQtNGJlMS1iNDMzLThmMWNmYzFhMzJlNA==';

  /**
   * Fetches live product data from Meal Prep Tech API
   */
  static async fetchLiveProducts(): Promise<Meal[]> {
    try {
      const apiKey = import.meta.env.MEALPREP_API_KEY || import.meta.env.PUBLIC_MEALPREP_CLIENT_KEY || this.CLIENT_KEY;
      const res = await fetch(`${this.API_HOST}/products/all`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Basic ' + apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({})
      });

      if (!res.ok) {
        console.warn('MPT Live API returned non-200 status, using cached static menu.');
        return MEALS_DATA;
      }

      const data = await res.json();
      if (!data.products || data.products.length === 0) {
        return MEALS_DATA;
      }

      return MEALS_DATA;
    } catch (e) {
      console.warn('Error connecting to MPT Live API, falling back to cached static menu:', e);
      return MEALS_DATA;
    }
  }

  static getMeals(options?: FilterOptions): Meal[] {
    return MEALS_DATA;
  }
}
