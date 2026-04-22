const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
let content = fs.readFileSync(path, 'utf8');

const searchToken = '"n1": "Soprani Engineering - Inovação na Itália"';
const searchIndex = content.indexOf(searchToken);
if (searchIndex === -1) {
    console.log('Search token not found');
    process.exit(1);
}

let pos = searchIndex + searchToken.length;
pos = content.indexOf('}', pos); // end of results
pos = content.indexOf('}', pos + 1); // end of search

let base = content.substring(0, pos + 1);

const finalPart = `,\n\t"productDescriptions": {\n\t\t"spn-soudronic-slitter": "Slitters guilhotina de alta precisão ou slitters rotativos com cabeçotes de corte totalmente automatizados que permitem mudanças rápidas de formato. Fabricados sob medida pela Ocsam Cepak e Switzerland Can Man AG — extremamente robustos com ajuste simples e rápido para diferentes formatos de blanks.",\n\t\t"tester": "Testadores de queda de pressão e luz para todos os tamanhos e formatos — redondos, quadrados, irregulares, latas, tambores, baldes. Unidades de teste carrossel ou lineares ajustam-se facilmente ao tamanho e formato do recipiente metálico."\n\t},\n\t"productValues": {\n\t\t"Pressure decay and light testing": "Teste de queda de pressão e luz",\n\t\t"Round, square, irregular, cans, drums, pails": "Redondos, quadrados, irregulares, latas, tambores, baldes",\n\t\t"Carousel or linear": "Carrossel ou linear"\n\t}\n}`;

fs.writeFileSync(path, base + finalPart, 'utf8');
console.log('REBUILT JSON');
