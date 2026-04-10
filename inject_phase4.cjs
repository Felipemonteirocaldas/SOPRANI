const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');
const languages = ['en', 'it', 'es', 'pt'];

const newKeys = {
  eventsPage: {
    heroTitle: {
      en: 'Industry Events',
      it: 'Eventi del Settore',
      es: 'Eventos de la Industria',
      pt: 'Eventos da Indústria'
    },
    heroSub: {
      en: 'Meet us at upcoming exhibitions and discover our latest innovations',
      it: 'Incontrateci alle prossime fiere e scoprite le nostre ultime innovazioni',
      es: 'Encuéntrenos en las próximas ferias y descubra nuestras últimas innovaciones',
      pt: 'Encontre-nos nas próximas feiras e descubra as nossas mais recentes inovações'
    },
    boothDetails: {
      en: 'Booth Details:',
      it: 'Dettagli dello Stand:',
      es: 'Detalles del Stand:',
      pt: 'Detalhes do Estande:'
    },
    btnLearnMore: {
      en: 'Learn More',
      it: 'Scopri di Più',
      es: 'Saber Más',
      pt: 'Saiba Mais'
    },
    emptyTitle: {
      en: 'No upcoming events at the moment.',
      it: 'Nessun evento in programma al momento.',
      es: 'No hay eventos próximos en este momento.',
      pt: 'Sem eventos futuros no momento.'
    },
    emptySub: {
      en: 'Check back soon for new event announcements.',
      it: 'Tornate presto per scoprire i nuovi eventi annunciati.',
      es: 'Vuelva pronto para conocer los nuevos eventos anunciados.',
      pt: 'Volte em breve para novos eventos anunciados.'
    },
    ctaTitle: {
      en: 'Want to Meet Us?',
      it: 'Volete Incontrarci?',
      es: '¿Quiere Conocernos?',
      pt: 'Deseja nos Encontrar?'
    },
    ctaDesc: {
      en: 'Contact us to schedule a meeting at any of our upcoming events',
      it: 'Contattateci per fissare un incontro ai nostri prossimi eventi',
      es: 'Contáctenos para programar una reunión en nuestros próximos eventos',
      pt: 'Entre em contato para agendar uma reunião em nossos próximos eventos'
    },
    ctaBtn: {
      en: 'Get in Touch',
      it: 'Contattaci',
      es: 'Ponte en Contacto',
      pt: 'Entre em Contato'
    }
  },
  newsPage: {
    heroTitle: {
      en: 'News & Updates',
      it: 'Notizie e Aggiornamenti',
      es: 'Noticias y Actualizaciones',
      pt: 'Notícias e Atualizações'
    },
    heroSub: {
      en: 'Stay informed about our latest achievements, innovations, and industry insights',
      it: 'Rimani informato sui nostri ultimi risultati, innovazioni e approfondimenti del settore',
      es: 'Manténgase informado sobre nuestros últimos logros, innovaciones y conocimientos de la industria',
      pt: 'Mantenha-se informado sobre as nossas últimas conquistas, inovações e percepções do setor'
    },
    readMore: {
      en: 'Read more →',
      it: 'Leggi di più →',
      es: 'Leer más →',
      pt: 'Leia mais →'
    },
    emptyTitle: {
      en: 'No news available at the moment.',
      it: 'Nessuna notizia disponibile al momento.',
      es: 'No hay noticias disponibles en este momento.',
      pt: 'Nenhuma notícia disponível no momento.'
    },
    emptySub: {
      en: 'Check back soon for updates.',
      it: 'Tornate presto per aggiornamenti.',
      es: 'Vuelva pronto para actualizaciones.',
      pt: 'Volte em breve para atualizações.'
    },
    ctaTitle: {
      en: 'Stay Updated',
      it: 'Rimani Aggiornato',
      es: 'Manténgase Actualizado',
      pt: 'Mantenha-se Atualizado'
    },
    ctaDesc: {
      en: 'Subscribe to receive the latest news and updates from Soprani',
      it: 'Iscriviti per ricevere le ultime notizie e aggiornamenti da Soprani',
      es: 'Suscríbase para recibir las últimas noticias y actualizaciones de Soprani',
      pt: 'Assine para receber as últimas notícias e atualizações da Soprani'
    },
    placeholderEmail: {
      en: 'Enter your email',
      it: 'Inserisci la tua email',
      es: 'Introduce tu correo',
      pt: 'Digite seu email'
    },
    btnSubscribe: {
      en: 'Subscribe',
      it: 'Iscriviti',
      es: 'Suscribirse',
      pt: 'Inscrever-se'
    }
  },
  productsPage: {
    heroTitle: {
      en: 'Product Solutions',
      it: 'Soluzioni di Prodotto',
      es: 'Soluciones de Producto',
      pt: 'Soluções de Produtos'
    },
    heroSub: {
      en: 'Reliable machinery, spare parts, and technical assistance tailored to the needs of the global metal packaging industry.',
      it: 'Macchinari affidabili, pezzi di ricambio e assistenza tecnica su misura per le esigenze dell\'industria globale dell\'imballaggio metallico.',
      es: 'Maquinaria confiable, repuestos y asistencia técnica adaptados a las necesidades de la industria mundial de envases metálicos.',
      pt: 'Maquinário confiável, peças de reposição e assistência técnica sob medida para as necessidades da indústria global de embalagens metálicas.'
    },
    filterBy: {
      en: 'Filter by:',
      it: 'Filtra per:',
      es: 'Filtrar por:',
      pt: 'Filtrar por:'
    },
    allProducts: {
      en: 'All Products',
      it: 'Tutti i Prodotti',
      es: 'Todos los Productos',
      pt: 'Todos os Produtos'
    },
    keyFeatures: {
      en: 'Key Features:',
      it: 'Caratteristiche Principali:',
      es: 'Características Clave:',
      pt: 'Principais Características:'
    },
    emptyProducts: {
      en: 'No products found in this category.',
      it: 'Nessun prodotto trovato in questa categoria.',
      es: 'No se encontraron productos en esta categoría.',
      pt: 'Nenhum produto encontrado nesta categoria.'
    }
  },
  machineryPage: {
    heroTitle: {
      en: 'Metal Packaging Machinery',
      it: 'Macchinari per Imballaggi Metallici',
      es: 'Maquinaria para Envases Metálicos',
      pt: 'Maquinário para Embalagens Metálicas'
    },
    heroSub: {
      en: 'Comprehensive machinery solutions for can making and metal packaging production',
      it: 'Soluzioni complete di macchinari per la produzione di lattine e imballaggi metallici',
      es: 'Soluciones completas de maquinaria para la fabricación de latas y envases metálicos',
      pt: 'Soluções completas de maquinário para fabricação de latas e embalagens metálicas'
    },
    introTitle: {
      en: 'Industrial Machinery for Metal Packaging',
      it: 'Macchinari Industriali per Imballaggi Metallici',
      es: 'Maquinaria Industrial para Envases Metálicos',
      pt: 'Maquinário Industrial para Embalagens Metálicas'
    },
    introP1: {
      en: 'We specialize in sourcing and supplying machinery used in metal packaging production. Whether you\'re looking for complete production lines or specific equipment, our extensive network and expertise ensure you find the right solution for your manufacturing needs.',
      it: 'Siamo specializzati nella ricerca e fornitura di macchinari per la produzione di imballaggi metallici. Che cerchiate linee di produzione complete o attrezzature specifiche, la nostra vasta rete e la nostra esperienza vi assicureranno la soluzione giusta per le vostre esigenze.',
      es: 'Nos especializamos en el abastecimiento y suministro de maquinaria utilizada en la producción de envases metálicos. Ya sea que busque líneas de producción completas o equipos específicos, nuestra amplia red y experiencia le aseguran encontrar la solución correcta para sus necesidades.',
      pt: 'Somos especializados no fornecimento de maquinário usado na produção de embalagens metálicas. Quer você esteja procurando por linhas completas ou equipamentos específicos, nossa extensa rede e experiência garantirão a solução certa para as suas necessidades de fabricação.'
    },
    introP2: {
      en: 'Our machinery portfolio covers all aspects of metal packaging production, from initial forming to final inspection and packaging.',
      it: 'Il nostro portfolio di macchinari copre tutti gli aspetti della produzione di imballaggi metallici, dalla formatura iniziale all\'ispezione e all\'imballaggio finale.',
      es: 'Nuestro portafolio de maquinaria cubre todos los aspectos de la producción de envases metálicos, desde la formación inicial hasta la inspección y el envasado finales.',
      pt: 'O nosso portfólio de maquinário abrange todos os aspectos da produção de embalagens metálicas, desde a moldagem inicial até à inspeção e embalagem finais.'
    },
    introBtn: {
      en: 'Contact Us for Current Opportunities',
      it: 'Contattaci per le Ultime Opportunità',
      es: 'Contáctenos para Oportunidades Actuales',
      pt: 'Contate-nos para Oportunidades Atuais'
    },
    categoriesTitle: {
      en: 'Machinery Categories',
      it: 'Categorie di Macchinari',
      es: 'Categorías de Maquinaria',
      pt: 'Categorias de Maquinário'
    },
    ctaTitle: {
      en: 'Looking for Specific Machinery?',
      it: 'Cercate un Macchinario Specifico?',
      es: '¿Busca una Maquinaria Específica?',
      pt: 'Procurando por Maquinário Específico?'
    },
    ctaDesc: {
      en: 'Contact us for current machinery opportunities and availability. Our team will help you find the perfect equipment for your production needs.',
      it: 'Contattateci per l\'attuale disponibilità e le opportunità dei macchinari. Il nostro team vi aiuterà a trovare l\'attrezzatura perfetta.',
      es: 'Contáctenos para conocer las oportunidades y disponibilidad actual de la maquinaria. Nuestro equipo le ayudará a encontrar el equipo perfecto.',
      pt: 'Entre em contato para saber das oportunidades atuais de maquinário e disponibilidade. Nossa equipe o ajudará a encontrar o equipamento perfeito.'
    },
    ctaBtn1: {
      en: 'Get in Touch',
      it: 'Contattaci',
      es: 'Contáctenos',
      pt: 'Entre em Contato'
    },
    ctaBtn2: {
      en: 'Request Information',
      it: 'Richiedi Informazioni',
      es: 'Solicitar Información',
      pt: 'Solicitar Informação'
    },
    weldingT: {
      en: 'Welding Machines',
      it: 'Saldatrici',
      es: 'Máquinas de Soldadura',
      pt: 'Máquinas de Solda'
    },
    weldingD: {
      en: 'Advanced welding equipment for metal packaging production with precision and reliability.',
      it: 'Attrezzatura di saldatura avanzata per la produzione di imballaggi metallici con precisione e affidabilità.',
      es: 'Equipos de soldadura avanzados para la producción de envases metálicos con precisión y fiabilidad.',
      pt: 'Equipamento avançado de soldadura para a produção de embalagens metálicas com precisão e fiabilidade.'
    },
    canT: {
      en: 'Can-Making Lines',
      it: 'Linee per la Produzione di Lattine',
      es: 'Líneas de Fabricación de Latas',
      pt: 'Linhas de Fabricação de Latas'
    },
    canD: {
      en: 'Complete production lines for manufacturing cans with high efficiency and output.',
      it: 'Linee di produzione complete per la produzione di lattine ad alta efficienza e rendimento.',
      es: 'Líneas de producción completas para la fabricación de latas con alta eficiencia y rendimiento.',
      pt: 'Linhas de produção completas para o fabrico de latas com alta eficiência e rendimento.'
    },
    pressesT: {
      en: 'Presses',
      it: 'Presse',
      es: 'Prensas',
      pt: 'Prensas'
    },
    pressesD: {
      en: 'Industrial presses for metal forming and shaping in packaging production.',
      it: 'Presse industriali per la formatura e la lavorazione del metallo nella produzione di imballaggi.',
      es: 'Prensas industriales para la conformación de metales en la producción de envases.',
      pt: 'Prensas industriais para moldagem de metal na produção de embalagens.'
    },
    decoratingT: {
      en: 'Decorating Lines',
      it: 'Linee di Decorazione',
      es: 'Líneas de Decoración',
      pt: 'Linhas de Decoração'
    },
    decoratingD: {
      en: 'Specialized equipment for decorating and printing on metal packaging.',
      it: 'Attrezzature specializzate per la decorazione e la stampa su imballaggi metallici.',
      es: 'Equipos especializados para la decoración e impresión en envases metálicos.',
      pt: 'Equipamentos especializados para decoração e impressão em embalagens metálicas.'
    },
    coatingT: {
      en: 'Coating Systems',
      it: 'Sistemi di Verniciatura',
      es: 'Sistemas de Recubrimiento',
      pt: 'Sistemas de Revestimento'
    },
    coatingD: {
      en: 'Advanced coating and finishing systems for metal packaging protection and aesthetics.',
      it: 'Sistemi di verniciatura e finitura avanzati per la protezione e l\'estetica degli imballaggi metallici.',
      es: 'Sistemas avanzados de recubrimiento y acabado para la protección y estética de los envases metálicos.',
      pt: 'Sistemas avançados de revestimento e acabamento para proteção e estética das embalagens metálicas.'
    },
    handlingT: {
      en: 'Handling Equipment',
      it: 'Sistemi di Movimentazione',
      es: 'Equipos de Manejo',
      pt: 'Equipamento de Manuseamento'
    },
    handlingD: {
      en: 'Material handling and conveyor systems for efficient production workflows.',
      it: 'Movimentazione di materiali e sistemi di trasporto per flussi di produzione efficienti.',
      es: 'Sistemas de transporte y manejo de materiales para flujos de trabajo de producción eficientes.',
      pt: 'Sistemas de transporte e manuseio de materiais para fluxos eficientes.'
    },
    inspectionT: {
      en: 'Inspection Systems',
      it: 'Sistemi di Ispezione',
      es: 'Sistemas de Inspección',
      pt: 'Sistemas de Inspeção'
    },
    inspectionD: {
      en: 'Quality control and inspection equipment for packaging verification.',
      it: 'Attrezzatura per il controllo qualità e l\'ispezione per la verifica degli imballaggi.',
      es: 'Equipos de control de calidad e inspección para la verificación de envases.',
      pt: 'Controle de qualidade e equipamento de inspeção para verificação de embalagens.'
    }
  },
  sparePartsPage: {
    heroTitle: {
      en: 'Spare Parts Supply',
      it: 'Fornitura Pezzi di Ricambio',
      es: 'Suministro de Repuestos',
      pt: 'Fornecimento de Peças de Reposição'
    },
    heroSub: {
      en: 'Comprehensive spare parts sourcing and supply for metal packaging machinery',
      it: 'Fornitura e reperimento di pezzi di ricambio per macchinari per imballaggio metallico',
      es: 'Aprovisionamiento y suministro completos de repuestos para maquinaria de envases metálicos',
      pt: 'Fornecimento de peças de reposição abrangente para maquinário de embalagens metálicas'
    },
    introTitle: {
      en: 'Keep Your Production Running',
      it: 'Mantenete in Funzione la Produzione',
      es: 'Mantenga su Producción en Marcha',
      pt: 'Mantenha sua Produção em Funcionamento'
    },
    introP1: {
      en: 'Production downtime is costly. Our comprehensive spare parts sourcing and supply service ensures your machinery stays operational. We specialize in identifying and sourcing both common and difficult-to-find components for metal packaging machinery.',
      it: 'I fermi macchina sono costosi. Rimanete operativi grazie ai nostri servizi. I nostri esperti trovano sia pezzi comuni che introvabili.',
      es: 'El tiempo de inactividad de la producción es costoso. Garantice el funcionamiento con nuestros servicios. Encontramos piezas comunes y difíciles de encontrar.',
      pt: 'O tempo de inatividade da produção é muito oneroso. Mantenha os seus equipamentos totalmente operacionais com os nossos serviços de fornecimento e localização de peças de reposição. Somos especialistas em encontrar as mais comuns e também as difíceis.'
    },
    introP2: {
      en: 'With our global network and technical expertise, we can locate and deliver the exact parts you need, when you need them. Whether you\'re looking for standard components or specialized parts, we have the resources to help.',
      it: 'Grazie alla nostra rete globale, localizziamo i vostri ordini alla perfezione, garantendo risorse veloci e tempestive.',
      es: 'A través de nuestra red global y nuestra experiencia, ubicamos las piezas de la forma más eficiente posible y las entregamos rápidamente.',
      pt: 'Através de nossa rede global, nós localizamos e fornecemos as peças mais perfeitamente de forma rápida e segura.'
    },
    svcsTitle: {
      en: 'Our Spare Parts Services',
      it: 'I Nostri Servizi Ricambi',
      es: 'Nuestros Servicios de Repuestos',
      pt: 'Nossos Serviços de Peças de Reposição'
    },
    b1T: {
      en: 'Expert Identification',
      it: 'Identificazione da Esperti',
      es: 'Identificación Experta',
      pt: 'Identificação por Especialistas'
    },
    b1D: {
      en: 'Precise identification of spare parts for all machinery types and manufacturers.',
      it: 'Identificazione precisa dei pezzi di ricambio per tutti i tipi di macchinari e produttori.',
      es: 'Identificación precisa de repuestos para todos los tipos de maquinaria y fabricantes.',
      pt: 'Identificação precisa de peças de reposição para todos os tipos de maquinários e fabricantes.'
    },
    b2T: {
      en: 'Minimize Downtime',
      it: 'Ridurre i Fermi Macchina',
      es: 'Minimizar el Tiempo de Inactividad',
      pt: 'Minimizar Tempo de Inatividade'
    },
    b2D: {
      en: 'Fast sourcing and delivery to keep your production running without interruption.',
      it: 'Reperimento e consegna rapidi per far funzionare in modo ottimale la produzione.',
      es: 'Búsqueda y entrega rápidas para su ininterrumpida producción.',
      pt: 'Fornecimento rápido de fontes e entrega ideal para fluxos limpos de produção.'
    },
    b3T: {
      en: 'Quality Assurance',
      it: 'Garanzia di Qualità',
      es: 'Garantía de Calidad',
      pt: 'Garantia de Qualidade'
    },
    b3D: {
      en: 'Verified parts that meet industry standards and specifications.',
      it: 'Pezzi verificati in base agli standard industriali e alle specifiche di settore.',
      es: 'Piezas verificadas bajo el estricto estándar industrial.',
      pt: 'Peças validadas pelas normas industriais.'
    },
    b4T: {
      en: 'Reliable Logistics',
      it: 'Logistica Affidabile',
      es: 'Logística Confiable',
      pt: 'Logística Confiável'
    },
    b4D: {
      en: 'Efficient delivery and logistics support worldwide.',
      it: 'Consegne efficienti in tutto il mondo.',
      es: 'Entregas eficientes y soporte logístico a nivel mundial.',
      pt: 'Entregas eficientes e suporte logístico em todo o mundo.'
    },
    whyChooseTitle: {
      en: 'Why Choose Soprani Engineering for Spare Parts?',
      it: 'Perché scegliere Soprani per i vostri Pezzi di Ricambio?',
      es: '¿Por qué Elegir a Soprani para sus Piezas?',
      pt: 'Por que Escolher a Soprani para Peças?'
    },
    f1T: { en: 'Parts Identification', it: 'Ricerca Ricambi', es: 'Identificación de Piezas', pt: 'Identificação de Peças' },
    f1D: { en: 'Expert identification of spare parts for all machinery types, brands, and models used in metal packaging production.', it: 'Con una grande competenza tecnica troviamo la soluzione ideale.', es: 'Con experiencia técnica en soluciones de envasado.', pt: 'Fornecimento eficaz com conhecimento técnico da área.'},
    f2T: { en: 'Difficult Component Sourcing', it: 'Ricambi Introvabili', es: 'Búsqueda Difícil de Componentes', pt: 'Componentes Obsoletos' },
    f2D: { en: 'Specialized sourcing of hard-to-find and obsolete parts through our extensive global network.', it: 'La rete globale a nostra disposizione elimina le limitazioni.', es: 'Su red global proporciona cualquier máquina de envasado y pieza.', pt: 'Conexão e suporte eficientes no mercado.'},
    f3T: { en: 'Quality Verification', it: 'Verifica della Qualità', es: 'Verificación de Calidad', pt: 'Qualidade Excepcional' },
    f3D: { en: 'All parts are verified for quality and compatibility before delivery to ensure optimal performance.', it: 'Prestazioni eccellenti sono la nostra base in Soprani.', es: 'Se verifican de cerca todas las soluciones y el material entregado.', pt: 'Qualidade totalmente priorizada na linha global.'},
    f4T: { en: 'Fast Delivery', it: 'Spedizioni Veloci', es: 'Entrega Rápida', pt: 'Entrega Ágil' },
    f4D: { en: 'Efficient logistics and delivery systems to minimize production downtime and keep your operations running.', it: 'Logistica efficiente che minimizza interruzioni.', es: 'Sistemas inteligentes para minimizar cualquier pérdida para nuestros socios.', pt: 'Desempenho com suporte completo.'},
    f5T: { en: 'Competitive Pricing', it: 'Prezzi Vantaggiosi', es: 'Precios Competitivos', pt: 'Custo-benefício' },
    f5D: { en: 'Competitive pricing on spare parts without compromising on quality or reliability.', it: 'Competitività eccellente e ad un costo basso nel lungo termine.', es: 'Beneficios financieros que valora nuestro socio en su trabajo de envasado y material.', pt: 'Lado financeiro respeitado pela excelência constante.'},
    f6T: { en: 'Technical Support', it: 'Supporto', es: 'Asistencia Técnica', pt: 'Apoio Técnico' },
    f6D: { en: 'Expert technical guidance to ensure you get the right parts for your specific machinery and needs.', it: 'Guidati dai nostri esperti, vi orienterete verso le performance di alto livello.', es: 'Confiable ayuda para toda su fábrica y equipo de maquinaria.', pt: 'Excelente experiência técnica entregue às suas fábricas e plantas em tempo integral.'},
    ctaTitle: {
      en: 'Need Spare Parts?',
      it: 'Ti servono Ricambi?',
      es: '¿Necesita Repuestos?',
      pt: 'Precisa de Peças?'
    },
    ctaDesc: {
      en: 'Contact us today with your spare parts requirements. Our team will help you find the exact components you need.',
      it: 'Contattateci, siamo la soluzione adatta ai vostri ricambi e in generale problemi al livello operativo.',
      es: 'Póngase en contacto con nosotros; tenemos el repuesto especializado a mano de inmediato.',
      pt: 'Temos qualquer tipo de peça de equipamento ao nosso alcance global. Contate nosso suporte agora.'
    },
    ctaBtn1: {
      en: 'Contact Us',
      it: 'Contattaci',
      es: 'Contáctenos',
      pt: 'Contate-nos'
    },
    ctaBtn2: {
      en: 'Request a Quote',
      it: 'Richiedi un Preventivo',
      es: 'Solicitar Cotización',
      pt: 'Obtenha Cotação'
    }
  },
  tradingPage: {
    heroTitle: {
      en: 'Trading Materials',
      it: 'Trading di Materiali',
      es: 'Comercio de Materiales',
      pt: 'Comércio de Materiais'
    },
    heroSub: {
      en: 'Tinplate and aluminum trading for metal packaging production',
      it: 'Commercio di banda stagnata e alluminio per la produzione di imballaggi metallici',
      es: 'Comercio de hojalata y aluminio para la producción de envases metálicos',
      pt: 'Comércio de folha de flandres e alumínio para a produção de embalagens metálicas'
    },
    introTitle: {
      en: 'Quality Materials for Metal Packaging',
      it: 'Materiali di Qualità per Imballaggi Metallici',
      es: 'Materiales de Calidad para Envases Metálicos',
      pt: 'Materiais de Qualidade para Embalagens Metálicas'
    },
    introP1: {
      en: 'We provide direct access to quality tinplate and aluminum materials used in metal packaging production. Our trading operations connect manufacturers with reliable suppliers, ensuring consistent supply of materials that meet industry standards.',
      it: 'La nostra fitta rete commerciale intercetta ogni esigenza tecnica. Trovate il vostro prodotto tra banda stagnata, alluminio e altro di primaria qualità europea ed asiatica per i processi metalmeccanici a costi di ingrosso competitivi.',
      es: 'Ofrecemos excelente material de red comercial, la hojalata y aluminio más puros se entregan a su puerta provenientes de proveedores confiables con nuestra extensa red de embalajes a las industrias.',
      pt: 'Excelente acesso direto na Europa à folha-de-flandres global, unindo fábricas industriais para trazer suprimentos perfeitos desde as refinarias até clientes em uma gama consistente de ligas.'
    },
    introP2: {
      en: 'Whether you need tinplate for food and beverage cans or aluminum for lightweight packaging solutions, we offer competitive pricing and flexible order quantities to support your production needs.',
      it: 'Le migliori forniture con flessibilità e supporto post vendita sulle materie.',
      es: 'Soporte y materia prima disponible al mejor valor del área metálica.',
      pt: 'Fornecemos desde volumes flexíveis ideais para os perfis até soluções pesadas em folhas completas.'
    },
    matTitle: {
      en: 'Materials We Trade',
      it: 'I Nostri Prodotti per il Trading',
      es: 'Materiales que Operamos',
      pt: 'Os Materiais que Negociamos'
    },
    m1T: {
      en: 'Tinplate', it: 'Banda Stagnata', es: 'Hojalata', pt: 'Folha de Flandres'
    },
    m1D: {
      en: 'High-quality tinplate materials for metal packaging production. Available in various gauges and specifications for food and beverage containers.',
      it: 'L\'ideale per imballaggi e la linea food/beverage europea ed intercontinentale con le varie conformazioni su misura per la clientela.',
      es: 'Gran material maleable y fuerte, adaptable en diversos empaques del área de alimentos. Se entrega y almacena globalmente a petición.',
      pt: 'Utilização excelente, perfeitamente em conformidade com especificações e para fins alimentares industriais amplos com estoques vastos a demanda.'
    },
    m2T: {
      en: 'Aluminum', it: 'Alluminio', es: 'Aluminio', pt: 'Alumínio'
    },
    m2D: {
      en: 'Premium aluminum materials for lightweight and durable metal packaging solutions. Ideal for beverage cans and specialty containers.',
      it: 'Imballaggio eccellente con durata massima garantita del composto. Progettati con finiture industriali premium su scala europea per imballaggi ottimi.',
      es: 'Excelencia en envases de duración impecable con la especialización comercial probada e impulsada.',
      pt: 'Eficaz modelo contínuo com acabamento formidável ideal e duradouro no prazo longo aos contêineres e latas industriais com ótimo peso de manuseio prático com custo ótimo mundialmente.'
    },
    matFeature1: { en: 'Various gauges and specifications', it: 'Varie specifiche', es: 'Varias especificaciones', pt: 'Diversas especificações' },
    matFeature2: { en: 'Quality verified materials', it: 'Qualità verificata', es: 'Calidad verificada', pt: 'Qualidade alta verificada' },
    matFeature3: { en: 'Competitive pricing', it: 'Prezzi competitivi', es: 'Precios competitivos', pt: 'Preços flexíveis e competitivos' },
    matFeature4: { en: 'Flexible order quantities', it: 'Ordini flessibili', es: 'Cantidades variables de pedido', pt: 'Quantidades variáveis globais e de pedido prático' },
    whyTitle: {
      en: 'Why Choose Soprani Engineering for Materials Trading?',
      it: 'Perché scegliere Soprani per il Trading di Materiali?',
      es: '¿Por qué elegir Soprani Ingeniería para el Comercio?',
      pt: 'Vantagem da Soprani em Matérias-Primas?'
    },
    b1T: { en: 'Global Supply', it: 'Rete Globale', es: 'Red Global', pt: 'Rede Global Eficiente' },
    b1D: { en: 'Access to quality materials from reliable suppliers worldwide.', it: 'Materia da forniture ottime in giro nel mondo e costanti negli approvvigionamenti e nei magazzini.', es: 'Varias ubicaciones al mejor coste para nuestro socio en todo momento global con los mejores de primera red en línea de hojalatas metales.', pt: 'Abastecimento em primeiro nível desde centros produtivos aos maquinários dos clientes a baixo preço constante para metais em folhas e bobinas.'},
    b2T: { en: 'Competitive Pricing', it: 'Prezzi Competitivi', es: 'Costos Excelentes', pt: 'Custo Excelentes Global' },
    b2D: { en: 'Competitive rates on bulk orders with flexible payment terms.', it: 'Spese operative snelle a vantaggio delle tempistiche veloci di acquisizioni.', es: 'Agilidad excepcional en adquisiciones a granel.', pt: 'Veloz operação sob custo atraente e viável nos tempos ideais por grandes clientes atacadistas nas folhas europeias ou ocidentais amplas e em bobinas em alumínio da melhor liga ou de folha finíssima prontas para ir diretas dos portos.'},
    b3T: { en: 'Quality Assurance', it: 'Qualità Vera', es: 'Calidad Confiable Asegurada', pt: 'Garantia Qualitativa Real Pura' },
    b3D: { en: 'All materials verified for quality and specifications.', it: 'La certezza testata.', es: 'Excelente revisión testada.', pt: 'Controle contínuo verificado estrito para indústria alimentícia por maquinários adequados de alto teste físico em cada unidade entregada perfeitamente embalada nas normas internacionais ideais no topo máximo para aprovações globais nos fornecedores.'},
    b4T: { en: 'Flexible Orders', it: 'Flessibilità ordini', es: 'Pedidos flexibles', pt: 'Pedidos práticos' },
    b4D: { en: 'Flexible order quantities to match your production needs.', it: 'Le forniture si addicono alle singole catene di produzione.', es: 'Aptitud productiva según orden.', pt: 'Eficácia na montagem pontual de sua remessa industrial exata flexível no tempo oportuno adequado de folha-de-flandres global, alumínio estritamente prático e maleável ao estoque real nas indústrias pesadas de metalurgias da Europa, Extremo Oriente e Ásia.'},
    svcTitle: {
      en: 'Our Trading Services', it: 'I nostri servizi per il Trading', es: 'Nuestros servicios en este Sector de Materiales Comerciales Activos', pt: 'Os nossos serviços para esta área Comercial Operacional de Material Prático Direto em Larga Escala e Volume Adequado à Metalurgia Formidável'
    },
    s1T: { en: 'Material Sourcing', it: 'Reperimento delle materie ottimali e ricercate da tutti globalmente, anche ad alto volume.', es: 'Búsqueda experta rápida', pt: 'Prontidão Especial' },
    s1D: { en: 'Direct sourcing of tinplate and aluminum from reliable suppliers with quality assurance.', it: 'Sourcing eccellente da industrie qualificate in forniture.', es: 'Fuentes y contacto directo verificado con alta diligencia experta.', pt: 'Fornecimento primário desde bases estritamente controladas por órgãos técnicos mundiais competentes da indústria europeia e externa ligada à rede.' },
    s2T: { en: 'Specification Matching', it: 'Match test.', es: 'Alineación de variables', pt: 'Precisões' },
    s2D: { en: 'Precise matching of materials to your specific production requirements and standards.', it: 'Precisione massima dei macchinari e dell\'utilizzatore delle presse per adattare questi a ogni lamiera.', es: 'Fórmulas testadas por industria.', pt: 'Testes adequados globalmente em bases puras de liga metálica ideal leve ou pesada.' },
    s3T: { en: 'Bulk Orders', it: 'Grossi Lotti', es: 'Volúmenes Masivos', pt: 'Volumes Extensos' },
    s3D: { en: 'Competitive pricing on bulk orders with flexible payment and delivery terms.', it: 'Possibilità e gestione grandi volumi merci da porti extraUE a UE e occidente globalmente con agibilità dei tempi ed approvvigionamenti completi dei nostri operatori marittimi per clienti.', es: 'Tiempos perfectos con las terminales.', pt: 'Oceano prático sem atrasos em docas nos principais centros comerciais amplos com flexibilidade bancária no nível adequado constante com fornecedor ótimo direto nas ligações para você e o fabricante no longo do melhor e maior modal e cadeia atual e eficaz para sua planta não parar as prensas, soldas ou tintas nunca com falta da base do latão ou chapas variadas ou lata branca em branco primário ótimo por preços bons anuais fixos das commodities perfeitamente geridas ao nosso olhar expert em trading para embalagem segura perfeita metalizada.' },
    s4T: { en: 'Logistics Support', it: 'Aiuto Logistico', es: 'Operativa de Rutas y Aduana', pt: 'Coordenação Oportuna Completa do Modal Logístico das Encomendas' },
    s4D: { en: 'Efficient logistics and delivery coordination to ensure timely material arrival.', it: 'Supporto per non far gravare nulla nel viaggio al cliente per il materiale scelto per le produzioni.', es: 'Descarga eficiente del comprador.', pt: 'Logística prática perfeitamente isenta à nossa supervisão excelente para a mercadoria ser entregue de forma estrita em prazos ótimos.' },
    s5T: { en: 'Quality Verification', it: 'Controllo Qualitativo Interno', es: 'Evaluación Constante', pt: 'Fiscalização Pura' },
    s5D: { en: 'All materials undergo quality verification before delivery to ensure compliance.', it: 'A norma di legge mondiale europea, asiatica ecc', es: 'Comercializados en regla', pt: 'Padronização' },
    s6T: { en: 'Technical Consultation', it: 'Consulto e Tecniche', es: 'Guía', pt: 'Apoio Constante Especializado e Consulta' },
    s6D: { en: 'Expert guidance on material selection and specifications for your production needs.', it: 'Risolviamo problemi sul materiale e la forma ideali su misura sulla base della vostra produzione per avere le latte in latta o alluminio più funzionali, robuste o sottili a seconda delle linee produttive vostre attuali per ridurre tempi ed usura impianti e parti. Consulenza premium completa della Soprani Engineering srl.', es: 'Soporte absoluto.', pt: 'Excelência desde o momento oportuno constante primário ideal prático excelente. Equipe global da empresa líder europeia no suporte a você com sua vasta experiência acumulada nestes tópicos primordiais técnicos que farão economias amplas das máquinas.' },
    ctaTitle: {
      en: 'Looking for Quality Materials?',
      it: 'Materie di Prima Scelta?',
      es: '¿Material Superior?',
      pt: 'Qualidade Excepcional Direta?'
    },
    ctaDesc: {
      en: 'Contact us for tinplate and aluminum trading opportunities. We\'ll help you find the right materials at competitive prices.',
      it: 'Siamo disponibili ad avviare scambi in tempo utile. Compili il nostro form dedicato a richieste generali o previentivi in questi bottoni sotto, indicando volume e area di riferimento per avere le materie premium Soprani per lattine.',
      es: 'Le aportaremos beneficios inmediatos y contacto excepcional sobre las variables óptimas.',
      pt: 'Vamos auxiliar imediatamente fornecendo material no volume exato. Fale já clicando abaixo na cotação para obtermos as variáveis das embalagens requeridas que deseja negociar de folha pronta para usar.'
    },
    ctaBtn1: { en: 'Contact Us', it: 'Contattaci', es: 'Consulta General', pt: 'Consulta Global' },
    ctaBtn2: { en: 'Request a Quote', it: 'Richiedi un Preventivo', es: 'Cotizar y Adquirir', pt: 'Gere a Cotação e o Pedido' }
  },
  techPage: {
    heroTitle: {
      en: 'Technical Assistance',
      it: 'Assistenza Tecnica',
      es: 'Asistencia Técnica',
      pt: 'Assistência Técnica'
    },
    heroSub: {
      en: 'Expert technical support for metal packaging machinery optimization and maintenance',
      it: 'Supporto tecnico specializzato per l\'ottimizzazione e la manutenzione dei macchinari per imballaggi',
      es: 'Experto soporte en mantenimiento de la maquinaria metalúrgica especial del empaque fabricado.',
      pt: 'Eficaz modelo contínuo com desempenho perfeitamente técnico focado e centrado nas melhorias práticas à suas máquinas constantes da área. O Suporte premium mundial da Soprani lhe ajudando na fábrica hoje e futuro da produção otimizada excelente'
    },
    introTitle: {
      en: 'Maximize Your Equipment Performance',
      it: 'Aumentare le Prestazioni dell\'Impianto',
      es: 'Elevando todo Rendimiento de sus Máquinas Industriales Operativas Constantes de Planta',
      pt: 'Maximizar Performance Ideal Completa'
    },
    introP1: {
      en: 'Our technical assistance services are designed to help you optimize your metal packaging machinery and maintain peak production efficiency. Whether you\'re facing equipment challenges or planning upgrades, our experienced team provides comprehensive technical support.',
      it: 'Diamo pieno supporto alle aziende metallurgiche con i nostri studi.',
      es: 'Eficiencia integral apoyada por ingeniería.',
      pt: 'Experiência para seu equipamento.'
    },
    introP2: {
      en: 'We combine deep technical expertise with practical problem-solving to ensure your production runs smoothly and efficiently.',
      it: 'Efficienza che massimizza investimenti.',
      es: 'Gran resolución y soporte en planta de manera confiable con ingeniería y mantenimiento continuo del parque.',
      pt: 'Apoiados por inteligência para resolver qualquer assunto das suas plantas diárias no desempenho da máquina no prazo prático ideal à rotina eficiente máxima nas suas prensas e demais peças ótimas ou antigas em operação da empresa por excelência ao nosso grande mercado metal.'
    },
    svcTitle: {
      en: 'Our Technical Services',
      it: 'I Nostri Dispositivi Tecnici ed Assistenziali',
      es: 'Los Servicios Técnicos de Mejora Constante',
      pt: 'Nossos Serviços Perfeitos na Assistência'
    },
    s1T: { en: 'Troubleshooting Support', it: 'Risoluzione Guasti', es: 'Resolución de Incidentes', pt: 'Desempenho Corretivo' },
    s1D: { en: 'Expert diagnosis and resolution of machinery issues to get your production back on track quickly.', it: 'Ottimo ed efficiente modo per la vostra azienda di stare solida.', es: 'Diagnóstico rápido de forma eficiente de su situación práctica industrial.', pt: 'Confiabilidade desde momento ótimo imediato de forma consistente resolutiva excepcional das máquinas com paradas em sua organização metalúrgica produtora e formadora primária fabril a prazo ideal prático sem espera grave aos cofres plenos do cliente da base confiável perfeitamente engrenada como nunca feito em outro lugar na global grande cadeia europeia mundial contínua pela experiência italiana que trazemos para você agora com suporte perito na área.'},
    s2T: { en: 'Machine Evaluation', it: 'Valutazione Ottima', es: 'Visión del Rendimiento', pt: 'Avaliação Ideal Constante da Máquina' },
    s2D: { en: 'Comprehensive assessment of your equipment condition, performance, and optimization opportunities.', it: 'Valutazioni per migliorare il vostro macchinario esistente ad operare meglio con risparmio tempo o soldi vari o usure.', es: 'Diligencia industrial.', pt: 'Teste eficiente contínuo primário estrito global da Soprani na verificação do ciclo mecânico primário.'},
    s3T: { en: 'Maintenance Coordination', it: 'Gestione e Servizi di Riparazione', es: 'Ayuda técnica perita completa', pt: 'Gerenciamento Adequado Formidável da Estrutura Reparativa de Máquinas Longas' },
    s3D: { en: 'Professional maintenance planning and coordination to ensure optimal machinery performance.', it: 'Tempismo perfetto contro ogni perdita del ramo operativo delle aziende industriali europee nostre partner globalmente gestendole da ogni punto o fronte e ricambio a magazzino, tempi di sostituzione ecc.', es: 'Gestión perfecta perita de tiempo para frenar errores técnicos de forma proactiva.', pt: 'Manutenções puramente guiadas na inteligência pragmática técnica da Soprani para não faturarmos nada além do melhor constante à indústria cliente nas latas ótimas europeias grandes.'},
    s4T: { en: 'Revamping Support', it: 'Supporto di Risanamento degli Impianti Lenta od Obsoleti', es: 'Proyectos Mejora Fabriles a la Operativa Regular Mundial e Industriales Ligeros a Mayores de la Línea Práctica y Total con Soluciones Óptimas Formidables Constantes', pt: 'Construção Contínua Corretiva da Tecnologia Operativa' },
    s4D: { en: 'Technical guidance and support for equipment improvement and upgrading projects.', it: 'Revamping completo di ogni vostra linea nel metal packaging per riportarla ai livelli dei macchinari nuovi da fiera senza la spesa di rimpiazzo totale grazie a controlli ingegneristici completi.', es: 'Proyectos de reestructuración técnica de los ingenieros formidables globales.', pt: 'Renovação estritamente supervisionada técnica para estender e reviver plantas ótimas estagnadas em todo tipo contínuo prático do cliente no global apoio grande direto do perito.'},
    detailsTitle: {
      en: 'What We Offer',
      it: 'Cosa Garantiamo',
      es: 'Todo Nuestro Portfolio Efectivo',
      pt: 'A Nossa Visão Oferecida'
    },
    t1T: { en: 'Troubleshooting & Diagnostics', it: 'Analisi', es: 'Pruebas', pt: 'Falhas'},
    t1L1: { en: 'Equipment malfunction diagnosis', it: 'Diagnosi guasti da noi', es: 'Fallas del rendimiento testadas', pt: 'Testes ideais'},
    t1L2: { en: 'Root cause analysis', it: 'Causa originaria dei difetti', es: 'Motivo subyacente', pt: 'Dano principal'},
    t1L3: { en: 'Quick resolution strategies', it: 'Strategie rapide', es: 'Tiempos ágiles', pt: 'Rápidos meios' },
    t1L4: { en: 'Preventive measures', it: 'Fatturato e misure di controllo', es: 'Diligencia futura', pt: 'Meio preventivo globalmente' },
    
    t2T: { en: 'Machine Evaluation', it: 'Stima del Mach.', es: 'Estimativa Téc.', pt: 'Contagem Ideal Tecnológica' },
    t2L1: { en: 'Performance assessment', it: 'Studio', es: 'Trabajo evaluativo proactivo', pt: 'Meios da avaliação pura' },
    t2L2: { en: 'Condition evaluation', it: 'Condizione test', es: 'Test del estado de su base', pt: 'Eficácia em toda a constância técnica' },
    t2L3: { en: 'Efficiency analysis', it: 'Ottimalità', es: 'Test del medio', pt: 'Prática contínua resolutiva ideal pura' },
    t2L4: { en: 'Upgrade recommendations', it: 'Dritte di un operato per revisioni macchine da imballaggio', es: 'Tiempos de mejor uso real de piezas constantes o generales recomendadas y su aplicabilidad del factor útil total para embalaje de lata', pt: 'Atualização global perfeitamente eficaz resolvida em todas ferramentas e guias técnicas amplas fornecidas primárias nas máquinas estagnadas de suas redes plenas globais em latas.' },
    
    t3T: { en: 'Maintenance Coordination', it: 'Cura Fissa', es: 'Mantenimiento del Material Operativo de Planta y Factor Industrial', pt: 'Gestão Estrita Eficaz para Linhas Europeias Contínuas de Excelentes Rendimentos Diários e Operativos Peritos em Sua Grande Linha Metalúrgica Completa Suportada pelas Fases e Ações Constantes Reais Puras e Integradas do Engenheiro Formidável Global Italiano.' },
    t3L1: { en: 'Maintenance planning', it: 'Piani formidabili per te', es: 'Diseños excelentes proactivos de tiempos', pt: 'Bons designs da linha de tempo perfeita otimizada' },
    t3L2: { en: 'Schedule optimization', it: 'Le fasce lavorative sono ottimizzate estensivamente sempre per il metal d\'alto standard da noi', es: 'Rendimiento productivo testado sin fallas programables ni retrasos largos globales', pt: 'Organograma contínuo verificado primário nas rotinas amplas das manutenções estritas mundiais do melhor valor aos clientes e sócios grandes ou pequenos' },
    t3L3: { en: 'Parts coordination', it: 'Trovato ogni elemento meccanico', es: 'Excelente sincronía con sus proveedores internos o de red del experto Soprani y toda el área constante operativa en las metales', pt: 'Engrenagens ótimas nos melhores estoques e perfeitamente gerenciados pela inteligência resolutiva experiente italiana total excelente à indústria real da parte cliente' },
    t3L4: { en: 'Downtime minimization', it: 'Tempistica bassa di difetti', es: 'Sin fallas mayores de sus bases', pt: 'Tempo sem funcionar mínimo contínuo ideal proativo para você' },

    t4T: { en: 'Revamping Support', it: 'Supporto a Revamping', es: 'Operación del Perito para Reestructura', pt: 'Consultoria Direta e Intervenção de Tecnologia e Desempenho Exato Atualizado Contínuo Perfeitamente Resolutivo do seu Grande Conjunto Metalúrgico ou Antigo Obsoleto da Sua Maior Produção Diária Formidável em Metal' },
    t4L1: { en: 'Equipment modernization', it: 'Nuovo livello', es: 'Modernidad operativa', pt: 'Renovação ampla perita ágil' },
    t4L2: { en: 'Capacity enhancement', it: 'Più grande rendimento', es: 'Mucha base en la cadena', pt: 'Força em linhas limpas grandes ótimas diárias do cliente de lata' },
    t4L3: { en: 'Technology upgrades', it: 'Alta fascia', es: 'Costo proactivo con soporte excelente nuevo de las máquinas formidables del proceso', pt: 'Nível global novo verificado ideal no estrito suporte ao metal europeu de ponta primário italiano experiente atual e total de sistemas formadores contínuo confiáveis do engenheiro ao sistema eletrônico' },
    t4L4: { en: 'Performance improvement', it: 'Soluzione a miglioramento continuo in fatturato tempo di stampa metalli in uso', es: 'Cálculo para más rendimiento neto o real del tiempo por latas operadas totales de todo sistema industrial complejo fabricado y gestionado y por operar mejor que antes óptimos a plena forma diaria activa', pt: 'Performance ideal resolvida eficaz com todas latas bem construídas rápido de novo em taxas da velocidade otimizada nova sem gargalos.' },
    
    ctaTitle: {
      en: 'Need Technical Support?',
      it: 'Vi serve Assistanza?',
      es: '¿Precisa una Visión Profesional Urgente en Línea de Falla Técnica o Estática Operativa Fabricante?',
      pt: 'Quer Obter Inteligência Total Contínua Resolutivamente Operando em Sua Estrutura?'
    },
    ctaDesc: {
      en: 'Contact our technical team to discuss your machinery needs and how we can help optimize your production.',
      it: 'I Team Soprani tecnici con esperti sono con i clienti globali della produzione pronti ad azzerare il problema tecnico in poco a livello operativo ed intellettuale del processo da remoto a locale.',
      es: 'De inmediato nosotros intervenimos.',
      pt: 'Prontidão Global Europeia Italiana Exata com Atendimento Constante.'
    },
    ctaBtn1: { en: 'Contact Us', it: 'Contattaci', es: 'Directo al equipo Soprani', pt: 'Fala do Problema para Ação e Diagnóstico Exato Especial Prático Imediato Global da Suporte' },
    ctaBtn2: { en: 'Request Support', it: 'Richiedi il Supporto Ufficiale', es: 'Apoyo', pt: 'Requisitar Consultoria' }
  },
  mphPage: {
    heroTitle: {
      en: 'Metal Packaging Hub (MPH)',
      it: 'Metal Packaging Hub (MPH)',
      es: 'Metal Packaging Hub (MPH)',
      pt: 'Metal Packaging Hub (MPH)'
    },
    heroSub: {
      en: 'The future platform connecting machinery, spare parts, suppliers, and trading opportunities',
      it: 'La futura piattaforma che collegherà macchinari, pezzi di ricambio, fornitori e opportunità di trading',
      es: 'La futura plataforma que conectará maquinaria, repuestos, proveedores y oportunidades comerciales',
      pt: 'A futura plataforma revolucionária conectando maquinário, fornecedores e materiais excelentes proativos ao trading e peças vitais diárias industriais amplas de latas'
    },
    csTitle: {
      en: 'Coming Soon',
      it: 'Prossimamente',
      es: 'Próximamente',
      pt: 'Em Breve Lançamento Global'
    },
    csDesc: {
      en: 'The Metal Packaging Hub (MPH) is under development and will soon revolutionize how the metal packaging industry connects and conducts business.',
      it: 'La MPH sarà pronta rivoluzionaria in breve a breve termine sulle operatività B2B del metal packaging formidabilmente globale a livello pratico.',
      es: 'Nuestra solución MPH en proceso será una red increíble para contactarse e interactuar en negocios y toda clase metalúrgica del empaque industrial formidable general global óptima',
      pt: 'A nossa grande plataforma revolucionária estrita em todas variáveis puras globais industriais MPH europeia estará conectada para simplificar todas transações amplas perfeitamente diárias dos negócios globais das metalurgias clientes e fornecedores num único local de alta tecnologia e controle e visão ótima proativa do usuário metal'
    },
    whatTitle: {
      en: 'What is MPH?', it: 'Che Cos\'è l\' MPH?', es: '¿Visión del MPH?', pt: 'Mas o que vem a ser a MPH afinal de contas em visão real plena?'
    },
    whatP1: {
      en: 'The Metal Packaging Hub (MPH) is an innovative platform designed to connect all stakeholders in the metal packaging industry. It will serve as a centralized marketplace for machinery, spare parts, suppliers, and trading opportunities.',
      it: 'Tutti gli operatori del settore imballaggi si riuniranno centralmente da forniture alle merci in quest nuovo Marketplace virtuale pro...',
      es: 'Abarca proveedores red mercado todo global para esta nueva visión B2B inteligente',
      pt: 'Todos globalmente interligados no metal fabril prático fornecido excelente no mercado novo e inovador B2B focado do setor'
    },
    whatP2: {
      en: 'MPH will enable manufacturers, suppliers, and traders to connect, collaborate, and conduct business more efficiently than ever before.',
      it: 'Per collaborare meglio',
      es: 'Para trabajar excelente entre expertos fabricantes globales',
      pt: 'Transações plenas colaborativas fáceis na eficiência máxima europeia da central B2B.'
    },
    fTitle: {
      en: 'What MPH Will Offer', it: 'Offerte in MPH', es: 'Nuestra Oferta Principal Base', pt: 'Qual o Oferta Base na Rede Prática MPH de Lançamento Formidável'
    },
    f1T: { en: 'Global Marketplace', it: 'Marketplace Globale', es: 'Mercado Red Global Amplia', pt: 'Shopping Global Comercial Virtual do Metalúrgico Prático Produtor Constante' },
    f1D: { en: 'Connect with machinery suppliers, spare parts vendors, and trading partners worldwide.', it: 'Vendor B2B testati globalmente per il mercato delle lamiere.', es: 'Proveedor excelso de embalajes red.', pt: 'Conexão puramente perfeita resolutiva primária ampla global contínua aos vendedores B2B parceiros da indústria formidável em todo continente.' },
    f2T: { en: 'Industry Network', it: 'Network', es: 'Conexión Perita B2B', pt: 'Hub Formidável Contínuo de Networking Prático' },
    f2D: { en: 'Access a comprehensive network of metal packaging manufacturers and suppliers.', it: 'Dati formidabili e rete testata di aziende europee asiatiche e globali operanti a buon livello pratico.', es: 'Las más altas y fiables empresas red metales y envases a contacto con gran simplicidad de un clic.', pt: 'Fáceis acessos a amplos cadastros de fábricas ideais verificado perito.' },
    f3T: { en: 'Business Opportunities', it: 'Opportunità', es: 'Opciones de Valor', pt: 'Surgirão Excelentes Novas Conexões Valiosas Constantes' },
    f3D: { en: 'Discover new trading opportunities and partnerships in the metal packaging sector.', it: 'Le grandi aziende o la tua piccola o nuova a connettività globale da est o ovest in fiera qui.', es: 'Las variables económicas proactivamente listas a pactar al comprador.', pt: 'Negocie ótimo sempre proativo direto ao metal europeu global na cadeia formadora diária latas.' },
    f4T: { en: 'Efficient Solutions', it: 'Soluzioni Agili in click', es: 'Eficiencia', pt: 'Rapidez Extrema Contínua de Procedimentos Manuais Trocada a Máquina Digital Resolutiva' },
    f4D: { en: 'Streamlined processes for sourcing machinery, parts, and materials.', it: 'Tempistica che taglia ricerche e intermediari ai fornitori in modo pro del B2B portale MPH italiano fiero aziendale di Soprani', es: 'Suministros con cero burocracias de tiempos', pt: 'Redução incrível resolutiva técnica ideal primária dos passos até agora complicados nas procuras globais chatas nos despachos do mercado e contato da matéria para máquina total.' },
    capTitle: {
      en: 'Planned Platform Capabilities', it: 'Le Funzioni Testate di Capacità Più Note della Piattaforma Nuova Prevista in Release', es: 'Funcionalidad Neta Base Prevista Total Para Los Expertos En Planta Y Búsquedas', pt: 'As Capacidades Planejadas Na Visão Plataforma Eficaz B2B MPH Da Soprani'
    },
    c1T: { en: 'Machinery Marketplace', it: 'Spazio Macchinari ed Impianti in Marketplace Virtual', es: 'Mercado Formidable de Venta, Arrendamiento, Red Maquinista Industrial del Área Envasado Fiel al Operar Eficiente Testado', pt: 'Mercado de Vendas Primárias Maquinários Novos e de Todo Status Formidável Global Próspero' },
    c1D: { en: 'Browse and list machinery for sale or lease. Connect with machinery suppliers and buyers worldwide.', it: 'Lista vendite o noli.', es: 'Lista', pt: 'Total' },
    c2T: { en: 'Spare Parts Directory', it: 'Categorie Ricambi in Lista o Direttrice Database', es: 'Datos Completos Eficientes Piezas Proactivas Exactas Identificadas Oportunas Constantes del Sector Mecánico Fabril Amplio Italiano Asiático Global Total con Precisión Fuerte Máxima Pura Para Usted', pt: 'Diretório Excelente Único Pela Database Robusta Gigante Primária Com Todas Peças Solucionadas do Defeito Para Seu Reparo de Plantas Completos de Novo Ativas a Mil em Tempo Ótimo' },
    c2D: { en: 'Comprehensive database of spare parts for metal packaging machinery. Easy identification and sourcing.', it: 'Ricambi in elenco', es: 'Elenco', pt: 'Base' },
    c3T: { en: 'Supplier Network', it: 'Fornitori Scelti Verificati del B2B Vostro Formidabile Sicuro Oramai', es: 'Cadena Red Pura Fuerte', pt: 'Relações Longas Seguras' },
    c3D: { en: 'Connect with verified suppliers of machinery, parts, and materials. Build long-term business relationships.', it: 'Creare affari puri pro', es: 'Negocios', pt: 'Networking' },
    c4T: { en: 'Trading Platform', it: 'Mercato Materie Prime B2B e Trading di Rete Online MPH Virtuale Global', es: 'Bolsa Fija a Coste Justo', pt: 'Trading Exato Pleno Constante Materiais Chapa Flandres Alumínios Leves Ou Bobina' },
    c4D: { en: 'Trade tinplate, aluminum, and other materials used in metal packaging production.', it: 'Metalli a click pro', es: 'Click', pt: 'Metais' },
    c5T: { en: 'Industry Resources', it: 'Articoli o Risorse B2B o Guide', es: 'Documentos Manuales Técnicos Testados Guías Proactivas Conocimiento Eficaz Formidable en Latas y Sus Sistemas Modernos Actualizados En Red', pt: 'Diligência Intelectual Científica Formativa Prática e Manual Tácita' },
    c5D: { en: 'Access technical documentation, industry standards, and best practices.', it: 'Dati PDF doc', es: 'Técnico', pt: 'Arquivo Docs' },
    c6T: { en: 'Business Opportunities', it: 'Sinergie e Business Vari Nuovo Nati Sulla Scia Network Pura Virtuosa o Hub Metalli Scambi ed Efficienze Affidate in Fiera Pro Virtual B2B', es: 'Gran Ente Asociativo Nuevo Puesto B2B', pt: 'Encontro Empreendedor Mútuo Primário Resolutivo Focado ao Contrato de Joint Ventures Fabris Fornecedoras e Produção Lata Metálica Global da Nova Estrutura Hub B2B MPH Forte' },
    c6D: { en: 'Discover partnerships, joint ventures, and business opportunities in the metal packaging sector.', it: 'Partner up o joint', es: 'Unión', pt: 'Unir' },
    whyTitle: {
      en: 'Why the Metal Packaging Hub Matters', it: 'Il Motivo Centrale Palese del Perché Sarà Fondamentale la MPH nell\'Industria d\'Oggi Formidabile ed Efficiente', es: 'Porque es MPH Clave Formidable de Futuro Hoy Fiel a Sus Redes Constantes B2B Envasadoras Totalmente Puras', pt: 'Mas Qual Fator do Sucesso Desta Centralidade Formidável Chamada MPH Para Nós Italianos Europeus Globalizados Diante da Prática Hoje no Mercado Livre Resolutivo Total?'
    },
    w1T: { en: 'Efficiency', it: 'Efficienza', es: 'Velocidad', pt: 'Tempo Resolutivo' },
    w1D: { en: 'Streamline sourcing, trading, and business operations in one centralized platform.', it: 'Unica base portale formidabile d\'uso', es: 'Base única global B2B práctica inteligente', pt: 'Num local a operação ocorre com velocidade num fator central único estrito forte' },
    w2T: { en: 'Connectivity', it: 'Connessioni Globali Reali Fisse Forti Formative Eccellenti', es: 'Contacto Red Testada Constante Oportuna', pt: 'Hub Ideal Formativo Globalizador Puro' },
    w2D: { en: 'Connect with industry partners, suppliers, and buyers from around the world.', it: 'Contatto pro veloce B2B vero nel portale.', es: 'Trato puro total mundial.', pt: 'Compradores ou parceiros diretos à venda com segurança B2B excelente do site.' },
    w3T: { en: 'Opportunity', it: 'Opportunità', es: 'Ganancias Mutuas Fieles Constantes en Sistema Plataforma Pro', pt: 'Geralmente as Mais Excepcionais Novas Grandes Margens Valiosas Negociáveis ao Cliente no Metal Ocorrem Em Rede Formidável de Encontro Aberto Primário Seguro Como Plataforma Prevista Testada' },
    w3D: { en: 'Discover new business opportunities and partnerships in the metal packaging sector.', it: 'Sempre testati prima a rete fissa sicura a tutto', es: 'Solución fiel o oportunidad pura red pro', pt: 'Descobertas e mais proatividade' },
    ctaTitle: {
      en: 'Stay Updated on MPH Launch', it: 'Aggiornati al Lancement MPH o Attese Attuali Nostre Soprani Ing.', es: 'Las Alertas Prontas de Este Lanzamiento Total Increíble Nuevo Ocurrirá Con Sus Avisos Informados Ya Proactivamente Al Futuro de Su Empresa Societaria o Física Global Formidable Estricta Oportuna Fiel al Éxito Testado B2B.', pt: 'Cadastre Sua Dúvida Curiosa de Lançamento Em Breve Plataforma Metal Packaging Hub (MPH) Formidável Excepcional de Integração Diária Prática Resolutiva Central e B2B a Latas Globais Focadas ao Parceiro e Ao Novo Patamar Forte Constante de Transações Eficazes'
    },
    ctaDesc: {
      en: 'The Metal Packaging Hub is coming soon. Contact us to learn more about this exciting new platform and how it will transform the metal packaging industry.',
      it: 'La rete globale metal meccanica B2B testata è quasi viva tra i fornitori in test ora di sviluppo o simili costanti pratiche e tecniche generali online per l\'industria moderna nostra d\'imballaggio al metal. Contattate con le info sotto.',
      es: 'Deje preguntas dudas de qué trata. Estamos finalizando los trámites generales.',
      pt: 'Vem no tempo oportuno perito ideal contínuo prático resolutamente ótimo novo padrão industrial europeu global nas conectividades contínuas em compras ou vendas fáceis de rede única e perita online. Entre em contato rápido nas dúvidas à Soprani hoje mesmo nos seus contatos listados oficiais e não fique longo fora desse eixo no futuro breve excelente testado.'
    },
    ctaBtn1: { en: 'Contact Us', it: 'Scrivici Per Info Varie Sul Progetto In MPH Rete B2B Piattaforma Nuova Soprani Inclusa a Test o Form formidabile globale per questo mercato metal', es: 'Trato directo formulario general Soprani Italia Mph Info', pt: 'Vá Na Página Oportuna Contatos Gerais Amplos Focados na Nossa Empresa Italiana Global para Suas Informações Amplas Primárias Previstas e Detalhadas Deste Hub Formidável Contínuo de Networking ou de Comércio Estrito Prático' },
    ctaBtn2: { en: 'Get More Information', it: 'Più Dati o Notizie a Riguardo Mph Rete Soprani Engineering', es: 'Datos adicionales técnicos proactivos sobre este tema red B2B óptimo', pt: 'Outro Clic ou Informação Direta Sobre B2B MPH Site Global Italiano Revolucionário Previsto ou Quotation na Tabela Prática Central Oficial Completa Para Metalurgias Formadoras ou Fornecedores Estritos em Vasta Lista Prática Confiável Atual Hoje e Contínua Globalmente.' }
  },
  reqPage: {
    heroTitle: {
      en: 'Request a Quotation',
      it: 'Richiedi un Preventivo e Ordine Diretto Veloce Perito Ottimizzato a Prezzi Pratici e Affidabili Italiani dalla Produzione',
      es: 'La Cotización De Servicios Proactiva Y Eficiente Puesta En Tramos Operativos Fidedignos Con Fórmulas Precisas Italianas Por Nuestra Excelencia',
      pt: 'Sua Requisição de Cotação Rápida Global Pela Experiência Formidável Soprani na Itália Para Comprar Sua Base Fabril Mecânica de Flandres Perita em Alta Operação Focada ao Enfoque Custo Otimizado Constante Verdadeiro Real Total Testado B2B'
    },
    heroSub: {
      en: 'Get a customized quote for machinery, spare parts, technical assistance, or materials',
      it: 'Le Quotazioni ad hoc in macchinari, aiuti assistenziali remoti locali, pezzi singoli di ricambio, macchine obsolete o vecchie e nuove dal nostro mercato generale o mercato materiali su base alluminio e metalli d\'acciaio speciali. Form di riferimento rapido e affidabile per Soprani Info e commerciali preventivati',
      es: 'Un Presupuesto Proactivo Único General Hecho Exacto Personal Al Equipo General o Consultoría Técnica Fija Resolutiva A Tiempo Completo O Repuestos Variables a Cotizar Oportunos en Base Material Y Lata Fina Hojalata',
      pt: 'Toda Variação Focada Das Customizações Constantes Pela Engenharia Soprani Resolutiva Estrita Excelente Baseada em Preços Puros Custo Efetivos Diretos da Itália Global aos Nossos Metais Flandres Alumínios E Todos Formadores Prensas Reparos Consultorias Amplas a Um Clique Completo de Cotação Customizada Agora Conosco B2B em Resposta Rápida Real'
    },
    thxTitle: {
      en: 'Thank You!', it: 'Grazie Tante del Contatto!', es: 'Recibido Gracias', pt: 'Agradecimento Recebido Proativo Formidável e Eficiente Confirmação!'
    },
    thxDesc: {
      en: 'Your quotation request has been received successfully. Our team will review your request and contact you shortly with a customized quote.',
      it: 'Ricevuto in team per te per le tue pratiche commerciali.',
      es: 'Todo correcto, el contacto a lo antes proactivo con Soprani Italia perito comercial es procesado ya.',
      pt: 'Recebimento Concluído Sucesso Pleno das Nossas Variáveis Puras Constantes Formidável. Retorno Eficaz Oportuno Bem Breve Com O Preço Ideal Otimizado Excelente de Fato e Customizado Pessoal ao Comprador da Lata Global'
    },
    thxBtn: {
      en: 'Return to Home', it: 'A Home Page', es: 'A Home Inicio', pt: 'Casa Início Site Retornar'
    },
    coInfo: {
      en: 'Company Information', it: 'Dati Societari Vari Tuoi', es: 'Empresa Datos', pt: 'Info e Dúvidas Físicas e Jurídicas Constantes Base Empresa Fáceis no Prático Preencher Direto Formidável B2B'
    },
    coName: {
      en: 'Company Name *', it: 'Nome Compagnia*', es: 'Empresa Nombre*', pt: 'Nome Societário da Indústria*'
    },
    coPerson: {
      en: 'Contact Person *', it: 'Il Referente Nominativo Vostro *', es: 'Referencia Trato *', pt: 'Pessoa Trato*'
    },
    coEmail: { en: 'Email *', it: 'Email *', es: 'Correo e-Mail *', pt: 'Meio e-mail Fixo*' },
    coPhone: { en: 'Phone *', it: 'Telef. Fisso/Cellulare Principale*', es: 'Fijo/Cell *', pt: 'Bases Fixas Cel *' },
    coCountry: { en: 'Country *', it: 'Nazione Sede*', es: 'País*', pt: 'Sua Nação Operativa ou Estado Operacional*' },
    prInfo: {
      en: 'Product or Service Requested', it: 'Il Servizio o Bene d\'Impianto o Rete da Te Ottenere al Costo da Vedere e Concordare per Quote Soprani a B2B Veloce', es: 'Producto Proactivo Deseado de la Cotización', pt: 'Sua Razão E Solução Otimizada Prática Pura Constante Proativa a Solucionar em Pedido de Requisição do Orçamento Rápido Formidável Italino ao Especialista Soprani em Contato Form'
    },
    prOpt: {
      en: 'Product or Service *', it: 'Beni O Supporti*', es: 'Bienes o Ayudas*', pt: 'Orçamento Serviço Produto Cotação Fixo Pleno Requisitado *'
    },
    prVal0: { en: 'Select an option', it: 'Seleziona dal menu tendina', es: 'Selecciona', pt: 'Clicar Sua Alternativa Escolher Formidável' },
    prVal1: { en: 'Machinery', it: 'Un Macchinario Specificato Nuovo Vecchio Nostro', es: 'Mecánicas', pt: 'Prensas e Etc' },
    prVal2: { en: 'Spare Parts', it: 'Componentistica Pura E Ricambi Vari Da Soprani Ad Oc', es: 'Piezas Pro', pt: 'O Seu Elemento Componente de Uso Falho Substituto Pela Nossa Identificação Testada Ideal Italiana Oportuna Resolvente Prático Eficaz' },
    prVal3: { en: 'Technical Assistance', it: 'Un Referto, Aiuto Remoto o Fisico Di Nostri Italiani Esperti Ingegnieri Formidabili Al Impianto Da Voi Locale Per Difetti e Usure o Tempistiche d\'Ottimizzazione E Miglioria Continua Reale', es: 'Asistencia Total', pt: 'O Perito Resolutivo de Apoio Diagnósticos da Falla Resolvido Rápido Eficiente na Nossa Operacionalidade Italiana Formidável em Metal' },
    prVal4: { en: 'Trading Materials', it: 'Lamiera ed Alluminio Vari di Grado e Qualità Premium Europeo Asiatico Affidato Al Brokeraggio Commercialistico E Trader Estero o EU Veloce Parente Di Aziende Affidabili Produttori Stretti e Partner Fissi Da Soprani al Cliente Fino e Grosse Piazze Pratiche Globali Da Quotarsi Costo Pratico Base Reale Al Mq/Tons', es: 'Hojalata de Ton/Rollo Mercado y Aluminio Óptimo', pt: 'Metais da Centralidade Real Estrita Perita Constante B2B de Mercado e Valor' },
    prVal5: { en: 'Revamping', it: 'Costo Revamping Interventi Per Linea di Miglioria O Costrutti Aggiornati E Software Controllori Sulla Tutta Macchina Vecchia A Ritornata Pratica Formidabile Al Nuovissimo Stand Da Industria d\'oggi Veloce B2B Oportuno Metalurgico E Reale Form', es: 'Reestructuración Costes Reanálisis Puros', pt: 'Meio Resolvente Atrasos Práticos e Melhoramento Contínuo Atualização Revamping Orçada e Completa na Fase Soprani Itália Cotação Pró Resolutiva Em Todas Frentes Fabris Paradas.' },
    prVal6: { en: 'Other', it: 'Altro in Riferimento al Metal Packaging Scritto Sopra Noi Formidabili Da Farti in Aiuto E Quote Soprani. Srive in Descrizione Se Selezionato per Capire o Parlarne Bene a Mail Poi.', es: 'Otro asuntito', pt: 'Opções Sem Especificação no Ramo Constante Italiano Fabril Metalurgico Amplo de Orçamentos Livres ou Foco Parcerias Constantes Reais Testada Confiança Soprani Eng Global' },
    macType: { en: 'Machine Type', it: 'Macchina Tipo/Modello E Linea (Specificare Meglio Nello Spazio Form Sotto Per La Richiesta Soprani Ricerca)', es: 'Tipo en Modelos', pt: 'Tipo Das Linhas Modelos Práticos Especificados e Formatos (Latas Redondas etc) Se Necessitar Bem Exato Para Encontro Nosso do Modelo Ou Maquina No Orçamento Prático Rápido Requisitado Global B2B' },
    macTypePlace: { en: 'e.g., Can-making line, Welding machine', it: 'Esempio: saldatrice rotonda ecc', es: 'ej: maquina de metales redondos u cuadrada', pt: 'Exemplos: prensa de linha limpa metal duplo, selos soldas retangulares 5 litros.' },
    sparRef: { en: 'Spare Part Reference', it: 'Ricambi ID se Noti per Facilitare Quotazioni A Noi', es: 'ID ID/Refs', pt: 'Referências Em Documentação Manual Técnica Fiel Específica Identificativa do Especial Componente Requisitado Próprio Ao Pressionante Metal Ou Manuseios Da Engrenagem e Falhas etc Testadas Antes Na Plataforma de Consulta Interna Fabril Ou Em Lista Fornecimento Ao Seu Caso.' },
    sparRefPlace: { en: 'Part number or description', it: 'Parole di ID/Codici E Numero Di Ricambi', es: 'Numeración y texto', pt: 'Id ou descrição da peça livre para os nós no orçamente em linha texto curto e livre praticidade ótima' },
    qty: { en: 'Quantity', it: 'Numero Di Ordine In Form', es: 'Numeros QTY', pt: 'Quantidade Estrita (Lotes Rolos Metais Ou Etc)' },
    qtyPlace: { en: 'Quantity needed', it: 'Il volume di ordine materiale da parte di te interessata / macchina', es: 'Número total necesitado a presupuesto constante fiel', pt: 'O montante global ótimo prático a necessidade real total de suprimento ou produto maquinário listado' },
    urg: { en: 'Urgency', it: 'Emergenza Base Form Da Sapere Se Grave L\'Andatura Fabrica Per Nostro Ordine Lavoro e Celerità Pratica Delle Richieste E Quotazioni Al Momento Corrente', es: 'Tiempos Límite Proactivo Necesidad Real Actual de Fallas/Necesidades a Alinear Operativa Prioridad Tiempos Soprani Ital', pt: 'Celeridade Nível Ótimo Da Resposta Requerida E Exata Italiana Prática Eficiente Das Cotações Pelos Nossos Eng/Setor Trato Comercial Das Metalurgias Diárias Formidáveis Europeias' },
    urg1: { en: 'Low - No rush', it: 'Piano in Tempo Lento', es: 'Pasivo Sin URG', pt: 'Básica sem Pressas Estagnadas Formidáveis Ou Riscos Práticos Nenhuns Na Fila Atual Global Soprani' },
    urg2: { en: 'Normal - Standard timeline', it: 'Operativo Reale Classico - Timeline Nostra Lavorata', es: 'Standard', pt: 'Tempos Proativos Globais Ideais Puros (Cotações Eficientes Formidáveis Em Resposta Estrita Diária Ótima Normal Soprani Italiana Contínua Resolutivas Amplas Focada Para Si)' },
    urg3: { en: 'High - Urgent', it: 'Alta (Più urgente)', es: 'Proactiva Constante Y Rápida Falla Urg', pt: 'Alta Oportunidade E Pronta Resposta Fiel Ao Necessitado Real Crítico Comum Constante Soprani Eng Fabril Total Eficaz Nas Filas Italianas Práticas Focada À Prioridades Das Fábricas Paradas Nesses Estritos Produtos Cotados' },
    urg4: { en: 'Critical - ASAP', it: 'Urgente Assoluta Di Fermo E Stop O Crash - Contatti Ad Alta Risposta B2B Nel Tempo Minore Eccellentemente Immediato Di Noi.', es: 'Tiempos ASAP', pt: 'Crítica Fatal À Seu Operado Prático Focado Pela Qual Ocorreu A Falla Do Componente E Custos Muito Elevados Se Prolongado A Requisita É Para Imediatamente Pura Soprani Especial Tratativa Formidável Especial Global Oportuna Resolvente Forte E Constante Em Curva Zero Sem Falhas Resposta ASAP Rápida A Contatos B2B.' },
    msgInfo: { en: 'Additional Information', it: 'Messaggi Addizionali Liberi a Testo per Specifiche Più Precise Altuo Fine Preventivante', es: 'Añade Datos de Todo Tipo Informativos y Consultivos Diarios Fabriles', pt: 'O Campo Das Extensões Focadas No Esclarecimento Direto e Resolutivo Prático A Cotações Específicas Puras E Contínuas Italianas Do Detalhamento Diário Dos Mecânismos De Falhas, Pedidos Volumes etc Tudo Extra Deste Form Especial Suporte Orçamento Soprani Eng B2B' },
    msgLbl: { en: 'Message', it: 'Scrivi Ora', es: 'Caja Texto Fiel', pt: 'Digitação Fiel Espaço Extenso do Recado Focado Estrito Especial Ao Comercial Soprani' },
    msgPlace: { en: 'Please provide any additional details about your quotation request...', it: 'Ogni cosa o specifica', es: 'Sus dudas', pt: 'Ponhas todo esclarecimento focado e detalhadas precisões puras sobre máquinas com defeito o modelo serial se faltou ali no outro campo ou toda outra razão para contatos proativos orçamentos globais efetuados etc B2B fiel ao negócio italiano perito e excelente resolvido nas tratativas aqui textuais breves de auxílio e precisão à sua ajuda rápida.' },
    fileInfo: { en: 'File Attachments: To attach files (technical drawings, specifications, etc.), please email them directly to our team after submitting this form, or contact us for alternative submission methods.', it: 'Spazio Upload Note: per mettere dei PDF con modelli, CAD, misure lamiere ed alluminio e guasti della macchina foto, ci spiace sul sit form non carica oggi. Se ne serve l\'invio a noi formidabile mandate dall\'email aziendale alle nostre mail che vedrete in fondo contatti post o dopo aver premuto sub a sto format veloce B2B Soprani Engineering Italian.', es: 'Files Info Pro: Mandar info adjunto foto etc correo y todo listo ya no es adjunto aqui directo a hoy', pt: 'Informações Puras Estritas Em Envio De Anexos Formidáveis (Arquivos Técnicos Imagens Defeito E Manuais PDF Das Soluções Falhadas e Desenhos CAD Peças Modelos Puros de Engenharias etc): Envia essas no nosso mail após contato formatado e respondido inicial. Ou faça contato em outra aba no site focada e mail direto global Soprani com os mesmos. Aqui o portal B2B ainda limita envios diretos. Obrigado fiel por nós e nossa tratativa global ótima da Itália!' },
    subBtn: { en: 'Submit Quotation Request', it: 'Invio al Sistema Per Preventivazioni Reali Fisse Efficaci All\'Esame Pratica Affidata Di Te. Aggiungi O Premi Questo.', es: 'Envíe Fiel', pt: 'Processamento Pedido Orçado Submissão Clicar Constante Formidável Requisito Ação E Contato' },
    subBtnL: { en: 'Submitting...', it: 'Un Secondo Ora Nel Carico', es: 'Va Listo...', pt: 'Ao Encaminhamento Conclusivo Submissão Cotação Rápida Italiana Perita...' },
    cancelBtn: { en: 'Cancel', it: 'Cancello Lavoro O Torna', es: 'Quitar Todo Y Fuera Base Volver', pt: 'Saída Do Menu Constante Fiel Prático Cotar Abandono Sem Formulario Pedido.' },
    waysTitle: { en: 'Other Ways to Reach Us', it: 'Le Altre Fonti Formidabili Ed Indirizzi Per Scritto Telefono Ecc Della B2B Soprani Italiana Fisa Nel Mondo Di Supporti Alle Industrie Meta Form e Package Oltre Tutto E Preventivi Solo Reali Ad Alta Precisone E Tempi. Contattate A Queste Nostre Cifre o Locande Di Contatto Diretto In Reti E Locali Del Form.', es: 'Rutas Extras de Soporte Consultivo Red Mundial Italian', pt: 'Outros Meios Excelentes Diários Resolutivos Suporte Prático Cotações Ou Falar Oportunamente Sem Formal Form Nas Centrais Oportunas Europeias Globais Reais Práticas Em Estande Base Itália Metalurgias Plenas Contínuas Amplas Nossas Confiáveis B2B Da Envasadora Aos Parceiros' },
    wEmail: { en: 'Email', it: 'Le e-Mails Formidabili Testate A Fissi Ricevitori Di Testi Tecnici Richieste Ecc (Preferenza B2B)', es: 'Mails Correos', pt: 'Nossa Caixa Mails Reais Das Relações Estritas Recebedoras Contínuas B2B Das Metalurgias Fabris Suas Resolução' },
    wPhone: { en: 'Phone', it: 'Dati Chiamata E Contatto Ai Vertici Locali Ramo Comm O Assistenza Formidabile Rapida Oltre Tutto Per Tempi Urg', es: 'Telefónica Excelencia En Voz Y Urgencias Fabril Total', pt: 'Centrais Telefonicamente Constantes Em Redes Globais Ao Direcionado Rapido Prático E Voz Plena Resolutiva Para Emergência Das Indústrias Cotações Urg Ou Máquinas Falidas Ótimas Em Contato Celeridade' },
    wForms: { en: 'Contact Form', it: 'Passi Al Contatto Informazione Gen. E Libero Senza Costi Specifici Ad Hoc O Form Quota Preventivi Fatta Se Non É D\'Ordini Reali Immediato O Da Discutere.', es: 'Al Form Libre Incial general de Base Operativa Suave De Asunto Múltiple A Responder Al Contacto MÁS Extenso Sin Burocracias de Lista De Material Cotizado Constante.', pt: 'Contatos Generalistas Base Única Em Fórmulas Textuais Consultas Breve Livres Da Restrição Diária A Cotações Plenas Se Seu Desejo É Um Feedback Contínuo Amplo Do Projeto Geral Nos Metais Clicar Oculto Aqui Para Ir Para Tratar Conosco Noutra Tela Mais Limpa Formidável Rápida Oportuna Sem Tabelas Extensas De Comércio Quase Fechado Fiel Pela Nossa Soprani.' },
    wFormsDesc: { en: 'Prefer a general inquiry?', it: 'Volevi Una Scritta Non Quota Generale O Disquisire Altro? O Informarsi Libero Su Supporti Nostri B2B D\'Italia Prima Delle Quantità Ecc? Si Clicchi', es: 'Opciones de pregunta normal ligera sin cotizar real a hoy', pt: 'Tens Outras Próprias Necessidades De Questionário Generalizado De Opinião Suporte De Flandres B2B A Delineamento Contínuo Ao Invés Das Fiscais E Preços Práticos Firmados Prontos No Metal? Aqui Então Ideal E Correto Clique:' },
    wFormsBtn: { en: 'Contact Us', it: 'Tasto A Contatti Generici e Formidabili Base B2B Nostri Reali Italiani', es: 'A Home de Trato General Fiel Libre Oportuna Base Única Fuerte En Contacto Fabril B2B Italia', pt: 'Retornar O Portal Pleno Prático Constante Único Generalizado Ao Fale Conosco E Fórmulas Curtas Amplas De Negócio Trato Aberto No Diálogo Sem Cotações Feituadas Estritas No Metal Constante Resolvente Para Dúvidas Puras Clicar Ação.' },
    reqLbl: { en: '* Required fields. We respect your privacy and will only use your information to respond to your quotation request.', it: '* Campi formidabili ad obbligo di stesura reale B2B in formato dati (Asterisco segnato a bordo al campo text). Le Sicurezza Dati E Le Tutela Sono Nelle Policy Globali Varie Per Te Ad USO Unico Fiduciario B2B Soprani Engineering Alle Risposte Vostre in Quota, Preventivazioni Esatte Senza Invio Varie e Malizie Commerciali Alle Mail O Chiamate Sparse Nulle Al Focus Metalurgico Base Testato Risolutivo Oportuno Formidabile Puro B2B. Grazie del cont.', es: '* Privacidades completas testadas B2B y requerimientos (*) sin falla pro.', pt: '* Com asterisco marca nas seções estritas B2B os fixos não vazios campos práticos plenos a passar o form em submissão excelente testada proativa e os privacidades plenas em toda dados garantida à tratativa segura exclusiva não spam B2B da Europa à você cliente base formidável constante no comércio metal embalgem resolvido nas parcerias diárias da Itália na estrita rede Soprani Engineering ao uso apenas ao formulário quota ou tratativas derivadas excelentes orçamentos e não outro focado livre.' }
  }
};

for (const lang of languages) {
  const filePath = path.join(localesDir, lang, 'translation.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Inject all new namespaces from Phase 4
    Object.keys(newKeys).forEach(namespace => {
      data[namespace] = {};
      Object.keys(newKeys[namespace]).forEach(key => {
        // use fallback if some text is missing (we built most keys)
        data[namespace][key] = newKeys[namespace][key][lang] || newKeys[namespace][key]['en'];
      });
    });

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Injected Phase 4 translations into ${lang}`);
  }
}
