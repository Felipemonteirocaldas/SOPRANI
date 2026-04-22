const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
let content = fs.readFileSync(path, 'utf8');

// Find the LAST closing brace
const lastBrace = content.lastIndexOf('}');
if (lastBrace !== -1) {
    content = content.substring(0, lastBrace + 1);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Fixed file. New length:', content.length);
} else {
    console.log('No closing brace found!');
}
