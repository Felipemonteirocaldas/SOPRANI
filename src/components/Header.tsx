import { Image } from '@/components/ui/image';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

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
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main navigation">
            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                id="mega-trigger"
                className="nb-item active flex items-center gap-1 px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
                aria-expanded={megaMenuOpen}
                aria-controls="mega-panel"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              >
                Services
                <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
              </button>
              
              {/* Mega Menu Panel */}
              {megaMenuOpen && (
                <div
                  id="mega-panel"
                  className="absolute left-0 mt-0 w-64 bg-white border border-border-light rounded-lg shadow-lg py-2 z-50"
                >
                  <Link
                    to="/services"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    All Services
                  </Link>
                  <Link
                    to="/machinery"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    Machinery
                  </Link>
                  <Link
                    to="/spare-parts"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    Spare Parts
                  </Link>
                  <Link
                    to="/technical-assistance"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    Technical Assistance
                  </Link>
                  <Link
                    to="/trading-materials"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors"
                    onClick={() => setMegaMenuOpen(false)}
                  >
                    Trading Materials
                  </Link>
                </div>
              )}
            </div>

            <a
              href="#products"
              className="nb-item px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              Machinery
            </a>
            <a
              href="#about"
              className="nb-item px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#mph"
              className="nb-item px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              MPH Platform
            </a>
            <a
              href="#contact"
              className="nb-item px-3 py-2 text-xs lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
            >
              Contact
            </a>
            <Link
              to="/request-quotation"
              className="ml-2 px-5 py-2 bg-accent text-white text-xs lg:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-accent-dark hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              aria-label="Request a Quote"
            >
              Request Quote
              <ArrowRight size={14} />
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
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="w-full text-left px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md flex items-center justify-between"
              >
                Services
                <ChevronDown size={16} className={`transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {megaMenuOpen && (
                <div className="pl-4 space-y-1">
                  <Link
                    to="/services"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMegaMenuOpen(false);
                    }}
                  >
                    All Services
                  </Link>
                  <Link
                    to="/machinery"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMegaMenuOpen(false);
                    }}
                  >
                    Machinery
                  </Link>
                  <Link
                    to="/spare-parts"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMegaMenuOpen(false);
                    }}
                  >
                    Spare Parts
                  </Link>
                  <Link
                    to="/technical-assistance"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMegaMenuOpen(false);
                    }}
                  >
                    Technical Assistance
                  </Link>
                  <Link
                    to="/trading-materials"
                    className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMegaMenuOpen(false);
                    }}
                  >
                    Trading Materials
                  </Link>
                </div>
              )}
              <a
                href="#products"
                className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Machinery
              </a>
              <a
                href="#about"
                className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#mph"
                className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                MPH Platform
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <Link
                to="/request-quotation"
                className="w-full mt-4 px-5 py-3 bg-accent text-white text-sm font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-accent-dark hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
                aria-label="Request a Quotation"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request Quote
                <ArrowRight size={14} />
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
