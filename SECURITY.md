# Foodie Fit Security Architecture & Incident Response Protocol

## Security Perimeter Overview

The Foodie Fit web application architecture enforces strict isolation between the public **Astro 7 Marketing & Discovery Site** (`foodiefit-com.pages.dev` / `foodiefit.com`) and the **Meal Prep Tech (MPT) Ordering & Account System** (`https://foodiefit.com/order/` / `https://order.foodiefit.com`).

---

## 1. Core Architectural Isolation Rules

1. **Zero Cookie Sharing**:
   - The Astro marketing site does not accept, process, or transmit administrative or session cookies belonging to the ordering system or user accounts.
2. **Redirect Allowlist Security**:
   - All "Order", "Account", and "Checkout" actions route through `src/lib/security/commerce-url-allowlist.ts`.
   - Outbound redirects are sanitized against a hardcoded immutable origin list (`https://foodiefit.com`, `https://order.foodiefit.com`). Arbitrary destination query parameters are rejected.
3. **Content Security Policy (CSP)**:
   - Configured via `public/_headers` with strict directive boundaries:
     - `object-src 'none'`
     - `base-uri 'none'`
     - `frame-ancestors 'none'`
     - `script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com`
     - Violation reports logged to `/api/csp-report`.
4. **Server Secret Isolation**:
   - Production secrets (`MEALPREP_API_KEY`) are retrieved strictly via server-side modules and are never prefixed with `PUBLIC_` or serialized into client HTML bundles.

---

## 2. Incident Response & 1-Click Rollback Protocol

In the event of a suspected security anomaly or compromised dependency:

1. **1-Click Deployment Rollback**:
   - Navigate to **Cloudflare Dashboard** -> **Workers & Pages** -> **foodiefit-com** -> **Deployments**.
   - Select the last known-good production deployment hash and click **Rollback to this deployment**.
2. **Immediate API Key Revocation**:
   - If an integration secret is compromised, generate a new key in the Meal Prep Tech administrative portal.
   - Update `MEALPREP_API_KEY` in Cloudflare Pages Environment Variables and trigger a rebuild.
3. **Emergency Form & Route Disabling**:
   - API endpoints (`/api/csp-report`, corporate forms) return `503 Service Unavailable` when emergency lock flags are enabled.
