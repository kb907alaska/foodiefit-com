# Meal Prep Tech (MPT) API Integration & Live Data Sync

## 1. MPT API Host & Authentication Specs

- **Production API Host**: `https://mptapi20170804072902.azurewebsites.net`
- **Authentication**: HTTP Basic Auth (`Authorization: Basic <PUBLIC_MEALPREP_CLIENT_KEY>`)
- **Client API Key**: `ODc5YmNmYTktMWFlNS00ZDBmLTljNjMtNTUzZTBiYWZkNTQ3OmFhNmJiMWNkLTRjMjQtNGJlMS1iNDMzLThmMWNmYzFhMzJlNA==` (Decodes to `879bcfa9-1ae5-4d0f-9c63-553e0bafd547:aa6bb1cd-4c24-4be1-b433-8f1cfc1a32e4`)

---

## 2. API Endpoints Discovered & Integrated

1. **All Live Products Endpoint**: `PUT /products/all`
   - Returns 376 live items, including full macro specifications, prices, variations (Lean vs Bulk), categories, tags, and Azure Blob storage high-res images (`mmaswcloud.blob.core.windows.net`).
2. **Shop Tasks Endpoint**: `PUT /products/shoptasks`
   - Handles cart validation, delivery checks, and store pickup options.
3. **Company Check Endpoint**: `PUT /tasks/check`
   - Returns company configuration, Finix payment gateway identifiers, delivery rules, and multi-select date features.

---

## 3. Cloudflare Environment Variables Setup

When deploying to Cloudflare Pages, add these environment variables:

```bash
PUBLIC_ORDER_URL=https://foodiefit.com/order/
PUBLIC_ACCOUNT_URL=https://foodiefit.com/user/
PUBLIC_MEALPREP_CLIENT_KEY=ODc5YmNmYTktMWFlNS00ZDBmLTljNjMtNTUzZTBiYWZkNTQ3OmFhNmJiMWNkLTRjMjQtNGJlMS1iNDMzLThmMWNmYzFhMzJlNA==
MEALPREP_API_KEY=ODc5YmNmYTktMWFlNS00ZDBmLTljNjMtNTUzZTBiYWZkNTQ3OmFhNmJiMWNkLTRjMjQtNGJlMS1iNDMzLThmMWNmYzFhMzJlNA==
```
