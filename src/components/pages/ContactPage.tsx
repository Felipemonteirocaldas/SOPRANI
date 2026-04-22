import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe, ShieldCheck, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const HubCard = ({ region, locations, delay }: { region: string, locations: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-none hover:bg-white/10 transition-all duration-300 group"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-none bg-accent/20 flex items-center justify-center border border-accent/20">
        <Globe size={16} className="text-accent group-hover:rotate-12 transition-transform" />
      </div>
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white text-left">{region}</h3>
    </div>
    <p className="text-xs text-blue-200 font-medium leading-relaxed uppercase tracking-wider text-left">{locations}</p>
  </motion.div>
);

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [italyTime, setItalyTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Rome',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setItalyTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setFormData({
      name: '', company: '', country: '', email: '', phone: '', subject: '', message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background font-paragraph selection:bg-accent selection:text-white">
      <main className="flex-grow">
        {/* Hero — compact no mobile, espaçoso no desktop */}
        <section className="relative pt-36 sm:pt-44 md:pt-52 pb-28 md:pb-56 bg-[#001F5F] overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent opacity-5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600 opacity-5 blur-[120px] rounded-full" />

            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-4xl text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Industrial Tag */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-px bg-accent" />
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
                    Global Interaction Hub
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-6 tracking-tighter leading-[0.95]">
                  {t('contactPage.heroTitle')}
                </h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed font-bold">
                  {t('contactPage.heroSub')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main contact block — overlap na seção seguinte */}
        <section className="relative -mt-16 md:-mt-40 pb-20 sm:pb-28 md:pb-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-2xl overflow-hidden bg-white">

              {/* ─── Painel de Informações (Dark) ─── */}
              <div className="lg:col-span-4 bg-[#001F5F] relative">
                <div className="relative z-10 flex flex-col h-full text-left p-5 sm:p-8 md:p-10 lg:p-12">

                  {/* HQ Status + Clock */}
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4">
                      Soprani HQ Status
                    </h2>

                    {/* Relógio — menor no mobile */}
                    <div className="flex flex-col mb-5 sm:mb-7">
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-widest tabular-nums flex flex-wrap items-end gap-2 leading-none">
                        {italyTime}
                        <span className="text-[9px] uppercase text-blue-300 pb-1">CET (Italy)</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-none h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">
                          Technical Desk: Online &amp; Active
                        </span>
                      </div>
                    </div>

                    {/* Métodos de contato */}
                    <div className="space-y-5 sm:space-y-7 pt-5 border-t border-white/10">
                      <ContactMethod
                        icon={Mail}
                        label={t('contactPage.email')}
                        value="info@sopraniengineering.com"
                        action="mailto:info@sopraniengineering.com"
                      />
                      <ContactMethod
                        icon={Phone}
                        label={t('contactPage.phone')}
                        value="+39 348 071 2116"
                        action="tel:+393480712116"
                      />
                      <ContactMethod
                        icon={MapPin}
                        label={t('contactPage.presence')}
                        value="Europe · Asia · Americas · MENA"
                      />
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <div className="mt-auto pt-5 sm:pt-7">
                    <a
                      href="https://wa.me/393480712116"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block overflow-hidden border border-white/10 hover:border-[#25D366]/50 transition-all duration-500"
                      style={{ background: 'linear-gradient(135deg, rgba(37,211,102,0.07) 0%, rgba(37,211,102,0.02) 100%)' }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{ background: 'linear-gradient(135deg, rgba(37,211,102,0.1) 0%, transparent 60%)' }} />

                      <div className="relative flex items-center gap-4 px-5 py-4">
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/20 group-hover:shadow-[#25D366]/40 transition-shadow duration-500">
                            <MessageCircle size={18} className="text-white" />
                          </div>
                          <span className="absolute -top-0.5 -right-0.5 w-3 h-3">
                            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60" />
                            <span className="relative block w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#001F5F]" />
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#25D366]">● Online</span>
                          </div>
                          <p className="text-sm font-black text-white uppercase tracking-widest leading-none">
                            {t('contactPage.whatsappTitle')}
                          </p>
                        </div>

                        <svg className="flex-shrink-0 text-white/20 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* ─── Painel do Formulário (Light) ─── */}
              <div className="lg:col-span-8 bg-white p-5 sm:p-8 md:p-10 lg:p-12">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-16 sm:py-20"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 text-green-600 rounded-none flex items-center justify-center mb-6 sm:mb-8">
                        <ShieldCheck size={36} />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-heading font-black text-primary mb-3 uppercase tracking-tighter">
                        {t('contactPage.thxTitle')}
                      </h2>
                      <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed mb-8 sm:mb-10">
                        {t('contactPage.thxDesc')}
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-8 sm:px-10 py-4 bg-[#001F5F] text-white text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
                      >
                        New Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                      {/* Cabeçalho do formulário */}
                      <div className="mb-6 sm:mb-8 text-left">
                        <h2 className="text-xl sm:text-2xl font-heading font-black text-primary mb-3 uppercase tracking-tighter">
                          {t('contactPage.msgTitle')}
                        </h2>
                        <div className="h-1 w-10 bg-accent" />
                      </div>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                        {/* Linha 1: Nome + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <CustomInput
                            label={t('contactPage.formName')}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder={t('contactPage.formPlaceN')}
                            icon={CheckCircle2}
                          />
                          <CustomInput
                            label={t('contactPage.email')}
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            icon={Mail}
                          />
                        </div>

                        {/* Linha 2: Empresa + País */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <CustomInput
                            label={t('contactPage.formCompany')}
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder={t('contactPage.formPlaceC')}
                            icon={Building2}
                          />
                          <CustomInput
                            label={t('contactPage.formCountry')}
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Select your country"
                            icon={Globe}
                          />
                        </div>

                        {/* Linha 3: Telefone + Assunto */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <CustomInput
                            label={t('contactPage.phone')}
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+00 000 000"
                            icon={Phone}
                          />
                          <div className="space-y-1.5 flex flex-col">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
                              {t('contactPage.formSubject')}
                            </label>
                            <div className="relative group">
                              <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full h-[48px] px-4 bg-gray-50 border-b-2 border-transparent focus:border-accent text-sm font-medium focus:outline-none transition-all appearance-none cursor-pointer"
                              >
                                <option value="">{t('contactPage.subSelect')}</option>
                                <option value="machinery">{t('contactPage.sub1')}</option>
                                <option value="spare-parts">{t('contactPage.sub2')}</option>
                                <option value="technical">{t('contactPage.sub3')}</option>
                                <option value="trading">{t('contactPage.sub4')}</option>
                                <option value="partnership">{t('contactPage.sub6')}</option>
                                <option value="general">{t('contactPage.sub5')}</option>
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <ChevronDown size={14} />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mensagem */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
                            {t('contactPage.formMsg')}
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full p-4 bg-gray-50 border-b-2 border-transparent focus:border-accent text-sm font-medium focus:outline-none transition-all resize-none min-h-[150px]"
                            placeholder={t('contactPage.formPlaceP')}
                          />
                        </div>

                        {/* Botão de envio */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 sm:py-5 bg-accent text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-opacity-95 transition-all duration-300 disabled:opacity-30 group flex items-center justify-center gap-3 mt-1"
                        >
                          {isSubmitting ? t('contactPage.formSending') : (
                            <>
                              {t('contactPage.formSend')}
                              <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Global Hubs */}
        <section className="py-16 sm:py-24 bg-[#001F5F] overflow-hidden">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 mb-10 md:mb-20">
              <div className="max-w-xl text-left">
                <span className="text-xs font-bold text-accent uppercase tracking-[0.3em] block mb-4">Network Connectivity</span>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-6">
                  SOPRANI Global Service Hubs
                </h2>
                <div className="h-1 w-24 bg-accent" />
              </div>
              <p className="text-blue-200 text-sm font-medium leading-relaxed max-w-sm md:text-right text-left">
                Our specialized decentralized support ensures that machinery and materials are handled with local expertise across major industrial regions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <HubCard region="Europe" locations="Italy · Germany · Poland · UK" delay={0.1} />
              <HubCard region="Americas" locations="USA · Brazil · Mexico · Canada" delay={0.2} />
              <HubCard region="MENA" locations="UAE · Saudi Arabia · Egypt · Turkey" delay={0.3} />
              <HubCard region="Asia Pacific" locations="China · India · Vietnam · Australia" delay={0.4} />
            </div>
          </div>
        </section>

        {/* Priority Channels */}
        <section className="py-16 sm:py-24 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl font-heading font-black text-primary mb-10 sm:mb-16 uppercase tracking-widest tracking-tighter">
              Priority Channels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              <RapidLink
                title={t('contactPage.reqQuote')}
                desc={t('contactPage.reqQuoteSub')}
                btn={t('contactPage.reqQuoteBtn')}
                to="/request-quotation"
              />
              <RapidLink
                title={t('contactPage.aboutUs')}
                desc={t('contactPage.aboutSub')}
                btn={t('contactPage.aboutBtn')}
                to="/about"
              />
              <RapidLink
                title={t('contactPage.latestNews')}
                desc={t('contactPage.latestNewsSub')}
                btn={t('contactPage.latestNewsBtn')}
                to="/news"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const ContactMethod = ({ icon: Icon, label, value, action }: { icon: any, label: string, value: string, action?: string }) => (
  <div className="flex items-center gap-4 group text-left">
    <div className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500 flex-shrink-0">
      <Icon size={16} />
    </div>
    <div className="flex flex-col min-w-0">
      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-0.5">{label}</span>
      {action ? (
        <a href={action} className="text-xs font-black text-white hover:text-accent transition-colors tracking-wider uppercase truncate">
          {value}
        </a>
      ) : (
        <span className="text-xs font-black text-white tracking-wider uppercase">
          {value}
        </span>
      )}
    </div>
  </div>
);

const CustomInput = ({ label, icon: Icon, ...props }: any) => (
  <div className="space-y-1.5 text-left">
    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-700">{label}</label>
    <div className="relative group">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-accent transition-colors">
        <Icon size={14} />
      </div>
      <input
        {...props}
        className="w-full h-[48px] pl-10 pr-4 bg-gray-50 border-b-2 border-transparent focus:border-accent text-sm font-semibold text-gray-800 focus:outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
      />
    </div>
  </div>
);

const RapidLink = ({ title, desc, btn, to }: { title: string, desc: string, btn: string, to: string }) => (
  <div className="flex flex-col items-center group">
    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-3">{title}</h3>
    <p className="text-xs text-gray-500 mb-6 sm:mb-8 max-w-xs">{desc}</p>
    <Link
      to={to}
      className="inline-flex items-center gap-2 group text-[10px] font-black uppercase tracking-[0.2em] text-accent pb-1 border-b-2 border-transparent hover:border-accent transition-all"
    >
      {btn}
      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </Link>
  </div>
);

function ChevronDown({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
