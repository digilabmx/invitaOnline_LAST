import React, { useState } from 'react';
import { motion } from 'motion/react';
import { EXAMPLES } from '../data';
import { Eye, ChevronRight, Sparkles } from 'lucide-react';
import { InvitationExample } from '../types';

interface PreviewDetails {
  names: string;
  date: string;
  location: string;
  countdown: string;
  serif: boolean;
  themeStyle: string;
}

const PREVIEW_DATA: Record<string, PreviewDetails> = {
  'ex-starry-night-celestial': {
    names: 'Valentina & Gabriel',
    date: '15.11.2027',
    location: 'Valle de Bravo',
    countdown: '04:12:30:15',
    serif: true,
    themeStyle: 'text-cyan-100 font-serif font-light tracking-wide',
  },
  'ex-mexican-hacienda': {
    names: 'Sofía & Alejandro',
    date: '18.10.2027',
    location: 'S.M. Allende',
    countdown: '15:08:45:20',
    serif: true,
    themeStyle: 'text-amber-100 font-serif font-medium tracking-tight',
  },
  'ex-botanical-luxury': {
    names: 'Isabella & Mateo',
    date: '05.06.2027',
    location: 'Campiña Toscana',
    countdown: '22:18:15:04',
    serif: true,
    themeStyle: 'text-emerald-100 font-serif italic tracking-wide',
  },
  'ex-rolls-royce-dior': {
    names: 'Victoria & Sebastián',
    date: '12.12.2027',
    location: 'Lomas de Chapultepec',
    countdown: '45:14:20:11',
    serif: true,
    themeStyle: 'text-stone-100 font-serif font-light tracking-[0.05em]',
  },
  'ex-cartier-luxury': {
    names: 'Sofía & Alejandro',
    date: '14.09.2027',
    location: 'San Hipólito, CDMX',
    countdown: '08:11:10:02',
    serif: true,
    themeStyle: 'text-amber-200 font-serif tracking-[0.02em]',
  },
  'ex-1': {
    names: 'Sofía & Alejandro',
    date: '27.11.2027',
    location: 'Hacienda Alamar',
    countdown: '30:05:12:44',
    serif: true,
    themeStyle: 'text-[#FAF9F6] font-serif tracking-tight',
  },
  'ex-deep-gold': {
    names: 'Andrea & Juan',
    date: '20.11.2027',
    location: 'Valle Alto, NL',
    countdown: '12:22:05:50',
    serif: true,
    themeStyle: 'text-amber-200 font-serif font-medium tracking-wide',
  },
  'ex-monochrome-minimalist': {
    names: 'Andrés & Paulete',
    date: '08.10.2027',
    location: 'Valle de Guadalupe',
    countdown: '19:09:18:12',
    serif: false,
    themeStyle: 'text-white font-sans font-normal tracking-[0.1em] uppercase',
  },
  'ex-2': {
    names: 'Valentina',
    date: '12.09.2027',
    location: 'Salón Prado Real',
    countdown: '41:16:55:08',
    serif: false,
    themeStyle: 'text-pink-100 font-sans tracking-wide uppercase',
  },
  'ex-3': {
    names: 'Bautizo Mateo',
    date: '24.10.2027',
    location: 'Parroquia San José',
    countdown: '06:04:25:00',
    serif: false,
    themeStyle: 'text-stone-100 font-serif italic tracking-wide',
  },
  'ex-4': {
    names: 'Santiago - 40 Años',
    date: '05.12.2027',
    location: 'Club Hípico CDMX',
    countdown: '52:10:35:14',
    serif: false,
    themeStyle: 'text-stone-200 font-mono tracking-widest uppercase',
  },
};

export default function Gallery() {
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
          {filteredExamples.map((example) => {
            const preview = PREVIEW_DATA[example.id] || {
              names: 'Invitados de Honor',
              date: 'Sábado, 2027',
              location: 'Lugar Privado',
              countdown: '00:00:00:00',
              serif: false,
              themeStyle: 'text-white font-sans'
            };
            const [dd, hh, mm, ss] = preview.countdown.split(':');

            return (
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
                <div className="relative w-full h-[360px] overflow-hidden bg-gradient-to-tr from-stone-950 via-stone-900 to-luxury-beige-200 flex items-center justify-center p-4">
                  {/* Background blurred cover */}
                  <div className="absolute inset-0">
                    <img
                      src={example.image}
                      alt={example.title}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-all duration-700 select-none blur-[4px] scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/45" />
                  </div>

                  {/* Floating Realistic Smartphone Device Mockup showing the actual template on a mobile screen */}
                  <div className="relative w-[170px] h-[310px] bg-stone-950 border-[5px] border-stone-850 rounded-[32px] shadow-2xl overflow-hidden flex flex-col z-10 transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1">
                    {/* Speaker and Camera Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-stone-900 rounded-full flex items-center justify-center z-20">
                      <div className="w-1.5 h-1.5 rounded-full bg-stone-950 mr-1.5" />
                      <div className="w-7 h-[2px] bg-stone-950 rounded-full" />
                    </div>
                    
                    {/* Screen Content representing mobile view */}
                    <div className="relative w-full h-full overflow-hidden bg-stone-950 flex flex-col justify-between select-none">
                      {/* Scaled Template Background Image */}
                      <div className="absolute inset-0">
                        <img
                          src={example.image}
                          alt="Vista Móvil"
                          className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        {/* Elegant luxury background gradient for ultimate readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/85" />
                      </div>

                      {/* Status bar */}
                      <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-3 z-10">
                        <span className="text-[7px] text-white/90 font-sans font-medium tracking-tight">12:00</span>
                        <div className="flex items-center space-x-1 text-[7px] text-white/90">
                          <span>📶</span>
                          <span>🔋</span>
                        </div>
                      </div>

                      {/* Interactive preview UI layout overlay */}
                      <div className="relative z-10 flex flex-col justify-end h-full p-2.5 pb-4">
                        {/* Live Demo Pulsing Indicator Badge */}
                        <div className="absolute top-7 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-stone-950 font-sans text-[4.5px] font-bold tracking-widest uppercase py-0.5 px-1.5 rounded-full shadow-md flex items-center gap-1 animate-pulse">
                          <span className="w-1 h-1 rounded-full bg-stone-950" />
                          <span>MUESTRA DIGITAL</span>
                        </div>

                        {/* Celebrant Info Panel */}
                        <div className="text-center mb-1 mt-auto">
                          {/* Names */}
                          <h4 className={`text-[11px] font-medium leading-tight text-center px-1 ${preview.themeStyle}`}>
                            {preview.names}
                          </h4>
                          
                          {/* Micro gold separator */}
                          <div className="flex items-center justify-center my-1 gap-1">
                            <span className="h-[0.5px] w-3 bg-white/20" />
                            <span className="text-[4px] text-[#D4AF37]">✦</span>
                            <span className="h-[0.5px] w-3 bg-white/20" />
                          </div>

                          {/* Date and Location info */}
                          <p className="text-[5.5px] font-sans text-stone-200 tracking-widest uppercase font-medium">
                            {preview.date}
                          </p>
                          <p className="text-[5px] font-sans text-stone-400/90 tracking-wide mt-0.5">
                            {preview.location}
                          </p>
                        </div>

                        {/* Beautifully Crafted Miniature Countdown Timer Card */}
                        <div className="bg-black/45 backdrop-blur-md border border-white/10 rounded-lg p-1 flex justify-around items-center gap-0.5 mt-1.5 mx-0.5 shadow-lg shadow-black/40">
                          <div className="flex flex-col items-center">
                            <span className="text-[7.5px] font-mono font-bold text-white leading-none">{dd}</span>
                            <span className="text-[3.5px] font-sans text-stone-400 uppercase tracking-widest">Días</span>
                          </div>
                          <span className="text-[7px] font-mono text-white/30 leading-none">:</span>
                          <div className="flex flex-col items-center">
                            <span className="text-[7.5px] font-mono font-bold text-white leading-none">{hh}</span>
                            <span className="text-[3.5px] font-sans text-stone-400 uppercase tracking-widest">Hrs</span>
                          </div>
                          <span className="text-[7px] font-mono text-white/30 leading-none">:</span>
                          <div className="flex flex-col items-center">
                            <span className="text-[7.5px] font-mono font-bold text-white leading-none">{mm}</span>
                            <span className="text-[3.5px] font-sans text-stone-400 uppercase tracking-widest">Min</span>
                          </div>
                          <span className="text-[7px] font-mono text-white/30 leading-none">:</span>
                          <div className="flex flex-col items-center">
                            <span className="text-[7.5px] font-mono font-bold text-amber-400 leading-none animate-pulse">{ss}</span>
                            <span className="text-[3.5px] font-sans text-stone-400 uppercase tracking-widest">Seg</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Glowing borders */}
                      <div className="absolute inset-0 border border-white/10 rounded-[26px] pointer-events-none font-sans" />
                    </div>
                  </div>

                {/* Ultimate Overlay Blur and Details */}
                <div className="absolute inset-0 bg-luxury-beige-950/90 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-8 z-20">
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
                      onClick={() => {
                        window.location.hash = example.demoUrl;
                      }}
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
                  onClick={() => {
                    window.location.hash = example.demoUrl;
                  }}
                  className="p-2.5 rounded-full bg-luxury-beige-100 group-hover:bg-luxury-beige-900 group-hover:text-white text-luxury-beige-700 transition-all duration-300"
                  aria-label="Ver detalles"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )})}
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
