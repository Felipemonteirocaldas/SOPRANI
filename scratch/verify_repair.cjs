const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
const content = fs.readFileSync(path, 'utf8');
console.log('Sample "Serviços":', content.includes('Serviços'));
console.log('Sample "Máquina":', content.includes('Máquina'));
console.log('Sample "Inovação":', content.includes('Inovação'));
console.log('Sample "Área":', content.includes('Área'));
console.log('Valid JSON:', (() => { try { JSON.parse(content); return true; } catch (e) { return e.message; } })());
