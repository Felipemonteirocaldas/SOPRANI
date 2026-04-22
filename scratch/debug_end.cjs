const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
const content = fs.readFileSync(path, 'utf8');
console.log('LENGTH:', content.length);
console.log('END:', JSON.stringify(content.substring(content.length - 100)));
