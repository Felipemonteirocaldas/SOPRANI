import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'drt4iqev',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function run() {
  const data = await client.fetch(`*[_type == "newsPost"] | order(publishedAt desc)[0...5]{title, publishedAt, _id}`);
  console.log('Sanity Posts:', data);
}

run();
