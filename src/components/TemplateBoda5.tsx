import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import OptimizedImage from './OptimizedImage';
import { 
  Heart, Calendar, MapPin, Gift, Clock, Music, Play, Pause, 
  Copy, Check, Sparkles, Users, ArrowLeft, Send, ExternalLink, 
  ChevronLeft, ChevronRight, Home, Info, BookOpen, Volume2, VolumeX, Mail, X
} from 'lucide-react';
import GoldGlitterCanvas from './GoldGlitterCanvas';

// Elegant minimalist champagne divider
const GoldDivider = () => (
  <div className="flex items-center justify-center space-x-6 my-16 opacity-85">
    <div className="h-[0.5px] w-20 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
    <span className="font-display text-[12px] text-[#D4AF37] tracking-[0.4em] select-none">✧ ⚜ ✧</span>
    <div className="h-[0.5px] w-20 bg-gradient-to-l from-transparent via-[#D4AF37]/50 to-transparent" />
  </div>
);

// High-end Scroll reveal wrapper
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
}
const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
};

export default function TemplateBoda5() {
  // Navigation & Envelope stage
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showGoldCanvas, setShowGoldCanvas] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicCardOpen, setIsMusicCardOpen] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Music progress tracking
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(174); // mixkit track length approx 2:54

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Love Story timeline data
  const timelineEvents = [
    {
      title: "El Comienzo",
      date: "14 de Febrero, 2021",
      desc: "Nuestros caminos se cruzaron de manera inesperada en una tarde lluviosa. Una conversación sin pretensiones se convirtió en el inicio de la historia más hermosa de nuestras vidas.",
      image: "/v_s_hotel_1782248295585.webp"
    },
    {
      title: "Primer Viaje Juntos",
      date: "Octubre, 2022",
      desc: "París nos recibió con sus luces otoñales. Caminando de la mano por el Sena, descubrimos que viajar juntos no era solo conocer lugares, sino descubrir nuevos mundos en el otro.",
      image: "/v_s_terrace_1782248319080.webp"
    },
    {
      title: "La Propuesta",
      date: "Noviembre, 2025",
      desc: "Frente al mar y bajo un cielo estrellado en la Costa de Amalfi, con lágrimas de felicidad y el latido de dos corazones latiendo al unísono, dijimos el gran: SÍ, ACEPTO.",
      image: "/v_s_gala_1782248306837.webp"
    },
    {
      title: "La Promesa Eterna",
      date: "15 de Noviembre, 2027",
      desc: "Hoy consagramos este gran amor frente a Dios y todos ustedes. Un nuevo capítulo comienza con la promesa de amarnos por el resto de la eternidad.",
      image: "/v_s_stairs_1782248329087.webp"
    }
  ];

  // Gallery list for Masonry & Lightbox
  const galleryImages = [
    "/sofia_alejandro_stairs_1782247280237.webp",
    "/wedding_portrait_1781994427687.webp",
    "/v_s_hero_1782248283047.webp",
    "/v_s_dress_women_1782248350235.webp",
    "/v_s_dress_men_1782248340756.webp",
    "/v_s_hotel_1782248295585.webp"
  ];

  // Dynamic RSVP Form state
  const [rsvpData, setRsvpData] = useState({
    nombre: '',
    boletos: '2',
    asistencia: 'si',
    restricciones: '',
    mensaje: ''
  });

  // Guestbook states
  const [guestMessages, setGuestMessages] = useState<{ id: string; name: string; text: string; date: string }[]>([]);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestText, setNewGuestText] = useState('');
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false);

  // Success state for RSVP submission
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

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

  // Initialize background music and guestbook
  useEffect(() => {
    // Initial load of guestbook messages
    const savedMessages = localStorage.getItem('wedding_guestbook_template5');
    if (savedMessages) {
      setGuestMessages(JSON.parse(savedMessages));
    } else {
      const defaultMessages = [
        { id: '1', name: 'Sofía & Alfonso', text: '¡Qué honor acompañarles en este día de ensueño! Su amor nos inspira infinitamente.', date: 'Hace 2 horas' },
        { id: '2', name: 'Familia Mendoza', text: 'Les enviamos todo nuestro amor y bendiciones en esta hermosa etapa. ¡Contamos las horas para estar con ustedes!', date: 'Hace un día' }
      ];
      setGuestMessages(defaultMessages);
      localStorage.setItem('wedding_guestbook_template5', JSON.stringify(defaultMessages));
    }
  }, []);

  // Format time (e.g. 01:25)
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleAudioSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetVal = parseFloat(e.target.value);
    setCurrentTime(targetVal);
  };

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
          .catch(() => fallbackCopy(text, title, index));
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
      setShowGoldCanvas(true);
      setIsMusicCardOpen(true);
    }, 1100); // Luxury slow unfold transition
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.nombre.trim()) {
      triggerToast('⚠️ Por favor ingresa tu nombre');
      return;
    }

    const confirmText = rsvpData.asistencia === 'si' 
      ? '✨ CONFIRMO mi asistencia con inmenso honor' 
      : '🌹 Lamentablemente NO podré asistir';
    
    const messageText = `¡Hola Sofía & Alejandro!\n\nConfirmo mi asistencia para su boda premium:\n\n👤 *Nombre:* ${rsvpData.nombre}\n⭐ *Estado:* ${confirmText}\n🎫 *Pases requeridos:* ${rsvpData.boletos}\n🍽️ *Detalles/Dieta:* ${rsvpData.restricciones || 'Ninguno'}\n💬 *Mensaje:* "${rsvpData.mensaje || '¡Muchas felicidades!'}"\n\n_Enviado desde el template de ultra-lujo_`;
    
    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/523310000000?text=${encodedText}`;
    
    setRsvpSubmitted(true);
    triggerToast('🌟 ¡Redireccionando a confirmación de WhatsApp!');
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  const handlePostGuestMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim() || !newGuestText.trim()) {
      triggerToast('⚠️ Por favor completa ambos campos');
      return;
    }

    setIsSubmittingMessage(true);
    setTimeout(() => {
      const newMessage = {
        id: Date.now().toString(),
        name: newGuestName,
        text: newGuestText,
        date: 'Hace un momento'
      };

      const updated = [newMessage, ...guestMessages];
      setGuestMessages(updated);
      localStorage.setItem('wedding_guestbook_template5', JSON.stringify(updated));

      setNewGuestName('');
      setNewGuestText('');
      setIsSubmittingMessage(false);
      triggerToast('✍️ ¡Mensaje guardado en el Libro de Recuerdos!');
    }, 600);
  };

  // Countdown timer
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
    <div className="min-h-screen bg-[#0B0B0B] font-sans selection:bg-[#D4AF37]/25 selection:text-white overflow-x-hidden relative text-stone-200">
      
      {/* Premium ambient light reflections background */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-radial-gradient from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none z-0" />

      {/* Floating elegant particles */}
      {showGoldCanvas && <GoldGlitterCanvas />}

      {/* Custom Global Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#161616]/95 backdrop-blur-md text-[#FAF8F5] px-7 py-4 rounded-full shadow-[0_20px_50px_rgba(212,175,55,0.15)] flex items-center space-x-3.5 border border-[#D4AF37]/35"
          >
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" />
            <span className="font-display text-[10px] uppercase tracking-[0.2em] font-medium text-white">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating back controller to close demo view */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.pathname = '/'; }}
        className="fixed top-5 left-5 z-40 bg-[#161616]/90 hover:bg-[#222]/90 text-white p-3 rounded-full shadow-2xl border border-[#D4AF37]/20 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95 group"
        title="Volver al catálogo"
      >
        <ArrowLeft className="w-4 h-4 text-stone-200 group-hover:-translate-x-0.5 transition-transform" />
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
                className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-[#161616]/95 backdrop-blur-md rounded-full border border-[#D4AF37]/30 p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] font-sans"
              >
                <button 
                  onClick={togglePlayPause}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-stone-950 flex items-center justify-center transition-all active:scale-95 shadow-md flex-shrink-0"
                  title={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? <Pause className="w-3 h-3 fill-stone-950" /> : <Play className="w-3 h-3 fill-stone-950 ml-0.5" />}
                </button>
                <div className="pr-1 pl-1 min-w-0 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-[#FAF8F5] whitespace-nowrap leading-none block">A Thousand Years</span>
                  <span className="text-[8px] text-[#D4AF37] whitespace-nowrap leading-none block mt-0.5">Música de Fondo</span>
                </div>
                <button 
                  onClick={toggleMusic} 
                  className="text-stone-400 hover:text-stone-200 p-1 rounded-full hover:bg-stone-800 transition-colors"
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
                className="fixed bottom-6 right-6 z-40 p-3 bg-[#161616]/95 hover:bg-stone-900 text-white rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-[#D4AF37]/30 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-90 group"
                aria-label="Escuchar música"
              >
                <Music className="w-4 h-4 group-hover:scale-110 transition-transform text-[#D4AF37]" />
              </motion.button>
            )}
          </>
        )}
      </AnimatePresence>

      {/* ENVELOPE INITIAL OVERLAY SCREEN */}
      <AnimatePresence mode="wait">
        {!envelopeOpened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -50 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-45 flex items-center justify-center bg-[#070707] px-4 overflow-hidden"
          >
            {/* Elegant luxury background mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)]" />
            <div className="absolute inset-8 border border-[#D4AF37]/15 pointer-events-none" />

            <motion.div 
              animate={isOpening ? { scale: 0.95, y: -30, opacity: 0 } : { scale: 1 }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
              className="relative w-full max-w-[400px] text-center bg-[#111111] border border-[#D4AF37]/25 rounded-3xl p-8 shadow-[0_30px_70px_rgba(0,0,0,0.85)]"
            >
              <div className="absolute inset-3 border border-[#D4AF37]/10 rounded-2xl pointer-events-none" />

              {/* Envelope Crest Symbolism (Tiffany Gold Style) */}
              <div className="mb-8 flex justify-center">
                <div className="relative w-20 h-20 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-radial-gradient from-[#222] to-[#111] shadow-2xl">
                  {/* Subtle golden halo shine */}
                  <span className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/25 animate-[spin_50s_linear_infinite]" />
                  <span className="font-display text-[22px] font-bold text-[#D4AF37] tracking-widest mt-0.5">S & A</span>
                </div>
              </div>

              {/* Envelope content text */}
              <p className="font-cormorant text-[14px] text-stone-400 uppercase tracking-[0.25em] mb-2">Invitación Especial</p>
              <h2 className="font-serif text-[18px] text-[#F8F4EE] tracking-[0.16em] leading-relaxed mb-6 font-light">
                Has sido invitado(a) a nuestra boda
              </h2>

              <p className="font-cormorant text-stone-500 italic text-[14px] mb-8 max-w-xs mx-auto">
                "Dos vidas, un camino de amor eterno."
              </p>

              {/* Dior style Button trigger */}
              <button
                onClick={handleOpenEnvelope}
                disabled={isOpening}
                className="w-full max-w-[240px] mx-auto py-4 bg-[#D4AF37] hover:bg-white text-black hover:text-black font-display text-[11px] uppercase tracking-[0.25em] font-semibold rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-[0_10px_30px_rgba(212,175,55,0.25)] flex items-center justify-center space-x-2.5"
              >
                <Heart className="w-3.5 h-3.5 text-black fill-black/10" />
                <span>{isOpening ? "Abriendo..." : "Abrir Invitación"}</span>
              </button>

              <div className="mt-8 text-[9px] font-sans text-stone-500 tracking-[0.25em] uppercase">
                Tijuana, B.C. · Noviembre 15, 2027
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* MAIN INVITATION SITE (EDITORIAL MOBILE FIRST VIEW) */}
      <div className="w-full max-w-[465px] mx-auto bg-[#0E0E0E] min-h-screen shadow-[0_0_90px_rgba(0,0,0,0.9)] relative border-x border-[#D4AF37]/15 pb-24 overflow-hidden">
        
        {/* Double-layered gold frame representing haute couture book borders */}
        <div className="absolute inset-0 border-[10px] border-[#0E0E0E] pointer-events-none z-30" />
        <div className="absolute inset-3 border border-[#D4AF37]/15 pointer-events-none z-30" />
        <div className="absolute inset-[15px] border-[0.5px] border-[#D4AF37]/5 pointer-events-none z-30" />

        {/* 1. HERO HOME SEGMENT */}
        <div className="relative min-h-screen flex flex-col justify-between pt-24 pb-14 px-8 text-center bg-gradient-to-b from-[#141414] via-[#0E0E0E] to-[#0E0E0E] z-10">
          
          <div className="space-y-3">
            <span className="font-display text-[10px] text-[#D4AF37] uppercase tracking-[0.35em] block animate-pulse">Save the Date</span>
            <div className="h-[0.5px] w-12 bg-[#D4AF37]/35 mx-auto" />
          </div>

          {/* Luxury calligraphy or editorial text names */}
          <div className="my-auto py-6">
            <h1 className="font-serif text-[42px] leading-[1.1] text-[#F8F4EE] font-light tracking-[0.08em] uppercase">
              Sofía <span className="block font-script text-[48px] text-[#D4AF37] lowercase my-1">y</span> Alejandro
            </h1>
            
            <p className="font-cormorant text-stone-400 text-[16px] italic max-w-[280px] mx-auto mt-6">
              "En este día sagrado, unimos nuestras almas bajo la luz del amor divino y la elegancia eterna."
            </p>
          </div>

          {/* Premium Main Image Portrait with Dior styling and luxury gold border */}
          <div className="relative w-full aspect-[4/5] rounded-[30px] overflow-hidden bg-stone-900 border border-[#D4AF37]/25 shadow-2xl my-8">
            <OptimizedImage
              src="/sofia_alejandro_stairs_1782247280237.webp"
              alt="Sofía & Alejandro"
              className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.85] saturate-75 transition-all duration-1000"
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-transparent" />
            
            <div className="absolute bottom-6 inset-x-6 text-center">
              <span className="font-display text-[9px] text-[#D4AF37] uppercase tracking-[0.3em]">CATHEDRAL WEDDING</span>
              <h4 className="font-serif text-[#F8F4EE] text-lg tracking-[0.1em] mt-1 uppercase">15.11.2027</h4>
            </div>
          </div>

          {/* Hero Action Trigger */}
          <div className="space-y-8">
            <a 
              href="#asistencia"
              className="inline-block px-10 py-3.5 bg-white hover:bg-[#D4AF37] text-black hover:text-black font-display text-[10px] uppercase tracking-[0.25em] font-semibold rounded-full transition-all duration-300 hover:scale-[1.04] active:scale-95 shadow-lg"
            >
              Confirmar Asistencia
            </a>

            {/* Premium Countdown Clock Segment */}
            <div className="bg-[#121212]/90 border border-[#D4AF37]/20 rounded-2xl p-5 backdrop-blur-md max-w-[325px] mx-auto shadow-xl">
              <span className="font-display text-[8.5px] uppercase tracking-[0.3em] text-[#D4AF37] block mb-4">SOLO FALTAN</span>
              
              <div className="flex items-center justify-center space-x-3.5">
                <div className="flex flex-col items-center">
                  <span className="font-serif text-2xl font-light text-[#F8F4EE] block leading-none">{timeLeft.days}</span>
                  <span className="font-sans text-[7.5px] uppercase tracking-widest text-stone-500 mt-1">Días</span>
                </div>
                <div className="text-[#D4AF37]/40 font-serif text-lg">:</div>
                <div className="flex flex-col items-center">
                  <span className="font-serif text-2xl font-light text-[#F8F4EE] block leading-none">{timeLeft.hours}</span>
                  <span className="font-sans text-[7.5px] uppercase tracking-widest text-stone-500 mt-1">Hrs</span>
                </div>
                <div className="text-[#D4AF37]/40 font-serif text-lg">:</div>
                <div className="flex flex-col items-center">
                  <span className="font-serif text-2xl font-light text-[#F8F4EE] block leading-none">{timeLeft.minutes}</span>
                  <span className="font-sans text-[7.5px] uppercase tracking-widest text-stone-500 mt-1">Mins</span>
                </div>
                <div className="text-[#D4AF37]/40 font-serif text-lg">:</div>
                <div className="flex flex-col items-center">
                  <span className="font-serif text-2xl font-light text-[#F8F4EE] block leading-none">{timeLeft.seconds}</span>
                  <span className="font-sans text-[7.5px] uppercase tracking-widest text-stone-500 mt-1">Segs</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <GoldDivider />

        {/* 2. MUSIC PLAYER (Apple Music Luxury Edition) */}
        <ScrollReveal>
          <div className="px-8 text-center">
            <div className="bg-[#161616]/90 border border-[#D4AF37]/25 rounded-3xl p-6 shadow-2xl max-w-[345px] mx-auto backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
              
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-12 h-12 bg-[#222] rounded-lg flex items-center justify-center border border-[#D4AF37]/20 shadow-inner">
                  <Music className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                </div>
                <div className="text-left">
                  <span className="font-display text-[8px] text-[#D4AF37] uppercase tracking-widest block mb-0.5">MÚSICA DE FONDO</span>
                  <h4 className="font-serif text-[13px] text-white font-medium uppercase tracking-wider">Canción Especial</h4>
                  <p className="font-sans text-[10px] text-stone-400">Escucha nuestro tema de boda</p>
                </div>
              </div>

              <div className="flex flex-col space-y-4 text-stone-200">
                <div className="flex items-center justify-between bg-[#1f1f1f] p-4 rounded-2xl border border-[#D4AF37]/10">
                  <button 
                    onClick={togglePlayPause}
                    className="p-3 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:opacity-95 text-stone-950 rounded-full transition-all active:scale-95 flex items-center justify-center shadow-lg"
                    title={isPlaying ? "Pausar" : "Reproducir"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-stone-950" /> : <Play className="w-5 h-5 fill-stone-950 ml-0.5" />}
                  </button>
                  
                  <div className="flex items-center space-x-2 flex-1 ml-4">
                    {isPlaying ? (
                      <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-stone-500" />
                    )}
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      defaultValue="0.5"
                      onChange={(e) => {
                        if (audioRef.current) audioRef.current.volume = parseFloat(e.target.value);
                      }}
                      className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <GoldDivider />

        {/* 3. HISTORIA DE AMOR SECTION (Timeline with Parallax / Premium Cards) */}
        <ScrollReveal>
          <div className="px-8 text-center">
            <Heart className="w-6 h-6 text-[#D4AF37] mx-auto mb-5" />
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[#F8F4EE] uppercase mb-2">Nuestra Historia</h2>
            <p className="font-cormorant text-[15px] text-stone-400 italic max-w-xs mx-auto mb-12">
              "Cada latido nos guio hacia este gran momento..."
            </p>

            <div className="space-y-12 max-w-[345px] mx-auto relative text-left">
              {/* Left sidebar thread representing handcraft book stitching */}
              <div className="absolute left-[20px] top-4 bottom-4 w-[0.5px] bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/20 to-transparent pointer-events-none" />

              {timelineEvents.map((evt, idx) => (
                <div key={idx} className="relative pl-10 group">
                  {/* Glowing gold dot point anchor */}
                  <div className="absolute left-[17px] top-1.5 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border border-black shadow-[0_0_8px_#D4AF37] group-hover:scale-125 transition-transform" />
                  
                  <div className="bg-[#121212] border border-[#D4AF37]/15 rounded-2xl overflow-hidden shadow-xl hover:border-[#D4AF37]/35 transition-all duration-300">
                    <div className="h-44 overflow-hidden relative">
                      <OptimizedImage 
                        src={evt.image} 
                        alt={evt.title}
                        className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05] hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute bottom-3 left-4">
                        <span className="font-display text-[8.5px] text-[#D4AF37] uppercase tracking-widest bg-black/70 py-1 px-2.5 rounded-md border border-[#D4AF37]/20">
                          {evt.date}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-serif text-[15px] text-[#F8F4EE] uppercase tracking-wider mb-2 font-bold">{evt.title}</h4>
                      <p className="font-sans text-[11px] text-stone-400 leading-relaxed font-light">{evt.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <GoldDivider />

        {/* 4. SECCIÓN DE FAMILIAS (Sobriedad y Elegancia) */}
        <ScrollReveal>
          <div className="px-8 text-center">
            <Users className="w-6 h-6 text-[#D4AF37] mx-auto mb-5" />
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[#F8F4EE] uppercase mb-2">Con la bendición de</h2>
            <p className="font-cormorant text-[14px] text-stone-400 max-w-xs mx-auto mb-10">
              Nuestros amados padres y padrinos que con su amor nos han guiado en el camino:
            </p>

            <div className="space-y-8 max-w-[345px] mx-auto text-left">
              {/* Parents Bride */}
              <div className="bg-[#111] border border-[#D4AF37]/15 rounded-2xl p-5 text-center relative">
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-[#0E0E0E] text-[#D4AF37] font-display text-[8px] uppercase tracking-widest border border-[#D4AF37]/20 rounded-full">
                  PADRES DE LA NOVIA
                </div>
                <div className="space-y-1.5 mt-2">
                  <p className="font-serif text-[14px] text-white">Sra. Eleanor de Anda Vance</p>
                  <p className="font-serif text-[14px] text-white">Sr. Ricardo Antonio de Anda</p>
                </div>
              </div>

              {/* Parents Groom */}
              <div className="bg-[#111] border border-[#D4AF37]/15 rounded-2xl p-5 text-center relative">
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-[#0E0E0E] text-[#D4AF37] font-display text-[8px] uppercase tracking-widest border border-[#D4AF37]/20 rounded-full">
                  PADRES DEL NOVIO
                </div>
                <div className="space-y-1.5 mt-2">
                  <p className="font-serif text-[14px] text-white">Sra. Marianna de la Fuente</p>
                  <p className="font-serif text-[14px] text-white">Sr. Javier Alejandro de la Fuente</p>
                </div>
              </div>

              {/* Godparents */}
              <div className="bg-[#111] border border-[#D4AF37]/15 rounded-2xl p-5 text-center relative">
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-[#0E0E0E] text-[#D4AF37] font-display text-[8px] uppercase tracking-widest border border-[#D4AF37]/20 rounded-full">
                  LOS PADRINOS
                </div>
                <div className="space-y-1.5 mt-2">
                  <p className="font-serif text-[14px] text-white">Sra. Diana Cristina Cortázar</p>
                  <p className="font-serif text-[14px] text-white">Sr. Gonzalo Cortázar</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <GoldDivider />

        {/* 5. EDITORIAL PHRASE SECTION (Aparición Letra por Letra) */}
        <ScrollReveal>
          <div className="px-8 py-16 text-center bg-[#111] border-y border-[#D4AF37]/20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_100%)] pointer-events-none" />
            <span className="font-display text-[9px] text-[#D4AF37] tracking-[0.4em] block mb-6">PENSAMIENTO</span>
            
            <p className="font-serif text-[20px] leading-relaxed text-[#F8F4EE] max-w-[320px] mx-auto font-light">
              "De todos los caminos que recorrimos, el más hermoso fue encontrarnos."
            </p>
            
            <div className="h-[0.5px] w-12 bg-[#D4AF37]/30 mx-auto mt-6" />
          </div>
        </ScrollReveal>

        <GoldDivider />

        {/* 6. GALERÍA DE FOTOS CINEMATOGRÁFICA (Masonry layout style) */}
        <ScrollReveal>
          <div className="px-8 text-center">
            <Sparkles className="w-6 h-6 text-[#D4AF37] mx-auto mb-5" />
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[#F8F4EE] uppercase mb-2">Galería de Momentos</h2>
            <p className="font-cormorant text-[14px] text-stone-400 italic max-w-xs mx-auto mb-10">
              Capturas cinematográficas de nuestro camino. Haz clic para ampliar.
            </p>

            <div className="grid grid-cols-2 gap-3.5 max-w-[345px] mx-auto">
              {galleryImages.map((img, index) => (
                <div 
                  key={index} 
                  onClick={() => setLightboxIndex(index)}
                  className={`relative rounded-2xl overflow-hidden bg-stone-900 border border-white/5 cursor-pointer hover:border-[#D4AF37]/45 transition-all shadow-md group ${
                    index === 0 || index === 3 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'
                  }`}
                >
                  <OptimizedImage 
                    src={img} 
                    alt={`Foto de compromiso ${index + 1}`}
                    className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="font-display text-[8.5px] text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/30 px-3.5 py-1 bg-black/60 rounded-full">
                      Ampliar
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* FULLSCREEN LIGHTBOX DIALOG */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/98 flex items-center justify-center p-4 select-none"
            >
              <button 
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 text-white text-[10px] font-display uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full border border-white/10"
              >
                Cerrar ×
              </button>

              <div className="relative w-full max-w-[450px] aspect-[4/5] flex items-center justify-center">
                <OptimizedImage 
                  src={galleryImages[lightboxIndex]} 
                  alt="Commitment Lightbox View" 
                  className="w-full h-full object-contain rounded-2xl"
                />

                {/* Lightbox Controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/5"
                >
                  ‹
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev! + 1) % galleryImages.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/5"
                >
                  ›
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <GoldDivider />

        {/* 7. DETALLES / INFORMACIÓN DEL EVENTO SECTION */}
        <ScrollReveal>
          <div className="px-8 text-center">
            <Calendar className="w-6 h-6 text-[#D4AF37] mx-auto mb-5" />
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[#F8F4EE] uppercase mb-2">Ubicaciones</h2>
            <p className="font-cormorant text-[14px] text-stone-400 max-w-xs mx-auto mb-10">
              Cada espacio ha sido cuidadosamente reservado para brindarles una experiencia inolvidable:
            </p>

            <div className="space-y-10 max-w-[345px] mx-auto text-left">
              
              {/* Ceremonia Card */}
              <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#191919] border-l border-b border-[#D4AF37]/15 flex items-center justify-center text-lg">
                  ⛪
                </div>
                <span className="font-display text-[8.5px] uppercase tracking-widest text-[#D4AF37] block mb-2">01 · CEREMONIA RELIGIOSA</span>
                <h3 className="font-serif text-[15px] text-white font-bold tracking-wider mb-2">CATEDRAL METROPOLITANA</h3>
                <p className="font-sans text-[11px] text-stone-400 font-light leading-relaxed mb-4">
                  Sábado 15 de Noviembre, 2027 · 6:30 P.M.<br />
                  Avenida Revolución 450, Zona Centro, Tijuana
                </p>

                {/* Google Maps Embed iframe */}
                <div className="w-full h-36 rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 mb-4">
                  <iframe 
                    title="Cathedral Ceremony Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3362.4!2d-117.03!3d32.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d9492f!2sTijuana!5e0!3m2!1ses!2smx!4v1"
                    className="w-full h-full border-0 filter grayscale invert contrast-[1.1]"
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <a 
                  href="https://maps.google.com/?q=Catedral+Metropolitana+de+Nuestra+Senora+de+Guadalupe+Tijuana" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-3.5 bg-transparent hover:bg-white/5 border border-[#D4AF37]/25 hover:border-[#D4AF37] text-[#D4AF37] hover:text-white rounded-xl text-[9px] font-display uppercase tracking-widest transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Ver ubicación en Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Recepción Card */}
              <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#191919] border-l border-b border-[#D4AF37]/15 flex items-center justify-center text-lg">
                  🌸
                </div>
                <span className="font-display text-[8.5px] uppercase tracking-widest text-[#D4AF37] block mb-2">02 · RECEPCIÓN & BANQUETE</span>
                <h3 className="font-serif text-[15px] text-white font-bold tracking-wider mb-2">JARDÍN EXCLUSIVO FOUR SEASONS</h3>
                <p className="font-sans text-[11px] text-stone-400 font-light leading-relaxed mb-4">
                  Sábado 15 de Noviembre, 2027 · 7:30 P.M.<br />
                  Paseo del Pedregal 15300, El Pedregal
                </p>

                {/* Google Maps Embed iframe */}
                <div className="w-full h-36 rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 mb-4">
                  <iframe 
                    title="Reception Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3362.483928174415!2d-116.9739446!3d32.5117222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d947efbc3b39d1%3A0x6b87b7aeb29a28be!2sBlvd.%20Federico%20Ben%C3%ADtez%20L%C3%B3pez%2015300%2C%20El%20Pedregal%2C%2022100%20Tijuana%2C%20B.C.!5e0!3m2!1ses-419!2smx!4v1"
                    className="w-full h-full border-0 filter grayscale invert contrast-[1.1]"
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <a 
                  href="https://maps.google.com/?q=Paseo+del+Pedregal+15300,+Tijuana,+B.C." 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-3.5 bg-[#D4AF37] hover:bg-white text-black hover:text-black rounded-xl text-[9px] font-display uppercase tracking-widest font-bold transition-all flex items-center justify-center space-x-1.5"
                >
                  <span>Cómo llegar direct</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>
        </ScrollReveal>

        <GoldDivider />

        {/* 8. CÓDIGO DE VESTIMENTA (Cartier Style Showcase) */}
        <ScrollReveal>
          <div className="px-8 text-center">
            <BookOpen className="w-6 h-6 text-[#D4AF37] mx-auto mb-5" />
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[#F8F4EE] uppercase mb-2">Código de Vestimenta</h2>
            <p className="font-cormorant text-[14px] text-stone-400 italic max-w-xs mx-auto mb-8">
              Para preservar la sofisticación de nuestro enlace, agradecemos su elegante etiqueta:
            </p>

            <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-3xl p-6 shadow-xl max-w-[345px] mx-auto text-left relative overflow-hidden">
              <span className="font-display text-[8.5px] uppercase tracking-widest text-[#D4AF37] block mb-2 text-center">FORMAL / RIGUROSA ETIQUETA</span>
              <h3 className="font-serif text-[18px] text-white tracking-widest uppercase text-center mb-6 font-light">BLACK TIE REQUIRED</h3>

              <div className="grid grid-cols-2 gap-4 text-center border-t border-b border-stone-800 py-6 my-4">
                <div>
                  <span className="text-xl">🤵🏻</span>
                  <h4 className="font-serif text-[11px] text-[#FAF8F5] uppercase tracking-wider mt-1.5 font-bold">Caballeros</h4>
                  <p className="font-sans text-[9px] text-stone-500 mt-1 leading-relaxed">Smokey negro clásico, camisa de etiqueta y pajarita obligatoria.</p>
                </div>
                <div>
                  <span className="text-xl">👗</span>
                  <h4 className="font-serif text-[11px] text-[#FAF8F5] uppercase tracking-wider mt-1.5 font-bold">Damas</h4>
                  <p className="font-sans text-[9px] text-stone-500 mt-1 leading-relaxed">Vestido largo de gala elegante. Se solicitan tonos neutros o sobrios.</p>
                </div>
              </div>

              {/* Recommended Color suggestions */}
              <div className="space-y-3">
                <span className="font-display text-[8px] text-[#D4AF37] uppercase tracking-widest block text-center">PALETA DE COLORES RECOMENDADOS</span>
                <div className="flex justify-center space-x-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/40 shadow-md" />
                    <span className="text-[7.5px] font-mono text-stone-500 mt-1">Noir</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-[#E5DACF] border border-stone-700 shadow-md" />
                    <span className="text-[7.5px] font-mono text-stone-500 mt-1">Beige</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-[#3B403D] border border-stone-700 shadow-md" />
                    <span className="text-[7.5px] font-mono text-stone-500 mt-1">Sage</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-[#202738] border border-stone-700 shadow-md" />
                    <span className="text-[7.5px] font-mono text-stone-500 mt-1">Navy</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-[#351F27] border border-stone-700 shadow-md" />
                    <span className="text-[7.5px] font-mono text-stone-500 mt-1">Wine</span>
                  </div>
                </div>
                <p className="text-[8.5px] font-sans text-stone-500 text-center italic mt-3">
                  * Agradecemos evitar el color blanco y marfil de uso exclusivo de la novia.
                </p>
              </div>

            </div>
          </div>
        </ScrollReveal>

        <GoldDivider />

        {/* 9. MESA DE REGALOS (Cartier/Tiffany Registry Cards) */}
        <ScrollReveal>
          <div className="px-8 text-center">
            <Gift className="w-6 h-6 text-[#D4AF37] mx-auto mb-5" />
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[#F8F4EE] uppercase mb-2">Mesa de Regalos</h2>
            <p className="font-cormorant text-[14px] text-stone-400 italic max-w-xs mx-auto mb-10">
              Agradecemos infinitamente su generosidad en el inicio de nuestro hogar:
            </p>

            <div className="space-y-5 max-w-[345px] mx-auto text-left">
              
              {/* Card direct bank transfer */}
              <div className="bg-[#121212] border border-[#D4AF37]/15 rounded-3xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-[#191919] border-l border-b border-stone-800 flex items-center justify-center text-lg">
                  🏦
                </div>
                <span className="font-display text-[8px] uppercase tracking-widest text-[#D4AF37] block mb-1">CONTRIBUCIÓN DIRECTA</span>
                <h4 className="font-serif text-[12px] font-bold text-white uppercase mb-2">Transferencia Bancaria</h4>
                
                <div className="space-y-1.5 mb-4 border-t border-stone-800 pt-3">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-stone-500">Banco:</span>
                    <span className="text-stone-300 font-semibold">SANTANDER PRIVADO</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-stone-500">Titular:</span>
                    <span className="text-stone-300 font-semibold">Alejandro de la Fuente</span>
                  </div>
                  <div className="flex justify-between items-center text-[10.5px] font-mono">
                    <span className="text-stone-500">CLABE:</span>
                    <span className="text-[#D4AF37] font-bold">0121 8000 9876 5432 10</span>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard('012180009876543210', 'CLABE Santander', 5)}
                  className="w-full py-2.5 bg-stone-900 hover:bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#FAF8F5] rounded-xl text-[9px] font-display uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-1.5"
                >
                  {copiedIndex === 5 ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Cuenta CLABE</span>
                    </>
                  )}
                </button>
              </div>

              {/* Liverpool card */}
              <div className="bg-[#121212] border border-[#D4AF37]/15 rounded-3xl p-5 flex items-center justify-between">
                <div>
                  <span className="font-display text-[8px] uppercase tracking-widest text-[#D4AF37] block mb-1">MESA REGALOS DE LIVERPOOL</span>
                  <h4 className="font-serif text-[12px] font-bold text-white uppercase">Código: 50489211</h4>
                  <p className="font-sans text-[9px] text-stone-500 mt-0.5">Sofía & Alejandro</p>
                </div>
                <button
                  onClick={() => copyToClipboard('50489211', 'Código Liverpool', 6)}
                  className="px-4 py-2 bg-stone-900 hover:bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-white rounded-xl text-[8.5px] font-display uppercase tracking-widest transition-all"
                >
                  {copiedIndex === 6 ? '¡Copiado!' : 'Copiar'}
                </button>
              </div>

              {/* Palacio de Hierro card */}
              <div className="bg-[#121212] border border-[#D4AF37]/15 rounded-3xl p-5 flex items-center justify-between">
                <div>
                  <span className="font-display text-[8px] uppercase tracking-widest text-[#D4AF37] block mb-1">PALACIO DE HIERRO</span>
                  <h4 className="font-serif text-[12px] font-bold text-white uppercase">Nº Evento: PH-9904221</h4>
                  <p className="font-sans text-[9px] text-stone-500 mt-0.5">Boda Sofía & Alejandro</p>
                </div>
                <button
                  onClick={() => copyToClipboard('PH-9904221', 'Palacio de Hierro', 7)}
                  className="px-4 py-2 bg-stone-900 hover:bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-white rounded-xl text-[8.5px] font-display uppercase tracking-widest transition-all"
                >
                  {copiedIndex === 7 ? '¡Copiado!' : 'Copiar'}
                </button>
              </div>

              {/* Amazon registry */}
              <div className="bg-[#121212] border border-[#D4AF37]/15 rounded-3xl p-5 flex items-center justify-between">
                <div>
                  <span className="font-display text-[8px] uppercase tracking-widest text-[#D4AF37] block mb-1">AMAZON BRIDE</span>
                  <h4 className="font-serif text-[12px] font-bold text-white uppercase">Mesa Digital Virtual</h4>
                  <p className="font-sans text-[9px] text-stone-500 mt-0.5">Envío directo a domicilio</p>
                </div>
                <a
                  href="https://amazon.com.mx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-white text-black hover:text-black rounded-xl text-[8.5px] font-display uppercase tracking-widest font-bold transition-all flex items-center space-x-1"
                >
                  <span>Ver</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>
        </ScrollReveal>

        <GoldDivider />

        {/* 10. LIBRO DE RECUERDOS (Real interactive Guestbook using localStorage) */}
        <ScrollReveal>
          <div className="px-8 text-center">
            <BookOpen className="w-6 h-6 text-[#D4AF37] mx-auto mb-5" />
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[#F8F4EE] uppercase mb-2">Libro de Recuerdos</h2>
            <p className="font-cormorant text-[14px] text-stone-400 italic max-w-xs mx-auto mb-8">
              Escribe un mensaje de felicitación o una hermosa dedicatoria para guardar por siempre:
            </p>

            <div className="bg-[#121212] border border-[#D4AF37]/20 rounded-3xl p-6 shadow-xl max-w-[345px] mx-auto text-left relative">
              <form onSubmit={handlePostGuestMessage} className="space-y-4 mb-8">
                <div>
                  <label className="block font-display text-[8px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">Tu Nombre</label>
                  <input
                    type="text"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    placeholder="Ej. Tía Consuelo de la Fuente"
                    className="w-full px-3.5 py-3 border border-[#D4AF37]/25 bg-black rounded-xl text-[11px] font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner"
                  />
                </div>

                <div>
                  <label className="block font-display text-[8px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">Mensaje / Dedicatoria</label>
                  <textarea
                    rows={3}
                    value={newGuestText}
                    onChange={(e) => setNewGuestText(e.target.value)}
                    placeholder="Les deseamos una vida llena de complicidad, amor infinito y felicidad..."
                    className="w-full px-3.5 py-3 border border-[#D4AF37]/25 bg-black rounded-xl text-[11px] font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingMessage}
                  className="w-full py-3.5 bg-transparent hover:bg-[#D4AF37]/15 border border-[#D4AF37]/45 text-[#D4AF37] hover:text-white rounded-xl text-[9px] font-display uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3 h-3" />
                  <span>{isSubmittingMessage ? 'Guardando...' : 'Firmar Libro'}</span>
                </button>
              </form>

              {/* Guest Messages Grid */}
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1.5 custom-scrollbar">
                <span className="font-display text-[8px] text-stone-500 uppercase tracking-widest block mb-1">DEDICATORIAS EN LA GALERÍA</span>
                {guestMessages.map((msg) => (
                  <div key={msg.id} className="bg-black/40 border border-[#D4AF37]/10 p-4 rounded-2xl relative">
                    <h5 className="font-serif text-[11.5px] font-bold text-white mb-1">{msg.name}</h5>
                    <p className="font-sans text-[10px] text-stone-400 italic leading-relaxed">"{msg.text}"</p>
                    <span className="block text-right text-[7.5px] font-mono text-stone-600 mt-2">{msg.date}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </ScrollReveal>

        <GoldDivider />

        {/* 11. RSVP FORM SECTION (Formulario Elegante con confirmación WhatsApp) */}
        <ScrollReveal>
          <div id="asistencia" className="px-8 py-10 bg-[#121212]/70 border-y border-[#D4AF37]/20 text-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_100%)] pointer-events-none" />
            
            <Users className="w-6 h-6 text-[#D4AF37] mx-auto mb-5" />
            <h2 className="font-serif text-2xl tracking-[0.15em] text-[#F8F4EE] uppercase mb-2">Confirmación de Honor</h2>
            <p className="font-cormorant text-[14px] text-stone-400 max-w-xs mx-auto mb-8">
              Agradecemos de corazón confirmar su asistencia antes del 15 de Octubre de 2027 para contemplar cada detalle del banquete:
            </p>

            {rsvpSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/50 border border-emerald-500/30 p-6 rounded-3xl max-w-[325px] mx-auto text-center space-y-3"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-xl shadow-inner">
                  ✓
                </div>
                <h4 className="font-serif text-md font-bold text-white uppercase tracking-wider">¡CONFIRMACIÓN REGISTRADA!</h4>
                <p className="font-sans text-[11px] text-stone-400 leading-relaxed">
                  Gracias por compartir este gran día con nosotros. Los detalles han sido enviados con éxito. ¡Los esperamos con alegría!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="max-w-[320px] mx-auto text-left space-y-4">
                <div>
                  <label className="block font-display text-[8px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={rsvpData.nombre}
                    onChange={(e) => setRsvpData({ ...rsvpData, nombre: e.target.value })}
                    placeholder="Ej. Sr. y Sra. de la Fuente"
                    className="w-full px-3.5 py-3 border border-[#D4AF37]/25 bg-black rounded-xl text-[11px] font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display text-[8px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">Nº de Pases</label>
                    <select
                      value={rsvpData.boletos}
                      onChange={(e) => setRsvpData({ ...rsvpData, boletos: e.target.value })}
                      className="w-full px-3.5 py-3 border border-[#D4AF37]/25 bg-black rounded-xl text-[11px] font-sans text-stone-200 focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner"
                    >
                      {['1', '2', '3', '4', '5', '6'].map((n) => (
                        <option key={n} value={n}>{n} {parseInt(n) === 1 ? 'Pase' : 'Pases'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-display text-[8px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">¿Asistirás?</label>
                    <div className="flex border border-[#D4AF37]/25 bg-black rounded-xl overflow-hidden h-11">
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, asistencia: 'si' })}
                        className={`flex-1 text-[9px] font-display font-bold uppercase tracking-wider transition-all ${
                          rsvpData.asistencia === 'si' ? 'bg-[#D4AF37] text-black' : 'text-stone-500 bg-transparent'
                        }`}
                      >
                        Sí
                      </button>
                      <button
                        type="button"
                        onClick={() => setRsvpData({ ...rsvpData, asistencia: 'no' })}
                        className={`flex-1 text-[9px] font-display font-bold uppercase tracking-wider transition-all ${
                          rsvpData.asistencia === 'no' ? 'bg-[#D4AF37] text-black' : 'text-stone-500 bg-transparent'
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-display text-[8px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">Restricciones Alimenticias</label>
                  <input
                    type="text"
                    value={rsvpData.restricciones}
                    onChange={(e) => setRsvpData({ ...rsvpData, restricciones: e.target.value })}
                    placeholder="Ej. Alergia a mariscos, vegetariano, etc."
                    className="w-full px-3.5 py-3 border border-[#D4AF37]/25 bg-black rounded-xl text-[11px] font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner"
                  />
                </div>

                <div>
                  <label className="block font-display text-[8px] uppercase tracking-widest text-[#D4AF37] mb-1.5 font-bold">Mensaje de buenos deseos</label>
                  <textarea
                    rows={2}
                    value={rsvpData.mensaje}
                    onChange={(e) => setRsvpData({ ...rsvpData, mensaje: e.target.value })}
                    placeholder="¡Qué emoción vivir este día con ustedes!"
                    className="w-full px-3.5 py-3 border border-[#D4AF37]/25 bg-black rounded-xl text-[11px] font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#D4AF37] transition-colors shadow-inner resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#D4AF37] hover:bg-white text-black hover:text-black font-display text-[10px] uppercase tracking-[0.25em] font-semibold rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Mail className="w-4 h-4 text-black fill-black/10" />
                  <span>Confirmar Asistencia</span>
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* 12. ELEGANTE FOOTER SECTION */}
        <div className="pt-20 pb-16 px-8 text-center bg-gradient-to-t from-black to-[#0E0E0E]">
          <div className="w-16 h-[0.5px] bg-[#D4AF37]/40 mx-auto mb-6" />
          <h2 className="font-script text-[44px] text-[#D4AF37] font-light block leading-none lowercase mb-4">
            Sofía & Alejandro
          </h2>
          <p className="font-serif text-[12px] uppercase tracking-[0.25em] text-[#FAF8F5] max-w-xs mx-auto leading-relaxed">
            GRACIAS POR ACOMPAÑARNOS EN EL DÍA MÁS IMPORTANTE DE NUESTRAS VIDAS
          </p>
          
          <div className="mt-8">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.pathname = '/'; }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-transparent hover:bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full font-serif text-[9px] uppercase tracking-[0.2em] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Regresar a Catálogo</span>
            </a>
          </div>

          <div className="text-[8.5px] font-mono text-stone-600 tracking-widest uppercase mt-8">
            © 2027 · Tijuana B.C. · Hecho con amor para siempre
          </div>
        </div>

      </div>
    </div>
  );
}
