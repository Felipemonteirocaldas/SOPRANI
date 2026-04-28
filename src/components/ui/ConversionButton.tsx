import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────
//  🔴 ConversionButton — High-conversion CTA component
//
//  Features:
//   • Shimmer sweep (2.8s infinite, diagonal brilho)
//   • Magnetic attraction (±strength px on mousemove)
//   • Pulse ring on hover (subtle outer ring expand)
//   • Arrow slide-right animation
//   • Works as internal <Link> or external <a>
// ─────────────────────────────────────────────────────────

type ConversionButtonVariant = 'primary' | 'outline' | 'ghost-dark';

interface ConversionButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: ConversionButtonVariant;
  showArrow?: boolean;
  shimmer?: boolean;
  magnetic?: boolean;
  className?: string;
  onClick?: () => void;
  id?: string;
  'aria-label'?: string;
}

export default function ConversionButton({
  children,
  to,
  href,
  variant = 'primary',
  showArrow = true,
  shimmer = true,
  magnetic = true,
  className = '',
  onClick,
  id,
  'aria-label': ariaLabel,
}: ConversionButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // ── Magnetic spring values ──
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 18, mass: 0.1 });
  const sy = useSpring(my, { stiffness: 160, damping: 18, mass: 0.1 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!magnetic || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const strength = 8;
    mx.set(((e.clientX - cx) / (width / 2)) * strength);
    my.set(((e.clientY - cy) / (height / 2)) * strength);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }

  // ── Variant styles ──
  const styles: Record<ConversionButtonVariant, React.CSSProperties & { className: string }> = {
    primary: {
      className: 'bg-accent text-white border border-accent hover:bg-[#A10F27] shadow-lg shadow-accent/20',
      borderColor: '#C41230',
    },
    outline: {
      className: 'bg-transparent text-accent border border-accent hover:bg-accent hover:text-white',
    },
    'ghost-dark': {
      className: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md shadow-lg shadow-black/10',
    },
  };

  const variantClass = styles[variant].className;

  const buttonContent = (
    <motion.div
      ref={ref}
      className="relative inline-block"
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* ❶ Pulse ring */}
      {hovered && (
        <motion.span
          className="absolute inset-0 rounded-none pointer-events-none"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 1.12 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          style={{
            border: variant === 'primary' ? '2px solid rgba(196,18,48,0.6)' : '2px solid rgba(255,255,255,0.35)',
          }}
        />
      )}

      {/* ❷ Shimmer sweep layer */}
      {shimmer && (
        <span
          className="absolute inset-0 pointer-events-none overflow-hidden z-10"
          aria-hidden="true"
        >
          <span
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)',
              animation: 'shimmer 2.8s ease-in-out infinite',
              backgroundSize: '200% 100%',
              transform: 'skewX(-12deg)',
            }}
          />
        </span>
      )}

      {/* ❸ Button body */}
      <span
        className={`
          relative flex items-center gap-3 px-8 py-4
          font-heading font-bold text-sm uppercase tracking-[0.15em]
          transition-all duration-300 max-w-full rounded-none
          ${variantClass}
          ${className}
        `}
      >
        <span className="relative z-10 truncate">{children}</span>
        {showArrow && (
          <ArrowRight
            size={16}
            strokeWidth={2.5}
            className="relative z-10 transition-transform duration-400 flex-shrink-0"
            style={{ transform: hovered ? 'translateX(5px)' : 'translateX(0)' }}
          />
        )}
      </span>
    </motion.div>
  );

  // Render as <Link>, <a>, or <button>
  if (to) {
    return (
      <Link to={to} id={id} aria-label={ariaLabel} onClick={onClick} className="inline-block">
        {buttonContent}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} id={id} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer" className="inline-block">
        {buttonContent}
      </a>
    );
  }
  return (
    <button type="button" id={id} aria-label={ariaLabel} onClick={onClick} className="inline-block">
      {buttonContent}
    </button>
  );
}
