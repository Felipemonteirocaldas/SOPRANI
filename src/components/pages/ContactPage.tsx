import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('is-visible');
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
        transitionProperty: 'opacity, transform'
      }}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      {children}
    </div>
  );
};

export default function ContactPage() {
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
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/80">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <AnimatedElement>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Get in touch with our team for inquiries about machinery, spare parts, technical assistance, or material trading
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <AnimatedElement>
                <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                  Get In Touch
                </h2>
                <p className="text-gray-600 mb-8">
                  We&apos;re here to help and answer any questions you might have about our services and solutions.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-primary mb-1">Email</h3>
                      <p className="text-gray-600">info@sopraniengineering.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-primary mb-1">Phone</h3>
                      <p className="text-gray-600">+1 (234) 567-890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-primary mb-1">Global Presence</h3>
                      <p className="text-gray-600">
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
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                    Send Us a Message
                  </h2>
                  
                  {submitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                      <h3 className="text-xl font-heading font-bold text-green-900 mb-2">Thank You!</h3>
                      <p className="text-green-800">Your message has been received. We will get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            placeholder="Your name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            placeholder="Your company name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            placeholder="Your country"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        >
                          <option value="">Select a subject</option>
                          <option value="machinery">Machinery Inquiry</option>
                          <option value="spare-parts">Spare Parts</option>
                          <option value="technical">Technical Assistance</option>
                          <option value="trading">Trading Materials</option>
                          <option value="general">General Inquiry</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">Request a Quotation</h3>
                  <p className="text-gray-600 mb-4">Need a customized quote for machinery or services?</p>
                  <a href="/request-quotation" className="text-accent hover:text-accent/80 font-medium transition-colors">
                    Get a Quote →
                  </a>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">Services</h3>
                  <p className="text-gray-600 mb-4">Learn more about our comprehensive services</p>
                  <a href="/services" className="text-accent hover:text-accent/80 font-medium transition-colors">
                    View Services →
                  </a>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-primary mb-2">About Us</h3>
                  <p className="text-gray-600 mb-4">Discover our expertise and global presence</p>
                  <a href="/about" className="text-accent hover:text-accent/80 font-medium transition-colors">
                    Learn More →
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
