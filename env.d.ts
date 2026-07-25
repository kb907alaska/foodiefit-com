/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ORDER_URL: string;
  readonly PUBLIC_ACCOUNT_URL: string;
  readonly PUBLIC_MEALPREP_CLIENT_KEY?: string;
  readonly MEALPREP_API_KEY?: string;
  readonly PUBLIC_CORPORATE_FORM_ENDPOINT?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
