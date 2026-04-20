const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('kb_news.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Koenig Bauer Structure Analysis ---');
const items = $('.teaser, .news-and-trends__column');
console.log('Found objects:', items.length);

items.each((i, el) => {
  const $el = $(el);
  const isBig = $el.hasClass('news-and-trends__column--big');
  console.log(`\nItem ${i} (Big? ${isBig})`);
  
  const linkNode = $el.is('a') ? $el : $el.find('a').first();
  const link = linkNode.attr('href');
  
  const title = $el.find('h2, h3, .h2, .h3').text().trim() || $el.find('strong, b').text().trim();
  const textRaw = $el.text().trim();
  const imgSrc = $el.find('img').attr('src');
  
  console.log('  -> Link:', link);
  console.log('  -> Raw text (start):', textRaw.substring(0, 150).replace(/\n/g, ' '));
  console.log('  -> First Title tags:', title);
  console.log('  -> Img:', imgSrc);
});
