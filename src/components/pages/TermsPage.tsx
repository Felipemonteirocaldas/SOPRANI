import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, Gavel, Scale, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  const { t } = useTranslation();

  const rules = [
    {
      icon: Gavel,
      title: "Jurisdiction",
      content: "All commercial transactions and disputes are governed by Italian law, specifically under the jurisdiction of the Court of Milan."
    },
    {
      icon: Scale,
      title: "Liability",
      content: "Soprani Engineering provides expert technical assistance but is not liable for indirect damages resulting from machinery downtime or improper maintenance by third parties."
    },
    {
      icon: AlertCircle,
      title: "Quotations",
      content: "Prices and delivery times provided in quotations are valid for 30 days unless otherwise specified in the official proposal."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_50%,#C41230_0%,transparent_50%)]" />
        </div>

        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 bg-accent text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Legal & Compliance
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight">
              Terms of <span className="text-accent">Service</span>
            </h1>
            <p className="text-xl text-slate-300 font-paragraph leading-relaxed">
              Establishing clear expectations for industrial excellence and professional technical partnership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-[100rem] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Prose */}
          <div className="lg:col-span-8">
            <div className="prose prose-slate prose-lg max-w-none font-paragraph text-slate-600 leading-relaxed">
              <h2 className="text-3xl font-heading font-bold text-primary mb-8 uppercase tracking-tight border-l-4 border-accent pl-6">
                Agreement to Terms
              </h2>
              <p className="mb-8 font-bold text-primary">
                By accessing this website and engaging with Soprani Engineering for machinery, spare parts, or assistance, you agree to be bound by these Terms of Service.
              </p>

              <div className="space-y-6 my-16">
                {rules.map((item, idx) => (
                  <div key={idx} className="flex gap-8 p-8 border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-xl hover:border-accent/10 transition-all duration-300">
                    <div className="w-12 h-12 bg-primary text-white flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-black text-primary mb-2 uppercase tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-heading font-bold text-primary mt-16 mb-6">Commercial Conditions</h2>
              <p>
                Engaging in business with Soprani Engineering involves specific industrial standards:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-6 border border-slate-100 rounded-sm">
                  <h4 className="font-bold text-primary mb-2">Delivery</h4>
                  <p className="text-xs">Ex-works or according to specific Incoterms defined in the contract.</p>
                </div>
                <div className="p-6 border border-slate-100 rounded-sm">
                  <h4 className="font-bold text-primary mb-2">Payments</h4>
                  <p className="text-xs">Standard industrial terms (LC, TT) as per individual negotiation.</p>
                </div>
              </div>

              <div className="mt-20 p-10 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-20 -mr-16 -mt-16 rotate-45"></div>
                <h4 className="text-xl font-heading font-bold mb-4 uppercase tracking-wider">Intellectual Property</h4>
                <p className="text-slate-400 mb-0 relative z-10">
                  All technical drawings, modifications, and engineering solutions developed by Soprani Engineering remain our exclusive intellectual property unless otherwise agreed in writing.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-40 space-y-8">
              <div className="p-8 border border-slate-100 bg-slate-50/50">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Related Documents</h4>
                <nav className="flex flex-col space-y-4">
                  <a href="/privacy" className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center justify-between group">
                    Privacy Policy <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="/request-quotation" className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center justify-between group">
                    Request a Quote <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </nav>
              </div>

              <div className="border border-slate-100 p-8">
                <p className="text-[10px] text-slate-400 leading-relaxed italic">
                  Soprani Engineering S.r.l. reserves the right to update these terms at any time to reflect changes in industrial regulations and international trade laws.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const ChevronRight = ({ size, className }: { size: number, className: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
