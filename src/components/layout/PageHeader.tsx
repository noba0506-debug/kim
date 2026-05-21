import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: string;
  category?: string;
  gradient?: string;
  bgImage?: string;
}

export function PageHeader({ 
  title, 
  subtitle, 
  category, 
  gradient = "from-brand-navy to-brand-blue-dark",
  bgImage
}: PageHeaderProps) {
  return (
    <section className={`relative pt-32 pb-20 overflow-hidden ${bgImage ? '' : `bg-gradient-to-br ${gradient}`}`}>
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImage} 
            alt="background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
      
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2 z-0" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {category && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-black/30 text-brand-yellow text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/20 shadow-md [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
              {category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight whitespace-pre-line [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white text-lg md:text-xl max-w-2xl font-semibold leading-relaxed [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      {/* Breadcrumb pseudo-element or just a nice line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
