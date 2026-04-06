import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

/**
 * Vite only exposes env vars prefixed with VITE_. Use .env (see .env.example).
 * Browser requests require the dev/prod origin to be listed in Sanity:
 *   cd studio && npx sanity cors add http://localhost:8080             --no-credentials
 *   npx sanity cors add https://your-production-domain.com               --no-credentials
 * If you must send a token from the browser, add the same origin with --credentials instead.
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? '2024-01-01';

if (!import.meta.env.VITE_SANITY_PROJECT_ID || !import.meta.env.VITE_SANITY_DATASET) {
  console.warn(
    'Sanity: Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET in .env (Vite does not expose unprefixed SANITY_* vars to the browser).'
  );
}

export const sanityClient = createClient({
  projectId: projectId ?? '4wx4efgg',
  dataset: dataset ?? 'production',
  useCdn: true,
  apiVersion,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
