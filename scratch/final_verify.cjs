const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
const content = fs.readFileSync(path, 'utf8');
console.log('Sample "mailander-283":', content.includes('mailander-283'));
console.log('Valid JSON:', (() => { try { JSON.parse(content); return true; } catch (e) { return e.message; } })());
