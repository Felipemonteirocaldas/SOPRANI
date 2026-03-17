import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RequestQuotationPage() {
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
              Request a Quotation
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Get a customized quote for machinery, spare parts, technical assistance, or materials
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-12 text-center">
                <h2 className="text-2xl font-heading font-bold text-green-900 mb-4">
                  Thank You!
                </h2>
                <p className="text-green-800 mb-6">
                  Your quotation request has been received successfully. Our team will review your request and contact you shortly with a customized quote.
                </p>
                <a
                  href="/"
                  className="inline-block px-8 py-3 bg-primary text-white hover:bg-primary-light hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-sm"
                >
                  Return to Home
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Information */}
                <div>
                  <h3 className="text-xl font-heading font-bold mb-6 pb-4 border-b border-gray-200">
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name *</label>
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
                      <label className="block text-sm font-medium mb-2">Contact Person *</label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
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
                      <label className="block text-sm font-medium mb-2">Phone *</label>
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
                      <label className="block text-sm font-medium mb-2">Country *</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Your country"
                      />
                    </div>
                  </div>
                </div>

                {/* Product/Service Information */}
                <div>
                  <h3 className="text-xl font-heading font-bold mb-6 pb-4 border-b border-gray-200">
                    Product or Service Requested
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Product or Service *</label>
                      <select
                        name="productOrService"
                        value={formData.productOrService}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="">Select an option</option>
                        <option value="machinery">Machinery</option>
                        <option value="spare-parts">Spare Parts</option>
                        <option value="technical-assistance">Technical Assistance</option>
                        <option value="trading-materials">Trading Materials</option>
                        <option value="revamping">Revamping</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Machine Type</label>
                      <input
                        type="text"
                        name="machineType"
                        value={formData.machineType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="e.g., Can-making line, Welding machine"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Spare Part Reference</label>
                      <input
                        type="text"
                        name="sparePartReference"
                        value={formData.sparePartReference}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Part number or description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Quantity</label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Quantity needed"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Urgency</label>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="low">Low - No rush</option>
                        <option value="normal">Normal - Standard timeline</option>
                        <option value="high">High - Urgent</option>
                        <option value="critical">Critical - ASAP</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <h3 className="text-xl font-heading font-bold mb-6 pb-4 border-b border-gray-200">
                    Additional Information
                  </h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder="Please provide any additional details about your quotation request..."
                    />
                  </div>
                </div>

                {/* File Upload Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900">
                      <strong>File Attachments:</strong> To attach files (technical drawings, specifications, etc.), please email them directly to our team after submitting this form, or contact us for alternative submission methods.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-accent text-white hover:bg-accent-dark hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-sm"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Quotation Request'}
                  </button>
                  <a
                    href="/"
                    className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-sm font-medium uppercase tracking-wider rounded-sm"
                  >
                    Cancel
                  </a>
                </div>

                <p className="text-xs text-gray-500">
                  * Required fields. We respect your privacy and will only use your information to respond to your quotation request.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20 md:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
              Other Ways to Reach Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-heading font-bold mb-4">Email</h3>
                <p className="text-gray-600">
                  <a href="mailto:info@sopraniengineering.com" className="text-accent hover:underline">
                    info@sopraniengineering.com
                  </a>
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-heading font-bold mb-4">Phone</h3>
                <p className="text-gray-600">
                  <a href="tel:+1234567890" className="text-accent hover:underline">
                    +1 (234) 567-890
                  </a>
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-lg font-heading font-bold mb-4">Contact Form</h3>
                <p className="text-gray-600 mb-4">
                  Prefer a general inquiry?
                </p>
                <a
                  href="/contact"
                  className="inline-block px-6 py-2 border border-accent text-accent hover:bg-accent hover:text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-200 text-xs font-medium uppercase tracking-wider rounded-sm"
                >
                  Contact Us
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
