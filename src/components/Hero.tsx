import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Smartphone, Heart, Calendar, MapPin, Music } from 'lucide-react';
import { HERO_IMAGE } from '../data';

interface HeroProps {
  onVerEjemplosClick: () => void;
  onSolicitarClick: () => void;
}

export default function Hero({ onVerEjemplosClick, onSolicitarClick }: HeroProps) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-luxury-beige-100 via-luxury-beige-50 to-luxury-beige-100">
      {/* Decorative subtle background shapes */}
      <div className="absolute top-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-luxury-beige-200/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-luxury-beige-300/10 blur-[120px] pointer-events-none" />

      {/* Floating elegant accents (stars, dots) */}
      <div className="absolute top-1/4 left-10 md:left-24 animate-bounce pointer-events-none" style={{ animationDuration: '4s' }}>
        <Sparkles className="w-4 h-4 text-luxury-beige-300 opacity-60" />
      </div>
      <div className="absolute top-2/3 right-10 md:right-24 animate-bounce pointer-events-none" style={{ animationDuration: '5s' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        >
          <svg className="w-6 h-6 text-luxury-beige-400 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2L15 9H22L16 13L18 20L12 16L6 20L8 13L2 9H9L12 2Z" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md border border-luxury-beige-300/50 px-4 py-1.5 rounded-full mb-8 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-luxury-beige-500 fill-luxury-beige-200" />
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-luxury-beige-700">
              Templates personalizados
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-luxury-beige-900 leading-[1.1] mb-6"
          >
            Creamos Invitaciones <br />
            <span className="font-serif italic font-light text-luxury-beige-500">Digitales Inolvidables</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-base md:text-lg text-luxury-beige-700 font-light max-w-xl leading-relaxed mb-10"
          >
            Diseños elegantes para bodas, XV años, cumpleaños y cualquier evento especial.
            Comparte tu invitación por WhatsApp en segundos con mapas, música y confirmación en tiempo real.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onSolicitarClick}
              className="w-full sm:w-auto px-8 py-4 bg-luxury-beige-900 hover:bg-luxury-beige-800 text-white font-sans text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-luxury-beige-900/10 hover:translate-y-[-2px] cursor-pointer"
            >
              Solicitar Invitación
            </button>
            <button
              onClick={onVerEjemplosClick}
              className="w-full sm:w-auto px-8 py-4 bg-white/40 hover:bg-white/80 backdrop-blur-md text-luxury-beige-900 border border-luxury-beige-300 font-sans text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:translate-y-[-2px] cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Ver Ejemplos</span>
              <ArrowRight className="w-3.5 h-3.5 text-luxury-beige-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Brand highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-14 pt-8 border-t border-luxury-beige-200/50 grid grid-cols-3 gap-8 w-full max-w-md"
          >
            <div>
              <p className="font-serif text-2xl font-light text-luxury-beige-800">100%</p>
              <p className="font-sans text-[10px] uppercase tracking-wider text-luxury-beige-500 mt-1">Ecológico</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-light text-luxury-beige-800">2-3 Días</p>
              <p className="font-sans text-[10px] uppercase tracking-wider text-luxury-beige-500 mt-1">Entrega</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-light text-luxury-beige-800">5 ★★★★★</p>
              <p className="font-sans text-[10px] uppercase tracking-wider text-luxury-beige-500 mt-1">Opiniones</p>
            </div>
          </motion.div>
        </div>

        {/* Visual Mockup Area */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          {/* Circular textured backplate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-luxury-beige-300/40 animate-spin"
            style={{ animationDuration: '40s' }}
          />

          {/* Main Mockup Image with Framer Motion hover and entrance */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="relative z-10 w-full max-w-[340px] md:max-w-[380px] bg-white p-3 rounded-[3rem] shadow-2xl shadow-luxury-beige-900/15 border border-luxury-beige-200/50"
          >
            {/* Elegant camera slot of mock phone */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
              <div className="w-12 h-1 bg-neutral-800 rounded-full" />
              <div className="w-2 h-2 rounded-full bg-neutral-900" />
            </div>

             {/* Simulated Live Frame Screen */}
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[9/19] bg-[#FAF9F6] border border-luxury-beige-200/50 flex flex-col justify-between py-6 px-4 selection:bg-none select-none h-full w-full">
              {/* Subtle ornamental corners inside screen */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-luxury-beige-300/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-luxury-beige-300/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-luxury-beige-300/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-luxury-beige-300/40 pointer-events-none" />

              {/* Falling leaves / sparkles simulation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 opacity-70">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, x: 20 + i * 40, rotate: 0, opacity: 0.3 }}
                    animate={{
                      y: 500,
                      x: 20 + i * 40 + Math.sin(i) * 20,
                      rotate: 360,
                    }}
                    transition={{
                      duration: 8 + i * 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 1.2,
                    }}
                    className="absolute w-2 h-1.5 bg-luxury-beige-300 rounded-full bg-opacity-40"
                    style={{ transformOrigin: 'center' }}
                  />
                ))}
              </div>

              {/* Invitation Header */}
              <div className="text-center pt-2 relative z-10 shrink-0">
                <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-luxury-beige-500 block mb-0.5 font-medium">Nuestra Boda</span>
                <div className="w-10 h-[1px] bg-luxury-beige-300 mx-auto my-1" />
              </div>

              {/* Elegant Arched Frame containing the wedding portrait */}
              <div className="relative my-auto flex justify-center items-center z-10 py-1.5 shrink-0">
                <motion.div 
                  className="relative w-[150px] h-[190px] rounded-t-full overflow-hidden border-[3px] border-luxury-beige-200/90 shadow-lg shadow-luxury-beige-800/10 bg-luxury-beige-100"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/wedding_portrait_1781994427687.jpg"
                    alt="Sofía & Alejandro"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Delicate gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Embedded floating tiny heart */}
                  <div className="absolute bottom-2.5 right-2.5 bg-white/80 backdrop-blur-sm p-1 rounded-full border border-luxury-beige-200 shadow-sm">
                    <Heart className="w-2.5 h-2.5 text-luxury-beige-500 fill-luxury-beige-400" />
                  </div>
                </motion.div>
              </div>

              {/* Bride & Groom names of invitation */}
              <div className="text-center z-10 relative shrink-0">
                <h3 className="font-serif text-lg text-luxury-beige-950 tracking-tight leading-tight mb-0.5 font-medium">
                  Sofía & Alejandro
                </h3>
                <p className="font-sans text-[8px] uppercase tracking-widest text-luxury-beige-500 font-light leading-none">
                  Sábado, Sep 14, 2026 · Mérida
                </p>
              </div>

              {/* Interactive buttons simulation at bottom of screen */}
              <div className="flex flex-col gap-1.5 px-1 pb-1 relative z-10 shrink-0">
                {/* Simulated Location & Music Indicator */}
                <div className="flex items-center justify-between px-1 mb-1">
                  <span className="font-sans text-[7px] text-luxury-beige-400 flex items-center gap-0.5">
                    <MapPin className="w-2 h-2 text-luxury-beige-500" /> Templo Santo Domingo
                  </span>
                  <span className="font-sans text-[7px] text-luxury-beige-400 flex items-center gap-0.5 animate-pulse">
                    <Music className="w-2 h-2 text-luxury-beige-500 animate-spin" style={{ animationDuration: '4s' }} /> Música Activa
                  </span>
                </div>

                {/* Primary RSVP pill button */}
                <button 
                  onClick={onVerEjemplosClick}
                  className="w-full py-1.5 bg-luxury-beige-900 hover:bg-luxury-beige-800 text-white font-sans text-[8px] font-medium uppercase tracking-[0.15em] rounded-md transition-colors shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-2.5 h-2.5" />
                  <span>Confirmar Asistencia</span>
                </button>

                {/* Secondary details pill buttons */}
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    onClick={onVerEjemplosClick}
                    className="py-1 border border-luxury-beige-300 text-luxury-beige-700 bg-white hover:bg-luxury-beige-50 font-sans text-[7px] font-medium uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-0.5 cursor-pointer"
                  >
                    <span>📍 Ubicación</span>
                  </button>
                  <button 
                    onClick={onVerEjemplosClick}
                    className="py-1 border border-luxury-beige-300 text-luxury-beige-700 bg-white hover:bg-luxury-beige-50 font-sans text-[7px] font-medium uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-0.5 cursor-pointer"
                  >
                    <span>🎁 Regalos</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick action helper overlay */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute -right-6 bottom-16 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-luxury-beige-200 shadow-xl flex items-center space-x-3 max-w-[180px] z-20 hover:scale-105 transition-transform cursor-pointer"
              onClick={onVerEjemplosClick}
            >
              <div className="p-2 rounded-full bg-luxury-beige-100 text-luxury-beige-600">
                <Smartphone className="w-4 h-4 animate-pulse" />
              </div>
              <div className="text-left">
                <p className="font-sans font-bold text-[10px] text-luxury-beige-900 leading-tight">Interactiva</p>
                <p className="font-sans text-[8px] text-luxury-beige-500 mt-0.5 uppercase tracking-wide">Clic para Probar</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating flower sketch or decorative circle back of the phone */}
          <div className="absolute -left-12 bottom-6 w-36 h-36 bg-gradient-to-tr from-luxury-beige-200/50 to-white/10 rounded-full blur-2xl -z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
