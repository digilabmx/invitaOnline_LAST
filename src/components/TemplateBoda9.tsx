import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Calendar, MapPin, Gift, Music, Play, Pause, 
  Copy, Check, Sparkles, Send, ExternalLink, 
  ChevronLeft, ChevronRight, Volume2, VolumeX, Info, Phone, Eye, ArrowLeft
} from 'lucide-react';

// Color Palette Constants:
// Azul Medianoche: #0B1E3B
// Plata Lunar: #DADADA
// Blanco Estelar: #FFFFFF
// Azul Cósmico: #1D3557
// Deep Charcoal Space: #030712

interface StarNode {
  id: number;
  x: number;
  y: number;
  title: string;
  date: string;
  place: string;
  desc: string;
}

// Background glowing stars and nebulae canvas
const CelestialCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Shooting stars state
    const shootingStars: {
      x: number;
      y: number;
      len: number;
      speed: number;
      opacity: number;
    }[] = [];

    // Ambient stars state
    const stars: {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      color: string;
    }[] = [];

    const colors = ['#FFFFFF', '#DADADA', '#A5F3FC', '#FCE7F3'];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      stars.length = 0;
      const starCount = Math.floor((width * height) / 12000);
      for (let i = 0; i < Math.max(starCount, 40); i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.01 + 0.005,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    init();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      // Deep space overlay with very slight transparency to leave star trails
      ctx.fillStyle = 'rgba(3, 7, 18, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Render cosmic nebula glow
      const radialGlow = ctx.createRadialGradient(
        width / 2, height / 2, 50,
        width / 2, height / 2, Math.max(width, height)
      );
      radialGlow.addColorStop(0, 'rgba(29, 53, 87, 0.15)'); // Cosmic Blue
      radialGlow.addColorStop(0.5, 'rgba(11, 30, 59, 0.08)'); // Midnight Blue
      radialGlow.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Render ambient stars with twinkling effect
      stars.forEach((s) => {
        s.opacity += s.speed;
        if (s.opacity > 1 || s.opacity < 0.1) {
          s.speed = -s.speed;
        }

        ctx.beginPath();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, s.opacity));
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn shooting stars randomly
      if (Math.random() < 0.015 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          len: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 4,
          opacity: 1
        });
      }

      // Draw and update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.speed;
        ss.y += ss.speed * 0.5; // slight angle
        ss.opacity -= 0.02;

        if (ss.opacity <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.len, ss.y - ss.len * 0.5);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        gradient.addColorStop(0.5, `rgba(165, 243, 252, ${ss.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(29, 53, 87, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len, ss.y - ss.len * 0.5);
        ctx.stroke();
        ctx.restore();
      }

      // Restore alpha
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />;
};

export default function TemplateBoda9() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInited, setAudioInited] = useState(false);
  const [showShootingStarAnimation, setShowShootingStarAnimation] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttendance, setRsvpAttendance] = useState('si');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpDiet, setRsvpDiet] = useState('');
  const [rsvpSent, setRsvpSent] = useState(false);
  
  // Interactive Constellation State
  const [activeStoryStar, setActiveStoryStar] = useState<number>(0);

  // Time remaining countdown
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2027-07-07T18:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Background MP3 Music Engine
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startSynthesizer = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-romantic-vows-1151.mp3');
      audioRef.current.loop = true;
    }
    setIsPlaying(true);
    audioRef.current.play().catch(err => {
      console.warn("Audio blocked:", err);
      setIsPlaying(true);
    });
  };

  const stopSynthesizer = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // Clean audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Obsolete synthesis engines removed in favor of high-quality romantic MP3 streaming


  const handleOpenInvitation = () => {
    setIsOpen(true);
    setShowShootingStarAnimation(true);
    startSynthesizer();

    // Trigger visual nebula effect in the background
    setTimeout(() => {
      setShowShootingStarAnimation(false);
    }, 4000);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopSynthesizer();
    } else {
      startSynthesizer();
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    const text = `¡Hola Valentina y Gabriel! Confirmo mi asistencia para su boda bajo las estrellas el 7 de Julio de 2027.\n\n` +
      `*Nombre:* ${rsvpName}\n` +
      `*¿Asistirá?:* ${rsvpAttendance === 'si' ? 'Sí, confirmo con alegría 💫' : 'Lamentablemente no podré asistir'}\n` +
      `*Acompañantes:* ${rsvpGuests}\n` +
      `*Requerimientos especiales:* ${rsvpDiet || 'Ninguno'}\n\n` +
      `¡Los vemos bajo las constelaciones de Valle de Bravo! ✨🌌`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5217220000000?text=${encodedText}`, '_blank');
    
    setRsvpSent(true);
  };

  const STARRY_STORY_CHAPTERS: StarNode[] = [
    {
      id: 0,
      x: 15,
      y: 65,
      title: "La Alineación",
      date: "Noviembre, 2023",
      place: "Mirador Astronómico",
      desc: "Nuestros mundos colisionaron de forma milagrosa. Una noche estrellada, bajo la luz pura del telescopio, descubrimos que nuestros corazones latían al unísono, sintonizados en la misma longitud de onda cósmica."
    },
    {
      id: 1,
      x: 50,
      y: 20,
      title: "La Promesa",
      date: "Diciembre, 2025",
      place: "Nevado de Toluca",
      desc: "A más de cuatro mil metros de altura, con un manto celestial de infinitas estrellas como únicos testigos, Gabriel prometió amar a Valentina por toda la eternidad. Una sortija plateada reflejó la eternidad del firmamento."
    },
    {
      id: 2,
      x: 85,
      y: 70,
      title: "El Destino Escrito",
      date: "7 de Julio, 2027",
      place: "Valle de Bravo",
      desc: "Dos estrellas separadas por distancias infinitas que hoy se unen para orbitar juntas el resto de la eternidad. Una nueva alianza bendecida en un rincón mágico donde el cielo y la tierra se abrazan."
    }
  ];

  const GALLERY_IMAGES = [
    {
      id: 1,
      title: "Fusión Cósmica",
      src: "/src/assets/images/celestial_hero_1782250292221.jpg",
      desc: "Valentina y Gabriel contemplando la majestuosidad de la Vía Láctea en una noche mágica.",
      coord: "RA 18h 36m / DEC +38°"
    },
    {
      id: 2,
      title: "Cúpula Estelar",
      src: "/src/assets/images/celestial_observatory_1782250302880.jpg",
      desc: "El observatorio donde trazamos las primeras coordenadas de nuestro destino juntos.",
      coord: "RA 19h 50m / DEC +08°"
    },
    {
      id: 3,
      title: "Bosque de Faroles",
      src: "/src/assets/images/celestial_forest_1782250315828.jpg",
      desc: "Un claro mágico rodeado de pinos antiguos iluminados por candiles plateados.",
      coord: "RA 05h 35m / DEC -05°"
    },
    {
      id: 4,
      title: "Reflejo del Infinito",
      src: "/src/assets/images/celestial_lake_1782250329521.jpg",
      desc: "La serenidad del lago de Valle de Bravo duplicando el esplendor de las estrellas.",
      coord: "RA 06h 45m / DEC -16°"
    },
    {
      id: 5,
      title: "Valentina & Gabriel",
      src: "/src/assets/images/celestial_couple_1782250364007.jpg",
      desc: "Nuestro infinito amor inmortalizado bajo la inmensidad del firmamento nocturno.",
      coord: "RA 12h 45m / DEC -20°"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#030712] text-[#DADADA] overflow-x-hidden font-serif selection:bg-[#1D3557]/40 selection:text-[#FFFFFF]">
      {/* Stars Background Twinkle Effect */}
      <CelestialCanvas />

      {/* Floating Music Controller */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggleMusic}
            id="celestial-music-btn"
            className="fixed bottom-6 right-6 z-50 p-4 bg-[#0B1E3B]/80 text-[#FFFFFF] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-[#1D3557] hover:shadow-[0_0_30px_rgba(165,243,252,0.3)] transition-all group flex items-center justify-center border border-[#DADADA]/30 backdrop-blur-md"
            aria-label="Toggle wedding music arpeggio"
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-5 h-5 text-cyan-200 animate-pulse" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-32 group-hover:ml-2 transition-all duration-300 text-[10px] font-sans uppercase tracking-widest whitespace-nowrap text-cyan-100">Piano Cósmico</span>
              </>
            ) : (
              <>
                <VolumeX className="w-5 h-5 text-stone-400" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-32 group-hover:ml-2 transition-all duration-300 text-[10px] font-sans uppercase tracking-widest whitespace-nowrap text-stone-400">Escuchar Música</span>
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ========================================================
             SCENE 1: THE CELESTIAL ENVELOPE (SOBRE DE LUJO)
             ======================================================== */
          <motion.div
            key="celestial-envelope"
            exit={{ opacity: 0, scale: 0.95, y: -40 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden"
            style={{
              background: 'radial-gradient(circle at center, #0B1E3B 0%, #030712 100%)'
            }}
          >
            {/* Visual Constellation Lines Background for Envelope */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="#DADADA" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="40%" y1="50%" x2="80%" y2="30%" stroke="#DADADA" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="80%" y1="30%" x2="90%" y2="80%" stroke="#DADADA" strokeWidth="0.5" strokeDasharray="3 3" />
                <circle cx="10%" cy="20%" r="2" fill="#FFFFFF" />
                <circle cx="40%" cy="50%" r="3" fill="#FFFFFF" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="80%" cy="30%" r="2" fill="#FFFFFF" />
                <circle cx="90%" cy="80%" r="2.5" fill="#FFFFFF" />
              </svg>
            </div>

            <div className="text-center mb-8 max-w-md z-20">
              <span className="text-[#DADADA]/60 text-xs font-sans uppercase tracking-[0.4em] block mb-2">Invitación de Bodas de Alta Costura</span>
              <h2 className="text-[#FFFFFF] text-2xl md:text-3xl font-light tracking-widest font-serif italic">Valentina & Gabriel</h2>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DADADA]/40 to-transparent mx-auto mt-4" />
            </div>

            {/* High-End Celestial Invitation Holder / Envelope */}
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="relative w-full max-w-sm flex flex-col items-center justify-center z-20"
              id="celestial-envelope-box"
            >
              {/* Lunar Silver Glow Reflection Pedestal */}
              <div className="absolute -bottom-8 w-4/5 h-8 bg-cyan-950/40 rounded-full filter blur-xl" />

              {/* Stellar Premium Metallic Pocket */}
              <div className="relative w-80 h-[430px] p-6 flex flex-col items-center justify-between rounded-3xl bg-gradient-to-b from-[#0F2244] via-[#08152B] to-[#040B18] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_3px_rgba(255,255,255,0.15)] border-2 border-[#DADADA]/20 overflow-hidden group">
                
                {/* Galactic dust & glittering background overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(165,243,252,0.1)_0%,transparent_70%)] pointer-events-none" />
                
                {/* Silver filigree frame lining */}
                <div className="absolute inset-4 border border-[#DADADA]/15 pointer-events-none rounded-2xl" />
                <div className="absolute inset-6 border-2 border-double border-[#DADADA]/5 pointer-events-none rounded-2xl" />

                {/* Silver Ornate Star Corner Decorations */}
                <div className="absolute top-8 left-8 text-[#DADADA]/30 text-xs font-sans">✦</div>
                <div className="absolute top-8 right-8 text-[#DADADA]/30 text-xs font-sans">✦</div>
                <div className="absolute bottom-8 left-8 text-[#DADADA]/30 text-xs font-sans">✦</div>
                <div className="absolute bottom-8 right-8 text-[#DADADA]/30 text-xs font-sans">✦</div>

                <div className="text-center z-10 mt-8">
                  <span className="text-[#DADADA]/50 text-[9px] font-sans uppercase tracking-[0.3em]">Corte Celestial</span>
                  <p className="text-[#FFFFFF] text-sm italic tracking-widest mt-1 font-serif">A.D. MMXXVII</p>
                </div>

                {/* Cosmic Wax Seal / Lunar Button to open */}
                <div className="relative flex flex-col items-center justify-center z-20 my-auto">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.35)" }}
                    onClick={handleOpenInvitation}
                    className="relative cursor-pointer w-28 h-28 rounded-full bg-gradient-to-tr from-[#1D3557] via-[#0B1E3B] to-[#3A4F6D] flex items-center justify-center shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_2px_10px_rgba(255,255,255,0.3)] border-4 border-[#DADADA]/40 hover:brightness-110 active:scale-95 transition-all"
                    id="lunar-star-seal"
                  >
                    {/* Ring of constellations within seal */}
                    <div className="absolute inset-2 rounded-full border border-dashed border-[#DADADA]/20 animate-spin" style={{ animationDuration: '30s' }} />
                    <div className="absolute inset-4 rounded-full border border-double border-[#DADADA]/10" />
                    
                    {/* Glowing Stellar core */}
                    <div className="text-[#FFFFFF] text-center flex flex-col items-center">
                      <Sparkles className="w-6 h-6 text-cyan-200 animate-pulse mb-1" />
                      <span className="font-serif text-xs font-extralight tracking-[0.2em] uppercase">Abrir</span>
                      <span className="text-[7px] text-[#DADADA]/60 uppercase tracking-[0.1em] font-sans mt-0.5">Firmamento</span>
                    </div>

                    {/* Orbiting visual particle */}
                    <div className="absolute top-1/2 left-1 w-2 h-2 bg-[#FFFFFF] rounded-full filter blur-[1px] animate-ping" />
                  </motion.div>
                  
                  <span className="text-[#FFFFFF] text-[10px] font-sans uppercase tracking-[0.25em] font-light mt-6 animate-pulse text-center max-w-[200px] leading-relaxed">
                    Presiona el Sello Lunar para unirte al infinito
                  </span>
                </div>

                {/* Elegant central card motto */}
                <div className="text-center z-10 mb-8 max-w-[200px]">
                  <p className="text-[#DADADA] text-[11px] tracking-[0.2em] font-sans uppercase leading-relaxed italic">
                    "Una historia escrita entre las estrellas"
                  </p>
                  <p className="text-[#DADADA]/40 text-[9px] font-sans uppercase tracking-[0.15em] mt-2">Valle de Bravo</p>
                </div>

              </div>
            </motion.div>

            <p className="text-[#DADADA]/50 text-xs font-sans tracking-widest max-w-xs text-center mt-12 z-20">
              Despliega la bóveda celeste y sintoniza la sinfonía espacial orquestal.
            </p>
          </motion.div>
        ) : (
          /* ========================================================
             SCENE 2: UNVEILED CELESTIAL EXPERIENCE (MAIN EVENT)
             ======================================================== */
          <motion.div
            key="celestial-invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full min-h-screen relative flex flex-col items-center"
          >
            {/* Visual shooting star transition trigger on open */}
            <AnimatePresence>
              {showShootingStarAnimation && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="fixed inset-0 bg-white z-40 flex items-center justify-center pointer-events-none"
                >
                  <div className="text-[#0B1E3B] text-center">
                    <Sparkles className="w-16 h-16 text-[#0B1E3B] animate-spin mx-auto mb-4" />
                    <p className="font-serif tracking-widest text-lg italic animate-pulse">Alineando constelaciones...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ================= HERO AREA (LA BOVEDA CELESTE) ================= */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-between text-center px-4 py-16 overflow-hidden z-20 bg-[#030712] text-[#FFFFFF]">
              
              {/* Deep stellar space background */}
              <div className="absolute inset-0 bg-gradient-to-b from-black via-[#030712] to-[#0B1E3B] opacity-90 pointer-events-none" />
              
              {/* Generated high-end background of couple watching the Milky Way */}
              <div className="absolute inset-0 pointer-events-none opacity-60 select-none">
                <img 
                  src="/src/assets/images/celestial_hero_1782250292221.jpg" 
                  alt="Valentina & Gabriel Milky Way Background" 
                  className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.2] saturate-[0.8]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Elegant Constellation Arch Header */}
              <div className="relative w-full max-w-4xl border-2 border-[#DADADA]/20 bg-[#0B1E3B]/80 backdrop-blur-md p-8 md:p-12 rounded-t-[500px] border-b-0 mt-8 flex flex-col items-center shadow-3xl">
                {/* Silver Double Rings representing stellar alignments */}
                <div className="absolute inset-2 border border-[#DADADA]/5 rounded-t-[500px]" />
                <div className="absolute inset-4 border-2 border-double border-[#DADADA]/10 rounded-t-[500px]" />

                <div className="text-cyan-200 text-lg font-serif mt-4 animate-pulse">✦</div>

                <p className="text-cyan-100/70 text-[10px] md:text-xs font-sans uppercase tracking-[0.45em] font-light mt-6 max-w-md">
                  En el infinito compás del universo, dos almas se consagran.
                </p>

                {/* Display Names styled in clean luxury modern font */}
                <h1 className="text-[#FFFFFF] text-5xl md:text-8xl font-extralight tracking-widest mt-12 mb-6 font-serif">
                  Valentina <span className="text-xl md:text-3xl text-cyan-200 font-sans tracking-wide block md:inline md:mx-6 my-2 md:my-0">&</span> Gabriel
                </h1>

                <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent my-6" />

                {/* Celestial quote */}
                <p className="text-[#DADADA]/90 text-sm md:text-base tracking-[0.25em] italic max-w-xl px-4 leading-relaxed font-light">
                  "En un universo infinito nos encontramos."
                </p>
              </div>

              {/* REAL COUPLE PORTRAIT - Styled elegantly inside a lunar frame */}
              <div className="relative w-full max-w-md my-12 px-4 z-30">
                {/* Cosmic aura glow */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#1D3557] via-[#DADADA]/50 to-[#0B1E3B] opacity-65 blur-lg" />
                
                <div className="relative bg-[#030712] p-4 rounded-full border-2 border-[#DADADA]/40 shadow-[0_0_50px_rgba(165,243,252,0.2)]">
                  {/* Perfect Circular Portrait layout representing the Celestial alignment */}
                  <div className="relative overflow-hidden rounded-full aspect-square border-4 border-[#0B1E3B]">
                    {/* The beautiful image uploaded by the user */}
                    <img 
                      src="/wedding_portrait_1781994427687.jpg" 
                      alt="Valentina Cruz & Gabriel Torres Portrait"
                      className="w-full h-full object-cover scale-[1.08] hover:scale-110 transition-transform duration-1000 object-top"
                      referrerPolicy="no-referrer"
                    />
                    {/* Deep sapphire space gradient overlay to match hijab/celestial vibe */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/75 via-transparent to-[#0B1E3B]/20" />
                    
                    {/* Circular Border twinkle stars */}
                    <div className="absolute top-8 left-12 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    <div className="absolute bottom-12 right-16 w-2 h-2 bg-cyan-200 rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="text-center mt-6">
                  <span className="text-cyan-200 text-[10px] font-sans uppercase tracking-[0.3em] font-semibold">Portarretrato de Alianza</span>
                  <p className="text-[#DADADA]/50 text-[9px] font-sans uppercase tracking-widest mt-1">Valle de Bravo, México</p>
                </div>
              </div>

              {/* Bottom Arch detail for the Hero */}
              <div className="relative w-full max-w-4xl border-2 border-[#DADADA]/20 bg-[#0B1E3B]/90 backdrop-blur-md p-8 rounded-b-[40px] border-t-0 flex flex-col items-center mb-8 shadow-3xl">
                <div className="absolute inset-2 border border-[#DADADA]/5 rounded-b-[36px]" />
                <div className="absolute inset-4 border-2 border-double border-[#DADADA]/10 rounded-b-[32px]" />

                {/* Date & Location Stellar Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-10 py-6">
                  
                  {/* Grid 1: Celestial Alignment Date */}
                  <div className="flex flex-col items-center justify-center px-4">
                    <Calendar className="text-cyan-200 w-5 h-5 mb-2 animate-pulse" />
                    <span className="text-[#DADADA]/60 text-[9px] font-sans uppercase tracking-[0.25em]">Alineación Celeste</span>
                    <p className="text-[#FFFFFF] text-lg font-light tracking-widest mt-1">Miércoles, 7 de Julio</p>
                    <p className="text-stone-400 text-xs font-sans mt-0.5">Año Estelar 2027</p>
                  </div>

                  {/* Grid 2: Zenith Hour */}
                  <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-[#DADADA]/15 py-4 md:py-0 px-4">
                    <span className="text-[#DADADA]/60 text-[9px] font-sans uppercase tracking-[0.25em] mb-1">Hora Cenit</span>
                    <p className="text-cyan-100 text-3xl font-light tracking-wide font-serif">18:00 hrs</p>
                    <div className="w-12 h-[1px] bg-cyan-400/40 my-1.5" />
                    <p className="text-stone-400 text-xs font-sans">Observación: 19:30 hrs</p>
                  </div>

                  {/* Grid 3: Cosmic Coordinate */}
                  <div className="flex flex-col items-center justify-center px-4">
                    <MapPin className="text-cyan-200 w-5 h-5 mb-2 animate-pulse" />
                    <span className="text-[#DADADA]/60 text-[9px] font-sans uppercase tracking-[0.25em]">Coordenada</span>
                    <p className="text-[#FFFFFF] text-lg font-light tracking-widest mt-1">Valle de Bravo</p>
                    <p className="text-stone-400 text-xs font-sans mt-0.5">Guanajuato / EdoMex, Mx</p>
                  </div>

                </div>

                {/* Traditional astrological chart details decoration */}
                <div className="flex items-center justify-center space-x-12 mt-6 mb-2 border-t border-[#DADADA]/10 pt-6 w-full max-w-md">
                  <div className="text-center">
                    <span className="text-[9px] font-sans uppercase tracking-widest text-stone-400 block">Fase Lunar</span>
                    <p className="text-cyan-200 text-xs mt-1 font-serif">Luna Creciente 🌙</p>
                  </div>
                  <div className="text-center border-x border-[#DADADA]/15 px-8">
                    <span className="text-[9px] font-sans uppercase tracking-widest text-stone-400 block">Visibilidad Vía Láctea</span>
                    <p className="text-cyan-200 text-xs mt-1 font-serif">Excelente (98%) ✨</p>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] font-sans uppercase tracking-widest text-stone-400 block">Clima Estimado</span>
                    <p className="text-cyan-200 text-xs mt-1 font-serif">Despejado 🌌</p>
                  </div>
                </div>

              </div>

              {/* Scroll Indicator */}
              <div className="animate-pulse mt-4 flex flex-col items-center">
                <span className="text-cyan-200 text-[8px] font-sans uppercase tracking-[0.4em] block">Explorar Constelación</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-400 to-transparent mt-2" />
              </div>

            </section>

            {/* ================= COUNTDOWN TIMER (EL RECORRIDO DEL TIEMPO) ================= */}
            <section className="relative w-full bg-[#0B1E3B] py-16 px-4 z-20 shadow-inner flex flex-col items-center justify-center border-y border-[#DADADA]/10">
              <div className="absolute inset-0 bg-[#030712]/50 pointer-events-none" />
              <div className="max-w-4xl w-full text-center relative z-10">
                <span className="text-cyan-200 text-xs font-sans uppercase tracking-[0.35em] block mb-4">El Reloj Cósmico</span>
                <h3 className="text-[#FFFFFF] text-2xl md:text-3xl font-serif font-light tracking-wide italic">El universo conspira a cada momento...</h3>
                
                {/* Elegant Minimal Countdown Grid */}
                <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto mt-10">
                  {[
                    { label: 'Días', value: timeLeft.days, color: 'text-cyan-100' },
                    { label: 'Horas', value: timeLeft.hours, color: 'text-cyan-200' },
                    { label: 'Minutos', value: timeLeft.minutes, color: 'text-white' },
                    { label: 'Segundos', value: timeLeft.seconds, color: 'text-cyan-300' }
                  ].map((unit, index) => (
                    <div 
                      key={index} 
                      className="bg-[#030712]/80 border border-[#DADADA]/15 p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg backdrop-blur-md"
                      id={`stellar-countdown-${unit.label.toLowerCase()}`}
                    >
                      <span className={`text-2xl md:text-4xl font-extralight tracking-tight font-sans ${unit.color}`}>
                        {String(unit.value).padStart(2, '0')}
                      </span>
                      <span className="text-stone-400 text-[9px] font-sans uppercase tracking-[0.15em] mt-2 block">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ================= LOVE STORY (INTERACTIVE CONSTELLATION CHART) ================= */}
            <section className="relative w-full py-24 px-4 bg-[#030712] z-20 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(29,53,87,0.1)_0%,transparent_60%)] pointer-events-none" />
              
              <div className="max-w-5xl w-full relative z-10">
                
                <div className="text-center mb-16">
                  <span className="text-cyan-200 text-xs font-sans uppercase tracking-[0.4em] block mb-2">Destino de Dos Almas</span>
                  <h3 className="text-[#FFFFFF] text-4xl md:text-5xl font-light tracking-widest font-serif">Nuestra Historia de Amor</h3>
                  <div className="w-16 h-[1.5px] bg-cyan-300/60 mx-auto mt-4" />
                  <p className="text-stone-400 text-xs font-sans uppercase tracking-widest mt-4">Navega haciendo clic en las estrellas de la constelación</p>
                </div>

                {/* Custom Interactive SVG Constellation Chart Map */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#0B1E3B]/40 p-8 rounded-3xl border border-[#DADADA]/15 backdrop-blur-md max-w-4xl mx-auto shadow-2xl relative">
                  <div className="absolute inset-3 border border-[#DADADA]/5 pointer-events-none rounded-2xl" />

                  {/* Left Column: Interactive Star Map */}
                  <div className="lg:col-span-6 relative flex items-center justify-center aspect-square md:h-80 lg:h-96 w-full max-w-sm mx-auto">
                    {/* SVG Constellation Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                      {/* Connecting constellation lines */}
                      <line x1="15" y1="65" x2="50" y2="20" stroke="rgba(165, 243, 252, 0.4)" strokeWidth="0.75" strokeDasharray="3 3" />
                      <line x1="50" y1="20" x2="85" y2="70" stroke="rgba(165, 243, 252, 0.4)" strokeWidth="0.75" strokeDasharray="3 3" />
                      
                      {/* Radiating concentric background orbital rings */}
                      <circle cx="50" cy="50" r="30" stroke="rgba(255, 255, 255, 0.03)" fill="none" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="42" stroke="rgba(255, 255, 255, 0.02)" fill="none" strokeWidth="0.5" />
                    </svg>

                    {/* Nodes (Interactive Stars) */}
                    {STARRY_STORY_CHAPTERS.map((star) => (
                      <button
                        key={star.id}
                        onClick={() => setActiveStoryStar(star.id)}
                        id={`constellation-star-${star.id}`}
                        className="absolute p-4 focus:outline-none group transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{ left: `${star.x}%`, top: `${star.y}%` }}
                      >
                        {/* Orbiting star outline */}
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                          activeStoryStar === star.id
                          ? 'border-cyan-300 bg-cyan-950/80 scale-125 shadow-[0_0_15px_rgba(165,243,252,0.6)]'
                          : 'border-cyan-500/20 bg-stone-900/60 group-hover:border-cyan-300/50 group-hover:scale-110'
                        }`}>
                          {/* Inner glowing core */}
                          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                            activeStoryStar === star.id
                            ? 'bg-white scale-110 shadow-[0_0_8px_#FFF]'
                            : 'bg-cyan-300/40'
                          }`} />
                        </div>

                        {/* Hover date indicator */}
                        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 text-[8px] font-sans tracking-widest text-[#DADADA]/50 whitespace-nowrap uppercase">
                          {star.title.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Right Column: Narrative details with cosmic glow */}
                  <div className="lg:col-span-6 flex flex-col justify-center h-full relative p-4 border-t lg:border-t-0 lg:border-l border-[#DADADA]/10 pt-8 lg:pt-0 lg:pl-12">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStoryStar}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="text-left"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-cyan-200 text-[10px] font-sans uppercase tracking-[0.25em] font-medium px-2 py-0.5 rounded-full bg-[#1D3557]/40 border border-cyan-500/20">
                            {STARRY_STORY_CHAPTERS[activeStoryStar].date}
                          </span>
                        </div>

                        <h4 className="text-[#FFFFFF] text-2xl md:text-3xl font-light tracking-wider font-serif mt-4 mb-2">
                          {STARRY_STORY_CHAPTERS[activeStoryStar].title}
                        </h4>

                        <span className="text-cyan-100/50 text-[10px] font-sans uppercase tracking-widest block mb-4 italic">
                          🔭 {STARRY_STORY_CHAPTERS[activeStoryStar].place}
                        </span>

                        <p className="text-[#DADADA]/80 text-sm leading-relaxed font-serif text-justify font-light">
                          {STARRY_STORY_CHAPTERS[activeStoryStar].desc}
                        </p>

                        <div className="flex items-center space-x-2 mt-8 text-[9px] font-sans text-stone-500 uppercase tracking-widest">
                          <span>Alineación Estelar</span>
                          <span className="text-cyan-200">✦</span>
                          <span>Capítulo 0{activeStoryStar + 1}</span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>

              </div>
            </section>

            {/* ================= EDITORIAL CELESTIAL CIRCULAR MOSAIC (GALERÍA COSMOS) ================= */}
            <section className="relative w-full py-24 px-4 bg-[#0B1E3B] z-20 flex flex-col items-center overflow-hidden border-y border-[#DADADA]/10">
              <div className="absolute inset-0 bg-[#030712]/40 pointer-events-none" />
              
              <div className="max-w-6xl w-full relative z-10">
                
                <div className="text-center mb-16">
                  <span className="text-cyan-200 text-xs font-sans uppercase tracking-[0.4em] block mb-2">Cartografía Emocional</span>
                  <h3 className="text-[#FFFFFF] text-4xl md:text-5xl font-light tracking-widest font-serif">La Bóveda de Recuerdos</h3>
                  <div className="w-16 h-[1.5px] bg-cyan-300/60 mx-auto mt-4" />
                  <p className="text-[#DADADA]/70 text-xs font-sans uppercase tracking-widest mt-3">Mosaico orbital inspirado en los diagramas astronómicos</p>
                </div>

                {/* Circular / Cosmic Bento Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
                  
                  {/* Grid Item 1: Massive 9:16 vertical representation or full-height landscape */}
                  <div className="md:col-span-7 bg-[#030712]/80 rounded-3xl border border-[#DADADA]/15 overflow-hidden p-6 relative group flex flex-col justify-between aspect-video md:aspect-auto md:h-[420px]">
                    <div className="absolute inset-0 opacity-40 select-none">
                      <img 
                        src={GALLERY_IMAGES[0].src} 
                        alt={GALLERY_IMAGES[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                    <span className="relative z-10 text-[9px] font-mono text-cyan-200 uppercase tracking-widest px-2 py-1 bg-black/40 border border-[#DADADA]/10 rounded-md self-start">
                      {GALLERY_IMAGES[0].coord}
                    </span>

                    <div className="relative z-10 mt-auto">
                      <h4 className="text-[#FFFFFF] text-2xl font-serif font-light">{GALLERY_IMAGES[0].title}</h4>
                      <p className="text-[#DADADA]/70 text-xs font-serif italic mt-1 leading-relaxed max-w-md">{GALLERY_IMAGES[0].desc}</p>
                    </div>
                  </div>

                  {/* Grid Item 2: Portrait square */}
                  <div className="md:col-span-5 bg-[#030712]/80 rounded-3xl border border-[#DADADA]/15 overflow-hidden p-6 relative group flex flex-col justify-between h-80 md:h-[420px]">
                    <div className="absolute inset-0 opacity-40 select-none">
                      <img 
                        src={GALLERY_IMAGES[4].src} 
                        alt={GALLERY_IMAGES[4].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 object-top"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />

                    <span className="relative z-10 text-[9px] font-mono text-cyan-200 uppercase tracking-widest px-2 py-1 bg-black/40 border border-[#DADADA]/10 rounded-md self-start">
                      {GALLERY_IMAGES[4].coord}
                    </span>

                    <div className="relative z-10 mt-auto">
                      <h4 className="text-[#FFFFFF] text-2xl font-serif font-light">{GALLERY_IMAGES[4].title}</h4>
                      <p className="text-[#DADADA]/70 text-xs font-serif italic mt-1 leading-relaxed">{GALLERY_IMAGES[4].desc}</p>
                    </div>
                  </div>

                  {/* Grid Item 3: Square */}
                  <div className="md:col-span-4 bg-[#030712]/80 rounded-3xl border border-[#DADADA]/15 overflow-hidden p-6 relative group flex flex-col justify-between h-72">
                    <div className="absolute inset-0 opacity-45 select-none">
                      <img 
                        src={GALLERY_IMAGES[1].src} 
                        alt={GALLERY_IMAGES[1].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />

                    <span className="relative z-10 text-[9px] font-mono text-cyan-200 uppercase tracking-widest px-2 py-1 bg-black/40 border border-[#DADADA]/10 rounded-md self-start">
                      {GALLERY_IMAGES[1].coord}
                    </span>

                    <div className="relative z-10">
                      <h4 className="text-[#FFFFFF] text-lg font-serif font-light">{GALLERY_IMAGES[1].title}</h4>
                      <p className="text-[#DADADA]/60 text-[10px] font-serif italic mt-0.5 leading-relaxed">{GALLERY_IMAGES[1].desc}</p>
                    </div>
                  </div>

                  {/* Grid Item 4: Square */}
                  <div className="md:col-span-4 bg-[#030712]/80 rounded-3xl border border-[#DADADA]/15 overflow-hidden p-6 relative group flex flex-col justify-between h-72">
                    <div className="absolute inset-0 opacity-45 select-none">
                      <img 
                        src={GALLERY_IMAGES[2].src} 
                        alt={GALLERY_IMAGES[2].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />

                    <span className="relative z-10 text-[9px] font-mono text-cyan-200 uppercase tracking-widest px-2 py-1 bg-black/40 border border-[#DADADA]/10 rounded-md self-start">
                      {GALLERY_IMAGES[2].coord}
                    </span>

                    <div className="relative z-10">
                      <h4 className="text-[#FFFFFF] text-lg font-serif font-light">{GALLERY_IMAGES[2].title}</h4>
                      <p className="text-[#DADADA]/60 text-[10px] font-serif italic mt-0.5 leading-relaxed">{GALLERY_IMAGES[2].desc}</p>
                    </div>
                  </div>

                  {/* Grid Item 5: Square */}
                  <div className="md:col-span-4 bg-[#030712]/80 rounded-3xl border border-[#DADADA]/15 overflow-hidden p-6 relative group flex flex-col justify-between h-72">
                    <div className="absolute inset-0 opacity-45 select-none">
                      <img 
                        src={GALLERY_IMAGES[3].src} 
                        alt={GALLERY_IMAGES[3].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />

                    <span className="relative z-10 text-[9px] font-mono text-cyan-200 uppercase tracking-widest px-2 py-1 bg-black/40 border border-[#DADADA]/10 rounded-md self-start">
                      {GALLERY_IMAGES[3].coord}
                    </span>

                    <div className="relative z-10">
                      <h4 className="text-[#FFFFFF] text-lg font-serif font-light">{GALLERY_IMAGES[3].title}</h4>
                      <p className="text-[#DADADA]/60 text-[10px] font-serif italic mt-0.5 leading-relaxed">{GALLERY_IMAGES[3].desc}</p>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* ================= LOCATIONS & CEREMONY (DÓNDE Y CUÁNDO) ================= */}
            <section className="relative w-full py-24 px-4 bg-[#030712] z-20 flex flex-col items-center">
              
              <div className="max-w-4xl w-full">
                
                <div className="text-center mb-16">
                  <span className="text-cyan-200 text-xs font-sans uppercase tracking-[0.4em] block mb-2">Ubicaciones del Altar</span>
                  <h3 className="text-[#FFFFFF] text-4xl md:text-5xl font-light tracking-widest font-serif">Ubicaciones & Protocolos</h3>
                  <div className="w-16 h-[1.5px] bg-cyan-300/60 mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                  
                  {/* Card 1: Christian outdoor Ceremony */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="bg-[#0B1E3B]/60 border border-[#DADADA]/15 p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center text-center backdrop-blur-md"
                    id="stellar-ceremonia-card"
                  >
                    <div className="absolute inset-2 border border-cyan-400/5 rounded-2xl pointer-events-none" />
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-cyan-400" />

                    <div className="w-14 h-14 rounded-full bg-[#1D3557]/60 border border-cyan-400/30 flex items-center justify-center text-cyan-200 mb-6 shadow-lg">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>

                    <span className="text-cyan-200 text-[10px] font-sans uppercase tracking-[0.25em] font-semibold">
                      Ceremonia Cristiana
                    </span>

                    <h4 className="text-[#FFFFFF] text-2xl font-serif font-light tracking-wider mt-2 mb-4">
                      Enlace Al Aire Libre
                    </h4>

                    <p className="text-cyan-100 text-sm font-light font-serif">
                      Jardín de las Estrellas, Valle de Bravo
                    </p>
                    
                    <p className="text-stone-400 text-xs font-sans mt-1">
                      Km 12 Carretera Valle de Bravo, EdoMex.
                    </p>

                    <div className="w-12 h-[1px] bg-[#DADADA]/15 my-4" />

                    <div className="text-center">
                      <span className="text-cyan-100/60 text-[9px] font-sans uppercase tracking-widest block">Alineación del Altar</span>
                      <p className="text-white text-lg font-light font-sans mt-0.5">18:00 hrs</p>
                    </div>

                    <p className="text-stone-300 text-xs font-serif leading-relaxed italic mt-4 max-w-xs">
                      "Uniendo nuestras almas frente al Creador bajo un dosel de pinos antiguos y un cielo lleno de infinitas promesas."
                    </p>

                    <a
                      href="https://maps.google.com/?q=Valle+de+Bravo+Guanajuato+Estado+de+Mexico"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 px-6 py-3 bg-[#1D3557] text-[#FFFFFF] text-[10px] font-sans uppercase tracking-[0.25em] font-semibold rounded-xl hover:bg-[#2c4b78] hover:shadow-[0_0_15px_rgba(165,243,252,0.2)] transition-all flex items-center gap-2 border border-cyan-400/30 shadow-md"
                    >
                      <MapPin className="w-4 h-4 text-cyan-200 animate-bounce" /> Ver en Google Maps
                    </a>
                  </motion.div>

                  {/* Card 2: Stellar reception */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="bg-[#0B1E3B]/60 border border-[#DADADA]/15 p-8 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col items-center text-center backdrop-blur-md"
                    id="stellar-recepcion-card"
                  >
                    <div className="absolute inset-2 border border-cyan-400/5 rounded-2xl pointer-events-none" />
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-cyan-200" />

                    <div className="w-14 h-14 rounded-full bg-[#1D3557]/60 border border-cyan-400/30 flex items-center justify-center text-cyan-200 mb-6 shadow-lg">
                      <Music className="w-6 h-6 animate-pulse" />
                    </div>

                    <span className="text-cyan-200 text-[10px] font-sans uppercase tracking-[0.25em] font-semibold">
                      Banquete Imperial
                    </span>

                    <h4 className="text-[#FFFFFF] text-2xl font-serif font-light tracking-wider mt-2 mb-4">
                      Recepción de Gala
                    </h4>

                    <p className="text-cyan-100 text-sm font-light font-serif">
                      Bóveda Forestal, Terrazas del Lago
                    </p>
                    
                    <p className="text-stone-400 text-xs font-sans mt-1">
                      Valle de Bravo, Estado de México.
                    </p>

                    <div className="w-12 h-[1px] bg-[#DADADA]/15 my-4" />

                    <div className="text-center">
                      <span className="text-cyan-100/60 text-[9px] font-sans uppercase tracking-widest block">Apertura de Nebulosa</span>
                      <p className="text-white text-lg font-light font-sans mt-0.5">19:30 hrs</p>
                    </div>

                    <p className="text-stone-300 text-xs font-serif leading-relaxed italic mt-4 max-w-xs">
                      "Celebremos el reencuentro de nuestras almas en una noche llena de copas de cristal, jazz suave, y faroles flotantes."
                    </p>

                    <a
                      href="https://maps.google.com/?q=Terrazas+del+Lago+Valle+de+Bravo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 px-6 py-3 bg-[#1D3557] text-[#FFFFFF] text-[10px] font-sans uppercase tracking-[0.25em] font-semibold rounded-xl hover:bg-[#2c4b78] hover:shadow-[0_0_15px_rgba(165,243,252,0.2)] transition-all flex items-center gap-2 border border-cyan-400/30 shadow-md"
                    >
                      <MapPin className="w-4 h-4 text-cyan-200 animate-bounce" /> Ver en Google Maps
                    </a>
                  </motion.div>

                </div>

              </div>
            </section>

            {/* ================= DRESS CODE (DRESS CODE ESTELAR) ================= */}
            <section className="relative w-full py-20 px-4 bg-[#0B1E3B] z-20 flex flex-col items-center justify-center border-y border-[#DADADA]/10">
              <div className="absolute inset-0 bg-[#030712]/60 pointer-events-none" />
              <div className="max-w-3xl w-full text-center relative z-10">
                <span className="text-cyan-200 text-xs font-sans uppercase tracking-[0.35em] block mb-4">Código de Vestimenta</span>
                <h3 className="text-[#FFFFFF] text-3xl font-serif font-light tracking-wider italic mb-6">Formal Nocturno Elegante</h3>
                <p className="text-[#DADADA]/80 text-sm leading-relaxed max-w-lg mx-auto font-serif font-light italic">
                  "Sugerimos colores profundos inspirados en la noche: Azul medianoche, Negro estelar, Plata lunar o Esmeralda galáctica. Caballeros de riguroso traje oscuro o frac; Damas de vestido largo sofisticado con toques brillantes."
                </p>

                {/* Stars and moons representation */}
                <div className="flex items-center justify-center space-x-6 mt-10">
                  <div className="flex flex-col items-center text-center px-4">
                    <span className="text-[9px] font-mono text-cyan-200 uppercase tracking-widest">Damas</span>
                    <p className="text-white text-xs mt-1 font-serif">Vestido Largo de Gala 👗</p>
                  </div>
                  <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent" />
                  <div className="flex flex-col items-center text-center px-4">
                    <span className="text-[9px] font-mono text-cyan-200 uppercase tracking-widest">Caballeros</span>
                    <p className="text-white text-xs mt-1 font-serif">Traje Obscuro o Esmoquin 🤵</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ================= GIFT TABLE & BANK INFO (MESA DE REGALOS) ================= */}
            <section className="relative w-full py-24 px-4 bg-[#030712] z-20 flex flex-col items-center">
              <div className="max-w-4xl w-full text-center">
                
                <div className="text-center mb-16">
                  <span className="text-cyan-200 text-xs font-sans uppercase tracking-[0.4em] block mb-2">Símbolo de Aprecio</span>
                  <h3 className="text-[#FFFFFF] text-4xl md:text-5xl font-light tracking-widest font-serif">Mesa de Regalos</h3>
                  <div className="w-16 h-[1.5px] bg-cyan-300/60 mx-auto mt-4" />
                  <p className="text-stone-400 text-sm italic mt-4 max-w-md mx-auto">
                    Su presencia en esta mágica noche es nuestro mayor regalo. Sin embargo, si desea hacernos un presente, ponemos a su disposición las siguientes opciones:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  
                  {/* Digital Gift table option */}
                  <div className="bg-[#0B1E3B]/40 border border-[#DADADA]/15 p-8 rounded-3xl flex flex-col justify-between items-center text-center backdrop-blur-sm relative">
                    <div className="absolute inset-1.5 border border-[#DADADA]/5 pointer-events-none rounded-2xl" />
                    
                    <div className="w-12 h-12 rounded-full bg-[#1D3557]/60 border border-cyan-400/30 flex items-center justify-center text-cyan-200 mb-6">
                      <Gift className="w-5 h-5" />
                    </div>

                    <h4 className="text-white text-xl font-serif font-light mb-2">Mesa de Regalos Digital</h4>
                    <p className="text-stone-400 text-xs font-sans mb-6 leading-relaxed">
                      Liverpool o El Palacio de Hierro.<br />ID de Evento: <span className="font-semibold text-white">50493820</span>
                    </p>

                    <button
                      onClick={() => handleCopy('50493820')}
                      id="copy-gift-id-btn"
                      className="px-5 py-2.5 bg-[#1D3557] text-white text-[10px] font-sans uppercase tracking-widest rounded-lg border border-cyan-400/30 hover:bg-[#2c4b78] transition-colors flex items-center gap-2"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-300" /> Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-200" /> Copiar ID de Evento
                        </>
                      )}
                    </button>
                  </div>

                  {/* Direct Lunar wire transfer option */}
                  <div className="bg-[#0B1E3B]/40 border border-[#DADADA]/15 p-8 rounded-3xl flex flex-col justify-between items-center text-center backdrop-blur-sm relative">
                    <div className="absolute inset-1.5 border border-[#DADADA]/5 pointer-events-none rounded-2xl" />
                    
                    <div className="w-12 h-12 rounded-full bg-[#1D3557]/60 border border-cyan-400/30 flex items-center justify-center text-cyan-200 mb-6">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>

                    <h4 className="text-white text-xl font-serif font-light mb-2">Transferencia Directa</h4>
                    <p className="text-stone-400 text-xs font-sans mb-6 leading-relaxed">
                      Banco: <span className="text-white">Banca Estelar (STP)</span><br />
                      CLABE: <span className="font-semibold text-white">123 456 789 012 345 678</span>
                    </p>

                    <button
                      onClick={() => handleCopy('123456789012345678')}
                      id="copy-clabe-btn"
                      className="px-5 py-2.5 bg-[#1D3557] text-white text-[10px] font-sans uppercase tracking-widest rounded-lg border border-cyan-400/30 hover:bg-[#2c4b78] transition-colors flex items-center gap-2"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-300" /> Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-200" /> Copiar CLABE Bancaria
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>
            </section>

            {/* ================= RSVP FORM (CONFIRMACIÓN DE ASISTENCIA) ================= */}
            <section className="relative w-full py-24 px-4 bg-[#0B1E3B] z-20 flex flex-col items-center border-t border-[#DADADA]/10">
              <div className="absolute inset-0 bg-[#030712]/40 pointer-events-none" />
              
              <div className="max-w-2xl w-full relative z-10">
                
                <div className="text-center mb-16">
                  <span className="text-cyan-200 text-xs font-sans uppercase tracking-[0.4em] block mb-2">Confirmación</span>
                  <h3 className="text-[#FFFFFF] text-4xl md:text-5xl font-light tracking-widest font-serif">Confirmar Asistencia</h3>
                  <div className="w-16 h-[1.5px] bg-cyan-300/60 mx-auto mt-4" />
                  <p className="text-stone-300 text-xs font-sans uppercase tracking-widest mt-4">Sugerimos confirmar antes del 1 de Junio de 2027</p>
                </div>

                {/* RSVP Form with glow details */}
                <div className="bg-[#030712]/95 border-2 border-[#DADADA]/20 p-8 rounded-3xl shadow-2xl relative">
                  <div className="absolute inset-1.5 border border-[#DADADA]/5 pointer-events-none rounded-2xl" />
                  
                  {rsvpSent ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                      id="rsvp-success-msg"
                    >
                      <Sparkles className="w-12 h-12 text-cyan-200 animate-spin mx-auto mb-4" />
                      <h4 className="text-white text-2xl font-serif font-light mb-2">¡Asistencia Notificada!</h4>
                      <p className="text-[#DADADA]/70 text-sm font-serif max-w-sm mx-auto">
                        Hemos recibido tu confirmación en WhatsApp. ¡Será un honor tenerte bajo el brillo infinito de la Vía Láctea!
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleRSVPSubmit} className="space-y-6 relative z-10" id="rsvp-starry-form">
                      
                      {/* Name input */}
                      <div>
                        <label htmlFor="rsvp-name" className="block text-[#DADADA] text-[10px] font-sans uppercase tracking-[0.2em] font-medium mb-2">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          id="rsvp-name"
                          required
                          value={rsvpName}
                          onChange={(e) => setRsvpName(e.target.value)}
                          placeholder="Ej. Ing. Santiago Mendoza"
                          className="w-full bg-[#030712] border border-[#DADADA]/20 rounded-xl px-4 py-3 text-white text-sm font-serif focus:outline-none focus:border-cyan-300 transition-all placeholder-stone-600 focus:ring-1 focus:ring-cyan-300/20"
                        />
                      </div>

                      {/* Attendance Radios */}
                      <div>
                        <span className="block text-[#DADADA] text-[10px] font-sans uppercase tracking-[0.2em] font-medium mb-3">
                          ¿Asistirás a nuestra alineación?
                        </span>
                        <div className="grid grid-cols-2 gap-4">
                          <label className={`cursor-pointer border p-4 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                            rsvpAttendance === 'si'
                            ? 'border-cyan-300 bg-gradient-to-tr from-[#0B1E3B] to-[#1D3557]/40 shadow-lg text-white'
                            : 'border-[#DADADA]/10 bg-black/30 text-[#DADADA]/50 hover:border-cyan-500/25'
                          }`}>
                            <input
                              type="radio"
                              name="attendance"
                              value="si"
                              checked={rsvpAttendance === 'si'}
                              onChange={() => setRsvpAttendance('si')}
                              className="sr-only"
                            />
                            <span className="text-xs uppercase tracking-widest font-sans">Sí, confirmo 💫</span>
                          </label>

                          <label className={`cursor-pointer border p-4 rounded-xl flex items-center justify-center space-x-2 transition-all ${
                            rsvpAttendance === 'no'
                            ? 'border-red-500/50 bg-[#1A1010] text-red-100 shadow-lg'
                            : 'border-[#DADADA]/10 bg-black/30 text-[#DADADA]/50 hover:border-red-500/20'
                          }`}>
                            <input
                              type="radio"
                              name="attendance"
                              value="no"
                              checked={rsvpAttendance === 'no'}
                              onChange={() => setRsvpAttendance('no')}
                              className="sr-only"
                            />
                            <span className="text-xs uppercase tracking-widest font-sans">No puedo asistir</span>
                          </label>
                        </div>
                      </div>

                      {/* Number of Guests */}
                      {rsvpAttendance === 'si' && (
                        <div>
                          <label htmlFor="rsvp-guests" className="block text-[#DADADA] text-[10px] font-sans uppercase tracking-[0.2em] font-medium mb-2">
                            Número de Pases Confirmados
                          </label>
                          <select
                            id="rsvp-guests"
                            value={rsvpGuests}
                            onChange={(e) => setRsvpGuests(e.target.value)}
                            className="w-full bg-[#030712] border border-[#DADADA]/20 rounded-xl px-4 py-3 text-white text-sm font-sans focus:outline-none focus:border-cyan-300 transition-all focus:ring-1 focus:ring-cyan-300/20"
                          >
                            <option value="1">1 Persona (Titular)</option>
                            <option value="2">2 Personas (Pareja)</option>
                            <option value="3">3 Personas (Familia)</option>
                            <option value="4">4 Personas (Familia completa)</option>
                          </select>
                        </div>
                      )}

                      {/* Special Diet request */}
                      <div>
                        <label htmlFor="rsvp-diet" className="block text-[#DADADA] text-[10px] font-sans uppercase tracking-[0.2em] font-medium mb-2">
                          Observaciones o Requerimientos Dietéticos (Opcional)
                        </label>
                        <textarea
                          id="rsvp-diet"
                          value={rsvpDiet}
                          onChange={(e) => setRsvpDiet(e.target.value)}
                          placeholder="Ej. Alergia a nueces / Menú vegetariano..."
                          className="w-full bg-[#030712] border border-[#DADADA]/20 rounded-xl px-4 py-3 text-white text-sm font-serif focus:outline-none focus:border-cyan-300 transition-all placeholder-stone-600 focus:ring-1 focus:ring-cyan-300/20 h-20 resize-none"
                        />
                      </div>

                      {/* Submit btn */}
                      <button
                        type="submit"
                        id="submit-rsvp-btn"
                        className="w-full py-4 bg-gradient-to-r from-[#1D3557] to-[#0B1E3B] text-white text-xs font-sans uppercase tracking-[0.3em] font-semibold rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-xl border border-cyan-400/30 hover:shadow-[0_0_20px_rgba(165,243,252,0.3)] flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4 text-cyan-200 animate-pulse" /> Confirmar Asistencia por WhatsApp
                      </button>

                    </form>
                  )}
                </div>

              </div>
            </section>

            {/* ================= FOOTER / SIGN OFF ================= */}
            <footer className="relative w-full py-16 px-4 bg-[#030712] text-center z-20 border-t border-[#DADADA]/10">
              <div className="max-w-md mx-auto flex flex-col items-center">
                <span className="text-cyan-200 text-[10px] font-sans uppercase tracking-[0.4em] block mb-2">El Cielo es Nuestro Testigo</span>
                <h4 className="text-white text-2xl font-light italic font-serif">Valentina & Gabriel</h4>
                <div className="w-16 h-[0.5px] bg-[#DADADA]/20 my-4" />
                <p className="text-stone-500 text-[10px] font-sans uppercase tracking-widest">7 de Julio de 2027 • Valle de Bravo</p>
                <p className="text-stone-600 text-[9px] font-sans uppercase tracking-wider mt-4">
                  Diseño Exclusivo Celestial • Colección Starry Night
                </p>

                <div className="pt-8">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.pathname = '/'; }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-transparent hover:bg-[#0B1E3B]/40 border border-cyan-500/30 text-cyan-200 hover:text-white rounded-full font-sans text-[9px] uppercase tracking-[0.2em] transition-all shadow-md shadow-cyan-950/20"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Regresar a Catálogo</span>
                  </a>
                </div>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
