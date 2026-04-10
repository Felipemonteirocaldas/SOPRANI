import fs from 'fs';
import path from 'path';

const localesDir = path.join(process.cwd(), 'src', 'i18n', 'locales');

const newTranslations = {
  aboutPage: {
    heroTitle: {
      en: "About Soprani",
      pt: "Sobre a Soprani",
      es: "Sobre Soprani",
      it: "Su Soprani"
    },
    heroSub: {
      en: "Your trusted partner in metal packaging solutions worldwide.",
      pt: "Seu parceiro de confiança para soluções de embalagens metálicas no mundo todo.",
      es: "Su socio de confianza en soluciones de envases metálicos a nivel mundial.",
      it: "Il tuo partner di fiducia per le soluzioni di imballaggio metallico nel mondo."
    },
    intExcTitle: {
      en: "International Excellence",
      pt: "Excelência Internacional",
      es: "Excelencia Internacional",
      it: "Eccellenza Internazionale"
    },
    intExcP1: {
      en: "Soprani Engineering is a premier partner in metal packaging, offering machinery sourcing, spare parts, technical assistance, and material trading.",
      pt: "A Soprani Engineering é a parceira principal em embalagens metálicas, oferecendo fornecimento de máquinas, peças de reposição, assistência técnica e comércio de materiais.",
      es: "Soprani Engineering es un socio principal en envases metálicos, ofreciendo abastecimiento de maquinaria, repuestos, asistencia técnica y comercio de materiales.",
      it: "Soprani Engineering è un partner primario nell'imballaggio metallico, offrendo ricerca di macchinari, pezzi di ricambio, assistenza tecnica e commercio di materiali."
    },
    intExcP2: {
      en: "With decades of experience, we serve manufacturers globally across Europe, Middle East, North Africa, Asia, and the Americas.",
      pt: "Com décadas de experiência, atendemos fabricantes globalmente em toda a Europa, Oriente Médio, Norte da África, Ásia e as Américas.",
      es: "Con décadas de experiencia, servimos a fabricantes a nivel global en Europa, Medio Oriente, Norte de África, Asia y las Américas.",
      it: "Con decenni di esperienza, serviamo i produttori a livello globale in Europa, Medio Oriente, Nord Africa, Asia e le Americhe."
    },
    intExcP3: {
      en: "We're committed to technical excellence, flexibility, and lasting partnerships.",
      pt: "Estamos comprometidos com a excelência técnica, flexibilidade e parcerias duradouras.",
      es: "Estamos comprometidos con la excelencia técnica, la flexibilidad y las alianzas duraderas.",
      it: "Siamo impegnati per l'eccellenza tecnica, la flessibilità e partnership durature."
    },
    coreValuesTitle: {
      en: "Our Core Values",
      pt: "Nossos Valores Próprios",
      es: "Nuestros Valores Fundamentales",
      it: "I Nostri Valori Fondamentali"
    },
    cv1T: { en: "Technical Competence", pt: "Competência Técnica", es: "Competencia Técnica", it: "Competenza Tecnica" },
    cv1D: {
      en: "Deep expertise in machinery and solutions",
      pt: "Profundo conhecimento em máquinas e soluções",
      es: "Profundo conocimiento en maquinaria y soluciones",
      it: "Profonda esperienza in macchinari e soluzioni"
    },
    cv2T: { en: "Global Network", pt: "Rede Global", es: "Red Global", it: "Rete Globale" },
    cv2D: {
      en: "International presence worldwide",
      pt: "Presença internacional em todo o mundo",
      es: "Presencia internacional en todo el mundo",
      it: "Presenza internazionale nel mondo"
    },
    cv3T: { en: "Flexibility", pt: "Flexibilidade", es: "Flexibilidad", it: "Flessibilità" },
    cv3D: {
      en: "Tailored solutions for your needs",
      pt: "Soluções sob medida para suas necessidades",
      es: "Soluciones a medida para sus necesidades",
      it: "Soluzioni su misura per le tue esigenze"
    },
    cv4T: { en: "Partnerships", pt: "Parcerias", es: "Asociaciones", it: "Partnership" },
    cv4D: {
      en: "Lasting relationships with clients",
      pt: "Relacionamentos duradouros com clientes",
      es: "Relaciones duraderas con clientes",
      it: "Relazioni durature con i clienti"
    },
    expertiseTitle: {
      en: "Our Expertise",
      pt: "Nossa Especialidade",
      es: "Nuestra Experiencia",
      it: "Le Nostre Competenze"
    },
    ex1T: { en: "Machinery Sourcing", pt: "Fornecimento de Máquinas", es: "Abastecimiento de Maquinaria", it: "Approvvigionamento di Macchinari" },
    ex1D: { en: "Sourcing the right machinery for your production needs.", pt: "Buscando o maquinário certo para suas necessidades de produção.", es: "Buscando la maquinaria adecuada para sus necesidades de producción.", it: "Ricerca del macchinario giusto per le tue esigenze di produzione." },
    ex2T: { en: "Spare Parts Supply", pt: "Fornecimento de Peças", es: "Suministro de Repuestos", it: "Fornitura di Pezzi di Ricambio" },
    ex2D: { en: "Comprehensive parts supply to minimize downtime.", pt: "Fornecimento abrangente de peças para minimizar inatividade.", es: "Suministro completo de repuestos para minimizar inactividad.", it: "Fornitura completa di pezzi per ridurre al minimo i tempi di fermo." },
    ex3T: { en: "Technical Assistance", pt: "Assistência Técnica", es: "Asistencia Técnica", it: "Assistenza Tecnica" },
    ex3D: { en: "Expert troubleshooting and maintenance coordination.", pt: "Solução especializada de problemas e coordenação de manutenção.", es: "Resolución de problemas y coordinación de mantenimiento.", it: "Risoluzione dei problemi e coordinamento della manutenzione." },
    ex4T: { en: "Revamping Projects", pt: "Projetos de Modernização", es: "Proyectos de Renovación", it: "Progetti di Rinnovamento" },
    ex4D: { en: "Equipment improvement and upgrading services.", pt: "Serviços de melhoria e atualização de equipamentos.", es: "Servicios de mejora y actualización de equipos.", it: "Miglioramento delle attrezzature e servizi di aggiornamento." },
    ex5T: { en: "Material Trading", pt: "Comércio de Materiais", es: "Comercio de Materiales", it: "Commercio di Materiali" },
    ex5D: { en: "Trading in tinplate and aluminum materials.", pt: "Comércio de folhas de flandres e alumínio.", es: "Comercio de hojalata y aluminio.", it: "Commercio di banda stagnata e alluminio." },
    ex6T: { en: "Industrial Expertise", pt: "Especialização Industrial", es: "Experiencia Industrial", it: "Competenza Industriale" },
    ex6D: { en: "Decades of experience in metal packaging sectors.", pt: "Décadas de experiência nos setores de embalagens metálicas.", es: "Décadas de experiencia en sectores de envases metálicos.", it: "Decenni di esperienza nel settore dell'imballaggio." },
    reachTitle: {
      en: "Global Reach",
      pt: "Alcance Global",
      es: "Alcance Global",
      it: "Portata Globale"
    }
  },
  servicesPage: {
    heroSub: {
      en: "Comprehensive solutions for metal packaging manufacturers worldwide",
      pt: "Soluções abrangentes para fabricantes de embalagens metálicas em todo o mundo",
      es: "Soluciones completas para fabricantes de envases metálicos a nivel mundial",
      it: "Soluzioni complete per i produttori di imballaggi metallici nel mondo"
    },
    usedMachT: { en: "Used Machinery Support", pt: "Assistência em Maquinário Usado", es: "Soporte de Maquinaria Usada", it: "Supporto Macchinari Usati" },
    usedMachD: {
      en: "Expert sourcing and support for industrial machinery used in metal packaging production. We help you find the right equipment for your specific manufacturing needs.",
      pt: "Sourcing especializado e suporte para máquinas industriais usadas. Ajudamos a encontrar o equipamento certo para suas necessidades.",
      es: "Abastecimiento y soporte para maquinaria industrial usada. Ayudamos a encontrar el equipo adecuado para sus necesidades.",
      it: "Ricerca e supporto per macchinari industriali usati. Ti aiutiamo a trovare l'attrezzatura giusta."
    },
    usedP1: { en: "Machinery identification and sourcing", pt: "Identificação e fornecimento de maquinário", es: "Identificación y suministro de maquinaria", it: "Identificazione e fornitura di macchinari" },
    usedP2: { en: "Equipment evaluation and assessment", pt: "Avaliação técnica de equipamentos", es: "Evaluación técnica de equipos", it: "Valutazione tecnica delle attrezzature" },
    usedP3: { en: "Installation support and commissioning", pt: "Apoio à instalação e comissionamento", es: "Apoyo en instalación y puesta en marcha", it: "Supporto all'installazione e collaudo" },
    usedP4: { en: "Competitive pricing and flexible terms", pt: "Preços competitivos e condições flexíveis", es: "Precios competitivos y términos flexibles", it: "Prezzi competitivi e termini flessibili" },

    sparePartsT: { en: "Spare Parts", pt: "Peças de Reposição", es: "Repuestos", it: "Pezzi di Ricambio" },
    sparePartsD: {
      en: "Comprehensive identification and supply of spare parts for machinery. Minimize production downtime with our reliable spare parts sourcing network.",
      pt: "Identificação completa e fornecimento de peças. Minimize o tempo de inatividade.",
      es: "Identificación completa y suministro de piezas. Minimice el tiempo de inactividad.",
      it: "Identificazione e fornitura completa di pezzi. Riduci i tempi di inattività."
    },
    spP1: { en: "Parts identification and sourcing", pt: "Identificação e procura de peças", es: "Identificación y búsqueda de piezas", it: "Identificazione e ricerca di pezzi" },
    spP2: { en: "Difficult component sourcing", pt: "Busca de componentes complexos", es: "Búsqueda de componentes complejos", it: "Ricerca di componenti difficili" },
    spP3: { en: "Quality assurance and verification", pt: "Garantia e verificação de qualidade", es: "Garantía y verificación de calidad", it: "Garanzia e verifica della qualità" },
    spP4: { en: "Fast delivery and logistics support", pt: "Entrega rápida e suporte logístico", es: "Entrega rápida y soporte logístico", it: "Consegna rapida e supporto logistico" },

    techAssistanceT: { en: "Technical Assistance", pt: "Assistência Técnica", es: "Asistencia Técnica", it: "Assistenza Tecnica" },
    techAssistanceD: {
      en: "Professional technical support including troubleshooting, machine evaluation, and maintenance coordination for optimal production performance.",
      pt: "Suporte técnico profissional, diagnóstico e coordenação de manutenção.",
      es: "Soporte técnico profesional, diagnóstico y coordinación de mantenimiento.",
      it: "Supporto tecnico professionale e coordinamento della manutenzione."
    },
    ta1: { en: "Machine troubleshooting and diagnostics", pt: "Diagnóstico e solução de problemas", es: "Diagnóstico y resolución de problemas", it: "Risoluzione dei problemi e diagnostica" },
    ta2: { en: "Equipment evaluation and optimization", pt: "Otimização e avaliação", es: "Optimización y evaluación", it: "Ottimizzazione e valutazione" },
    ta3: { en: "Maintenance coordination", pt: "Coordenação de manutenções", es: "Coordinación de mantenimiento", it: "Coordinamento della manutenzione" },
    ta4: { en: "Performance improvement recommendations", pt: "Recomendações de performance", es: "Recomendaciones de rendimiento", it: "Raccomandazioni di prestazione" },

    revampingT: { en: "Revamping", pt: "Modernização", es: "Renovación", it: "Rinnovamento" },
    revampingD: {
      en: "Equipment improvement and upgrading services to enhance your production capabilities and extend machinery lifespan.",
      pt: "Serviços de atualização para melhorar a capacidade e estender a vida útil das máquinas.",
      es: "Servicios de actualización para mejorar la capacidad y extender la vida útil.",
      it: "Servizi di aggiornamento per migliorare le capacità e prolungare la vita."
    },
    rv1: { en: "Equipment modernization", pt: "Modernização de equipamentos", es: "Modernización de equipos", it: "Modernizzazione delle attrezzature" },
    rv2: { en: "Performance enhancement", pt: "Aprimoramento de performance", es: "Mejora de rendimiento", it: "Miglioramento delle prestazioni" },
    rv3: { en: "Capacity improvement", pt: "Melhoria de capacidade", es: "Mejora de capacidad", it: "Miglioramento della capacità" },
    rv4: { en: "Cost-effective upgrades", pt: "Atualizações viáveis financeiramente", es: "Actualizaciones rentables", it: "Aggiornamenti a costi efficaci" },

    tradingT: { en: "Trading Materials", pt: "Comércio de Materiais", es: "Comercio de Materiales", it: "Commercio di Materiali" },
    tradingD: {
      en: "Trading opportunities in tinplate and aluminum materials used in metal packaging production. Direct access to quality materials at competitive prices.",
      pt: "Oportunidades de comércio de flandres e alumínio com acesso direto à qualidade e bons preços.",
      es: "Oportunidades de comercio de hojalata y aluminio con acceso a precios competitivos.",
      it: "Opportunità di commercio di banda stagnata e alluminio a prezzi competitivi."
    },
    tr1: { en: "Tinplate supply and trading", pt: "Fornecimento de flandres", es: "Suministro de hojalata", it: "Fornitura di banda stagnata" },
    tr2: { en: "Aluminum material sourcing", pt: "Fornecimento de alumínio", es: "Suministro de aluminio", it: "Fornitura di alluminio" },
    tr3: { en: "Quality material verification", pt: "Verificação de extrema qualidade", es: "Verificación de calidad extrema", it: "Verifica di qualità del materiale" },
    tr4: { en: "Flexible order quantities", pt: "Quantidades flexíveis", es: "Cantidades flexibles", it: "Quantità di ordini flessibili" },

    ctaTitle: { en: "Ready to Optimize Your Operations?", pt: "Pronto para Otimizar Suas Operações?", es: "¿Listo para Optimizar Sus Operaciones?", it: "Pronto per Ottimizzare le Tue Operazioni?" },
    ctaDesc: { en: "Contact us today to discuss how our services can support your metal packaging business.", pt: "Contate-nos hoje para discutir como os nossos serviços impulsionam sua fábrica.", es: "Contáctenos hoy para acelerar su fabricación.", it: "Contattaci per massimizzare il tuo business." },
    btnContact: { en: "Contact Us", pt: "Fale Conosco", es: "Contáctenos", it: "Contattaci" },
    btnQuote: { en: "Request a Quotation", pt: "Solicitar Orçamento", es: "Solicitar Presupuesto", it: "Richiedi un Preventivo" }
  },
  companyPage: {
    heroTitle: { en: "Our Legacy", pt: "Nosso Legado", es: "Nuestro Legado", it: "La Nostra Eredità" },
    p1: {
      en: "Soprani Engineering is a premier technical and commercial partner dedicated to the global metal packaging industry. With a deep-rooted history in industrial engineering, we specialize in providing comprehensive solutions that ensure operational excellence for can-making factories and packaging manufacturers worldwide.",
      pt: "Soprani Engineering é uma parceira técnica e comercial de ponta dedicada à indústria metalúrgica de embalagens mundial. Fornecemos soluções integrais de engenharia industrial para excelência operacional.",
      es: "Soprani Engineering es un socio técnico de primer nivel dedicado a la industria global de envases metálicos. Aseguramos la excelencia operativa.",
      it: "Soprani Engineering è un partner tecnico e commerciale di prim'ordine dedicato all'industria dell'imballaggio metallico a livello globale. Assicuriamo eccellenza operativa mondale."
    },
    p2: {
      en: "Our expertise is built on a dual approach: technical mastery and strategic trading. We support our clients through the entire lifecycle of their production lines—from sourcing and revamping high-performance machinery to supplying critical spare parts and providing expert technical assistance. Our Mission To empower the metal packaging industry with cutting-edge engineering solutions, high-quality components, and a seamless global supply chain.",
      pt: "Nossa experiência une maestria técnica com sucesso comercial. Apoiamos todo ciclo de vida das linhas de produção — da busca por alta performance até as peças mais raras. Nossa Missão é empoderar a indústria.",
      es: "Nuestra experiencia une la maestría técnica con comercialización estratégica. Apoyamos el ciclo de vida, elevamos el rendimiento y buscamos repuestos escasos.",
      it: "Costruiti sulla maestria tecnica. Supportiamo l'intero ciclo di vita, dal rinnovamento dei macchinari ai pezzi critici. La nostra missione è potenziare l'industria."
    },
    keyAchievements: { en: "Key Achievements", pt: "Principais Resultados", es: "Logros Clave", it: "Principali Risultati" },
    ach1A: { en: "Years of Innovation", pt: "Anos de Inovação", es: "Años de Innovación", it: "Anni di Innovazione" },
    ach2A: { en: "Operating EBIT Growth", pt: "Crescimento Operacional", es: "Crecimiento Operativo", it: "Crescita Operativa" },
    ach3V: { en: "Global", pt: "Líder", es: "Líder", it: "Leader" },
    ach3A: { en: "Market Leader", pt: "Líder de Mercado", es: "Líder de Mercado", it: "Leader di Mercato" },
    ach4V: { en: "Broadest", pt: "Max", es: "Max", it: "Ampia" },
    ach4A: { en: "Product Range", pt: "Gama de Produtos", es: "Gama de Productos", it: "Gamma di Prodotti" },
    subTitle: { en: "Our Subsidiaries", pt: "Nossas Afiliadas", es: "Nuestras Filiales", it: "Le Nostre Filiali" },
    subDesc: { en: "A global network of specialized partners providing industrial solutions for the metal packaging sector", pt: "Uma rede global de parceiros especializados no setor", es: "Una red global de socios especializados", it: "Una rete globale di partner specializzati" },
    subEmpty: { en: "No subsidiaries information available.", pt: "Sem informações no momento.", es: "No hay información disponible.", it: "Nessuna informazione disponibile." },
    subFounded: { en: "Founded", pt: "Fundada em", es: "Fundada en", it: "Fondata nel" },
    subVisit: { en: "Visit Website", pt: "Visitar Site", es: "Visitar Sitio", it: "Visita Sito" },
    comTitle: { en: "Our Commitment", pt: "Nosso Compromisso", es: "Nuestro Compromiso", it: "Il Nostro Impegno" },
    com1T: { en: "Innovation", pt: "Inovação", es: "Innovación", it: "Innovazione" },
    com1D: { en: "Continuously providing advanced technical support and revamping solutions for the metal packaging industry.", pt: "Suporte técnico avançado e modernização imbatível na indústria de embalagens.", es: "Soporte técnico avanzado en la industria de envases.", it: "Supporto tecnico avanzato nell'industria dell'imballaggio metallico." },
    com2T: { en: "Global Reach", pt: "Alcance", es: "Alcance", it: "Portata" },
    com2D: { en: "Serving the worldwide media industry with comprehensive solutions", pt: "Atendendo globalmente à indústria com soluções absolutas", es: "Atendiendo con soluciones absolutas", it: "Al servizio con soluzioni assolute" },
    com3T: { en: "Excellence", pt: "Excelência", es: "Excelencia", it: "Eccellenza" },
    com3D: { en: "Delivering high-quality machinery, specialized spare parts, and reliable industrial services to our partners.", pt: "Entregando máquinas de alta qualidade, peças e serviços incomparáveis.", es: "Entregando máquinas de alta calidad y servicios a socios.", it: "Fornitura di macchinari di alta qualità e servizi affidabili." }
  },
  contactPage: {
    heroTitle: { en: "Contact Us", pt: "Fale Conosco", es: "Contáctenos", it: "Contattaci" },
    heroSub: {
      en: "Get in touch with our team for inquiries about machinery, spare parts, technical assistance, or material trading",
      pt: "Fale com nossa equipe sobre máquinas, peças, assistência ou comércio",
      es: "Contacte para maquinaria, repuestos o comercio",
      it: "Contatta il nostro team per macchinari o pezzi di ricambio"
    },
    getInTouch: { en: "Get In Touch", pt: "Entre em Contato", es: "Póngase en Contacto", it: "Mettiti in Contatto" },
    getInTouchDesc: {
      en: "We're here to help and answer any questions you might have about our services and solutions.",
      pt: "Estamos aqui para sanar toda e qualquer dúvida operacional e industrial.",
      es: "Estamos aquí para ayudarle con sus dudas industriales.",
      it: "Siamo qui per aiutarti nelle tue scelte industriali."
    },
    email: { en: "Email", pt: "E-mail", es: "Correo", it: "Email" },
    phone: { en: "Phone", pt: "Telefone", es: "Teléfono", it: "Telefono" },
    presence: { en: "Global Presence", pt: "Presença", es: "Presencia", it: "Presenza" },
    msgTitle: { en: "Send Us a Message", pt: "Envie sua Mensagem", es: "Envíe su Mensaje", it: "Invia un Messaggio" },
    thxTitle: { en: "Thank You!", pt: "Agradecemos!", es: "¡Gracias!", it: "Grazie!" },
    thxDesc: {
      en: "Your message has been received. We will get back to you soon.",
      pt: "Mensagem recebida, retornaremos ágilmente.",
      es: "Mensaje recibido, responderemos con agilidad.",
      it: "Messaggio ricevuto, risponderemo rapidamente."
    },
    formName: { en: "Name *", pt: "Nome *", es: "Nombre *", it: "Nome *" },
    formCompany: { en: "Company", pt: "Empresa", es: "Empresa", it: "Azienda" },
    formCountry: { en: "Country", pt: "País", es: "País", it: "Paese" },
    formSubject: { en: "Subject *", pt: "Assunto *", es: "Asunto *", it: "Oggetto *" },
    subSelect: { en: "Select a subject", pt: "Escolha o assunto", es: "Seleccione un asunto", it: "Seleziona un argomento" },
    sub1: { en: "Machinery Inquiry", pt: "Cotação de Maquinário", es: "Consulta de Maquinaria", it: "Richiesta di Macchinari" },
    sub2: { en: "Spare Parts", pt: "Peças de Reposição", es: "Repuestos", it: "Pezzi di Ricambio" },
    sub3: { en: "Technical Assistance", pt: "Assistência Técnica", es: "Asistencia Técnica", it: "Assistenza Tecnica" },
    sub4: { en: "Trading Materials", pt: "Comércio de Materiais", es: "Comercio de Materiales", it: "Commercio di Materiali" },
    sub5: { en: "General Inquiry", pt: "Dúvidas Gerais", es: "Consultas Generales", it: "Domanda Generica" },
    sub6: { en: "Partnership", pt: "Parceria", es: "Asociación", it: "Partnership" },
    formMsg: { en: "Message *", pt: "Mensagem *", es: "Mensaje *", it: "Messaggio *" },
    formSend: { en: "Send Message", pt: "Enviar Mensagem", es: "Enviar Mensaje", it: "Invia Messaggio" },
    formSending: { en: "Sending...", pt: "Enviando...", es: "Enviando...", it: "Invio..." },
    formPlaceN: { en: "Your name", pt: "Seu nome", es: "Su nombre", it: "Tuo nome" },
    formPlaceC: { en: "Your company name", pt: "Sua empresa", es: "Su empresa", it: "Tua azienda" },
    formPlaceP: { en: "Tell us how we can help you...", pt: "Como podemos ajudar sua fábrica?", es: "¿Cómo podemos ayudar a su fábrica?", it: "Come possiamo aiutarti?" },
    reqQuote: { en: "Request a Quotation", pt: "Cotar Agora", es: "Pedir Presupuesto", it: "Richiedi Preventivo" },
    reqQuoteSub: { en: "Need a customized quote for machinery or services?", pt: "Precisa de uma oferta sob medida?", es: "¿Necesita una oferta personalizada?", it: "Hai bisogno di un'offerta personalizzata?" },
    reqQuoteBtn: { en: "Get a Quote →", pt: "Receber Cotação →", es: "Recibir Cotización →", it: "Ricevi Preventivo →" },
    svcSub: { en: "Learn more about our comprehensive services", pt: "Veja o poder dos nossos serviços", es: "Vea el poder de nuestros servicios", it: "Scopri le nostre soluzioni" },
    svcBtn: { en: "View Services →", pt: "Ver Serviços →", es: "Ver Servicios →", it: "Vedi Servizi →" },
    aboutUs: { en: "About Us", pt: "Sobre a Soprani", es: "Sobre Soprani", it: "Su Soprani" },
    aboutSub: { en: "Discover our expertise and global presence", pt: "Força e presença fabril no mundo", es: "Fuerza de la automatización mundial", it: "Esperti in tutto il mondo" },
    aboutBtn: { en: "Learn More →", pt: "Saber Mais →", es: "Saber Más →", it: "Scopri di più →" }
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
  console.log(`Updated Phase 3 terms for ${lang} perfectly.`);
});
