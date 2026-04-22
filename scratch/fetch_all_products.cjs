const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'drt4iqev',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  try {
    const products = await client.fetch('*[_type == "product"]{title, description, "slug": slug.current}');
    console.log(JSON.stringify(products, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
