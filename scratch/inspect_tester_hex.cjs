const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');
const line = lines.find(l => l.includes('"tester":'));
if (line) {
    console.log('LINE:', line);
    console.log('HEX:', Buffer.from(line).toString('hex'));
}
