import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// ─────────────────────────────────────────────────────────────────
// 🔍 SEO metadata map — title & description per route × language
// ─────────────────────────────────────────────────────────────────

type Lang = 'en' | 'pt' | 'it' | 'es';

interface SEOMeta {
  title: string;
  description: string;
}

type SEOMap = Record<string, Record<Lang, SEOMeta>>;

const SEO_MAP: SEOMap = {
  '/': {
    en: {
      title: 'Soprani Engineering | Industrial Metal Packaging Machinery & Solutions',
      description:
        'Global leader in used machinery, spare parts, technical assistance and metal trading for the can-making and metal packaging industry. Serving Europe, MENA, Asia & Americas.',
    },
    pt: {
      title: 'Soprani Engineering | Maquinário e Soluções para Embalagem Metálica',
      description:
        'Líder global em maquinário usado, peças de reposição, assistência técnica e trading de metais para a indústria de embalagem metálica.',
    },
    it: {
      title: 'Soprani Engineering | Macchinari e Soluzioni per Imballaggi Metallici',
      description:
        'Leader globale in macchinari usati, ricambi, assistenza tecnica e trading di metalli per il settore degli imballaggi metallici industriali.',
    },
    es: {
      title: 'Soprani Engineering | Maquinaria y Soluciones para Envases Metálicos',
      description:
        'Líder global en maquinaria usada, repuestos, asistencia técnica y trading de metales para la industria del envase metálico.',
    },
  },
  '/services': {
    en: {
      title: 'Technical Services | Machinery, Spare Parts & Revamping – Soprani Engineering',
      description:
        'Comprehensive industrial services: sourcing of can-making machinery, critical spare parts supply, on-site technical assistance, line revamping and metal trading.',
    },
    pt: {
      title: 'Serviços Técnicos | Máquinas, Peças e Revamping – Soprani Engineering',
      description:
        'Serviços industriais completos: sourcing de maquinário, peças de reposição críticas, assistência técnica, revamping de linhas e trading de metais.',
    },
    it: {
      title: 'Servizi Tecnici | Macchinari, Ricambi e Revamping – Soprani Engineering',
      description:
        'Servizi industriali completi: approvvigionamento macchinari, fornitura ricambi critici, assistenza tecnica in loco, revamping linee e trading metalli.',
    },
    es: {
      title: 'Servicios Técnicos | Maquinaria, Repuestos y Revamping – Soprani Engineering',
      description:
        'Servicios industriales completos: aprovisionamiento de maquinaria, repuestos críticos, asistencia técnica, revamping de líneas y trading de metales.',
    },
  },
  '/machinery': {
    en: {
      title: 'Industrial Metal Packaging Machinery | Used Can-Making Lines – Soprani',
      description:
        'Buy and sell used industrial machinery for metal packaging: can-making lines, welding systems, presses, decorating equipment and more from Soprani Engineering.',
    },
    pt: {
      title: 'Maquinário Industrial para Embalagem Metálica | Linhas Usadas – Soprani',
      description:
        'Compra e venda de maquinário industrial usado: linhas de fabricação de latas, sistemas de solda, prensas, equipamentos de decoração e mais.',
    },
    it: {
      title: 'Macchinari Industriali per Imballaggi Metallici | Linee Usate – Soprani',
      description:
        'Compravendita di macchinari industriali usati: linee per lattine, sistemi di saldatura, presse, attrezzature per stampa e decorazione.',
    },
    es: {
      title: 'Maquinaria Industrial para Envases Metálicos | Líneas Usadas – Soprani',
      description:
        'Compra y venta de maquinaria industrial usada: líneas de fabricación de latas, sistemas de soldadura, prensas, equipos de decoración y más.',
    },
  },
  '/spare-parts': {
    en: {
      title: 'Spare Parts for Can-Making Machinery | OEM & Obsolete Parts – Soprani',
      description:
        'Fast global supply of critical spare parts for all major OEM brands. Specializing in hard-to-find, obsolete and high-precision components for metal packaging machinery.',
    },
    pt: {
      title: 'Peças de Reposição para Máquinas de Lata | OEM e Obsoletas – Soprani',
      description:
        'Fornecimento global ágil de peças críticas para todas as principais marcas OEM. Especialistas em componentes difíceis de encontrar, obsoletos e de alta precisão.',
    },
    it: {
      title: 'Ricambi per Macchinari per Lattine | OEM e Obsoleti – Soprani Engineering',
      description:
        'Fornitura globale rapida di ricambi critici per le principali marche OEM. Specialisti in componenti introvabili, obsoleti e ad alta precisione.',
    },
    es: {
      title: 'Repuestos para Maquinaria de Latas | OEM y Obsoletos – Soprani Engineering',
      description:
        'Suministro global rápido de repuestos críticos para las principales marcas OEM. Especialistas en componentes difíciles de encontrar, obsoletos y de alta precisión.',
    },
  },
  '/technical-assistance': {
    en: {
      title: 'Technical Assistance & Field Engineering | On-Site Support – Soprani',
      description:
        'Expert technical assistance for metal packaging production lines. Machine audits, corrective maintenance, line revamping and performance optimization worldwide.',
    },
    pt: {
      title: 'Assistência Técnica e Engenharia de Campo | Suporte In-Loco – Soprani',
      description:
        'Assistência técnica especializada para linhas de produção de embalagem metálica. Auditorias, manutenção corretiva, revamping e otimização de performance.',
    },
    it: {
      title: 'Assistenza Tecnica e Field Engineering | Supporto in Loco – Soprani',
      description:
        'Assistenza tecnica especializzata per linee di produzione di imballaggi metallici. Audit, manutenzione correttiva, revamping e ottimizzazione delle performance.',
    },
    es: {
      title: 'Asistencia Técnica e Ingeniería de Campo | Soporte In-Situ – Soprani',
      description:
        'Asistencia técnica especializada para líneas de producción de envases metálicos. Auditorías, mantenimiento correctivo, revamping y optimización de rendimiento.',
    },
  },
  '/industries': {
    en: {
      title: 'Metal Packaging Industries | Food, Beverage & Industrial Cans – Soprani',
      description:
        'Soprani Engineering serves food packaging, tomato cans, tuna cans, beverage cans, industrial containers, closures, and decorated metal packaging worldwide.',
    },
    pt: {
      title: 'Indústrias de Embalagem Metálica | Alimentos, Bebidas e Industriais – Soprani',
      description:
        'A Soprani Engineering atende embalagem alimentar, latas de tomate, latas de atum, latas de bebida, recipientes industriais, tampas e embalagem decorada.',
    },
    it: {
      title: 'Settori Imballaggi Metallici | Alimentare, Bevande & Industriale – Soprani',
      description:
        'Soprani Engineering serve imballaggi alimentari, lattine di pomodoro, tonno, bibite, contenitori industriali, chiusure e imballaggi decorati.',
    },
    es: {
      title: 'Industrias de Envase Metálico | Alimentación, Bebidas e Industrial – Soprani',
      description:
        'Soprani Engineering sirve envases alimentarios, latas de tomate, atún, bebidas, contenedores industriales, cierres y envases decorados.',
    },
  },
  '/products': {
    en: {
      title: 'Industrial Can-Making Systems & Product Solutions – Soprani Engineering',
      description:
        'High-performance can-making machinery systems: SP-3000 food can lines, AeroTech welding, PowerPress EOE-500, and more from Soprani Engineering.',
    },
    pt: {
      title: 'Sistemas Industriais de Fabricação de Latas & Soluções – Soprani Engineering',
      description:
        'Sistemas de alta performance para fabricação de latas: linhas de alimento SP-3000, solda AeroTech, PowerPress EOE-500 e mais.',
    },
    it: {
      title: 'Sistemi Industriali per Lattine & Soluzioni Prodotto – Soprani Engineering',
      description:
        'Sistemi ad alte prestazioni per la produzione di lattine: linee alimentari SP-3000, saldatura AeroTech, PowerPress EOE-500 e altro ancora.',
    },
    es: {
      title: 'Sistemas Industriales de Fabricación de Latas & Soluciones – Soprani',
      description:
        'Sistemas de alto rendimiento para fabricación de latas: líneas de alimentos SP-3000, soldadura AeroTech, PowerPress EOE-500 y más.',
    },
  },
  '/company': {
    en: {
      title: 'About Soprani Engineering | 40 Years of Metal Packaging Expertise',
      description:
        'Soprani Engineering: founded in Milan in 1984, specialized in industrial metal packaging machinery, spare parts and technical support globally. Authorized Soudronic & Koenig+Bauer partner.',
    },
    pt: {
      title: 'Sobre a Soprani Engineering | 40 Anos de Expertise em Embalagem Metálica',
      description:
        'Soprani Engineering: fundada em Milão em 1984, especializada em maquinário industrial para embalagem metálica, peças e suporte técnico global.',
    },
    it: {
      title: 'Chi Siamo | Soprani Engineering – 40 Anni di Esperienza',
      description:
        'Soprani Engineering: fondata a Milano nel 1984, specializzata in macchinari per imballaggi metallici, ricambi e supporto tecnico globale.',
    },
    es: {
      title: 'Sobre Soprani Engineering | 40 Años de Experiencia en Envases Metálicos',
      description:
        'Soprani Engineering: fundada en Milán en 1984, especializada en maquinaria para envases metálicos, repuestos y soporte técnico global.',
    },
  },
  '/contact': {
    en: {
      title: 'Contact Soprani Engineering | Industrial Machinery Support',
      description:
        'Contact Soprani Engineering for machinery, spare parts, technical assistance and metal trading. Serving clients in Europe, MENA, Asia and the Americas.',
    },
    pt: {
      title: 'Contato Soprani Engineering | Suporte em Maquinário Industrial',
      description:
        'Entre em contato com a Soprani Engineering para maquinário, peças de reposição, assistência técnica e trading de metais.',
    },
    it: {
      title: 'Contatti Soprani Engineering | Supporto Macchinari Industriali',
      description:
        'Contatta Soprani Engineering per macchinari, ricambi, assistenza tecnica e trading metalli in Europa, MENA, Asia e Americhe.',
    },
    es: {
      title: 'Contacto Soprani Engineering | Soporte en Maquinaria Industrial',
      description:
        'Contacta a Soprani Engineering para maquinaria, repuestos, asistencia técnica y trading de metales.',
    },
  },
  '/request-quotation': {
    en: {
      title: 'Request a Technical Quotation | Machinery & Spare Parts – Soprani',
      description:
        'Request a customized technical quotation for can-making machinery, spare parts, technical assistance or metal trading from Soprani Engineering.',
    },
    pt: {
      title: 'Solicitar Cotação Técnica | Máquinas e Peças – Soprani Engineering',
      description:
        'Solicite uma cotação técnica personalizada para maquinário, peças de reposição, assistência técnica ou trading de metais.',
    },
    it: {
      title: 'Richiedi Preventivo Tecnico | Macchinari e Ricambi – Soprani Engineering',
      description:
        'Richiedi un preventivo tecnico su misura per macchinari, ricambi, assistenza tecnica o trading metalli da Soprani Engineering.',
    },
    es: {
      title: 'Solicitar Cotización Técnica | Maquinaria y Repuestos – Soprani Engineering',
      description:
        'Solicita una cotización técnica personalizada para maquinaria, repuestos, asistencia técnica o trading de metales.',
    },
  },
  '/news': {
    en: {
      title: 'Industry News & Updates | Metal Packaging Insights – Soprani Engineering',
      description:
        'Stay informed with the latest news, trade fair events and technical insights from the global metal packaging and can-making industry.',
    },
    pt: {
      title: 'Notícias da Indústria | Insights sobre Embalagem Metálica – Soprani',
      description:
        'Fique por dentro das últimas notícias, feiras e insights técnicos da indústria global de embalagem metálica e fabricação de latas.',
    },
    it: {
      title: 'Notizie del Settore | Aggiornamenti Imballaggi Metallici – Soprani',
      description:
        'Rimani aggiornato con le ultime notizie, fiere ed insight tecnici dal settore globale degli imballaggi metallici.',
    },
    es: {
      title: 'Noticias del Sector | Insights sobre Envases Metálicos – Soprani',
      description:
        'Mantente informado con las últimas noticias, ferias e insights técnicos del sector global de envases metálicos.',
    },
  },
};

// ─────────────────────────────────────────────────────────────────
// 🔍 useSEO HOOK
// ─────────────────────────────────────────────────────────────────
export function useSEO(pathname: string) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split('-')[0] as Lang) || 'en';

  useEffect(() => {
    const route = SEO_MAP[pathname] ?? SEO_MAP['/'];
    const meta = route[lang] ?? route['en'];

    // Update <title>
    document.title = meta.title;

    // Update <meta name="description">
    let descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }

    // Update <meta property="og:title">
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    // Update <meta property="og:description">
    let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    // Update <html lang="">
    document.documentElement.setAttribute('lang', lang);
  }, [pathname, lang]);
}

export type { SEOMeta, Lang };
