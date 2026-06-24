import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Calendar, MapPin, Gift, Music, Play, Pause, 
  Copy, Check, Sparkles, ArrowLeft, Send, ExternalLink, 
  ChevronLeft, ChevronRight, Shield, Smartphone, Volume2, VolumeX, X
} from 'lucide-react';

// Specialized Canvas Component for Premium Floating Sage/Ivory Petals and Golden Butterflies
interface LeafPetal {
  x: number;
  y: number;
  r: number;
  d: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
  spin: number;
  color: string;
}

interface GoldenButterfly {
  x: number;
  y: number;
  size: number;
  targetX: number;
  targetY: number;
  speed: number;
  wingPhase: number;
  opacity: number;
  color: string;
}

const BotanicalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Color definitions
    const colors = [
      'rgba(168, 187, 162, 0.45)', // Sage Green
      'rgba(248, 244, 238, 0.55)', // Warm Ivory
      'rgba(217, 165, 141, 0.4)',  // Rose Gold
      'rgba(250, 248, 245, 0.6)'   // Warm White
    ];

    const particles: LeafPetal[] = [];
    const maxParticles = 35;

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * -height - 20,
        r: Math.random() * 6 + 4,
        d: Math.random() * maxParticles,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 1.2 + 0.6,
        opacity: Math.random() * 0.7 + 0.3,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Interactive Golden Butterflies
    const butterflies: GoldenButterfly[] = [];
    const maxButterflies = 6;

    for (let i = 0; i < maxButterflies; i++) {
      const startX = Math.random() * width;
      const startY = Math.random() * height;
      butterflies.push({
        x: startX,
        y: startY,
        size: Math.random() * 12 + 8,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        speed: Math.random() * 1.5 + 0.8,
        wingPhase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.4 + 0.4,
        color: 'rgba(217, 165, 141, 0.85)' // Warm golden rose gold shimmer
      });
    }

    const drawPetal = (p: LeafPetal) => {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.beginPath();
      ctx.fillStyle = p.color;
      
      // Draw almond-shaped leaf/petal
      ctx.moveTo(0, -p.size);
      ctx.quadraticCurveTo(p.size * 0.8, -p.size * 0.3, 0, p.size);
      ctx.quadraticCurveTo(-p.size * 0.8, -p.size * 0.3, 0, -p.size);
      
      ctx.shadowColor = 'rgba(168, 187, 162, 0.1)';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();
    };

    const drawButterfly = (b: GoldenButterfly) => {
      if (!ctx) return;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.shadowColor = 'rgba(217, 165, 141, 0.5)';
      ctx.shadowBlur = 10;

      // Body
      ctx.fillStyle = 'rgba(110, 85, 75, 0.7)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 1.5, b.size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Wing flaps based on phase
      const wingW = b.size * Math.abs(Math.sin(b.wingPhase));
      const wingH = b.size * 0.85;

      // Left Wing
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-wingW, -wingH, -wingW * 0.8, wingH * 0.2, 0, wingH * 0.4);
      ctx.bezierCurveTo(-wingW * 0.4, wingH * 0.8, -wingW * 0.1, wingH * 0.3, 0, 0);
      ctx.fill();

      // Right Wing
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(wingW, -wingH, wingW * 0.8, wingH * 0.2, 0, wingH * 0.4);
      ctx.bezierCurveTo(wingW * 0.4, wingH * 0.8, wingW * 0.1, wingH * 0.3, 0, 0);
      ctx.fill();

      // Inner glowing golden veins
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-wingW * 0.6, -wingH * 0.4);
      ctx.moveTo(0, 0);
      ctx.lineTo(wingW * 0.6, -wingH * 0.4);
      ctx.stroke();

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update falling petals
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01 + p.d) * 0.4;
        p.angle += p.spin;

        drawPetal(p);

        if (p.y > height + p.size) {
          p.y = -p.size - 10;
          p.x = Math.random() * width;
          p.speed = Math.random() * 1.2 + 0.6;
        }
      }

      // Draw and update butterfly flight paths
      for (let i = 0; i < butterflies.length; i++) {
        const b = butterflies[i];
        
        // Move towards targets
        const dx = b.targetX - b.x;
        const dy = b.targetY - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 15) {
          b.targetX = Math.random() * width;
          b.targetY = Math.random() * height;
          b.speed = Math.random() * 1.2 + 0.6;
        } else {
          b.x += (dx / dist) * b.speed;
          b.y += (dy / dist) * b.speed;
        }

        // Speed up flapping during motion
        b.wingPhase += 0.18;

        drawButterfly(b);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-30" />;
};

// Premium Scroll Reveal
const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 35 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10% 0px" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
  >
    {children}
  </motion.div>
);

// Letter-by-letter Quote Animator
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
        <span key={wIdx} className="mr-2 mb-2 flex flex-row">
          {word.split("").map((char, cIdx) => (
            <motion.span
              key={cIdx}
              initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: (wIdx * 3 + cIdx) * 0.02, ease: "easeOut" }}
              className="inline-block text-stone-700 font-serif"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default function TemplateBoda7() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicCardOpen, setIsMusicCardOpen] = useState(true);
  const [activeStoryChapter, setActiveStoryChapter] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(131); // 2:11 music loop duration
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // RSVP Form state
  const [rsvpData, setRsvpData] = useState({ name: '', guests: '2', diet: 'Ninguna', message: '' });
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const storyChapters = [
    { 
      title: "Nuestro encuentro", 
      meta: "Otoño 2021", 
      subtitle: "La chispa inicial", 
      desc: "Nuestros caminos se cruzaron bajo los arcos de piedra de un jardín secreto. Una conversación improvisada sobre literatura, un café compartido bajo los almendros en flor y la certeza instantánea de que el destino acababa de reescribir nuestro futuro." 
    },
    { 
      title: "Nuestro primer viaje", 
      meta: "Primavera 2023", 
      subtitle: "Florencia y el sol toscano", 
      desc: "Descubrimos el mundo tomados de la mano, perdiéndonos entre las colinas infinitas cubiertas de viñedos en la Toscana. Allí, rodeados de cipreses, atardeceres dorados y brisa cálida, supimos que nuestro viaje duraría toda la vida." 
    },
    { 
      title: "El compromiso", 
      meta: "Verano 2025", 
      subtitle: "Una propuesta eterna", 
      desc: "En los jardines suspendidos de un antiguo castillo francés, Sebastián preparó un sendero de velas y flores de azahar. Con lágrimas en los ojos e infinito amor latente en su pecho, Isabella pronunció el gran sí quiero." 
    },
    { 
      title: "Nuestra boda", 
      meta: "21.03.2027", 
      subtitle: "El inicio del siempre", 
      desc: "Hoy consagramos nuestra historia en el alma de San Miguel de Allende. Rodeados de la naturaleza refinada de un jardín botánico histórico y las personas más amadas que han sido parte de nuestra mágica senda." 
    }
  ];

  const galleryImages = [
    { src: "/isabella_mateo_couple.jpg", title: "Isabella & Mateo", subtitle: "Nuestra Esencia" },
    { src: "/versailles_garden.jpg", title: "Versalles de Ensueño", subtitle: "Sinfonía Verde" },
    { src: "/greenhouse_wedding.jpg", title: "Invernadero de Cristal", subtitle: "Luz Eterna" },
    { src: "/tuscany_villa.jpg", title: "Atardecer en Toscana", subtitle: "Sabor a Campo" },
    { src: "/romantic_lake.jpg", title: "El Reflejo del Alma", subtitle: "Luz y Misterio" },
    { src: "/flower_meadow.jpg", title: "Pradera Silvestre", subtitle: "Naturaleza Pura" }
  ];

  const bankDetails = {
    bank: "Banca Patrimonial HSBC Premier",
    clabe: "0211 8009 5482 1764 92",
    holder: "Isabella Laurent & Mateo Castellanos",
    concept: "Regalo de Bodas Isabella & Mateo"
  };

  const togglePlayPause = () => {
    if (!audioRef.current) {
      const audio = new Audio('/music.mp3');
      audio.loop = true;
      audio.volume = 0.5;
      
      audio.addEventListener('error', () => {
        console.warn("Local /music.mp3 not found, falling back to Chopin Nocturne Op. 9 No. 2");
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
    const targetDate = new Date('Mar 21, 2027 18:00:00').getTime();
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

  // Synthesize soft breeze, rustling leaves & romantic musical bells
  const playNatureSoundtrack = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const audioCtx = new AudioContext();

      // Synthesize soft gentle wind breeze (noise generator + filter)
      const bufferSize = audioCtx.sampleRate * 2; // 2 seconds
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 1.5);
      
      const windGain = audioCtx.createGain();
      windGain.gain.setValueAtTime(0, audioCtx.currentTime);
      windGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.3);
      windGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

      noiseNode.connect(filter);
      filter.connect(windGain);
      windGain.connect(audioCtx.destination);
      noiseNode.start();

      // Birds chirping: high pitched rapid frequency oscillators
      const playBirdChirp = (delay: number, freq: number) => {
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + delay + 0.1);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.2, audioCtx.currentTime + delay + 0.2);

        oscGain.gain.setValueAtTime(0, audioCtx.currentTime + delay);
        oscGain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + delay + 0.05);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + 0.22);

        osc.connect(oscGain);
        oscGain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + delay);
        osc.stop(audioCtx.currentTime + delay + 0.25);
      };

      // Play soft arpeggio of bird calls and harp
      playBirdChirp(0.1, 1400);
      playBirdChirp(0.2, 1700);
      playBirdChirp(0.4, 1500);
      playBirdChirp(0.7, 1900);

      // Harpsichord luxury chime cord
      const chord = [329.63, 392.00, 493.88, 587.33, 659.25, 783.99, 987.77]; // Em7/9 majestic botanical chime
      chord.forEach((f, i) => {
        const harpOsc = audioCtx.createOscillator();
        const harpGain = audioCtx.createGain();
        harpOsc.type = 'triangle';
        harpOsc.frequency.setValueAtTime(f, audioCtx.currentTime + i * 0.07);
        harpGain.gain.setValueAtTime(0, audioCtx.currentTime + i * 0.07);
        harpGain.gain.linearRampToValueAtTime(0.025, audioCtx.currentTime + i * 0.07 + 0.02);
        harpGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + i * 0.07 + 1.5);
        harpOsc.connect(harpGain);
        harpGain.connect(audioCtx.destination);
        harpOsc.start(audioCtx.currentTime + i * 0.07);
        harpOsc.stop(audioCtx.currentTime + i * 0.07 + 1.6);
      });

    } catch (e) {
      console.log('Web Audio failed or not supported');
    }
  };

  const handleOpenEnvelope = () => {
    setIsOpening(true);
    playNatureSoundtrack();
    
    // Play music immediately within user click gesture to guarantee autoplay
    if (!audioRef.current) {
      const audio = new Audio('/music.mp3');
      audio.loop = true;
      audio.volume = 0.5;
      
      audio.addEventListener('error', () => {
        console.warn("Local /music.mp3 not found, falling back to Chopin Nocturne Op. 9 No. 2");
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

    setShowCanvas(true);

    setTimeout(() => {
      setEnvelopeOpened(true);
      setIsMusicCardOpen(true);
    }, 1500);
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
      triggerToast("¡Asistencia confirmada!");
    }, 1500);
  };

  return (
    <div id="botanical-luxury-template-7" className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans antialiased overflow-x-hidden selection:bg-[#A8BBA2]/30 selection:text-stone-900">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#F8F4EE] border border-[#D9A58D]/30 backdrop-blur-md px-6 py-3 rounded-full flex items-center space-x-3 shadow-2xl"
          >
            <Sparkles className="w-4 h-4 text-[#D9A58D] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9A58D] font-serif font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Spotify Player Widget */}
      <AnimatePresence>
        {envelopeOpened && (
          <>
            {isMusicCardOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                className="fixed bottom-6 right-6 z-50 w-[300px] bg-[#FAF8F5]/95 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(42,37,33,0.15)] border border-[#D9A58D]/30 p-3 flex flex-col font-sans"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#D9A58D]/20">
                  <div className="flex items-center space-x-1.5 text-stone-700">
                    <Music className="w-3.5 h-3.5 text-[#D9A58D]" />
                    <span className="text-[10px] uppercase tracking-widest font-sans font-bold">Música de Fondo</span>
                  </div>
                  <button onClick={toggleMusic} className="text-stone-400 hover:text-stone-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex flex-col space-y-2 pt-2 text-stone-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#f0ede6] flex items-center justify-center border border-[#D9A58D]/30">
                      <Music className={`w-5 h-5 text-[#D9A58D] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold truncate text-stone-800">Melodía Romántica</h4>
                      <p className="text-[10px] text-stone-500 truncate">Sinfonía en Clave de Sol</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                    <button 
                      onClick={togglePlayPause}
                      className="p-2 bg-gradient-to-r from-[#D9A58D] to-[#f4d0c0] hover:opacity-90 text-white rounded-lg transition-all active:scale-95 flex items-center justify-center shadow-sm"
                      title={isPlaying ? "Pausar" : "Reproducir"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                    </button>
                    
                    <div className="flex items-center space-x-2 flex-1 ml-4">
                      {isPlaying ? (
                        <Volume2 className="w-3.5 h-3.5 text-[#D9A58D] animate-pulse" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5 text-stone-400" />
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
                        className="w-full h-1 bg-[#e4e1da] rounded-lg appearance-none cursor-pointer accent-[#D9A58D]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={toggleMusic}
                className="fixed bottom-6 right-6 z-40 p-4 bg-[#FAF8F5]/90 text-stone-700 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.15)] border border-[#D9A58D]/30 backdrop-blur-md transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-90 group"
                aria-label="Toggle background music"
              >
                <Music className="w-5 h-5 group-hover:scale-110 transition-transform text-[#D9A58D]" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-32 group-hover:ml-2 transition-all duration-300 text-xs font-sans uppercase tracking-widest whitespace-nowrap text-stone-700 font-bold">Escuchar Música</span>
              </motion.button>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Particles, sage leaves and golden butterflies */}
      {showCanvas && <BotanicalCanvas />}

      <AnimatePresence mode="wait">
        {!envelopeOpened ? (
          /* ================= PANTALLA INICIAL: SOBRE DE LUJO ================= */
          <motion.div
            key="botanical-envelope"
            exit={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#F5F2EC] flex flex-col items-center justify-center px-4 overflow-hidden"
          >
            {/* Defocused garden light background rays */}
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 filter blur-xl scale-110" style={{ backgroundImage: "url('/versailles_garden.jpg')" }} />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#FAF8F5]/80 pointer-events-none" />

            {/* Cotton paper luxury envelope container */}
            <div className="w-full max-w-[430px] flex flex-col items-center z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="relative w-full aspect-[4/5] bg-[#F8F4EE] rounded-[32px] p-8 border-2 border-[#D9A58D]/25 shadow-[0_30px_70px_rgba(110,95,85,0.18)] flex flex-col items-center justify-between overflow-hidden"
              >
                {/* Cotton paper grain texture layer */}
                <div className="absolute inset-0 bg-opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #D9A58D 10%, transparent 11%)', backgroundSize: '3px 3px', opacity: 0.05 }} />

                {/* Elegant gold foil floral line art corner ornaments */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#D9A58D]/35 rounded-tl-[16px]" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[#D9A58D]/35 rounded-tr-[16px]" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[#D9A58D]/35 rounded-bl-[16px]" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#D9A58D]/35 rounded-br-[16px]" />

                {/* Relieved organic floral lace borders */}
                <div className="w-full flex justify-center text-center mt-6">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-[#A8BBA2] uppercase tracking-[0.35em] font-medium font-mono block">Isabella & Mateo</span>
                    <p className="text-[13px] md:text-[14px] font-serif font-light text-stone-600 tracking-[0.16em] leading-relaxed max-w-[280px] mx-auto">
                      Has sido invitado(a) a compartir el inicio de nuestra historia para siempre
                    </p>
                  </div>
                </div>

                {/* Magnificent Metallic Rose Gold Champagne Wax Seal */}
                <div className="relative my-8">
                  <motion.div
                    animate={isOpening ? { 
                      scale: [1, 1.12, 1.05],
                      boxShadow: ["0 8px 25px rgba(217,165,141,0.2)", "0 12px 35px rgba(217,165,141,0.45)", "0 8px 25px rgba(217,165,141,0.2)"]
                    } : {}}
                    transition={{ duration: 1.5, repeat: isOpening ? Infinity : 0 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-[#EAD9D0] via-[#D9A58D] to-[#B07E66] border border-white/20 shadow-[0_12px_28px_rgba(180,140,120,0.35)] flex items-center justify-center cursor-pointer relative group"
                    onClick={handleOpenEnvelope}
                  >
                    {/* Concentric relief ridges */}
                    <div className="absolute inset-1.5 rounded-full border border-white/10" />
                    <div className="absolute inset-3 rounded-full border border-dashed border-[#FAF8F5]/20" />
                    
                    {/* IM Monogram logo */}
                    <span className="font-serif text-[28px] tracking-[0.08em] text-white drop-shadow-[0_2px_5px_rgba(110,80,60,0.4)] select-none">
                      IM
                    </span>

                    {/* Wax shine overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </motion.div>
                </div>

                {/* Unfolding Trigger Button */}
                <div className="w-full px-4 mb-2 z-10">
                  <button
                    disabled={isOpening}
                    onClick={handleOpenEnvelope}
                    className="w-full py-4 bg-[#FAF8F5] border border-[#D9A58D] rounded-xl hover:bg-[#F8F4EE] hover:border-stone-800 transition-all duration-300 relative group overflow-hidden shadow-[0_4px_12px_rgba(110,95,85,0.06)] active:scale-98"
                    id="open-invitation-btn"
                  >
                    <span className="text-[12px] font-serif uppercase tracking-[0.2em] text-[#D9A58D] group-hover:text-stone-800 transition-colors">
                      {isOpening ? "Rompiendo Sello..." : "Abrir Invitación"}
                    </span>
                  </button>
                </div>
              </motion.div>
              
              <p className="mt-8 text-[9px] uppercase tracking-[0.35em] text-[#D9A58D] font-serif italic">
                Garden Destination Wedding — San Miguel de Allende
              </p>
            </div>
          </motion.div>
        ) : (
          /* ================= TEMPLATE PRINCIPAL DE LUJO ================= */
          <motion.div
            key="botanical-contents"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative"
          >
            
            {/* HERO PRINCIPAL */}
            <header className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 py-12 overflow-hidden bg-[#FAF8F5]">
              {/* Versailles Garden Backdrop with subtle zoom and parallax feel */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="/versailles_garden.jpg" 
                  alt="Versailles European Garden"
                  className="w-full h-full object-cover brightness-[0.70] contrast-[0.98] scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                {/* Seamless vignettes blending into Sage/Ivory */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/30 via-transparent to-[#FAF8F5]" />
              </div>

              {/* Minimal Brand Bar */}
              <div className="relative z-10 w-full max-w-5xl flex justify-between items-center px-4">
                <span className="font-serif text-[15px] text-[#A8BBA2] tracking-[0.4em] font-medium">I & M</span>
                <span className="text-[8px] uppercase tracking-[0.3em] text-stone-500 border border-[#A8BBA2]/30 bg-[#FAF8F5]/60 backdrop-blur-xs px-3 py-1 rounded-full">Boda de Destino</span>
              </div>

              {/* Couple Names & Botanical Poem */}
              <div className="relative z-10 my-auto max-w-4xl px-2">
                <span className="text-[#D9A58D] text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-semibold block mb-4">Nuestra Boda</span>
                
                <h1 className="font-serif text-[42px] sm:text-[60px] md:text-[76px] text-stone-800 tracking-tight leading-[1.05] mb-5">
                  Isabella <span className="font-serif italic font-light text-[35px] sm:text-[50px] md:text-[68px] text-[#A8BBA2]">&</span> Mateo
                </h1>

                <p className="font-serif italic text-stone-600 text-[16px] sm:text-[20px] md:text-[24px] max-w-xl mx-auto font-light leading-relaxed mb-8">
                  "Entre millones de flores encontramos nuestra historia"
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="#confirmacion"
                    className="px-8 py-3.5 bg-gradient-to-r from-[#D9A58D] to-[#B07E66] text-white text-[11px] uppercase tracking-[0.25em] font-serif rounded shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
                  >
                    Confirmar Asistencia
                  </a>
                  <a
                    href="#galeria"
                    className="px-8 py-3.5 bg-white/80 border border-[#A8BBA2] text-stone-700 text-[11px] uppercase tracking-[0.25em] rounded hover:bg-white transition-all w-full sm:w-auto backdrop-blur-xs"
                  >
                    Retratos Editorial
                  </a>
                </div>
              </div>

              {/* Bottom Schedule Details */}
              <div className="relative z-10 w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-3 px-4 border-t border-stone-800/10 pt-6">
                <div className="text-center sm:text-left">
                  <p className="text-[11px] font-serif uppercase tracking-[0.22em] text-stone-800 font-semibold">21 . MARZO . 2027</p>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#A8BBA2] mt-0.5 font-mono">Domingo a las 18:00 Horas</p>
                </div>
                <div className="h-[1px] w-12 bg-stone-800/10 sm:hidden" />
                <div className="text-center sm:text-right">
                  <p className="text-[11px] font-serif uppercase tracking-[0.22em] text-stone-800 font-semibold">SAN MIGUEL DE ALLENDE</p>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#A8BBA2] mt-0.5 font-mono">Guanajuato, México</p>
                </div>
              </div>
            </header>


            {/* PREMIUM COUNTDOWN */}
            <section className="relative py-24 bg-[#F8F4EE] flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,187,162,0.1)_0%,transparent_70%)] pointer-events-none" />
              
              <ScrollReveal>
                <div className="text-center mb-12">
                  <p className="text-[#A8BBA2] text-[10px] uppercase tracking-[0.35em] font-medium mb-2 block">The Sacred Countdown</p>
                  <h2 className="font-serif text-[28px] sm:text-[34px] text-stone-800">Cada Instante Cuenta</h2>
                  <div className="w-10 h-[1.5px] bg-[#D9A58D] mx-auto mt-4" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                {/* Countdown Dial styled inside an organic leaf relief border */}
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full bg-[#FAF8F5] border-[3px] border-[#A8BBA2]/20 shadow-[0_20px_50px_rgba(110,95,85,0.08),inset_0_4px_15px_rgba(255,255,255,0.8)] flex items-center justify-center p-6">
                  
                  {/* Delicate leaf/floral pattern loop background */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="transparent" stroke="rgba(168, 187, 162, 0.15)" strokeWidth="1.5" />
                    {/* Animated gold ring representing time passing */}
                    <circle cx="50" cy="50" r="46" fill="transparent" stroke="#D9A58D" strokeWidth="1.5" strokeDasharray="290" strokeDashoffset={290 - (290 * (timeLeft.days % 365)) / 365} strokeLinecap="round" />
                  </svg>

                  {/* Elegant inner dial plate */}
                  <div className="absolute w-[210px] h-[210px] sm:w-[245px] sm:h-[245px] rounded-full border border-[#D9A58D]/30 flex flex-col justify-center items-center bg-[#F8F4EE]/90 z-10 backdrop-blur-md shadow-inner">
                    <span className="text-[7px] uppercase tracking-[0.3em] text-[#A8BBA2] mb-4 font-mono font-bold">FLORES & ROMANCE</span>

                    <div className="grid grid-cols-4 gap-2 text-center w-full px-2">
                      <div className="flex flex-col">
                        <span className="font-serif text-[24px] sm:text-[28px] text-stone-800 font-light leading-none">{timeLeft.days}</span>
                        <span className="text-[7px] uppercase tracking-widest text-stone-500 mt-1 font-mono">Días</span>
                      </div>
                      <div className="flex flex-col border-l border-[#A8BBA2]/20">
                        <span className="font-serif text-[24px] sm:text-[28px] text-stone-800 font-light leading-none">{timeLeft.hours}</span>
                        <span className="text-[7px] uppercase tracking-widest text-stone-500 mt-1 font-mono">Hrs</span>
                      </div>
                      <div className="flex flex-col border-l border-[#A8BBA2]/20">
                        <span className="font-serif text-[24px] sm:text-[28px] text-stone-800 font-light leading-none">{timeLeft.minutes}</span>
                        <span className="text-[7px] uppercase tracking-widest text-stone-500 mt-1 font-mono">Min</span>
                      </div>
                      <div className="flex flex-col border-l border-[#A8BBA2]/20">
                        <span className="font-serif text-[24px] sm:text-[28px] text-[#D9A58D] font-light leading-none animate-pulse">{timeLeft.seconds}</span>
                        <span className="text-[7px] uppercase tracking-widest text-stone-500 mt-1 font-mono">Seg</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center space-x-1.5 opacity-60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A8BBA2] animate-ping" />
                      <span className="text-[6px] tracking-[0.2em] text-stone-600 font-mono">SINFONÍA DE AMOR</span>
                    </div>
                  </div>

                  {/* Aesthetic rose-gold pointers */}
                  <div className="absolute w-[2px] h-16 bg-gradient-to-t from-transparent via-[#D9A58D]/40 to-[#D9A58D] origin-bottom -translate-y-8 rotate-[110deg] pointer-events-none" />
                  <div className="absolute w-[1px] h-20 bg-stone-400 origin-bottom -translate-y-10 rotate-[220deg] pointer-events-none" />
                </div>
              </ScrollReveal>
            </section>


            {/* CRYSTAL MUSIC BOX PLAYER */}
            <section className="relative py-16 bg-[#FAF8F5] border-t border-b border-stone-100 px-4">
              <div className="max-w-[420px] mx-auto bg-white/80 rounded-[28px] p-6 border-2 border-[#A8BBA2]/20 shadow-[0_15px_45px_rgba(110,95,85,0.05)] backdrop-blur-md relative overflow-hidden">
                
                {/* Decorative rotating musical gear vectors */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 text-[#D9A58D]/10 pointer-events-none">
                  <svg className={`w-full h-full ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.4 13c0-.3.1-.6.1-.9s0-.6-.1-.9l2.1-1.7c.2-.2.2-.4.1-.6l-2-3.5c-.1-.2-.4-.3-.6-.2l-2.5 1c-.5-.4-1.1-.7-1.7-.9l-.4-2.6c0-.2-.2-.4-.5-.4h-4c-.3 0-.5.2-.5.4l-.4 2.6c-.6.2-1.2.5-1.7.9l-2.5-1c-.2-.1-.5 0-.6.2l-2 3.5c-.1.2-.1.5.1.6l2.1 1.7c-.1.3-.1.6-.1.9s0 .6.1.9l-2.1 1.7c-.2.2-.2.4-.1.6l2 3.5c.1.2.4.3.6.2l2.5-1c.5.4 1.1.7 1.7.9l.4 2.6c0 .2.2.4.5.4h4c.3 0 .5-.2.5-.4l.4-2.6c.6-.2 1.2-.5 1.7-.9l2.5 1c.2.1.5 0 .6-.2l2-3.5c.1-.2.1-.5-.1-.6l-2.1-1.7zm-7.4 2.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
                  </svg>
                </div>

                <div className="absolute -left-6 -top-6 w-20 h-20 text-[#A8BBA2]/10 pointer-events-none">
                  <svg className={`w-full h-full ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '14s', animationDirection: 'reverse' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.4 13c0-.3.1-.6.1-.9s0-.6-.1-.9l2.1-1.7c.2-.2.2-.4.1-.6l-2-3.5c-.1-.2-.4-.3-.6-.2l-2.5 1c-.5-.4-1.1-.7-1.7-.9l-.4-2.6c0-.2-.2-.4-.5-.4h-4c-.3 0-.5.2-.5.4l-.4 2.6c-.6.2-1.2.5-1.7.9l-2.5-1c-.2-.1-.5 0-.6.2l-2 3.5c-.1.2-.1.5.1.6l2.1 1.7c-.1.3-.1.6-.1.9s0 .6.1.9l-2.1 1.7c-.2.2-.2.4-.1.6l2 3.5c.1.2.4.3.6.2l2.5-1c.5.4 1.1.7 1.7.9l.4 2.6c0 .2.2.4.5.4h4c.3 0 .5-.2.5-.4l.4-2.6c.6-.2 1.2-.5 1.7-.9l2.5 1c.2.1.5 0 .6-.2l2-3.5c.1-.2.1-.5-.1-.6l-2.1-1.7zm-7.4 2.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
                  </svg>
                </div>

                {/* Player Header */}
                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div className="flex items-center space-x-2 text-stone-500">
                    <Music className="w-4 h-4 text-[#A8BBA2]" />
                    <span className="text-[9px] uppercase tracking-[0.25em] font-medium font-mono">Boîte à Musique de Cristal</span>
                  </div>
                  <span className="text-[7px] uppercase tracking-[0.2em] bg-[#A8BBA2]/10 border border-[#A8BBA2]/25 px-2.5 py-0.5 rounded-full text-stone-600 font-semibold">Live Music</span>
                </div>

                <div className="flex flex-col space-y-4 text-stone-800 pt-2">
                  <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                    <button 
                      onClick={togglePlayPause}
                      className="p-3 bg-gradient-to-r from-[#D9A58D] to-[#f4d0c0] hover:opacity-95 text-white rounded-full transition-all active:scale-95 flex items-center justify-center shadow-md"
                      title={isPlaying ? "Pausar" : "Reproducir"}
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                    </button>
                    
                    <div className="flex items-center space-x-2 flex-1 ml-4">
                      {isPlaying ? (
                        <Volume2 className="w-4 h-4 text-[#D9A58D] animate-pulse" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-stone-400" />
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
                        className="w-full h-1.5 bg-[#e4e1da] rounded-lg appearance-none cursor-pointer accent-[#D9A58D]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>


            {/* HISTORIA DE AMOR CON FLORES QUE SE ABREN */}
            <section id="historia" className="relative py-28 bg-[#FAF8F5] px-4">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,187,162,0.03)_0%,transparent_80%)] pointer-events-none" />
              
              <ScrollReveal>
                <div className="text-center mb-16">
                  <p className="text-[#A8BBA2] text-[10px] uppercase tracking-[0.35em] font-medium mb-2 block">Our Magical Romance Chapters</p>
                  <h2 className="font-serif text-[32px] sm:text-[40px] text-stone-800 tracking-wide">Crónicas de un Amor Real</h2>
                  <div className="w-12 h-[1.5px] bg-[#D9A58D] mx-auto mt-4" />
                </div>
              </ScrollReveal>

              <div className="max-w-2xl mx-auto space-y-8">
                {storyChapters.map((ch, idx) => {
                  const isChapterOpen = activeStoryChapter === idx;

                  return (
                    <ScrollReveal key={idx} delay={idx * 0.1}>
                      <div 
                        className={`bg-[#F8F4EE]/90 border border-[#A8BBA2]/30 rounded-[28px] p-6 sm:p-8 shadow-[0_10px_35px_rgba(110,95,85,0.04)] hover:shadow-[0_15px_45px_rgba(110,95,85,0.07)] transition-all duration-500 relative overflow-hidden backdrop-blur-md cursor-pointer group`}
                        onClick={() => setActiveStoryChapter(isChapterOpen ? null : idx)}
                      >
                        {/* Interactive bloom progress / glow decoration */}
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#A8BBA2] to-[#D9A58D]" />

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            
                            {/* Animated Botanical Flower Bud / Bloom Icon */}
                            <div className="relative w-14 h-14 rounded-full bg-[#FAF8F5] border border-[#D9A58D]/35 flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                              {/* Glowing background */}
                              <div className="absolute inset-1.5 rounded-full border border-[#A8BBA2]/25" />
                              
                              {/* Petal layers rotation on hover/open */}
                              <svg 
                                className={`w-8 h-8 text-[#A8BBA2] transition-transform duration-1000 ${isChapterOpen ? 'rotate-180 text-[#D9A58D]' : 'group-hover:rotate-45'}`}
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.2"
                              >
                                {isChapterOpen ? (
                                  // Fully blossomed flower
                                  <>
                                    <circle cx="12" cy="12" r="3" fill="#D9A58D" />
                                    <path d="M12 2C11 5 13 5 12 9" />
                                    <path d="M12 15C11 19 13 19 12 22" />
                                    <path d="M2 12C5 11 5 13 9 12" />
                                    <path d="M15 12C19 11 19 13 22 12" />
                                    <path d="M5 5C7 7 8 6 9 9" />
                                    <path d="M15 15C17 17 16 18 19 19" />
                                    <path d="M19 5C17 7 18 6 15 9" />
                                    <path d="M9 15C7 17 6 16 5 19" />
                                  </>
                                ) : (
                                  // Closed elegant flower bud
                                  <path d="M12 22c0-4.5-4-9-4-12.5C8 5.4 10.2 2 12 2s4 3.4 4 7.5c0 3.5-4 8-4 12.5zm0-20v20M8 9.5c1.5 1 2.5 3 2.5 5.5m5.5-5.5c-1.5 1-2.5 3-2.5 5.5" />
                                )}
                              </svg>
                              
                              <AnimatePresence>
                                {isChapterOpen && (
                                  <motion.span 
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1.3, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    className="absolute inset-0 rounded-full border border-[#D9A58D]/30 -z-10 animate-ping pointer-events-none" 
                                  />
                                )}
                              </AnimatePresence>
                            </div>

                            <div>
                              <span className="text-[9px] uppercase tracking-[0.25em] text-[#D9A58D] font-mono font-bold block">{ch.meta}</span>
                              <h3 className="font-serif text-[19px] sm:text-[21px] text-stone-800 tracking-wide">{ch.title}</h3>
                              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-serif italic">{ch.subtitle}</p>
                            </div>
                          </div>

                          <div className="text-right sm:block hidden">
                            <span className="text-[11px] font-serif uppercase tracking-widest text-stone-400 border border-stone-200 px-3 py-1 rounded-full group-hover:border-[#D9A58D]/40 transition-colors">
                              {isChapterOpen ? "Cerrar" : "Florecer"}
                            </span>
                          </div>
                        </div>

                        {/* Animated expanding flower bud container */}
                        <AnimatePresence initial={false}>
                          {isChapterOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 20 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden border-t border-stone-100 pt-5"
                            >
                              <p className="text-[13px] leading-relaxed text-stone-600 font-light text-justify">
                                {ch.desc}
                              </p>
                              
                              {/* Decorative bottom detail */}
                              <div className="flex items-center justify-center space-x-2.5 mt-5">
                                <div className="h-[0.5px] w-8 bg-[#A8BBA2]/45" />
                                <span className="font-serif italic text-stone-400 text-xs">Unidos para siempre</span>
                                <div className="h-[0.5px] w-8 bg-[#A8BBA2]/45" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </section>


            {/* POEMA CENTRAL CON ANIMACIÓN DE LETRAS */}
            <section className="relative py-28 bg-[#F8F4EE] px-6 text-center border-t border-b border-stone-100 overflow-hidden flex flex-col justify-center items-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,165,141,0.04)_0%,transparent_75%)] pointer-events-none" />
              <div className="relative z-10 max-w-2xl">
                <span className="font-serif italic text-[#A8BBA2] text-[38px] block mb-3">“</span>
                <div className="font-serif text-[17px] sm:text-[22px] tracking-wide font-light max-w-lg mx-auto mb-3 text-stone-700">
                  <LetterAnimator text="Bajo el susurro de la naturaleza, dos almas entrelazadas prometen amarse a través de todas las primaveras." />
                </div>
                <span className="font-serif italic text-[#A8BBA2] text-[38px] block mt-2">”</span>
                
                <div className="w-10 h-[0.5px] bg-[#D9A58D] mx-auto mt-6" />
                <p className="text-[9px] uppercase tracking-[0.35em] text-[#A8BBA2] font-mono mt-4">Isabella & Mateo — Nuestro Juramento</p>
              </div>
            </section>


            {/* VOGUE WEDDINGS PHOTO MASONRY GALLERY */}
            <section id="galeria" className="relative py-28 bg-[#FAF8F5] px-4">
              <ScrollReveal>
                <div className="text-center mb-16">
                  <p className="text-[#A8BBA2] text-[10px] uppercase tracking-[0.35em] font-medium mb-2 block">Vogue Weddings Editorial Portfolio</p>
                  <h2 className="font-serif text-[32px] sm:text-[40px] text-stone-800 tracking-wide">Retratos Cinematográficos</h2>
                  <div className="w-12 h-[1.5px] bg-[#D9A58D] mx-auto mt-4" />
                </div>
              </ScrollReveal>

              {/* Masonry Columns */}
              <div className="max-w-5xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {galleryImages.map((img, idx) => (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                    <div className="break-inside-avoid bg-[#F8F4EE] border border-stone-100 rounded-3xl p-3.5 shadow-[0_12px_30px_rgba(110,95,85,0.04)] group relative overflow-hidden flex flex-col">
                      
                      <div className="overflow-hidden rounded-2xl aspect-[3/4] relative">
                        <img 
                          src={img.src} 
                          alt={img.title}
                          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        {/* Gradient tint overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-90" />
                        
                        {/* Overlay text */}
                        <div className="absolute bottom-4 left-4 right-4 text-left">
                          <p className="text-[8px] uppercase tracking-widest text-[#A8BBA2] font-mono mb-0.5">{img.subtitle}</p>
                          <h4 className="font-serif text-[15px] text-[#FAF8F5] tracking-wide font-medium">{img.title}</h4>
                        </div>
                      </div>

                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </section>


            {/* LOGÍSTICA / UBICACIÓN COMPLETA */}
            <section className="relative py-24 bg-[#F8F4EE] border-t border-stone-100 px-4">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-16">
                    <p className="text-[#A8BBA2] text-[10px] uppercase tracking-[0.35em] font-medium mb-2 block">The Italian Destination Experience</p>
                    <h2 className="font-serif text-[30px] sm:text-[36px] text-stone-800">Ubicación del Enlace</h2>
                    <div className="w-10 h-[1.5px] bg-[#D9A58D] mx-auto mt-4" />
                  </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  
                  {/* Ceremonia */}
                  <ScrollReveal delay={0.05}>
                    <div className="bg-[#FAF8F5]/95 border border-[#A8BBA2]/30 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between h-full relative group">
                      <div className="text-center">
                        <span className="text-[8px] uppercase tracking-[0.25em] font-serif text-[#D9A58D] font-bold block mb-3">— La Ceremonia —</span>
                        <h3 className="font-serif text-[22px] text-stone-800 block mb-1">Capilla de San José</h3>
                        <p className="text-[#A8BBA2] text-[10px] uppercase font-mono font-bold mb-4">18:00 Horas</p>
                        <div className="w-8 h-[0.5px] bg-[#D9A58D]/30 mx-auto mb-5" />
                        <p className="text-stone-600 text-[13px] font-light leading-relaxed mb-6 max-w-[250px] mx-auto">
                          Jardines Botánicos Clásicos<br />Calzada de la Luz, Centro Histórico<br />San Miguel de Allende, Gto.
                        </p>
                      </div>
                      <a 
                        href="https://maps.google.com/?q=Calzada+de+la+Luz+San+Miguel+de+Allende" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full py-3 bg-transparent border border-[#A8BBA2] hover:bg-[#A8BBA2]/10 text-[9px] uppercase tracking-widest text-center rounded-xl flex items-center justify-center space-x-2 text-stone-700 font-serif font-medium transition-all"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#A8BBA2]" />
                        <span>Ver ubicación</span>
                      </a>
                    </div>
                  </ScrollReveal>

                  {/* Recepción */}
                  <ScrollReveal delay={0.15}>
                    <div className="bg-[#FAF8F5]/95 border border-[#A8BBA2]/30 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between h-full relative group">
                      <div className="text-center">
                        <span className="text-[8px] uppercase tracking-[0.25em] font-serif text-[#D9A58D] font-bold block mb-3">— El Banquete —</span>
                        <h3 className="font-serif text-[22px] text-stone-800 block mb-1">Invernadero Real</h3>
                        <p className="text-[#A8BBA2] text-[10px] uppercase font-mono font-bold mb-4">19:30 Horas</p>
                        <div className="w-8 h-[0.5px] bg-[#D9A58D]/30 mx-auto mb-5" />
                        <p className="text-stone-600 text-[13px] font-light leading-relaxed mb-6 max-w-[250px] mx-auto">
                          Terraza Belvedere Fontana<br />Camino al Castillo Botánico<br />San Miguel de Allende, Gto.
                        </p>
                      </div>
                      <a 
                        href="https://maps.google.com/?q=Calzada+de+la+Luz+San+Miguel+de+Allende" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-full py-3 bg-gradient-to-r from-[#D9A58D] to-[#B07E66] text-white text-[9px] uppercase tracking-widest text-center rounded-xl flex items-center justify-center space-x-2 font-serif font-medium transition-all shadow-md"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Cómo llegar</span>
                      </a>
                    </div>
                  </ScrollReveal>

                </div>
              </div>
            </section>


            {/* DRESS CODE CON CIRCULOS DE PALETA DE COLOR */}
            <section className="relative py-24 bg-[#FAF8F5] px-4">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-16">
                    <p className="text-[#A8BBA2] text-[10px] uppercase tracking-[0.35em] font-medium mb-2 block">Dignified Dress Code Protocol</p>
                    <h2 className="font-serif text-[30px] sm:text-[36px] text-stone-800">Código de Vestimenta</h2>
                    <div className="w-10 h-[1.5px] bg-[#D9A58D] mx-auto mt-4" />
                    <p className="text-[14px] font-serif text-stone-700 mt-4 italic">Garden Formal</p>
                  </div>
                </ScrollReveal>

                {/* Suggested Color Palettes */}
                <ScrollReveal>
                  <div className="flex flex-col items-center justify-center mb-16">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-6 font-mono font-bold">Colores Sugeridos para Invitados</p>
                    
                    <div className="flex items-center justify-center space-x-6 sm:space-x-8">
                      {/* Verde Salvia */}
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#A8BBA2] border-2 border-[#FAF8F5] shadow-lg relative group transition-transform duration-500 hover:scale-110">
                          <div className="absolute inset-1 rounded-full border border-white/20" />
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-stone-500 font-mono mt-3">Verde Salvia</span>
                      </div>

                      {/* Beige */}
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F5E6D3] border-2 border-[#FAF8F5] shadow-lg relative group transition-transform duration-500 hover:scale-110">
                          <div className="absolute inset-1 rounded-full border border-white/20" />
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-stone-500 font-mono mt-3">Beige</span>
                      </div>

                      {/* Champagne */}
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#E8DCC4] border-2 border-[#FAF8F5] shadow-lg relative group transition-transform duration-500 hover:scale-110">
                          <div className="absolute inset-1 rounded-full border border-white/20" />
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-stone-500 font-mono mt-3">Champagne</span>
                      </div>

                      {/* Oro Rosa */}
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#D9A58D] border-2 border-[#FAF8F5] shadow-lg relative group transition-transform duration-500 hover:scale-110">
                          <div className="absolute inset-1 rounded-full border border-white/20" />
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-stone-500 font-mono mt-3">Oro Rosa</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Rules for Men & Women with beautiful subtle illustration placeholders */}
                <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  <ScrollReveal delay={0.05}>
                    <div className="bg-[#F8F4EE] border border-[#A8BBA2]/20 rounded-3xl p-6 shadow-md flex flex-col text-center">
                      <span className="text-[#A8BBA2] text-3xl font-light mb-3 font-serif">✥</span>
                      <h4 className="font-serif text-[18px] text-stone-800 mb-1.5">Damas</h4>
                      <p className="text-stone-400 text-[9px] uppercase font-mono font-bold mb-3">Vestido de Cóctel / Midi largo</p>
                      <p className="text-[12px] text-stone-600 font-light leading-relaxed">
                        Vestidos formales en telas frescas y fluidas con estampados florales sutiles o colores sólidos inspirados en la naturaleza. Tacón adecuado para jardín.
                      </p>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={0.15}>
                    <div className="bg-[#F8F4EE] border border-[#A8BBA2]/20 rounded-3xl p-6 shadow-md flex flex-col text-center">
                      <span className="text-[#A8BBA2] text-3xl font-light mb-3 font-serif">✦</span>
                      <h4 className="font-serif text-[18px] text-stone-800 mb-1.5">Caballeros</h4>
                      <p className="text-stone-400 text-[9px] uppercase font-mono font-bold mb-3">Traje Sastre Formal</p>
                      <p className="text-[12px] text-stone-600 font-light leading-relaxed">
                        Traje completo de lino, lana ligera o mezclas refinadas en tonos claros (gris claro, beige o azul suave). Camisa blanca de algodón y calzado de cuero.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </section>


            {/* GIFT REGISTRY MESA DE REGALOS */}
            <section className="relative py-24 bg-[#F8F4EE] border-t border-b border-stone-100 px-4">
              <div className="max-w-md mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <p className="text-[#A8BBA2] text-[10px] uppercase tracking-[0.35em] font-medium mb-2 block">Gift Registry & Well Wishes</p>
                    <h2 className="font-serif text-[28px] sm:text-[34px] text-stone-800">Mesa de Regalos</h2>
                    <div className="w-10 h-[1.5px] bg-[#D9A58D] mx-auto mt-4" />
                    <p className="text-[12.5px] text-stone-500 font-light mt-4 leading-relaxed">
                      Vuestra presencia es nuestro mayor presente. Si desean honrarnos con un detalle para nuestro nuevo hogar, les compartimos los detalles de nuestra mesa:
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <div className="bg-[#FAF8F5] border border-[#D9A58D]/30 rounded-[32px] p-6 shadow-xl relative overflow-hidden">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2.5 pb-4 border-b border-stone-100">
                        <div className="w-6 h-6 rounded-full bg-[#A8BBA2]/10 border border-[#A8BBA2]/30 flex items-center justify-center text-[#A8BBA2]">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[9px] uppercase tracking-wider text-stone-500 font-mono font-bold">Registro de Regalos Validado</span>
                      </div>

                      {/* Bank Details */}
                      <div className="space-y-3.5">
                        <span className="text-[10px] uppercase tracking-wider text-[#D9A58D] font-serif font-bold block">Transferencia Directa</span>
                        <div className="bg-[#F8F4EE]/60 rounded-2xl p-4 border border-[#A8BBA2]/10 space-y-2.5 font-mono text-[10px]">
                          <div className="flex justify-between"><span className="text-stone-400">Banco:</span> <span className="text-stone-700 font-medium">{bankDetails.bank}</span></div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-stone-400">CLABE:</span> 
                            <div className="flex items-center space-x-1.5">
                              <span className="text-stone-700 font-bold">{bankDetails.clabe}</span>
                              <button onClick={() => copyToClipboard(bankDetails.clabe, "CLABE")} className="text-[#D9A58D] hover:text-stone-800 transition-colors">
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-between"><span className="text-stone-400">Beneficiario:</span> <span className="text-stone-700 text-right font-medium">{bankDetails.holder}</span></div>
                          <div className="flex justify-between"><span className="text-stone-400">Concepto:</span> <span className="text-stone-700 font-medium">{bankDetails.concept}</span></div>
                        </div>
                      </div>

                      {/* Live links to Palacio de Hierro & Sobres */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#F8F4EE]/40 border border-stone-100 rounded-2xl p-4 text-center">
                          <span className="text-[10px] uppercase tracking-wider text-stone-800 font-serif font-bold block mb-1">Lluvia de Sobres</span>
                          <p className="text-[10px] text-stone-500 font-light">Dispondremos de un cofre floral de cristal para sobres en la recepción.</p>
                        </div>
                        
                        <div className="bg-[#F8F4EE]/40 border border-stone-100 rounded-2xl p-4 flex flex-col justify-between text-center">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-stone-800 font-serif font-bold block mb-1">Palacio de Hierro</span>
                            <p className="text-[9px] text-stone-500 font-light mb-2">Mesa Nº <strong className="text-stone-700 font-mono">#50493810</strong>.</p>
                          </div>
                          <a 
                            href="https://www.elpalaciodehierro.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full py-2 bg-[#FAF8F5] border border-[#A8BBA2]/40 hover:border-stone-800 text-[8px] uppercase tracking-wider text-center text-stone-600 rounded-lg transition-colors font-mono"
                          >
                            Ir a la Mesa
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>


            {/* FORMULARIO RSVP DE ASISTENCIA */}
            <section id="confirmacion" className="relative py-24 bg-[#FAF8F5] px-4">
              <div className="max-w-md mx-auto">
                <ScrollReveal>
                  <div className="text-center mb-12">
                    <p className="text-[#A8BBA2] text-[10px] uppercase tracking-[0.35em] font-medium mb-2 block">Confirm your Attendance</p>
                    <h2 className="font-serif text-[28px] sm:text-[34px] text-stone-800">Confirmación de Asistencia</h2>
                    <div className="w-10 h-[1.5px] bg-[#D9A58D] mx-auto mt-4" />
                    <p className="text-[12.5px] text-stone-500 font-light mt-4">
                      Agradecemos registrar vuestra confirmación antes del <strong className="text-stone-800">10 de Febrero de 2027</strong>.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <div className="bg-[#F8F4EE]/90 border border-[#A8BBA2]/30 rounded-[32px] p-6 sm:p-8 shadow-xl relative backdrop-blur-md">
                    {!rsvpSuccess ? (
                      <form onSubmit={handleRsvpSubmit} className="space-y-5">
                        
                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-stone-500 mb-1.5 font-serif font-bold">Nombre Completo</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="Sr. y Sra. Castellanos" 
                            value={rsvpData.name} 
                            onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })} 
                            className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3.5 text-[12.5px] text-stone-800 focus:outline-none focus:border-[#D9A58D] transition-colors font-light placeholder:text-stone-400" 
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-stone-500 mb-1.5 font-serif font-bold">Boletos Confirmados</label>
                            <select 
                              value={rsvpData.guests} 
                              onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })} 
                              className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-3.5 text-[12.5px] text-stone-700 focus:outline-none focus:border-[#D9A58D] transition-colors font-light"
                            >
                              <option value="1">1 Persona</option>
                              <option value="2">2 Personas</option>
                              <option value="3">3 Personas</option>
                              <option value="4">4 Personas</option>
                              <option value="5">5 Personas</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-wider text-stone-500 mb-1.5 font-serif font-bold">Régimen Alimentario</label>
                            <select 
                              value={rsvpData.diet} 
                              onChange={(e) => setRsvpData({ ...rsvpData, diet: e.target.value })} 
                              className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-3.5 text-[12.5px] text-stone-700 focus:outline-none focus:border-[#D9A58D] transition-colors font-light"
                            >
                              <option value="Ninguna">Ninguna</option>
                              <option value="Vegano">Vegano / Vegetariano</option>
                              <option value="Sin Gluten">Sin Gluten</option>
                              <option value="Alergias">Alergias específicas</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-wider text-stone-500 mb-1.5 font-serif font-bold">Mensaje para los Novios</label>
                          <textarea 
                            rows={3} 
                            placeholder="¡Les enviamos todo nuestro amor en este gran viaje!" 
                            value={rsvpData.message} 
                            onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })} 
                            className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-4 py-3 text-[12.5px] text-stone-800 focus:outline-none focus:border-[#D9A58D] transition-colors font-light placeholder:text-stone-400 resize-none" 
                          />
                        </div>

                        {/* Interactive confirmation button */}
                        <button
                          type="submit"
                          disabled={isSubmittingRsvp}
                          className="w-full py-4 bg-gradient-to-r from-[#D9A58D] to-[#B07E66] text-white text-[11px] uppercase tracking-[0.25em] font-serif rounded-xl flex items-center justify-center space-x-2.5 shadow-lg active:scale-98 transition-all hover:opacity-95"
                        >
                          {isSubmittingRsvp ? (
                            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Confirmar Presencia</span>
                            </>
                          )}
                        </button>

                      </form>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        className="py-12 text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#A8BBA2]/15 border border-[#A8BBA2]/40 flex items-center justify-center mx-auto mb-6">
                          <Check className="w-8 h-8 text-[#A8BBA2]" />
                        </div>
                        <h3 className="font-serif text-[23px] text-stone-800 mb-2">¡Asistencia Confirmada!</h3>
                        <p className="text-stone-500 text-[12.5px] font-light max-w-[270px] mx-auto mb-6 leading-relaxed">
                          Gracias por registrar su asistencia, Sr(a). <strong>{rsvpData.name}</strong>. Nos dará una alegría infinita compartir este día con ustedes.
                        </p>
                        <button 
                          onClick={() => setRsvpSuccess(false)} 
                          className="px-6 py-2 bg-transparent border border-stone-300 hover:border-[#D9A58D] text-[9px] uppercase tracking-widest text-stone-600 rounded-lg transition-colors font-mono"
                        >
                          Modificar Registro
                        </button>
                      </motion.div>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </section>


            {/* EXQUISITE FOOTER - SAGE & GOLD */}
            <footer className="relative py-20 bg-[#F8F4EE] border-t border-stone-100 text-center px-4 overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(168,187,162,0.06)_0%,transparent_70%)] pointer-events-none" />
              
              <div className="max-w-xl mx-auto relative z-10">
                <span className="font-serif italic text-3xl text-[#D9A58D] mb-4 block">IM</span>
                <p className="text-[14px] font-serif text-stone-700 tracking-wider">Isabella & Mateo</p>
                <p className="text-[9px] uppercase tracking-[0.22em] text-stone-400 font-mono mt-1">21 . MARZO . 2027 — SAN MIGUEL DE ALLENDE</p>
                
                {/* Vintage Divider */}
                <div className="flex items-center justify-center space-x-4 my-8">
                  <div className="h-[0.5px] w-12 bg-stone-300" />
                  <span className="text-stone-400 text-xs font-serif">❦</span>
                  <div className="h-[0.5px] w-12 bg-stone-300" />
                </div>

                <p className="text-[9px] uppercase tracking-[0.35em] text-[#A8BBA2] font-mono">
                  AGENCIA CREATIVA DE BODAS DE ULTRA-LUJO
                </p>

                <div className="pt-8">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.pathname = '/'; }}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-transparent hover:bg-stone-100 border border-stone-300 text-stone-600 hover:text-stone-800 rounded-full font-serif text-[9px] uppercase tracking-widest transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
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
