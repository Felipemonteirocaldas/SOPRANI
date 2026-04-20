const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('kb_news.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- Koenig Bauer HTML Links Analysis ---');

$('a').slice(0, 100).each((i, el) => {
  const href = $(el).attr('href');
  if (href && href.includes('/en/news/')) {
    console.log('Found News Link:', href);
    console.log('  -> Text:', $(el).text().trim().substring(0, 50));
    console.log('  -> Classes:', $(el).attr('class'));
    console.log('  -> Parent classes:', $(el).parent().attr('class'));
  }
});
