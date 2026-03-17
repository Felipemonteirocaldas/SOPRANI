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
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">KOENIG & BAUER</h3>
            <p className="text-sm text-gray-300 mb-4">
              Advanced printing solutions, powerful performance. More than 200 years of printing innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-heading font-bold mb-4 uppercase">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  Company
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Subsidiaries */}
          <div>
            <h4 className="text-sm font-heading font-bold mb-4 uppercase">Subsidiaries</h4>
            <ul className="space-y-2">
              {subsidiaries.slice(0, 5).map((subsidiary) => (
                <li key={subsidiary._id}>
                  <span className="text-sm text-gray-300">
                    {subsidiary.subsidiaryName}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-heading font-bold mb-4 uppercase">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300 mb-4 md:mb-0">
              © 2026 koenig-bauer.com. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-300 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-300 hover:text-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
