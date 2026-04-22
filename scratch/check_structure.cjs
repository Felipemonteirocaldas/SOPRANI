const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
const content = JSON.parse(fs.readFileSync(path, 'utf8'));
console.log('productArsenal:', content.productArsenal);
console.log('productValues:', content.productValues);
