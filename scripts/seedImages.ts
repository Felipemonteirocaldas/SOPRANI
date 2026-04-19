import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
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

const products = [
  {
    slug: "mailaender-283",
    imageUrl: "https://metalprint.koenig-bauer.com/fileadmin/user_upload/KBA_MetalPrint/Drucken/Mailaender-283/KB-Mailaender-283-header.jpg",
    filename: "mailaender-283.jpg"
  },
  {
    slug: "metjet-one",
    imageUrl: "https://metalprint.koenig-bauer.com/fileadmin/user_upload/KBA_MetalPrint/Drucken/MetJET-ONE/kb-mep-MetJET-One-Produktionsstrasse-showroom-upscaled.jpg",
    filename: "metjet-one.jpg"
  },
  {
    slug: "metalcoat-471",
    imageUrl: "https://metalprint.koenig-bauer.com/fileadmin/user_upload/KBA_MetalPrint/Lackieren/MetalCoat_471/MEP_WEB-Header_Produkte2023_1920x670_MetalCoat471.jpg",
    filename: "metalcoat-471.jpg"
  },
  {
    slug: "metalcoat-480",
    imageUrl: "https://metalprint.koenig-bauer.com/fileadmin/user_upload/KBA_MetalPrint/Lackieren/MetalCoat_480/MEP_WEB-Header_Produkte2023_1920x670_MetalCoat480.jpg",
    filename: "metalcoat-480.jpg"
  },
  {
    slug: "metalcoat-483",
    imageUrl: "https://metalprint.koenig-bauer.com/fileadmin/user_upload/KBA_MetalPrint/Lackieren/MetalCoat_483/MEP_WEB-Header_Produkte2023_1920x670_MetalCoat483.jpg",
    filename: "metalcoat-483.jpg"
  },
  {
    slug: "highecon-drying-oven",
    imageUrl: "https://metalprint.koenig-bauer.com/fileadmin/user_upload/KBA_MetalPrint/Trocknen/HighEcon/K_B-MP_Web-Images-v2_HighEcon-Trockner_1920x670_Nov2018.jpg",
    filename: "highecon-drying-oven.jpg"
  },
  {
    slug: "thermal-drying-ovens",
    imageUrl: "https://metalprint.koenig-bauer.com/fileadmin/user_upload/KBA_MetalPrint/Trocknen/Blechtafeltrockner/MEP_WEB-Header_Produkte2023_1920x670_Tafeltrockner.jpg",
    filename: "thermal-drying-ovens.jpg"
  },
  {
    slug: "metalcure-uv",
    imageUrl: "https://metalprint.koenig-bauer.com/fileadmin/user_upload/KBA_MetalPrint/Trocknen/UV-Trockner/MetalCure-UV.jpg",
    filename: "metalcure-uv.jpg"
  },
  {
    slug: "metalcure-led",
    imageUrl: "https://metalprint.koenig-bauer.com/fileadmin/user_upload/KBA_MetalPrint/Trocknen/UV-Trockner/MetalCure-LED.jpg",
    filename: "metalcure-led.jpg"
  },
  {
    slug: "ecotnv",
    imageUrl: "https://metalprint.koenig-bauer.com/fileadmin/user_upload/KBA_MetalPrint/Abluftreinigung/EcoTNV/ECO-TNV_1920.jpg",
    filename: "ecotnv.jpg"
  },
  {
    slug: "tnv",
    imageUrl: "https://metalprint.koenig-bauer.com/fileadmin/user_upload/KBA_MetalPrint/Abluftreinigung/TNV/P1050063x_1920.jpg",
    filename: "tnv.jpg"
  }
];

async function seedImages() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Error: SANITY_TOKEN is not defined in environment variables.');
    process.exit(1);
  }

  console.log(`Starting image seed: ${products.length} images to process...`);

  for (const product of products) {
    try {
      console.log(`\nProcessing: ${product.slug}...`);

      // 1. Fetch the image
      console.log(`Fetching image from: ${product.imageUrl}`);
      const response = await fetch(product.imageUrl);
      if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 2. Upload the image to Sanity
      console.log(`Uploading to Sanity...`);
      const asset = await client.assets.upload('image', buffer, {
        filename: product.filename,
      });
      console.log(`Asset uploaded: ${asset._id}`);

      // 3. Find the product document
      console.log(`Finding product document with slug: ${product.slug}`);
      const query = `*[_type == "product" && slug.current == $slug][0]`;
      const doc = await client.fetch(query, { slug: product.slug });

      if (!doc) {
        console.warn(`Product not found for slug: ${product.slug}. Skipping patch.`);
        continue;
      }

      // 4. Patch the document
      console.log(`Patching product ${doc._id} with mainImage...`);
      await client
        .patch(doc._id)
        .set({
          mainImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
        })
        .commit();

      console.log(`Success: Image linked to ${product.slug}`);
    } catch (error) {
      console.error(`Error processing ${product.slug}:`, error);
    }
  }

  console.log('\nImage seeding completed!');
}

seedImages();
