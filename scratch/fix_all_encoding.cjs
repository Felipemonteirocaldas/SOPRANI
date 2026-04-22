const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
let content = fs.readFileSync(path, 'utf8');

// Mapping of broken UTF-8 sequences to correct characters
// These were likely caused by reading 1252 as UTF-8 or vice versa
const fixes = {
    'precisǜo': 'precisão',
    'mudanas': 'mudanças',
    'rǭpidas': 'rápidas',
    'metǭlico': 'metálico',
    'cabeotes': 'cabeçotes',
    'Inovaǟo': 'Inovação',
    'Itǭlia': 'Itália',
    'pressǜo': 'pressão',
    'Peas': 'Peças',
    'Mǟquina': 'Máquina',
    'Itǭlia': 'Itália',
    'Inovaǟo': 'Inovação',
    'ServiÃ§os': 'Serviços',
    'OrÃ§amento': 'Orçamento',
    'MaquinÃ¡rio': 'Maquinário',
    'AssistÃªncia': 'Assistência',
    'TÃ©cnica': 'Técnica',
    'SoluÃ§Ãµes': 'Soluções',
    'IndÃºstrias': 'Indústrias',
    'NotÃ­cias': 'Notícias',
    'MÃ¡quina': 'Máquina',
    'NÃ³s': 'Nós',
    'produÃ§Ã£o': 'produção',
    'avaliaÃ§Ã£o': 'avaliação',
    'Ãºltimas': 'últimas',
    'metÃ¡licas': 'metálicas',
    'fÃ¡bricas': 'fábricas',
    'Ã frica': 'África',
    'Ã sia': 'Ásia',
    'CotaÃ§Ã£o': 'Cotação',
    'ExperiÃªncia': 'Experiência',
    'ExcelÃªncia': 'Excelência',
    'TradiÃ§Ã£o': 'Tradição',
    'histÃ³ria': 'história',
    'pÃ¡ginas': 'páginas',
    'notÃ­cias': 'notícias',
    'InovaÃ§Ã£o': 'Inovação',
    'ItÃ¡lia': 'Itália',
    'precisÃ£o': 'precisão',
    'mudanÃ§as': 'mudanças',
    'rÃ¡pidas': 'rápidas',
    'metÃ¡lico': 'metálico',
    'cabeÃ§otes': 'cabeçotes',
    'pressÃ£o': 'pressão'
};

for (const [broken, fixed] of Object.entries(fixes)) {
    content = content.split(broken).join(fixed);
}

// Special case for em dash
content = content.replace(/\?/g, '—');
content = content.replace(/ǽ'\?\?/g, '—');

fs.writeFileSync(path, content, 'utf8');
console.log('FIXED ENCODING');
