import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Calendar, MapPin, Clock, Gift, Users, Music, 
  CheckCircle, Copy, ChevronDown, ChevronRight, ChevronLeft, 
  Sparkles, VolumeX, Volume2, Info, Share2, Mail, ExternalLink,
  ArrowLeft
} from 'lucide-react';
import SparkleCanvas from './SparkleCanvas';

export default function TemplateBoda2() {
  // Envelope open states
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGoldBurst, setShowGoldBurst] = useState(false);

  // Gallery slider control
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Custom states for RSVP
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [allergies, setAllergies] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completedRsvp, setCompletedRsvp] = useState(false);
  const [simulatedMessage, setSimulatedMessage] = useState('');

  // Toast status notification
  const [toast, setToast] = useState<string | null>(null);

  // Countdown clock state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set the target date: Sept 20, 2026 (Or dynamic delta)
  const targetDate = new Date('2026-09-20T18:00:00').getTime();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => prev === msg ? null : prev);
    }, 4000);
  };

  const handleToggleMusic = () => {
    if (!audioRef.current) {
      try {
        const audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-romantic-vows-1151.mp3');
        audio.loop = true;
        audioRef.current = audio;
      } catch (err) {
        console.warn("Could not load audio source: ", err);
      }
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(true);
          triggerToast("Música reproduciéndose (Tu navegador requiere interacción previa).");
        });
      }
    }
  };

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
    setShowGoldBurst(true);
    
    // Play audio right away
    handleToggleMusic();

    // Auto terminate gold spark burst after 7 seconds
    setTimeout(() => {
      setShowGoldBurst(false);
    }, 7000);
  };

  const copyDetail = (text: string, label: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => {
            triggerToast(`¡${label} copiado con éxito al portapapeles!`);
          })
          .catch(() => {
            // Fallback inside promise reject
            fallbackCopy(text, label);
          });
      } else {
        fallbackCopy(text, label);
      }
    } catch (err) {
      fallbackCopy(text, label);
    }
  };

  const fallbackCopy = (text: string, label: string) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand("copy");
      textArea.remove();
      if (success) {
        triggerToast(`¡${label} copiado con éxito!`);
      } else {
        triggerToast(`${label}: ${text}`);
      }
    } catch (e) {
      triggerToast(`${label}: ${text}`);
    }
  };

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      triggerToast("Por favor ingresa un nombre válido.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const msg = `*CONFIRMACIÓN DE ASISTENCIA BODA*\n\n¡Hola Andrea y Juan! 👋\n\nConfirmamos con mucha emoción nuestra asistencia a su boda:\n\n👤 *Invitado:* ${guestName}\n🎫 *Lugares solicitados:* ${guestCount} pases\n🍽️ *Alergias/Notas:* ${allergies || 'Ninguna'}\n\n✨ ¡Nos vemos pronto para alzar la copa por ustedes!`;
      setSimulatedMessage(msg);
      setSubmitting(false);
      setCompletedRsvp(true);
    }, 1200);
  };

  const sendWhatsApp = () => {
    const encoded = encodeURIComponent(simulatedMessage);
    window.open(`https://wa.me/524446500910?text=${encoded}`, '_blank');
  };

  const memoriesPhotos = [
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=700&fm=webp',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=700&fm=webp',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=700&fm=webp',
  ];

  return (
    <div className="relative min-h-screen bg-[#070707] font-sans text-stone-300 overflow-x-hidden selection:bg-[#d4b78f]/30 selection:text-[#d4b78f]">
      
      {/* Floating back controller to close demo view */}
      <a
        href="#"
        className="fixed top-5 left-5 z-45 bg-stone-900/90 hover:bg-stone-800 text-white p-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-stone-800 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 group"
        title="Volver al catálogo"
      >
        <ArrowLeft className="w-4 h-4 text-stone-300 group-hover:-translate-x-0.5 transition-transform" />
      </a>

      {/* Luxury Golden Sparkles Canopy */}
      {envelopeOpened && <SparkleCanvas />}

      {/* Floating Audio Player Widget */}
      {envelopeOpened && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 right-6 z-50 flex items-center bg-[#1c1a17]/90 backdrop-blur-md border border-[#d4b78f]/40 p-2.5 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
        >
          <button
            onClick={handleToggleMusic}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c5a880] flex items-center justify-center text-stone-950 shadow-inner cursor-pointer"
            aria-label="Toggle background music"
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse text-stone-950" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-950" />
            )}
          </button>
          
          {isPlaying && (
            <div className="flex items-center space-x-1.5 px-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <marquee className="font-sans text-[8px] uppercase tracking-widest text-[#d4af37] w-24">
                Andrea & Juan · Piano de Boda
              </marquee>
            </div>
          )}
        </motion.div>
      )}

      {/* Dynamic Screen Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-55 bg-stone-900 border border-[#d4af37]/30 text-stone-100 px-5 py-3 rounded-full flex items-center space-x-3 text-xs shadow-2xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!envelopeOpened ? (
          /* ================= ENVELOPE (SOBRE) STAGE ================= */
          <motion.div
            key="envelope-view"
            exit={{ opacity: 0, scale: 0.9, y: -45 }}
            transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-40 bg-[#0d0c0b] flex items-center justify-center p-4 overflow-hidden"
          >
            {/* Elegant luxury ambient background details inside envelope stage */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(116,92,63,0.15),_transparent_60%)] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.035),_transparent_50%)] pointer-events-none" />

            {/* Simulated Envelope Container Box */}
            <div className="relative w-full max-w-sm flex flex-col items-center">
              
              {/* Monogram header details */}
              <div className="text-center mb-6">
                <p className="font-serif text-[11px] tracking-[0.35em] text-[#d4af37] uppercase leading-none">INVITACIÓN EXCLUSIVA</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <div className="h-[0.5px] w-8 bg-[#d4af37]/30" />
                  <span className="font-serif italic text-sm text-stone-400">Andrea & Juan</span>
                  <div className="h-[0.5px] w-8 bg-[#d4af37]/30" />
                </div>
              </div>

              {/* Envelope Body (The physical folding card) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full bg-[#121110] border border-[#d4af37]/25 p-8 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.85)] flex flex-col justify-between aspect-[3/4] text-center"
              >
                {/* Thin gold internal margin boundary */}
                <div className="absolute inset-3.5 border border-[#d4af37]/15 rounded-xl pointer-events-none" />
                
                {/* Visual Upper Envelope flap triangles styling */}
                <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-[#181614] to-[#121110] rounded-t-2xl border-b border-[#d4af37]/10" />

                {/* Back flap vector lines represent elegant letter */}
                <div className="my-auto py-4 flex flex-col items-center">
                  {/* Majestic circular monogram crest */}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-[#181715] to-[#11100e] border border-[#d4af37]/45 flex items-center justify-center shadow-lg mb-6 group">
                    <div className="absolute inset-1 rounded-full border border-dashed border-[#d4af37]/20" />
                    {/* Golden embossed wax seal monogram */}
                    <span className="font-serif text-3xl font-extralight text-[#d4af37] tracking-wider relative z-10 select-none">
                      A&J
                    </span>
                    <Heart className="absolute bottom-3.5 w-2 h-2 text-[#d4af37]/60" />
                  </div>

                  <p className="font-serif text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-1 leading-none">NUESTROS INVITADOS</p>
                  <h3 className="font-serif text-lg font-light text-stone-200 tracking-wide max-w-xs leading-normal">
                    Familia y Amigos
                  </h3>
                  
                  <div className="h-[1px] w-14 bg-[#d4af37]/25 my-4" />
                  
                  <p className="font-sans text-[10px] text-stone-400 font-light leading-relaxed max-w-[210px]">
                    El amor verdadero es un camino infinito. Prepárate para alzar tu copa en nuestro enlace.
                  </p>
                </div>

                {/* Open Envelope Trigger */}
                <button
                  onClick={handleOpenEnvelope}
                  className="relative z-10 w-full py-4.5 bg-gradient-to-r from-[#b5942b] via-[#d4af37] to-[#a6821d] hover:brightness-110 active:scale-95 text-stone-950 font-sans text-[11px] font-bold uppercase tracking-[0.22em] rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4 shrink-0 stroke-[2px]" />
                  <span>ABRIR INVITACIÓN</span>
                </button>
              </motion.div>
              
              {/* Device rotation help text */}
              <p className="text-[10px] font-sans text-stone-600 mt-6 tracking-wider">
                Compatible con dispositivos móviles portrait · 2026
              </p>
            </div>
          </motion.div>
        ) : (
          /* ================= MAIN INVITATION WEBPAGE STAGE ================= */
          <motion.div
            key="main-wedding-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center w-full relative z-20"
          >
            {/* Elegant Header Progress Bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#070707] via-[#d4af37] to-[#070707] z-50 pointer-events-none" />

            {/* ================= 1. PORTADA INMERSIVA (MOCKUP EXACT TO SCREENS) ================= */}
            <section className="relative w-full h-[100vh] flex flex-col items-center justify-between overflow-hidden">
              {/* Couple visual backplate cover */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200&fm=webp"
                  alt="Andrea y Juan"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.7] saturate-[0.8]"
                />
                {/* Rich matte black gradients covering top and bottom segments */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/90 via-transparent to-[#070707]" />
              </div>

              {/* Top area elements */}
              <div className="relative pt-16 text-center select-none z-10 px-4">
                <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-[#d4af37]">NUESTRA BODA</p>
                <div className="h-[0.5px] w-12 bg-[#d4af37]/40 mx-auto mt-2" />
                <p className="font-serif text-sm tracking-widest text-[#f3e5ab] mt-3 font-light">20 · SEPTIEMBRE · 2026</p>
              </div>

              {/* Bottom Title area (Direct Match to User Portrait Screenshot) */}
              <div className="relative pb-24 text-center z-10 px-6 w-full max-w-xl">
                {/* Large cursive paired name text */}
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="font-script text-white text-5xl md:text-7xl tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] font-normal mb-2"
                >
                  Andrea & Juan
                </motion.h1>

                {/* Sub title NOS CASAMOS */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="font-serif text-[13px] md:text-base text-stone-200 tracking-[0.35em] uppercase font-light drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]"
                >
                  NOS CASAMOS
                </motion.p>

                {/* Bouncing Chevron point indicators */}
                <div className="flex justify-center mt-6">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    onClick={() => {
                      const el = document.getElementById('historia-invitacion');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-xs flex items-center justify-center cursor-pointer hover:bg-stone-900/60 transition-colors"
                  >
                    <ChevronDown className="w-5 h-5 text-[#d4af37]" />
                  </motion.div>
                </div>
              </div>
            </section>


            {/* ================= 2. ENLACE BIENVENIDA & COUNTDOWN SECTION (DEEP DARK BLACK MATCH) ================= */}
            <section id="historia-invitacion" className="w-full max-w-3xl px-6 py-20 relative text-center">
              
              {/* Decorative side margins lines */}
              <div className="absolute top-0 bottom-0 left-6 w-[0.5px] bg-gradient-to-b from-[#d4af37]/20 via-transparent to-[#d4af37]/20 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-6 w-[0.5px] bg-gradient-to-b from-[#d4af37]/20 via-transparent to-[#d4af37]/20 pointer-events-none" />

              {/* Title & Romantic introductory text inside */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-lg mx-auto mb-14"
              >
                {/* Aesthetic golden flower/star icon */}
                <div className="text-[#d4af37] text-2xl mb-4">✦</div>
                
                {/* Playfair/Italic styled cursive like ¡Estás invitado! */}
                <h2 className="font-serif italic text-3xl md:text-4.5xl text-stone-100 mb-6 drop-shadow-sm font-semibold">
                  ¡Estás invitado!
                </h2>

                <p className="font-sans text-stone-400 font-light text-sm leading-relaxed mb-6">
                  Nos encantaría que seas parte de este momento tan especial para nosotros.<br />
                  ¡Falta poco!
                </p>

                <div className="h-[0.5px] w-24 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto" />
              </motion.div>

              {/* Countdown Circles Structure exactly matching the attached image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-4 gap-4 sm:gap-6 max-w-sm sm:max-w-md mx-auto"
              >
                {/* 1. DÍAS */}
                <div className="flex flex-col items-center">
                  <div className="aspect-square w-16 sm:w-20 rounded-full bg-gradient-to-br from-[#1b1916] to-[#12110f] border border-[#d4af37]/40 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    <span className="font-serif text-lg sm:text-2xl text-stone-100 font-bold">{timeLeft.days}</span>
                  </div>
                  <span className="font-sans text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold mt-3">DÍAS</span>
                </div>

                {/* 2. HOUR */}
                <div className="flex flex-col items-center">
                  <div className="aspect-square w-16 sm:w-20 rounded-full bg-gradient-to-br from-[#1b1916] to-[#12110f] border border-[#d4af37]/40 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    <span className="font-serif text-lg sm:text-2xl text-stone-100 font-bold">{timeLeft.hours}</span>
                  </div>
                  <span className="font-sans text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold mt-3">HORA</span>
                </div>

                {/* 3. MINUTES */}
                <div className="flex flex-col items-center">
                  <div className="aspect-square w-16 sm:w-20 rounded-full bg-gradient-to-br from-[#1b1916] to-[#12110f] border border-[#d4af37]/40 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    <span className="font-serif text-lg sm:text-2xl text-stone-100 font-bold">{timeLeft.minutes}</span>
                  </div>
                  <span className="font-sans text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold mt-3">MINUTOS</span>
                </div>

                {/* 4. SECONDS */}
                <div className="flex flex-col items-center">
                  <div className="aspect-square w-16 sm:w-20 rounded-full bg-gradient-to-br from-[#1b1916] to-[#12110f] border border-[#d4af37]/40 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
                    <span className="font-serif text-lg sm:text-2xl text-stone-100 font-bold">{timeLeft.seconds}</span>
                  </div>
                  <span className="font-sans text-[8px] sm:text-[10px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold mt-3">SEGUNDOS</span>
                </div>
              </motion.div>
            </section>


            {/* ================= 3. NUESTRA HISTORIA / LOVE STORY Timeline ================= */}
            <section className="w-full bg-[#0a0a09] py-24 relative">
              <div className="max-w-3xl mx-auto px-6">
                
                {/* Header text */}
                <div className="text-center mb-16">
                  <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">NUESTRO CAMINO</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-stone-200 tracking-wider">Nuestra Historia de Amor</h2>
                  <div className="h-[1px] w-12 bg-[#d4af37]/40 mx-auto mt-4" />
                </div>

                {/* Interactive Dynamic Milestones layout */}
                <div className="relative border-l border-[#d4af37]/20 pl-6 ml-6 space-y-12 max-w-xl mx-auto">
                  
                  {/* Timeline Node 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    {/* Golden dot indicator */}
                    <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#d4af37] border-4 border-[#070707] shadow-lg" />
                    
                    <span className="font-serif text-xs text-[#d4af37] uppercase tracking-widest block font-semibold mb-1">CÓMO NOS CONOCIMOS</span>
                    <h4 className="font-serif text-lg text-stone-200 mb-2">Un Encuentro Inesperado</h4>
                    <p className="font-sans text-xs text-stone-400 font-light leading-relaxed">
                      Bastó con un café y una tarde lluviosa para que nuestro camino se cruzara sin buscarlo. Lo que inició con una plática casual se convirtió en el inicio de la historia más hermosa que hemos escrito juntos.
                    </p>
                  </motion.div>

                  {/* Timeline Node 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative"
                  >
                    <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#d4af37] border-4 border-[#070707] shadow-lg" />
                    
                    <span className="font-serif text-xs text-[#d4af37] uppercase tracking-widest block font-semibold mb-1">EL NOVIAZGO</span>
                    <h4 className="font-serif text-lg text-stone-200 mb-2">Compartiendo los Sueños</h4>
                    <p className="font-sans text-xs text-stone-400 font-light leading-relaxed">
                      Años de viajes inolvidables, risas incontrolables, retos compartidos y una complicidad que creció día tras día, madurando nuestro cariño hasta darnos cuenta de que no queríamos caminar con nadie más.
                    </p>
                  </motion.div>

                  {/* Timeline Node 3 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative"
                  >
                    <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#d4af37] border-4 border-[#070707] shadow-lg" />
                    
                    <span className="font-serif text-xs text-[#d4af37] uppercase tracking-widest block font-semibold mb-1">LA PROPUESTA</span>
                    <h4 className="font-serif text-lg text-stone-200 mb-2">Un "Sí, Acepto" para Siempre</h4>
                    <p className="font-sans text-xs text-stone-400 font-light leading-relaxed">
                      Bajo la luz del atardecer del muelle, con el sonido suave de las olas y con el corazón latiendo a mil, Juan se arrodillo para hacer la pregunta más bonita, recibiendo la respuesta más feliz.
                    </p>
                  </motion.div>

                </div>

              </div>
            </section>


            {/* ================= 4. PADRES DE LOS NOVIOS (BLESSING CARD) ================= */}
            <section className="w-full py-20 relative bg-[#070707]">
              <div className="max-w-3xl mx-auto px-6 text-center">
                <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">CON LA BENDICIÓN DE NUESTROS PADRES</span>
                <h3 className="font-serif text-xl text-stone-200 mb-12">Nuestros Padres</h3>

                <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto">
                  {/* Bride's Parents */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#11100e] p-6 border border-[#d4af37]/15 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                  >
                    <p className="font-serif text-xs text-[#d4af37] tracking-widest uppercase mb-4">Padres de la Novia</p>
                    <p className="font-serif text-stone-300 text-sm mb-1 leading-snug">Sr. Roberto Benavides</p>
                    <p className="font-serif text-stone-300 text-sm leading-snug">Sra. Clara González</p>
                  </motion.div>

                  {/* Groom's Parents */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="bg-[#11100e] p-6 border border-[#d4af37]/15 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                  >
                    <p className="font-serif text-xs text-[#d4af37] tracking-widest uppercase mb-4">Padres del Novio</p>
                    <p className="font-serif text-stone-300 text-sm mb-1 leading-snug">Sr. Manuel de Jesús Garza</p>
                    <p className="font-serif text-stone-300 text-sm leading-snug">Sra. Gloria María Rodríguez</p>
                  </motion.div>
                </div>
              </div>
            </section>


            {/* ================= 5. DETALLES DEL EVENTO (CEREMONIA & RECEPCION) ================= */}
            <section className="w-full py-24 relative bg-[#0d0c0b]">
              <div className="max-w-4xl mx-auto px-6 text-center">
                
                <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">UBICACIÓN Y DESTINOS</span>
                <h2 className="font-serif text-2xl md:text-3xl text-stone-200 tracking-wider mb-14">Detalles del Evento</h2>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-3xl mx-auto">
                  
                  {/* Church Card */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#141311] border border-[#d4af37]/20 rounded-2xl p-6 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5)] relative"
                  >
                    {/* Visual Gold Corner Brackets */}
                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#d4af37]/35" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#d4af37]/35" />

                    <div>
                      <div className="w-12 h-12 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto mb-5 bg-[#0d0c0b]">
                        <Heart className="w-5 h-5" />
                      </div>
                      <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-3">Ceremonia Religiosa</span>
                      <h3 className="font-serif text-lg text-stone-100 font-semibold mb-2">La Parroquia de San Francisco de Asís</h3>
                      <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mb-6 px-4">
                        Hora: 18:00 hrs <br />
                        Dirección: Av de la Constitución #105, San Luis Potosí, Centro Histórico.
                      </p>
                    </div>

                    <a
                      href="https://maps.google.com/?q=Parroquia+de+San+Francisco+de+Asis+San+Luis+Potosi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 w-full py-2.5 bg-transparent border border-[#d4af37]/35 hover:bg-[#d4af37] hover:text-stone-950 font-sans text-[10px] font-semibold text-[#d4af37] uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Ver Mapa GPS</span>
                    </a>
                  </motion.div>

                  {/* Feast Reception Card */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="bg-[#141311] border border-[#d4af37]/20 rounded-2xl p-6 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5)] relative"
                  >
                    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#d4af37]/35" />
                    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#d4af37]/35" />

                    <div>
                      <div className="w-12 h-12 rounded-full border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto mb-5 bg-[#0d0c0b]">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-3">Recepción y Banquete</span>
                      <h3 className="font-serif text-lg text-stone-100 font-semibold mb-2">Salón Real de las Palomas</h3>
                      <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mb-6 px-4">
                        Hora: 19:30 hrs <br />
                        Dirección: Camino de la Huerta S/N, San Luis Potosí, San Luis Potosí.
                      </p>
                    </div>

                    <a
                      href="https://maps.google.com/?q=Salon+Real+de+las+Palomas+San+Luis+Potosi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 w-full py-2.5 bg-transparent border border-[#d4af37]/35 hover:bg-[#d4af37] hover:text-stone-950 font-sans text-[10px] font-semibold text-[#d4af37] uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Ver Recepción GPS</span>
                    </a>
                  </motion.div>

                </div>

              </div>
            </section>


            {/* ================= 6. NUESTROS RECUERDOS (FOTOGRAFÍAS SLIDER) ================= */}
            <section className="w-full py-24 relative bg-[#070707] border-y border-[#d4af37]/10">
              <div className="max-w-2xl mx-auto px-6 text-center">
                
                <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">GALERÍA DE MOMENTOS</span>
                <h2 className="font-serif text-2xl text-stone-200 tracking-wider mb-12">Nuestros Recuerdos</h2>

                {/* Main frame slider wrapper */}
                <div className="relative aspect-[3/4.2] w-full max-w-sm mx-auto border-[10px] border-[#13110e] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#121110]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activePhotoIdx}
                      src={memoriesPhotos[activePhotoIdx]}
                      alt="Recuerdo de Andrea & Juan"
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover filter brightness-[0.9] saturate-[0.8]"
                    />
                  </AnimatePresence>

                  {/* Custom picture internal gradient framing */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-4 border border-white/10 rounded-2xl pointer-events-none" />

                  {/* Manual Arrow Switches */}
                  <button
                    onClick={() => setActivePhotoIdx((prev) => (prev > 0 ? prev - 1 : memoriesPhotos.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer"
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setActivePhotoIdx((prev) => (prev < memoriesPhotos.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer"
                    aria-label="Next photograph"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Bullets control tracker */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
                    {memoriesPhotos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhotoIdx(i)}
                        className={`w-2 h-2 rounded-full ${activePhotoIdx === i ? 'bg-[#d4af37] w-5' : 'bg-stone-500/50'} transition-all duration-300`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between max-w-sm mx-auto mt-4 px-2 text-[10px] font-sans text-stone-500 uppercase tracking-widest">
                  <span>© Andrea & Juan</span>
                  <span>Amor Infinito 2026</span>
                </div>

              </div>
            </section>


            {/* ================= 7. ITINERARIO DEL GRAN DÍA ================= */}
            <section className="w-full py-24 relative bg-[#090909]">
              <div className="max-w-xl mx-auto px-6 text-center">
                
                <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">CRONOGRAMA</span>
                <h2 className="font-serif text-2xl text-stone-200 tracking-wider mb-14">Itinerario de Celebración</h2>

                <div className="relative border-l border-dashed border-[#d4af37]/35 pl-8 ml-6 text-left space-y-12">
                  
                  {/* Item 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-[#11100e] border border-[#d4af37] flex items-center justify-center">
                      <Clock className="w-3 h-3 text-[#d4af37]" />
                    </div>
                    <span className="font-serif text-xs text-[#d4af37] tracking-widest font-semibold block mb-0.5">18:00 hrs</span>
                    <h4 className="font-serif text-base text-[#faf9f6]">Solemne Ceremonia de Boda</h4>
                    <p className="font-sans text-xs text-stone-400 font-light mt-1">Llegada puntual al templo de San Francisco, comienzo de la santa eucaristía.</p>
                  </motion.div>

                  {/* Item 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-[#11100e] border border-[#d4af37] flex items-center justify-center">
                      <Heart className="w-3 h-3 text-[#d4af37]" />
                    </div>
                    <span className="font-serif text-xs text-[#d4af37] tracking-widest font-semibold block mb-0.5">19:30 hrs</span>
                    <h4 className="font-serif text-base text-[#faf9f6]">Cóctel de Bienvenida y Fotos</h4>
                    <p className="font-sans text-xs text-stone-400 font-light mt-1">Recepción de los invitados en el jardín, bebidas de honor cortesía de los novios.</p>
                  </motion.div>

                  {/* Item 3 */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-[#11100e] border border-[#d4af37] flex items-center justify-center">
                      <Users className="w-3 h-3 text-[#d4af37]" />
                    </div>
                    <span className="font-serif text-xs text-[#d4af37] tracking-widest font-semibold block mb-0.5">20:30 hrs</span>
                    <h4 className="font-serif text-base text-[#faf9f6]">Apertura del Salón y Banquet</h4>
                    <p className="font-sans text-xs text-stone-400 font-light mt-1">Cena de gala imperial, brindis oficial, palabras de agradecimiento de los padres.</p>
                  </motion.div>

                  {/* Item 4 */}
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-[#11100e] border border-[#d4af37] flex items-center justify-center">
                      <Music className="w-3 h-3 text-[#d4af37]" />
                    </div>
                    <span className="font-serif text-xs text-[#d4af37] tracking-widest font-semibold block mb-0.5">22:30 hrs</span>
                    <h4 className="font-serif text-base text-[#faf9f6]">Primer Vals y Apertura de Pista</h4>
                    <p className="font-sans text-xs text-stone-400 font-light mt-1">Apertura del baile de los novios y celebración estelar de fiesta continua.</p>
                  </motion.div>

                </div>

              </div>
            </section>


            {/* ================= 8. CÓDIGO DE VESTIMENTA (DRESS CODE) ================= */}
            <section className="w-full py-24 relative bg-[#070707] border-t border-[#d4af37]/10">
              <div className="max-w-2xl mx-auto px-6 text-center">
                
                <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">CÓMO ASISTIR</span>
                <h2 className="font-serif text-2xl text-stone-200 tracking-wider mb-4">Código de Vestimenta</h2>
                <div className="h-[1px] w-12 bg-[#d4af37]/45 mx-auto mt-4 mb-14" />

                <div className="grid md:grid-cols-2 gap-8 max-w-lg mx-auto">
                  
                  {/* Ella Card */}
                  <div className="bg-[#11100e] border border-[#d4af37]/15 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <span className="font-serif text-[10px] uppercase tracking-widest text-[#d4af37] block mb-3 font-semibold">MUJERES: VESTIDO DE GALA</span>
                    <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mb-6">
                      Sugerimos vestidos largos de noche formales y elegantes (se solicita evitar el color blanco y marfil).
                    </p>
                    <div className="flex justify-center space-x-3.5">
                      <span className="w-5 h-5 rounded-full bg-[#3d0814] border border-[#d4af37]/20 shadow-md block" title="Vino tinto" />
                      <span className="w-5 h-5 rounded-full bg-[#051c14] border border-[#d4af37]/20 shadow-md block" title="Verde esmeralda" />
                      <span className="w-5 h-5 rounded-full bg-[#030e20] border border-[#d4af37]/20 shadow-md block" title="Azul noche" />
                    </div>
                  </div>

                  {/* Él Card */}
                  <div className="bg-[#11100e] border border-[#d4af37]/15 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <span className="font-serif text-[10px] uppercase tracking-widest text-[#d4af37] block mb-3 font-semibold">HOMBRES: TRAJE OSCURO / ESMOQUIN</span>
                    <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mb-6">
                      Sugerimos traje completo oscuro clásico o esmoquin formal formal de noche con corbata o moño tradicional.
                    </p>
                    <div className="flex justify-center space-x-3.5">
                      <span className="w-5 h-5 rounded-full bg-black border border-[#d4af37]/20 shadow-md block" title="Negro formal" />
                      <span className="w-5 h-5 rounded-full bg-[#11151c] border border-[#d4af37]/20 shadow-md block" title="Gris Oxford" />
                      <span className="w-5 h-5 rounded-full bg-[#0d1627] border border-[#d4af37]/20 shadow-md block" title="Azul marino oscuro" />
                    </div>
                  </div>

                </div>

              </div>
            </section>


            {/* ================= 9. MESA DE REGALOS (GIFT TABLE) ================= */}
            <section className="w-full py-24 relative bg-[#0d0c0b]">
              <div className="max-w-3xl mx-auto px-6 text-center">
                
                <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">LLUVIA DE SOBRES</span>
                <h2 className="font-serif text-2xl text-stone-200 tracking-wider mb-4">Mesa de Regalos</h2>
                <p className="font-sans text-xs text-stone-400 font-light leading-relaxed max-w-sm mx-auto mb-14">
                  Su compañía es nuestro mejor regalo. Si desean realizarnos un obsequio adicional, les compartimos las siguientes opciones:
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto">
                  
                  {/* Liverpool Store */}
                  <div className="bg-[#141210] p-6 border border-[#d4af37]/20 rounded-2xl shadow-lg relative flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mx-auto mb-3">
                        <Gift className="w-4 h-4" />
                      </div>
                      <h4 className="font-serif text-base text-stone-100 mb-1.5">Mesa Especial Liverpool</h4>
                      <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mb-4">
                        Número de evento oficial Liverpool: <strong className="text-stone-200 font-semibold">#756291</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => copyDetail("756291", "No. Evento Liverpool")}
                      className="w-full py-2 bg-stone-900 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-sans font-semibold uppercase tracking-widest rounded-lg hover:bg-[#d4af37] hover:text-stone-950 transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 animate-pulse" />
                      <span>Copiar Número</span>
                    </button>
                  </div>

                  {/* Bank info */}
                  <div className="bg-[#141210] p-6 border border-[#d4af37]/20 rounded-2xl shadow-lg relative flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mx-auto mb-3">
                        <Info className="w-4 h-4" />
                      </div>
                      <h4 className="font-serif text-base text-stone-100 mb-1.5">Transferencia Bancaria</h4>
                      <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mb-4.5">
                        Banco: BBVA S.A. <br />
                        CLABE: <strong className="text-stone-200 font-semibold">0123 4567 8901 2345 67</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => copyDetail("012345678901234567", "Cuenta CLABE BBVA")}
                      className="w-full py-2 bg-stone-900 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-sans font-semibold uppercase tracking-widest rounded-lg hover:bg-[#d4af37] hover:text-stone-950 transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar CLABE</span>
                    </button>
                  </div>

                </div>

              </div>
            </section>


            {/* ================= 10. SUGERENCIAS DE HOSPEDAJE ================= */}
            <section className="w-full py-24 bg-[#070707] relative">
              <div className="max-w-3xl mx-auto px-6 text-center">
                
                <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">PARA INVITADOS FORÁNEOS</span>
                <h2 className="font-serif text-2xl text-stone-200 tracking-wider mb-14">Sugerencias de Hospedaje</h2>

                <div className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto text-left">
                  
                  {/* Hotel 1 */}
                  <div className="bg-[#11100e] border border-[#d4af37]/15 rounded-2xl p-6 shadow-xl relative flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-base text-[#faf9f6] mb-1">Hotel Boutique Palacio Real</h4>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-[#d4af37] mb-3">5 estrellas · Centro Histórico</p>
                      <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mb-5">
                        Dirección: Calle Gral Mariano Arista #710, Centro Histórico. <br />
                        Menciona la boda "Andrea & Juan" para tarifa preferencial.
                      </p>
                    </div>
                    <a
                      href="tel:+524448121212"
                      className="block w-full text-center py-2 bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#d4af37] hover:text-stone-950 font-sans text-[10px] font-semibold uppercase tracking-widest rounded-lg border border-[#d4af37]/25 transition-all"
                    >
                      Reservación Directa
                    </a>
                  </div>

                  {/* Hotel 2 */}
                  <div className="bg-[#11100e] border border-[#d4af37]/15 rounded-2xl p-6 shadow-xl relative flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-base text-[#faf9f6] mb-1">Gran Quinta Inn & Suites</h4>
                      <p className="font-sans text-[10px] uppercase tracking-widest text-[#d4af37] mb-3">4.5 estrellas · Zona Poniente</p>
                      <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mb-5">
                        Dirección: Carr 57 Km 8.5 S/N, Hotelería Poniente. <br />
                        Sugerimos reservar con anticipación debido a temporada de eventos.
                      </p>
                    </div>
                    <a
                      href="tel:+524448332211"
                      className="block w-full text-center py-2 bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#d4af37] hover:text-stone-950 font-sans text-[10px] font-semibold uppercase tracking-widest rounded-lg border border-[#d4af37]/25 transition-all"
                    >
                      Reservación Directa
                    </a>
                  </div>

                </div>

              </div>
            </section>


            {/* ================= 11. CONFIRMACIÓN DE ASISTENCIA (FORM RSVP) ================= */}
            <section className="w-full py-24 bg-[#0d0c0b] relative">
              <div className="max-w-xl mx-auto px-6 text-center">
                
                <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#d4af37] block mb-2">R. S. V. P.</span>
                <h2 className="font-serif text-2xl text-stone-200 tracking-wider mb-4">Confirmación de Asistencia</h2>
                <p className="font-sans text-xs text-stone-400 font-light leading-relaxed mb-12 max-w-sm mx-auto">
                  Agradecemos confirmar su grata presencia antes del <strong className="text-stone-200">20 de Agosto de 2026</strong> para coordinar detalles de pases e invitados.
                </p>

                {/* Main Form container block */}
                <div className="bg-[#141210] border border-[#d4af37]/20 p-6 sm:p-8 rounded-3xl text-left shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                  
                  {!completedRsvp ? (
                    <form onSubmit={handleSubmitRsvp} className="space-y-4">
                      
                      <div>
                        <label className="font-serif text-xs text-stone-300 block mb-1.5 font-medium">Nombre de la Familia / Invitados:</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej. Sr. Juan Gómez y Familia"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          className="w-full p-3 border border-stone-800 bg-[#070707] text-[13px] text-stone-100 rounded-lg focus:outline-none focus:border-[#d4af37] font-sans transition-colors"
                        />
                      </div>

                      <div>
                        <label className="font-serif text-xs text-stone-300 block mb-1.5 font-medium">Número de Lugares a Confirmar:</label>
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          className="w-full p-3 border border-stone-800 bg-[#070707] text-[13px] text-stone-100 rounded-lg focus:outline-none focus:border-[#d4af37] font-sans transition-colors cursor-pointer"
                        >
                          <option value="1">1 Boleto disponible</option>
                          <option value="2">2 Boletos disponibles (Pareja)</option>
                          <option value="3">3 Boletos disponibles (Familiar)</option>
                          <option value="4">4 Boletos disponibles (Familiar)</option>
                          <option value="5">5 Boletos disponibles (Familiar amplio)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-serif text-xs text-stone-300 block mb-1.5 font-medium">Observaciones / Alergias del Menú (Opcional):</label>
                        <textarea
                          placeholder="Ej. Menú vegetariano, alergia a nueces o comentarios..."
                          value={allergies}
                          onChange={(e) => setAllergies(e.target.value)}
                          rows={2}
                          className="w-full p-3 border border-stone-800 bg-[#070707] text-[13px] text-stone-100 rounded-lg focus:outline-none focus:border-[#d4af37] font-sans transition-colors placeholder:text-stone-700"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-4 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c5a880] hover:brightness-110 active:scale-[0.98] text-stone-950 font-sans text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg cursor-pointer transition-all"
                        >
                          {submitting ? 'Registrando Confirmación...' : 'Registrar Mi Confirmación'}
                        </button>
                      </div>

                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6 flex flex-col items-center"
                    >
                      <CheckCircle className="w-14 h-14 text-emerald-500 mb-4 animate-bounce" />
                      <h3 className="font-serif text-lg text-stone-100 mb-1">¡Gracias por tu registro!</h3>
                      <p className="font-sans text-xs text-stone-400 mb-6 leading-relaxed max-w-xs mx-auto">
                        Hemos formateado tu pase de manera instantánea. Envía ahora tu confirmación directamente a nuestro WhatsApp oficial:
                      </p>

                      <div className="bg-[#070707] border border-stone-800 p-4 rounded-xl text-left w-full mb-6 font-mono text-[11px] leading-relaxed text-stone-400 whitespace-pre-wrap">
                        {simulatedMessage}
                      </div>

                      <div className="flex space-x-3 w-full">
                        <button
                          onClick={() => {
                            setCompletedRsvp(false);
                            setGuestName('');
                            setAllergies('');
                          }}
                          className="flex-1 py-3 bg-transparent border border-stone-800 text-stone-400 rounded-lg text-xs font-sans uppercase tracking-widest hover:bg-neutral-900 transition-colors cursor-pointer"
                        >
                          Corregir
                        </button>
                        <button
                          onClick={sendWhatsApp}
                          className="flex-grow py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-sans uppercase tracking-widest flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Enviar WhatsApp</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>

              </div>
            </section>


            {/* ================= 12. ELEGANTE GENTLE INVITATION FOOTER ================= */}
            <footer className="w-full py-16 bg-[#070707] border-t border-stone-900 text-center relative z-20">
              <div className="max-w-xs mx-auto flex flex-col items-center">
                
                <span className="font-serif italic text-2xl text-stone-200">Andrea & Juan</span>
                <p className="font-sans text-[8px] uppercase tracking-widest text-[#d4af37] mt-1 font-semibold">POR SIEMPRE JUNTOS</p>
                
                <div className="h-[0.5px] w-12 bg-[#d4af37]/35 my-5" />

                <p className="font-sans text-[10px] text-stone-600 leading-normal font-light">
                  Invitación digital VIP realizada por InvitaOnline.<br />
                  Todos los derechos reservados © 2026.
                </p>

                <p className="text-[10px] font-sans text-stone-700 mt-6 tracking-widest uppercase">
                  ✦ GRACIAS POR ACOMPAÑARNOS ✦
                </p>

                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.pathname = '/'; }}
                  className="mt-8 inline-flex items-center space-x-2 px-6 py-2.5 bg-stone-900 hover:bg-[#d4af37] text-[#d4af37] hover:text-stone-950 border border-[#d4af37]/35 rounded-xl font-sans text-[10px] font-semibold uppercase tracking-widest transition-all shadow-lg"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Regresar a Catálogo</span>
                </a>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
