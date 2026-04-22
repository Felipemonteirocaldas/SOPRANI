const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
let content = fs.readFileSync(path, 'utf8');

const target = '"productDescriptions": {';
const index = content.indexOf(target);
if (index !== -1) {
	const base = content.substring(0, index);
	const final = `"productDescriptions": {
		"spn-soudronic-slitter": "Slitters guilhotina de alta precisão ou slitters rotativos com cabeçotes de corte totalmente automatizados que permitem mudanças rápidas de formato. Fabricados sob medida pela Ocsam Cepak e Switzerland Can Man AG — extremamente robustos com ajuste simples e rápido para diferentes formatos de blanks.",
		"tester": "Testadores de queda de pressão e luz para todos os tamanhos e formatos — redondos, quadrados, irregulares, latas, tambores, baldes. Unidades de teste carrossel ou lineares ajustam-se facilmente ao tamanho e formato do recipiente metálico."
	},
	"productValues": {
		"Pressure decay and light testing": "Teste de queda de pressão e luz",
		"Round, square, irregular, cans, drums, pails": "Redondos, quadrados, irregulares, latas, tambores, baldes",
		"Carousel or linear": "Carrossel ou linear"
	}
}`;
	fs.writeFileSync(path, base + final, 'utf8');
	console.log('REBUILT SUCCESSFULLY');
} else {
	console.log('TARGET NOT FOUND');
}
