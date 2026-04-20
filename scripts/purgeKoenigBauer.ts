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

async function purgeKoenigBauer() {
  console.log('--- Starting Sanity Purge for koenig-bauer ---');
  try {
    const query = '*[_type == "newsPost" && source == "koenig-bauer"]{_id}';
    const docs = await client.fetch(query);
    
    if (docs.length === 0) {
      console.log('Nothing to delete.');
      return;
    }
    
    console.log(`Found ${docs.length} documents. Deleting...`);
    
    for (const doc of docs) {
      console.log(`Deleting: ${doc._id}`);
      await client.delete(doc._id);
    }
    
    console.log('Purge complete.');
  } catch (err) {
    console.error('Error during purge:', err);
  }
}

purgeKoenigBauer();
