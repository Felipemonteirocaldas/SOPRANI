import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });
dotenv.config({ path: join(__dirname, '../.env') });

const client = createClient({
  projectId: 'drt4iqev',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
});

async function check() {
  const kbNews = await client.fetch(`*[_type == "newsPost" && source == "koenig-bauer"] | order(publishedAt desc) {
    title,
    publishedAt,
    excerpt
  }`);
  console.log(`Found ${kbNews.length} Koenig Bauer news items:`);
  console.log(JSON.stringify(kbNews, null, 2));
}

check().catch(console.error);
