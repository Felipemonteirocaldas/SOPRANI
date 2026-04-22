const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
let content = fs.readFileSync(path, 'utf8');

// This map fixes the "Double UTF-8" encoding (UTF-8 bytes interpreted as Windows-1252 and re-saved as UTF-8)
const doubleUtf8Fixes = {
    'Ã¡': 'á',
    'Ã¢': 'â',
    'Ã£': 'ã',
    'Ã ': 'à',
    'Ã§': 'ç',
    'Ã©': 'é',
    'Ãª': 'ê',
    'Ã­': 'í',
    'Ã³': 'ó',
    'Ã´': 'ô',
    'Ãµ': 'õ',
    'Ãº': 'ú',
    'Ã¼': 'ü',
    'Ã ': 'À',
    'Ã ': 'Á',
    'Ã‚': 'Â',
    'Ãƒ': 'Ã',
    'Ã‡': 'Ç',
    'Ã‰': 'É',
    'ÃŠ': 'Ê',
    'Ã ': 'Í',
    'Ã“': 'Ó',
    'Ã”': 'Ô',
    'Ã•': 'Õ',
    'Ãš': 'Ú',
    'Ã': 'í', // Some variations
    'Ãª': 'ê',
    'Ãº': 'ú',
    'Ã³': 'ó',
    'Ã±': 'ñ',
    'Â·': '·',
    'â€”': '—',
    'â€“': '–',
    'Ãº': 'ú',
    'Ã¡': 'á'
};

// Apply fixes in a loop
for (const [broken, fixed] of Object.entries(doubleUtf8Fixes)) {
    // We use a regex with global flag to replace all occurrences
    // Escape special characters in 'broken' for the regex
    const escapedBroken = broken.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    content = content.replace(new RegExp(escapedBroken, 'g'), fixed);
}

// Write it back as clean UTF-8
fs.writeFileSync(path, content, 'utf8');
console.log('REPAIRED DOUBLE ENCODING');
