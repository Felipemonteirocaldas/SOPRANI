import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, Droplet, Zap, Leaf, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StatItem {
  id: string;
  label: string;
  sublabel: string;
  value: number;
  suffix: string;
  duration: number;
}

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StatsSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [animatedValues, setAnimatedValues] = useState({
    num1: 0,
    num2: 0,
    num4: 0,
  });

  // Estatísticas com valores configuráveis
  const stats: StatItem[] = [
    {
      id: 'num1',
      label: t('stats.label1'),
      sublabel: t('stats.sublabel1'),
      value: 100,
      suffix: '+',
      duration: 2,
    },
    {
      id: 'num2',
      label: t('stats.label2'),
      sublabel: t('stats.sublabel2'),
      value: 30,
      suffix: '+',
      duration: 2,
    },
    {
      id: 'num3',
      label: t('stats.label3'),
      sublabel: t('stats.sublabel3'),
      value: 0,
      suffix: '',
      duration: 0,
    },
    {
      id: 'num4',
      label: t('stats.label4'),
      sublabel: t('stats.sublabel4'),
      value: 5,
      suffix: '',
      duration: 2,
    },
  ];

  const services: ServiceItem[] = [
    {
      id: 'service1',
      icon: <Package className="w-6 h-6" />,
      title: t('stats.s1'),
      description: t('stats.s1d'),
    },
    {
      id: 'service2',
      icon: <Droplet className="w-6 h-6" />,
      title: t('stats.s2'),
      description: t('stats.s2d'),
    },
    {
      id: 'service3',
      icon: <Zap className="w-6 h-6" />,
      title: t('stats.s3'),
      description: t('stats.s3d'),
    },
    {
      id: 'service4',
      icon: <Leaf className="w-6 h-6" />,
      title: t('stats.s4'),
      description: t('stats.s4d'),
    },
    {
      id: 'service5',
      icon: <Truck className="w-6 h-6" />,
      title: t('stats.s5'),
      description: t('stats.s5d'),
    },
  ];

  // Animação de contagem progressiva
  useEffect(() => {
    if (!isInView) return;

    const animateValue = (
      start: number,
      end: number,
      duration: number,
      callback: (value: number) => void
    ) => {
      if (duration === 0) {
        callback(end);
        return;
      }

      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // easeOutQuad
        const easeProgress = 1 - Math.pow(1 - progress, 2);
        const value = Math.floor(start + (end - start) * easeProgress);

        callback(value);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    // Animar num1 (0 a 100)
    animateValue(0, 100, 2, (value) => {
      setAnimatedValues((prev) => ({ ...prev, num1: value }));
    });

    // Animar num2 (0 a 30)
    animateValue(0, 30, 2, (value) => {
      setAnimatedValues((prev) => ({ ...prev, num2: value }));
    });

    // Animar num4 (0 a 5)
    animateValue(0, 5, 2, (value) => {
      setAnimatedValues((prev) => ({ ...prev, num4: value }));
    });
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="w-full bg-gradient-to-br from-primary to-primary-dark py-16 md:py-24 px-4 md:px-8"
    >
      <div className="max-w-[100rem] mx-auto">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            {t('stats.title')}
          </h2>
          <p className="font-paragraph text-lg text-gray-300 max-w-2xl mx-auto">
            {t('stats.desc')}
          </p>
        </motion.div>

        {/* Grid de Estatísticas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 mb-12 md:mb-16 border-l border-r border-gray-600"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`py-8 md:py-12 px-6 md:px-8 text-center border-b border-gray-600 md:border-b-0 ${
                index !== stats.length - 1 ? 'lg:border-r' : ''
              }`}
            >
              {/* Número com animação */}
              <div className="mb-4">
                <motion.div className="text-5xl md:text-6xl font-bold text-accent mb-2">
                  {stat.id === 'num1' && (
                    <>
                      {animatedValues.num1}
                      {stat.suffix}
                    </>
                  )}
                  {stat.id === 'num2' && (
                    <>
                      {animatedValues.num2}
                      {stat.suffix}
                    </>
                  )}
                  {stat.id === 'num3' && '24/7'}
                  {stat.id === 'num4' && (
                    <>
                      {animatedValues.num4}
                      {stat.suffix}
                    </>
                  )}
                </motion.div>
              </div>

              {/* Label */}
              <h3 className="font-heading text-sm md:text-base font-bold text-white uppercase tracking-wider mb-2">
                {stat.label}
              </h3>

              {/* Sublabel */}
              <p className="font-paragraph text-xs md:text-sm text-gray-400">
                {stat.sublabel}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Grid de Serviços */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-primary-light/50 hover:bg-primary-light/80 transition-colors duration-300"
            >
              {/* Ícone */}
              <div className="mb-4 text-accent">{service.icon}</div>

              {/* Título */}
              <h4 className="font-heading text-base md:text-lg font-bold text-white mb-2">
                {service.title}
              </h4>

              {/* Descrição */}
              <p className="font-paragraph text-xs md:text-sm text-gray-400">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
