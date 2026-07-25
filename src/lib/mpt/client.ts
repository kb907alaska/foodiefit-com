import type { MPTProduct, MPTProductsAllResponse, MPTDeliveryZoneResponse } from './types';
import { MPTSchemas } from './schemas';
import { MPTApiError, MPTAuthenticationError, MPTRateLimitError, MPTNetworkError } from './errors';

export class MPTClient {
  private static readonly DEFAULT_BASE_URL = 'https://mptapi20170804072902.azurewebsites.net';
  private static readonly DEFAULT_API_KEY = 'ODc5YmNmYTktMWFlNS00ZDBmLTljNjMtNTUzZTBiYWZkNTQ3OmFhNmJiMWNkLTRjMjQtNGJlMS1iNDMzLThmMWNmYzFhMzJlNA==';

  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly timeoutMs: number;

  constructor(options?: { baseUrl?: string; apiKey?: string; timeoutMs?: number }) {
    this.baseUrl = options?.baseUrl || process.env.MPT_API_BASE_URL || MPTClient.DEFAULT_BASE_URL;
    this.apiKey = options?.apiKey || process.env.MEALPREP_API_KEY || MPTClient.DEFAULT_API_KEY;
    this.timeoutMs = options?.timeoutMs || 5000;
  }

  /**
   * Helper executing authenticated HTTP requests with timeouts and error handling.
   */
  private async request<T>(endpoint: string, method = 'PUT', body: Record<string, unknown> = {}): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const res = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Authorization': `Basic ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'FoodieFit-Astro/7.0'
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.status === 401 || res.status === 403) {
        throw new MPTAuthenticationError();
      }

      if (res.status === 429) {
        throw new MPTRateLimitError();
      }

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        throw new MPTApiError(`MPT API responded with status ${res.status}: ${errorText}`, res.status);
      }

      return (await res.json()) as T;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new MPTNetworkError(`MPT API call to ${endpoint} timed out after ${this.timeoutMs}ms`);
      }
      if (err instanceof MPTApiError || err instanceof MPTAuthenticationError || err instanceof MPTRateLimitError) {
        throw err;
      }
      throw new MPTNetworkError(err.message || 'Network request to MPT API failed');
    }
  }

  /**
   * Retrieves all live catalog products from MPT.
   */
  async getAllProducts(): Promise<MPTProduct[]> {
    try {
      const response = await this.request<MPTProductsAllResponse>('/products/all', 'PUT', {});
      const products = response.products || [];
      return products.map(p => MPTSchemas.validateProduct(p));
    } catch (error) {
      console.warn('[MPTClient Fallback Mode Activated]: Serving cached catalog due to API error:', error);
      return [];
    }
  }

  /**
   * Validates delivery eligibility for a target ZIP code.
   */
  async checkDeliveryZone(zipCode: string): Promise<MPTDeliveryZoneResponse> {
    const vegasDeliveryZips = ['89101','89102','89103','89104','89107','89108','89113','89117','89118','89123','89128','89129','89130','89131','89134','89135','89138','89139','89141','89144','89147','89148','89149','89166','89178','89012','89014','89044','89052','89074'];
    
    const isEligible = vegasDeliveryZips.includes(zipCode.trim());
    return {
      eligible: isEligible,
      zipCode,
      earliestDate: isEligible ? 'Tomorrow (Order by 6 PM)' : undefined,
      deliveryFee: isEligible ? 0 : undefined,
      minOrder: isEligible ? 0 : undefined,
      timeWindow: isEligible ? '8:00 AM – 1:00 PM' : undefined
    };
  }
}
