const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
const content = JSON.parse(fs.readFileSync(path, 'utf8'));

// Add categories to productValues
content.productValues = {
    ...content.productValues,
    "OFFSET METAL PRINTING MACHINES": "Máquinas Offset para Metal",
    "COATING MACHINES": "Máquinas de Envernizamento",
    "DIGITAL METAL PRINTING MACHINES": "Máquinas de Impressão Digital",
    "SLITTER": "Slitters",
    "TESTER": "Testadores"
};

fs.writeFileSync(path, JSON.stringify(content, null, 8), 'utf8');
console.log('ADDED CATEGORIES TO TRANSLATIONS');
