# Meal Prep Tech (MPT) Official API Credentials Request Checklist

Foodie Fit account owners should present this formal request list to the **Meal Prep Tech (MPT)** platform support team to initialize formal API credentials, sandbox testing environments, and webhook endpoints for the Astro 7 platform.

---

## 1. Credentials & Authentication Requirements

- [ ] **Production API Base URL**: Verify base endpoint (`https://mptapi20170804072902.azurewebsites.net`).
- [ ] **Sandbox / Staging Base URL**: Request a dedicated sandbox environment for pre-production testing.
- [ ] **Read-Only API Credentials**: Issue dedicated read-only client key and secret for menu catalog ingestion.
- [ ] **Cart & Checkout Gateway Tokens**: Request signed session creation permissions for cart handoffs (`Astro menu -> MPT signed checkout`).
- [ ] **CORS Policy Authorization**: Whitelist `https://foodiefit-com.pages.dev` and `https://foodiefit.com` for cross-origin requests.

---

## 2. Webhook Event Configurations

Request inbound webhook notifications to Cloudflare Edge endpoints covering:

- [ ] `product.created` & `product.updated` (Triggers catalog rebuild)
- [ ] `price.changed` (Updates standard, lean, bulk pricing)
- [ ] `inventory.updated` (Toggles sold out / low availability badges)
- [ ] `order.created` & `order.cancelled` (Analytics conversion tracking)
- [ ] `subscription.updated` (Customer portal status sync)
- [ ] **Webhook HMAC Signing Secret**: Obtain SHA-256 HMAC secret for request signature verification (`MPT_WEBHOOK_SECRET`).

---

## 3. Account & Fulfillment Endpoints

- [ ] **OAuth / SSO Account Bridge**: Confirm if MPT supports OAuth 2.0 or single sign-on links for existing customer account access.
- [ ] **ZIP Code & Delivery Capacity API**: Confirm endpoint parameters for cutoff rules, delivery fees, and production limits.
- [ ] **Pickup Location Schedule API**: Retrieve live store hours, pickup slots, and capacity flags for Green Valley, Summerlin, and Northwest stores.
