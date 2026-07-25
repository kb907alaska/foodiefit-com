/**
 * Memory and path-based rate limiter for API endpoints, form submissions, and search lookups.
 * Returns HTTP 429 Too Many Requests when rate thresholds are exceeded.
 */
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export class SecurityRateLimiter {
  private static readonly limits = new Map<string, RateLimitRecord>();

  /**
   * Checks if an IP key exceeds the allowed request window.
   * @param clientIp Client IP address or identifier key
   * @param maxRequests Maximum allowed requests per window (default 10)
   * @param windowMs Window duration in milliseconds (default 60 seconds)
   */
  static isRateLimited(clientIp: string, maxRequests = 10, windowMs = 60000): { limited: boolean; remaining: number; resetMs: number } {
    const now = Date.now();
    const record = this.limits.get(clientIp);

    if (!record || now > record.resetTime) {
      this.limits.set(clientIp, { count: 1, resetTime: now + windowMs });
      return { limited: false, remaining: maxRequests - 1, resetMs: windowMs };
    }

    if (record.count >= maxRequests) {
      return { limited: true, remaining: 0, resetMs: record.resetTime - now };
    }

    record.count++;
    return { limited: false, remaining: maxRequests - record.count, resetMs: record.resetTime - now };
  }
}
