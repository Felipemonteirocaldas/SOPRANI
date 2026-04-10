import { useEffect, useState, useRef } from 'react';
import { BaseCrudService } from '@/integrations';
import { ProductSolutions } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Filter, Search } from 'lucide-react';
import Header from '@/components/Header';
import Fuse from 'fuse.js';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
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
        transitionProperty: 'opacity, transform',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      {children}
    </div>
  );
};

export default function ProductsPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<ProductSolutions[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductSolutions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const fuse = new Fuse(filtered, {
        keys: ['solutionName', 'category', 'detailedDescription', 'keyFeatures', 'specifications'],
        threshold: 0.3,
      });
      filtered = fuse.search(searchQuery).map(result => result.item);
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, products, searchQuery]);

  const loadProducts = async () => {
    try {
      const result = await BaseCrudService.getAll<ProductSolutions>('productsolutions', [], { limit: 50 });
      setProducts(result.items);
      setFilteredProducts(result.items);
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(result.items.map(p => p.category).filter(Boolean))) as string[];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
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
              {t('productsPage.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">{t('productsPage.heroSub')}</p>
          </AnimatedElement>
        </div>
      </section>
      {/* Filter and Search Section */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4 flex-wrap flex-1">
              <div className="flex items-center gap-2 text-gray-700">
                <Filter size={20} />
                <span className="font-medium">{t('productsPage.filterBy')}</span>
              </div>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-accent text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('productsPage.allProducts')}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-accent text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="w-full md:w-80 relative flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <AnimatedElement key={product._id} delay={index * 50}>
                    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      {product.solutionImage && (
                        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                          <Image 
                            src={product.solutionImage} 
                            alt={product.solutionName || 'Product image'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            width={400}
                          />
                        </div>
                      )}
                      <div className="p-6">
                        {product.category && (
                          <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full mb-3">
                            {product.category}
                          </span>
                        )}
                        <h3 className="text-lg font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                          {product.solutionName}
                        </h3>
                        {product.detailedDescription && (
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {product.detailedDescription}
                          </p>
                        )}
                        {product.keyFeatures && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-500 font-medium mb-2">{t('productsPage.keyFeatures')}</p>
                            <p className="text-sm text-gray-600 line-clamp-2">{product.keyFeatures}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">{t('productsPage.emptyProducts')}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
