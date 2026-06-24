import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Calendar, MapPin, Gift, Music, Play, Pause, 
  Copy, Check, Sparkles, ArrowLeft, Send, ExternalLink, 
  ChevronLeft, ChevronRight, Shield, Smartphone, X,
  Volume2, VolumeX
} from 'lucide-react';
import SilverGlitterCanvas from './SilverGlitterCanvas';

// Elegant minimalist silver/chrome divider
const SilverDivider = () => (
  <div className="flex items-center justify-center space-x-6 my-12 opacity-80">
    <div className="h-[0.5px] w-16 bg-gradient-to-r from-transparent via-[#C8C8C8]/60 to-transparent" />
    <span className="font-serif text-[11px] text-[#C8C8C8] tracking-[0.4em] select-none">✦ ❖ ✦</span>
    <div className="h-[0.5px] w-16 bg-gradient-to-l from-transparent via-[#C8C8C8]/60 to-transparent" />
  </div>
);

// High-end Scroll reveal wrapper
const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10% 0px" }}
    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
  >
    {children}
  </motion.div>
);

// Letter-by-letter animated text
const LetterAnimator: React.FC<{ text: string }> = ({ text }) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsInView(true);
    }, { threshold: 0.1 });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-wrap justify-center leading-relaxed">
      {text.split(" ").map((word, wIdx) => (
        <span key={wIdx} className="mr-2 mb-1.5 flex flex-row">
          {word.split("").map((char, cIdx) => (
            <motion.span
              key={cIdx}
              initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: (wIdx * 3 + cIdx) * 0.02, ease: "easeOut" }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default function TemplateBoda6() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showSilverCanvas, setShowSilverCanvas] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicCardOpen, setIsMusicCardOpen] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [safeOpen, setSafeOpen] = useState(false);
  const [safeUnlocking, setSafeUnlocking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(182); // 3:02 total time
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const storyChapters = [
    { title: "Cómo nos conocimos", meta: "Otoño 2022", subtitle: "Un encuentro inesperado", desc: "Dos miradas cruzadas en un cóctel de gala en el corazón de la ciudad. Lo que comenzó como una conversación sofisticada sobre arte y arquitectura, rápidamente reveló una conexión única, profunda e insustituible." },
    { title: "Nuestro primer viaje", meta: "Primavera 2024", subtitle: "París, Mon Amour", desc: "Perdernos en las noches mágicas de París, compartiendo cafés en la Rue de Saint-Louis-en-l'Île y paseando bajo el Sena. Descubrimos que el mundo entero cobra sentido cuando caminamos tomados de la mano." },
    { title: "El compromiso", meta: "Verano 2026", subtitle: "Bajo la luz del Mediterráneo", desc: "Frente al mar infinito de la Costa Amalfitana, durante un atardecer de bronce y plata, Sebastián pronunció la gran pregunta. Con lágrimas y un infinito latido de ilusión, Victoria respondió con el gran sí." },
    { title: "El gran día", meta: "14.11.2027", subtitle: "Victoria & Sebastián", desc: "Hoy abrimos las puertas a un nuevo destino eterno. Consagramos nuestra unión rodeados del amor de nuestras familias y los amigos más cercanos que han formado parte invaluable de nuestro caminar." }
  ];

  const carouselImages = [
    { src: "/v_s_hero_1782248283047.webp", title: "Victoria & Sebastián", subtitle: "Retrato Editorial de Pareja" },
    { src: "/v_s_hotel_1782248295585.webp", title: "Hotel Starlight Grand", subtitle: "Nuestra Sede de Cinco Estrellas" },
    { src: "/v_s_gala_1782248306837.webp", title: "Salón Imperial", subtitle: "El Gran Salón del Banquete" },
    { src: "/v_s_terrace_1782248319080.webp", title: "Terraza Panorámica", subtitle: "El Cóctel de Bienvenida" },
    { src: "/v_s_stairs_1782248329087.webp", title: "Escaleras Monumentales", subtitle: "Escenario de Nuestra Boda" }
  ];

  const bankingDetails = {
    bank: "Banca Privada Cartier International (BBVA)",
    clabe: "0121 8000 1593 4751 68",
    holder: "Victoria Fernández & Sebastián Montemayor",
    concept: "Boda Victoria y Sebastián"
  };

  const [rsvpData, setRsvpData] = useState({ name: '', guests: '2', diet: 'Ninguna', message: '' });
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);

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

  // Countdown timer logic
  useEffect(() => {
    const targetDate = new Date('Nov 14, 2027 19:00:00').getTime();
    const updateCountdown = () => {
      const distance = targetDate - new Date().getTime();
      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleAudioSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
  };

  const toggleMusic = () => {
    setIsMusicCardOpen(!isMusicCardOpen);
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

    // Web Audio Synthesizer: Elegant Crystal Chime Arpeggio
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const audioCtx = new AudioContext();
        const chord = [261.63, 311.13, 392.00, 466.16, 523.25, 587.33, 783.99, 1046.50];
        chord.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.08);
          gain.gain.setValueAtTime(0, audioCtx.currentTime);
          gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + i * 0.08 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.08 + 1.2);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(audioCtx.currentTime + i * 0.08);
          osc.stop(audioCtx.currentTime + i * 0.08 + 1.3);
        });
      }
    } catch (e) {}

    setShowSilverCanvas(true);

    setTimeout(() => {
      setEnvelopeOpened(true);
      setIsMusicCardOpen(true);
    }, 1800);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    triggerToast(`¡Copiado: ${label}!`);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleUnlockSafe = () => {
    setSafeUnlocking(true);
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const audioCtx = new AudioContext();
        [523.25, 659.25, 783.99].forEach((f, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.setValueAtTime(f, audioCtx.currentTime + i * 0.06);
          gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.06 + 0.3);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.4);
        });
      }
    } catch(e) {}

    setTimeout(() => {
      setSafeOpen(true);
      setSafeUnlocking(false);
      triggerToast("Caja fuerte desbloqueada");
    }, 1200);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.name.trim()) {
      triggerToast("Por favor ingresa tu nombre");
      return;
    }
    setIsSubmittingRsvp(true);
    setTimeout(() => {
      setIsSubmittingRsvp(false);
      setRsvpSuccess(true);
      triggerToast("Confirmación registrada con éxito");
    }, 1500);
  };

  return (
    <div id="luxury-template-6" className="min-h-screen bg-[#0A0A0A] text-[#F8F8F8] font-sans antialiased overflow-x-hidden selection:bg-[#C8C8C8]/30 selection:text-[#F8F8F8]">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#161616]/95 border border-[#C8C8C8]/30 backdrop-blur-md px-6 py-3 rounded-full flex items-center space-x-3 shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-[#C8C8C8] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#F8F8F8] font-serif">{toastMessage}</span>
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
                className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-[#121212]/95 backdrop-blur-md rounded-full border border-[#C8C8C8]/30 p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)] font-sans"
              >
                <button 
                  onClick={togglePlayPause}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C8C8C8] to-[#E0E0E0] text-stone-950 flex items-center justify-center transition-all active:scale-95 shadow-md flex-shrink-0"
                  title={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? <Pause className="w-3 h-3 fill-stone-950" /> : <Play className="w-3 h-3 fill-stone-950 ml-0.5" />}
                </button>
                <div className="pr-1 pl-1 min-w-0 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-[#F8F8F8] whitespace-nowrap leading-none block">A Thousand Years</span>
                  <span className="text-[8px] text-[#C8C8C8] whitespace-nowrap leading-none block mt-0.5">Música de Fondo</span>
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
                className="fixed bottom-6 right-6 z-40 p-3 bg-[#121212]/95 hover:bg-stone-900 text-white rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-[#C8C8C8]/30 transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-90 group"
                aria-label="Escuchar música"
              >
                <Music className="w-4 h-4 group-hover:scale-110 transition-transform text-[#C8C8C8]" />
              </motion.button>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Dynamic Glitter Background FX */}
      {showSilverCanvas && <SilverGlitterCanvas />}

      <AnimatePresence mode="wait">
        {!envelopeOpened ? (
          /* ================= PANTALLA INICIAL: SOBRE DE LUJO ================= */
          <motion.div
            key="luxury-envelope"
            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#070707] flex flex-col items-center justify-center px-4"
          >
            <div className="absolute inset-4 md:inset-10 border border-[#C8C8C8]/10 pointer-events-none" />

            <div className="w-full max-w-[420px] flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0 }}
                className="relative w-full aspect-[4/5] bg-[#0E0E0E] rounded-[24px] p-8 border border-[#C8C8C8]/20 shadow-2xl flex flex-col items-center justify-between overflow-hidden"
              >
                {/* Silver corner decals */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#C8C8C8]/20 rounded-tl" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#C8C8C8]/20 rounded-tr" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#C8C8C8]/20 rounded-bl" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#C8C8C8]/20 rounded-br" />

                <div className="text-center mt-4">
                  <p className="text-[#C8C8C8]/60 text-[9px] uppercase tracking-[0.25em] mb-2">Dior Haute Couture</p>
                  <p className="text-[12px] font-light text-[#F8F8F8]/90 tracking-[0.18em] leading-relaxed max-w-[260px] mx-auto font-serif">
                    Has sido invitado(a) a una celebración extraordinaria
                  </p>
                </div>

                {/* Silver Monogram Plate */}
                <div className="relative my-6">
                  <motion.div
                    animate={isOpening ? { scale: [1, 1.08, 1.02] } : {}}
                    transition={{ duration: 1.2, repeat: isOpening ? Infinity : 0 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1C1C1C] to-[#0A0A0A] border border-[#C8C8C8]/30 shadow-2xl flex items-center justify-center"
                  >
                    <span className="font-serif text-[24px] tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] to-[#999999] font-light">
                      VS
                    </span>
                  </motion.div>
                </div>

                {/* Opening Button */}
                <div className="w-full px-2 z-10">
                  <button
                    disabled={isOpening}
                    onClick={handleOpenEnvelope}
                    className="w-full py-3.5 bg-transparent border border-[#C8C8C8]/40 hover:bg-white/5 hover:border-white rounded-lg transition-all duration-300"
                    id="open-invitation-btn"
                  >
                    <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-white">
                      {isOpening ? "Abriendo..." : "Abrir Invitación"}
                    </span>
                  </button>
                </div>
              </motion.div>
              <p className="mt-8 text-[8px] uppercase tracking-[0.3em] text-[#C8C8C8]/30 font-mono">
                Victoria & Sebastián — 14.11.2027
              </p>
            </div>
          </motion.div>
        ) : (
          /* ================= TEMPLATE PRINCIPAL DE LUJO ================= */
          <motion.div key="luxury-contents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0 }} className="relative">
            
            {/* HERO PRINCIPAL */}
            <header className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 py-12 overflow-hidden bg-black">
              <div className="absolute inset-0 z-0">
                <img 
                  src="/v_s_hero_1782248283047.webp" 
                  alt="Victoria & Sebastián Portada"
                  className="w-full h-full object-cover brightness-[0.40] contrast-[1.02]"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0A0A0A]" />
              </div>

              <div className="relative z-10 w-full max-w-5xl flex justify-between items-center px-4">
                <span className="font-serif text-[13px] text-[#C8C8C8] tracking-[0.3em]">V & S</span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-[#C8C8C8]/50 border border-[#C8C8C8]/20 px-2 py-0.5 rounded">Invitación Elite</span>
              </div>

              <div className="relative z-10 my-auto max-w-3xl px-2">
                <p className="text-[#C8C8C8]/70 text-[9px] uppercase tracking-[0.4em] mb-4">Nuestra Unión</p>
                
                <h1 className="font-serif text-[38px] sm:text-[55px] md:text-[72px] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D0D0D0] to-[#999999] tracking-tight leading-none mb-6">
                  Victoria <span className="font-serif italic font-light text-[32px] sm:text-[45px] md:text-[62px] text-[#C8C8C8]/80">&</span> Sebastián
                </h1>

                <p className="font-serif italic text-stone-300 text-[15px] sm:text-[18px] md:text-[22px] max-w-lg mx-auto font-light mb-8">
                  "El verdadero lujo fue encontrarnos"
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="#confirmacion" className="px-8 py-3 bg-gradient-to-r from-white to-[#D0D0D0] text-[#0A0A0A] text-[10px] uppercase tracking-[0.2em] font-serif rounded shadow-xl hover:opacity-90 transition-opacity w-full sm:w-auto">
                    Confirmar Asistencia
                  </a>
                  <a href="#historia" className="px-8 py-3 bg-transparent border border-white/20 text-[#F8F8F8] text-[10px] uppercase tracking-[0.2em] font-serif rounded hover:bg-white/5 transition-all w-full sm:w-auto">
                    Nuestra Historia
                  </a>
                </div>
              </div>

              <div className="relative z-10 w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center gap-3 px-4 border-t border-white/10 pt-6">
                <div className="text-center sm:text-left">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F8F8]/90">14 . NOVIEMBRE . 2027</p>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-[#C8C8C8]/50 mt-0.5">Sábado — 19:00 Horas</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#F8F8F8]/90">CIUDAD DE MÉXICO</p>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-[#C8C8C8]/50 mt-0.5">Hotel Starlight Grand</p>
                </div>
              </div>
            </header>


            {/* SWISS WATCH COUNTDOWN */}
            <section className="relative py-20 bg-[#070707] flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,200,200,0.02)_0%,transparent_70%)] pointer-events-none" />
              
              <ScrollReveal>
                <div className="text-center mb-10">
                  <p className="text-[#C8C8C8]/60 text-[9px] uppercase tracking-[0.3em] mb-1">Swiss Precision</p>
                  <h2 className="font-serif text-[26px] sm:text-[32px] tracking-wide text-[#F8F8F8]/90">El Tiempo se Detiene</h2>
                  <div className="w-8 h-[1px] bg-[#C8C8C8]/30 mx-auto mt-3" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                {/* Patek Philippe-inspired Dial */}
                <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full bg-[#090909] border-[3px] border-stone-800 shadow-2xl flex items-center justify-center p-4">
                  <div className="absolute inset-2.5 rounded-full border border-[#C8C8C8]/5 pointer-events-none" />
                  
                  <span className="absolute top-5 font-serif text-[10px] text-[#C8C8C8]/30">XII</span>
                  <span className="absolute right-5 font-serif text-[10px] text-[#C8C8C8]/30">III</span>
                  <span className="absolute bottom-5 font-serif text-[10px] text-[#C8C8C8]/30">VI</span>
                  <span className="absolute left-5 font-serif text-[10px] text-[#C8C8C8]/30">IX</span>

                  <div className="absolute w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] rounded-full border border-[#C8C8C8]/10 flex flex-col justify-center items-center bg-[#090909]/60 z-10 backdrop-blur-xs">
                    <span className="text-[6px] uppercase tracking-[0.3em] text-stone-500 mb-3 font-mono">AUTOMATIQUE V&S</span>

                    <div className="grid grid-cols-4 gap-1.5 text-center w-full px-1">
                      <div>
                        <span className="font-serif text-[22px] text-[#F8F8F8] leading-none block">{timeLeft.days}</span>
                        <span className="text-[6px] uppercase tracking-widest text-stone-400">Días</span>
                      </div>
                      <div className="border-l border-white/5">
                        <span className="font-serif text-[22px] text-[#F8F8F8] leading-none block">{timeLeft.hours}</span>
                        <span className="text-[6px] uppercase tracking-widest text-stone-400">Hrs</span>
                      </div>
                      <div className="border-l border-white/5">
                        <span className="font-serif text-[22px] text-[#F8F8F8] leading-none block">{timeLeft.minutes}</span>
                        <span className="text-[6px] uppercase tracking-widest text-stone-400">Min</span>
                      </div>
                      <div className="border-l border-white/5">
                        <span className="font-serif text-[22px] text-[#C8C8C8] leading-none block animate-pulse">{timeLeft.seconds}</span>
                        <span className="text-[6px] uppercase tracking-widest text-stone-400">Seg</span>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic mechanical hands */}
                  <div className="absolute w-[1.5px] h-16 bg-[#C8C8C8]/40 origin-bottom -translate-y-8 rotate-[45deg] pointer-events-none" />
                  <div className="absolute w-[1px] h-20 bg-stone-700 origin-bottom -translate-y-10 rotate-[280deg] pointer-events-none" />
                  <div className="absolute w-[5px] h-[5px] rounded-full bg-white z-20" />
                </div>
              </ScrollReveal>
            </section>


            {/* SPOTIFY MUSIC PLAYER */}
            <section className="relative py-12 bg-[#0D0D0D] border-t border-b border-white/5 px-4">
              <div className="max-w-[380px] mx-auto bg-[#141414]/90 rounded-[24px] p-5 border border-[#C8C8C8]/15 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1.5 text-stone-400">
                    <Music className="w-3.5 h-3.5 text-[#C8C8C8]" />
                    <span className="text-[8px] uppercase tracking-[0.2em] font-medium font-mono">Spotify Edition</span>
                  </div>
                  <span className="text-[7px] uppercase tracking-[0.15em] border border-white/10 px-1.5 py-0.5 rounded text-stone-500">HD AUDIO</span>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-950 border border-white/10 flex-shrink-0">
                    <img src="/v_s_hero_1782248283047.webp" alt="Mini Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-serif text-[13px] text-white truncate tracking-wide">Nuestra Canción de Boda</p>
                    <p className="text-[9px] text-stone-400 uppercase tracking-widest truncate mt-0.5">Victoria & Sebastián</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-4 text-stone-200">
                  <div className="flex items-center justify-between bg-[#141414] p-4 rounded-2xl border border-white/10">
                    <button 
                      onClick={togglePlayPause}
                      className="p-3 bg-gradient-to-r from-[#C8C8C8] to-[#E0E0E0] hover:opacity-95 text-stone-950 rounded-full transition-all active:scale-95 flex items-center justify-center shadow-lg"
                      title={isPlaying ? "Pausar" : "Reproducir"}
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-stone-950" /> : <Play className="w-5 h-5 fill-stone-950 ml-0.5" />}
                    </button>
                    
                    <div className="flex items-center space-x-2 flex-1 ml-4">
                      {isPlaying ? (
                        <Volume2 className="w-4 h-4 text-[#C8C8C8] animate-pulse" />
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
                        className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#C8C8C8]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>


            {/* HISTORIA DE AMOR */}
            <section id="historia" className="relative py-24 bg-[#0A0A0A] px-4">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <p className="text-[#C8C8C8]/60 text-[9px] uppercase tracking-[0.3em] mb-1">Our Romance Chronology</p>
                  <h2 className="font-serif text-[28px] sm:text-[34px] text-[#F8F8F8]/90">Historia de Amor</h2>
                  <div className="w-8 h-[1px] bg-[#C8C8C8]/30 mx-auto mt-3" />
                </div>
              </ScrollReveal>

              <div className="max-w-md mx-auto relative pl-4 sm:pl-0">
                <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[0.5px] bg-gradient-to-b from-[#C8C8C8]/30 via-transparent to-transparent transform sm:-translate-x-1/2" />

                {storyChapters.map((ch, idx) => (
                  <div key={ch.title} className="relative mb-12 last:mb-0">
                    <ScrollReveal>
                      <div className="absolute left-0 sm:left-1/2 w-2 h-2 rounded-full bg-stone-300 border border-black transform -translate-x-1 top-1.5 z-10" />
                      
                      <div className={`sm:w-[45%] ${idx % 2 === 0 ? 'sm:mr-auto sm:text-right pr-4' : 'sm:ml-auto sm:text-left pl-4'} pl-6 sm:pl-0`}>
                        <div className="bg-[#121212]/90 border border-white/10 p-5 rounded-2xl shadow-xl hover:border-[#C8C8C8]/30 transition-all backdrop-blur-md">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 block mb-1">{ch.meta}</span>
                          <h3 className="font-serif text-[18px] text-white tracking-wide mb-0.5">{ch.title}</h3>
                          <h4 className="text-[10px] uppercase tracking-wider text-[#C8C8C8]/70 font-serif italic mb-3">{ch.subtitle}</h4>
                          <p className="text-[12px] leading-relaxed text-stone-300 font-light text-justify">{ch.desc}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  </div>
                ))}
              </div>
            </section>


            {/* FRASE ESPECIAL - LETTER ANIMATOR */}
            <section className="relative py-24 bg-[#050505] px-6 text-center border-t border-b border-white/5">
              <div className="relative z-10 max-w-xl mx-auto">
                <span className="font-serif italic text-stone-500 text-[30px] block mb-2">“</span>
                <div className="font-serif text-[16px] sm:text-[20px] text-stone-200 tracking-wide font-light">
                  <LetterAnimator text="Entre millones de personas, encontramos a quien convirtió nuestra historia en algo extraordinario." />
                </div>
                <span className="font-serif italic text-stone-500 text-[30px] block mt-2">”</span>
              </div>
            </section>


            {/* GALLERY 3D CAROUSEL */}
            <section className="relative py-24 bg-[#0A0A0A] px-4 overflow-hidden">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <p className="text-[#C8C8C8]/60 text-[9px] uppercase tracking-[0.3em] mb-1">Editorial Showcase</p>
                  <h2 className="font-serif text-[28px] sm:text-[34px] text-[#F8F8F8]/90">Galería Cinematográfica</h2>
                  <div className="w-8 h-[1px] bg-[#C8C8C8]/30 mx-auto mt-3" />
                </div>
              </ScrollReveal>

              <div className="max-w-2xl mx-auto flex flex-col items-center">
                <div className="relative w-[230px] sm:w-[290px] h-[330px] sm:h-[390px] flex items-center justify-center">
                  <AnimatePresence mode="popLayout">
                    {carouselImages.map((img, idx) => {
                      const offset = (idx - carouselIndex + carouselImages.length) % carouselImages.length;
                      if (offset > 1 && offset < carouselImages.length - 1) return null;

                      let xPos = 0;
                      let scale = 0.8;
                      let opacity = 0;
                      let zIndex = 10;

                      if (offset === 0) {
                        xPos = 0; scale = 1.0; opacity = 1; zIndex = 30;
                      } else if (offset === 1) {
                        xPos = 120; scale = 0.85; opacity = 0.5; zIndex = 20;
                      } else if (offset === carouselImages.length - 1) {
                        xPos = -120; scale = 0.85; opacity = 0.5; zIndex = 20;
                      }

                      return (
                        <motion.div
                          key={img.src}
                          style={{ zIndex }}
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity, scale, x: xPos }}
                          exit={{ opacity: 0, scale: 0.7 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          className="absolute w-full h-full rounded-[20px] overflow-hidden bg-stone-900 border border-white/10 shadow-2xl cursor-pointer"
                          onClick={() => setCarouselIndex(idx)}
                        >
                          <img src={img.src} alt={img.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 text-left">
                            <p className="text-[8px] uppercase tracking-widest text-stone-400 font-mono mb-0.5">{img.subtitle}</p>
                            <h4 className="font-serif text-[15px] text-white tracking-wide font-medium">{img.title}</h4>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="flex items-center space-x-6 mt-6">
                  <button onClick={() => setCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)} className="w-9 h-9 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center text-white">
                    <ChevronLeft className="w-4.5 h-4.5" />
                  </button>
                  <span className="text-[10px] font-mono text-[#C8C8C8]">
                    {carouselIndex + 1} / {carouselImages.length}
                  </span>
                  <button onClick={() => setCarouselIndex((prev) => (prev + 1) % carouselImages.length)} className="w-9 h-9 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center text-white">
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </section>


            {/* UBICACIONES */}
            <section className="relative py-20 bg-[#080808] border-t border-white/5 px-4">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <p className="text-[#C8C8C8]/60 text-[9px] uppercase tracking-[0.3em] mb-1">Itinerary</p>
                    <h2 className="font-serif text-[28px] sm:text-[34px] text-white">Ubicación del Evento</h2>
                    <div className="w-8 h-[1px] bg-[#C8C8C8]/30 mx-auto mt-3" />
                  </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  {/* Ceremonia */}
                  <ScrollReveal delay={0.05}>
                    <div className="bg-[#121212]/95 border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full relative">
                      <div className="text-center">
                        <span className="text-[8px] uppercase tracking-[0.2em] font-serif text-[#C8C8C8]/80 block mb-2">— Ceremonia —</span>
                        <h3 className="font-serif text-[20px] text-white block mb-1">Hotel Starlight Grand</h3>
                        <p className="text-stone-400 text-[10px] uppercase font-mono mb-4">19:00 Horas</p>
                        <div className="w-6 h-[0.5px] bg-[#C8C8C8]/25 mx-auto mb-4" />
                        <p className="text-stone-300 text-[12px] font-light leading-relaxed mb-6 max-w-[240px] mx-auto">
                          Lobby Principal de Cristal<br />Paseo de la Reforma, Juárez, Ciudad de México
                        </p>
                      </div>
                      <a href="https://maps.google.com/?q=Hotel+Starlight+Grand+Juarez+CDMX" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-transparent border border-white/20 hover:bg-white/5 text-[9px] uppercase tracking-widest text-center rounded flex items-center justify-center space-x-1 text-white">
                        <MapPin className="w-3 h-3 text-[#C8C8C8]" />
                        <span>Ver ubicación</span>
                      </a>
                    </div>
                  </ScrollReveal>

                  {/* Recepción */}
                  <ScrollReveal delay={0.15}>
                    <div className="bg-[#121212]/95 border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full relative">
                      <div className="text-center">
                        <span className="text-[8px] uppercase tracking-[0.2em] font-serif text-[#C8C8C8]/80 block mb-2">— Recepción —</span>
                        <h3 className="font-serif text-[20px] text-white block mb-1">Salón Imperial</h3>
                        <p className="text-stone-400 text-[10px] uppercase font-mono mb-4">21:00 Horas</p>
                        <div className="w-6 h-[0.5px] bg-[#C8C8C8]/25 mx-auto mb-4" />
                        <p className="text-stone-300 text-[12px] font-light leading-relaxed mb-6 max-w-[240px] mx-auto">
                          Gran Salón de Gala Imperial<br />Paseo de la Reforma, Juárez, Ciudad de México
                        </p>
                      </div>
                      <a href="https://maps.google.com/?q=Hotel+Starlight+Grand+Juarez+CDMX" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-gradient-to-r from-stone-900 to-[#121212] border border-white/25 text-[9px] uppercase tracking-widest text-center rounded flex items-center justify-center space-x-1 text-white">
                        <ExternalLink className="w-3 h-3 text-[#C8C8C8]" />
                        <span>Cómo llegar</span>
                      </a>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </section>


            {/* CODE VESTIMENTA */}
            <section className="relative py-20 bg-[#0A0A0A] px-4">
              <div className="max-w-3xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <p className="text-[#C8C8C8]/60 text-[9px] uppercase tracking-[0.3em] mb-1">Dress Code Protocol</p>
                    <h2 className="font-serif text-[28px] sm:text-[34px] text-white">Código de Vestimenta</h2>
                    <div className="w-8 h-[1px] bg-[#C8C8C8]/30 mx-auto mt-3" />
                    <p className="text-[11px] uppercase tracking-[0.15em] text-[#C8C8C8] mt-3 font-serif italic">Black Tie / Rigurosa Etiqueta</p>
                  </div>
                </ScrollReveal>

                <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <ScrollReveal delay={0.05}>
                    <div className="bg-[#121212]/90 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                      <div className="aspect-[3/4] overflow-hidden bg-stone-900 relative">
                        <img src="/v_s_dress_men_1782248340756.webp" alt="Esmoquin Masculino" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="font-serif text-[15px] text-white mb-1">Hombres</h4>
                        <p className="text-stone-400 text-[10px] uppercase font-mono mb-2">Esmoquin Negro</p>
                        <p className="text-[11px] text-stone-500 font-light leading-relaxed">Pajarita negra de seda, camisa blanca de etiqueta y calzado de charol.</p>
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.15}>
                    <div className="bg-[#121212]/90 border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col">
                      <div className="aspect-[3/4] overflow-hidden bg-stone-900 relative">
                        <img src="/v_s_dress_women_1782248350235.webp" alt="Vestido Gala Femenino" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="font-serif text-[15px] text-white mb-1">Mujeres</h4>
                        <p className="text-stone-400 text-[10px] uppercase font-mono mb-2">Vestido Largo de Gala</p>
                        <p className="text-[11px] text-stone-500 font-light leading-relaxed">Vestido de gala largo formal en tonos oscuros o sofisticados de alta costura.</p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </section>


            {/* MESA DE REGALOS - SWISS VAULT */}
            <section className="relative py-24 bg-[#0D0D0D] border-t border-b border-white/5 px-4">
              <div className="max-w-md mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <p className="text-[#C8C8C8]/60 text-[9px] uppercase tracking-[0.3em] mb-1">Gift Registry & Well Wishes</p>
                    <h2 className="font-serif text-[28px] sm:text-[34px] text-white">Mesa de Regalos</h2>
                    <div className="w-8 h-[1px] bg-[#C8C8C8]/30 mx-auto mt-3" />
                    <p className="text-[11px] text-stone-400 font-light mt-3 leading-relaxed">
                      Su compañía es lo más valioso. Si desean otorgarnos un presente, les compartimos nuestras alternativas:
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <div className="bg-[#121212] border border-[#C8C8C8]/25 rounded-[24px] p-6 shadow-2xl overflow-hidden relative">
                    {!safeOpen ? (
                      <div className="flex flex-col items-center py-6 text-center">
                        <div className="w-16 h-16 rounded-full border border-[#C8C8C8]/20 flex items-center justify-center bg-black/40 relative mb-4">
                          <Shield className="w-6 h-6 text-[#C8C8C8] animate-pulse" />
                        </div>
                        <h4 className="font-serif text-[16px] text-white mb-1">Caja Fuerte de Regalos</h4>
                        <p className="text-stone-500 text-[10px] uppercase tracking-wider font-mono mb-4">Desbloquear para ver detalles</p>
                        
                        <button onClick={handleUnlockSafe} disabled={safeUnlocking} className="px-6 py-2.5 bg-transparent border border-[#C8C8C8]/40 hover:border-white text-[10px] uppercase tracking-wider font-serif rounded text-white transition-all">
                          {safeUnlocking ? "Girando Dial..." : "Abrir Caja Fuerte"}
                        </button>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="flex items-center space-x-2 pb-3 border-b border-white/5">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-[9px] uppercase tracking-wider text-stone-400 font-mono">Caja Desbloqueada con Éxito</span>
                        </div>

                        <div className="space-y-3">
                          <span className="text-[9px] uppercase tracking-wider text-[#C8C8C8] font-serif block">Transferencia Bancaria</span>
                          <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-2 font-mono text-[10px]">
                            <div className="flex justify-between"><span className="text-stone-500">Banco:</span> <span className="text-stone-300">{bankingDetails.bank}</span></div>
                            <div className="flex justify-between items-center">
                              <span className="text-stone-500">CLABE:</span> 
                              <div className="flex items-center space-x-1.5">
                                <span className="text-stone-200">{bankingDetails.clabe}</span>
                                <button onClick={() => copyToClipboard(bankingDetails.clabe, "CLABE")} className="text-stone-500 hover:text-white"><Copy className="w-3 h-3" /></button>
                              </div>
                            </div>
                            <div className="flex justify-between"><span className="text-stone-500">Titular:</span> <span className="text-stone-300 text-right">{bankingDetails.holder}</span></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                            <span className="text-[9px] uppercase tracking-wider text-white font-serif block mb-1">Lluvia de Sobres</span>
                            <p className="text-[10px] text-stone-400 font-light">Habrá un buzón elegante el día de la recepción para sobres.</p>
                          </div>
                          <div className="bg-black/30 border border-white/5 rounded-xl p-3 flex flex-col justify-between">
                            <div>
                              <span className="text-[9px] uppercase tracking-wider text-white font-serif block mb-1">Palacio de Hierro</span>
                              <p className="text-[10px] text-stone-400 font-light mb-2">Evento oficial de bodas Nº <strong className="text-white font-mono">#50428105</strong>.</p>
                            </div>
                            <a href="https://www.elpalaciodehierro.com" target="_blank" rel="noopener noreferrer" className="w-full py-1 bg-stone-900 border border-white/10 hover:border-white text-[8px] uppercase tracking-wider text-center block text-stone-300 rounded">Mesa Online</a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </section>


            {/* RSVP FORM */}
            <section id="confirmacion" className="relative py-24 bg-[#0A0A0A] px-4">
              <div className="max-w-md mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <p className="text-[#C8C8C8]/60 text-[9px] uppercase tracking-[0.3em] mb-1">Confirm your Presence</p>
                    <h2 className="font-serif text-[28px] sm:text-[34px] text-white">Confirmación de Asistencia</h2>
                    <div className="w-8 h-[1px] bg-[#C8C8C8]/30 mx-auto mt-3" />
                    <p className="text-[11px] text-stone-400 font-light mt-3">
                      Agradecemos su valioso registro antes del <strong className="text-white">15 de Octubre de 2027</strong>.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <div className="bg-[#121212]/95 border border-white/10 rounded-2xl p-6 shadow-xl relative">
                    {!rsvpSuccess ? (
                      <form onSubmit={handleRsvpSubmit} className="space-y-4">
                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-[#C8C8C8] mb-1.5 font-serif font-medium">Nombre Completo</label>
                          <input type="text" required placeholder="Sr. y Sra. Fernández" value={rsvpData.name} onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })} className="w-full bg-black/60 border border-white/10 rounded-lg px-3.5 py-2.5 text-[12px] text-white focus:outline-hidden focus:border-stone-400 transition-colors font-light placeholder:text-stone-700" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-[#C8C8C8] mb-1.5 font-serif font-medium">Boletos Confirmados</label>
                            <select value={rsvpData.guests} onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })} className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2.5 text-[12px] text-white focus:outline-hidden focus:border-stone-400 transition-colors font-light">
                              <option value="1">1 Boleto</option>
                              <option value="2">2 Boletos</option>
                              <option value="3">3 Boletos</option>
                              <option value="4">4 Boletos o más</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-[#C8C8C8] mb-1.5 font-serif font-medium">Menú / Alergias</label>
                            <select value={rsvpData.diet} onChange={(e) => setRsvpData({ ...rsvpData, diet: e.target.value })} className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2.5 text-[12px] text-white focus:outline-hidden focus:border-stone-400 transition-colors font-light">
                              <option value="Ninguna">Sin Restricciones</option>
                              <option value="Vegano">Vegano / Vegetariano</option>
                              <option value="Sin Gluten">Sin Gluten</option>
                              <option value="Alergias">Especiales / Alergias</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-[#C8C8C8] mb-1.5 font-serif font-medium">Notas o Felicitaciones (Opcional)</label>
                          <textarea rows={2} placeholder="Sinceras palabras..." value={rsvpData.message} onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })} className="w-full bg-black/60 border border-white/10 rounded-lg px-3.5 py-2.5 text-[12px] text-white focus:outline-hidden focus:border-stone-400 transition-colors font-light placeholder:text-stone-700 resize-none" />
                        </div>

                        <button type="submit" disabled={isSubmittingRsvp} className="w-full py-3 bg-gradient-to-r from-white to-[#D5D5D5] text-[#0A0A0A] text-[10px] uppercase tracking-widest font-serif font-semibold rounded hover:opacity-90 transition-opacity flex items-center justify-center space-x-1.5 disabled:opacity-50">
                          {isSubmittingRsvp ? (
                            <>
                              <div className="w-3 h-3 rounded-full border border-stone-800 border-t-stone-400 animate-spin" />
                              <span>Registrando...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3 h-3" />
                              <span>Confirmar Asistencia</span>
                            </>
                          )}
                        </button>
                      </form>
                    ) : (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1 }} className="py-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white mx-auto mb-4">
                          <Check className="w-6 h-6" />
                        </div>
                        <h4 className="font-serif text-[20px] text-white mb-1">Protocolo Completado</h4>
                        <p className="text-stone-400 text-[10px] uppercase font-mono mb-4">Victoria & Sebastián</p>
                        
                        <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-1.5 mb-6 text-left font-mono text-[10px] max-w-[280px] mx-auto">
                          <p className="flex justify-between"><span className="text-stone-500">Invitado:</span> <span className="text-stone-200">{rsvpData.name}</span></p>
                          <p className="flex justify-between"><span className="text-stone-500">Boletos:</span> <span className="text-stone-200">{rsvpData.guests}</span></p>
                          <p className="flex justify-between"><span className="text-stone-500">Menú:</span> <span className="text-stone-200">{rsvpData.diet}</span></p>
                        </div>
                        <p className="text-stone-400 text-[11px] max-w-[260px] mx-auto leading-relaxed">
                          Su confirmación ha sido formalmente añadida a la lista de etiqueta. ¡Los esperamos!
                        </p>
                      </motion.div>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </section>


            {/* FOOTER */}
            <footer className="relative py-20 bg-[#050505] border-t border-white/5 px-4 text-center">
              <ScrollReveal>
                <div className="max-w-md mx-auto space-y-6">
                  <span className="font-serif text-[24px] text-stone-300 tracking-widest block font-light select-none">V ❖ S</span>
                  <p className="font-serif italic text-stone-400 text-[14px] leading-relaxed">
                    "Gracias por acompañarnos en el día más importante de nuestras vidas"
                  </p>
                  <div className="w-6 h-[0.5px] bg-[#C8C8C8]/20 mx-auto" />
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-white">Victoria & Sebastián</p>
                    <p className="text-[7px] uppercase tracking-[0.2em] text-stone-500 font-mono mt-2">Dior Haute Couture & Rolls Royce Digital Edition</p>
                  </div>
                  
                  <div className="pt-4">
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.pathname = '/'; }}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-transparent hover:bg-white/5 border border-white/20 text-stone-300 hover:text-white rounded-full font-serif text-[9px] uppercase tracking-widest transition-all"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Regresar a Catálogo</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Catálogo button */}
      {envelopeOpened && (
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.pathname = '/'; }}
          className="fixed top-6 left-6 z-40 bg-[#121212]/90 border border-white/10 backdrop-blur-md px-3.5 py-2 rounded-full flex items-center space-x-1.5 hover:bg-stone-900 shadow-2xl transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[8px] uppercase tracking-[0.2em] font-medium text-stone-300">Regresar</span>
        </a>
      )}

    </div>
  );
}
