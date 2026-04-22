const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
const content = JSON.parse(fs.readFileSync(path, 'utf8'));
console.log('Keys in productValues:', Object.keys(content.productValues || {}));
console.log('Value for OFFSET METAL PRINTING MACHINES:', content.productValues?.['OFFSET METAL PRINTING MACHINES']);
console.log('Value for Industrial Packaging:', content.productValues?.['Industrial Packaging']);
