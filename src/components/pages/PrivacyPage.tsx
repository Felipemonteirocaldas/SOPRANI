import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPage() {
  const { t } = useTranslation();

  const sections = [
    {
      icon: Shield,
      title: "Data Protection",
      content: "We take the security of your industrial data seriously. All information transmitted through our platforms is encrypted using industry-standard protocols."
    },
    {
      icon: Lock,
      title: "Secure Access",
      content: "Access to sensitive machinery specifications and quotation data is restricted to authorized Soprani Engineering personnel only."
    },
    {
      icon: Eye,
      title: "Transparency",
      content: "We are committed to being clear about what data we collect and how it helps us provide better technical assistance and spare parts delivery."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,#C41230_0%,transparent_50%)]" />
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
              Privacy <span className="text-accent">Policy</span>
            </h1>
            <p className="text-xl text-slate-300 font-paragraph leading-relaxed">
              At Soprani Engineering, we value the trust you place in us when sharing your business and technical information.
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
                Introduction
              </h2>
              <p className="mb-8">
                This Privacy Policy describes how Soprani Engineering S.r.l. ("we", "us", or "our") collects, uses, and shares your personal information when you visit our website, use our services, or interact with us regarding industrial machinery and technical assistance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                {sections.map((item, idx) => (
                  <div key={idx} className="p-8 bg-slate-50 border border-slate-100 hover:border-accent/20 transition-colors group">
                    <item.icon className="w-8 h-8 text-accent mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-heading font-black text-primary mb-4 uppercase tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-heading font-bold text-primary mt-16 mb-6">Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when requesting a quotation, purchasing spare parts, or contacting our technical support team. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4">
                <li>Contact information (Name, Email, Phone number, Company)</li>
                <li>Machinery serial numbers and specifications</li>
                <li>Production site details for technical assistance</li>
                <li>Billing and shipping information</li>
              </ul>

              <div className="mt-20 p-10 bg-primary text-white border-l-8 border-accent">
                <h4 className="text-xl font-heading font-bold mb-4 uppercase tracking-wider">Need more details?</h4>
                <p className="text-slate-300 mb-6">
                  Our legal team is available to discuss specific data handling requirements for large-scale industrial projects.
                </p>
                <a href="/contact" className="text-accent font-bold hover:underline inline-flex items-center gap-2">
                  Contact Legal Department <FileText size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-40 space-y-8">
              <div className="p-8 border border-slate-100 bg-slate-50/50">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Quick Links</h4>
                <nav className="flex flex-col space-y-4">
                  <a href="/terms" className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center justify-between group">
                    Terms of Service <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="/contact" className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center justify-between group">
                    Contact Us <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </nav>
              </div>

              <div className="p-8 bg-accent text-white">
                <h4 className="text-lg font-heading font-bold mb-2">Effective Date</h4>
                <p className="text-white/70 text-sm">Last updated: April 22, 2026</p>
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
