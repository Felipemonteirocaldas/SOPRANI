import { useEffect, useState, useMemo } from 'react';
import { BaseCrudService } from '@/integrations';
import { ProductSolutions } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Filter, Search, ArrowRight, Settings, Cpu, Shield, Zap, Maximize2, X } from 'lucide-react';
import Header from '@/components/Header';
import Fuse from 'fuse.js';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

interface FeaturedProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string;
  specs: string;
  application: string;
  image: string;
  tag: string;
}

export default function ProductsPage() {
  const { t, i18n } = useTranslation();
  const [dbProducts, setDbProducts] = useState<ProductSolutions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<FeaturedProduct | null>(null);

  // Hardcoded premium featured machinery as fallback/priority
  const featuredProducts: FeaturedProduct[] = useMemo(() => [
    {
      id: 'line3p',
      name: t('productsPage.featured.line3p.name'),
      category: t('productsPage.featured.line3p.category'),
      description: t('productsPage.featured.line3p.description'),
      features: t('productsPage.featured.line3p.features'),
      specs: t('productsPage.featured.line3p.specs'),
      application: t('productsPage.featured.line3p.application'),
      image: '/images/products/line3p.png',
      tag: 'Line'
    },
    {
      id: 'aerosol',
      name: t('productsPage.featured.aerosol.name'),
      category: t('productsPage.featured.aerosol.category'),
      description: t('productsPage.featured.aerosol.description'),
      features: t('productsPage.featured.aerosol.features'),
      specs: t('productsPage.featured.aerosol.specs'),
      application: t('productsPage.featured.aerosol.application'),
      image: '/images/products/aerosol.png',
      tag: 'Aerosol'
    },
    {
      id: 'press',
      name: t('productsPage.featured.press.name'),
      category: t('productsPage.featured.press.category'),
      description: t('productsPage.featured.press.description'),
      features: t('productsPage.featured.press.features'),
      specs: t('productsPage.featured.press.specs'),
      application: t('productsPage.featured.press.application'),
      image: '/images/products/press.png',
      tag: 'EOE'
    },
    {
      id: 'welder',
      name: t('productsPage.featured.welder.name'),
      category: t('productsPage.featured.welder.category'),
      description: t('productsPage.featured.welder.description'),
      features: t('productsPage.featured.welder.features'),
      specs: t('productsPage.featured.welder.specs'),
      application: t('productsPage.featured.welder.application'),
      image: '/images/products/welder.png',
      tag: 'Welding'
    },
    {
      id: 'coating',
      name: t('productsPage.featured.coating.name'),
      category: t('productsPage.featured.coating.category'),
      description: t('productsPage.featured.coating.description'),
      features: t('productsPage.featured.coating.features'),
      specs: t('productsPage.featured.coating.specs'),
      application: t('productsPage.featured.coating.application'),
      image: '/images/products/coating.png',
      tag: 'Coating'
    },
    {
      id: 'pail',
      name: t('productsPage.featured.pail.name'),
      category: t('productsPage.featured.pail.category'),
      description: t('productsPage.featured.pail.description'),
      features: t('productsPage.featured.pail.features'),
      specs: t('productsPage.featured.pail.specs'),
      application: t('productsPage.featured.pail.application'),
      image: '/images/products/pail.png',
      tag: 'Heavy Duty'
    }
  ], [t]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await BaseCrudService.getAll<ProductSolutions>('productsolutions', [], { limit: 50 });
      setDbProducts(result.items);
    } catch (error) {
      console.error('Failed to load DB products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = useMemo(() => {
    const dbCats = dbProducts.map(p => p.category).filter(Boolean) as string[];
    const featuredCats = featuredProducts.map(p => p.category);
    return Array.from(new Set(['all', ...featuredCats, ...dbCats]));
  }, [dbProducts, featuredProducts]);

  const allFilteredProducts = useMemo(() => {
    // Merge DB products with featured ones for a unified search/filter experience
    const mappedDbProducts = dbProducts.map(p => ({
      id: p._id,
      name: p.solutionName || '',
      category: p.category || '',
      description: p.detailedDescription || '',
      features: p.keyFeatures || '',
      specs: p.specifications || '',
      application: 'Industrial Packaging',
      image: p.solutionImage || '',
      tag: 'System'
    }));

    let combined = [...featuredProducts, ...mappedDbProducts];

    if (selectedCategory !== 'all') {
      combined = combined.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const fuse = new Fuse(combined, {
        keys: ['name', 'category', 'description', 'features', 'specs'],
        threshold: 0.35,
      });
      combined = fuse.search(searchQuery).map(result => result.item);
    }

    return combined;
  }, [selectedCategory, dbProducts, featuredProducts, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-primary">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-24 overflow-hidden bg-[#001F5F]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)]" />
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" 
          />
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}
          />
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeUp}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="outline" className="box-content px-4 py-1 mb-6 font-semibold uppercase border-accent text-accent tracking-widest bg-accent/5">
              Premium Industrial Engineering
            </Badge>
            <h1 className="mb-8 text-5xl font-bold tracking-tight text-white md:text-7xl font-heading">
              {t('productsPage.heroTitle')}
            </h1>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed md:text-xl text-slate-400">
              {t('productsPage.heroSub')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Bar - Static following Wix Vibe Pattern */}
      <div className="relative z-40 py-4 border-b shadow-xl bg-white/80 backdrop-blur-md border-slate-200">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="flex items-center w-full gap-2 overflow-x-auto lg:w-auto no-scrollbar scroll-smooth">
              <span className="flex items-center gap-2 mr-4 text-sm font-bold tracking-wider uppercase text-slate-500">
                <Filter size={14} className="text-accent" /> {t('productsPage.filterBy')}
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 text-sm font-semibold transition-all duration-300 border-b-2 ${
                    selectedCategory === cat 
                      ? 'border-accent text-accent bg-accent/5' 
                      : 'border-transparent text-slate-500 hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  {cat === 'all' ? t('productsPage.allProducts') : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search technical solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#F1F5F9] border-none rounded-xl focus:ring-2 focus:ring-accent focus:bg-white transition-all text-sm font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <LoadingSpinner className="w-12 h-12 text-accent" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {allFilteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <Card className="h-full overflow-hidden transition-all duration-500 bg-white border-0 shadow-sm hover:shadow-2xl rounded-2xl">
                      <div className="relative h-64 overflow-hidden bg-slate-100">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            width={600}
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-slate-200">
                            <Settings className="w-12 h-12 text-slate-400 animate-spin-slow" />
                          </div>
                        )}
                        <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-primary/80 via-transparent group-hover:opacity-100" />
                        <div className="absolute top-4 left-4">
                          <Badge className="px-3 py-1 font-bold tracking-wider text-white border-none bg-accent shadow-lg shadow-accent/20">
                            {product.tag}
                          </Badge>
                        </div>
                        <button 
                          onClick={() => setSelectedProduct(product)}
                          className="absolute flex items-center justify-center transition-all bg-white rounded-full opacity-0 bottom-4 right-4 w-12 h-12 text-primary hover:bg-accent hover:text-white group-hover:opacity-100"
                        >
                          <Maximize2 size={20} />
                        </button>
                      </div>

                      <CardContent className="p-8">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xs font-bold tracking-widest uppercase text-accent">{product.category}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-xs font-medium text-slate-500">{product.application}</span>
                        </div>
                        <h3 className="mb-4 text-2xl font-bold text-primary group-hover:text-accent transition-colors font-heading leading-tight">
                          {product.name}
                        </h3>
                        <p className="mb-8 text-sm leading-relaxed text-slate-500 line-clamp-3">
                          {product.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                          <div className="flex items-start gap-2">
                            <Zap size={16} className="mt-1 text-accent shrink-0" />
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Performance</p>
                                <p className="text-xs font-semibold text-primary truncate max-w-[100px]">{product.specs.split('|')[0]}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Cpu size={16} className="mt-1 text-accent shrink-0" />
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Technology</p>
                                <p className="text-xs font-semibold text-primary truncate max-w-[100px]">{product.features.split(',')[0]}</p>
                            </div>
                          </div>
                        </div>

                        <Button 
                          variant="ghost" 
                          onClick={() => setSelectedProduct(product)}
                          className="w-full mt-8 font-bold border rounded-xl hover:bg-accent hover:text-white border-slate-100 group/btn"
                        >
                          {t('productsPage.viewDetails')} <ArrowRight size={16} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!isLoading && allFilteredProducts.length === 0 && (
            <div className="py-32 text-center">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-slate-100 rounded-full">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{t('productsPage.emptyProducts')}</h3>
              <p className="text-slate-500">Try adjusting your filters or search terms.</p>
              <Button onClick={() => {setSelectedCategory('all'); setSearchQuery('');}} variant="link" className="mt-4 text-accent uppercase font-bold tracking-widest text-xs">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Machinery Details Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-full bg-slate-900">
              {selectedProduct?.image && (
                <Image 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="object-cover w-full h-full opacity-80"
                  width={800}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent" />
              <div className="absolute bottom-8 left-8">
                <Badge className="mb-4 bg-accent">{selectedProduct?.tag}</Badge>
                <h2 className="text-3xl font-bold text-white font-heading">{selectedProduct?.name}</h2>
              </div>
            </div>
            <div className="p-10 bg-white">
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">{selectedProduct?.category}</span>
                <button onClick={() => setSelectedProduct(null)} className="p-2 transition-colors rounded-full text-slate-400 hover:bg-slate-100">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="mb-3 text-sm font-bold text-primary uppercase tracking-wider">{t('productsPage.heroSub')}</h4>
                  <p className="text-sm leading-relaxed text-slate-600">{selectedProduct?.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 p-6 rounded-2xl bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm">
                      <Zap size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Specifications</p>
                      <p className="text-sm font-semibold text-primary">{selectedProduct?.specs}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm">
                      <Cpu size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Features</p>
                      <p className="text-sm font-semibold text-primary">{selectedProduct?.features}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm">
                      <Shield size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Industry Application</p>
                      <p className="text-sm font-semibold text-primary">{selectedProduct?.application}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-14 text-sm font-bold tracking-widest uppercase transition-all shadow-xl bg-accent hover:bg-accent-dark shadow-accent/20 rounded-xl">
                  {t('productsPage.requestQuote')}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

