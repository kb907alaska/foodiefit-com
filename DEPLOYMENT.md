# Cloudflare Pages Deployment & Production Setup

## Deployment Instructions

This project uses `@astrojs/cloudflare` and is pre-configured for direct deployment to Cloudflare Pages.

### Option 1: Git Integration (Recommended)

1. Push your repository to GitHub or GitLab.
2. In the Cloudflare Dashboard, navigate to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
3. Set the following build configuration:
   - **Framework Preset**: `Astro`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
4. Add Environment Variables:
   - `PUBLIC_ORDER_URL` = `https://foodiefit.com/order/`
   - `PUBLIC_ACCOUNT_URL` = `https://foodiefit.com/user/`
   - `PUBLIC_SITE_URL` = `https://foodiefit.com`
5. Click **Save and Deploy**.

---

### Option 2: Direct Wrangler CLI Deployment

```bash
# Build production assets locally
npm run build

# Deploy dist folder using Wrangler
npx wrangler pages deploy dist --project-name=foodiefit-com
```
