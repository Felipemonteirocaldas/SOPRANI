const fs = require('fs');
const path = require('path');

function getTKeys(dir) {
  let keys = new Set();
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getTKeys(fullPath).forEach(k => keys.add(k));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.matchAll(/t\(['"]([^'"]+)['"]/g);
      for (const match of matches) {
        keys.add(match[1]);
      }
    }
  });
  return keys;
}

const pt = JSON.parse(fs.readFileSync('src/i18n/locales/pt/translation.json', 'utf8'));
function hasKey(obj, path) {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (!current || typeof current !== 'object') return false;
    current = current[part];
  }
  return current !== undefined;
}

const usedKeys = getTKeys('src');
let missingInPt = [];
usedKeys.forEach(key => {
  if (!hasKey(pt, key)) {
    missingInPt.push(key);
  }
});

console.log('Keys used in code but missing in pt/translation.json:', missingInPt);
