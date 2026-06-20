import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EXAMPLES } from '../data';
import { Eye, ChevronRight, Sparkles } from 'lucide-react';
import { InvitationExample } from '../types';

interface GalleryProps {
  onSelectExample: (example: InvitationExample) => void;
}

export default function Gallery({ onSelectExample }: GalleryProps) {
  const [selectedFilter, setSelectedFilter] = useState<'Todos' | 'Bodas' | 'XV Años' | 'Bautizos' | 'Cumpleaños'>('Todos');

  const filteredExamples = selectedFilter === 'Todos'
    ? EXAMPLES
    : EXAMPLES.filter(ex => ex.category === selectedFilter);

  return (
    <section id="galeria" className="py-24 bg-gradient-to-b from-luxury-beige-100 to-luxury-beige-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-[-10%] w-[35vw] h-[35vw] rounded-full bg-luxury-beige-200/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="text-left max-w-xl">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-beige-500 block mb-3">
              Catálogo de alta costura
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-luxury-beige-900 tracking-tight leading-tight">
              Modelos para inspirar <br />
              <span className="font-serif italic font-light text-luxury-beige-500">tu próximo evento</span>
            </h2>
            <div className="h-[1px] w-16 bg-luxury-beige-300 mt-5" />
          </div>

          {/* Luxury Categories Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-luxury-beige-200/60 pb-2">
            {(['Todos', 'Bodas', 'XV Años', 'Bautizos', 'Cumpleaños'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-sans transition-all duration-300 relative cursor-pointer ${
                  selectedFilter === filter
                    ? 'text-luxury-beige-900 font-medium'
                    : 'text-luxury-beige-400 hover:text-luxury-beige-700'
                }`}
              >
                {filter}
                {selectedFilter === filter && (
                  <motion.div
                    layoutId="activeFilterUnderline"
                    className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-luxury-beige-800"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredExamples.map((example) => (
            <motion.div
              layout
              key={example.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="group relative h-[480px] bg-white border border-luxury-beige-200/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Category Badge on Top-Right */}
              <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-luxury-beige-200/50">
                <p className="font-sans text-[8px] uppercase tracking-[0.2em] font-medium text-luxury-beige-800">
                  {example.category}
                </p>
              </div>

              {/* Card Image Container */}
              <div className="relative w-full h-[360px] overflow-hidden bg-luxury-beige-100 flex items-center justify-center">
                <img
                  src={example.image}
                  alt={example.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 select-none"
                  referrerPolicy="no-referrer"
                />

                {/* Ultimate Overlay Blur and Details */}
                <div className="absolute inset-0 bg-luxury-beige-950/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-8 z-10">
                  {/* Top features tag */}
                  <div className="flex flex-col space-y-2">
                    <p className="text-[10px] font-sans tracking-[0.25em] text-luxury-beige-300 uppercase">
                      Incluye funciones:
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {example.features.map((feat, i) => (
                        <span key={i} className="text-[9px] font-sans text-white bg-white/10 px-2 py-1 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-luxury-beige-300" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Middle interactive Trigger Button */}
                  <div className="flex justify-center items-center my-auto">
                    <button
                      onClick={() => onSelectExample(example)}
                      className="px-6 py-3 bg-white hover:bg-luxury-beige-200 text-luxury-beige-950 text-xs font-sans uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 border border-white cursor-pointer shadow-lg"
                    >
                      <Eye className="w-4 h-4 text-luxury-beige-700" />
                      <span>Ver Demo en Vivo</span>
                    </button>
                  </div>

                  {/* Micro branding label */}
                  <p className="text-[8px] tracking-[0.25em] text-luxury-beige-400 uppercase font-sans text-center">
                    InvitaOnline Premium Template
                  </p>
                </div>
              </div>

              {/* Bottom text description */}
              <div className="p-6 bg-white border-t border-luxury-beige-200/30 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base text-luxury-beige-900 font-medium tracking-wide">
                    {example.title}
                  </h3>
                  <p className="font-sans text-[10px] text-luxury-beige-500 mt-1 uppercase tracking-widest">
                    {example.category} · Premium Edition
                  </p>
                </div>
                <button
                  onClick={() => onSelectExample(example)}
                  className="p-2.5 rounded-full bg-luxury-beige-100 group-hover:bg-luxury-beige-900 group-hover:text-white text-luxury-beige-700 transition-all duration-300"
                  aria-label="Ver detalles"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Informative Help Guide Callout */}
        <div className="mt-16 bg-white border border-luxury-beige-200/50 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 rounded-[2rem]">
          <div className="flex items-center space-x-4">
            <span className="text-2xl">✨</span>
            <div>
              <h4 className="font-serif text-base text-luxury-beige-900 font-medium">¿Quieres algo único que refine el estatus de tu evento?</h4>
              <p className="font-copy text-xs text-luxury-beige-700 font-light mt-1">Nuestros diseñadores configuran los colores, textos y portadas para que reflejen tu personalidad.</p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('precios');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-sans text-xs uppercase tracking-widest text-luxury-beige-900 border-b border-luxury-beige-800 hover:text-luxury-beige-600 hover:border-luxury-beige-500 pb-0.5 transition-colors cursor-pointer"
          >
            Ver paquetes disponibles
          </button>
        </div>
      </div>
    </section>
  );
}
