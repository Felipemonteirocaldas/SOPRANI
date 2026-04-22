const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
const content = fs.readFileSync(path, 'utf8');
console.log('SURROUNDING 45518:', JSON.stringify(content.substring(45450, 45600)));
