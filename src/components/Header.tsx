import { Image } from '@/components/ui/image';
import { ArrowRight, ChevronDown, Headphones, Menu, Package, Truck, Wrench, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [megaMenuTimeout, setMegaMenuTimeout] = useState<NodeJS.Timeout | null>(null);

  const megaMenuColumns = [
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services', icon: Zap },
        { label: 'Machinery', href: '/machinery', icon: Wrench },
        { label: 'Spare Parts', href: '/spare-parts', icon: Package },
        { label: 'Technical Assistance', href: '/technical-assistance', icon: Headphones },
        { label: 'Trading Materials', href: '/trading-materials', icon: Truck },
      ]
    },
    {
      title: 'Products & Solutions',
      links: [
        { label: 'Product Solutions', href: '/products', icon: Zap },
        { label: 'Industries', href: '/industries', icon: Wrench },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Events', href: '/events', icon: Zap },
        { label: 'News', href: '/news', icon: Wrench },
      ]
    },
    {
      title: 'Platform',
      links: [
        { label: 'MPH Platform', href: '/mph', icon: Zap },
        { label: 'Request Quotation', href: '/request-quotation', icon: Wrench },
      ],
      promo: {
        tag: 'New',
        title: 'MPH Platform',
        subtitle: 'Advanced machinery management system'
      }
    }
  ];

  const mainNavLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/products' },
    { label: 'Company', href: '/company' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeout) clearTimeout(megaMenuTimeout);
    setMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    const timeout = setTimeout(() => setMegaMenuOpen(false), 150);
    setMegaMenuTimeout(timeout);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border-light backdrop-blur-md bg-opacity-95">
      <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16 xs:h-18 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center py-2 flex-shrink-0">
            <Image
              src="https://static.wixstatic.com/media/9bbed2_6d5be05d84b24c47a85cbd3100bbe220~mv2.png"
              width={240}
              height={80}
              className="h-10 xs:h-12 sm:h-14 w-auto opacity-80"
              originWidth={2173}
              originHeight={753} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main navigation">
            {/* Main Navigation Links */}
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-2 xs:px-2.5 sm:px-3 py-2 text-xs sm:text-sm lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* More Menu - Mega Menu */}
            <div
              className="relative"
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                id="mega-trigger"
                className="flex items-center gap-1 px-2 xs:px-2.5 sm:px-3 py-2 text-xs sm:text-sm lg:text-sm font-medium text-primary hover:text-accent transition-colors duration-200"
                aria-expanded={megaMenuOpen}
                aria-controls="mega-panel"
              >
                More
                <ChevronDown size={16} className={`transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Panel - Full Width */}
              <div
                id="mega-panel"
                className={`fixed left-0 right-0 top-20 bg-white border-t-4 border-accent shadow-lg z-40 transition-all duration-200 ease-out pointer-events-none ${
                  megaMenuOpen
                    ? 'opacity-100 pointer-events-auto translate-y-0'
                    : 'opacity-0 -translate-y-2'
                }`}
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
              >
                <div className="max-w-[100rem] mx-auto px-3 xs:px-4 sm:px-6 md:px-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 py-6 sm:py-8 lg:py-9">
                    {megaMenuColumns.map((column, idx) => (
                      <div key={idx}>
                        {/* Column Header */}
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 pb-2.5 border-b border-border-light mb-2.5">
                          {column.title}
                        </h3>

                        {/* Links */}
                        <div className="space-y-0">
                          {column.links.map((link, linkIdx) => {
                            const IconComponent = link.icon;
                            return (
                              <Link
                                key={linkIdx}
                                to={link.href}
                                className="flex items-center gap-2 text-sm font-normal text-gray-600 py-1.75 border-b border-gray-100 transition-colors duration-150 hover:text-primary"
                                onClick={() => setMegaMenuOpen(false)}
                              >
                                <IconComponent size={14} className="text-accent opacity-60 flex-shrink-0 transition-opacity duration-150 group-hover:opacity-100" />
                                {link.label}
                              </Link>
                            );
                          })}
                        </div>

                        {/* Promo Section */}
                        {column.promo && (
                          <div className="mt-3.5 p-4 bg-blue-50 border-l-4 border-accent">
                            <div className="text-xs font-bold uppercase tracking-widest text-accent mb-1.25">
                              {column.promo.tag}
                            </div>
                            <div className="text-sm font-bold text-primary mb-1">
                              {column.promo.title}
                            </div>
                            <div className="text-xs font-light text-gray-500">
                              {column.promo.subtitle}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/request-quotation"
              className="hidden sm:inline-flex ml-2 px-3 sm:px-4 lg:px-5 py-2 bg-accent text-white text-xs sm:text-xs lg:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-accent-dark hover:scale-105 active:scale-95 items-center gap-2"
              aria-label="Request a Quote"
            >
              Request Quotation
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
          <nav className="md:hidden py-3 xs:py-4 border-t border-border-light">
            <div className="flex flex-col space-y-1 xs:space-y-2 px-2 xs:px-3">
              {/* Main Mobile Links */}
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-3 xs:px-4 py-2 text-xs xs:text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile More Menu */}
              <button
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className="w-full text-left px-3 xs:px-4 py-2 text-xs xs:text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md flex items-center justify-between"
              >
                More
                <ChevronDown size={16} className={`transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mobile More Menu Items */}
              {megaMenuOpen && (
                <div className="pl-2 xs:pl-3 space-y-0.5 xs:space-y-1">
                  {megaMenuColumns.flatMap((column) => column.links).map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.href}
                      className="block px-3 xs:px-4 py-2 text-xs xs:text-sm font-medium text-primary hover:text-accent hover:bg-background-alt transition-colors rounded-md"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMegaMenuOpen(false);
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                to="/request-quotation"
                className="w-full mt-3 xs:mt-4 px-4 xs:px-5 py-2.5 xs:py-3 bg-accent text-white text-xs xs:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-accent-dark hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
                aria-label="Request a Quotation"
                onClick={() => setMobileMenuOpen(false)}
              >
                Request Quotation
                <ArrowRight size={14} />
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
