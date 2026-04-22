import React, { useState } from 'react';
import { AlertCircle, ArrowRight, Building2, Globe, Hash, Layers, Mail, MessageSquare, Paperclip, Phone, ShieldCheck, X, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const FeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex gap-4 p-4 rounded-none bg-white/5 border border-white/10 backdrop-blur-sm">
    <div className="flex-shrink-0 w-10 h-10 rounded-none bg-accent/20 flex items-center justify-center border border-accent/30">
      <Icon className="w-5 h-5 text-accent" />
    </div>
    <div className="text-left">
      <h4 className="text-sm font-bold text-white mb-1 uppercase tracking-wider">{title}</h4>
      <p className="text-xs text-slate-200/80 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function RequestQuotationPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    productOrService: '',
    machineType: '',
    sparePartReference: '',
    quantity: '',
    urgency: 'normal',
    message: ''
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const product = params.get('product');
      if (product) {
        setFormData(prev => ({
          ...prev,
          productOrService: 'machinery',
          machineType: product
        }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        country: '',
        productOrService: '',
        machineType: '',
        sparePartReference: '',
        quantity: '',
        urgency: 'normal',
        message: ''
      });
      setSelectedFiles([]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary selection:bg-accent selection:text-white">
      <main className="flex-grow">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden bg-[#001F5F] pt-36 sm:pt-44 md:pt-52 pb-16 md:pb-40">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 z-0 opacity-10 text-left">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#C41230_0%,transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#1E293B_0%,transparent_50%)]" />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10 text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-block px-3 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-none mb-6 border border-accent/60">
                    B2B Technical Solutions
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-6 leading-[1.1] tracking-tight text-left">
                    {t('reqPage.heroTitle')}
                  </h1>
                  <p className="text-base md:text-lg text-blue-100 max-w-xl leading-relaxed mb-10 text-left">
                    {t('reqPage.heroSub')}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FeatureItem
                      icon={ShieldCheck}
                      title={t('reqPage.feat1Title')}
                      desc={t('reqPage.feat1Desc')}
                    />
                    <FeatureItem
                      icon={Zap}
                      title={t('reqPage.feat2Title')}
                      desc={t('reqPage.feat2Desc')}
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Visual Accent */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />

                <div className="bg-white rounded-none shadow-2xl overflow-hidden border border-gray-100 text-left">
                  <div className="bg-gray-50 px-5 py-4 sm:px-8 sm:py-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary">
                      {submitted ? t('reqPage.thxTitle') : t('reqPage.coInfo')}
                    </h2>
                    {!submitted && <div className="text-[10px] text-accent font-bold">{t('reqPage.reqLbl').split('.')[0]}</div>}
                  </div>

                  <div className="p-5 sm:p-8">
                    {submitted ? (
                      <div className="py-12 text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-none flex items-center justify-center mx-auto mb-6">
                          <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight uppercase">
                          {t('reqPage.thxTitle')}
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-xs mx-auto text-sm leading-relaxed">
                          {t('reqPage.thxDesc')}
                        </p>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="px-8 py-3 bg-[#001F5F] text-white text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all duration-300"
                        >
                          {t('reqPage.thxBtn')}
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 text-left">

                        {/* Row 1: Company Name + Contact Person */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1 sm:space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.coName')}</label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-sm font-medium"
                                placeholder="..." />
                            </div>
                          </div>
                          <div className="space-y-1 sm:space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.coPerson')}</label>
                            <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required
                              className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-sm font-medium" />
                          </div>
                        </div>

                        {/* Row 2: Email + Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1 sm:space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.coEmail')}</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                              <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-sm font-medium"
                                placeholder="..." />
                            </div>
                          </div>
                          <div className="space-y-1 sm:space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.coPhone')}</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-sm font-medium" />
                            </div>
                          </div>
                        </div>

                        {/* Row 3: Country + Product / Service */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1 sm:space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.coCountry')}</label>
                            <div className="relative">
                              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                              <input type="text" name="country" value={formData.country} onChange={handleChange} required
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-sm font-medium"
                                placeholder="..." />
                            </div>
                          </div>
                          <div className="space-y-1 sm:space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.prOpt')}</label>
                            <select name="productOrService" value={formData.productOrService} onChange={handleChange} required
                              className="w-full h-[41px] px-4 border border-gray-200 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-xs font-medium bg-white">
                              <option value="">{t('reqPage.prVal0')}</option>
                              <option value="machinery">{t('reqPage.prVal1')}</option>
                              <option value="spare-parts">{t('reqPage.prVal2')}</option>
                              <option value="technical-assistance">{t('reqPage.prVal3')}</option>
                              <option value="trading-materials">{t('reqPage.prVal4')}</option>
                              <option value="revamping">{t('reqPage.prVal5')}</option>
                            </select>
                          </div>
                        </div>

                        {/* Row 4: Machine Type + Part Reference */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 pt-3 sm:pt-4 border-t border-gray-100">
                          <div className="space-y-1 sm:space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.macType')}</label>
                            <div className="relative">
                              <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                              <input type="text" name="machineType" value={formData.machineType} onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-sm font-medium"
                                placeholder={t('reqPage.macTypePlace')} />
                            </div>
                          </div>
                          <div className="space-y-1 sm:space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.sparRef')}</label>
                            <div className="relative">
                              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                              <input type="text" name="sparePartReference" value={formData.sparePartReference} onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-sm font-medium"
                                placeholder={t('reqPage.sparRefPlace')} />
                            </div>
                          </div>
                        </div>

                        {/* Row 5: Quantity + Urgency */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1 sm:space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.qty')}</label>
                            <div className="relative">
                              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                              <input type="text" name="quantity" value={formData.quantity} onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-sm font-medium"
                                placeholder={t('reqPage.qtyPlace')} />
                            </div>
                          </div>
                          <div className="space-y-1 sm:space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.urg')}</label>
                            <select name="urgency" value={formData.urgency} onChange={handleChange}
                              className="w-full px-4 h-[41px] border border-gray-200 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-xs font-medium bg-white">
                              <option value="low">{t('reqPage.urg1')}</option>
                              <option value="normal">{t('reqPage.urg2')}</option>
                              <option value="high">{t('reqPage.urg3')}</option>
                              <option value="critical">{t('reqPage.urg4')}</option>
                            </select>
                          </div>
                        </div>

                        {/* Row 6: Message */}
                        <div className="space-y-1 sm:space-y-1.5 pt-3 sm:pt-4 border-t border-gray-100">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.msgLbl')}</label>
                          <textarea name="message" value={formData.message} onChange={handleChange} rows={3}
                            className="w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-accent focus:border-accent outline-none transition-all text-sm font-medium resize-none shadow-inner bg-gray-50/30"
                            placeholder={t('reqPage.msgPlace')} />
                        </div>

                        {/* Row 7: File Attachments */}
                        <div className="space-y-2 pt-3 sm:pt-4 border-t border-gray-100">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{t('reqPage.fileAttach')}</label>
                          <p className="text-[9px] text-gray-400 italic mb-2">{t('reqPage.fileInfo')}</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedFiles.map((file, idx) => (
                              <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 text-[10px] font-medium text-gray-600">
                                <Paperclip className="w-3 h-3 text-accent" />
                                <span className="max-w-[100px] truncate">{file.name}</span>
                                <button type="button" onClick={() => removeFile(idx)} className="p-0.5 hover:bg-gray-200 transition-colors">
                                  <X className="w-3 h-3 text-blue-300" />
                                </button>
                              </div>
                            ))}
                            <label className="flex items-center gap-2 px-4 py-1.5 bg-white border border-dashed border-gray-300 hover:border-accent hover:text-accent cursor-pointer transition-all text-[10px] font-bold uppercase tracking-wider text-gray-500">
                              <Paperclip className="w-3 h-3" />
                              {t('reqPage.selectFile')}
                              <input type="file" multiple onChange={handleFileChange} className="hidden" />
                            </label>
                          </div>
                        </div>

                        {/* Submit Row */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <button type="submit" disabled={isLoading}
                            className="flex-1 bg-accent hover:bg-opacity-95 text-white py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 disabled:bg-gray-400 flex items-center justify-center gap-2 group">
                            {isLoading ? t('reqPage.subBtnL') : (
                              <>
                                {t('reqPage.subBtn')}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                              </>
                            )}
                          </button>
                          <Link to="/"
                            className="px-6 py-3.5 border border-gray-200 text-gray-400 hover:text-primary hover:border-primary text-xs font-bold uppercase tracking-widest text-center transition-all duration-300">
                            {t('reqPage.cancelBtn')}
                          </Link>
                        </div>

                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Global Reach Contact Info */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-heading font-black text-primary mb-4 tracking-tight uppercase">
                {t('reqPage.waysTitle')}
              </h2>
              <div className="h-1 w-20 bg-accent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ContactCard
                icon={Mail}
                title={t('reqPage.wEmail')}
                val="info@sopraniengineering.com"
                link="mailto:info@sopraniengineering.com"
              />
              <ContactCard
                icon={Phone}
                title={t('reqPage.wPhone')}
                val="+39 348 071 2116"
                link="tel:+393480712116"
              />
              <div className="p-8 border border-gray-100 shadow-sm bg-gray-50 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-none flex items-center justify-center shadow-sm border border-gray-100 mb-6 font-bold text-accent">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{t('reqPage.wForms')}</h3>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  {t('reqPage.wFormsDesc')}
                </p>
                <Link
                  to="/contact"
                  className="px-6 py-2 border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em]"
                >
                  {t('reqPage.wFormsBtn')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const ContactCard = ({ icon: Icon, title, val, link }: { icon: any, title: string, val: string, link: string }) => (
  <div className="p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 bg-white group text-center flex flex-col items-center">
    <div className="w-12 h-12 bg-gray-50 rounded-none flex items-center justify-center shadow-inner border border-gray-100 mb-6 group-hover:bg-accent group-hover:border-accent transition-colors duration-500 flex-shrink-0">
      <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-500" />
    </div>
    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">{title}</h3>
    <a href={link} className="text-sm font-bold text-gray-500 hover:text-accent transition-colors">
      {val}
    </a>
  </div>
);



