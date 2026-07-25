import { COMMERCE_CONFIG } from '../../config/commerce';

export class ExternalCommerceAdapter {
  /**
   * Generates direct link to production ordering backend
   */
  static getOrderUrl(sku?: string, portion?: string): string {
    const baseUrl = COMMERCE_CONFIG.orderUrl;
    if (!sku) return baseUrl;
    
    const url = new URL(baseUrl);
    url.searchParams.set('item', sku);
    if (portion) {
      url.searchParams.set('portion', portion);
    }
    return url.toString();
  }

  /**
   * Generates direct account URL
   */
  static getAccountUrl(): string {
    return COMMERCE_CONFIG.accountUrl;
  }
}
