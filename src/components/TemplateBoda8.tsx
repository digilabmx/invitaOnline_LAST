import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Calendar, MapPin, Gift, Music, Play, Pause, 
  Copy, Check, Sparkles, Send, ExternalLink, 
  ChevronLeft, ChevronRight, Volume2, VolumeX, Info, Phone, ArrowLeft, X
} from 'lucide-react';

// Color Palette Constants
// Terracota: #C96A45
// Arena: #E8D9C5
// Dorado Antiguo: #C7A76C
// Marfil: #F8F4EE
// Charcoal: #2A2521

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

// Background glowing sparkles and candle embers canvas
const HaciendaCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      'rgba(201, 106, 69, 0.3)',  // Terracotta warm ember
      'rgba(199, 167, 108, 0.45)', // Antique Gold sparkle
      'rgba(248, 244, 230, 0.4)',  // Ivory float
      'rgba(255, 140, 50, 0.25)'   // Warm candlelight flicker
    ];

    const particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      angle: number;
      angleSpeed: number;
    }[] = [];

    const maxParticles = 40;
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 1.5,
        speedY: -(Math.random() * 0.8 + 0.3), // floating up
        speedX: (Math.random() * 0.4 - 0.2),
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        angleSpeed: Math.random() * 0.02 - 0.01
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft amber ambient radial gradient background overlay
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 10,
        width / 2, height / 2, Math.max(width, height)
      );
      gradient.addColorStop(0, 'rgba(248, 244, 238, 0.1)'); // Marfil center
      gradient.addColorStop(1, 'rgba(42, 37, 33, 0.05)'); // Dark terracotta shadow border
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.15;
        p.angle += p.angleSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 2;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.restore();
      });

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

export default function TemplateBoda8() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicCardOpen, setIsMusicCardOpen] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioInited, setAudioInited] = useState(false);
  const [candleLit, setCandleLit] = useState(false);
  const [activeTab, setActiveTab] = useState<'hacienda' | 'balcon' | 'caballos' | 'patios' | 'jardines' | 'novios'>('hacienda');
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttendance, setRsvpAttendance] = useState('si');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpDiet, setRsvpDiet] = useState('');
  const [rsvpSent, setRsvpSent] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [activeLoveChapter, setActiveLoveChapter] = useState(0);

  // Time remaining countdown logic
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2027-09-18T16:30:00');
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

  // Obsolete synthesis engines removed in favor of high-quality romantic MP3 streaming


  // Open the Scroll and light up candles
  const handleOpenInvitation = () => {
    setIsOpen(true);
    
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
    
    // Light up the hacienda candles after 1.2s
    setTimeout(() => {
      setCandleLit(true);
    }, 1200);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    // Send via WhatsApp or show success state
    const text = `¡Hola Sofía y Alejandro! Confirmo mi asistencia para su boda el 18 de Septiembre de 2027.\n\n` +
      `*Nombre:* ${rsvpName}\n` +
      `*¿Asistirá?:* ${rsvpAttendance === 'si' ? 'Sí, con gusto' : 'Lamentablemente no puedo'}\n` +
      `*Acompañantes:* ${rsvpGuests}\n` +
      `*Restricciones dietéticas:* ${rsvpDiet || 'Ninguna'}\n\n` +
      `¡Felicidades por su unión! ✨🤵‍♂️👰‍♀️`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5214150000000?text=${encodedText}`, '_blank');
    
    setRsvpSent(true);
  };

  const toggleMusic = () => {
    setIsMusicCardOpen(!isMusicCardOpen);
  };

  const GALLERY_IMAGES = [
    {
      id: 'hacienda',
      title: 'Hacienda Histórica',
      src: '/hacienda_hero_1782249686184.webp',
      description: 'Una joya del siglo XVIII, con majestuosos arcos de cantera, rodeada de historia y romance clásico.',
      credit: 'Vista del jardín principal'
    },
    {
      id: 'balcon',
      title: 'Balcones de Cantera',
      src: '/hacienda_balcony_1782249700340.webp',
      description: 'Detalles tallados a mano que conservan los ecos de banquetes virreinales y tertulias imperiales.',
      credit: 'Detalle arquitectónico colonial'
    },
    {
      id: 'caballos',
      title: 'Caballos Elegantes',
      src: '/hacienda_horses_1782249712620.webp',
      description: 'Tradición ecuestre y distinción, reflejo de la hidalguía y opulencia de nuestra historia.',
      credit: 'Tradición de la hacienda mexicana'
    },
    {
      id: 'patios',
      title: 'Patios Iluminados',
      src: '/hacienda_patio_1782249723122.webp',
      description: 'La velada cobrará vida bajo un cielo de candiles antiguos y cientos de velas parpadeantes.',
      credit: 'Atmósfera de recepción'
    },
    {
      id: 'jardines',
      title: 'Jardines Coloniales',
      src: '/hacienda_gardens_1782249733973.webp',
      description: 'Vegetación exuberante y fuentes de cantera que susurran secretos de amores eternos.',
      credit: 'Rincón romántico de San Miguel'
    },
    {
      id: 'novios',
      title: 'Sofía & Alejandro',
      src: '/sofia_alejandro_stairs_1782247280237.webp',
      description: 'Nuestro destino estaba escrito mucho antes de encontrarnos, y hoy celebramos este gran camino.',
      credit: 'Sesión de compromiso en la hacienda'
    }
  ];

  const LOVE_STORY_CHAPTERS = [
    {
      title: "El Encuentro",
      date: "Octubre, 2022",
      place: "San Miguel de Allende",
      desc: "Nuestros caminos se cruzaron bajo los atardeceres de terracota y cantera. En medio de un concierto de cuerdas, el destino alineó nuestras miradas para siempre."
    },
    {
      title: "La Propuesta",
      date: "Septiembre, 2026",
      place: "Patio de Faroles, Hacienda del Sol",
      desc: "Entre el parpadeo de cientos de velas y el cantar de una guitarra clásica, Alejandro se arrodilló para prometer una eternidad juntos. La respuesta fue un rotundo sí."
    },
    {
      title: "El Sí, Para Siempre",
      date: "Septiembre, 2027",
      place: "Hacienda San José del Siglo XVIII",
      desc: "Rodeados de la mística colonial mexicana, uniremos nuestras vidas ante Dios y ante aquellos que más amamos. Un pacto sagrado que durará por la eternidad."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#F8F4EE] text-[#2A2521] overflow-x-hidden font-serif selection:bg-[#C96A45]/20">
      {/* Floating Sparkles & Light effects */}
      <HaciendaCanvas />

      {/* Floating SoundCloud Player (appears only when open) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {isMusicCardOpen ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-[#FAF8F5]/95 backdrop-blur-md rounded-full border-2 border-[#C7A76C]/40 p-1.5 shadow-[0_4px_20px_rgba(42,37,33,0.2)] font-sans"
              >
                <button 
                  onClick={togglePlayPause}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-[#C96A45] to-[#C7A76C] text-white flex items-center justify-center transition-all active:scale-95 shadow-md flex-shrink-0"
                  title={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white ml-0.5" />}
                </button>
                <div className="pr-1 pl-1 min-w-0 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-[#2A2521] whitespace-nowrap leading-none block">A Thousand Years</span>
                  <span className="text-[8px] text-[#C96A45] whitespace-nowrap leading-none block mt-0.5">Música de Fondo</span>
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
                id="music-toggle-btn"
                className="fixed bottom-6 right-6 z-50 p-3 bg-[#C96A45] text-[#F8F4EE] rounded-full shadow-2xl hover:bg-[#b05835] transition-colors group flex items-center justify-center border border-[#C7A76C]"
                aria-label="Escuchar música"
              >
                <Music className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </motion.button>
            )}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ========================================================
             SCENE 1: LUXURIOUS ANCIENT SCROLL ON RUSTIC DESK
             ======================================================== */
          <motion.div
            key="envelope-scene"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(circle, #3D352E 0%, #1A1715 100%)'
            }}
          >
            {/* Background candles representing virtual glowing lighting */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="absolute bottom-10 left-12 w-2 h-6 bg-[#C7A76C] rounded-full filter blur-[2px] animate-pulse" />
              <div className="absolute bottom-16 left-12 w-8 h-8 bg-amber-500 rounded-full filter blur-xl opacity-60 animate-pulse" />
              
              <div className="absolute top-10 right-16 w-2.5 h-7 bg-[#C7A76C] rounded-full filter blur-[2px] animate-pulse" />
              <div className="absolute top-16 right-16 w-10 h-10 bg-amber-500 rounded-full filter blur-xl opacity-60 animate-pulse" />
            </div>

            <div className="text-center mb-8 max-w-md z-20">
              <span className="text-[#C7A76C] text-xs font-sans uppercase tracking-[0.3em] block mb-2">Invitación de Bodas de Lujo</span>
              <h2 className="text-[#E8D9C5] text-3xl font-light tracking-wide italic font-serif">Sofía & Alejandro</h2>
              <div className="w-16 h-[1px] bg-[#C7A76C]/40 mx-auto mt-3" />
            </div>

            {/* Ancient Scroll Box Wrapper */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative w-full max-w-sm flex flex-col items-center justify-center z-20"
              id="pergamino-wrapper"
            >
              {/* Wooden / Marble Pedestal shadow */}
              <div className="absolute -bottom-10 w-4/5 h-6 bg-black/45 rounded-full filter blur-md" />

              {/* The Ancient Rolled Scroll */}
              <div className="relative w-72 h-96 py-8 flex flex-col items-center justify-between rounded-lg bg-gradient-to-b from-[#EFDFCC] via-[#E2CEB5] to-[#D5BD9F] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-[#C7A76C]/30 overflow-hidden group">
                
                {/* Vintage aged-paper burn stains and textures */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0.1)_100%)] mix-blend-overlay pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-black/25 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/25 to-transparent" />
                
                {/* Scroll Wooden Dowel Ends (visual mockups) */}
                <div className="absolute -top-3 inset-x-4 h-6 bg-[#6B4B34] rounded-full shadow-inner border-y border-[#543A27] flex justify-between px-1">
                  <div className="w-4 h-4 rounded-full bg-[#C7A76C] my-auto shadow-md" />
                  <div className="w-4 h-4 rounded-full bg-[#C7A76C] my-auto shadow-md" />
                </div>
                <div className="absolute -bottom-3 inset-x-4 h-6 bg-[#6B4B34] rounded-full shadow-inner border-y border-[#543A27] flex justify-between px-1">
                  <div className="w-4 h-4 rounded-full bg-[#C7A76C] my-auto shadow-md" />
                  <div className="w-4 h-4 rounded-full bg-[#C7A76C] my-auto shadow-md" />
                </div>

                {/* Golden filigree borders */}
                <div className="absolute inset-y-6 inset-x-4 border border-[#C7A76C]/20 pointer-events-none rounded" />
                <div className="absolute inset-y-8 inset-x-6 border-2 border-double border-[#C7A76C]/40 pointer-events-none rounded" />

                {/* Scroll Content (Rolled form state) */}
                <div className="text-center z-10 px-6 mt-10">
                  <span className="text-[#6E543D] text-[10px] font-sans uppercase tracking-[0.25em]">Hacienda San José</span>
                  <div className="text-amber-900 text-sm italic tracking-widest my-1 font-serif">A.D. MMXXVII</div>
                </div>

                {/* Central Red Heraldic Wax Seal */}
                <div className="relative flex flex-col items-center justify-center z-20 my-auto">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    onClick={handleOpenInvitation}
                    className="relative cursor-pointer w-24 h-24 rounded-full bg-[#8F1D1D] flex items-center justify-center shadow-[0_10px_25px_rgba(143,29,29,0.5),inset_0_4px_10px_rgba(255,255,255,0.25)] border-4 border-[#7A1515] hover:brightness-110 active:scale-95 transition-all"
                    id="wax-seal"
                  >
                    {/* Wax seal realistic texture rings */}
                    <div className="absolute inset-1.5 rounded-full border border-dashed border-[#F8F4EE]/10" />
                    <div className="absolute inset-3 rounded-full border border-double border-[#701212]" />
                    <div className="text-[#F8F4EE] font-serif text-3xl font-extrabold tracking-tighter opacity-80 select-none">
                      S<span className="text-xl text-[#C7A76C]">&</span>A
                    </div>
                    {/* Embossed heraldic crest lines */}
                    <div className="absolute -bottom-1 w-14 h-3 bg-[#7A1515]/80 filter blur-xs rounded-full" />
                  </motion.div>
                  <span className="text-stone-800 text-[10px] font-sans uppercase tracking-[0.2em] font-medium mt-4 animate-pulse">Haz clic en el sello para abrir</span>
                </div>

                {/* Golden Ribbon tied around scroll */}
                <div className="absolute inset-y-1/2 left-0 right-0 h-8 bg-[#C7A76C] mix-blend-multiply opacity-80 shadow-md border-y border-[#BCA063] flex items-center justify-center">
                  <div className="w-full border-t border-[#F8F4EE]/35 h-0" />
                </div>
                
                {/* Silk Ribbon tails (visual mockups) */}
                <div className="absolute top-[48%] left-10 w-6 h-28 bg-[#C7A76C]/95 rotate-[15deg] shadow-lg rounded-b-sm border-r border-[#A3884D]" />
                <div className="absolute top-[48%] right-10 w-6 h-24 bg-[#C7A76C]/95 rotate-[-12deg] shadow-lg rounded-b-sm border-l border-[#A3884D]" />

                <div className="text-center z-10 mb-6">
                  <p className="text-[#6E543D] text-[10px] tracking-widest font-sans uppercase">San Miguel de Allende</p>
                  <p className="text-stone-700 text-xs mt-1 italic">Guanajuato, México</p>
                </div>
              </div>
            </motion.div>

            <p className="text-[#E8D9C5]/60 text-xs font-sans tracking-widest max-w-xs text-center mt-12 z-20">
              Abre el pliego heráldico para adentrarte en la majestuosa atmósfera del siglo XVIII.
            </p>
          </motion.div>
        ) : (
          /* ========================================================
             SCENE 2: UNROLLED WEDDING EXPERIENCE (THE MAIN CONTENT)
             ======================================================== */
          <motion.div
            key="unrolled-invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full min-h-screen relative flex flex-col items-center"
          >
            {/* Visual simulation of candles lighting up and bells tolling floating banners */}
            <AnimatePresence>
              {candleLit && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  className="fixed inset-0 bg-[#C96A45]/10 mix-blend-color-burn pointer-events-none z-20"
                />
              )}
            </AnimatePresence>

            {/* ================= HERO RECTANGLE (PORTADA PRESTIGIO) ================= */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-between text-center px-4 py-16 overflow-hidden z-20 bg-[#2A2521] text-[#F8F4EE]">
              
              {/* Deep wood and warm stone textured background overlay */}
              <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[radial-gradient(circle_at_center,rgba(42,37,33,0.3)_0%,rgba(0,0,0,0.9)_100%)] pointer-events-none" />
              
              {/* Background cover image of the Mexican Colonial Hacienda */}
              <div className="absolute inset-0 pointer-events-none opacity-50 select-none">
                <img 
                  src="/hacienda_hero_1782249686184.webp" 
                  alt="Hacienda colonial mexicana hero" 
                  className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.1]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Elegant Quarry Arch Framed Header */}
              <div className="relative w-full max-w-4xl border-2 border-[#C7A76C]/30 bg-[#2A2521]/80 backdrop-blur-xs p-8 rounded-t-[500px] border-b-0 mt-8 flex flex-col items-center shadow-2xl">
                {/* Double golden border rings replicating classic 18th century heraldic details */}
                <div className="absolute inset-2 border border-[#C7A76C]/10 rounded-t-[500px]" />
                <div className="absolute inset-4 border-2 border-double border-[#C7A76C]/20 rounded-t-[500px]" />

                {/* Traditional cross ornament */}
                <div className="text-[#C7A76C] text-xl font-serif mt-4">⚜</div>

                <p className="text-[#C7A76C] text-[11px] font-sans uppercase tracking-[0.4em] font-medium mt-6">
                  Nos complacemos en invitarle a la celebración de nuestra unión
                </p>

                {/* Majestic Display Names */}
                <h1 className="text-[#E8D9C5] text-5xl md:text-7xl font-light italic tracking-wide mt-10 mb-4 font-serif">
                  Sofía & Alejandro
                </h1>

                <div className="w-24 h-[1.5px] bg-[#C96A45] my-6" />

                {/* Legendary Quote */}
                <p className="text-[#F8F4EE]/90 text-sm md:text-base tracking-widest italic max-w-xl px-4 leading-relaxed">
                  "Nuestro destino estaba escrito mucho antes de encontrarnos."
                </p>
              </div>

              {/* Framed Couple Portrait - Using the attached user image! */}
              <div className="relative w-full max-w-md my-12 px-4 z-30">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#C96A45] via-[#C7A76C] to-[#E8D9C5] opacity-80 blur-xs" />
                <div className="relative bg-[#2A2521] p-3 rounded-2xl border-2 border-[#C7A76C] shadow-2xl">
                  {/* Arched image mask for that romantic 18th-century portrait aesthetic */}
                  <div className="relative overflow-hidden rounded-xl border border-[#C7A76C]/40 aspect-[3/4]">
                    <img 
                      src="/sofia_alejandro_stairs_1782247280237.webp" 
                      alt="Sofía Hernández & Alejandro Ramírez"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    {/* Caption on the portrait */}
                    <div className="absolute bottom-4 inset-x-4 text-center">
                      <p className="text-[#F8F4EE] text-xs font-sans uppercase tracking-[0.2em]">Sofía Hernández & Alejandro Ramírez</p>
                      <p className="text-[#C7A76C] text-[10px] italic mt-1">Guanajuato, México</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wedding Details Banner */}
              <div className="relative w-full max-w-4xl border-2 border-[#C7A76C]/30 bg-[#2A2521]/95 backdrop-blur-xs p-8 rounded-b-[40px] border-t-0 flex flex-col items-center mb-8 shadow-2xl">
                <div className="absolute inset-2 border border-[#C7A76C]/10 rounded-b-[36px]" />
                <div className="absolute inset-4 border-2 border-double border-[#C7A76C]/15 rounded-b-[32px]" />

                {/* Date & Location Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-10 py-4">
                  
                  {/* Column 1: Date */}
                  <div className="flex flex-col items-center justify-center px-4">
                    <Calendar className="text-[#C7A76C] w-6 h-6 mb-2" />
                    <span className="text-[#C7A76C] text-[10px] font-sans uppercase tracking-[0.25em]">Fecha Sagrada</span>
                    <p className="text-[#E8D9C5] text-lg font-medium mt-1">Sábado, 18 Septiembre</p>
                    <p className="text-[#F8F4EE]/70 text-xs font-sans mt-0.5">Año de Nuestro Señor 2027</p>
                  </div>

                  {/* Column 2: Hour */}
                  <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-[#C7A76C]/20 py-4 md:py-0 px-4">
                    <span className="text-[#C7A76C] text-[10px] font-sans uppercase tracking-[0.25em] mb-1">La Hora</span>
                    <p className="text-[#E8D9C5] text-3xl font-light font-serif">16:30 hrs</p>
                    <div className="w-10 h-[1px] bg-[#C96A45] my-1" />
                    <p className="text-[#F8F4EE]/70 text-xs font-sans">Recepción: 18:30 hrs</p>
                  </div>

                  {/* Column 3: Place */}
                  <div className="flex flex-col items-center justify-center px-4">
                    <MapPin className="text-[#C7A76C] w-6 h-6 mb-2" />
                    <span className="text-[#C7A76C] text-[10px] font-sans uppercase tracking-[0.25em]">La Villa</span>
                    <p className="text-[#E8D9C5] text-lg font-medium mt-1">San Miguel de Allende</p>
                    <p className="text-[#F8F4EE]/70 text-xs font-sans mt-0.5">Guanajuato, México</p>
                  </div>

                </div>

                {/* Animated Candlelight Mockup under the details */}
                <div className="flex items-center justify-center space-x-6 mt-8 mb-4">
                  {[1, 2, 3].map((candle) => (
                    <div key={candle} className="flex flex-col items-center">
                      {/* Burning Flame */}
                      <div className="w-2.5 h-4 bg-gradient-to-t from-red-500 via-amber-400 to-amber-100 rounded-full filter blur-xs animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                      {/* Wax Candle Body */}
                      <div className="w-4 h-12 bg-gradient-to-r from-[#E8D9C5] to-[#D5BD9F] rounded-t-sm shadow-md border-t border-[#F8F4EE]/50 flex items-center justify-center">
                        <div className="w-[1.5px] h-2 bg-stone-900 -mt-14" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scroll down indicator */}
              <div className="animate-bounce mt-4 flex flex-col items-center">
                <span className="text-[#C7A76C] text-[9px] font-sans uppercase tracking-[0.3em]">Continuar Leyendo</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-[#C7A76C] to-transparent mt-2" />
              </div>

            </section>

            {/* ================= COUNTDOWN (TIEMPO DE ESPERA) ================= */}
            <section className="relative w-full bg-[#E8D9C5] py-16 px-4 z-20 shadow-inner flex flex-col items-center justify-center border-y border-[#C7A76C]/40">
              <div className="absolute inset-0 bg-[#F8F4EE]/30 mix-blend-overlay pointer-events-none" />
              <div className="max-w-4xl w-full text-center relative z-10">
                <span className="text-[#C96A45] text-xs font-sans uppercase tracking-[0.3em] font-semibold block mb-4">La Espera por Nuestra Alianza</span>
                <h3 className="text-[#2A2521] text-3xl md:text-4xl font-serif font-light italic tracking-wide">Cada segundo nos acerca a la eternidad...</h3>
                
                {/* Countdown Grid */}
                <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto mt-10">
                  {[
                    { label: 'Días', value: timeLeft.days },
                    { label: 'Horas', value: timeLeft.hours },
                    { label: 'Minutos', value: timeLeft.minutes },
                    { label: 'Segundos', value: timeLeft.seconds }
                  ].map((unit, index) => (
                    <div 
                      key={index} 
                      className="bg-[#F8F4EE] border-2 border-[#C7A76C]/30 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg"
                      id={`countdown-${unit.label.toLowerCase()}`}
                    >
                      <span className="text-[#C96A45] text-2xl md:text-4xl font-light font-serif tracking-tight">
                        {String(unit.value).padStart(2, '0')}
                      </span>
                      <span className="text-stone-500 text-[10px] font-sans uppercase tracking-[0.15em] mt-2 block">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ================= LOVE STORY (HISTORIA DE AMOR EN CANTERA) ================= */}
            <section className="relative w-full py-24 px-4 bg-[#F8F4EE] z-20 flex flex-col items-center justify-center">
              
              <div className="max-w-4xl w-full">
                
                <div className="text-center mb-16">
                  <span className="text-[#C96A45] text-xs font-sans uppercase tracking-[0.35em] block mb-2">Crónicas de un Destino</span>
                  <h3 className="text-[#2A2521] text-4xl md:text-5xl font-light tracking-wide font-serif">Nuestra Historia de Amor</h3>
                  <div className="w-16 h-[1.5px] bg-[#C7A76C] mx-auto mt-4" />
                </div>

                {/* Quarry Stone Windows Layout for Chapters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                  
                  {LOVE_STORY_CHAPTERS.map((chapter, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      whileHover={{ y: -5 }}
                      onClick={() => setActiveLoveChapter(index)}
                      className={`relative cursor-pointer bg-[#F8F4EE] p-8 rounded-t-[180px] rounded-b-[20px] border-2 shadow-xl transition-all duration-300 flex flex-col items-center text-center ${
                        activeLoveChapter === index 
                        ? 'border-[#C96A45] shadow-[#C96A45]/10' 
                        : 'border-[#C7A76C]/30 hover:border-[#C7A76C]/80'
                      }`}
                      id={`love-story-chapter-${index}`}
                    >
                      {/* Arched Quarry Border Highlight */}
                      <div className="absolute inset-1.5 border border-[#C7A76C]/10 rounded-t-[172px] rounded-b-[16px] pointer-events-none" />
                      <div className="absolute inset-3 border border-dashed border-[#C7A76C]/25 rounded-t-[164px] rounded-b-[12px] pointer-events-none" />

                      {/* Icon with Golden Circle */}
                      <div className="w-14 h-14 rounded-full bg-[#E8D9C5] border border-[#C7A76C] flex items-center justify-center text-[#C96A45] mb-6 shadow-md relative">
                        <Heart className="w-6 h-6 fill-[#C96A45]/10" />
                        <span className="absolute -bottom-1 -right-1 bg-[#C96A45] text-[#F8F4EE] text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-sans">
                          {index + 1}
                        </span>
                      </div>

                      <span className="text-[#C96A45] text-[10px] font-sans uppercase tracking-[0.25em] font-medium block">
                        {chapter.date}
                      </span>

                      <h4 className="text-[#2A2521] text-xl font-medium font-serif mt-2 mb-3">
                        {chapter.title}
                      </h4>

                      <span className="text-stone-500 text-[11px] font-sans uppercase tracking-widest block mb-4 italic">
                        {chapter.place}
                      </span>

                      <p className="text-stone-700 text-xs leading-relaxed font-serif text-justify font-normal border-t border-[#C7A76C]/20 pt-4">
                        {chapter.desc}
                      </p>

                      {/* Traditional Tile Motif decoration */}
                      <div className="text-[#C7A76C]/40 text-xs mt-6 select-none">✦ ✦ ✦</div>
                    </motion.div>
                  ))}

                </div>

              </div>

            </section>

            {/* ================= EDITORIAL MAGAZINE GALLERY (GALERÍA DE LA HACIENDA) ================= */}
            <section className="relative w-full bg-[#2A2521] py-24 px-4 z-20 overflow-hidden flex flex-col items-center">
              <div className="absolute inset-0 bg-[#C96A45]/5 mix-blend-color-burn pointer-events-none" />

              <div className="max-w-6xl w-full relative z-10">
                
                <div className="text-center mb-16">
                  <span className="text-[#C7A76C] text-xs font-sans uppercase tracking-[0.4em] block mb-2">Esplendor del Siglo XVIII</span>
                  <h3 className="text-[#F8F4EE] text-4xl md:text-5xl font-light tracking-wide font-serif">La Estampa de Nuestra Unión</h3>
                  <div className="w-16 h-[1.5px] bg-[#C96A45] mx-auto mt-4" />
                  <p className="text-[#E8D9C5]/80 text-sm italic mt-4 max-w-md mx-auto">
                    Recinto colonial e instantes inmortalizados que enmarcan el inicio de nuestro eterno romance.
                  </p>
                </div>

                {/* Tab selectors inspired by Antique Mexican Talavera Tiles */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {GALLERY_IMAGES.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveTab(img.id as any)}
                      id={`gallery-tab-${img.id}`}
                      className={`px-5 py-2.5 rounded-lg text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 border ${
                        activeTab === img.id
                        ? 'bg-[#C96A45] text-[#F8F4EE] border-[#C7A76C] shadow-lg shadow-[#C96A45]/20'
                        : 'bg-[#F8F4EE]/10 text-[#E8D9C5] border-[#C7A76C]/25 hover:bg-[#F8F4EE]/20'
                      }`}
                    >
                      {img.title}
                    </button>
                  ))}
                </div>

                {/* Editorial Horizontal Magazine Layout with details */}
                <div className="bg-[#F8F4EE] text-[#2A2521] rounded-3xl border border-[#C7A76C]/40 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-5xl mx-auto">
                  
                  {/* Left: Magazine Picture Framed inside colonial arch layout */}
                  <div className="lg:col-span-7 relative p-6 md:p-8 flex items-center justify-center bg-[#E8D9C5]/30">
                    <div className="absolute inset-4 border border-[#C7A76C]/10 pointer-events-none" />
                    
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#C7A76C] shadow-xl group">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeTab}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.6 }}
                          src={GALLERY_IMAGES.find(gi => gi.id === activeTab)?.src}
                          alt={GALLERY_IMAGES.find(gi => gi.id === activeTab)?.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Right: Editorial Description Text */}
                  <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between relative bg-gradient-to-br from-[#F8F4EE] to-[#E8D9C5]/20">
                    <div className="absolute inset-4 border border-[#C7A76C]/15 pointer-events-none rounded-xl" />
                    
                    {/* Header index decoration */}
                    <div className="flex justify-between items-center relative z-10 border-b border-[#C7A76C]/30 pb-4">
                      <span className="text-[#C96A45] font-sans text-xs tracking-widest uppercase">Colección Colonial</span>
                      <span className="font-mono text-xs text-stone-500">
                        0{GALLERY_IMAGES.findIndex(gi => gi.id === activeTab) + 1} / 0{GALLERY_IMAGES.length}
                      </span>
                    </div>

                    <div className="my-8 relative z-10">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.4 }}
                        >
                          <h4 className="text-3xl font-light tracking-wide text-[#2A2521] font-serif mb-4">
                            {GALLERY_IMAGES.find(gi => gi.id === activeTab)?.title}
                          </h4>
                          <p className="text-stone-700 text-sm leading-relaxed font-serif italic text-justify">
                            "{GALLERY_IMAGES.find(gi => gi.id === activeTab)?.description}"
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Footer decoration */}
                    <div className="relative z-10 border-t border-[#C7A76C]/20 pt-4 flex justify-between text-[11px] font-sans text-stone-500 uppercase tracking-wider">
                      <span>{GALLERY_IMAGES.find(gi => gi.id === activeTab)?.credit}</span>
                      <span className="text-[#C96A45]">Exclusivo Boda 1782</span>
                    </div>

                  </div>

                </div>

              </div>
            </section>

            {/* ================= ITINERARY & CEREMONY (NUESTRO DÍA) ================= */}
            <section className="relative w-full py-24 px-4 bg-[#F8F4EE] z-20 flex flex-col items-center">
              
              <div className="max-w-4xl w-full">
                
                <div className="text-center mb-16">
                  <span className="text-[#C96A45] text-xs font-sans uppercase tracking-[0.35em] block mb-2">Momentos Sagrados</span>
                  <h3 className="text-[#2A2521] text-4xl md:text-5xl font-light tracking-wide font-serif">Lugares & Horarios</h3>
                  <div className="w-16 h-[1.5px] bg-[#C7A76C] mx-auto mt-4" />
                </div>

                {/* Two Column details: Ceremony vs Reception */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  
                  {/* Left Column: Ceremony */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="bg-[#F8F4EE] border-2 border-[#C7A76C]/40 p-8 rounded-2xl shadow-xl relative overflow-hidden flex flex-col items-center text-center"
                    id="ceremonia-card"
                  >
                    <div className="absolute inset-1.5 border border-[#C7A76C]/10 rounded-xl" />
                    <div className="absolute inset-3 border border-dashed border-[#C7A76C]/20 rounded-lg" />
                    <div className="absolute top-0 inset-x-0 h-2 bg-[#C96A45]" />

                    {/* Architectural Icon design */}
                    <div className="w-16 h-16 rounded-full bg-[#E8D9C5] border-2 border-[#C7A76C] flex items-center justify-center text-[#C96A45] mb-6 shadow-md">
                      <Sparkles className="w-6 h-6" />
                    </div>

                    <span className="text-[#C96A45] text-[11px] font-sans uppercase tracking-[0.25em] font-medium block">
                      Enlace Sagrado
                    </span>

                    <h4 className="text-[#2A2521] text-2xl font-serif font-light tracking-wide mt-2 mb-4">
                      Ceremonia Religiosa
                    </h4>

                    <p className="text-stone-800 text-sm font-medium font-serif">
                      Santuario Diocesano de San Miguel Arcángel
                    </p>
                    
                    <p className="text-stone-500 text-xs font-sans mt-1">
                      Centro Histórico, San Miguel de Allende, Gto.
                    </p>

                    <div className="w-12 h-[1px] bg-[#C7A76C] my-4" />

                    <div className="text-center">
                      <span className="text-[#C96A45] text-[10px] font-sans uppercase tracking-widest block">La Recepción de Almas</span>
                      <p className="text-[#2A2521] text-lg font-serif mt-1">16:30 hrs</p>
                    </div>

                    <p className="text-stone-600 text-xs font-serif leading-relaxed italic mt-4 max-w-xs">
                      "Uniendo nuestras almas y corazones bajo la bendición del Creador en el templo más insigne de la villa."
                    </p>

                    <a
                      href="https://maps.google.com/?q=Parroquia+de+San+Miguel+Arcangel+San+Miguel+de+Allende"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 px-6 py-3 bg-[#C96A45] text-[#F8F4EE] text-xs font-sans uppercase tracking-[0.2em] font-medium rounded-lg hover:bg-[#b05835] transition-colors shadow-md flex items-center gap-2 border border-[#C7A76C]"
                    >
                      <MapPin className="w-4 h-4" /> Ver Ubicación en Google Maps
                    </a>
                  </motion.div>

                  {/* Right Column: Reception */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="bg-[#F8F4EE] border-2 border-[#C7A76C]/40 p-8 rounded-2xl shadow-xl relative overflow-hidden flex flex-col items-center text-center"
                    id="recepcion-card"
                  >
                    <div className="absolute inset-1.5 border border-[#C7A76C]/10 rounded-xl" />
                    <div className="absolute inset-3 border border-dashed border-[#C7A76C]/20 rounded-lg" />
                    <div className="absolute top-0 inset-x-0 h-2 bg-[#C7A76C]" />

                    {/* Architectural Icon design */}
                    <div className="w-16 h-16 rounded-full bg-[#E8D9C5] border-2 border-[#C7A76C] flex items-center justify-center text-[#C7A76C] mb-6 shadow-md">
                      <Heart className="w-6 h-6 fill-[#C7A76C]/10" />
                    </div>

                    <span className="text-[#C7A76C] text-[11px] font-sans uppercase tracking-[0.25em] font-medium block">
                      El Gran Banquete
                    </span>

                    <h4 className="text-[#2A2521] text-2xl font-serif font-light tracking-wide mt-2 mb-4">
                      Recepción & Fiesta
                    </h4>

                    <p className="text-stone-800 text-sm font-medium font-serif">
                      Hacienda San José del Siglo XVIII
                    </p>
                    
                    <p className="text-stone-500 text-xs font-sans mt-1">
                      Camino Real a Querétaro Km 4.5, San Miguel de Allende, Gto.
                    </p>

                    <div className="w-12 h-[1px] bg-[#C7A76C] my-4" />

                    <div className="text-center">
                      <span className="text-[#C96A45] text-[10px] font-sans uppercase tracking-widest block">La Velada de Gala</span>
                      <p className="text-[#2A2521] text-lg font-serif mt-1">18:30 hrs</p>
                    </div>

                    <p className="text-stone-600 text-xs font-serif leading-relaxed italic mt-4 max-w-xs">
                      "Brindaremos por el amor y la historia bajo candiles de hierro, en medio de jardines centenarios y melodías eternas."
                    </p>

                    <a
                      href="https://maps.google.com/?q=Hacienda+San+Jose+del+Siglo+XVIII+San+Miguel+de+Allende"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 px-6 py-3 bg-[#2A2521] text-[#F8F4EE] text-xs font-sans uppercase tracking-[0.2em] font-medium rounded-lg hover:bg-stone-900 transition-colors shadow-md flex items-center gap-2 border border-[#C7A76C]/45"
                    >
                      <MapPin className="w-4 h-4" /> Ver Ubicación en Google Maps
                    </a>
                  </motion.div>

                </div>

              </div>

            </section>

            {/* ================= DRESS CODE (CÓDIGO DE VESTIMENTA) ================= */}
            <section className="relative w-full py-24 bg-[#E8D9C5] text-[#2A2521] z-20 overflow-hidden flex flex-col items-center border-y border-[#C7A76C]/30">
              <div className="absolute inset-0 bg-[#F8F4EE]/25 mix-blend-overlay pointer-events-none" />

              <div className="max-w-4xl w-full text-center relative z-10 px-4">
                <span className="text-[#C96A45] text-xs font-sans uppercase tracking-[0.35em] block mb-2">Etiqueta de Distinción</span>
                <h3 className="text-3xl md:text-5xl font-light font-serif tracking-wide">Código de Vestimenta</h3>
                <div className="w-16 h-[1.5px] bg-[#C96A45] mx-auto mt-4 mb-8" />
                
                <p className="text-[#2A2521] text-lg font-serif italic mb-10">
                  "Formal Mexicano Elegante"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  
                  {/* Dress code: Ladies */}
                  <div className="bg-[#F8F4EE] border border-[#C7A76C]/40 p-8 rounded-2xl shadow-xl flex flex-col items-center">
                    <span className="text-[#C96A45] text-[10px] font-sans uppercase tracking-widest font-semibold">Damas</span>
                    <h5 className="text-[#2A2521] text-xl font-serif font-medium mt-1 mb-4">Vestido Largo de Gala</h5>
                    <p className="text-stone-700 text-xs leading-relaxed font-serif text-justify">
                      Sugerimos vestidos largos fluidos en tonos cálidos inspirados en la hacienda (Terracota, Bugambilia, Arena, Dorado, Oliva o Marfil). Evitar el color blanco y el negro riguroso para mantener la calidez campestre mexicana.
                    </p>
                  </div>

                  {/* Dress code: Gentlemen */}
                  <div className="bg-[#F8F4EE] border border-[#C7A76C]/40 p-8 rounded-2xl shadow-xl flex flex-col items-center">
                    <span className="text-[#C96A45] text-[10px] font-sans uppercase tracking-widest font-semibold">Caballeros</span>
                    <h5 className="text-[#2A2521] text-xl font-serif font-medium mt-1 mb-4">Guayabera o Traje Formal</h5>
                    <p className="text-stone-700 text-xs leading-relaxed font-serif text-justify">
                      Sugerimos guayabera presidencial de lino de manga larga con mancuernillas en tonos claros, acompañada de pantalón de vestir formal y zapatos de cuero. Opcional: Traje formal de sastre en tonos cálidos (sin corbata).
                    </p>
                  </div>

                </div>

                {/* Color suggestion circles mimicking our palette */}
                <div className="mt-12">
                  <span className="text-stone-500 text-[10px] font-sans uppercase tracking-widest block mb-4">Paleta de Inspiración para Invitados</span>
                  <div className="flex justify-center items-center gap-4">
                    {[
                      { hex: '#C96A45', name: 'Terracota' },
                      { hex: '#E8D9C5', name: 'Arena' },
                      { hex: '#C7A76C', name: 'Dorado' },
                      { hex: '#F8F4EE', name: 'Marfil' },
                      { hex: '#586A54', name: 'Oliva' }
                    ].map((col, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-10 h-10 rounded-full border-2 border-white shadow-md transform hover:scale-110 transition-transform"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span className="text-[9px] font-sans text-stone-600 mt-2 tracking-wider">{col.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* ================= RECONOCIMIENTO / DETALLES DE REGALO ================= */}
            <section className="relative w-full py-24 bg-[#F8F4EE] z-20 flex flex-col items-center">
              
              <div className="max-w-4xl w-full px-4">
                
                <div className="text-center mb-16">
                  <span className="text-[#C96A45] text-xs font-sans uppercase tracking-[0.35em] block mb-2">Mesa de Regalos</span>
                  <h3 className="text-[#2A2521] text-4xl md:text-5xl font-light tracking-wide font-serif">Mesa de Ofrendas</h3>
                  <div className="w-16 h-[1.5px] bg-[#C7A76C] mx-auto mt-4" />
                </div>

                <div className="bg-[#F8F4EE] border-2 border-[#C7A76C]/40 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden max-w-2xl mx-auto flex flex-col items-center text-center">
                  <div className="absolute inset-1.5 border border-[#C7A76C]/10 rounded-[22px] pointer-events-none" />
                  <div className="absolute inset-3 border border-dashed border-[#C7A76C]/20 rounded-[18px] pointer-events-none" />
                  
                  <Gift className="text-[#C96A45] w-10 h-10 mb-6" />

                  <p className="text-stone-800 text-sm leading-relaxed font-serif max-w-md italic mb-8">
                    "Su presencia en nuestro enlace es el regalo más valioso. No obstante, si desea otorgarnos una ofrenda para el inicio de nuestro hogar, agradecemos su generosidad mediante nuestra cuenta de ofrendas."
                  </p>

                  <div className="w-full bg-[#E8D9C5]/30 rounded-xl p-6 border border-[#C7A76C]/30 relative">
                    <span className="text-[#C96A45] text-[10px] font-sans uppercase tracking-widest font-semibold block mb-3">Datos Bancarios de la Alianza</span>
                    
                    <div className="grid grid-cols-1 gap-4 text-left max-w-sm mx-auto font-serif text-sm">
                      <div className="flex justify-between border-b border-[#C7A76C]/20 pb-2">
                        <span className="text-stone-500">Banco:</span>
                        <span className="text-stone-800 font-medium">Banco del Bajío Premium</span>
                      </div>
                      <div className="flex justify-between border-b border-[#C7A76C]/20 pb-2">
                        <span className="text-stone-500">Beneficiarios:</span>
                        <span className="text-stone-800 font-medium">S. Hernández / A. Ramírez</span>
                      </div>
                      <div className="flex justify-between border-b border-[#C7A76C]/20 pb-2">
                        <span className="text-stone-500">CLABE:</span>
                        <span className="text-stone-800 font-medium font-mono text-xs">0301 8090 0012 3456 78</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy('0301 8090 0012 3456 78')}
                      id="copy-bank-clabe-btn"
                      className="mt-6 px-5 py-2.5 bg-[#2A2521] text-[#F8F4EE] text-xs font-sans uppercase tracking-widest rounded-lg hover:bg-stone-900 transition-colors flex items-center gap-2 mx-auto shadow-md"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" /> ¡Copiado Exitosamente!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copiar CLABE Interbancaria
                        </>
                      )}
                    </button>
                  </div>

                  {/* Lluvia de Sobres traditonal note */}
                  <div className="mt-8 border-t border-[#C7A76C]/25 pt-6 w-full max-w-md">
                    <span className="text-stone-500 text-[10px] font-sans uppercase tracking-widest block mb-1">Lluvia de Sobres</span>
                    <p className="text-stone-600 text-xs font-serif italic">
                      Dispondremos de una urna de madera tallada en la recepción para recibir sus buenos deseos y ofrendas en sobre cerrado.
                    </p>
                  </div>

                </div>

              </div>

            </section>

            {/* ================= HOSTING / HOTELS INFO ================= */}
            <section className="relative w-full py-24 bg-[#2A2521] text-[#F8F4EE] z-20 flex flex-col items-center">
              <div className="max-w-4xl w-full px-4">
                
                <div className="text-center mb-16">
                  <span className="text-[#C7A76C] text-xs font-sans uppercase tracking-[0.35em] block mb-2">Hospedaje & Estancia</span>
                  <h3 className="text-4xl md:text-5xl font-light font-serif tracking-wide">Villas Recomendadas</h3>
                  <div className="w-16 h-[1.5px] bg-[#C96A45] mx-auto mt-4" />
                  <p className="text-[#E8D9C5]/80 text-sm italic mt-4 max-w-md mx-auto">
                    Para su comodidad, sugerimos estas hermosas estancias coloniales en el corazón de San Miguel de Allende.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  
                  {/* Hotel 1 */}
                  <div className="bg-[#2A2521] border border-[#C7A76C]/35 rounded-2xl p-6 relative flex flex-col justify-between shadow-xl">
                    <div className="absolute top-4 right-4 bg-[#C96A45]/20 text-[#C7A76C] text-[10px] font-sans uppercase px-2 py-1 rounded border border-[#C7A76C]/30">
                      Tarifa Especial
                    </div>
                    <div>
                      <h5 className="text-[#E8D9C5] text-xl font-serif font-light mb-1">Hotel Real de Minas Colonial</h5>
                      <p className="text-stone-400 text-xs font-sans mb-4">Camino Real a Querétaro 1, San Miguel de Allende</p>
                      <p className="text-stone-300 text-xs leading-relaxed font-serif mb-6">
                        Ubicado a tan solo 5 minutos de la Hacienda San José. Un hermoso recinto de estilo colonial con amplios jardines y alberca templada. Mencionar "Boda Sofía y Alejandro" para tarifa especial de bodas.
                      </p>
                    </div>
                    <a
                      href="https://www.realdeminas.com.mx/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-2.5 bg-transparent border border-[#C7A76C]/50 text-[#C7A76C] hover:bg-[#C7A76C] hover:text-[#2A2521] text-xs font-sans uppercase tracking-widest rounded-lg transition-all"
                    >
                      Reservar Estancia
                    </a>
                  </div>

                  {/* Hotel 2 */}
                  <div className="bg-[#2A2521] border border-[#C7A76C]/35 rounded-2xl p-6 relative flex flex-col justify-between shadow-xl">
                    <div className="absolute top-4 right-4 bg-[#C96A45]/20 text-[#C7A76C] text-[10px] font-sans uppercase px-2 py-1 rounded border border-[#C7A76C]/30">
                      Boutique
                    </div>
                    <div>
                      <h5 className="text-[#E8D9C5] text-xl font-serif font-light mb-1">Hacienda El Santuario Boutique</h5>
                      <p className="text-stone-400 text-xs font-sans mb-4">Calle de Terraplén 42, Centro Histórico</p>
                      <p className="text-stone-300 text-xs leading-relaxed font-serif mb-6">
                        Una espléndida casona colonial mexicana que rebosa arte popular y vegetación exuberante. Ideal para quienes desean hospedarse en el centro de la villa y gozar del ambiente histórico.
                      </p>
                    </div>
                    <a
                      href="https://www.haciendaelsantuario.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-2.5 bg-transparent border border-[#C7A76C]/50 text-[#C7A76C] hover:bg-[#C7A76C] hover:text-[#2A2521] text-xs font-sans uppercase tracking-widest rounded-lg transition-all"
                    >
                      Ver Hotel Boutique
                    </a>
                  </div>

                </div>

              </div>
            </section>

            {/* ================= RSVP FORM (CONFIRMACIÓN DE ASISTENCIA) ================= */}
            <section className="relative w-full py-24 bg-[#F8F4EE] z-20 flex flex-col items-center">
              
              <div className="max-w-4xl w-full px-4">
                
                <div className="text-center mb-16">
                  <span className="text-[#C96A45] text-xs font-sans uppercase tracking-[0.35em] block mb-2">Confirmación</span>
                  <h3 className="text-[#2A2521] text-4xl md:text-5xl font-light tracking-wide font-serif">R.S.V.P.</h3>
                  <div className="w-16 h-[1.5px] bg-[#C7A76C] mx-auto mt-4" />
                  <p className="text-stone-600 text-sm font-serif italic mt-4 max-w-sm mx-auto">
                    Agradecemos confirmar su distinguida presencia antes del 18 de Agosto de 2027 para una correcta planeación.
                  </p>
                </div>

                <div className="bg-[#F8F4EE] border-2 border-[#C7A76C]/40 p-8 md:p-12 rounded-3xl shadow-2xl relative max-w-lg mx-auto">
                  <div className="absolute inset-1.5 border border-[#C7A76C]/10 rounded-[22px] pointer-events-none" />
                  <div className="absolute inset-3 border border-dashed border-[#C7A76C]/20 rounded-[18px] pointer-events-none" />

                  {rsvpSent ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 relative z-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center text-emerald-600 mx-auto mb-6">
                        <Check className="w-8 h-8" />
                      </div>
                      <h4 className="text-2xl font-serif font-light tracking-wide text-[#2A2521] mb-2">¡Confirmación Enviada!</h4>
                      <p className="text-stone-600 text-sm font-serif max-w-xs mx-auto italic mb-6">
                        Su respuesta ha sido registrada y enviada exitosamente a los novios. ¡Muchas gracias por ser parte de nuestra historia!
                      </p>
                      <button
                        onClick={() => setRsvpSent(false)}
                        id="reset-rsvp-btn"
                        className="px-6 py-2.5 bg-[#C96A45] text-[#F8F4EE] text-xs font-sans uppercase tracking-widest rounded-lg hover:bg-[#b05835] transition-colors"
                      >
                        Modificar Confirmación
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleRSVPSubmit} className="space-y-6 relative z-10" id="rsvp-wedding-form">
                      
                      {/* Name input */}
                      <div>
                        <label htmlFor="rsvp-name" className="block text-stone-500 text-[10px] font-sans uppercase tracking-widest mb-2">
                          Nombre Completo del Invitado
                        </label>
                        <input
                          type="text"
                          id="rsvp-name"
                          value={rsvpName}
                          onChange={(e) => setRsvpName(e.target.value)}
                          placeholder="Ej. Sra. María de la Luz Gómez"
                          required
                          className="w-full bg-[#F8F4EE] border border-[#C7A76C]/60 rounded-lg p-3 font-serif text-sm focus:outline-hidden focus:border-[#C96A45] focus:ring-1 focus:ring-[#C96A45] transition-all text-[#2A2521]"
                        />
                      </div>

                      {/* Attendance select */}
                      <div>
                        <label className="block text-stone-500 text-[10px] font-sans uppercase tracking-widest mb-2">
                          ¿Confirmas tu asistencia?
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setRsvpAttendance('si')}
                            id="rsvp-attendance-yes"
                            className={`p-3 rounded-lg text-xs font-sans uppercase tracking-wider border transition-all ${
                              rsvpAttendance === 'si'
                              ? 'bg-[#C96A45] text-[#F8F4EE] border-[#C7A76C]'
                              : 'bg-transparent text-stone-600 border-[#C7A76C]/40 hover:bg-stone-100'
                            }`}
                          >
                            Sí, Con Gusto Asistiré
                          </button>
                          <button
                            type="button"
                            onClick={() => setRsvpAttendance('no')}
                            id="rsvp-attendance-no"
                            className={`p-3 rounded-lg text-xs font-sans uppercase tracking-wider border transition-all ${
                              rsvpAttendance === 'no'
                              ? 'bg-[#8F1D1D] text-[#F8F4EE] border-[#701212]'
                              : 'bg-transparent text-stone-600 border-[#C7A76C]/40 hover:bg-stone-100'
                            }`}
                          >
                            No Podré Asistir
                          </button>
                        </div>
                      </div>

                      {/* Guests number */}
                      {rsvpAttendance === 'si' && (
                        <div>
                          <label htmlFor="rsvp-guests" className="block text-stone-500 text-[10px] font-sans uppercase tracking-widest mb-2">
                            Número de Pases Confirmados
                          </label>
                          <select
                            id="rsvp-guests"
                            value={rsvpGuests}
                            onChange={(e) => setRsvpGuests(e.target.value)}
                            className="w-full bg-[#F8F4EE] border border-[#C7A76C]/60 rounded-lg p-3 font-serif text-sm focus:outline-hidden focus:border-[#C96A45] transition-all text-[#2A2521]"
                          >
                            <option value="1">1 Persona (Pase Personal)</option>
                            <option value="2">2 Personas (Pase de Pareja)</option>
                            <option value="3">3 Personas (Familiar)</option>
                            <option value="4">4 Personas (Familiar Completo)</option>
                          </select>
                        </div>
                      )}

                      {/* Dietary notes */}
                      {rsvpAttendance === 'si' && (
                        <div>
                          <label htmlFor="rsvp-diet" className="block text-stone-500 text-[10px] font-sans uppercase tracking-widest mb-2">
                            Restricciones Dietéticas / Alergias
                          </label>
                          <textarea
                            id="rsvp-diet"
                            value={rsvpDiet}
                            onChange={(e) => setRsvpDiet(e.target.value)}
                            placeholder="Ej. Alergia a nueces, vegetariano, etc."
                            rows={2}
                            className="w-full bg-[#F8F4EE] border border-[#C7A76C]/60 rounded-lg p-3 font-serif text-sm focus:outline-hidden focus:border-[#C96A45] transition-all text-[#2A2521]"
                          />
                        </div>
                      )}

                      <button
                        type="submit"
                        id="submit-rsvp-btn"
                        className="w-full py-3.5 bg-[#C96A45] text-[#F8F4EE] text-xs font-sans uppercase tracking-[0.2em] font-medium rounded-lg hover:bg-[#b05835] transition-colors shadow-lg flex items-center justify-center gap-2 border border-[#C7A76C]"
                      >
                        <Send className="w-4 h-4" /> Enviar Confirmación por WhatsApp
                      </button>

                    </form>
                  )}

                </div>

              </div>

            </section>

            {/* ================= RECONOCIMIENTO / AGRADECIMIENTOS ================= */}
            <footer className="relative w-full py-16 bg-[#2A2521] text-[#E8D9C5] z-20 overflow-hidden flex flex-col items-center justify-center text-center border-t border-[#C7A76C]/30">
              <div className="absolute inset-0 bg-[#C96A45]/5 mix-blend-color-burn pointer-events-none" />

              <div className="max-w-xl px-4 relative z-10 flex flex-col items-center">
                {/* Visual family seal decoration */}
                <div className="w-12 h-12 rounded-full border border-[#C7A76C]/30 flex items-center justify-center text-xs font-serif italic text-[#C7A76C] mb-6">
                  S & A
                </div>

                <p className="text-[#F8F4EE] text-lg font-serif italic leading-relaxed">
                  "Que la tradición de nuestros ancestros guíe nuestros pasos, y que el amor compartido hoy perdure en las páginas de la historia."
                </p>

                <p className="text-stone-500 text-[10px] font-sans uppercase tracking-[0.25em] mt-8">
                  Sofía Hernández & Alejandro Ramírez
                </p>
                <p className="text-[#C7A76C] text-xs mt-1">18 . 09 . 2027</p>

                <div className="w-12 h-[1px] bg-[#C7A76C]/30 my-6" />

                <p className="text-stone-600 text-[10px] font-sans tracking-widest uppercase">
                  Diseño de Invitación de Bodas Ultra Premium
                </p>
                <p className="text-stone-700 text-[9px] font-mono mt-1">
                  Exclusividad Hacendaria 1782 — San Miguel de Allende
                </p>

                <div className="pt-8">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.pathname = '/'; }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-transparent hover:bg-stone-800 border border-[#C7A76C]/40 text-[#E8D9C5] hover:text-[#F8F4EE] rounded-full font-serif text-[9px] uppercase tracking-widest transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#C7A76C]" />
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
