const fs = require('fs');
const ptPath = 'src/i18n/locales/pt/translation.json';
const pt = JSON.parse(fs.readFileSync(ptPath, 'utf8'));

const translations = {
  "productTitles": {
    "metalstar-4": "MetalStar 4",
    "ecotnv": "EcoTNV",
    "highecon-drying-oven": "Forno de Secagem HighEcon",
    "mailaender-283": "Mailänder 283",
    "metalcoat-471": "MetalCoat 471",
    "metalcoat-480": "MetalCoat 480",
    "metalcoat-483": "MetalCoat 483",
    "metalcure-led": "MetalCure LED",
    "metalcure-uv": "MetalCure UV",
    "metjet-one": "MetJET ONE",
    "soudronic-2-piece-cans": "Latas de 2 Peças",
    "soudronic-accessories": "Acessórios",
    "soudronic-can-assembling": "Montagem de Latas",
    "soudronic-coating": "Revestimento (Coating)",
    "soudronic-conveyor": "Transportadores (Conveyors)",
    "soudronic-curing": "Cura (Curing)",
    "soudronic-digital-solutions": "Soluções Digitais",
    "soudronic-end-making": "Fabricação de Tampas",
    "soudronic-palletizer": "Paletizadores",
    "soudronic-peel-off": "Tampas Peel-off",
    "soudronic-slitter": "Cortadora Slitter",
    "soudronic-tester": "Testadores Industriais",
    "soudronic-transfer": "Sistemas de Transferência",
    "soudronic-welder": "Soldadora de Corpos de Lata",
    "thermal-drying-ovens": "Fornos de Secagem Térmica",
    "tnv": "Sistema TNV"
  },
  "productDescriptions": {
    "metalstar-4": "O novo benchmark de performance em decoração de metal. Projetado para as mais altas exigências de automação e produtividade — ideal para os segmentos de alimentos, linha geral ou tampas, oferecendo vantagens significativas em economia e eficiência.",
    "ecotnv": "Sistema de purificação de ar de exaustão térmica altamente eficiente para linhas de produção de decoração de metal. Projetado para minimizar o consumo de energia enquanto garante total conformidade com os padrões de emissão.",
    "highecon-drying-oven": "Forno de secagem com eficiência energética para decoração de chapas metálicas. Projetado para máxima economia de energia e alto rendimento em linhas modernas de produção de embalagens metálicas.",
    "mailaender-283": "Combina a comprovada e robusta tecnologia Mailänder com as unidades de impressão de alta performance da MetalStar 4. Perfeita para imprimir chapas desafiadoras para a indústria de embalagens metálicas com máxima flexibilidade através de design modular.",
    "metalcoat-471": "Máquina de envernizamento de alta performance que oferece a mais alta eficiência e precisão para o envernizamento moderno de chapas metálicas. Enverniza com precisão chapas de folha de flandres, TFS e alumínio em formatos retangulares e scroll com controle de linha inteligente.",
    "metalcoat-480": "Idealmente adequada para envernizamento UV inline dentro de uma linha de impressão UV. Possui tecnologia de acionamento dedicada, posicionamento de cilindro assistido por laser e memória de trabalhos para trocas rápidas. Acompanha as altas cadências de produção das impressoras modernas.",
    "metalcoat-483": "A máquina de envernizamento mais moderna do mercado. Apresenta um sistema de envernizamento de três rolos recém-desenvolvido, acionamentos dedicados, painéis touch com memória e preparação assistida por laser. Até 25% mais rápida na preparação do que as gerações anteriores.",
    "metalcure-led": "Tecnologia de cura UV LED de última geração para secagem intermediária ou final. Sem entrada de calor na chapa metálica, economia de energia de até 80% em comparação com a secagem UV convencional, com desligamento de segmentos não utilizados dependente do formato.",
    "metalcure-uv": "Sistema de cura UV para secagem intermediária e final de vernizes e tintas UV em linhas de decoração de metal. Garante uma cura rápida e confiável para produção de alta velocidade.",
    "metjet-one": "A primeira máquina digital de decoração de metal. Combina a tecnologia inkjet mais avançada com manuseio confiável de chapas. Operação simples e intuitiva com eficiência de custos e flexibilidade para requisitos de produção exigentes.",
    "soudronic-2-piece-cans": "Linhas de produção completas para corpos de latas trefilados redondos, cônicos, retangulares ou de formatos irregulares. Prensas de alta performance e máquinas combinadas 2PC para máximo rendimento.",
    "soudronic-accessories": "Equipamentos e dispositivos adicionais adequados para cada etapa do processo de um sistema de fabricação de latas. Complementa cada linha de produção Soudronic com acessórios construídos sob medida para performance máxima.",
    "soudronic-can-assembling": "Sistemas multifuncionais que realizam várias operações, desde a conformação até a recravação em velocidades baixas, médias e altas. Apresentam alto nível de modularidade e capacidade de processo para diversos tipos de latas.",
    "soudronic-coating": "Sistemas totalmente automatizados de revestimento em pó ou lacagem úmida para costuras internas e externas em várias posições. Garantem operação fácil e limpa com baixo consumo de pó ou laca.",
    "soudronic-conveyor": "Sistemas de transporte de fornecedores terceirizados de confiança, projetados de acordo com as necessidades de nossos clientes. Integrados perfeitamente nas linhas de produção Soudronic para transporte eficiente de latas.",
    "soudronic-curing": "Gama modular de sistemas de cura projetados para curar a camada de proteção da costura de forma eficaz. Disponível como aquecimento a gás ou indução em configuração linear ou em forma de U.",
    "soudronic-digital-solutions": "Soluções digitais inovadoras que abordam os desafios diários da produção. Inclui controle central de linha UNICONTROL, plataforma de conectividade DISCON+ e ferramentas baseadas em dados para otimização de performance.",
    "soudronic-end-making": "Prensas multi-matrizes de alta eficiência para tampas e shells. Projetadas para máxima produtividade e precisão na produção de tampas de latas para a indústria de embalagens metálicas.",
    "soudronic-palletizer": "Sistemas de paletização customizados de fornecedores terceirizados de confiança e empilhadores para linhas gerais da Sabatier. Projetados para automação confiável de fim de linha na fabricação de latas.",
    "soudronic-peel-off": "Sistemas de selagem térmica de uma ou várias pistas para produzir tampas peel-off (POE). Projetados para produção confiável e de alta velocidade de tampas de abertura fácil para embalagens metálicas alimentares e não alimentares.",
    "soudronic-slitter": "Slitters guilhotina de alta precisão ou slitters rotativos com cabeçotes de corte totalmente automatizados que permitem mudanças rápidas de formato. Fabricados sob medida pela Ocsam Cepak e Switzerland Can Man AG — extremamente robustos com ajuste simples e rápido para diferentes formatos de blanks.",
    "soudronic-tester": "Testadores de queda de pressão e luz para todos os tamanhos e formatos — redondos, quadrados, irregulares, latas, tambores, baldes. Unidades de teste carrossel ou lineares ajustam-se facilmente ao tamanho e formato do recipiente metálico.",
    "soudronic-transfer": "Sistemas de transferência de alta capacidade para todos os layouts e configurações de sistema com uma capacidade de alimentação de até 1.500 blanks por minuto. Projetados para integração perfeita entre a slitter e a soldadora.",
    "soudronic-welder": "Máquinas de solda que oferecem máxima velocidade, eficiência e flexibilidade, confiabilidade e facilidade de uso. O núcleo de cada linha de produção de latas de três peças, moldando e soldando corpos de latas com precisão.",
    "thermal-drying-ovens": "Soluções confiáveis de secagem térmica para revestimentos e tintas à base de solvente em linhas de produção de decoração de metal. Disponível em várias configurações para atender aos requisitos da linha.",
    "tnv": "Sistema de purificação de ar de exaustão térmica para tratamento confiável de ar carregado de solvente de fornos de secagem em linhas de decoração de metal. Garante conformidade com as regulamentações ambientais."
  }
};

// Merge translations
Object.assign(pt.productTitles, translations.productTitles);
Object.assign(pt.productDescriptions, translations.productDescriptions);

fs.writeFileSync(ptPath, JSON.stringify(pt, null, 8), 'utf8');
console.log('Successfully updated all product translations in pt/translation.json');
