import React, { useEffect, useRef, useState } from 'react';
import { Image } from '@/components/ui/image';
import { ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ProductSolutions } from '@/entities';

interface Product {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

const AnimatedProductCard: React.FC<{ product: Product; delay: number }> = ({ product, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div className="bg-white rounded-lg overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative w-full h-64 bg-background-alt overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={256}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Number Badge */}
          <div className="mb-4">
            <span className="inline-block text-4xl font-bold text-accent font-heading">
              {product.number}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-heading font-bold text-primary mb-3 line-clamp-2">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1 line-clamp-3">
            {product.description}
          </p>

          {/* Learn More Link */}
          <div className="flex items-center text-accent font-semibold text-sm group-hover:gap-2 transition-all duration-300">
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function OurServicesProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await BaseCrudService.getAll<ProductSolutions>('productsolutions');
        const mappedProducts: Product[] = (result.items || []).map((item, index) => ({
          id: item._id,
          number: String(index + 1).padStart(2, '0'),
          title: item.solutionName || 'Product',
          description: item.detailedDescription || '',
          image: item.solutionImage || 'https://static.wixstatic.com/media/9bbed2_9b0131eabaf440b68a748b0f9f16e116~mv2.png',
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-24 bg-background border-t border-border-light">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6">
            Our Services
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            Comprehensive range of industrial packaging machinery solutions for metal can production. From bodymakers to seamers, we deliver precision and reliability.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isLoading && products.length > 0 ? (
            products.map((product, index) => (
              <AnimatedProductCard
                key={product.id}
                product={product}
                delay={index * 100}
              />
            ))
          ) : isLoading ? null : (
            <div className="col-span-full text-center py-12">
              <p className="text-text-muted">No products available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
