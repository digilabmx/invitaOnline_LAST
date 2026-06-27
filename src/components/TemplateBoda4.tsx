import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Heart, Calendar, MapPin, Gift, Clock, Music, Play, Pause, 
  Copy, Check, Sparkles, Users, ArrowLeft, Send, ExternalLink, ChevronLeft, ChevronRight, Home, Info, X,
  Volume2, VolumeX
} from 'lucide-react';
import FoliageCanvas from './FoliageCanvas';

// Elegant minimalist dividers
const LuxuryDivider = () => (
  <div className="flex items-center justify-center space-x-4 my-14 opacity-70">
    <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent to-[#c5a880]" />
    <span className="font-serif text-[11px] text-[#c5a880] tracking-[0.4em] select-none">✦ ✦ ✦</span>
    <div className="h-[0.5px] w-16 bg-gradient-to-l from-transparent to-[#c5a880]" />
  </div>
);

// Scroll reveal animations container
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}
const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default function TemplateBoda4() {
  // Navigation & Envelope stage
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showFoliage, setShowFoliage] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicCardOpen, setIsMusicCardOpen] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);
  
  // Custom toast notification states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Audio system
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-rotating gallery pictures
  const galleryImages = [
    "/sofia_alejandro_stairs_1782247280237.webp",
    "/wedding_portrait_1781994427687.webp",
    "/v_s_hero_1782248283047.webp"
  ];

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

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Gallery auto rotation
  useEffect(() => {
    if (!envelopeOpened) return;
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % galleryImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [envelopeOpened, galleryImages.length]);

  const toggleMusic = () => {
    setIsMusicCardOpen(!isMusicCardOpen);
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
    setIsOpening(true);

    // Play music immediately within user click gesture to guarantee autoplay
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

    setTimeout(() => {
      setEnvelopeOpened(true);
      setShowFoliage(true);
      setIsMusicCardOpen(true);
    }, 900); // Wait for luxury card slide up transition
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
    <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-stone-200 selection:text-stone-900 overflow-x-hidden relative text-stone-800">
      
      {/* Falling leaves effect removed as requested */}

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -45, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.93 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a] text-[#FDFBF7] px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-3 border border-stone-800"
          >
            <div className="w-2 h-2 bg-[#c5a880] rounded-full animate-pulse" />
            <span className="font-serif text-[11px] uppercase tracking-[0.18em] font-medium text-white">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating back controller to close demo view */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.pathname = '/'; }}
        className="fixed top-5 left-5 z-40 bg-white/95 hover:bg-white text-stone-900 p-3 rounded-full shadow-lg border border-stone-200/55 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 group"
        title="Volver al catálogo"
      >
        <ArrowLeft className="w-4 h-4 text-stone-700 group-hover:-translate-x-0.5 transition-transform" />
      </a>

      {/* Floating Premium Native Audio Player (appears only when open) */}
      <AnimatePresence>
        {envelopeOpened && (
          <>
            {isMusicCardOpen ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-[#FDFBF7]/95 backdrop-blur-md rounded-full border border-[#c5a880]/30 p-1.5 shadow-[0_4px_20px_rgba(42,37,33,0.15)] font-sans"
              >
                <button 
                  onClick={togglePlayPause}
                  className="w-8 h-8 rounded-full bg-[#c5a880] hover:bg-[#b59870] text-white flex items-center justify-center transition-all active:scale-95 shadow-md flex-shrink-0"
                  title={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white ml-0.5" />}
                </button>
                <div className="pr-1 pl-1 min-w-0 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-[#1a1a1a] whitespace-nowrap leading-none block">A Thousand Years</span>
                  <span className="text-[8px] text-stone-500 whitespace-nowrap leading-none block mt-0.5">Música de Fondo</span>
                </div>
                <button 
                  onClick={toggleMusic} 
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
                onClick={toggleMusic}
                className="fixed bottom-6 right-6 z-40 p-3 bg-[#c5a880] text-white rounded-full shadow-2xl hover:bg-[#b59870] hover:scale-105 active:scale-95 transition-all group flex items-center justify-center border border-[#c5a880]/40"
                aria-label="Escuchar música"
              >
                <Music className="w-4 h-4 group-hover:scale-110 transition-transform text-white" />
              </motion.button>
            )}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!envelopeOpened ? (
          /* ENVELOPE INITIAL SCREEN (CENTER SCREEN OF IMAGE) */
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -40 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen relative flex items-center justify-center bg-[#FDFBF7] px-4 py-8 overflow-hidden"
          >
            {/* Elegant luxury framing in gold tones */}
            <div className="absolute inset-0 border-[16px] border-white/80 pointer-events-none z-20" />
            <div className="absolute inset-4 border border-[#c5a880]/20 pointer-events-none z-20" />
            
            {/* Decorative background vectors representing a minimalist wedding space */}
            <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-gradient-to-tr from-[#faece6]/40 to-transparent rounded-full filter blur-3xl" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-gradient-to-bl from-[#faece6]/40 to-transparent rounded-full filter blur-3xl" />

            <motion.div 
              animate={isOpening ? { scale: 0.96, y: -20, opacity: 0.7 } : { scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[390px] text-center bg-white border border-stone-200/50 rounded-3xl p-6 shadow-[0_24px_55px_rgba(166,137,102,0.08)] z-10"
            >
              
              {/* Inner geometric delicate line border */}
              <div className="absolute inset-2.5 border border-[#c5a880]/15 rounded-2xl pointer-events-none" />

              {/* Main premium image representing the classic walk */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/30">
                <img
                  src="/wedding_portrait_1781994427687.webp"
                  alt="Andrés & Paulete"
                  className="w-full h-full object-cover filter grayscale contrast-[1.05] brightness-[0.98]"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Embedded luxury overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xs py-2 px-3 rounded-lg border border-stone-100 text-center">
                  <p className="font-serif text-[10px] text-[#c5a880] uppercase tracking-[0.2em] font-medium">Boda de Ensueño</p>
                </div>
              </div>

              {/* Invitation Text precisely matching requirements */}
              <div className="mt-8 mb-5">
                <p className="font-serif text-[11px] text-stone-500 uppercase tracking-[0.25em] mb-1">Invitación de Honor</p>
                <h3 className="font-sans text-[13px] text-[#1a1a1a] uppercase tracking-[0.18em] font-light">
                  Has sido invitado(a) a mi boda
                </h3>
              </div>

              {/* Monogram "AP" based on elegant classic typography */}
              <div className="mb-7 select-none">
                <span className="font-script text-[54px] text-[#c5a880] block leading-none font-normal">
                  AP
                </span>
                <div className="h-[0.5px] w-12 bg-[#c5a880]/30 mx-auto mt-2" />
              </div>

              {/* Elegant pill-shaped button: "ABRIR INVITACIÓN" */}
              <button
                onClick={handleOpenEnvelope}
                disabled={isOpening}
                className="w-full max-w-[220px] mx-auto py-4 bg-[#1a1a1a] hover:bg-[#c5a880] text-white hover:text-white font-sans text-[10px] uppercase tracking-[0.25em] font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Heart className="w-3.5 h-3.5 text-white/90 fill-white/10" />
                <span>{isOpening ? "Abriendo..." : "Abrir Invitación"}</span>
              </button>

              <div className="mt-6 text-[8.5px] font-sans text-stone-400 tracking-[0.2em] uppercase font-light">
                Tijuana, B.C. · Noviembre 15, 2027
              </div>

            </motion.div>
          </motion.div>
        ) : (
          /* MAIN INVITATION INSIDE VIEW (LUXURY IMMERSIVE LANDING PAGE) */
          <motion.div
            key="invitation-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full max-w-[465px] mx-auto bg-white min-h-screen shadow-[0_0_80px_rgba(166,137,102,0.12)] relative border-x border-[#c5a880]/15 pb-20 overflow-hidden text-[#1a1a1a]"
          >
            {/* Elegant gold outer frame */}
            <div className="absolute inset-0 border-[12px] border-[#FDFBF7] pointer-events-none z-30" />
            <div className="absolute inset-5 border-[0.5px] border-[#c5a880]/20 pointer-events-none z-30" />

            {/* 1. HERO HEADER SECTION */}
            <div className="relative pt-24 pb-14 px-8 text-center bg-gradient-to-b from-[#fdf6f0]/30 to-white">
              
              {/* Floating crest element */}
              <div className="mb-7 flex justify-center">
                <div className="relative p-2 border border-[#c5a880]/30 rounded-full animate-pulse">
                  <Heart className="w-5 h-5 text-[#c5a880] fill-[#c5a880]/10" />
                </div>
              </div>

              {/* Bride & Groom names with stunning calligraphy */}
              <h1 className="font-script text-[54px] leading-none text-[#1a1a1a] font-normal tracking-wide">
                Andrés y Paulete
              </h1>

              <div className="h-[0.5px] w-24 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mx-auto my-7" />

              <p className="font-serif text-[10px] uppercase tracking-[0.26em] text-stone-500 leading-relaxed max-w-[320px] mx-auto font-light mb-8">
                TENEMOS EL GRAN HONOR DE INVITARLOS A NUESTRO ENLACE NUPCIAL QUE SE LLEVARÁ A CABO EL DÍA:
              </p>

              {/* Main Wedding Grayscale portrait matching instructions placeholder */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100 border border-[#c5a880]/10 shadow-xl my-10">
                <img
                  src="/sofia_alejandro_stairs_1782247280237.webp"
                  alt="Wedding Couple"
                  className="w-full h-full object-cover filter grayscale contrast-[1.06] brightness-[0.97]"
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />
                <div className="absolute bottom-6 left-6 text-left">
                  <p className="font-serif text-white/90 text-[11px] tracking-widest uppercase">NUESTRO COMPROMISO</p>
                  <h4 className="font-script text-white text-3xl font-light">Para siempre, tú y yo</h4>
                </div>
              </div>

              {/* Date display layout exactly styled from elegant luxury designs */}
              <div className="border-y border-[#c5a880]/20 py-8 text-left max-w-[320px] mx-auto flex items-center justify-between">
                <div>
                  <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-[#c5a880] block mb-2 font-medium">NOVIEMBRE</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="font-serif text-4xl font-normal text-stone-900 leading-none">15</span>
                    <span className="font-serif text-[12px] text-stone-400 tracking-wider">2027</span>
                  </div>
                </div>

                <div className="h-12 w-[0.5px] bg-[#c5a880]/30" />

                <div className="text-right">
                  <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-[#c5a880] block mb-2 font-medium">HORARIO</span>
                  <span className="font-serif text-3xl font-normal text-stone-900 tracking-tight leading-none">6:30 <span className="text-[14px] font-sans font-semibold text-stone-500">P.M.</span></span>
                </div>
              </div>

            </div>

            {/* REAL-TIME COUNTDOWN TIMER (Header segment) */}
            <div className="px-8 py-8 text-center bg-[#fdf6f0]/40 border-y border-[#c5a880]/15">
              <span className="font-serif text-[9px] uppercase tracking-[0.3em] text-[#c5a880] block mb-6 font-semibold">COMIENZA LA CUENTA REGRESIVA</span>
              
              <div className="flex items-center justify-center space-x-4 max-w-[320px] mx-auto">
                <div className="w-16 py-2 bg-white/70 backdrop-blur-xs rounded-xl border border-stone-100">
                  <span className="font-serif text-2xl font-light text-stone-900 block leading-none mb-1">{timeLeft.days}</span>
                  <span className="font-sans text-[8px] uppercase tracking-widest text-stone-400">Días</span>
                </div>
                <div className="text-[#c5a880]/50 font-serif text-xl">:</div>
                <div className="w-16 py-2 bg-white/70 backdrop-blur-xs rounded-xl border border-stone-100">
                  <span className="font-serif text-2xl font-light text-stone-900 block leading-none mb-1">{timeLeft.hours}</span>
                  <span className="font-sans text-[8px] uppercase tracking-widest text-stone-400">Hrs</span>
                </div>
                <div className="text-[#c5a880]/50 font-serif text-xl">:</div>
                <div className="w-16 py-2 bg-white/70 backdrop-blur-xs rounded-xl border border-stone-100">
                  <span className="font-serif text-2xl font-light text-stone-900 block leading-none mb-1">{timeLeft.minutes}</span>
                  <span className="font-sans text-[8px] uppercase tracking-widest text-stone-400">Mins</span>
                </div>
                <div className="text-[#c5a880]/50 font-serif text-xl">:</div>
                <div className="w-16 py-2 bg-white/70 backdrop-blur-xs rounded-xl border border-stone-100">
                  <span className="font-serif text-2xl font-light text-stone-900 block leading-none mb-1">{timeLeft.seconds}</span>
                  <span className="font-sans text-[8px] uppercase tracking-widest text-stone-400">Segs</span>
                </div>
              </div>
            </div>

            <LuxuryDivider />

            {/* 2. INFORMACIÓN / EVENT DETAILS SECTION */}
            <ScrollReveal>
              <div className="px-8 text-center">
                <Calendar className="w-6 h-6 text-[#c5a880] mx-auto mb-5" />
                <h2 className="font-serif text-lg tracking-[0.25em] text-[#1a1a1a] uppercase mb-4">Información</h2>
                
                {/* Beautiful minimal wedding arch silhouette line art (representing luxury hand drawn icon) */}
                <div className="flex justify-center opacity-30 my-8 select-none">
                  <svg className="w-16 h-16 text-[#c5a880]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M20,90 L20,40 C20,20 80,20 80,40 L80,90" />
                    <path d="M15,90 L85,90" />
                    <circle cx="50" cy="23" r="4" />
                    <path d="M50,27 L50,38" />
                    <path d="M44,33 L56,33" />
                  </svg>
                </div>

                <div className="space-y-6 max-w-[320px] mx-auto">
                  <div>
                    <span className="font-serif text-[9px] uppercase tracking-[0.25em] text-[#c5a880] block mb-1">CEREMONIA RELIGIOSA</span>
                    <h3 className="font-serif text-[14px] text-[#1a1a1a] uppercase tracking-widest font-semibold">Templo de la Sagrada Familia</h3>
                    <p className="font-sans text-[10.5px] text-stone-500 tracking-wide font-light leading-relaxed mt-1">
                      6:30 P.M. · Blvd. de los Conquistadores 450, Tijuana
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100">
                    <span className="font-serif text-[9px] uppercase tracking-[0.25em] text-[#c5a880] block mb-1">RECEPCIÓN Y FIESTA</span>
                    <h3 className="font-serif text-[14px] text-[#1a1a1a] uppercase tracking-widest font-semibold">Jardines del Sol</h3>
                    <p className="font-sans text-[10.5px] text-stone-500 tracking-wide font-light leading-relaxed mt-1">
                      7:30 P.M. · Blvd. Federico Benítez López 15300, El Pedregal
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <LuxuryDivider />

            {/* 3. MAPS / UBICACIÓN SECTION */}
            <ScrollReveal>
              <div className="px-8 text-center">
                <MapPin className="w-6 h-6 text-[#c5a880] mx-auto mb-5" />
                <h2 className="font-serif text-lg tracking-[0.25em] text-[#1a1a1a] uppercase mb-2">Ubicación</h2>
                <p className="font-sans text-[10.5px] text-stone-400 font-light tracking-wide max-w-xs mx-auto mb-8">
                  Te facilitamos los accesos directos con Google Maps para ambos recintos importantes de nuestro día:
                </p>

                <div className="space-y-8 max-w-[340px] mx-auto text-left">
                  {/* Google Maps embed for Ceremony */}
                  <div className="bg-white border border-[#c5a880]/20 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-lg">⛪</span>
                      <div>
                        <h4 className="font-serif text-[11px] font-bold uppercase tracking-wider text-stone-800">Ceremonia Religiosa</h4>
                        <span className="font-sans text-[9px] text-stone-400">Clic en el mapa para navegar</span>
                      </div>
                    </div>
                    {/* Embedded interactive Google Maps iframe placeholder */}
                    <div className="w-full h-44 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                      <iframe 
                        title="Google Maps Ceremonia"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13451.9868779951!2d-116.985!3d32.502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9472f!2sTijuana%2C+B.C.!5e0!3m2!1ses-419!2smx!4v1"
                        className="w-full h-full border-0 filter grayscale"
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <a 
                        href="https://maps.google.com/?q=Blvd.+de+los+Conquistadores+450,+Tijuana,+B.C." 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[9px] uppercase tracking-widest font-sans font-bold text-[#c5a880] hover:text-stone-900 transition-colors flex items-center space-x-1"
                      >
                        <span>Abrir en Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Google Maps embed for Reception */}
                  <div className="bg-white border border-[#c5a880]/20 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-lg">🌸</span>
                      <div>
                        <h4 className="font-serif text-[11px] font-bold uppercase tracking-wider text-stone-800">Recepción & Fiesta</h4>
                        <span className="font-sans text-[9px] text-stone-400">Clic en el mapa para navegar</span>
                      </div>
                    </div>
                    {/* Embedded interactive Google Maps iframe placeholder */}
                    <div className="w-full h-44 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                      <iframe 
                        title="Google Maps Recepcion"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3362.483928174415!2d-116.9739446!3d32.5117222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d947efbc3b39d1%3A0x6b87b7aeb29a28be!2sBlvd.%20Federico%20Ben%C3%ADtez%20L%C3%B3pez%2015300%2C%20El%20Pedregal%2C%2022100%20Tijuana%2C%20B.C.!5e0!3m2!1ses-419!2smx!4v1"
                        className="w-full h-full border-0 filter grayscale"
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <a 
                        href="https://maps.google.com/?q=Blvd.+Federico+Benitez+Lopez+15300,+Tijuana,+B.C." 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[9px] uppercase tracking-widest font-sans font-bold text-[#c5a880] hover:text-stone-900 transition-colors flex items-center space-x-1"
                      >
                        <span>Abrir en Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <LuxuryDivider />

            {/* 4. PHOTO GALLERY SECTION (AUTOROTATION + SWIPE INDICATORS) */}
            <ScrollReveal>
              <div className="px-8 text-center">
                <Sparkles className="w-6 h-6 text-[#c5a880] mx-auto mb-5" />
                <h2 className="font-serif text-lg tracking-[0.25em] text-[#1a1a1a] uppercase mb-2">Galería</h2>
                <p className="font-sans text-[10.5px] text-stone-400 font-light tracking-wide max-w-xs mx-auto mb-8">
                  Nuestra historia contada en pequeños momentos compartidos con amor:
                </p>

                {/* Highly elegant premium carousel card */}
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 border border-[#c5a880]/15 shadow-xl max-w-[345px] mx-auto">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activePhoto}
                      src={galleryImages[activePhoto]}
                      alt={`Nuestra boda ${activePhoto + 1}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.85 }}
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                  {/* Manual Arrow Controls */}
                  <button 
                    onClick={() => setActivePhoto((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center hover:bg-white text-stone-800 transition-all active:scale-90"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActivePhoto((prev) => (prev + 1) % galleryImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center hover:bg-white text-stone-800 transition-all active:scale-90"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Carousel manual indicator dots */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {galleryImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhoto(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activePhoto ? 'bg-white w-4' : 'bg-white/40'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <LuxuryDivider />

            {/* 5. TIMELINE / PROGRAMA SECTION */}
            <ScrollReveal>
              <div className="px-8 text-center">
                <Clock className="w-6 h-6 text-[#c5a880] mx-auto mb-5" />
                <h2 className="font-serif text-lg tracking-[0.25em] text-[#1a1a1a] uppercase mb-4">Programa</h2>
                <p className="font-sans text-[10.5px] text-stone-400 font-light tracking-wide max-w-xs mx-auto mb-10">
                  Acompáñanos a disfrutar cada momento preparado con inmenso cariño:
                </p>

                {/* Vertical timeline matching design of Screen 3 */}
                <div className="relative max-w-[280px] mx-auto pb-10">
                  
                  {/* Central vertical line */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[0.5px] h-full bg-[#c5a880]/30 z-0" />

                  {/* Timeline Items */}
                  
                  {/* 1. CEREMONIA (6:30 PM) */}
                  <div className="relative grid grid-cols-2 gap-4 my-12 items-center z-10">
                    <div className="text-right pr-6">
                      <h4 className="font-serif text-[11px] font-bold text-stone-900 uppercase tracking-widest">Ceremonia</h4>
                      <span className="font-sans text-[10px] text-stone-400">6:30 P.M.</span>
                    </div>

                    {/* Ring Icon centered on the line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-[#c5a880]/30 flex items-center justify-center shadow-xs">
                      <span className="text-[12px] select-none">💍</span>
                    </div>

                    <div className="text-left pl-6" />
                  </div>

                  {/* 2. RECEPCIÓN (7:30 PM) */}
                  <div className="relative grid grid-cols-2 gap-4 my-12 items-center z-10">
                    <div className="text-right pr-6" />

                    {/* Celebration Icon centered on the line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-[#c5a880]/30 flex items-center justify-center shadow-xs">
                      <span className="text-[12px] select-none">🏰</span>
                    </div>

                    <div className="text-left pl-6">
                      <h4 className="font-serif text-[11px] font-bold text-stone-900 uppercase tracking-widest">Recepción</h4>
                      <span className="font-sans text-[10px] text-stone-400">7:30 P.M.</span>
                    </div>
                  </div>

                  {/* 3. CÓCTEL (8:30 PM) */}
                  <div className="relative grid grid-cols-2 gap-4 my-12 items-center z-10">
                    <div className="text-right pr-6">
                      <h4 className="font-serif text-[11px] font-bold text-stone-900 uppercase tracking-widest">Cóctel</h4>
                      <span className="font-sans text-[10px] text-stone-400">8:30 P.M.</span>
                    </div>

                    {/* Glass Icon centered on the line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-[#c5a880]/30 flex items-center justify-center shadow-xs">
                      <span className="text-[12px] select-none">🍸</span>
                    </div>

                    <div className="text-left pl-6" />
                  </div>

                  {/* 4. FIESTA (10:00 PM) */}
                  <div className="relative grid grid-cols-2 gap-4 my-12 items-center z-10">
                    <div className="text-right pr-6" />

                    {/* Music notes Icon centered on the line */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-[#c5a880]/30 flex items-center justify-center shadow-xs">
                      <span className="text-[12px] select-none">🎵</span>
                    </div>

                    <div className="text-left pl-6">
                      <h4 className="font-serif text-[11px] font-bold text-stone-900 uppercase tracking-widest">Gran Fiesta</h4>
                      <span className="font-sans text-[10px] text-stone-400">10:00 P.M.</span>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>

            <LuxuryDivider />

            {/* 6. MESA DE REGALOS / VINTAGE GIFTS */}
            <ScrollReveal>
              <div className="px-8 text-center">
                <Gift className="w-6 h-6 text-[#c5a880] mx-auto mb-5" />
                <h2 className="font-serif text-lg tracking-[0.25em] text-[#1a1a1a] uppercase mb-2">Mesa de Regalos</h2>
                <p className="font-sans text-[10.5px] text-stone-500 font-light leading-relaxed max-w-xs mx-auto mb-8">
                  Tu presencia es nuestro mejor regalo. Si deseas tener un detalle de generosidad con nosotros, te compartimos nuestras opciones registradas:
                </p>

                <div className="space-y-4 max-w-[335px] mx-auto text-left">
                  {/* Bank transfer info (Datos demo) with Copy Button */}
                  <div className="bg-white border border-[#c5a880]/15 rounded-2xl p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-stone-50/70 border-l border-b border-stone-100 flex items-center justify-center text-sm">
                      🏦
                    </div>
                    <span className="font-serif text-[8.5px] uppercase tracking-widest text-[#c5a880] block mb-1">TRANSFERENCIA DIRECTA (DEMO)</span>
                    <h4 className="font-serif text-[11px] font-bold text-stone-800 uppercase mb-2">Andrés de la Fuente</h4>
                    
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-stone-400">Banco:</span>
                        <span className="text-stone-700 font-semibold">Santander</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-stone-400">CLABE:</span>
                        <span className="text-stone-800 font-bold">0121 8001 2345 6789 01</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => copyToClipboard('012180012345678901', 'CLABE Santander', 1)}
                      className="w-full py-2 bg-stone-50 hover:bg-[#c5a880]/10 border border-stone-200/60 text-stone-800 rounded-xl text-[9px] font-sans font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      {copiedIndex === 1 ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar CLABE</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Liverpool Registry */}
                  <div className="bg-white border border-[#c5a880]/15 rounded-2xl p-4 shadow-sm relative overflow-hidden flex items-center justify-between">
                    <div>
                      <span className="font-serif text-[8.5px] uppercase tracking-widest text-[#c5a880] block mb-1">MESA LIVERPOOL</span>
                      <h4 className="font-serif text-[11px] font-bold text-stone-800 uppercase">Número de evento: 54890123</h4>
                      <p className="font-sans text-[9px] text-stone-400 mt-0.5">Andrés & Paulete</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard('54890123', 'Código Liverpool', 2)}
                      className="px-3 py-2 bg-stone-50 hover:bg-[#c5a880]/10 border border-stone-200 text-stone-800 rounded-lg text-[8.5px] font-sans font-bold uppercase tracking-wider transition-all"
                    >
                      {copiedIndex === 2 ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>

                  {/* Palacio de Hierro Registry */}
                  <div className="bg-white border border-[#c5a880]/15 rounded-2xl p-4 shadow-sm relative overflow-hidden flex items-center justify-between">
                    <div>
                      <span className="font-serif text-[8.5px] uppercase tracking-widest text-[#c5a880] block mb-1">PALACIO DE HIERRO</span>
                      <h4 className="font-serif text-[11px] font-bold text-stone-800 uppercase">Número: PH-17829910</h4>
                      <p className="font-sans text-[9px] text-stone-400 mt-0.5">Ceremonia Andrés y Paulete</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard('PH-17829910', 'Palacio de Hierro', 3)}
                      className="px-3 py-2 bg-stone-50 hover:bg-[#c5a880]/10 border border-stone-200 text-stone-800 rounded-lg text-[8.5px] font-sans font-bold uppercase tracking-wider transition-all"
                    >
                      {copiedIndex === 3 ? 'Copiado' : 'Copiar'}
                    </button>
                  </div>

                  {/* Amazon Wishlist */}
                  <div className="bg-white border border-[#c5a880]/15 rounded-2xl p-4 shadow-sm relative overflow-hidden flex items-center justify-between">
                    <div>
                      <span className="font-serif text-[8.5px] uppercase tracking-widest text-[#c5a880] block mb-1">AMAZON WISHLIST</span>
                      <h4 className="font-serif text-[11px] font-bold text-stone-800 uppercase">Mesa de Boda Virtual</h4>
                      <p className="font-sans text-[9px] text-stone-400 mt-0.5">Envíos directos a nuestro domicilio</p>
                    </div>
                    <a
                      href="https://amazon.com.mx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-[#1a1a1a] hover:bg-stone-800 text-white rounded-lg text-[8.5px] font-sans font-bold uppercase tracking-wider transition-all flex items-center space-x-1"
                    >
                      <span>Ver</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </div>
            </ScrollReveal>

            <LuxuryDivider />

            {/* 7. HOSPEDAJE SECTION (HOTEL CARDS RECOMMENDATION) */}
            <ScrollReveal>
              <div className="px-8 text-center">
                <Home className="w-6 h-6 text-[#c5a880] mx-auto mb-5" />
                <h2 className="font-serif text-lg tracking-[0.25em] text-[#1a1a1a] uppercase mb-2">Hospedaje</h2>
                <p className="font-sans text-[10.5px] text-stone-400 font-light tracking-wide max-w-xs mx-auto mb-8">
                  Para nuestros seres queridos que viajan desde fuera de la ciudad, sugerimos las siguientes opciones de alojamiento cómodo y elegante:
                </p>

                <div className="grid grid-cols-2 gap-4 max-w-[345px] mx-auto text-left">
                  
                  {/* Hotel Card 1 */}
                  <div className="bg-white border border-[#c5a880]/15 rounded-2xl p-3.5 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-xl">🏨</span>
                      <h4 className="font-serif text-[11px] font-bold uppercase tracking-wide text-stone-800 mt-2">Grand Hotel Tijuana</h4>
                      <p className="font-sans text-[9.5px] text-stone-500 font-light leading-relaxed mt-1">
                        Convenio con tarifa de bodas. Incluye amenidades ejecutivas.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="font-mono text-[9px] text-[#c5a880] font-bold">★ ★ ★ ★ ★</span>
                      <a 
                        href="tel:+526646817000"
                        className="font-sans text-[8px] font-extrabold uppercase tracking-widest text-[#1a1a1a] hover:text-[#c5a880] transition-colors"
                      >
                        Llamar
                      </a>
                    </div>
                  </div>

                  {/* Hotel Card 2 */}
                  <div className="bg-white border border-[#c5a880]/15 rounded-2xl p-3.5 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="text-xl">🌟</span>
                      <h4 className="font-serif text-[11px] font-bold uppercase tracking-wide text-stone-800 mt-2">Hotel Lucerna</h4>
                      <p className="font-sans text-[9.5px] text-stone-500 font-light leading-relaxed mt-1">
                        Estilo hacienda de lujo con jardines hermosos y excelente cocina.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <span className="font-mono text-[9px] text-[#c5a880] font-bold">★ ★ ★ ★ ★</span>
                      <a 
                        href="tel:+526646242000"
                        className="font-sans text-[8px] font-extrabold uppercase tracking-widest text-[#1a1a1a] hover:text-[#c5a880] transition-colors"
                      >
                        Llamar
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>

            <LuxuryDivider />

            {/* 8. RSVP CONFIRMATION FORM */}
            <ScrollReveal>
              <div className="px-8 py-8 text-center bg-[#fdf6f0]/30 border-y border-[#c5a880]/15">
                <Users className="w-6 h-6 text-[#c5a880] mx-auto mb-5" />
                <h3 className="font-serif text-md uppercase tracking-[0.25em] text-[#1a1a1a] font-bold mb-2">
                  CONFIRMAR ASISTENCIA
                </h3>
                <p className="font-sans text-[10px] text-stone-500 font-light leading-relaxed max-w-xs mx-auto mb-8">
                  Agradecemos confirmar tu valiosa asistencia antes del 15 de Octubre de 2027 para poder contemplar todos los detalles.
                </p>

                <form onSubmit={handleRsvpSubmit} className="max-w-[320px] mx-auto text-left space-y-4">
                  <div>
                    <label className="block font-sans text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1.5">Nombre Completo</label>
                    <input
                      type="text"
                      value={rsvpData.nombre}
                      onChange={(e) => setRsvpData({ ...rsvpData, nombre: e.target.value })}
                      placeholder="Ej. Sra. Paulete de Anda"
                      className="w-full px-3.5 py-3 border border-[#c5a880]/30 bg-white rounded-xl text-[11px] font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#c5a880] transition-colors shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1.5">Nº de Pases</label>
                      <select
                        value={rsvpData.boletos}
                        onChange={(e) => setRsvpData({ ...rsvpData, boletos: e.target.value })}
                        className="w-full px-3.5 py-3 border border-[#c5a880]/30 bg-white rounded-xl text-[11px] font-sans text-stone-800 focus:outline-none focus:border-[#c5a880] transition-colors shadow-xs"
                      >
                        {['1', '2', '3', '4', '5', '6'].map((n) => (
                          <option key={n} value={n}>{n} {parseInt(n) === 1 ? 'Pase' : 'Pases'}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1.5">¿Asistirás?</label>
                      <div className="flex border border-[#c5a880]/30 bg-white rounded-xl overflow-hidden h-11 shadow-xs">
                        <button
                          type="button"
                          onClick={() => setRsvpData({ ...rsvpData, asistencia: 'si' })}
                          className={`flex-1 text-[9.5px] font-sans font-bold uppercase tracking-wider transition-colors ${
                            rsvpData.asistencia === 'si' ? 'bg-[#1a1a1a] text-white' : 'text-stone-500 bg-transparent'
                          }`}
                        >
                          Sí
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpData({ ...rsvpData, asistencia: 'no' })}
                          className={`flex-1 text-[9.5px] font-sans font-bold uppercase tracking-wider transition-colors ${
                            rsvpData.asistencia === 'no' ? 'bg-[#1a1a1a] text-white' : 'text-stone-500 bg-transparent'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1.5">Alergias o Dieta Especial (Opcional)</label>
                    <input
                      type="text"
                      value={rsvpData.restricciones}
                      onChange={(e) => setRsvpData({ ...rsvpData, restricciones: e.target.value })}
                      placeholder="Ej. Vegetariano, sin gluten"
                      className="w-full px-3.5 py-3 border border-[#c5a880]/30 bg-white rounded-xl text-[11px] font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#c5a880] transition-colors shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-1.5">Mensaje para los novios</label>
                    <textarea
                      value={rsvpData.mensaje}
                      onChange={(e) => setRsvpData({ ...rsvpData, mensaje: e.target.value })}
                      placeholder="¡Comparte tus hermosos deseos!"
                      rows={3}
                      className="w-full px-3.5 py-3 border border-[#c5a880]/30 bg-white rounded-xl text-[11px] font-sans text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#c5a880] transition-colors resize-none shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1a1a1a] hover:bg-[#c5a880] text-white hover:text-white font-sans text-[10px] uppercase tracking-[0.25em] font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Confirmación</span>
                  </button>
                </form>
              </div>
            </ScrollReveal>

            {/* 9. FINAL CTA SECTION & BUTTON */}
            <ScrollReveal>
              <div className="mt-14 px-8 text-center">
                <p className="font-script text-3xl text-[#c5a880] mb-3">Gracias por acompañarnos</p>
                <p className="font-sans text-[10.5px] text-stone-400 font-light tracking-wide max-w-xs mx-auto mb-8">
                  Estamos muy felices de poder compartir con ustedes el día más especial de nuestras vidas.
                </p>

                {/* Main Action Call matching requirements: Ver demo en vivo de la boda */}
                <div className="flex flex-col items-center gap-4">
                  <a
                    href="https://invitaonline.mx/templateboda"
                    className="inline-flex w-full max-w-[280px] items-center justify-center space-x-2.5 py-4 bg-[#1a1a1a] hover:bg-[#c5a880] text-white rounded-full font-sans text-[10.5px] uppercase tracking-[0.22em] font-bold transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Ver demo en vivo de la boda</span>
                  </a>

                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.pathname = '/'; }}
                    className="inline-flex w-full max-w-[280px] items-center justify-center space-x-2 py-3 bg-stone-100 hover:bg-stone-250 text-stone-800 border border-stone-300 rounded-full font-sans text-[10px] uppercase tracking-[0.22em] font-bold transition-all duration-300 shadow-sm"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-stone-600" />
                    <span>Regresar a Catálogo</span>
                  </a>
                </div>

                {/* Clean luxury footer signature */}
                <div className="mt-16 text-[8.5px] font-sans text-stone-300 tracking-[0.25em] uppercase font-light leading-relaxed select-none">
                  Andrés & Paulete <br />
                  <span className="text-[7.5px] text-stone-300/60 block mt-1">CREADO CON AMOR POR INVITAONLINE.MX</span>
                </div>
              </div>
            </ScrollReveal>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
