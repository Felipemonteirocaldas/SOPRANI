import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center py-2">
            <Image 
              src="https://static.wixstatic.com/media/9bbed2_15eda666dacf448ca3b615bfb1e18e10~mv2.png"
              alt="Soprani Engineering Logo"
              width={240}
              height={80}
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              Services
            </Link>
            <Link 
              to="/machinery" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              Machinery
            </Link>
            <Link 
              to="/spare-parts" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              Spare Parts
            </Link>
            <Link 
              to="/technical-assistance" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              Technical Assistance
            </Link>
            <Link 
              to="/trading-materials" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              Trading Materials
            </Link>
            <Link 
              to="/industries" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              Industries
            </Link>
            <Link 
              to="/mph" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              MPH
            </Link>
            <Link 
              to="/contact" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/about" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/services" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/machinery" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Machinery
              </Link>
              <Link 
                to="/spare-parts" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Spare Parts
              </Link>
              <Link 
                to="/technical-assistance" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Technical Assistance
              </Link>
              <Link 
                to="/trading-materials" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trading Materials
              </Link>
              <Link 
                to="/industries" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Industries
              </Link>
              <Link 
                to="/mph" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                MPH
              </Link>
              <Link 
                to="/contact" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
