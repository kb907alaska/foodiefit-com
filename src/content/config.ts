import { defineCollection, z } from 'astro:content';

const locationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    phone: z.string(),
    hours: z.string(),
    openHour: z.number(),
    closeHour: z.number(),
    googleMapsUrl: z.string(),
    image: z.string(),
    neighborhoods: z.array(z.string()),
    description: z.string()
  })
});

const faqsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.enum(['ordering', 'delivery', 'locations', 'nutrition', 'subscriptions', 'corporate']),
    order: z.number()
  })
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    author: z.string(),
    image: z.string(),
    category: z.string(),
    readTime: z.string()
  })
});

const legalCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lastUpdated: z.string(),
    summary: z.string()
  })
});

export const collections = {
  locations: locationsCollection,
  faqs: faqsCollection,
  blog: blogCollection,
  legal: legalCollection
};
