const fs = require('fs');

const languages = ['it', 'es'];

const translations = {
  it: {
    "units": {
      "sheetsMin": "fogli/min",
      "sheetsHour": "fogli/ora",
      "cansMin": "lattine/min",
      "blanksMin": "blanks/min",
      "mMin": "m/min",
      "upTo": "Fino a "
    },
    "productTitles": {
      "metalstar-4": "MetalStar 4",
      "ecotnv": "EcoTNV",
      "highecon-drying-oven": "Forno di Essiccazione HighEcon",
      "mailaender-283": "Mailänder 283",
      "metalcoat-471": "MetalCoat 471",
      "metalcoat-480": "MetalCoat 480",
      "metalcoat-483": "MetalCoat 483",
      "metalcure-led": "MetalCure LED",
      "metalcure-uv": "MetalCure UV",
      "metjet-one": "MetJET ONE",
      "soudronic-2-piece-cans": "Lattine in 2 Pezzi",
      "soudronic-accessories": "Accessori",
      "soudronic-can-assembling": "Assemblaggio Lattine",
      "soudronic-coating": "Rivestimento (Coating)",
      "soudronic-conveyor": "Trasportatori",
      "soudronic-curing": "Polimerizzazione (Curing)",
      "soudronic-digital-solutions": "Soluzioni Digitali",
      "soudronic-end-making": "Produzione Coperchi",
      "soudronic-palletizer": "Pallettizzatori",
      "soudronic-peel-off": "Coperchi Peel-off",
      "soudronic-slitter": "Cesoia Slitter",
      "soudronic-tester": "Tester Industriali",
      "soudronic-transfer": "Sistemi di Trasferimento",
      "soudronic-welder": "Saldatrice per Corpi Lattina",
      "thermal-drying-ovens": "Forni di Essiccazione Termica",
      "tnv": "Sistema TNV"
    },
    "productDescriptions": {
      "metalstar-4": "Il nuovo punto di riferimento per le prestazioni nella decorazione del metallo. Progettato per le massime esigenze di automazione e produttività — ideale per i segmenti alimentare, general line o chiusure, offrendo vantaggi significativi in termini di economia ed efficienza.",
      "ecotnv": "Sistema di purificazione dell'aria di scarico termico altamente efficiente per linee di produzione di decorazione del metallo. Progettato per ridurre al minimo il consumo energetico garantendo al contempo la piena conformità agli standard di emissione.",
      "highecon-drying-oven": "Forno di essiccazione ad alta efficienza energetica per la decorazione di fogli metallici. Progettato per il massimo risparmio energetico e un elevato rendimento nelle moderne linee di produzione di imballaggi metallici.",
      "mailaender-283": "Combina la comprovata e robusta tecnologia Mailänder con le unità di stampa ad alte prestazioni della MetalStar 4. Perfetto per la stampa di fogli impegnativi per l'industria degli imballaggi metallici con la massima flessibilità tramite un design modulare.",
      "metalcoat-471": "Macchina per verniciatura ad alte prestazioni che offre la massima efficienza e precisione per la moderna verniciatura di fogli metallici. Vernicia con precisione fogli di banda stagnata, TFS e alluminio in formati rettangolari e scroll con controllo di linea intelligente.",
      "metalcoat-480": "Ideale per la verniciatura UV in linea all'interno di una linea di stampa UV. Dispone di tecnologia di azionamento dedicata, posizionamento del cilindro assistito da laser e memoria lavori per un avviamento più rapido. Mantiene il passo con le elevate velocità di produzione delle presse moderne.",
      "metalcoat-483": "La macchina per verniciatura più moderna sul mercato. Presenta un sistema di verniciatura a tre rulli di nuova concezione, azionamenti dedicati, pannelli touch con memoria e avviamento assistito da laser. Avviamento fino al 25% più rapido rispetto alle generazioni precedenti.",
      "metalcure-led": "Tecnologia di polimerizzazione UV LED all'avanguardia per l'essiccazione intermedia o finale. Nessun apporto di calore nel foglio metallico, risparmio energetico fino all'80% rispetto all'essiccazione UV convenzionale, con spegnimento dei segmenti inutilizzati in base al formato.",
      "metalcure-uv": "Sistema di polimerizzazione UV per l'essiccazione intermedia e finale di vernici e inchiostri UV nelle linee di decorazione del metallo. Garantisce una polimerizzazione rapida e affidabile per una produzione ad alta velocità.",
      "metjet-one": "La prima macchina digitale per la decorazione del metallo. Combina la tecnologia inkjet più avanzata con una gestione affidabile dei fogli. Funzionamento semplice e intuitivo con efficienza dei costi e flessibilità per requisiti di produzione esigenti.",
      "soudronic-2-piece-cans": "Linee di produzione complete per corpi di lattine imbutiti tondi, conici, rettangolari o di forma irregolare. Presse ad alte prestazioni e macchine combinate 2PC per la massima produzione.",
      "soudronic-accessories": "Attrezzature e dispositivi aggiuntivi adatti ad ogni fase del processo di un sistema di produzione di lattine. Integra ogni linea di produzione Soudronic con accessori costruiti appositamente per le massime prestazioni.",
      "soudronic-can-assembling": "Sistemi multifunzione che eseguono diverse operazioni dalla formatura all'aggraffatura a velocità bassa, media e alta. Caratterizzati da un'elevata modularità e capacità di processo per diversi tipi di lattine.",
      "soudronic-coating": "Sistemi di verniciatura a polvere o a liquido completamente automatizzati per giunzioni interne ed esterne in varie posizioni. Garantiscono un funzionamento facile e pulito e un basso consumo di polvere o vernice.",
      "soudronic-conveyor": "Sistemi di trasporto di fornitori terzi di fiducia progettati per le esigenze dei nostri clienti. Perfettamente integrati nelle linee di produzione Soudronic per un trasporto efficiente delle lattine.",
      "soudronic-curing": "Gamma modulare di sistemi di polimerizzazione progettati per polimerizzare efficacemente lo strato di protezione della giunzione. Disponibile con riscaldamento a gas o a induzione in configurazione lineare o a forma di U.",
      "soudronic-digital-solutions": "Soluzioni digitali innovative che affrontano le sfide quotidiane della produzione. Include il controllo centrale della linea UNICONTROL, la piattaforma di connettività DISCON+ e strumenti basati sui dati per l'ottimizzazione delle prestazioni.",
      "soudronic-end-making": "Presse multi-matrice ad alta efficienza per coperchi e fondelli. Progettate per la massima produttività e precisione nella produzione di coperchi per lattine per l'industria degli imballaggi metallici.",
      "soudronic-palletizer": "Sistemi di pallettizzazione personalizzati di fornitori terzi di fiducia e impilatori per linee generali di Sabatier. Progettati per un'automazione affidabile di fine linea nella produzione di lattine.",
      "soudronic-peel-off": "Sistemi di termosaldatura a una o più corsie per la produzione di coperchi peel-off (POE). Progettati per una produzione affidabile e ad alta velocità di coperchi a facile apertura per imballaggi metallici alimentari e non alimentari.",
      "soudronic-slitter": "Cesoie a ghigliottina ad alta precisione o cesoie rotative con teste di taglio completamente automatizzate che consentono rapidi cambi di formato. Realizzate su misura da Ocsam Cepak e Switzerland Can Man AG — estremamente robuste con regolazione semplice e rapida per diversi formati di blank.",
      "soudronic-tester": "Tester di caduta di pressione e luce per tutte le dimensioni e forme — tonde, quadrate, irregolari, lattine, fusti, secchi. Le unità di test rotative o lineari si adattano facilmente alle dimensioni e alla forma del contenitore metallico.",
      "soudronic-transfer": "Sistemi di trasferimento ad alta capacità per tutti i layout e le configurazioni di sistema con una capacità di alimentazione fino a 1.500 pezzi al minuto. Progettati per una perfetta integrazione tra cesoia e saldatrice.",
      "soudronic-welder": "Saldatrici che offrono massima velocità, efficienza e flessibilità, affidabilità e facilità d'uso. Il cuore di ogni linea di produzione di lattine in tre pezzi, che modella e salda i corpi delle lattine con precisione.",
      "thermal-drying-ovens": "Soluzioni affidabili di essiccazione termica per vernici e inchiostri a base solvente nelle linee di produzione di decorazione del metallo. Disponibili in varie configurazioni per soddisfare i requisiti della linea.",
      "tnv": "Sistema di purificazione dell'aria di scarico termico per il trattamento affidabile dell'aria carica di solventi proveniente dai forni di essiccazione nelle linee di decorazione del metallo. Garantisce la conformità alle normative ambientali."
    }
  },
  es: {
    "units": {
      "sheetsMin": "hojas/min",
      "sheetsHour": "hojas/hora",
      "cansMin": "latas/min",
      "blanksMin": "blanks/min",
      "mMin": "m/min",
      "upTo": "Hasta "
    },
    "productTitles": {
      "metalstar-4": "MetalStar 4",
      "ecotnv": "EcoTNV",
      "highecon-drying-oven": "Horno de Secado HighEcon",
      "mailaender-283": "Mailänder 283",
      "metalcoat-471": "MetalCoat 471",
      "metalcoat-480": "MetalCoat 480",
      "metalcoat-483": "MetalCoat 483",
      "metalcure-led": "MetalCure LED",
      "metalcure-uv": "MetalCure UV",
      "metjet-one": "MetJET ONE",
      "soudronic-2-piece-cans": "Latas de 2 Piezas",
      "soudronic-accessories": "Accesorios",
      "soudronic-can-assembling": "Ensamblaje de Latas",
      "soudronic-coating": "Recubrimiento (Coating)",
      "soudronic-conveyor": "Transportadores",
      "soudronic-curing": "Curado (Curing)",
      "soudronic-digital-solutions": "Soluciones Digitales",
      "soudronic-end-making": "Fabricación de Tapas",
      "soudronic-palletizer": "Paletizadores",
      "soudronic-peel-off": "Tapas Peel-off",
      "soudronic-slitter": "Cortadora Slitter",
      "soudronic-tester": "Probadores Industriales",
      "soudronic-transfer": "Sistemas de Transferencia",
      "soudronic-welder": "Soldadora de Cuerpos de Lata",
      "thermal-drying-ovens": "Hornos de Secado Térmico",
      "tnv": "Sistema TNV"
    },
    "productDescriptions": {
      "metalstar-4": "El nuevo referente de rendimiento en la decoración de metales. Diseñado para las más altas exigencias de automatización y productividad — ideal para los segmentos de alimentación, línea general o cierres, ofreciendo ventajas significativas en economía y eficiencia.",
      "ecotnv": "Sistema de purificación de aire de escape térmico altamente eficiente para líneas de producción de decoración de metales. Diseñado para minimizar el consumo de energía garantizando al mismo tiempo el cumplimiento total de los estándares de emisión.",
      "highecon-drying-oven": "Horno de secado de alta eficiencia energética para la decoración de chapas metálicas. Diseñado para el máximo ahorro de energía y un alto rendimiento en las modernas líneas de producción de envases metálicos.",
      "mailaender-283": "Combina la probada y robusta tecnología Mailänder con las unidades de impresión de alto rendimiento de la MetalStar 4. Perfecto para la impresión de chapas exigentes para la industria del envase metálico con la máxima flexibilidad mediante un diseño modular.",
      "metalcoat-471": "Máquina de barnizado de alto rendimiento que ofrece la máxima eficiencia y precisión para el barnizado moderno de chapas metálicas. Barniza con precisión chapas de hojalata, TFS y aluminio en formatos rectangulares y scroll con control de línea inteligente.",
      "metalcoat-480": "Ideal para el barnizado UV en línea dentro de una línea de impresión UV. Cuenta con tecnología de accionamiento dedicada, posicionamiento de cilindro asistido por láser y memoria de trabajos para una preparación más rápida. Mantiene el ritmo de las altas producciones de las prensas modernas.",
      "metalcoat-483": "La máquina de barnizado más moderna del mercado. Presenta un sistema de barnizado de tres rodillos de nuevo desarrollo, accionamientos dedicados, paneles táctiles con memoria y preparación asistida por láser. Hasta un 25% más rápida en la preparación que las generaciones anteriores.",
      "metalcure-led": "Tecnología de curado UV LED de última generación para el secado intermedio o final. Sin aporte de calor en la chapa metálica, ahorro de energía de hasta el 80% en comparación con el secado UV convencional, con desconexión de segmentos no utilizados según el formato.",
      "metalcure-uv": "Sistema de curado UV para el secado intermedio y final de barnices y tintas UV en líneas de decoración de metales. Garantiza un curado rápido y fiable para una producción de alta velocidad.",
      "metjet-one": "La primera máquina digital de decoración de metales. Combina la tecnología de inyección de tinta más avanzada con un manejo fiable de las chapas. Operación simple e intuitiva con eficiencia de costos y flexibilidad para requisitos de producción exigentes.",
      "soudronic-2-piece-cans": "Líneas de producción completas para cuerpos de latas embutidos redondos, cónicos, rectangulares o de forma irregular. Prensas de alto rendimiento y máquinas combinadas 2PC para un rendimiento máximo.",
      "soudronic-accessories": "Equipos y dispositivos adicionales adecuados para cada paso del proceso de un sistema de fabricación de latas. Complementa cada línea de producción Soudronic con accesorios diseñados específicamente para el máximo rendimiento.",
      "soudronic-can-assembling": "Sistemas multifuncionales que realizan varias operaciones desde el conformado hasta el cierre a velocidades bajas, medias y altas. Se caracterizan por su alta modularidad y capacidad de proceso para diversos tipos de latas.",
      "soudronic-coating": "Sistemas totalmente automatizados de recubrimiento en polvo o laca húmeda para costuras internas y externas en varias posiciones. Garantizan un funcionamiento fácil y limpio y un bajo consumo de polvo o laca.",
      "soudronic-conveyor": "Sistemas de transporte de proveedores externos de confianza diseñados según las necesidades de nuestros clientes. Integrados perfectamente en las líneas de producción de Soudronic para un transporte eficiente de las latas.",
      "soudronic-curing": "Gama modular de sistemas de curado diseñados para curar la capa de protección de la costura de forma eficaz. Disponible como calefacción por gas o inducción en configuración lineal o en forma de U.",
      "soudronic-digital-solutions": "Soluciones digitales innovadoras que abordan los desafíos diarios de la producción. Incluye el control central de línea UNICONTROL, la plataforma de conectividad DISCON+ y herramientas basadas en datos para la optimización del rendimiento.",
      "soudronic-end-making": "Prensas multimatriz de alta eficiencia para tapas y shells. Diseñadas para la máxima productividad y precisión en la producción de tapas de latas para la industria del envase metálico.",
      "soudronic-palletizer": "Sistemas de paletización personalizados de proveedores externos de confianza y apiladores para líneas generales de Sabatier. Diseñados para una automatización fiable de final de línea en la fabricación de latas.",
      "soudronic-peel-off": "Sistemas de termosellado de uno o varios carriles para producir tapas peel-off (POE). Diseñados para una producción fiable y de alta velocidad de tapas de apertura fácil para envases metálicos alimentarios y no alimentarios.",
      "soudronic-slitter": "Cortadoras de guillotina de alta precisión o cortadoras rotativas con cabezales de corte totalmente automatizados que permiten cambios rápidos de formato. Fabricadas a medida por Ocsam Cepak y Switzerland Can Man AG — extremadamente robustas con un ajuste sencillo y rápido para diferentes formatos de blanks.",
      "soudronic-tester": "Probadores de caída de presión y luz para todos los tamaños y formas — redondos, cuadrados, irregulares, latas, bidones, cubos. Las unidades de prueba de carrusel o lineales se ajustan fácilmente al tamaño y la forma del contenedor metálico.",
      "soudronic-transfer": "Sistemas de transferencia de alta capacidad para todos los diseños y configuraciones del sistema con una capacidad de alimentación de hasta 1.500 blanks por minuto. Diseñados para una integración perfecta entre la cortadora y la soldadora.",
      "soudronic-welder": "Máquinas de soldar que ofrecen máxima velocidad, eficiencia y flexibilidad, fiabilidad y facilidad de uso. El núcleo de cada línea de producción de latas de tres piezas, dando forma y soldando cuerpos de latas con precisión.",
      "thermal-drying-ovens": "Soluciones fiables de secado térmico para recubrimientos y tintas a base de solventes en líneas de producción de decoración de metales. Disponibles en varias configuraciones para adaptarse a los requisitos de la línea.",
      "tnv": "Sistema de purificación de aire de escape térmico para el tratamiento fiable del aire cargado de solventes de los hornos de secado en las líneas de decoración de metales. Garantiza el cumplimiento de las normativas medioambientales."
    }
  }
};

languages.forEach(lang => {
  const path = `src/i18n/locales/${lang}/translation.json`;
  if (fs.existsSync(path)) {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    data.units = translations[lang].units;
    data.productTitles = translations[lang].productTitles;
    data.productDescriptions = translations[lang].productDescriptions;
    fs.writeFileSync(path, JSON.stringify(data, null, 8), 'utf8');
    console.log(`Successfully updated ${lang}/translation.json`);
  }
});

// Update PT with units as well
const ptPath = 'src/i18n/locales/pt/translation.json';
const ptData = JSON.parse(fs.readFileSync(ptPath, 'utf8'));
ptData.units = {
  "sheetsMin": "folhas/min",
  "sheetsHour": "folhas/hora",
  "cansMin": "latas/min",
  "blanksMin": "blanks/min",
  "mMin": "m/min",
  "upTo": "Até "
};
fs.writeFileSync(ptPath, JSON.stringify(ptData, null, 8), 'utf8');
console.log('Successfully updated units in pt/translation.json');

// Update EN with units as well
const enPath = 'src/i18n/locales/en/translation.json';
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.units = {
  "sheetsMin": "sheets/min",
  "sheetsHour": "sheets/hour",
  "cansMin": "cans/min",
  "blanksMin": "blanks/min",
  "mMin": "m/min",
  "upTo": "Up to "
};
fs.writeFileSync(enPath, JSON.stringify(enData, null, 8), 'utf8');
console.log('Successfully updated units in en/translation.json');
