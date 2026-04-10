import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

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

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              {t('reqPage.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {t('reqPage.heroSub')}
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-12 text-center">
                <h2 className="text-2xl font-heading font-bold text-green-900 mb-4">
                  {t('reqPage.thxTitle')}
                </h2>
                <p className="text-green-800 mb-6">
                  {t('reqPage.thxDesc')}
                </p>
                <a
                  href="/"
                  className="inline-block px-8 py-3 bg-primary text-white hover:bg-primary-light hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-sm"
                >
                  {t('reqPage.thxBtn')}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Information */}
                <div>
                  <h3 className="text-xl font-heading font-bold mb-6 pb-4 border-b border-gray-200">
                    {t('reqPage.coInfo')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('reqPage.coName')}</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('reqPage.coPerson')}</label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('reqPage.coEmail')}</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('reqPage.coPhone')}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">{t('reqPage.coCountry')}</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>

                {/* Product/Service Information */}
                <div>
                  <h3 className="text-xl font-heading font-bold mb-6 pb-4 border-b border-gray-200">
                    {t('reqPage.prInfo')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('reqPage.prOpt')}</label>
                      <select
                        name="productOrService"
                        value={formData.productOrService}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="">{t('reqPage.prVal0')}</option>
                        <option value="machinery">{t('reqPage.prVal1')}</option>
                        <option value="spare-parts">{t('reqPage.prVal2')}</option>
                        <option value="technical-assistance">{t('reqPage.prVal3')}</option>
                        <option value="trading-materials">{t('reqPage.prVal4')}</option>
                        <option value="revamping">{t('reqPage.prVal5')}</option>
                        <option value="other">{t('reqPage.prVal6')}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('reqPage.macType')}</label>
                      <input
                        type="text"
                        name="machineType"
                        value={formData.machineType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={t('reqPage.macTypePlace')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('reqPage.sparRef')}</label>
                      <input
                        type="text"
                        name="sparePartReference"
                        value={formData.sparePartReference}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={t('reqPage.sparRefPlace')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('reqPage.qty')}</label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder={t('reqPage.qtyPlace')}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">{t('reqPage.urg')}</label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="low">{t('reqPage.urg1')}</option>
                        <option value="normal">{t('reqPage.urg2')}</option>
                        <option value="high">{t('reqPage.urg3')}</option>
                        <option value="critical">{t('reqPage.urg4')}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-xl font-heading font-bold mb-6 pb-4 border-b border-gray-200">
                    {t('reqPage.msgInfo')}
                  </h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('reqPage.msgLbl')}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder={t('reqPage.msgPlace')}
                    />
                  </div>
                </div>

                {/* File Upload Notice */}
                <div className="bg-background-alt border border-border-light rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-primary" dangerouslySetInnerHTML={{ __html: t('reqPage.fileInfo') }} />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-accent text-white hover:bg-accent-dark hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
                  >
                    {isLoading ? t('reqPage.subBtnL') : t('reqPage.subBtn')}
                  </button>
                  <a
                    href="/"
                    className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-none"
                  >
                    {t('reqPage.cancelBtn')}
                  </a>
                </div>

                <p className="text-xs text-gray-500">
                  {t('reqPage.reqLbl')}
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
              {t('reqPage.waysTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-heading font-bold mb-4">{t('reqPage.wEmail')}</h3>
                <p className="text-gray-600">
                  <a href="mailto:info@sopraniengineering.com" className="text-accent hover:underline">
                    info@sopraniengineering.com
                  </a>
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-heading font-bold mb-4">{t('reqPage.wPhone')}</h3>
                <p className="text-gray-600">
                  <a href="tel:+1234567890" className="text-accent hover:underline">
                    +1 (234) 567-890
                  </a>
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-heading font-bold mb-4">{t('reqPage.wForms')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('reqPage.wFormsDesc')}
                </p>
                <a
                  href="/contact"
                  className="inline-block px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-xs font-medium uppercase tracking-wider rounded-none"
                >
                  {t('reqPage.wFormsBtn')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
