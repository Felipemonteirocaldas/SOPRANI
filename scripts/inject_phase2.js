import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'src', 'i18n', 'locales');

const newTranslations = {
  servicesSection: {
    whatWeDo: {
      en: "What We Do",
      pt: "O Que Fazemos",
      es: "Lo Que Hacemos",
      it: "Cosa Facciamo"
    },
    ourServices: {
      en: "Our Services",
      pt: "Nossos Serviços",
      es: "Nuestros Servicios",
      it: "I Nostri Servizi"
    },
    fiveAreas: {
      en: "Five Areas. One Partner.",
      pt: "Cinco Áreas. Um Parceiro.",
      es: "Cinco Áreas. Un Socio.",
      it: "Cinque Aree. Un Partner."
    },
    allServicesBtn: {
      en: "All Services →",
      pt: "Todos os Serviços →",
      es: "Todos los Servicios →",
      it: "Tutti i Servizi →"
    },
    usedMachineryTitle: {
      en: "Used Machinery",
      pt: "Maquinário Usado",
      es: "Maquinaria Usada",
      it: "Macchinari Usati"
    },
    usedMachineryDesc: {
      en: "Global inventory of used can making machines, welding lines, presses and decorating equipment. Verified, negotiated and delivered — faster than new-machine lead times.",
      pt: "Inventário global de máquinas de fabricação de latas usadas, linhas de soldagem, prensas e equipamentos de decoração. Verificado, negociado e entregue — mais rápido que os prazos de máquinas novas.",
      es: "Inventario global de máquinas para la fabricación de latas usadas, líneas de soldadura, prensas y equipos de decoración. Verificado, negociado y entregado — más rápido que los plazos de máquinas nuevas.",
      it: "Inventario globale di macchine usate per la produzione di lattine, linee di saldatura, presse e attrezzature per la decorazione. Verificato, negoziato e consegnato — più veloce dei tempi di consegna delle macchine nuove."
    },
    sparePartsDesc: {
       en: "Downtime is not an option. We identify and supply spare parts for can making machines — including obsolete and hard-to-source components — with speed and precision.",
       pt: "Tempo de inatividade não é uma opção. Identificamos e fornecemos peças de reposição com velocidade e precisão — incluindo componentes obsoletos e difíceis de encontrar.",
       es: "El tiempo de inactividad no es una opción. Identificamos y suministramos repuestos con velocidad y precisión — incluyendo componentes obsoletos y difíciles de encontrar.",
       it: "Il tempo di inattività non è un'opzione. Identifichiamo e forniamo pezzi di ricambio con velocità e precisione — inclusi componenti obsoleti e difficili da reperire."
    },
    techAssistanceDesc: {
      en: "Expert troubleshooting, machine evaluation and production audits. On-site or remote support — diagnose fast, resolve faster, minimal disruption to output.",
      pt: "Solução especializada de problemas, avaliação e auditorias de produção. Suporte no local ou remoto — diagnóstico rápido, e mínima interrupção.",
      es: "Resolución de problemas de expertos, evaluación de máquinas y auditorías. Soporte en el sitio o remoto: diagnostique rápido con mínima interrupción.",
      it: "Risoluzione esperta dei problemi, valutazione delle macchine e audit. Supporto in loco o da remoto — diagnostica veloce e minima interruzione dell'output."
    },
    revampingTitle: {
      en: "Revamping",
      pt: "Modernização",
      es: "Renovación",
      it: "Rinnovamento"
    },
    revampingDesc: {
      en: "Extend the productive life of your equipment. We design and manage upgrade programmes for existing lines — improving output and compliance without full replacement cost.",
      pt: "Estenda a vida útil do seu equipamento. Projetamos e gerenciamos programas de atualização para linhas existentes — melhorando a produção sem o custo de reposição total.",
      es: "Extienda la vida productiva de su equipo. Diseñamos y gestionamos programas de actualización para líneas existentes — mejorando el rendimiento sin el costo de reemplazo total.",
      it: "Estendi la vita produttiva della tua attrezzatura. Progettiamo e gestiamo programmi di aggiornamento per linee esistenti — migliorando l'output senza costi di sostituzione totali."
    },
    tradingDesc: {
      en: "Strategic tinplate and aluminum trading for metal packaging producers worldwide. Competitive sourcing, flexible volumes, reliable delivery — matched to your production schedule. We connect buyers and sellers across our global network to create genuine commercial value.",
      pt: "Comércio estratégico de folha de flandres e alumínio para produtores de embalagens metálicas. Fornecimento competitivo, volumes flexíveis, entrega confiável — alinhado ao seu cronograma.",
      es: "Comercio estratégico de hojalata y aluminio para productores de envases metálicos. Abastecimiento competitivo, volúmenes flexibles, entrega confiable — adaptado a su cronograma.",
      it: "Commercio strategico di banda stagnata e alluminio per i produttori di imballaggi metallici in tutto il mondo. Approvvigionamento competitivo, volumi flessibili e consegne puntuali."
    }
  },
  productsSection: {
    learnMore: {
      en: "Learn More",
      pt: "Saiba Mais",
      es: "Saber Más",
      it: "Scopri di Più"
    },
    ourProducts: {
      en: "Our Products",
      pt: "Nossos Produtos",
      es: "Nuestros Productos",
      it: "I Nostri Prodotti"
    },
    desc: {
      en: "Comprehensive range of industrial packaging machinery solutions for metal can production. From bodymakers to seamers, we deliver precision and reliability.",
      pt: "Gama completa de soluções de maquinário industrial para produção de latas metálicas. Oferecemos precisão e confiabilidade incomparáveis.",
      es: "Amplia gama de soluciones de maquinaria industrial para la producción de latas de metal. Entregamos precisión y fiabilidad incomparables.",
      it: "Gamma completa di soluzioni di macchinari industriali per la produzione di lattine metalliche. Dalle aggraffatrici ai bodymakers, offriamo estrema precisione."
    },
    noProducts: {
      en: "No products available",
      pt: "Nenhum produto disponível",
      es: "No hay productos disponibles",
      it: "Nessun prodotto disponibile"
    }
  },
  premiumCta: {
    badge: {
      en: "SOPRANI ENGINEERING: ACTIVE GLOBAL SUPPORT",
      pt: "SOPRANI ENGINEERING: SUPORTE GLOBAL ATIVO",
      es: "SOPRANI ENGINEERING: SOPORTE GLOBAL ACTIVO",
      it: "SOPRANI ENGINEERING: SUPPORTO GLOBALE ATTIVO"
    },
    title1: {
      en: "Precision Engineering for the ",
      pt: "Engenharia de Precisão para a Indústria ",
      es: "Ingeniería de Precisión para la Industria ",
      it: "Ingegneria di Precisione per l'Industria "
    },
    titleHighlight: {
      en: "Global",
      pt: "Global",
      es: "Global",
      it: "Globale"
    },
    title2: {
      en: " Metal Packaging Industry",
      pt: " de Embalagens Metálicas",
      es: " de Envases Metálicos",
      it: " dell'Imballaggio Metallico"
    },
    desc: {
      en: "From machinery sourcing and revamping projects to high-precision spare parts and technical assistance, we provide the industrial expertise to keep your production lines at peak performance.",
      pt: "Desde o fornecimento de maquinário e modernização até peças de altíssima precisão e assistência técnica completa.",
      es: "Desde el abastecimiento y la renovación de maquinaria hasta piezas de precisión y asistencia técnica completa.",
      it: "Dall'approvvigionamento e rinnovamento di macchinari a pezzi ad altissima precisione e assistenza tecnica completa."
    },
    btnConsult: {
      en: "[ CONSULT OUR ENGINEERS ]",
      pt: "[ CONSULTE NOSSOS ENGENHEIROS ]",
      es: "[ CONSULTE A NUESTROS INGENIEROS ]",
      it: "[ CONSULTA I NOSTRI INGEGNERI ]"
    },
    btnQuote: {
      en: "[ REQUEST TECHNICAL QUOTE ]",
      pt: "[ SOLICITE COTAÇÃO TÉCNICA ]",
      es: "[ SOLICITE COTIZACIÓN TÉCNICA ]",
      it: "[ RICHIEDI PREVENTIVO TECNICO ]"
    }
  },
  splitLayout: {
    who: {
      en: "Who We Are",
      pt: "Quem Somos",
      es: "Quiénes Somos",
      it: "Chi Siamo"
    },
    title: {
      en: "Technical Depth. Commercial Flexibility.",
      pt: "Profundidade Técnica. Flexibilidade Comercial.",
      es: "Profundidad Técnica. Flexibilidad Comercial.",
      it: "Profondità Tecnica. Flessibilità Commerciale."
    },
    desc1: {
      en: "SOPRANI represents decades of industrial expertise and international commercial acumen. We support clients across Europe, the Middle East, North Africa, and Asia.",
      pt: "SOPRANI representa décadas de especialização industrial. Apoiamos clientes em toda a Europa, Oriente Médio, Norte da África e Ásia.",
      es: "SOPRANI representa décadas de especialización industrial. Apoyamos clientes en Europa, Medio Oriente, África y Asia.",
      it: "SOPRANI rappresenta decenni di esperienza industriale. Supportiamo clienti in tutta Europa, Medio Oriente, Nord Africa e Asia."
    },
    desc2: {
      en: "We understand the pressures of modern manufacturing. Seamless, bold moves are unfolding, and sourcing critical equipment in under-resourced markets demands a reliable partner with real networks.",
      pt: "Entendemos as pressões da manufatura moderna e das redes globais de suprimento crítico.",
      es: "Entendemos las presiones de la fabricación moderna y de las redes de suministro globales.",
      it: "Comprendiamo le pressioni della produzione moderna e delle veloci connessioni globali per le apparecchiature."
    },
    f1_title: {
      en: "Technical Competence",
      pt: "Competência Técnica",
      es: "Competencia Técnica",
      it: "Competenza Tecnica"
    },
    f1_desc: {
      en: "Deep expertise in packaging automation and machinery across all major markets.",
      pt: "Profundo conhecimento em automação de embalagem e maquinário globalmente.",
      es: "Profundo conocimiento en automatización de envases y maquinaria a nivel global.",
      it: "Esperienza profonda nell'automazione e nei macchinari a livello globale."
    },
    f2_title: {
      en: "Global Network",
      pt: "Rede Global",
      es: "Red Global",
      it: "Rete Globale"
    },
    f2_desc: {
      en: "Partnerships with certified manufacturers and leaders across five continents.",
      pt: "Parcerias certificadas de fabricação em cinco continentes.",
      es: "Alianzas certificadas con fabricantes de primer nivel en cinco continentes.",
      it: "Partnership certificate con produttori nei cinque continenti."
    },
    f3_title: {
      en: "Responsive Solutions",
      pt: "Soluções Ágeis",
      es: "Soluciones Ágiles",
      it: "Soluzioni Reattive"
    },
    f3_desc: {
      en: "Agile support tailored to emerging market demands and evolving client needs.",
      pt: "Suporte ágil para exigências de mercado precisas e dinâmicas.",
      es: "Apoyo ágil para exigencias dinámicas y personalizadas.",
      it: "Supporto agile e flessibile per le nuove richieste della produzione mondiale."
    },
    blueprintTitle: {
      en: "Laminating Machine",
      pt: "Máquina de Laminação",
      es: "Máquina Laminadora",
      it: "Macchina Plastificatrice"
    },
    blueprintL1: {
      en: "Lamination Type: Cold Roll Pressure (Heavy-Duty)",
      pt: "Tipo de Laminação: Pressão por Rolo a Frio",
      es: "Tipo de Laminación: Presión por Rodillo Frío",
      it: "Tipo di Laminazione: Pressione a Rullo Freddo"
    },
    blueprintL2: {
      en: "Working Speed: Adjustable up to 20 m/min",
      pt: "Velocidade de Trabalho: Até 20 m/min",
      es: "Velocidad de Trabajo: Hasta 20 m/min",
      it: "Velocità di Lavoro: Fino a 20 m/min"
    },
    blueprintL3: {
      en: "Operating Mode: Fully Automatic / Line Integrated",
      pt: "Modo Operacional: 100% Automático",
      es: "Modo de Operación: 100% Automático",
      it: "Modalità Operativa: Completamente Automatica"
    }
  },
  stats: {
    title: {
       en: "Numbers That Speak",
       pt: "Números que Falam",
       es: "Números que Hablan",
       it: "Numeri che Parlano"
    },
    desc: {
       en: "Discover our results and the impact we generate for clients around the globe.",
       pt: "Conheça nossos resultados e o impacto que geramos para nossos clientes ao redor do mundo.",
       es: "Descubra nuestros resultados y el impacto que generamos para clientes en todo el mundo.",
       it: "Scopri i nostri risultati e l'impatto che generiamo per i clienti in tutto il mondo."
    },
    label1: {
       en: "Satisfied Clients",
       pt: "Clientes Satisfeitos",
       es: "Clientes Satisfechos",
       it: "Clienti Soddisfatti"
    },
    sublabel1: {
       en: "Companies trusting us",
       pt: "Empresas confiando em nós",
       es: "Empresas que confían",
       it: "Aziende che si fidano"
    },
    label2: {
       en: "Years of Experience",
       pt: "Anos de Experiência",
       es: "Años de Experiencia",
       it: "Anni di Esperienza"
    },
    sublabel2: {
       en: "Tradition and innovation",
       pt: "Tradição e inovação",
       es: "Tradición e innovación",
       it: "Tradizione e innovazione"
    },
    label3: {
       en: "Available Support",
       pt: "Suporte Disponível",
       es: "Soporte Disponible",
       it: "Supporto Disponibile"
    },
    sublabel3: {
       en: "Always ready to help",
       pt: "Sempre pronto para ajudar",
       es: "Siempre listos para ayudar",
       it: "Sempre pronti ad aiutare"
    },
    label4: {
       en: "Continents",
       pt: "Continentes",
       es: "Continentes",
       it: "Continenti"
    },
    sublabel4: {
       en: "Global reach",
       pt: "Alcance global",
       es: "Alcance global",
       it: "Portata globale"
    },
    s1: {
       en: "Packaging",
       pt: "Embalagens",
       es: "Envases",
       it: "Imballaggi"
    },
    s1d: {
       en: "Premium solutions",
       pt: "Soluções premium",
       es: "Soluciones premium",
       it: "Soluzioni premium"
    },
    s2: {
       en: "Beverages",
       pt: "Bebidas",
       es: "Bebidas",
       it: "Bevande"
    },
    s2d: {
       en: "Containers",
       pt: "Recipientes",
       es: "Contenedores",
       it: "Contenitori"
    },
    s3: {
       en: "Energy",
       pt: "Energia",
       es: "Energía",
       it: "Energia"
    },
    s3d: {
       en: "Energy efficiency",
       pt: "Soluções energéticas",
       es: "Soluciones energéticas",
       it: "Soluzioni energetiche"
    },
    s4: {
       en: "Sustainability",
       pt: "Sustentabilidade",
       es: "Sostenibilidad",
       it: "Sostenibilità"
    },
    s4d: {
       en: "Eco-friendly",
       pt: "Produtos eco-friendly",
       es: "Eco-amigables",
       it: "Eco-sostenibili"
    },
    s5: {
       en: "Logistics",
       pt: "Logística",
       es: "Logística",
       it: "Logistica"
    },
    s5d: {
       en: "Fast delivery",
       pt: "Entrega rápida",
       es: "Entrega rápida",
       it: "Consegna veloce"
    }
  }
};

const langs = ['en', 'pt', 'es', 'it'];

langs.forEach(lang => {
  const filePath = path.join(localesDir, lang, 'translation.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const dict = JSON.parse(fileContent);

  // Re-organize new translations into target format
  for (const [section, keys] of Object.entries(newTranslations)) {
    if (!dict[section]) dict[section] = {};
    for (const [keyName, translationsForLang] of Object.entries(keys)) {
       dict[section][keyName] = translationsForLang[lang];
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(dict, null, 2));
  console.log(`Updated ${lang} perfectly.`);
});
