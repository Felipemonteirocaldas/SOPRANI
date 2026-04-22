const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
const content = fs.readFileSync(path, 'utf8');
console.log('Contains "precisão":', content.includes('precisão'));
console.log('Contains "rápidas":', content.includes('rápidas'));
console.log('Contains "tester":', content.includes('tester'));
console.log('Contains "productValues":', content.includes('productValues'));
console.log('Valid JSON:', (() => { try { JSON.parse(content); return true; } catch (e) { return e.message; } })());
