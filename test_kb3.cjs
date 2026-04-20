const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('kb_news.html', 'utf8');
const $ = cheerio.load(html);

const items = $('.teaser, .news-and-trends__column');
items.each((i, el) => {
  const $el = $(el);
  const linkNode = $el.is('a') ? $el : $el.find('a').first();
  const link = linkNode.attr('href');
  
  if(link && link.includes('/news/events/')) return; // skip events link
  
  const textRaw = $el.text().replace(/\n/g, ' ').replace(/\s\s+/g, ' ').trim();
  
  // Format: "17. Feb 2026 / NewsKoenig & Bauer..."
  // Try to regex match: Date (dd. Mmm yyyy), Category (News/Article), and Title
  const match = textRaw.match(/^([\d]{2}\.\s*[A-Za-z]{3}\s*\d{4})\s*\/\s*(?:News|Press Release|Article)?(.*)$/i);
  
  let dateText = '';
  let title = '';
  
  if(match) {
    dateText = match[1];
    title = match[2];
    if (title.startsWith('News')) title = title.substring(4);
  } else {
    // fallback
    title = textRaw;
  }
  
  const imgSrc = $el.find('img').attr('src');
  
  console.log(`\n--- Item ${i} ---`);
  console.log('Date:', dateText);
  console.log('Title:', title.substring(0, 100));
});
