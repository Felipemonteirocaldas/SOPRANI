const fs = require('fs');

function getKeys(obj, prefix = '') {
  return Object.keys(obj).reduce((res, el) => {
    if (typeof obj[el] === 'object' && obj[el] !== null && !Array.isArray(obj[el])) {
      return [...res, ...getKeys(obj[el], prefix + el + '.')];
    }
    return [...res, prefix + el];
  }, []);
}

const pt = JSON.parse(fs.readFileSync('src/i18n/locales/pt/translation.json', 'utf8'));
const ptKeys = getKeys(pt);

['en', 'it', 'es'].forEach(lang => {
  const data = JSON.parse(fs.readFileSync(`src/i18n/locales/${lang}/translation.json`, 'utf8'));
  const langKeys = getKeys(data);
  const missing = ptKeys.filter(k => !langKeys.includes(k));
  if (missing.length > 0) {
    console.log(`Missing keys in ${lang}:`, missing);
  } else {
    console.log(`No missing keys in ${lang}`);
  }
});
