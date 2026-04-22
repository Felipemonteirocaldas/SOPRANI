const fs = require('fs');

const langs = ['en', 'it', 'es'];

const missingUI = {
  it: {
    "servicesSection.tradingTitle": "Trading & Sourcing",
    "techPage.ctaTitle": "Pronti a ottimizzare la vostra produzione?",
    "techPage.ctaDesc": "Contattateci oggi stesso per una consulenza tecnica specializzata.",
    "techPage.ctaBtn1": "Contattaci",
    "techPage.ctaBtn2": "Sfoglia Catalogo",
    "productSpecs.gripperMargin": "Margine Pinza",
    "productSpecs.sheetWidth": "Larghezza Foglio",
    "productSpecs.sheetLength": "Lunghezza Foglio",
    "productSpecs.strips": "Strisce",
    "productSpecs.output": "Produzione"
  },
  es: {
    "servicesSection.tradingTitle": "Comercio y Abastecimiento",
    "techPage.ctaTitle": "¿Listo para optimizar su producción?",
    "techPage.ctaDesc": "Contáctenos hoy mismo para una consulta técnica especializada.",
    "techPage.ctaBtn1": "Contáctanos",
    "techPage.ctaBtn2": "Ver Catálogo",
    "productSpecs.gripperMargin": "Margen de Pinza",
    "productSpecs.sheetWidth": "Ancho de Chapa",
    "productSpecs.sheetLength": "Largo de Chapa",
    "productSpecs.strips": "Tiras",
    "productSpecs.output": "Producción"
  },
  en: {
    "header.machineryDesc": "Global metal decorating and can making systems.",
    "header.technicalAssistanceDesc": "Expert repair and optimization services.",
    "header.sparePartsDesc": "Original parts for Koenig & Bauer and Soudronic.",
    "header.allServicesDesc": "Explore our full range of industrial solutions.",
    "servicesSection.tradingTitle": "Trading & Sourcing",
    "techPage.ctaTitle": "Ready to optimize your production?",
    "techPage.ctaDesc": "Contact us today for a specialized technical consultation.",
    "techPage.ctaBtn1": "Contact Us",
    "techPage.ctaBtn2": "Browse Catalog",
    "productSpecs.gripperMargin": "Gripper Margin",
    "productSpecs.sheetWidth": "Sheet Width",
    "productSpecs.sheetLength": "Sheet Length",
    "productSpecs.strips": "Strips",
    "productSpecs.output": "Output"
  }
};

function setDeep(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

const pt = JSON.parse(fs.readFileSync('src/i18n/locales/pt/translation.json', 'utf8'));

langs.forEach(lang => {
  const path = `src/i18n/locales/${lang}/translation.json`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  // Apply specific UI fixes
  Object.entries(missingUI[lang]).forEach(([k, v]) => {
    setDeep(data, k, v);
  });
  
  // Sync productTitles/Descriptions/Values from PT if missing
  ['productTitles', 'productDescriptions', 'productValues'].forEach(section => {
    if (!data[section]) data[section] = {};
    Object.entries(pt[section]).forEach(([k, v]) => {
      if (!data[section][k]) {
        // For EN, we might want to keep it as is (which will fallback to Sanity) or put English version
        // For IT/ES, we put the PT version as a placeholder if we don't have it, but here we likely want to translate
        data[section][k] = v; 
      }
    });
  });
  
  fs.writeFileSync(path, JSON.stringify(data, null, 8), 'utf8');
  console.log(`Deep sync completed for ${lang}`);
});
