$path = "c:\SITE SOPRANI\SOPRANI\src\components\pages\ServicesPage.tsx"
$content = Get-Content $path -Raw

$tabletComponent = @"
// 💎💎 TABLET CARD (md to xl) 💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎💎
const ServiceTabletCard = ({ service, t }: { service: Service; t: (k: string) => string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,31,95,0.06)] border border-slate-100 flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#001F5F' }}>
          <Icon size={20} className="text-white" />
        </div>
        <span className="text-4xl font-heading font-black opacity-[0.05]" style={{ color: '#001F5F' }}>{service.number}</span>
      </div>
      <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent mb-2">{service.tag}</span>
      <h3 className="text-xl font-heading font-black text-[#001F5F] mb-4 leading-tight">{t(service.titleKey)}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{t(service.descKey)}</p>
      <ul className="space-y-3 mb-8">
        {service.bullets.slice(0, 3).map((bKey, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check size={12} className="text-accent mt-1 shrink-0" />
            <span className="text-[13px] text-slate-600 font-medium">{t(bKey)}</span>
          </li>
        ))}
      </ul>
      <Link to="/request-quotation" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent group">
        Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

"@

# Replace the messy PAGE comment and add the tablet component before the main export
$content = $content -replace "(?s)// .*? PAGE .*?\r?\nexport default function ServicesPage", ($tabletComponent + "`r`nexport default function ServicesPage")

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
