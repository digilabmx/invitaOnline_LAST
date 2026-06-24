import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Calendar, MapPin, Gift, Clock, Music, Play, Pause, 
  Copy, Check, CheckCircle, ChevronDown, Sparkles, Users, 
  Info, Compass, ChevronRight, Share2, AlertCircle, ArrowLeft, X,
  Volume2, VolumeX
} from 'lucide-react';

import FallingPetalsCanvas from './FallingPetalsCanvas';

// Decorative SVG separator
const FloralDivider = () => (
  <div className="flex items-center justify-center space-x-4 my-8 opacity-80">
    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-luxury-beige-400" />
    <svg className="w-8 h-8 text-luxury-beige-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M12 2C11.5 5 9 7.5 6 8C9 8.5 11.5 11 12 14C12.5 11 15 8.5 18 8C15 7.5 12.5 5 12 2Z" fill="currentColor" className="opacity-20" />
      <path d="M12 22C11.5 19 9 16.5 6 16C9 15.5 11.5 13 12 10C12.5 13 15 15.5 18 16C15 16.5 12.5 19 12 22Z" fill="currentColor" className="opacity-20" />
      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
    </svg>
    <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-luxury-beige-400" />
  </div>
);

export default function TemplateBoda() {
  // Check if ivory theme is requested from query/hash URL parameter
  const [isIvoryTheme, setIsIvoryTheme] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasIvory = window.location.hash.includes('theme=ivory') || window.location.search.includes('theme=ivory');
      setIsIvoryTheme(hasIvory);
    }
  }, []);

  const brideName = isIvoryTheme ? 'Adriana' : 'Andrea';
  const groomName = isIvoryTheme ? 'Mauricio' : 'Josué';
  const coupleNames = isIvoryTheme ? 'Adriana & Mauricio' : 'Andrea & Josué';
  const coupleNamesAnd = isIvoryTheme ? 'Adriana y Mauricio' : 'Andrea y Josué';

  // Navigation & Envelope stage
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicCardOpen, setIsMusicCardOpen] = useState(true);
  
  // Custom toast notification states
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Photo Carousel State
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = [
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=70&w=600&fm=webp', // Romantic bride & groom
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=70&w=600&fm=webp', // Outdoors vows
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=70&w=600&fm=webp', // Sparkling sunset couple
  ];

  // FAQ interactive state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // RSVP Form state
  const [rsvpData, setRsvpData] = useState({
    nombre: '',
    asistencia: 'confirmado', // 'confirmado' or 'declinado'
    boletos: '2',
    restricciones: '',
    mensaje: ''
  });
  const [rsvpEnviado, setRsvpEnviado] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Trigger custom toast alert
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Setup countdown target leading to May 30th, 2027
  useEffect(() => {
    const targetDate = new Date('2027-05-30T17:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60) % 60));
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Fallback placeholder if date has elapsed
        setTimeLeft({ days: 341, hours: 14, minutes: 22, seconds: 45 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const togglePlayPause = () => {
    if (!audioRef.current) {
      const audio = new Audio('https://res.cloudinary.com/dhs8skhqm/video/upload/v1782263468/AThousandYears_pjdjzt.mp3');
      audio.loop = true;
      audio.volume = 0.5;
      
      audio.addEventListener('error', () => {
        console.warn("Cloudinary music load failed, falling back to Chopin Nocturne Op. 9 No. 2");
        audio.src = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Chopin_Nocturne_Op._9_No._2_-_Florence_Robineau.mp3';
        audio.load();
        audio.play().then(() => setIsPlaying(true)).catch(err => console.log("Fallback play blocked:", err));
      });

      audioRef.current = audio;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio play blocked by browser:", err));
    }
  };

  const handleToggleMusic = () => {
    setIsMusicCardOpen(!isMusicCardOpen);
  };

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);



  // Gallery auto-rotate
  useEffect(() => {
    if (!envelopeOpened) return;
    const interval = setInterval(() => {
      setActivePhoto(prev => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [envelopeOpened]);

  // Handle Opening of Envelope
  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
    setShowPetals(true);
    
    // Play music immediately within user-gesture callstack to guarantee autoplay
    if (!audioRef.current) {
      const audio = new Audio('https://res.cloudinary.com/dhs8skhqm/video/upload/v1782263468/AThousandYears_pjdjzt.mp3');
      audio.loop = true;
      audio.volume = 0.5;
      
      audio.addEventListener('error', () => {
        console.warn("Cloudinary music load failed, falling back to Chopin Nocturne Op. 9 No. 2");
        audio.src = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Chopin_Nocturne_Op._9_No._2_-_Florence_Robineau.mp3';
        audio.load();
        audio.play().then(() => setIsPlaying(true)).catch(err => console.log("Fallback play blocked:", err));
      });

      audioRef.current = audio;
    }

    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.warn("Audio autoplay blocked by browser policy:", err);
      });
    
    // Auto turn off petals after 8.5 seconds of gorgeous burst cascade
    setTimeout(() => {
      setShowPetals(false);
    }, 8500);
  };

  // Bank Copy Details
  const copyToClipboard = (text: string, title: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => {
            showToast(`⚡ ${title} copiada al portapapeles con éxito`);
          })
          .catch(() => {
            fallbackCopy(text, title);
          });
      } else {
        fallbackCopy(text, title);
      }
    } catch (err) {
      fallbackCopy(text, title);
    }
  };

  const fallbackCopy = (text: string, title: string) => {
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
        showToast(`⚡ ${title} copiada con éxito`);
      } else {
        showToast(`Datos: ${text}`);
      }
    } catch (e) {
      showToast(`Datos: ${text}`);
    }
  };

  // RSVP Form submission simulated
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.nombre.trim()) {
      showToast('⚠️ Por favor ingresa tu nombre completo');
      return;
    }

    setRsvpEnviado(true);
    showToast('✨ ¡Gracias! Tu confirmación ha sido guardada.');

    // Build elegant whatsapp link message redirect
    const confirmMessage = rsvpData.asistencia === 'confirmado' ? '✅ ¡Confirmadísimo! Sí asistiré.' : '❌ Lo lamento, no podré asistir.';
    const whatsMessage = `Hola Andrea & Josue, Confirmo mi asistencia para su boda:\n\n👤 *Nombre:* ${rsvpData.nombre}\n⭐ *Estado:* ${confirmMessage}\n🎫 *Pases a usar:* ${rsvpData.boletos}\n🍽️ *Detalles/Dieta:* ${rsvpData.restricciones || 'Ninguno'}\n💬 *Mensaje:* "${rsvpData.mensaje || '¡Felicidades!'}"\n\n_Enviado desde el demo de invitaonline.mx_`;
    
    const encoded = encodeURIComponent(whatsMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=524446500910&text=${encoded}`;
    
    // Smoothly open WhatsApp in new tab after 1.5 seconds
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-neutral-950 font-sans text-stone-900 overflow-x-hidden selection:bg-rose-100 selection:text-stone-900">
      
      {/* Floating back controller to close demo view */}
      <a
        href="#"
        className="fixed top-5 left-5 z-40 bg-white/95 hover:bg-white text-stone-900 p-3 rounded-full shadow-lg border border-stone-200/55 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 group"
        title="Volver al catálogo"
      >
        <ArrowLeft className="w-4 h-4 text-stone-700 group-hover:-translate-x-0.5 transition-transform" />
      </a>

      {/* Rose Petals Burst on Envelope Click */}
      <AnimatePresence>
        {showPetals && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 pointer-events-none z-30"
          >
            <FallingPetalsCanvas />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Premium Native Audio Player (appears only when open) */}
      <AnimatePresence>
        {envelopeOpened && (
          <>
            {isMusicCardOpen ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-white/95 backdrop-blur-md rounded-full border border-neutral-200/50 p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.15)] font-sans"
              >
                <button 
                  onClick={togglePlayPause}
                  className="w-8 h-8 rounded-full bg-luxury-beige-600 hover:bg-luxury-beige-700 text-white flex items-center justify-center transition-all active:scale-95 shadow-md flex-shrink-0"
                  title={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white ml-0.5" />}
                </button>
                <div className="pr-1 pl-1 min-w-0 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-stone-800 whitespace-nowrap leading-none block">A Thousand Years</span>
                  <span className="text-[8px] text-stone-500 whitespace-nowrap leading-none block mt-0.5">Música de Fondo</span>
                </div>
                <button 
                  onClick={handleToggleMusic} 
                  className="text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100 transition-colors"
                  title="Minimizar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleToggleMusic}
                className="fixed bottom-6 right-6 z-50 p-3 bg-luxury-beige-600 text-white rounded-full shadow-2xl hover:bg-luxury-beige-700 transition-colors group flex items-center justify-center border border-luxury-beige-300"
                aria-label="Escuchar música"
              >
                <Music className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </motion.button>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Interactive Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#0c0c0c] text-[#f2ede7] text-xs font-sans tracking-wide py-3 px-5 rounded-full shadow-2xl border border-stone-800 text-center whitespace-nowrap min-w-[280px]"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!envelopeOpened ? (
          /* STEP 1: INITIAL ENVELOPE OPENING CHALLENGE SCREEN */
          <motion.div
            key="envelope-stage"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className={`min-h-screen relative flex items-center justify-center px-4 py-8 overflow-hidden transition-colors duration-500 ${isIvoryTheme ? 'bg-[#FCFBF9]' : 'bg-radial from-neutral-900 to-neutral-950'}`}
          >
            {/* Elegant luxury botanical gold line overlays in background */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none filter scale-105 select-none">
              <svg className="w-full h-full text-white" viewBox="0 0 800 800" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="400" cy="400" r="300" strokeDasharray="5,5" />
                <path d="M400 100 V700 M100 400 H700" />
                <path d="M200 200 L600 600 M200 600 L600 200" />
              </svg>
            </div>

            {/* Simulated Floating gold particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [Math.random() * 800, Math.random() * -20],
                    x: [Math.random() * 200, Math.random() * 800],
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 10 + Math.random() * 15,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className={`absolute w-1 h-1 rounded-full opacity-30 ${isIvoryTheme ? 'bg-[#8F7C6E]' : 'bg-yellow-400'}`}
                  style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                />
              ))}
            </div>

            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-[420px] text-center"
            >
              {/* Luxury Envelope Container */}
              <div className={`border-2 rounded-2xl p-6 md:p-8 relative z-10 transition-all duration-300 ${
                isIvoryTheme 
                  ? 'bg-white border-[#8F7C6E]/35 shadow-[0_30px_70px_rgba(143,124,110,0.12)]' 
                  : 'bg-[#151413] border-[#d4af37]/35 shadow-[0_30px_70px_rgba(0,0,0,0.6)]'
              }`}>
                
                {/* Thin gold accent border frame */}
                <div className={`absolute inset-2.5 border rounded-xl pointer-events-none ${isIvoryTheme ? 'border-[#8F7C6E]/15' : 'border-[#d4af37]/15'}`} />

                {/* Top decorative crest botanical branch */}
                <svg className={`w-18 h-18 mx-auto mb-6 ${isIvoryTheme ? 'text-[#8F7C6E]/75' : 'text-[#d4af37]/75'}`} viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 20 C45 35 32 45 20 48 C32 51 45 61 50 76 C55 61 68 51 80 48 C68 45 55 35 50 20 Z" className="animate-pulse" />
                  <circle cx="50" cy="48" r="4" fill="white" />
                </svg>

                {/* Subtitle pre-invite */}
                <span className={`font-display text-[10px] uppercase tracking-[0.3em] block mb-2 font-medium ${isIvoryTheme ? 'text-[#8F7C6E]' : 'text-[#d4af37]/80'}`}>
                  NUESTRA CELEBRACIÓN
                </span>

                {/* Bold invite line */}
                <h2 className={`font-serif text-2xl md:text-3xl font-light tracking-wide mt-2 mb-1.5 leading-relaxed ${isIvoryTheme ? 'text-[#5C4D3C]' : 'text-neutral-100'}`}>
                  Has sido invitado <br /> <span className={`font-script text-4xl block mt-1 ${isIvoryTheme ? 'text-[#8F7C6E]' : 'text-[#ead397]'}`}>a nuestra boda</span>
                </h2>

                <p className={`font-sans text-xs font-light tracking-wide max-w-xs mx-auto mb-10 leading-relaxed ${isIvoryTheme ? 'text-stone-600' : 'text-neutral-400'}`}>
                  Te invitamos a ser parte de este momento tan importante en nuestras vidas. Abre este sobre digital para conocer los detalles.
                </p>

                {/* Interactive Envelope Wax Seal Button */}
                <div className="relative flex justify-center py-4">
                  
                  {/* Visual background ripple pulse */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full animate-ping pointer-events-none ${isIvoryTheme ? 'bg-[#8F7C6E]/10' : 'bg-[#d4af37]/10'}`} style={{ animationDuration: '3s' }} />

                  <button
                    onClick={handleOpenEnvelope}
                    className={`relative z-10 w-20 h-20 rounded-full flex flex-col items-center justify-center font-serif text-[10px] font-bold uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 duration-200 cursor-pointer border-3 group ${
                      isIvoryTheme
                        ? 'bg-gradient-to-tr from-[#8F7C6E] to-[#bfae9e] text-white border-white'
                        : 'bg-gradient-to-tr from-[#9c7823] to-[#ead397] text-stone-900 border-[#151413]'
                    }`}
                    title="Haga clic para abrir el sobre"
                  >
                    {/* Tiny floral stamp overlay icon */}
                    <Heart className={`w-6 h-6 mb-1 group-hover:scale-110 duration-200 ${isIvoryTheme ? 'text-white fill-white/20' : 'text-stone-950 fill-stone-950/20'}`} />
                    <span className={`text-[7.5px] tracking-widest ${isIvoryTheme ? 'text-white' : 'text-stone-950'}`}>ABRIR</span>
                  </button>
                </div>

                <div className={`mt-8 text-[9px] font-sans tracking-widest uppercase ${isIvoryTheme ? 'text-[#8F7C6E]/80' : 'text-[#ead397]/60'}`}>
                  {coupleNames} · 30.05.2027
                </div>

              </div>

              {/* Secure navigation warning */}
              <p className="text-[10px] font-sans text-stone-500/80 tracking-wide mt-4 text-center">
                * Para una experiencia inmersiva, mantén encendido el volumen de tu equipo.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* STEP 2: FULLY IMMERSIVE DIGITALLY POLISHED LUXURY WEDDING INVITATION */
          <motion.div
            key="invitation-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="min-h-screen bg-[#FAF9F6] selection:bg-rose-100 flex flex-col items-center pb-20 relative"
          >
            {/* Elegant Background Grid / Soft Tint overlay */}
            <div className="absolute inset-0 bg-radial from-transparent via-luxury-beige-100/10 to-transparent pointer-events-none" />

            {/* ======================================= */}
            {/* 1. HERO ARCHED RETRATO INICIAL          */}
            {/* ======================================= */}
            <section className="w-full max-w-4xl px-4 pt-16 md:pt-24 flex flex-col items-center text-center relative z-10 shrink-0">
              
              {/* Top flower aesthetic vector crown */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-3"
              >
                <span className="font-display text-[11px] uppercase tracking-[0.4em] text-luxury-beige-600 block font-semibold">
                  SAVE THE DATE
                </span>
                <span className="font-script text-3xl text-luxury-beige-500 block mt-1">Nuestra Celebración de Amor</span>
              </motion.div>

              {/* Splendid Styled Portrait Arched Portal card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.96, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative mt-8 mb-4 border-6 border-white rounded-t-full shadow-[0_20px_50px_rgba(116,92,63,0.12)] max-w-xs md:max-w-sm w-full overflow-hidden bg-white"
              >
                {/* Photo container with custom color grades and overlay typography */}
                <div className="relative aspect-[3/4.2] w-full overflow-hidden bg-stone-100 rounded-t-full">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=70&w=800&fm=webp"
                    alt={coupleNames}
                    className="w-full h-full object-cover select-none filter brightness-90 saturate-[0.8] sepia-[15%] contrast-[105%]"
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Elegant warm gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />
                  
                  {/* Overlaid Names - Pristine tracking, Serif Display capitalized */}
                  <div className="absolute inset-0 flex items-end justify-center pb-12 px-4">
                    <h2 className="font-serif text-2xl md:text-3xl text-white tracking-[0.18em] uppercase text-center font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                      {coupleNamesAnd}
                    </h2>
                  </div>

                  {/* Delicate inner border layout frame */}
                  <div className="absolute inset-3 border border-white/20 rounded-t-full pointer-events-none" />
                </div>
              </motion.div>

              {/* Royal Groom and Bride titles centered below garland */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="max-w-xl px-2 mt-4"
              >
                {/* Beautiful clean subtitle header */}
                <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-luxury-beige-600 font-bold mb-3">
                  Nos casamos
                </p>

                <h1 className="font-display text-2xl md:text-3xl.5 text-stone-900 tracking-[0.14em] leading-normal uppercase">
                  Andrea & Josué
                </h1>

                <FloralDivider />

                <p className="font-serif text-base text-stone-700 italic tracking-wide max-w-lg mx-auto leading-relaxed">
                  "El amor no consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección."
                </p>

                {/* Core date detail badge */}
                <p className="font-display text-[12px] uppercase tracking-[0.25em] text-luxury-beige-600 font-semibold mt-6 mb-1">
                  SÁBADO · 30 DE MAYO DE 2027
                </p>

                {/* Sub-location simple header */}
                <p className="font-sans text-[10px] text-stone-500 tracking-widest uppercase mb-4">
                  SAN LUIS POTOSÍ, S.L.P., MÉXICO
                </p>

                <p className="font-script text-2xl md:text-3.5xl text-luxury-beige-500 mt-2 mb-12">
                  ¡Te esperamos!
                </p>
              </motion.div>

              {/* Dynamic Live Ticking Countdown Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-lg bg-white border border-luxury-beige-200 p-6 md:p-8 rounded-2xl shadow-[0_15px_35px_rgba(116,92,63,0.04)] mb-16 relative"
              >
                {/* Thin dashed inside line */}
                <div className="absolute inset-2 border border-dashed border-luxury-beige-200/60 rounded-xl" />

                <span className="font-display text-[10px] uppercase tracking-[0.25em] text-luxury-beige-500 block mb-6 font-semibold">
                  CUENTA REGRESIVA PARA EL SÍ
                </span>

                <div className="grid grid-cols-4 gap-2 text-stone-900 relative z-10">
                  <div className="border-r border-luxury-beige-100 last:border-0 pr-1">
                    <span className="font-serif text-3xl md:text-4xl font-light text-luxury-beige-700 block leading-none">{timeLeft.days}</span>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[#8c8276] mt-2 block leading-none font-medium">Días</span>
                  </div>
                  <div className="border-r border-luxury-beige-100 last:border-0 pr-1">
                    <span className="font-serif text-3xl md:text-4xl font-light text-luxury-beige-700 block leading-none">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[#8c8276] mt-2 block leading-none font-medium">Horas</span>
                  </div>
                  <div className="border-r border-luxury-beige-100 last:border-0 pr-1">
                    <span className="font-serif text-3xl md:text-4xl font-light text-luxury-beige-700 block leading-none">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[#8c8276] mt-2 block leading-none font-medium">Mins</span>
                  </div>
                  <div>
                    <span className="font-serif text-3xl md:text-4xl font-light text-luxury-beige-700 block leading-none">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[#8c8276] mt-2 block leading-none font-medium">Segs</span>
                  </div>
                </div>
              </motion.div>

            </section>

            {/* ======================================= */}
            {/* 2. NUESTRA HISTORIA PORTRAITS & TEXT     */}
            {/* ======================================= */}
            <section className="w-full max-w-4xl px-4 py-8 relative z-10 text-center bg-white/40 border-y border-luxury-beige-200/50">
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="max-w-2xl mx-auto"
              >
                <span className="font-script text-4xl text-luxury-beige-600 block mb-2">Nuestro Camino</span>
                <h2 className="font-display text-2xl text-stone-900 tracking-widest uppercase mb-6">Nuestra Historia de Amor</h2>
                
                <p className="font-sans text-sm text-stone-600 font-light leading-relaxed mb-6 text-justify md:text-center px-4">
                  Nos conocimos hace algunos años en la hermosa ciudad de San Luis Potosí, y lo que comenzó como una amistad profunda floreció en una hermosa historia de amor, aventuras y proyectos compartidos. Hoy, con la certeza de querer pasar el resto de nuestras vidas juntos, hemos decidido unirnos en matrimonio y queremos celebrar esta gran alegría en compañía de todos nuestros familiares y amigos más queridos.
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto my-8">
                  {/* Ella / Andrea */}
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden border-3 border-white shadow-md">
                    <img
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&fit=crop&q=70&fm=webp"
                      alt="Recuerdo 1"
                      className="w-full h-full object-cover filter brightness-[0.85] saturate-[0.75] sepia-[15%] contrast-[105%]"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    {/* Shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
                    {/* Inner frame line */}
                    <div className="absolute inset-2 border border-white/25 rounded pointer-events-none" />
                    {/* Overlaid Elegant Text */}
                    <div className="absolute inset-x-0 bottom-3 text-center pointer-events-none">
                      <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-white font-semibold drop-shadow-sm">
                        Andrea
                      </span>
                    </div>
                  </div>

                  {/* Él / Josué */}
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden border-3 border-white shadow-md mt-4">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop&q=70&fm=webp"
                      alt="Recuerdo 2"
                      className="w-full h-full object-cover filter brightness-[0.85] saturate-[0.75] sepia-[15%] contrast-[105%]"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    {/* Shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
                    {/* Inner frame line */}
                    <div className="absolute inset-2 border border-white/25 rounded pointer-events-none" />
                    {/* Overlaid Elegant Text */}
                    <div className="absolute inset-x-0 bottom-3 text-center pointer-events-none">
                      <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-white font-semibold drop-shadow-sm">
                        Josué
                      </span>
                    </div>
                  </div>
                </div>

                <p className="font-script text-2xl text-luxury-beige-500 italic">"Comenzamos una nueva etapa..."</p>
              </motion.div>

            </section>

            {/* ======================================= */}
            {/* 3. FECHA, HORA Y DATOS DE LA CEREMONIA   */}
            {/* ======================================= */}
            <section className="w-full max-w-4xl px-4 py-16 text-center relative z-10">
              
              <span className="font-script text-4xl text-luxury-beige-600 block mb-2">Momento Sagrado</span>
              <h2 className="font-display text-2xl text-stone-900 tracking-widest uppercase mb-12">Detalles del Evento</h2>

              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                
                {/* Card Ceremonia */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white border border-luxury-beige-200/80 rounded-2xl p-6 md:p-8 shadow-[0_12px_32px_rgba(116,92,63,0.03)] hover:scale-[1.01] transition-transform flex flex-col relative"
                >
                  <div className="absolute top-4 right-4 text-luxury-beige-300 opacity-60">
                    <Compass className="w-6 h-6" />
                  </div>

                  <div className="w-12 h-12 rounded-full bg-luxury-beige-50 flex items-center justify-center text-luxury-beige-600 mx-auto mb-4">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  
                  <span className="font-display text-xs tracking-widest uppercase text-luxury-beige-500 mb-1 font-semibold">CEREMONIA RELIGIOSA</span>
                  <h3 className="font-serif text-lg text-stone-950 mb-3 font-semibold">Catedral Metropolitana</h3>
                  
                  <div className="w-12 h-[1px] bg-luxury-beige-200 mx-auto my-1.5" />
                  
                  <p className="font-sans text-xs text-stone-600 font-light leading-relaxed my-4">
                    <strong>Ubicación:</strong> Catedral Metropolitana de San Luis Potosí, Calle Manuel José Othón, Centro Histórico. <br />
                    <strong>Hora:</strong> 18:00 hrs. <br />
                    <strong>Día:</strong> Sábado, 30 de Mayo de 2027.
                  </p>
                  
                  <div className="mt-auto pt-4">
                    <a 
                      href="https://maps.app.goo.gl/uXv49W8bA6c6hK4S7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-luxury-beige-600 hover:text-luxury-beige-800 hover:translate-x-0.5 transition-all text-center"
                    >
                      <span>📍 Ver Ubicación en GPS</span>
                    </a>
                  </div>
                </motion.div>

                {/* Card Recepción */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white border border-luxury-beige-200/80 rounded-2xl p-6 md:p-8 shadow-[0_12px_32px_rgba(116,92,63,0.03)] hover:scale-[1.01] transition-transform flex flex-col relative"
                >
                  <div className="absolute top-4 right-4 text-luxury-beige-300 opacity-60">
                    <Heart className="w-6 h-6" />
                  </div>

                  <div className="w-12 h-12 rounded-full bg-luxury-beige-50 flex items-center justify-center text-luxury-beige-600 mx-auto mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  
                  <span className="font-display text-xs tracking-widest uppercase text-luxury-beige-500 mb-1 font-semibold">BANQUETE Y FIESTA</span>
                  <h3 className="font-serif text-lg text-stone-950 mb-3 font-semibold">Jardín Quinta Hermosa</h3>
                  
                  <div className="w-12 h-[1px] bg-luxury-beige-200 mx-auto my-1.5" />
                  
                  <p className="font-sans text-xs text-stone-600 font-light leading-relaxed my-4">
                    <strong>Ubicación:</strong> Jardín de Eventos Quinta Hermosa, Av. del Potosí, San Luis Potosí, S.L.P. <br />
                    <strong>Hora:</strong> 20:00 hrs. <br />
                    <strong>Estacionamiento:</strong> Privado con servicio de Valet Parking.
                  </p>
                  
                  <div className="mt-auto pt-4">
                    <a 
                      href="https://maps.app.goo.gl/uXv49W8bA6c6hK4S7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-luxury-beige-600 hover:text-luxury-beige-800 hover:translate-x-0.5 transition-all text-center"
                    >
                      <span>📍 Ver Recepción en GPS</span>
                    </a>
                  </div>
                </motion.div>

              </div>

            </section>

            {/* ======================================= */}
            {/* 4. GOOGLE MAPS INTERACTIVE EMBEDS       */}
            {/* ======================================= */}
            <section className="w-full max-w-3xl px-4 py-8 relative z-10">
              
              <div className="bg-white p-4.5 rounded-2xl shadow-[0_15px_35px_rgba(116,92,63,0.03)] border border-luxury-beige-200/70 overflow-hidden">
                <span className="font-display text-[9px] uppercase tracking-[0.25em] text-stone-500 block text-center mb-4">MAPA INTERACTIVO DE NAVEGACIÓN</span>
                
                {/* Genuine map visual using simple mockup frame to behave nicely on both map endpoints */}
                <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-stone-100 border border-luxury-beige-200/50">
                  <iframe 
                    title="Catedral de San Luis Potosi"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3696.1436440263625!2d-100.97652750000001!3d22.152382400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842aa1f97475df8a%3A0xe5aefd6006c641f2!2sCatedral%20Metropolitana%20de%20San%20Luis%20Potos%C3%AD!5e0!3m2!1ses-419!2smx!4v1716912341235!5m2!1ses-419!2smx"
                    className="w-full h-full border-0"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </section>

            {/* ======================================= */}
            {/* 5. PHOTO GALLERY CAROUSEL WITH CLICKS   */}
            {/* ======================================= */}
            <section className="w-full max-w-md px-4 py-16 text-center relative z-10">
              
              <span className="font-script text-4xl text-luxury-beige-600 block mb-2">Instantes</span>
              <h2 className="font-display text-2xl text-stone-900 tracking-widest uppercase mb-8">Nuestra Galería</h2>

              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-100 shadow-xl border-4 border-white mb-4">
                
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePhoto}
                    src={photos[activePhoto]}
                    alt={`Sesión de novios ${activePhoto + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover transition-all filter brightness-[0.85] saturate-[0.75] sepia-[15%] contrast-[105%]"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Elegant Inner Frame Line */}
                <div className="absolute inset-3 border border-white/20 rounded-xl pointer-events-none z-10" />

                {/* Overlaid Elegant Text */}
                <div className="absolute inset-x-0 bottom-12 text-center pointer-events-none z-10">
                  <span className="font-serif text-xs uppercase tracking-[0.3em] text-white font-medium drop-shadow-md">
                    Cosas del Corazón
                  </span>
                </div>

                {/* Left/Right manual switch triggers */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-1.5 z-20">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhoto(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activePhoto === i ? 'bg-[#d4af37] scale-120 w-5' : 'bg-white/60 hover:bg-white'}`}
                      title={`Ir a imagen ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Ambient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="flex justify-between px-2 text-[10px] font-sans text-stone-500 uppercase tracking-widest">
                <span>Sesión Andrea & Josué</span>
                <span>{activePhoto + 1} / {photos.length}</span>
              </div>

            </section>

            {/* ======================================= */}
            {/* 6. WEDDING DETAILS TIMELINE PROGRAM     */}
            {/* ======================================= */}
            <section className="w-full max-w-3xl px-4 py-16 text-center relative z-10 bg-[#f7f5ef] border-y border-luxury-beige-200/50">
              
              <span className="font-script text-4xl text-luxury-beige-600 block mb-2">Planificación</span>
              <h2 className="font-display text-2xl text-stone-900 tracking-widest uppercase mb-16">Itinerario del Gran Día</h2>

              {/* Elegant vertical timeline tracker */}
              <div className="relative max-w-md mx-auto text-left">
                
                {/* Thick vertical accent bar */}
                <div className="absolute left-[20px] top-4 bottom-4 w-[1.5px] bg-gradient-to-b from-luxury-beige-300 via-luxury-beige-400 to-luxury-beige-300" />

                {/* Timeline item 1 */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-start mb-10 pl-1.5 group"
                >
                  <div className="w-[38px] h-[38px] rounded-full bg-white border border-[#d4af37] flex items-center justify-center shrink-0 z-10 shadow-sm text-stone-700 transition-colors group-hover:bg-[#d4af37] group-hover:text-stone-950 duration-200">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="ml-5">
                    <span className="font-display text-[10px] uppercase tracking-widest text-[#96826d] block font-semibold leading-none mb-1">18:00 hrs</span>
                    <h4 className="font-serif text-base text-stone-900 font-semibold mb-1">Ceremonia Religiosa</h4>
                    <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
                      Llegada de los invitados and celebración solemne en la Catedral de San Luis Potosí.
                    </p>
                  </div>
                </motion.div>

                {/* Timeline item 2 */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-start mb-10 pl-1.5 group"
                >
                  <div className="w-[38px] h-[38px] rounded-full bg-white border border-[#d4af37] flex items-center justify-center shrink-0 z-10 shadow-sm text-stone-700 transition-colors group-hover:bg-[#d4af37] group-hover:text-stone-950 duration-200">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="ml-5">
                    <span className="font-display text-[10px] uppercase tracking-widest text-[#96826d] block font-semibold leading-none mb-1">19:30 hrs</span>
                    <h4 className="font-serif text-base text-stone-900 font-semibold mb-1">Sesión Fotográfica</h4>
                    <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
                      Sesión de fotos familiares y los novios junto al atardecer potosino.
                    </p>
                  </div>
                </motion.div>

                {/* Timeline item 3 */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-start mb-10 pl-1.5 group"
                >
                  <div className="w-[38px] h-[38px] rounded-full bg-white border border-[#d4af37] flex items-center justify-center shrink-0 z-10 shadow-sm text-stone-700 transition-colors group-hover:bg-[#d4af37] group-hover:text-stone-950 duration-200">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="ml-5">
                    <span className="font-display text-[10px] uppercase tracking-widest text-[#96826d] block font-semibold leading-none mb-1">20:00 hrs</span>
                    <h4 className="font-serif text-base text-stone-900 font-semibold mb-1">Coctel de Bienvenida</h4>
                    <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
                      Recepción de los invitados en el Jardín Quinta Hermosa con bebidas artesanales y bocadillos.
                    </p>
                  </div>
                </motion.div>

                {/* Timeline item 4 */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-start mb-10 pl-1.5 group"
                >
                  <div className="w-[38px] h-[38px] rounded-full bg-white border border-[#d4af37] flex items-center justify-center shrink-0 z-10 shadow-sm text-stone-700 transition-colors group-hover:bg-[#d4af37] group-hover:text-stone-950 duration-200">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="ml-5">
                    <span className="font-display text-[10px] uppercase tracking-widest text-[#96826d] block font-semibold leading-none mb-1">21:00 hrs</span>
                    <h4 className="font-serif text-base text-stone-900 font-semibold mb-1">Cena y Brindis</h4>
                    <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
                      Banquete gourmet de tres tiempos y brindis oficial en honor a los recién casados.
                    </p>
                  </div>
                </motion.div>

                {/* Timeline item 5 */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex items-start pl-1.5 group"
                >
                  <div className="w-[38px] h-[38px] rounded-full bg-white border border-[#d4af37] flex items-center justify-center shrink-0 z-10 shadow-sm text-stone-700 transition-colors group-hover:bg-[#d4af37] group-hover:text-stone-950 duration-200">
                    <Music className="w-4 h-4" />
                  </div>
                  <div className="ml-5">
                    <span className="font-display text-[10px] uppercase tracking-widest text-[#96826d] block font-semibold leading-none mb-1">22:30 hrs</span>
                    <h4 className="font-serif text-base text-stone-900 font-semibold mb-1">Apertura de Pista y Fiesta</h4>
                    <p className="font-sans text-xs text-stone-500 font-light leading-relaxed">
                      Baile de bodas de los novios, baile familiar y fiesta espectacular con DJ en vivo.
                    </p>
                  </div>
                </motion.div>

              </div>

            </section>

            {/* ======================================= */}
            {/* 7. DRESS CODE (CÓDIGO DE VESTIMENTA)     */}
            {/* ======================================= */}
            <section className="w-full max-w-3xl px-4 py-16 text-center relative z-10">
              
              <span className="font-script text-4xl text-luxury-beige-600 block mb-2">Esencia</span>
              <h2 className="font-display text-2xl text-stone-900 tracking-widest uppercase mb-4">Código de Vestimenta</h2>
              <p className="font-display text-[9px] uppercase tracking-widest text-[#8c8276] mb-12">RESERVADO PARA ARMONIZAR EL EVENTO</p>

              <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-8">
                
                {/* Womans Dress Code */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-6 rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.02)] border border-luxury-beige-200/50"
                >
                  <span className="font-display text-xs tracking-widest uppercase text-luxury-beige-600 block mb-4 font-semibold">MUJERES: VESTIDO DE GALA</span>
                  <p className="font-sans text-xs text-stone-600 font-light leading-relaxed mb-6">
                    Vestido largo formal de noche. Elige tonos alegres o sobrios para lucir fantástica.
                  </p>
                  
                  {/* Color Swatches */}
                  <div className="flex justify-center gap-3">
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-[#1e293b] border border-stone-200 shadow-sm mx-auto" />
                      <span className="text-[8px] uppercase tracking-wider text-stone-500 mt-1 block">Azul Real</span>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-[#b59d7d] border border-stone-200 shadow-sm mx-auto" />
                      <span className="text-[8px] uppercase tracking-wider text-stone-500 mt-1 block">Champagne</span>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-[#dfb5b5] border border-stone-200 shadow-sm mx-auto" />
                      <span className="text-[8px] uppercase tracking-wider text-stone-500 mt-1 block">Rosa Pastel</span>
                    </div>
                  </div>
                </motion.div>

                {/* Mans Dress Code */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white p-6 rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.02)] border border-luxury-beige-200/50"
                >
                  <span className="font-display text-xs tracking-widest uppercase text-luxury-beige-600 block mb-4 font-semibold">HOMBRES: TRAJE OSCURO</span>
                  <p className="font-sans text-xs text-stone-600 font-light leading-relaxed mb-6">
                    Traje completo oscuro (negro, azul marino o gris oxford) con corbata o moño formal.
                  </p>

                  {/* Color Swatches */}
                  <div className="flex justify-center gap-3">
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-[#0a0a0a] border border-stone-200 shadow-sm mx-auto" />
                      <span className="text-[8px] uppercase tracking-wider text-stone-500 mt-1 block">Negro</span>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-[#111827] border border-stone-200 shadow-sm mx-auto" />
                      <span className="text-[8px] uppercase tracking-wider text-stone-500 mt-1 block">Azul Marino</span>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-[#2d221a] border border-stone-200 shadow-sm mx-auto" />
                      <span className="text-[8px] uppercase tracking-wider text-stone-500 mt-1 block">Marrón</span>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Friendly rule admonition */}
              <div className="mt-8 flex items-center justify-center space-x-2 bg-yellow-50 max-w-sm mx-auto py-2.5 px-4 rounded-xl border border-yellow-100 text-yellow-800 text-[10px] font-sans tracking-wide">
                <AlertCircle className="w-3.5 h-3.5 fill-yellow-100" />
                <span><strong>Aviso:</strong> Reservar exclusivamente el blanco y beige para la novia.</span>
              </div>

            </section>

            {/* ======================================= */}
            {/* 8. MESA DE REGALOS (PALACIO, AMAZON, ETC)*/}
            {/* ======================================= */}
            <section className="w-full max-w-3xl px-4 py-16 text-center relative z-10 bg-[#FAF9F6] border-t border-luxury-beige-200/60">
              
              <span className="font-script text-4xl text-luxury-beige-600 block mb-2">Agradecimiento</span>
              <h2 className="font-display text-2xl text-stone-900 tracking-widest uppercase mb-4">Mesa de Regalos</h2>
              <p className="font-sans text-xs text-stone-500 font-light max-w-md mx-auto mb-12 leading-relaxed">
                Su presencia en nuestra boda es nuestro mejor regalo. Sin embargo, si desean tener algún detalle con nosotros, hemos dispuesto las siguientes opciones de mesa de regalos:
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                
                {/* Palacio de Hierro / Liverpool card */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="w-10 h-10 rounded-full bg-luxury-beige-50 flex items-center justify-center text-luxury-beige-600 mx-auto mb-3">
                    <Gift className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-stone-900 mb-1">Mesa Palacio de Hierro</h4>
                  <p className="font-sans text-[11px] text-stone-500 mb-4 font-light">Número de Evento: <br /><strong>5092813</strong></p>
                  <button
                    onClick={() => copyToClipboard("5092813", "Mesa Palacio de Hierro")}
                    className="w-full py-1.5 border border-luxury-beige-200 text-luxury-beige-700 hover:bg-luxury-beige-50 font-sans text-[9px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>Copiar No. de Evento</span>
                  </button>
                </motion.div>

                {/* Amazon Wishlist */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="w-10 h-10 rounded-full bg-luxury-beige-50 flex items-center justify-center text-luxury-beige-600 mx-auto mb-3">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-stone-900 mb-1">Amazon Wishlist</h4>
                  <p className="font-sans text-[11px] text-stone-500 mb-4 font-light">Boda de Andrea y Josué <br />(SLP Envíos)</p>
                  <a
                    href="https://amazon.com.mx/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-1.5 bg-stone-900 hover:bg-stone-800 text-white font-sans text-[9px] font-bold uppercase tracking-wider rounded-lg transition-colors text-center"
                  >
                    Ver Wishlist Amazón
                  </a>
                </motion.div>

                {/* Transferencia Bancaria */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="w-10 h-10 rounded-full bg-luxury-beige-50 flex items-center justify-center text-luxury-beige-600 mx-auto mb-3">
                    <Info className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-stone-900 mb-1">Apoyo Luna de Miel</h4>
                  <p className="font-sans text-[11px] text-stone-500 mb-4 font-light">CLABE Interbancaria <br /><strong>012180011502410313</strong></p>
                  <button
                    onClick={() => copyToClipboard("012180011502410313", "CLABE Interbancaria BBVA")}
                    className="w-full py-1.5 border border-luxury-beige-200 text-luxury-beige-700 hover:bg-luxury-beige-50 font-sans text-[9px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>Copiar CLABE</span>
                  </button>
                </motion.div>

              </div>

            </section>

            {/* ======================================= */}
            {/* 9. SUGERENCIA DE HOSPEDAJE (HOTELS)      */}
            {/* ======================================= */}
            <section className="w-full max-w-3xl px-4 py-8 relative z-10 text-center">
              
              <span className="font-script text-4xl text-luxury-beige-600 block mb-2">Comodidad</span>
              <h2 className="font-display text-2xl text-stone-900 tracking-widest uppercase mb-4">Sugerencias de Hospedaje</h2>
              <p className="font-sans text-xs text-stone-500 font-light max-w-md mx-auto mb-10 leading-relaxed">
                Para nuestros seres queridos que nos acompañan desde fuera de la ciudad de San Luis Potosí, recomendamos reservar con anticipación en los siguientes hoteles con tarifas preferenciales:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Hotel 1 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm flex flex-col hover:scale-[1.01] transition-transform">
                  <div className="h-32 bg-stone-200">
                    <img
                      src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=300&fit=crop&q=70&fm=webp"
                      alt="Hotel de San Agustin"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 flex flex-col grow">
                    <h5 className="font-serif text-sm font-semibold text-stone-900 text-left mb-1">Palacio de San Agustín</h5>
                    <p className="font-sans text-[11px] text-stone-500 font-light text-left leading-relaxed mb-4">
                      <strong>Servicio:</strong> De Lujo, Histórico, Centro Histórico. <br />
                      <strong>Tarifa:</strong> Especial código: BODAAYJ.
                    </p>
                    <a className="mt-auto block w-full py-1.5 border border-stone-200 text-stone-700 rounded-lg font-sans text-[9px] font-bold uppercase tracking-wider hover:bg-stone-50 text-center" href="tel:+524446500910">Llamar Reservar</a>
                  </div>
                </div>

                {/* Hotel 2 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm flex flex-col hover:scale-[1.01] transition-transform">
                  <div className="h-32 bg-stone-200">
                    <img
                      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&fit=crop&q=70&fm=webp"
                      alt="Conrad SLP"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 flex flex-col grow">
                    <h5 className="font-serif text-sm font-semibold text-stone-900 text-left mb-1">Conrad San Luis Potosí</h5>
                    <p className="font-sans text-[11px] text-stone-500 font-light text-left leading-relaxed mb-4">
                      <strong>Servicio:</strong> Moderno, Z. Poniente, alta cocina. <br />
                      <strong>Tarifa:</strong> Descuento directo reservando vía web.
                    </p>
                    <a className="mt-auto block w-full py-1.5 border border-stone-200 text-stone-700 rounded-lg font-sans text-[9px] font-bold uppercase tracking-wider hover:bg-stone-50 text-center" href="tel:+524446500910">Llamar Reservar</a>
                  </div>
                </div>

                {/* Hotel 3 */}
                <div className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm flex flex-col hover:scale-[1.01] transition-transform">
                  <div className="h-32 bg-stone-200">
                    <img
                      src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&fit=crop&q=70&fm=webp"
                      alt="Courtyard SLP"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 flex flex-col grow">
                    <h5 className="font-serif text-sm font-semibold text-stone-900 text-left mb-1">Courtyard Marriott</h5>
                    <p className="font-sans text-[11px] text-stone-500 font-light text-left leading-relaxed mb-4">
                      <strong>Ubicación:</strong> Carr. Matehuala (Cercano). <br />
                      <strong>Tarifa:</strong> Especial familiar de fin de semana.
                    </p>
                    <a className="mt-auto block w-full py-1.5 border border-stone-200 text-stone-700 rounded-lg font-sans text-[9px] font-bold uppercase tracking-wider hover:bg-stone-50 text-center" href="tel:+524446500910">Llamar Reservar</a>
                  </div>
                </div>

              </div>

            </section>

            {/* ======================================= */}
            {/* 10. PREGUNTAS FRECUENTES (FAQ) SECTION   */}
            {/* ======================================= */}
            <section className="w-full max-w-2xl px-4 py-16 relative z-10 text-center">
              
              <span className="font-script text-4xl text-luxury-beige-600 block mb-2">Respuestas</span>
              <h2 className="font-display text-2xl text-stone-900 tracking-widest uppercase mb-12">Preguntas Frecuentes</h2>

              <div className="space-y-4 text-left">
                
                {[
                  {
                    q: '¿Se admiten niños en la boda?',
                    a: 'Nuestra recepción está planificada exclusivamente para adultos. Esperamos que entiendan esta preferencia y que puedan disfrutar de la velada en nuestra compañía.'
                  },
                  {
                    q: '¿Qué tipo de código de vestimenta debo seguir?',
                    a: 'El código de vestimenta es "Gala / Traje Completo Oscuro". Solicitamos cordialmente a nuestras estimadas damas abstenerse de usar vestidos color blanco, marfil o beige.'
                  },
                  {
                    q: '¿El lugar cuenta con estacionamiento?',
                    a: 'Sí, las instalaciones de Jardín Quinta Hermosa cuentan con estacionamiento privado resguardado y servicio complementario de Valet Parking para su mayor comodidad.'
                  },
                  {
                    q: '¿Cómo puedo avisar de alguna alergia alimentaria?',
                    a: 'Puedes indicarlo en el formulario de confirmación de asistencia en la sección de notas, o bien enviarnos un mensaje directo a nuestro WhatsApp personal.'
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-white border border-stone-100 rounded-xl shadow-sm overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full p-4 flex justify-between items-center text-left font-serif text-sm font-semibold text-stone-900 cursor-pointer select-none"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-luxury-beige-500 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expandedFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-t border-stone-50/50"
                        >
                          <p className="p-4 font-sans text-xs text-stone-600 font-light leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

              </div>

            </section>

            {/* ======================================= */}
            {/* 11. INTERACTIVE RSVP WHATSAPP FORM      */}
            {/* ======================================= */}
            <section className="w-full max-w-xl px-4 py-16 text-center relative z-10 bg-white border border-luxury-beige-200/80 rounded-3xl shadow-xl my-12">
              
              <div className="absolute inset-3 border border-dashed border-luxury-beige-200/40 rounded-2xl pointer-events-none" />

              <span className="font-script text-4xl text-luxury-beige-600 block mb-2">Vuestra Compañía</span>
              <h2 className="font-display text-2xl text-stone-900 tracking-widest uppercase mb-4">Confirmación de Asistencia</h2>
              <p className="font-sans text-xs text-stone-500 font-light max-w-sm mx-auto mb-8 leading-relaxed">
                Por favor, confírmanos tu asistencia antes del <strong>30 de Abril de 2027</strong> completando el siguiente formulario para coordinar los pases:
              </p>

              {rsvpEnviado ? (
                <div className="py-8 px-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-stone-900 mb-2">¡Confirmación Enviada!</h4>
                  <p className="font-sans text-xs text-stone-500 font-light tracking-wide max-w-xs mb-6">
                    Se está abriendo el enlace de WhatsApp para registrar los pases con los novios. ¡Esperamos vernos pronto!
                  </p>
                  <button
                    onClick={() => setRsvpEnviado(false)}
                    className="text-xs text-luxury-beige-600 hover:text-luxury-beige-800 underline font-sans font-medium"
                  >
                    Llenar otro formulario
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="text-left space-y-4 relative z-10 max-w-sm mx-auto">
                  
                  {/* Name field */}
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-luxury-beige-600 font-bold mb-1.5">Nombre Completo del Invitado</label>
                    <input
                      type="text"
                      placeholder="Ej. Ing. Carlos González y Sra."
                      value={rsvpData.nombre}
                      onChange={e => setRsvpData({ ...rsvpData, nombre: e.target.value })}
                      className="w-full px-4 py-2.5 bg-luxury-beige-50/50 border border-luxury-beige-200/80 rounded-xl font-sans text-xs focus:ring-1 focus:ring-luxury-beige-500 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Yes or No attendance */}
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-luxury-beige-600 font-bold mb-1.5">¿Asistirás a nuestra boda?</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, asistencia: 'confirmado' })}
                        className={`py-2 px-3 text-xs font-sans rounded-xl border text-center transition-all ${rsvpData.asistencia === 'confirmado' ? 'bg-[#d4af37] text-stone-950 border-[#d4af37] font-semibold' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'}`}
                      >
                        Sí, con gusto asistiré
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, asistencia: 'declinado' })}
                        className={`py-2 px-3 text-xs font-sans rounded-xl border text-center transition-all ${rsvpData.asistencia === 'declinado' ? 'bg-red-800 text-white border-red-800 font-semibold' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'}`}
                      >
                        No podré asistir
                      </button>
                    </div>
                  </div>

                  {/* Tickets Selection */}
                  {rsvpData.asistencia === 'confirmado' && (
                    <div>
                      <label className="block font-sans text-[10px] uppercase tracking-wider text-luxury-beige-600 font-bold mb-1.5">Boletos / Pases a Utilizar</label>
                      <select
                        value={rsvpData.boletos}
                        onChange={e => setRsvpData({...rsvpData, boletos: e.target.value})}
                        className="w-full px-4 py-2.5 bg-luxury-beige-50/50 border border-luxury-beige-200/80 rounded-xl font-sans text-xs focus:outline-none focus:ring-1 focus:ring-luxury-beige-500"
                      >
                        <option value="1">1 Boleto Individual</option>
                        <option value="2">2 Boletos (Pareja)</option>
                        <option value="3">3 Boletos (Familiar)</option>
                        <option value="4">4 Boletos (Familiar Máximo)</option>
                      </select>
                    </div>
                  )}

                  {/* Dietary notes */}
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-luxury-beige-600 font-bold mb-1.5">Alergias o notas de menú (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej. Menú vegetariano, alergia al marisco"
                      value={rsvpData.restricciones}
                      onChange={e => setRsvpData({ ...rsvpData, restricciones: e.target.value })}
                      className="w-full px-4 py-2.5 bg-luxury-beige-50/50 border border-luxury-beige-200/80 rounded-xl font-sans text-xs focus:ring-1 focus:ring-luxury-beige-500 focus:outline-none"
                    />
                  </div>

                  {/* Letter message */}
                  <div>
                    <label className="block font-sans text-[10px] uppercase tracking-wider text-luxury-beige-600 font-bold mb-1.5">Mensaje para Andrea & Josué</label>
                    <textarea
                      rows={2}
                      placeholder="¡Escríbenos una bendición o felicitación!"
                      value={rsvpData.mensaje}
                      onChange={e => setRsvpData({ ...rsvpData, mensaje: e.target.value })}
                      className="w-full px-4 py-2 bg-luxury-beige-50/50 border border-luxury-beige-200/80 rounded-xl font-sans text-xs focus:ring-1 focus:ring-luxury-beige-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-stone-900 to-stone-850 hover:from-stone-950 hover:to-stone-900 text-white font-sans text-[10px] font-bold uppercase tracking-[0.25em] rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <Check className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Confirmar por WhatsApp</span>
                  </button>

                </form>
              )}

            </section>

            {/* ======================================= */}
            {/* 12. CTA FINAL CON PRECIO / REDIRECCIÓN   */}
            {/* ======================================= */}
            <section className="w-full max-w-3xl px-4 py-12 text-center relative z-10">
              
              <FloralDivider />

              <span className="font-script text-3xl text-luxury-beige-600 block mb-2">Te esperamos</span>
              <p className="font-display text-xl text-stone-950 font-normal tracking-widest uppercase mb-1.5 leading-none">Andrea & Josué</p>
              <p className="font-sans text-[9px] uppercase tracking-widest text-[#a69785] font-semibold">"Nuestra historia de amor inicia aquí"</p>

              {/* Redirect to main site */}
              <div className="mt-12 bg-white/60 p-6 rounded-2xl border border-luxury-beige-200/40 shadow-sm max-w-md mx-auto">
                <span className="font-sans text-[8.5px] uppercase tracking-widest font-bold text-stone-400 block mb-2">DEMO INTERACTIVA DE ADAPTACIÓN</span>
                <p className="font-sans text-xs text-stone-600 leading-relaxed font-light mb-6">
                  Esta es una vista previa de la plantilla premium cargada en nuestro domo oficial. ¿Quieres una invitación elegante para tu propio evento?
                </p>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.pathname = '/'; }}
                  className="inline-flex items-center space-x-2.5 py-3 px-6 bg-gradient-to-tr from-stone-850 to-stone-900 hover:from-stone-900 hover:to-stone-950 text-white font-sans text-[9.5px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md hover:translate-y-[-1px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Regresar a Catálogo</span>
                </a>
              </div>

            </section>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
