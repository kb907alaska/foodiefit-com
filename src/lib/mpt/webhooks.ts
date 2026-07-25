import crypto from 'node:crypto';

export interface MPTWebhookEvent {
  id: string;
  type: 'product.created' | 'product.updated' | 'price.changed' | 'inventory.updated' | 'order.created';
  timestamp: number;
  data: Record<string, unknown>;
}

export class MPTWebhooks {
  /**
   * Verifies inbound MPT webhook HMAC SHA-256 signature against server secret.
   */
  static verifySignature(payload: string, signature: string | null, secret = process.env.MPT_WEBHOOK_SECRET): boolean {
    if (!signature || !secret) {
      return false;
    }

    try {
      const hmac = crypto.createHmac('sha256', secret);
      const computed = hmac.update(payload).digest('hex');
      return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(signature));
    } catch {
      return false;
    }
  }

  /**
   * Parses and validates raw webhook event payload.
   */
  static parseEvent(payload: string): MPTWebhookEvent {
    const data = JSON.parse(payload);
    if (!data || !data.id || !data.type) {
      throw new Error('Invalid webhook event payload format');
    }
    return data as MPTWebhookEvent;
  }
}
