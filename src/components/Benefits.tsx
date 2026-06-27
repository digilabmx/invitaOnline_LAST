import React from 'react';
import { motion } from 'motion/react';
import { BENEFITS } from '../data';
import * as Icons from 'lucide-react';

// Dynamic icon resolver
const IconRenderer = ({ name, className }: { name: string; className: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Sparkles className={className} />;
  return <IconComponent className={className} />;
};

export default function Benefits() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  } as const;

  return (
    <section id="beneficios" className="py-24 bg-white border-y border-luxury-beige-200/30 relative">
      {/* Background floral watermark placeholder */}
      <div className="absolute top-10 left-10 w-44 h-44 rounded-full bg-luxury-beige-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-44 h-44 rounded-full bg-luxury-beige-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-beige-500 block mb-3">
            Características de primera clase
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-beige-900 tracking-tight leading-tight">
            Todo lo necesario para una <br />
            <span className="font-serif italic font-light text-luxury-beige-500">experiencia digital de lujo</span>
          </h2>
          <div className="h-[1px] w-20 bg-luxury-beige-300 mx-auto mt-6" />
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {BENEFITS.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative bg-[#faf9f6] hover:bg-white p-8 border border-luxury-beige-200/50 hover:border-luxury-beige-300/80 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-luxury-beige-900/5 overflow-hidden"
            >
              {/* Thin accent line at bottom */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-luxury-beige-400 to-luxury-beige-500 transition-all duration-500" />

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-full bg-luxury-beige-100/60 flex items-center justify-center mb-6 text-luxury-beige-700 group-hover:bg-luxury-beige-900 group-hover:text-white transition-all duration-300">
                <IconRenderer name={benefit.iconName} className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Text */}
              <h3 className="font-serif text-lg text-luxury-beige-900 font-medium tracking-wide mb-3">
                {benefit.title}
              </h3>
              <p className="font-sans text-xs text-luxury-beige-700 leading-relaxed font-light">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer micro-details */}
        <div className="mt-16 text-center">
          <p className="font-sans text-[11px] text-luxury-beige-400 tracking-wider uppercase">
            ✓ Sin descargas · ✓ Compatible con Android & iOS · ✓ Carga ultra rápida
          </p>
        </div>
      </div>
    </section>
  );
}
