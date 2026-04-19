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
    title: "Slitter",
    slug: "soudronic-slitter",
    category: "Slitter",
    order: 13,
    description: "High precision guillotine slitters or rotary slitters with fully automated cutting heads that allow fast format changes. Custom-made by Ocsam Cepak and Switzerland Can Man AG — extremely robust with simple, swift adjustment to different blank formats.",
    specs: [
      { key: "Production output", value: "5 – 50 sheets/min" },
      { key: "Sheet width", value: "550 – 1,200 mm" },
      { key: "Sheet length", value: "450 – 1,200 mm" },
      { key: "Sheet thickness", value: "0.10 – 0.40 mm" },
      { key: "Strips", value: "1 – 20" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2023/02/Slitter.jpg"
  },
  {
    title: "Transfer Systems",
    slug: "soudronic-transfer",
    category: "Transfer",
    order: 14,
    description: "High-capacity transfer systems for all system layouts and configurations with a feeding capacity of up to 1,500 blanks per minute. Engineered for seamless integration between slitter and welder.",
    specs: [
      { key: "Feeding capacity", value: "Up to 1,500 blanks/min" },
      { key: "Compatibility", value: "All system layouts and configurations" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/Transfer_Products_Soudronic.jpg"
  },
  {
    title: "Canbody Welder",
    slug: "soudronic-welder",
    category: "Welder",
    order: 15,
    description: "Welding machines that offer maximum speed, efficiency and flexibility, reliability and user-friendliness. The core of every three-piece can production line, shaping and welding canbodies with precision.",
    specs: [
      { key: "Type", value: "Electric resistance welding" },
      { key: "Focus", value: "Maximum speed, efficiency and flexibility" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/Welder_Products_Soudronic.jpg"
  },
  {
    title: "Coating",
    slug: "soudronic-coating",
    category: "Coating",
    order: 16,
    description: "Fully automated powder-coating or wet-lacquering systems for inner and outer seams at various positions. Guarantee easy, clean operation and low powder or lacquer consumption.",
    specs: [
      { key: "Type", value: "Powder-coating or wet-lacquering" },
      { key: "Application", value: "Inner and outer seam protection" },
      { key: "Operation", value: "Fully automated" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/Coating_Products_Soudronic.jpg"
  },
  {
    title: "Curing",
    slug: "soudronic-curing",
    category: "Curing",
    order: 17,
    description: "Modular range of curing systems designed to cure the seam protection layer effectively. Available as gas or induction heating in linear or U-shape configuration.",
    specs: [
      { key: "Heating type", value: "Gas or induction" },
      { key: "Configuration", value: "Linear or U-shape" },
      { key: "Design", value: "Modular" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/Curing_Products_Soudronic.jpg"
  },
  {
    title: "Can Assembling",
    slug: "soudronic-can-assembling",
    category: "Can Assembling",
    order: 18,
    description: "Multi-function systems that perform several operations from forming to seaming at low, medium and high speeds. Feature high-level modularity and process capability for diverse can types.",
    specs: [
      { key: "Operations", value: "Forming to seaming" },
      { key: "Speed range", value: "Low, medium and high speeds" },
      { key: "Design", value: "High modularity" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/Can_Assembling_Products_Soudronic.jpg"
  },
  {
    title: "Tester",
    slug: "soudronic-tester",
    category: "Tester",
    order: 19,
    description: "Pressure decay and light testers for all sizes and shapes — round, square, irregular, cans, drums, pails. Carousel or linear test units adjust easily to the size and shape of the metal container.",
    specs: [
      { key: "Test types", value: "Pressure decay and light testing" },
      { key: "Container types", value: "Round, square, irregular, cans, drums, pails" },
      { key: "Units", value: "Carousel or linear" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/Tester_Products_Soudronic.jpg"
  },
  {
    title: "2-Piece Cans",
    slug: "soudronic-2-piece-cans",
    category: "2-Piece Cans",
    order: 20,
    description: "Complete production lines for deep-drawn round, conical, rectangular, or irregularly shaped canbodies. High performance presses and 2PC combination machines for maximum output.",
    specs: [
      { key: "Can shapes", value: "Round, conical, rectangular, irregular" },
      { key: "Process", value: "Deep drawing" },
      { key: "Equipment", value: "High performance presses and 2PC combination machines" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/2_piece_can__Products_Soudronic.jpg"
  },
  {
    title: "End Making",
    slug: "soudronic-end-making",
    category: "End Making",
    order: 21,
    description: "High efficiency multi-die presses for ends and shells. Designed for maximum productivity and precision in the production of can ends for the metal packaging industry.",
    specs: [
      { key: "Type", value: "Multi-die presses" },
      { key: "Products", value: "Ends and shells" },
      { key: "Focus", value: "High efficiency" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/EndMacking_Products_Soudronic.jpg"
  },
  {
    title: "Peel-off Ends",
    slug: "soudronic-peel-off",
    category: "Peel-off",
    order: 22,
    description: "Single and multi-lane heat-sealing systems to produce peel-off ends (POE). Designed for reliable, high-speed production of easy-open ends for food and non-food metal packaging.",
    specs: [
      { key: "Type", value: "Heat-sealing systems" },
      { key: "Lanes", value: "Single and multi-lane" },
      { key: "Product", value: "Peel-off ends (POE)" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/Peel-off_Ends_Products_Soudronic-1.jpg"
  },
  {
    title: "Conveyor",
    slug: "soudronic-conveyor",
    category: "Conveyor",
    order: 23,
    description: "Conveying systems from trusted third-party suppliers engineered to our customer's needs. Seamlessly integrated into Soudronic production lines for efficient can transport.",
    specs: [
      { key: "Type", value: "Customized conveying systems" },
      { key: "Integration", value: "Full line integration" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/Conveyor_Products_Soudronic.jpg"
  },
  {
    title: "Palletizer",
    slug: "soudronic-palletizer",
    category: "Palletizer",
    order: 24,
    description: "Customized palletizing systems from trusted third-party suppliers, and stacker for general lines from Sabatier. Designed for reliable end-of-line automation in can manufacturing.",
    specs: [
      { key: "Type", value: "Customized palletizing systems" },
      { key: "Supplier", value: "Sabatier stackers for general lines" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/Palletizer__Products_Soudronic.jpg"
  },
  {
    title: "Digital Solutions",
    slug: "soudronic-digital-solutions",
    category: "Digital Solutions",
    order: 25,
    description: "Innovative digital solutions that address daily production challenges. Includes UNICONTROL central line control, DISCON+ connectivity platform, and data-driven tools for performance optimization.",
    specs: [
      { key: "Key products", value: "UNICONTROL, DISCON+" },
      { key: "Focus", value: "Line control, connectivity, performance optimization" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/09/Digital_Solutions_Products_Soudronic-1024x576.jpg"
  },
  {
    title: "Accessories",
    slug: "soudronic-accessories",
    category: "Accessories",
    order: 26,
    description: "Additional equipment and devices suited for each process step of a can making system. Complements every Soudronic production line with purpose-built accessories for maximum performance.",
    specs: [
      { key: "Application", value: "All process steps of can making" },
      { key: "Compatibility", value: "Full Soudronic line integration" }
    ],
    imageUrl: "https://soudronic.com/app/uploads/2025/11/Accessories_2025.jpg"
  }
];

async function seedSoudronic() {
  if (!process.env.SANITY_TOKEN) {
    console.error('Error: SANITY_TOKEN is not defined.');
    process.exit(1);
  }

  console.log(`Starting Soudronic seed: ${products.length} products...`);

  for (const product of products) {
    try {
      console.log(`\nProcessing: ${product.title}...`);

      // 1. Upload image
      console.log(`Fetching image: ${product.imageUrl}`);
      const response = await fetch(product.imageUrl);
      if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      console.log(`Uploading asset...`);
      const asset = await client.assets.upload('image', buffer, {
        filename: `${product.slug}.jpg`
      });

      // 2. Create product document
      const doc = {
        _type: 'product',
        _id: `product-${product.slug}`,
        title: product.title,
        slug: { _type: 'slug', current: product.slug },
        brand: 'soudronic',
        category: product.category,
        description: product.description,
        order: product.order,
        specs: product.specs.map(spec => ({
          _key: Math.random().toString(36).substring(2, 9),
          key: spec.key,
          value: spec.value
        })),
        mainImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id }
        }
      };

      console.log(`Creating/Replacing document...`);
      await client.createOrReplace(doc);
      console.log(`Success: ${product.title}`);
    } catch (error) {
      console.error(`Error seeding ${product.title}:`, error);
    }
  }

  console.log('\nSoudronic seeding completed!');
}

seedSoudronic();
