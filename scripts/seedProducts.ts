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
    title: "Mailänder 283",
    slug: "mailaender-283",
    category: "Offset Metal Printing Machines",
    description: "Combines proven and robust Mailänder technology with the high-performance printing units of the MetalStar 4. Perfect for printing challenging sheets for the metal packaging industry with maximum flexibility via modular design.",
    order: 2,
    specs: [
      { key: "Maximum sheet size", value: "1,000 x 1,200 mm" },
      { key: "Minimum sheet size", value: "510 x 710 mm" },
      { key: "Sheet thickness", value: "0.13 – 0.60 mm" },
      { key: "Size of printing plate", value: "1,095 x 1,220 x 0.4 mm" },
      { key: "Maximum printing area", value: "995 x 1,200 mm" },
      { key: "Gripper margin", value: "3 mm" },
      { key: "Print start", value: "5 mm from edge of sheet" },
      { key: "Production speed", value: "Up to 7,500 sheets/h" }
    ]
  },
  {
    title: "MetJET ONE",
    slug: "metjet-one",
    category: "Digital Metal Printing Machines",
    description: "The first digital metal decoration machine. Combines the most advanced inkjet technology with reliable sheet handling. Simple, intuitive operation with cost efficiency and flexibility for demanding production requirements.",
    order: 3,
    specs: [
      { key: "Technology", value: "Multi-Pass Inkjet" },
      { key: "Production speed", value: "Up to 390 sheets/h" },
      { key: "Ink types", value: "CMYK + Light inks + White ink option" },
      { key: "Operation", value: "Intuitive HMI" }
    ]
  },
  {
    title: "MetalCoat 471",
    slug: "metalcoat-471",
    category: "Coating Machines",
    description: "High-performance coating machine offering highest efficiency and precision for modern metal sheet coating. Precisely coats tinplate, TFS, and aluminum sheets in rectangular and scroll-cut formats with intelligent line control.",
    order: 4,
    specs: [
      { key: "Maximum sheet format", value: "1,000 x 1,200 mm" },
      { key: "Minimum sheet format", value: "510 x 710 mm" },
      { key: "Sheet thickness", value: "0.12 – 0.50 mm" },
      { key: "Coating speed", value: "Max. 8,500 sheets/h" },
      { key: "Coating types", value: "Solvent-based, UV, UV-LED coatings" }
    ]
  },
  {
    title: "MetalCoat 480",
    slug: "metalcoat-480",
    category: "Coating Machines",
    description: "Ideally suited for UV inline coating within a UV printing line. Features dedicated drive technology, laser-assisted cylinder positioning and job memory for faster makeready. Keeps pace with high production outputs of modern presses.",
    order: 5,
    specs: [
      { key: "Maximum sheet format", value: "1,000 x 1,200 mm" },
      { key: "Minimum sheet format", value: "510 x 710 mm" },
      { key: "Sheet thickness", value: "0.12 – 0.50 mm" },
      { key: "Coating speed", value: "Max. 8,500 sheets/h" },
      { key: "Coating types", value: "UV coatings, UV-LED coatings" }
    ]
  },
  {
    title: "MetalCoat 483",
    slug: "metalcoat-483",
    category: "Coating Machines",
    description: "The most modern coating machine on the market. Features a newly developed three-roller coating system, dedicated drives, touchpanels with memory and laser-assisted makeready. Up to 25% faster makeready than previous generations.",
    order: 6,
    specs: [
      { key: "Maximum sheet format", value: "1,000 x 1,200 mm" },
      { key: "Minimum sheet format", value: "510 x 710 mm" },
      { key: "Sheet thickness", value: "0.12 – 0.50 mm" },
      { key: "Coating speed", value: "Max. 8,500 sheets/h" },
      { key: "Coating types", value: "Solvent-based, UV, UV-LED coatings" },
      { key: "Makeready improvement", value: "Up to 25% faster" }
    ]
  },
  {
    title: "HighEcon Drying Oven",
    slug: "highecon-drying-oven",
    category: "Drying",
    description: "Energy-efficient drying oven for metal sheet decoration. Designed for maximum energy savings and high throughput in modern metal packaging production lines.",
    order: 7,
    specs: [
      { key: "Type", value: "Thermal drying oven" },
      { key: "Focus", value: "High energy efficiency" }
    ]
  },
  {
    title: "Thermal Drying Ovens",
    slug: "thermal-drying-ovens",
    category: "Drying",
    description: "Reliable thermal drying solutions for solvent-based coatings and inks in metal decoration production lines. Available in various configurations to match line requirements.",
    order: 8,
    specs: [
      { key: "Type", value: "Thermal / convection drying" },
      { key: "Application", value: "Solvent-based coatings and inks" }
    ]
  },
  {
    title: "MetalCure UV",
    slug: "metalcure-uv",
    category: "Drying",
    description: "UV curing system for intermediate and final drying of UV coatings and inks in metal decoration lines. Ensures fast and reliable curing for high-speed production.",
    order: 9,
    specs: [
      { key: "Technology", value: "UV curing" },
      { key: "Application", value: "UV coatings and inks" }
    ]
  },
  {
    title: "MetalCure LED",
    slug: "metalcure-led",
    category: "Drying",
    description: "State-of-the-art UV LED curing technology for intermediate or final drying. No heat input into the metal sheet, energy savings of up to 80% compared to conventional UV drying, with format-dependent switch-off of unused segments.",
    order: 10,
    specs: [
      { key: "Technology", value: "UV LED curing" },
      { key: "Energy savings", value: "Up to 80% vs conventional UV" },
      { key: "Heat input", value: "None" },
      { key: "Segments", value: "Format-dependent switch-off" }
    ]
  },
  {
    title: "EcoTNV",
    slug: "ecotnv",
    category: "Air Purification",
    description: "Highly efficient thermal exhaust air purification system for metal decoration production lines. Designed to minimize energy consumption while ensuring full compliance with emission standards.",
    order: 11,
    specs: [
      { key: "Type", value: "Thermal exhaust air purification" },
      { key: "Focus", value: "Energy efficiency + emission compliance" }
    ]
  },
  {
    title: "TNV",
    slug: "tnv",
    category: "Air Purification",
    description: "Thermal exhaust air purification system for reliable treatment of solvent-laden air from drying ovens in metal decoration lines. Ensures compliance with environmental regulations.",
    order: 12,
    specs: [
      { key: "Type", value: "Thermal exhaust air purification" },
      { key: "Application", value: "Solvent-laden exhaust air" }
    ]
  }
];

async function seed() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Error: SANITY_TOKEN is not defined in environment variables.');
    process.exit(1);
  }

  console.log(`Starting seed: ${products.length} products to import...`);

  for (const product of products) {
    try {
      const doc = {
        _type: 'product',
        title: product.title,
        slug: {
          _type: 'slug',
          current: product.slug,
        },
        brand: 'koenig-bauer',
        category: product.category,
        description: product.description,
        order: product.order,
        specs: product.specs.map(spec => ({
          _key: Math.random().toString(36).substring(2, 9),
          key: spec.key,
          value: spec.value,
        })),
      };

      console.log(`Importing: ${product.title}...`);
      await client.createOrReplace({
        _id: `product-${product.slug}`,
        ...doc,
      });
      console.log(`Success: ${product.title}`);
    } catch (error) {
      console.error(`Failed to import ${product.title}:`, error);
    }
  }

  console.log('Seeding completed!');
}

seed();
