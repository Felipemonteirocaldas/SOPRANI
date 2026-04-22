const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
try {
    const content = fs.readFileSync(path, 'utf8');
    JSON.parse(content);
    console.log('VALID');
} catch (e) {
    console.log('INVALID: ' + e.message);
}
