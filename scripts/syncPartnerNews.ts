import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
// node-fetch is built into Node 18+, but we export anyway for sanity
import fetch from 'node-fetch';

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

// Helper for slugs
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-');    // Replace multiple - with single -
}

// Upload Image helper
async function uploadImageFromUrl(url: string, filename: string) {
  console.log(`[Image] Fetching: ${url}`);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log(`[Image] Uploading buffer to Sanity...`);
    const asset = await client.assets.upload('image', buffer, { filename });
    return asset._id;
  } catch (err) {
    console.error(`[Image] Failed to upload image ${url}:`, err);
    return null;
  }
}

// -------------------------------------------------------------
// Routine A: Koenig Bauer (HTML Scraping)
// -------------------------------------------------------------
async function syncKoenigBauerScraping() {
  console.log('--- Starting KOENIG BAUER HTML Sync ---');
  try {
    const baseUrl = 'https://metalprint.koenig-bauer.com';
    const res = await fetch(`${baseUrl}/en/news/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Select containers
    const items = $('a.teaser__content, a.news-and-trends__column');
    const nodes = items.toArray();
    console.log(`[Debug] Found ${nodes.length} potential items`);

    for (const node of nodes) {
      const $node = $(node);
      let link = $node.attr('href') || '';
      if (!link) continue;
      if (!link.startsWith('http')) link = baseUrl + link;

      const title = $node.attr('title') || $node.find('h3').text().trim() || 'No Title';
      const textRaw = $node.text().replace(/\n/g, ' ').replace(/\s\s+/g, ' ').trim();
      
      // Matches "17. Feb 2026 / News..." or similar
      const dateMatch = textRaw.match(/^([\d]{2}\.\s*([A-Za-z]{3})\s*(\d{4}))/i);
      
      let pubDateStr = new Date().toISOString();
      let yearVal = 0;

      if (dateMatch) {
        const day = dateMatch[1].split('.')[0].trim();
        const monthShort = dateMatch[2].trim();
        const yearStr = dateMatch[3].trim();
        yearVal = parseInt(yearStr, 10);
        
        const months: Record<string, string> = {
          'Jan': 'Jan', 'Feb': 'Feb', 'Mar': 'Mar', 'Apr': 'Apr', 'May': 'May', 'Jun': 'Jun',
          'Jul': 'Jul', 'Aug': 'Aug', 'Sep': 'Sep', 'Oct': 'Oct', 'Nov': 'Nov', 'Dec': 'Dec'
        };

        const dateObj = new Date(`${day} ${months[monthShort] || monthShort} ${yearStr}`);
        if (!isNaN(dateObj.getTime())) {
          pubDateStr = dateObj.toISOString();
        }
      }

      // Filter for 2025/2026
      console.log(`[Debug] Item: ${title} | Year: ${yearVal}`);
      if (yearVal !== 2025 && yearVal !== 2026) {
        console.log(`[Skip] Year ${yearVal}: ${title}`);
        continue;
      }

      const slug = slugify(title);
      
      // Check if already exists in Sanity to avoid fetching detail unnecessarily
      const existing = await client.fetch(`*[_type == "newsPost" && slug.current == $slug][0]`, { slug });
      if (existing) {
        console.log(`[Skip] Already exists: ${slug}`);
        continue;
      }

      // Fetch Detail for Excerpt
      console.log(`[Detail] Fetching excerpt from: ${link}`);
      let excerpt = title;
      try {
        const detailRes = await fetch(link);
        if (detailRes.ok) {
          const detailHtml = await detailRes.text();
          const $detail = cheerio.load(detailHtml);
          const firstPara = $detail('.news-item__text p').first().text().trim();
          if (firstPara) {
            excerpt = firstPara.substring(0, 195) + '...';
          }
        }
      } catch (err) {
        console.warn(`[Warn] Could not fetch detail for ${title}, using title as excerpt.`);
      }

      const imgSrc = $node.find('img').attr('src');
      let absImgSrc = imgSrc;
      if (imgSrc && !imgSrc.startsWith('http')) {
        absImgSrc = baseUrl + imgSrc;
      }

      console.log(`Found KB News: ${title} | Date: ${pubDateStr}`);

      await saveNewsPost({
        title,
        slug,
        publishedAt: pubDateStr,
        excerpt,
        externalUrl: link,
        source: 'koenig-bauer',
        category: 'news',
        imageUrl: absImgSrc
      });
    }
  } catch (err) {
    console.error('Failed to sync Koenig Bauer Scraping:', err);
  }
}

// -------------------------------------------------------------
// Routine B: Soudronic (HTML Scraping)
// -------------------------------------------------------------
async function syncSoudronicScraping() {
  console.log('--- Starting SOUDRONIC HTML Sync ---');
  try {
    const res = await fetch('https://soudronic.com/news-and-events/');
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // We target elements that have an anchor, h3, etc.
    const items = $('article, li').has('h3');
    
    // Convert to Array to support async operations inside
    const nodes = items.toArray();
    for (const node of nodes) {
      const $node = $(node);
      const title = $node.find('h3').text().trim();
      if (!title) continue;
      
      // Sometime the node itself is an anchor, otherwise find anchor inside
      const anchorNode = $node.is('a') ? $node : $node.find('a');
      let link = anchorNode.attr('href') || '';
      
      // Process absolute URL
      if (link && !link.startsWith('http')) {
        link = 'https://soudronic.com' + link;
      }

      // Try extract date string and try to format ISO
      const dateText = $node.find('.date, time').first().text().trim() || new Date().toLocaleDateString();
      // If Format is DD/MM/YYYY
      let pubDate = new Date().toISOString();
      try {
        const parts = dateText.split('/');
        if (parts.length === 3) {
          // MM/DD/YYYY or DD/MM/YYYY - guess DD/MM if parts[0] > 12
          const p1 = parseInt(parts[0], 10);
          const p2 = parseInt(parts[1], 10);
          const y = parseInt(parts[2], 10);
          if (p1 > 12) {
             pubDate = new Date(y, p2 - 1, p1).toISOString();
          } else {
             // Assume DD/MM/YYYY for Europe
             pubDate = new Date(y, p2 - 1, p1).toISOString();
          }
        }
      } catch (e) { /* ignore date parse failure */ }
      
      const excerptRaw = $node.find('p').text().trim();
      const excerpt = excerptRaw ? excerptRaw.substring(0, 195) + '...' : 'Details inside...';
      
      const imgSrc = $node.find('img').attr('src');
      let absImgSrc = imgSrc;
      if (imgSrc && !imgSrc.startsWith('http')) {
        absImgSrc = 'https://soudronic.com' + imgSrc;
      }
      
      // Parse category. Usually there's a badge or tag.
      // Search for text like News, Events, Phase-out
      let category = 'News';
      const fullText = $node.text().toLowerCase();
      if (fullText.includes('event')) {
        category = 'Events';
      } else if (fullText.includes('phase-out')) {
        category = 'Phase-out';
      }
      
      const slug = slugify(title);

      if (category === 'Events') {
        await saveEvent({
          title,
          slug,
          date: pubDate,
          description: excerpt,
          externalUrl: link,
          source: 'soudronic',
          imageUrl: absImgSrc
        });
      } else {
        await saveNewsPost({
          title,
          slug,
          publishedAt: pubDate,
          excerpt,
          externalUrl: link,
          source: 'soudronic',
          category,
          imageUrl: absImgSrc
        });
      }
    }
  } catch (err) {
    console.error('Failed to sync Soudronic:', err);
  }
}

// -------------------------------------------------------------
// Routine C: Soudronic Events Only Scraping
// -------------------------------------------------------------
async function syncSoudronicEventsOnly() {
  console.log('--- Starting SOUDRONIC EVENTS ONLY Sync ---');
  try {
    const res = await fetch('https://soudronic.com/news-and-events/?filtered%5Bcategory%5D%5B%5D=events');
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // We target elements that have an anchor, h3, etc.
    const items = $('article, li').has('h3');
    
    // Convert to Array to support async operations inside
    const nodes = items.toArray();
    for (const node of nodes) {
      const $node = $(node);
      const title = $node.find('h3').text().trim();
      if (!title) continue;
      
      const anchorNode = $node.is('a') ? $node : $node.find('a');
      let link = anchorNode.attr('href') || '';
      if (link && !link.startsWith('http')) link = 'https://soudronic.com' + link;

      const dateText = $node.find('.date, time').first().text().trim() || new Date().toLocaleDateString();
      let pubDate = new Date().toISOString();
      try {
        const parts = dateText.split('/');
        if (parts.length === 3) {
          const p1 = parseInt(parts[0], 10);
          const p2 = parseInt(parts[1], 10);
          const y = parseInt(parts[2], 10);
          if (p1 > 12) pubDate = new Date(y, p2 - 1, p1).toISOString();
          else pubDate = new Date(y, p2 - 1, p1).toISOString();
        }
      } catch (e) { }
      
      const excerptRaw = $node.find('p').text().trim();
      const excerpt = excerptRaw ? excerptRaw.substring(0, 195) + '...' : 'Details inside...';
      
      const imgSrc = $node.find('img').attr('src');
      let absImgSrc = imgSrc;
      if (imgSrc && !imgSrc.startsWith('http')) absImgSrc = 'https://soudronic.com' + imgSrc;

      const slug = slugify(title);

      await saveEvent({
        title,
        slug,
        date: pubDate,
        description: excerpt,
        externalUrl: link,
        source: 'soudronic',
        imageUrl: absImgSrc
      });
    }
  } catch (err) {
    console.error('Failed to sync Soudronic Events Only:', err);
  }
}

// -------------------------------------------------------------
// Core Save Functions
// -------------------------------------------------------------
async function saveNewsPost(data: {
  title: string, slug: string, publishedAt: string, excerpt: string, 
  externalUrl: string, source: string, category: string, imageUrl?: string
}) {
  console.log(`\nVerifying payload: ${data.slug}`);
  
  // 1. Check uniqueness
  const existing = await client.fetch(`*[_type == "newsPost" && slug.current == $slug][0]`, { slug: data.slug });
  if (existing) {
    console.log(`[Skip] Document already exists: ${data.slug}`);
    return;
  }
  
  // 2. Transmute image if exists
  let mainImageAssetId = undefined;
  if (data.imageUrl) {
    mainImageAssetId = await uploadImageFromUrl(data.imageUrl, data.slug + '.jpg');
  }
  
  // 3. Create document properties
  const doc: any = {
    _type: 'newsPost',
    title: data.title,
    slug: { _type: 'slug', current: data.slug },
    publishedAt: data.publishedAt,
    excerpt: data.excerpt,
    externalUrl: data.externalUrl,
    source: data.source,
    category: data.category,
  };
  
  if (mainImageAssetId) {
    doc.mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: mainImageAssetId }
    };
  }
  
  try {
    const created = await client.create(doc);
    console.log(`[Created] -> ${created._id}`);
  } catch (err: any) {
    console.error(`[Error] Creating document ${data.slug}: ${err.message}`);
  }
}

async function saveEvent(data: {
  title: string, slug: string, date: string, description: string, 
  externalUrl: string, source: string, imageUrl?: string
}) {
  console.log(`\nVerifying Event payload: ${data.slug}`);
  
  const existing = await client.fetch(`*[_type == "event" && slug.current == $slug][0]`, { slug: data.slug });
  if (existing) {
    console.log(`[Skip] Event Document already exists: ${data.slug}`);
    return;
  }
  
  let mainImageAssetId = undefined;
  if (data.imageUrl) {
    mainImageAssetId = await uploadImageFromUrl(data.imageUrl, data.slug + '.jpg');
  }
  
  const doc: any = {
    _type: 'event',
    title: data.title,
    slug: { _type: 'slug', current: data.slug },
    date: data.date,
    description: data.description,
    externalUrl: data.externalUrl,
    source: data.source,
  };
  
  if (mainImageAssetId) {
    doc.mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: mainImageAssetId }
    };
  }
  
  try {
    const created = await client.create(doc);
    console.log(`[Created Event] -> ${created._id}`);
  } catch (err: any) {
    console.error(`[Error] Creating Event document ${data.slug}: ${err.message}`);
  }
}

// Orchestrator
async function run() {
  await syncKoenigBauerScraping();
  await syncSoudronicScraping();
  await syncSoudronicEventsOnly();
  console.log('\nSync Automation Complete!');
}

run();
