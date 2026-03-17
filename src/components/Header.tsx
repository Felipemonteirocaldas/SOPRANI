import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Image 
              src="https://static.wixstatic.com/media/9bbed2_15eda666dacf448ca3b615bfb1e18e10~mv2.png"
              alt="Soprani Engineering Logo"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              Products
            </Link>
            <Link 
              to="/company" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              Company
            </Link>
            <Link 
              to="/events" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              Events
            </Link>
            <Link 
              to="/news" 
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
            >
              News
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
                to="/products" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/company" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Company
              </Link>
              <Link 
                to="/events" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                to="/news" 
                className="text-sm font-medium text-gray-700 hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                News
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
