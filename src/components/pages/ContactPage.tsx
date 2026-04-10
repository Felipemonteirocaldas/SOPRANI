import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  
  return (
    <div 
      ref={ref} 
      className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700 ease-out`}
      style={{
        transitionProperty: 'opacity, transform',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      {children}
    </div>
  );
};

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setFormData({
      name: '',
      company: '',
      country: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-dark">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        <div className="relative max-w-[100rem] mx-auto px-4 md:px-8 text-center">
          <AnimatedElement>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              {t('contactPage.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              {t('contactPage.heroSub')}
            </p>
          </AnimatedElement>
        </div>
      </section>
      {/* Contact Content */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <AnimatedElement>
                <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                  {t('contactPage.getInTouch')}
                </h2>
                <p className="text-text-muted mb-8">
                  {t('contactPage.getInTouchDesc')}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-primary mb-1">{t('contactPage.email')}</h3>
                      <p className="text-text-muted">info@sopraniengineering.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-primary mb-1">{t('contactPage.phone')}</h3>
                      <p className="text-text-muted">+1 (234) 567-890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-primary mb-1">{t('contactPage.presence')}</h3>
                      <p className="text-text-muted">
                        Europe, Middle East, North Africa, Asia, Americas
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedElement delay={200}>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-border-light">
                  <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                    {t('contactPage.msgTitle')}
                  </h2>
                  
                  {submitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                      <h3 className="text-xl font-heading font-bold text-green-900 mb-2">{t('contactPage.thxTitle')}</h3>
                      <p className="text-green-800">{t('contactPage.thxDesc')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                            {t('contactPage.formName')}
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background-alt"
                            placeholder={t('contactPage.formPlaceN')}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                            {t('contactPage.email')} *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background-alt"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-primary mb-2">
                            {t('contactPage.formCompany')}
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background-alt"
                            placeholder={t('contactPage.formPlaceC')}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-primary mb-2">
                            {t('contactPage.formCountry')}
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background-alt"
                            placeholder={t('contactPage.formCountry')}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                          {t('contactPage.phone')}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background-alt"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                          {t('contactPage.formSubject')}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background-alt"
                        >
                          <option value="">{t('contactPage.subSelect')}</option>
                          <option value="machinery">{t('contactPage.sub1')}</option>
                          <option value="spare-parts">{t('contactPage.sub2')}</option>
                          <option value="technical">{t('contactPage.sub3')}</option>
                          <option value="trading">{t('contactPage.sub4')}</option>
                          <option value="general">{t('contactPage.sub5')}</option>
                          <option value="partnership">{t('contactPage.sub6')}</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                          {t('contactPage.formMsg')}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none bg-background-alt"
                          placeholder={t('contactPage.formPlaceP')}
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-semibold hover:bg-accent-dark hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-none"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            {t('contactPage.formSending')}
                          </>
                        ) : (
                          <>
                            {t('contactPage.formSend')}
                            <Send size={18} className="ml-2" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>
      {/* Additional Info Section */}
      <section className="py-20 md:py-32 bg-background-alt">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">{t('contactPage.reqQuote')}</h3>
                  <p className="text-text-muted mb-4">{t('contactPage.reqQuoteSub')}</p>
                  <a href="/request-quotation" className="text-accent hover:text-accent-dark font-semibold transition-colors">
                    {t('contactPage.reqQuoteBtn')}
                  </a>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">{t('contactPage.svcSub')}</h3>
                  <p className="text-text-muted mb-4">{t('contactPage.svcSub')}</p>
                  <a href="/services" className="text-accent hover:text-accent-dark font-semibold transition-colors">
                    {t('contactPage.svcBtn')}
                  </a>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">{t('contactPage.aboutUs')}</h3>
                  <p className="text-text-muted mb-4">{t('contactPage.aboutSub')}</p>
                  <a href="/about" className="text-accent hover:text-accent-dark font-semibold transition-colors">
                    {t('contactPage.aboutBtn')}
                  </a>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
