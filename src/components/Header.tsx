import { Image } from '@/components/ui/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border-light backdrop-blur-md bg-opacity-95">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center py-2 flex-shrink-0">
            <Image
              src="https://static.wixstatic.com/media/9bbed2_15eda666dacf448ca3b615bfb1e18e10~mv2.png"
              alt="Soprani Engineering Logo"
              width={240}
              height={80}
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/about"
              className="px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              About
            </Link>
            <Link
              to="/services"
              className="px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              Services
            </Link>
            <Link
              to="/machinery"
              className="px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              Machinery
            </Link>
            <Link
              to="/spare-parts"
              className="px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              Spare Parts
            </Link>
            <Link
              to="/technical-assistance"
              className="px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              Tech Assist
            </Link>
            <Link
              to="/trading-materials"
              className="px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              Trading
            </Link>
            <Link
              to="/industries"
              className="px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              Industries
            </Link>
            <Link
              to="/mph"
              className="px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              MPH
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              to="/request-quotation"
              className="ml-2 px-5 py-2 bg-accent text-white text-xs lg:text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-dark transition-all duration-200 hover:shadow-lg"
              aria-label="Request a Quote"
            >
              Request Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-primary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border-light">
            <div className="flex flex-col space-y-2">
              <Link
                to="/about"
                className="px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className="px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/machinery"
                className="px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Machinery
              </Link>
              <Link
                to="/spare-parts"
                className="px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Spare Parts
              </Link>
              <Link
                to="/technical-assistance"
                className="px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Technical Assistance
              </Link>
              <Link
                to="/trading-materials"
                className="px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trading Materials
              </Link>
              <Link
                to="/industries"
                className="px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Industries
              </Link>
              <Link
                to="/mph"
                className="px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                MPH
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/request-quotation"
                className="w-full mt-4 px-5 py-3 bg-accent text-white text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-dark transition-all duration-200"
                aria-label="Request a Quotation"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request Quote
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
