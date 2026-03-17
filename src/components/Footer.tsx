import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Subsidiaries } from '@/entities';

export default function Footer() {
  const [subsidiaries, setSubsidiaries] = useState<Subsidiaries[]>([]);

  useEffect(() => {
    loadSubsidiaries();
  }, []);

  const loadSubsidiaries = async () => {
    try {
      const result = await BaseCrudService.getAll<Subsidiaries>('subsidiaries', [], { limit: 8 });
      setSubsidiaries(result.items);
    } catch (error) {
      console.error('Failed to load subsidiaries:', error);
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4 text-white">Soprani Engineering</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Advanced metal packaging solutions with over 200 years of innovation. Your trusted partner for machinery, spare parts, and technical support worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-heading font-bold mb-6 uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/machinery" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  Machinery
                </Link>
              </li>
              <li>
                <Link to="/spare-parts" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  Spare Parts
                </Link>
              </li>
              <li>
                <Link to="/technical-assistance" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  Technical Assistance
                </Link>
              </li>
              <li>
                <Link to="/trading-materials" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  Trading Materials
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-heading font-bold mb-6 uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  Company Info
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-sm font-heading font-bold mb-6 uppercase tracking-wider text-white">Contact</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link to="/request-quotation" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  Request Quote
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-accent transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Subsidiaries Section */}
        {subsidiaries.length > 0 && (
          <div className="border-t border-gray-700 pt-12 mb-12">
            <h4 className="text-sm font-heading font-bold mb-6 uppercase tracking-wider text-white">Global Presence</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {subsidiaries.map((subsidiary) => (
                <div key={subsidiary._id} className="text-sm text-gray-300">
                  <p className="font-medium text-white mb-1">{subsidiary.subsidiaryName}</p>
                  <p className="text-xs text-gray-400">{subsidiary.location}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-400">
              © 2026 Soprani Engineering. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-gray-400 hover:text-accent transition-colors duration-200">
                Privacy
              </a>
              <a href="#" className="text-xs text-gray-400 hover:text-accent transition-colors duration-200">
                Terms
              </a>
              <a href="#" className="text-xs text-gray-400 hover:text-accent transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
