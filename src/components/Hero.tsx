import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Smartphone, Heart, Calendar, MapPin, Music } from 'lucide-react';
import { HERO_IMAGE } from '../data';

interface HeroProps {
  onVerEjemplosClick: () => void;
  onSolicitarClick: () => void;
}

export default function Hero({ onVerEjemplosClick, onSolicitarClick }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 395,
    hours: 8,
    minutes: 27,
    seconds: 57,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Dynamic countdown calculation leading to May 30th 2027, asMay 30th 2026 was the date in the screenshot
    const targetDate = new Date('2027-05-30T17:00:00');
    
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 395, hours: 8, minutes: 27, seconds: 57 });
      }
    };
    
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://res.cloudinary.com/dhs8skhqm/video/upload/v1782263468/AThousandYears_pjdjzt.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio playback failed initially (interaction blocker):", err);
        // Force visual play state anyway
        setIsPlaying(true);
      });
    }
  };
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
            whileHover={{ y: -3 }}
            className="relative z-10 w-full max-w-[340px] md:max-w-[380px] bg-[#1a1917] p-2.5 rounded-[3.2rem] shadow-[0_25px_60px_-15px_rgba(40,32,25,0.35)] border-4 border-[#c5b097]/40 ring-1 ring-black/5"
          >
            {/* Elegant physical gold/silver smartphone border accent inside */}
            <div className="absolute inset-2 border border-[#c5b097]/15 rounded-[2.8rem] pointer-events-none z-20" />

            {/* Elegant camera slot notch of mock phone */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-between px-3.5 shadow-md">
              <div className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-800" />
              <div className="w-10 h-1 bg-neutral-800 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40" />
            </div>

            {/* Floating "Nuevo sistema de confirmación de asistencia" elegant black tape ribbon */}
            <div className="absolute -left-10 md:-left-12 top-11 z-40 bg-[#080808] text-white border-y border-stone-800 shadow-[0_12px_24px_rgba(0,0,0,0.5)] py-2.5 px-4 select-none transform -rotate-3 hover:rotate-0 transition-transform duration-300 max-w-[210px] rounded-md ring-1 ring-white/10">
              <div className="flex items-center gap-2.5">
                <div className="text-left">
                  <p className="font-sans font-bold text-[8px] uppercase tracking-wider text-white/50 leading-none">Nuevo sistema de</p>
                  <p className="font-sans font-black text-[11px] uppercase tracking-wide text-white mt-1 leading-none">confirmación</p>
                </div>
                <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/35 border border-white/20">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Simulated Live Frame Screen with edge-to-edge couple picture background */}
            <div className="relative rounded-[2.6rem] overflow-hidden aspect-[9/19.2] bg-stone-950 flex flex-col justify-between pt-10 pb-4 px-4.5 selection:bg-none select-none h-full w-full">
              
              {/* Background portrait of the couple taking the whole screen */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <img
                  src="/wedding_portrait_1781994427687.jpg"
                  alt="Andrea & Josue"
                  className="w-full h-full object-cover brightness-[0.75] contrast-[1.05]"
                  referrerPolicy="no-referrer"
                  decoding="async"
                />
                {/* Custom vignette gradients exactly mimicking the original photo's ambient depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35" />
              </div>

              {/* iOS Live Battery/Time Overlay inside glass */}
              <div className="absolute top-1.5 left-0 right-0 px-6.5 flex justify-between items-center text-white/80 z-30 text-[9px] font-sans font-semibold tracking-wider pointer-events-none select-none">
                <span>4:41</span>
                <div className="flex items-center gap-1">
                  {/* Signal bars */}
                  <svg className="w-2.5 h-2.5 text-white/80 fill-white/80" viewBox="0 0 24 24">
                    <path d="M2 22h20V2z" />
                  </svg>
                  {/* Wifi bars */}
                  <svg className="w-2.5 h-2.5 text-white/80" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2.5">
                    <path d="M12 20h.01M8.5 16.5a5 5 0 017 0M5 13a10 10 0 0114 0" />
                  </svg>
                  {/* Battery battery */}
                  <div className="w-4 h-2.5 border border-white/70 rounded-xs p-[1px] flex items-center ml-0.5">
                    <div className="w-2 h-full bg-white rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Top spacer for camera slot notch */}
              <div className="h-4 relative z-10" />

              {/* Central Hollow Rectangle Frame containing Bride & Groom names */}
              <div className="border border-white/40 p-4.5 pt-5 pb-5 text-center bg-black/15 backdrop-blur-[0.5px] rounded-xs mt-6 mb-3 relative z-10 transition-all hover:border-white/70 hover:bg-black/20 duration-300">
                
                {/* Elegant botanical leaf branch SVG mimicking original layout */}
                <svg className="w-24 h-7 text-white mx-auto mb-2 opacity-95 hover:scale-105 transition-transform" viewBox="0 0 160 60" fill="currentColor">
                  {/* Stem line */}
                  <path d="M15,38 Q80,38 145,38" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  {/* Leaf elements */}
                  <path d="M30,38 C27,33 27,27 33,24 C38,27 38,33 35,38 Z" fill="white" />
                  <path d="M50,38 C47,31 49,23 56,21 C61,23 60,31 55,38 Z" fill="white" />
                  <path d="M70,38 C67,29 71,20 79,20 C83,23 81,30 75,38 Z" fill="white" />
                  <path d="M130,38 C133,33 133,27 127,24 C122,27 122,33 125,38 Z" fill="white" />
                  <path d="M110,38 C113,31 111,23 104,21 C99,23 100,31 105,38 Z" fill="white" />
                  <circle cx="43" cy="29" r="1.5" fill="white" />
                  <circle cx="63" cy="26" r="1.5" fill="white" />
                  <circle cx="87" cy="26" r="1.5" fill="white" />
                  <circle cx="107" cy="29" r="1.5" fill="white" />
                </svg>

                {/* Main serif names */}
                <h3 className="font-serif text-xl sm:text-2xl text-white tracking-[0.08em] uppercase leading-none mb-2.5 font-light">
                  ANDREA & JOSUE
                </h3>
                
                {/* Subtitle with decorative hearts */}
                <p className="font-sans text-[7.5px] uppercase tracking-[0.25em] text-stone-200 flex items-center justify-center gap-1 font-semibold leading-none">
                  <span className="text-white text-[9px]">♥</span> 30.05.26 | NUESTRA BODA <span className="text-white text-[9px]">♥</span>
                </p>
              </div>

              {/* Dynamic Live Ticking Countdown */}
              <div className="grid grid-cols-4 gap-1 text-center text-white relative z-10 py-2 border-t border-b border-white/10 mx-1">
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-light tracking-tight block leading-tight">{timeLeft.days}</span>
                  <span className="font-sans text-[6px] md:text-[7px] uppercase tracking-widest text-[#eae6e2] block leading-none mt-0.5">Días</span>
                </div>
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-light tracking-tight block leading-tight">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="font-sans text-[6px] md:text-[7px] uppercase tracking-widest text-[#eae6e2] block leading-none mt-0.5">Horas</span>
                </div>
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-light tracking-tight block leading-tight">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="font-sans text-[6px] md:text-[7px] uppercase tracking-widest text-[#eae6e2] block leading-none mt-0.5">Minutos</span>
                </div>
                <div>
                  <span className="font-serif text-2xl md:text-3xl font-light tracking-tight block leading-tight">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  <span className="font-sans text-[6px] md:text-[7px] uppercase tracking-widest text-[#eae6e2] block leading-none mt-0.5">Segundos</span>
                </div>
              </div>

              {/* Fully interactive Music control matching: Música ───> Playbar */}
              <div 
                onClick={toggleMusic}
                className="flex items-center justify-between px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white cursor-pointer hover:bg-black/55 transition-all relative z-10 mx-auto w-full max-w-[210px] my-3 active:scale-95 duration-150 shadow-md hover:border-white/20 select-none group"
                title="Tocar Música"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-sans text-[8.5px] font-bold uppercase tracking-[0.2em] text-[#f2ede7] group-hover:text-white transition-colors">Música</span>
                  <span className="text-stone-300 font-light text-[9px] tracking-widest">─────→</span>
                </div>
                <div className="flex items-center gap-1">
                  {isPlaying ? (
                    <div className="flex items-end gap-[2px] h-3.5 select-none w-5 justify-center">
                      <span className="w-[1.5px] h-2 bg-white rounded-full animate-bounce" style={{ animationDuration: '0.6s', animationDelay: '0.1s' }} />
                      <span className="w-[1.5px] h-3.5 bg-white rounded-full animate-bounce" style={{ animationDuration: '0.4s', animationDelay: '0s' }} />
                      <span className="w-[1.5px] h-2 bg-white rounded-full animate-bounce" style={{ animationDuration: '0.7s', animationDelay: '0.3s' }} />
                      <span className="w-[1.5px] h-1.5 bg-white rounded-full animate-bounce" style={{ animationDuration: '0.5s', animationDelay: '0.15s' }} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-[2px] select-none h-3.5 justify-center w-5">
                      <span className="w-[1.5px] h-3 bg-stone-300/60 rounded-full" />
                      <span className="w-[1.5px] h-1 bg-stone-300/60 rounded-full" />
                      <span className="w-[1.5px] h-2 rounded-full border border-stone-300/60" />
                      {/* Play arrow mini */}
                      <svg className="w-1.5 h-1.5 text-stone-200 fill-stone-200 ml-0.5 animate-pulse" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" stroke="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* RSVP Direct Testing Button inside Screen */}
              <button 
                onClick={onVerEjemplosClick}
                className="w-full py-2 bg-white hover:bg-[#FAF9F6] text-stone-900 font-sans text-[8px] font-bold uppercase tracking-[0.2em] rounded-md transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer relative z-10 hover:translate-y-[-1px] hover:shadow-lg active:scale-98 duration-150 mt-auto"
              >
                <Calendar className="w-2.5 h-2.5 text-stone-900" />
                <span>Confirmar Asistencia</span>
              </button>

              {/* Simulated Safari Search URL Bar & iOS Action Controls */}
              <div className="mt-3.5 pt-1.5 border-t border-white/10 flex flex-col gap-1.5 w-full relative z-10 shrink-0">
                
                {/* Search capsulated block with private secure lock */}
                <div 
                  onClick={onVerEjemplosClick}
                  className="flex items-center justify-between px-3.5 py-1 bg-neutral-900/65 backdrop-blur-md rounded-lg text-[8.5px] text-stone-300 w-full border border-white/5 shadow-inner cursor-pointer hover:bg-neutral-900/80 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <svg className="w-2.5 h-2.5 text-stone-300/70 fill-stone-300/70" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm10 14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V10c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v10z" />
                    </svg>
                    <span className="font-sans text-[8.5px] tracking-wide font-light text-stone-300/95">invitaonline.mx</span>
                  </div>
                  {/* Refresh icon */}
                  <svg className="w-2.5 h-2.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.2 16.13M21 12h-4H21z" />
                  </svg>
                </div>

                {/* Simulated Safari Navigation Footnote Controls */}
                <div className="flex items-center justify-between px-4 text-stone-400 text-xs shrink-0 pt-0.5">
                  <span className="text-base font-light hover:text-white cursor-pointer transition-colors leading-none select-none">‹</span>
                  <span className="text-base font-light text-stone-600 select-none leading-none">›</span>
                  
                  {/* Share action sheet */}
                  <svg className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" onClick={onVerEjemplosClick}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V3m0 0l3 3m-3-3L9 6" />
                  </svg>
                  
                  {/* Open book */}
                  <svg className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" onClick={onVerEjemplosClick}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  
                  {/* Two tabs squares */}
                  <svg className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" onClick={onVerEjemplosClick}>
                    <rect x="3" y="3" width="12" height="12" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="9" y="9" width="12" height="12" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Simulated Swipe up bottom indicator bar */}
                <div className="w-20 h-[3.5px] bg-white mx-auto rounded-full mt-1.5 opacity-65" />
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
