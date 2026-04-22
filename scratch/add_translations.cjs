const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
const content = JSON.parse(fs.readFileSync(path, 'utf8'));

// Add more product descriptions
content.productDescriptions = {
    ...content.productDescriptions,
    "mailander-283": "Combina a comprovada e robusta tecnologia Mailänder com as unidades de impressão de alta performance da MetalStar 4. Perfeita para imprimir chapas desafiadoras para a indústria de embalagens metálicas com máxima flexibilidade através de design modular.",
    "metalstar-4": "A referência mundial em impressão offset de metal. Oferece a mais alta velocidade de produção, automação completa e qualidade de impressão inigualável para o setor de embalagens metálicas.",
    "metjet-one": "O primeiro sistema de impressão digital por jato de tinta para metal que combina tecnologia de ponta com operação simplificada. Ideal para pequenas tiragens, personalização e prototipagem rápida.",
    "metalcoat-471": "Sistema de envernizamento de alta precisão projetado para aplicação uniforme em diversos tipos de chapas metálicas, garantindo proteção e acabamento superior.",
    "metalcoat-481": "Linha de envernizamento avançada com sistemas de controle automatizados, permitindo alta cadência produtiva e trocas rápidas de formato.",
    "metalcoat-483": "A solução definitiva para envernizamento industrial de alto volume, com máxima eficiência energética e integração total com linhas de produção Soudronic."
};

// Add common values that might be in English in Sanity
content.productValues = {
    ...content.productValues,
    "Industrial Packaging": "Embalagem Industrial",
    "Metal Decorating & Printing": "Decoração & Impressão de Metais",
    "Can Making & Welding": "Fabricação de Latas & Soldagem",
    "Online": "Online",
    "Authorized Partner": "Parceiro Autorizado"
};

fs.writeFileSync(path, JSON.stringify(content, null, 8), 'utf8');
console.log('ADDED PRODUCT TRANSLATIONS');
