import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://foodiefit.com',
  output: 'static',
  adapter: cloudflare({
    imageService: 'passthrough'
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    })
  ],
  image: {
    domains: ['foodiefit.com']
  }
});
