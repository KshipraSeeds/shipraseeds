// lib/sanity.js
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Find this in sanity.json or manage.sanity.io
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,     // Find this in sanity.json or manage.sanity.io
  apiVersion: '2023-05-03', // Use a consistent API version
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for faster delivery
});

// Helper function for generating image URLs
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}