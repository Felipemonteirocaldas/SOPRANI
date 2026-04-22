const fs = require('fs');

const pt = JSON.parse(fs.readFileSync('src/i18n/locales/pt/translation.json', 'utf8'));

const updates = {
  it: {
    "productArsenal": {
      "industryApplication": "Applicazione Industriale",
      "industrialPackaging": "Imballaggio Industriale"
    },
    "partners": {
      "kbTagline": "Leader Globale nella Decorazione dei Metalli",
      "soudronicTagline": "Sistemi per la Produzione di Lattine Turnkey"
    },
    "news": {
      "readMore": "Leggi di più",
      "noNews": "Nessuna notizia disponibile al momento.",
      "industrialSolution": "Soluzione Industriale Soprani"
    }
  },
  es: {
    "productArsenal": {
      "industryApplication": "Aplicación Industrial",
      "industrialPackaging": "Embalaje Industrial"
    },
    "partners": {
      "kbTagline": "Líder Global en Decoración de Metales",
      "soudronicTagline": "Sistemas de Fabricación de Latas Turnkey"
    },
    "news": {
      "readMore": "Leer más",
      "noNews": "No hay noticias disponibles en este momento.",
      "industrialSolution": "Solución Industrial Soprani"
    }
  },
  en: {
    "productArsenal": {
      "industryApplication": "Industry Application",
      "industrialPackaging": "Industrial Packaging"
    },
    "partners": {
      "kbTagline": "Global Leader in Metal Decorating",
      "soudronicTagline": "Turnkey Can Making Systems"
    },
    "news": {
      "readMore": "Read more",
      "noNews": "No news available at the moment.",
      "industrialSolution": "Soprani Industrial Solution"
    }
  }
};

Object.keys(updates).forEach(lang => {
  const path = `src/i18n/locales/${lang}/translation.json`;
  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    
    // Merge productArsenal
    if (!data.productArsenal) data.productArsenal = {};
    Object.assign(data.productArsenal, updates[lang].productArsenal);
    
    // Merge partners
    if (!data.partners) data.partners = {};
    Object.assign(data.partners, updates[lang].partners);
    
    // Merge news
    if (!data.news) data.news = {};
    Object.assign(data.news, updates[lang].news);
    
    fs.writeFileSync(path, JSON.stringify(data, null, 8), 'utf8');
    console.log(`Updated ${lang}/translation.json with missing keys`);
  }
});
