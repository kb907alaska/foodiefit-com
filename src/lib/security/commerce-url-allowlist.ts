/**
 * Hardcoded, immutable origin allowlist for commerce, account, and checkout redirects.
 * Protects against open-redirect vulnerabilities and arbitrary query parameter tampering.
 */
export class CommerceUrlAllowlist {
  private static readonly ALLOWED_ORIGINS = [
    'https://foodiefit.com',
    'https://order.foodiefit.com',
    'https://foodiefit-com.pages.dev'
  ];

  private static readonly DEFAULT_ORDER_URL = 'https://foodiefit.com/order/';
  private static readonly DEFAULT_ACCOUNT_URL = 'https://foodiefit.com/user/';

  /**
   * Sanitizes and validates a redirect URL.
   * If input URL matches allowed origins, returns input URL. Otherwise returns default URL.
   */
  static sanitizeRedirectUrl(url: string | null | undefined, fallbackType: 'order' | 'account' = 'order'): string {
    const fallback = fallbackType === 'account' ? this.DEFAULT_ACCOUNT_URL : this.DEFAULT_ORDER_URL;

    if (!url || typeof url !== 'string') {
      return fallback;
    }

    try {
      const parsed = new URL(url, 'https://foodiefit.com');
      
      // Allow relative paths on main domain
      if (url.startsWith('/')) {
        return `https://foodiefit.com${url}`;
      }

      // Check if protocol is HTTP/HTTPS and origin is in allowlist
      if (parsed.protocol === 'https:' && this.ALLOWED_ORIGINS.includes(parsed.origin)) {
        return parsed.toString();
      }

      console.warn(`[Security Alert] Rejected unapproved redirect URL attempt: ${url}`);
      return fallback;
    } catch {
      return fallback;
    }
  }
}
