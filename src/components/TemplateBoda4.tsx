import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Calendar, MapPin, Gift, Clock, Music, Play, Pause, 
  Copy, Check, CheckCircle, Sparkles, Users, ArrowLeft, Send
} from 'lucide-react';
import FoliageCanvas from './FoliageCanvas';

// Elegant minimalist dividers
const MinimalDivider = () => (
  <div className="flex items-center justify-center space-x-3 my-10 opacity-70">
    <div className="h-[0.5px] w-14 bg-stone-300" />
    <span className="font-serif text-[10px] text-stone-400 tracking-[0.3em]">♦</span>
    <div className="h-[0.5px] w-14 bg-stone-300" />
  </div>
);

export default function TemplateBoda4() {
  // Navigation & Envelope stage
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showFoliage, setShowFoliage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Custom toast notification states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Audio system
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create soft, romantic classical piano loop
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.45;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Fallback for autoplay blocks
      });
    }
    setIsPlaying(!isPlaying);
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const copyToClipboard = (text: string, title: string, index: number) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(() => {
            setCopiedIndex(index);
            triggerToast(`¡${title} copiado con éxito!`);
            setTimeout(() => setCopiedIndex(null), 2500);
          })
          .catch(() => {
            fallbackCopy(text, title, index);
          });
      } else {
        fallbackCopy(text, title, index);
      }
    } catch (err) {
      fallbackCopy(text, title, index);
    }
  };

  const fallbackCopy = (text: string, title: string, index: number) => {
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
        setCopiedIndex(index);
        triggerToast(`¡${title} copiado con éxito!`);
        setTimeout(() => setCopiedIndex(null), 2500);
      } else {
        triggerToast(`${title}: ${text}`);
      }
    } catch (e) {
      triggerToast(`${title}: ${text}`);
    }
  };

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
    setShowFoliage(true);
    // Auto-play music if allowed
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  // RSVP Form States
  const [rsvpData, setRsvpData] = useState({
    nombre: '',
    boletos: '2',
    asistencia: 'si',
    restricciones: '',
    mensaje: ''
  });

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.nombre.trim()) {
      triggerToast('⚠️ Por favor ingresa tu nombre');
      return;
    }

    const confirmStatus = rsvpData.asistencia === 'si' ? '✅ CONFIRMO mi asistencia con alegría' : '❌ Lamentablemente NO podré asistir';
    const messageText = `Hola Andrés & Paulete, Confirmo mi asistencia para su boda:\n\n👤 *Nombre:* ${rsvpData.nombre}\n⭐ *Estado:* ${confirmStatus}\n🎫 *Pases:* ${rsvpData.boletos}\n🍽️ *Detalles/Dieta:* ${rsvpData.restricciones || 'Ninguno'}\n💬 *Mensaje:* "${rsvpData.mensaje || '¡Muchas felicidades!'}"\n\n_Enviado desde el demo de invitaonline.mx_`;
    
    const encoded = encodeURIComponent(messageText);
    const targetUrl = `https://wa.me/523310000000?text=${encoded}`;
    
    triggerToast('✨ ¡Redireccionando a WhatsApp de confirmación!');
    setTimeout(() => {
      window.open(targetUrl, '_blank');
    }, 1000);
  };

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const targetDate = new Date('2027-11-15T18:30:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F3] font-sans selection:bg-stone-200 selection:text-stone-900 overflow-x-hidden relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-stone-950 text-[#F5F5F3] px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-2.5 border border-stone-800"
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span className="font-serif text-[10.5px] uppercase tracking-[0.15em] font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating back controller to close demo view */}
      <a
        href="#"
        className="fixed top-4 left-4 z-40 bg-white/90 hover:bg-white text-stone-900 p-2.5 rounded-full shadow-lg border border-stone-200/55 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 group"
        title="Volver al inicio"
      >
        <ArrowLeft className="w-4 h-4 text-stone-700 group-hover:-translate-x-0.5 transition-transform" />
      </a>

      {/* Floating Audio Play Controller when opened */}
      {envelopeOpened && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-40 bg-white/90 hover:bg-white text-stone-950 p-3.5 rounded-full shadow-2xl border border-stone-200/50 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-90"
          title={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-stone-500/10" />
              <Pause className="w-4 h-4 text-stone-900" />
            </div>
          ) : (
            <Play className="w-4 h-4 text-stone-900 fill-stone-900" />
          )}
        </button>
      )}

      {/* Canvas for elegant organic falling foliage */}
      {showFoliage && <FoliageCanvas />}

      <AnimatePresence mode="wait">
        {!envelopeOpened ? (
          /* ENVELOPE INITIAL SCREEN (CENTER SCREEN OF IMAGE) */
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="min-h-screen relative flex items-center justify-center bg-[#F5F5F3] px-4 py-8 overflow-hidden"
          >
            {/* Fine line details in background */}
            <div className="absolute inset-0 border-[16px] border-white/60 pointer-events-none z-20" />
            
            <div className="relative w-full max-w-[390px] text-center bg-white border border-stone-200/80 rounded-3xl p-6 shadow-[0_24px_55px_rgba(26,26,26,0.06)] z-10">
              
              {/* Inner geometric delicate line border */}
              <div className="absolute inset-2.5 border border-stone-100 rounded-2xl pointer-events-none" />

              {/* Main grayscale image representing the classic walk */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 border border-stone-200/30">
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200&fm=webp"
                  alt="Andrés & Paulete walking"
                  className="w-full h-full object-cover filter grayscale contrast-[1.08] brightness-[0.98]"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
              </div>

              {/* Monogram Monogram "AP" based precisely on the drawing/design in image */}
              <div className="mt-8 mb-5 select-none">
                <span className="font-script text-[48px] text-stone-950 block leading-none font-normal tracking-wide">
                  AP
                </span>
                <div className="h-[1px] w-8 bg-stone-300 mx-auto mt-2" />
              </div>

              {/* Elegant, clean pill-shaped button based exactly on the image: "ABRIR INVITACIÓN" */}
              <button
                onClick={handleOpenEnvelope}
                className="w-full max-w-[220px] mx-auto py-3.5 bg-[#1a1a1a] hover:bg-stone-800 text-[#F5F5F3] font-sans text-[9px] uppercase tracking-[0.25em] font-medium rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-stone-900/10 flex items-center justify-center space-x-2"
              >
                <Heart className="w-3.5 h-3.5 text-white/90 fill-white/10" />
                <span>Abrir Invitación</span>
              </button>

              <div className="mt-6 text-[8px] font-sans text-stone-400 tracking-[0.2em] uppercase font-light">
                Andrés & Paulete · Noviembre 15
              </div>

            </div>
          </motion.div>
        ) : (
          /* MAIN INVITATION INSIDE VIEW (COMBINATION OF SCREEN 1 & 3 DETAILED CONTENT) */
          <motion.div
            key="invitation-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="w-full max-w-[460px] mx-auto bg-white min-h-screen shadow-2xl relative border-x border-stone-200/50 pb-20 overflow-hidden"
          >
            {/* Elegant luxury framing */}
            <div className="absolute inset-0 border-[12px] border-[#F5F5F3] pointer-events-none z-30" />

            {/* SCREEN 1 PORTRAIT CARD BLOCK AND INVITATION INTRO */}
            <div className="relative px-8 pt-16 pb-12 text-center">
              
              {/* Very minimal crest icon */}
              <div className="mb-6 flex justify-center">
                <svg className="w-7 h-7 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Monogram script: Andrés y Paulete */}
              <h1 className="font-script text-[42px] leading-tight text-stone-950 font-normal tracking-wide">
                Andrés y Paulete
              </h1>

              <div className="h-[0.5px] w-20 bg-stone-300 mx-auto my-6" />

              {/* Sub-headline translation based on image screen 1 */}
              <p className="font-serif text-[9px] uppercase tracking-[0.22em] text-stone-500 leading-[2.1] max-w-[320px] mx-auto font-light">
                TENEMOS EL HONOR DE INVITARLOS A NUESTRO MATRIMONIO QUE SE LLEVARÁ A CABO EL DÍA
              </p>

              {/* Date display layout exactly styled from image left phone */}
              <div className="my-10 border-y border-stone-100 py-6 text-left max-w-[300px] mx-auto flex items-center justify-between">
                <div>
                  <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-stone-400 block mb-1">NOVIEMBRE</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="font-serif text-3xl font-normal text-stone-950">15</span>
                    <span className="font-serif text-[11px] text-stone-400 tracking-wider">2027</span>
                  </div>
                </div>

                <div className="h-10 w-[0.5px] bg-stone-300" />

                <div className="text-right">
                  <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-stone-400 block mb-1">HORARIO</span>
                  <span className="font-serif text-3xl font-normal text-stone-950 tracking-tight">6:30 <span className="text-[12px] font-sans font-medium text-stone-500">P.M.</span></span>
                </div>
              </div>

              {/* Beautiful minimal wedding arch silhouette line art (representing image hand icon) */}
              <div className="flex justify-center opacity-40 mb-10 select-none">
                <svg className="w-16 h-16 text-stone-950" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M20,90 L20,40 C20,20 80,20 80,40 L80,90" />
                  <path d="M15,90 L85,90" />
                  <path d="M20,45 L80,45" />
                  <circle cx="50" cy="23" r="4" />
                  <path d="M50,27 L50,38" />
                  <path d="M44,33 L56,33" />
                  <path d="M35,60 C35,60 40,55 50,55 C60,55 65,60 65,60" />
                </svg>
              </div>

              {/* Location display exactly styled from image */}
              <div className="space-y-4 max-w-[320px] mx-auto">
                <h3 className="font-serif text-[13px] uppercase tracking-[0.25em] text-stone-900 font-semibold">
                  JARDINES DEL SOL
                </h3>
                <p className="font-sans text-[10.5px] text-stone-500 tracking-wide font-light leading-relaxed">
                  Blvd. Federico Benítez López 15300, <br />
                  El Pedregal, 22100 Tijuana, B.C.
                </p>

                {/* Minimalist black button based on image: "UBICACIÓN" */}
                <a
                  href="https://maps.google.com/?q=Blvd.+Federico+Benitez+Lopez+15300,+Tijuana,+B.C."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-8 py-2.5 bg-[#1a1a1a] hover:bg-stone-800 text-[#F5F5F3] font-sans text-[8.5px] uppercase tracking-[0.25em] font-medium rounded-full transition-all duration-300 shadow-sm"
                >
                  <MapPin className="w-3.5 h-3.5 text-white/90" />
                  <span>Ubicación</span>
                </a>

                <p className="font-serif text-[10.5px] italic text-stone-400 pt-6 block select-none">
                  recepción a seguir
                </p>

                {/* Disco ball icon or vintage cross from image bottom */}
                <div className="flex justify-center opacity-30 pt-4">
                  <svg className="w-10 h-10 text-stone-950 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="12" cy="12" r="8" />
                    <line x1="12" y1="4" x2="12" y2="20" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <path d="M6.34 6.34l11.32 11.32" />
                    <path d="M17.66 6.34L6.34 17.66" />
                  </svg>
                </div>

              </div>

            </div>

            <MinimalDivider />

            {/* COUNTDOWN SECTION DESIGNED IN VINTAGE GRAYSCALE */}
            <div className="px-8 py-6 text-center bg-stone-50 border-y border-stone-100">
              <span className="font-serif text-[8.5px] uppercase tracking-[0.3em] text-stone-400 block mb-6">EL MOMENTO ESTÁ POR LLEGAR</span>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16">
                  <span className="font-serif text-2xl font-light text-stone-900 block">{timeLeft.days}</span>
                  <span className="font-sans text-[8px] uppercase tracking-wider text-stone-400 font-light">Días</span>
                </div>
                <div className="text-stone-300 font-serif">:</div>
                <div className="w-16">
                  <span className="font-serif text-2xl font-light text-stone-900 block">{timeLeft.hours}</span>
                  <span className="font-sans text-[8px] uppercase tracking-wider text-stone-400 font-light">Horas</span>
                </div>
                <div className="text-stone-300 font-serif">:</div>
                <div className="w-16">
                  <span className="font-serif text-2xl font-light text-stone-900 block">{timeLeft.minutes}</span>
                  <span className="font-sans text-[8px] uppercase tracking-wider text-stone-400 font-light">Minutos</span>
                </div>
                <div className="text-stone-300 font-serif">:</div>
                <div className="w-16">
                  <span className="font-serif text-2xl font-light text-stone-900 block">{timeLeft.seconds}</span>
                  <span className="font-sans text-[8px] uppercase tracking-wider text-stone-400 font-light">Segs</span>
                </div>
              </div>
            </div>

            <MinimalDivider />

            {/* TIMELINE / ITINERARIO SCREEN (SCREEN 3 OF IMAGE) */}
            <div className="px-8 py-4 text-center">
              
              {/* Grayscale portrait closeup image of embrace matching screen 3 */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200/40 mb-10 max-w-[340px] mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1200&fm=webp"
                  alt="Unión Andrés & Paulete close portrait"
                  className="w-full h-full object-cover filter grayscale contrast-[1.1] brightness-[0.95]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>

              {/* Title exactly matched from the image */}
              <h2 className="font-serif text-xl md:text-2xl font-light text-stone-900 tracking-[0.25em] uppercase mb-12">
                ITINERARIO
              </h2>

              {/* Vertical timeline matching design of Screen 3 */}
              <div className="relative max-w-[280px] mx-auto pb-10">
                
                {/* Central vertical line */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[0.5px] h-full bg-stone-300 z-0" />

                {/* Timeline Items with beautiful vector SVGs resembling those in the image */}
                
                {/* 1. CEREMONIA */}
                <div className="relative grid grid-cols-2 gap-4 my-10 items-center z-10">
                  <div className="text-right pr-6">
                    <h4 className="font-serif text-[11px] font-semibold text-stone-900 uppercase tracking-widest mb-1">Ceremonia</h4>
                    <span className="font-sans text-[10px] text-stone-400 font-light">6:30 P.M.</span>
                  </div>

                  {/* Icon centered precisely on the line */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center shadow-xs">
                    <svg className="w-4 h-4 text-stone-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="10" cy="14" r="5" />
                      <circle cx="15" cy="10" r="5" />
                    </svg>
                  </div>

                  <div className="text-left pl-6" />
                </div>

                {/* 2. RECEPCIÓN */}
                <div className="relative grid grid-cols-2 gap-4 my-12 items-center z-10">
                  <div className="text-right pr-6" />

                  {/* Icon centered precisely on the line */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center shadow-xs">
                    <svg className="w-4 h-4 text-stone-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M12 2L3 9h18L12 2zM5 11h14v10H5V11z" />
                    </svg>
                  </div>

                  <div className="text-left pl-6">
                    <h4 className="font-serif text-[11px] font-semibold text-stone-900 uppercase tracking-widest mb-1">Recepción</h4>
                    <span className="font-sans text-[10px] text-stone-400 font-light">7:30 P.M.</span>
                  </div>
                </div>

                {/* 3. CENA */}
                <div className="relative grid grid-cols-2 gap-4 my-12 items-center z-10">
                  <div className="text-right pr-6">
                    <h4 className="font-serif text-[11px] font-semibold text-stone-900 uppercase tracking-widest mb-1">Cena</h4>
                    <span className="font-sans text-[10px] text-stone-400 font-light">9:00 P.M.</span>
                  </div>

                  {/* Icon centered precisely on the line */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center shadow-xs">
                    <svg className="w-4 h-4 text-stone-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="12" cy="12" r="6" />
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    </svg>
                  </div>

                  <div className="text-left pl-6" />
                </div>

                {/* 4. BAILE */}
                <div className="relative grid grid-cols-2 gap-4 my-10 items-center z-10">
                  <div className="text-right pr-6" />

                  {/* Icon centered precisely on the line */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-stone-300 flex items-center justify-center shadow-xs">
                    <svg className="w-4 h-4 text-stone-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M9 18V5l12-2v13M9 15c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm12-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  </div>

                  <div className="text-left pl-6">
                    <h4 className="font-serif text-[11px] font-semibold text-stone-900 uppercase tracking-widest mb-1">Baile</h4>
                    <span className="font-sans text-[10px] text-stone-400 font-light">10:00 P.M.</span>
                  </div>
                </div>

              </div>

            </div>

            <MinimalDivider />

            {/* MESA DE REGALOS / VINTAGE GIFTS */}
            <div className="px-8 py-6 text-center">
              <Gift className="w-6 h-6 text-stone-400 mx-auto mb-4" />
              <h3 className="font-serif text-sm uppercase tracking-[0.25em] text-stone-900 font-semibold mb-2">
                MESA DE REGALOS
              </h3>
              <p className="font-sans text-[10px] text-stone-500 font-light leading-relaxed max-w-xs mx-auto mb-8">
                Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros, te compartimos nuestras cuentas oficiales:
              </p>

              <div className="space-y-4 max-w-[320px] mx-auto text-left">
                {/* Bank account details with verified copying support */}
                {[
                  { title: 'Banco Santander (Clabe)', text: '0121 8001 2345 6789 01', icon: '🏦' },
                  { title: 'Mesa Liverpool (Código)', text: '54890123', icon: '🎁' }
                ].map((item, index) => (
                  <div key={index} className="bg-stone-50/70 border border-stone-200/60 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-serif text-[8px] uppercase tracking-wider text-stone-400 block mb-1">
                        {item.icon} {item.title}
                      </span>
                      <span className="font-mono text-[10px] font-medium text-stone-800 tracking-wide">{item.text}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.text, item.title, index)}
                      className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-200 text-stone-800 rounded-lg text-[8.5px] font-sans font-semibold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Listo</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <MinimalDivider />

            {/* RSVP CONFIRMATION SCREEN (MATCHING MONOCHROME THEME) */}
            <div className="px-8 py-6 text-center bg-stone-50/70 border-y border-stone-100">
              <Users className="w-6 h-6 text-stone-400 mx-auto mb-4" />
              <h3 className="font-serif text-sm uppercase tracking-[0.25em] text-stone-900 font-semibold mb-2">
                CONFIRMAR ASISTENCIA
              </h3>
              <p className="font-sans text-[10px] text-stone-500 font-light leading-relaxed max-w-xs mx-auto mb-8">
                Agradecemos confirmar tu asistencia antes del 15 de Octubre de 2027 para coordinar los detalles finales.
              </p>

              <form onSubmit={handleRsvpSubmit} className="max-w-[320px] mx-auto text-left space-y-4">
                <div>
                  <label className="block font-sans text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">Nombre Completo</label>
                  <input
                    type="text"
                    value={rsvpData.nombre}
                    onChange={(e) => setRsvpData({ ...rsvpData, nombre: e.target.value })}
                    placeholder="Ej. Sra. Paulete de Anda"
                    className="w-full px-3.5 py-3 border border-stone-200 bg-white rounded-xl text-[10.5px] font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">Nº de Pases</label>
                    <select
                      value={rsvpData.boletos}
                      onChange={(e) => setRsvpData({ ...rsvpData, boletos: e.target.value })}
                      className="w-full px-3.5 py-3 border border-stone-200 bg-white rounded-xl text-[10.5px] font-sans text-stone-800 focus:outline-none focus:border-stone-400 transition-colors"
                    >
                      {['1', '2', '3', '4', '5', '6'].map((n) => (
                        <option key={n} value={n}>{n} {parseInt(n) === 1 ? 'Pase' : 'Pases'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">¿Asistirás?</label>
                    <div className="flex border border-stone-200 bg-white rounded-xl overflow-hidden h-11">
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, asistencia: 'si' })}
                        className={`flex-1 text-[9px] font-sans font-bold uppercase tracking-wider transition-colors ${
                          rsvpData.asistencia === 'si' ? 'bg-[#1a1a1a] text-white' : 'text-stone-500 bg-transparent'
                        }`}
                      >
                        Sí
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, asistencia: 'no' })}
                        className={`flex-1 text-[9px] font-sans font-bold uppercase tracking-wider transition-colors ${
                          rsvpData.asistencia === 'no' ? 'bg-[#1a1a1a] text-white' : 'text-stone-500 bg-transparent'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">Restricciones Alimentarias (Opcional)</label>
                  <input
                    type="text"
                    value={rsvpData.restricciones}
                    onChange={(e) => setRsvpData({ ...rsvpData, restricciones: e.target.value })}
                    placeholder="Ej. Alergias, Menú infantil, Vegetariano"
                    className="w-full px-3.5 py-3 border border-stone-200 bg-white rounded-xl text-[10.5px] font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[9px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">Mensaje de Felicitación</label>
                  <textarea
                    value={rsvpData.mensaje}
                    onChange={(e) => setRsvpData({ ...rsvpData, mensaje: e.target.value })}
                    placeholder="¡Dejen un hermoso deseo!"
                    rows={3}
                    className="w-full px-3.5 py-3 border border-stone-200 bg-white rounded-xl text-[10.5px] font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1a1a1a] hover:bg-stone-800 text-white font-sans text-[9px] uppercase tracking-[0.25em] font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar por WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Clean minimalist luxury footer signature */}
            <div className="mt-16 text-center px-8 text-[8.5px] font-sans text-stone-300 tracking-[0.2em] uppercase font-light">
              Andrés & Paulete <br />
              <span className="text-[7.5px] text-stone-300/60 block mt-1.5">Hecho con amor por invitaonline.mx</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
