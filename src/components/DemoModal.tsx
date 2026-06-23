import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, MapPin, Calendar, Clock, Gift, Users, Music, Image as ImageIcon, Send, Sparkles, CheckCircle } from 'lucide-react';
import { InvitationExample } from '../types';

interface DemoModalProps {
  example: InvitationExample | null;
  onClose: () => void;
}

export default function DemoModal({ example, onClose }: DemoModalProps) {
  if (!example) return null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'inicio' | 'detalles' | 'confirmar'>('inicio');
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  // Custom states for RSVP simulation
  const [guestName, setGuestName] = useState('');
  const [passesCount, setPassesCount] = useState('2');
  const [submittingRsvp, setSubmittingRsvp] = useState(false);
  const [rsvpCompleted, setRsvpCompleted] = useState(false);
  const [simulatedPayload, setSimulatedPayload] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    const timeoutId = setTimeout(() => {
      setToastMessage((prev) => prev === message ? null : prev);
    }, 4000);
    return () => clearTimeout(timeoutId);
  };

  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Set the target date: Sept 20, 2026
  const targetDate = new Date('2026-09-20T18:00:00').getTime();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      // Elegant, peaceful piano track appropriate for events
      try {
        const audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-serene-view-1641.mp3');
        audio.loop = true;
        audio.addEventListener('error', (e) => {
          console.warn("Audio failed to load or was blocked:", e);
        });
        audioRef.current = audio;
      } catch (err) {
        console.warn("Audio creation failed:", err);
      }
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Audio play blocked by browser config, checking support:", err);
          // Fallback user alert or toast
          showToast("Haz clic en reproducir nuevamente. El reproductor requiere interacción previa.");
        });
      }
    } else {
      showToast("El audio no está disponible en este momento.");
    }
  };

  const handleSimulateRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      showToast("Por favor ingresa tu nombre completo.");
      return;
    }

    setSubmittingRsvp(true);
    setTimeout(() => {
      const payloadText = `*CONFIRMACIÓN DE ASISTENCIA*\n\n¡Hola! Confirmo mi asistencia al evento de *${example.title}*:\n\n👤 *Nombre:* ${guestName}\n🎫 *Boletos/Lugares:* ${passesCount} personas\n✨ ¡Nos vemos pronto para celebrar juntos!`;
      setSimulatedPayload(payloadText);
      setSubmittingRsvp(false);
      setRsvpCompleted(true);
    }, 1200);
  };

  const handleOpenWhatsAppSim = () => {
    const encoded = encodeURIComponent(simulatedPayload);
    try {
      const win = window.open(`https://wa.me/524446500910?text=${encoded}`, '_blank');
      if (!win) {
        showToast("Por favor habilita las ventanas emergentes (popups) para abrir WhatsApp.");
      }
    } catch (e) {
      console.warn("Popup blocked by container sandbox policy:", e);
      showToast("La ventana externa fue bloqueada. Copiaremos la confirmación.");
    }
  };

  // Theme configuration helper
  const getThemeColors = () => {
    switch (example.category) {
      case 'Bodas':
        return {
          primary: 'bg-luxury-beige-900',
          accent: 'text-luxury-beige-600',
          accentBg: 'bg-luxury-beige-100',
          title: 'Sofia & Alejandro',
          tagline: '¡Nos casamos y queremos festejarlo contigo!',
          badge: 'Nuestra Unión'
        };
      case 'XV Años':
        return {
          primary: 'bg-rose-950',
          accent: 'text-rose-400',
          accentBg: 'bg-rose-50',
          title: 'Valentina',
          tagline: 'Mis Dulces XV Años. Una noche mágica de gala.',
          badge: 'Mis XV'
        };
      case 'Bautizos':
        return {
          primary: 'bg-emerald-950',
          accent: 'text-emerald-700',
          accentBg: 'bg-emerald-50',
          title: 'Bautizo de Mateo',
          tagline: 'Mi primer sacramento en compañía de mis padrinos.',
          badge: 'Santo Sacramento'
        };
      case 'Cumpleaños':
        return {
          primary: 'bg-stone-900',
          accent: 'text-amber-500',
          accentBg: 'bg-stone-800',
          title: 'Santiago 40th',
          tagline: 'Una noche de oro y buen jazz. ¡Ven a brindar!',
          badge: 'Brindis Especial'
        };
      default:
        return {
          primary: 'bg-luxury-beige-900',
          accent: 'text-luxury-beige-600',
          accentBg: 'bg-luxury-beige-100',
          title: 'Mi Fiesta',
          tagline: 'Un momento único.',
          badge: 'Especial'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-luxury-beige-950/80 backdrop-blur-md flex items-center justify-center p-4">
      {/* Absolute close on tap outside container */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Main Premium Container Layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative bg-[#faf9f6] max-w-5xl w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 border border-luxury-beige-300 shadow-2xl overflow-hidden min-h-[500px] lg:min-h-[700px]"
      >
        
        {/* Left Side: Simulation Controls & Desk Info */}
        <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-luxury-beige-200">
          <div>
            {/* Logo */}
            <div className="flex flex-col mb-8">
              <span className="font-display text-lg tracking-[0.25em] text-luxury-beige-900">
                INVITA
              </span>
              <span className="font-sans text-[6px] tracking-[0.6em] text-luxury-beige-500 -mt-0.5 ml-0.5">
                ONLINE
              </span>
            </div>

            {/* Simulated Label */}
            <div className="inline-flex items-center space-x-1.5 bg-luxury-beige-100 px-3 py-1 rounded-full mb-6">
              <Sparkles className="w-3 h-3 text-luxury-beige-500" />
              <p className="font-sans text-[8px] uppercase tracking-wider font-medium text-luxury-beige-700">
                Simulador Interactivo en Vivo
              </p>
            </div>

            {/* Detail */}
            <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-luxury-beige-900 mb-4 leading-tight">
              Estás probando la <br />
              <span className="font-serif italic font-light text-luxury-beige-500">invitación de {example.category}</span>
            </h3>
            <p className="font-sans text-xs text-luxury-beige-700 leading-relaxed font-light mb-8 max-w-sm">
              Esta pantalla de la derecha simula al 100% la experiencia real de un invitado al abrir el enlace por WhatsApp en su teléfono móvil. Interactúa con las pestañas y el reproductor de música.
            </p>

            {/* Interactive controller tips */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-xs bg-white p-4 border border-luxury-beige-200/50">
                <span className="p-1 px-2.5 bg-luxury-beige-100 font-serif font-bold text-luxury-beige-700">1</span>
                <div>
                  <p className="font-serif font-medium text-luxury-beige-900 leading-none">Música de fondo regulada</p>
                  <p className="font-sans text-[10px] text-luxury-beige-500 mt-1">Usa la perilla/botón flotante rosa o beige en el teléfono simulado. Se reproducirá un piano elegante.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs bg-white p-4 border border-luxury-beige-200/50">
                <span className="p-1 px-2.5 bg-luxury-beige-100 font-serif font-bold text-luxury-beige-700">2</span>
                <div>
                  <p className="font-serif font-medium text-luxury-beige-900 leading-none">Rellena el RSVP</p>
                  <p className="font-sans text-[10px] text-luxury-beige-500 mt-1">Navega a la Pestaña "Confirmar", ingresa tu nombre y prueba enviar la confirmación simulada por WhatsApp.</p>
                </div>
              </div>
            </div>

            {example.category === 'Bodas' && (
              <div className="mt-8 bg-[#FAF9F6] border border-[#A68966]/20 p-4 rounded-xl shadow-sm text-left">
                <p className="font-sans text-[9px] uppercase tracking-wider font-bold text-[#A68966] mb-1">
                  ✨ DETECTADA NUEVA PLANTILLA INMERSIVA DE LUJO
                </p>
                <p className="font-sans text-[10px] text-stone-600 leading-relaxed mb-3 font-light">
                  Hemos diseñado un demo en pantalla completa con sobre interactivo, sutiles pétalos flotantes y reproductor integrado para tu boda.
                </p>
                <a
                  href="#templateboda"
                  className="inline-flex items-center space-x-1.5 px-3 py-2 bg-[#A68966] hover:bg-[#8F7250] text-[#fbfbfa] text-[9px] font-sans font-bold uppercase tracking-wider rounded-lg transition-colors w-full justify-center shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Ver Demo Completa Inmersiva</span>
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-luxury-beige-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs font-sans uppercase tracking-widest text-luxury-beige-700 hover:text-luxury-beige-900 border-b border-luxury-beige-700 hover:border-luxury-beige-900 pb-0.5"
            >
              ← Volver a ver modelos
            </button>
            <p className="font-sans text-[9px] text-luxury-beige-400 uppercase tracking-widest leading-none">
              InvitaOnline Tech © 2026
            </p>
          </div>
        </div>

        {/* Right Side: Virtual Mobile Device Screen */}
        <div className="lg:col-span-6 bg-luxury-beige-900/10 p-6 md:p-12 flex items-center justify-center relative overflow-hidden">
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white border border-luxury-beige-200 text-luxury-beige-800 hover:text-white hover:bg-luxury-beige-900 transition-all cursor-pointer z-35"
            aria-label="Cerrar simulador"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Virtual phone housing */}
          <div className="relative w-full max-w-[340px] bg-white rounded-[3rem] p-3 border border-luxury-beige-200 shadow-2xl z-10 flex flex-col justify-between">
            
            {/* Camera island on phone */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-black rounded-full z-30 flex items-center justify-between px-3">
              <div className="w-2 h-2 rounded-full bg-neutral-900 border" />
              <div className="w-10 h-0.5 bg-neutral-800 rounded-full" />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
            </div>

            {/* Main Inside Phone Container */}
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[9/18] bg-[#fbfbfa] flex flex-col z-10">
              
              {/* Image Banner top Header Cover relative */}
              <div className="relative w-full h-[180px] shrink-0 overflow-hidden bg-luxury-beige-100">
                <img
                  src={example.image}
                  alt={example.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#fbfbfa] via-black/10 to-transparent" />
                
                {/* Floating ambient audio action */}
                <button
                  onClick={toggleMusic}
                  className={`absolute right-4 bottom-4 w-9 h-9 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg outline-none transition-all duration-300 z-20 ${
                    isPlaying ? `${themeColors.primary} scale-110` : 'bg-black/60 hover:bg-black/80'
                  }`}
                  aria-label="Play music"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 animate-spin-slow text-luxury-gold-300" />
                  ) : (
                    <Play className="w-4 h-4 text-white pl-0.5" />
                  )}
                </button>

                {/* Simulated Floating Leaf decoration for Wedding/XV */}
                <div className="absolute left-4 top-4 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-luxury-beige-200/40">
                  <p className="font-display text-[8px] uppercase tracking-wider text-luxury-beige-800 font-bold">
                    {themeColors.badge}
                  </p>
                </div>
              </div>

              {/* Invitation body container which handles tab navigation elements */}
              <div className="p-5 flex-1 flex flex-col justify-between overflow-y-auto text-center" style={{ scrollbarWidth: 'none' }}>
                
                <AnimatePresence mode="wait">
                  {/* Tab 1: INICIO CONTAINER */}
                  {activeTab === 'inicio' && (
                    <motion.div
                      key="inicio-tab"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col flex-1 justify-between py-1"
                    >
                      <div>
                        {/* Golden Monogram Header Icon */}
                        <div className="w-10 h-10 rounded-full border-t border-luxury-beige-300 mx-auto flex items-center justify-center mb-3">
                          <span className="font-display text-xs tracking-wider text-luxury-beige-500 font-bold">
                            {themeColors.title[0]}
                          </span>
                        </div>

                        {/* Title of Couple/Event */}
                        <h4 className="font-serif text-xl md:text-2xl text-luxury-beige-950 font-normal tracking-wide mb-1 px-4 leading-normal">
                          {themeColors.title}
                        </h4>
                        
                        {/* Sub tagline */}
                        <p className="font-sans text-[10px] text-luxury-beige-500 uppercase tracking-widest mb-4">
                          {themeColors.tagline}
                        </p>

                        <div className="h-[0.5px] w-12 bg-luxury-beige-300 mx-auto mb-4" />

                        {/* Event Date Block */}
                        <div className="inline-flex items-center space-x-2 text-luxury-beige-800 mb-6 font-sans text-xs">
                          <Calendar className="w-3.5 h-3.5 text-luxury-beige-500" />
                          <span className="tracking-wide">Septiembre 20, 2026</span>
                        </div>

                        {/* Countdown Grid */}
                        <div className="bg-luxury-beige-100 p-3.5 rounded-xl border border-luxury-beige-200-50 max-w-[240px] mx-auto">
                          <p className="font-sans text-[8px] uppercase tracking-widest text-luxury-beige-400 mb-2 font-medium">
                            Faltan para el gran día:
                          </p>
                          <div className="grid grid-cols-4 gap-2">
                            <div>
                              <p className="font-serif text-lg font-semibold text-luxury-beige-900 leading-none">{days}</p>
                              <p className="font-sans text-[6px] text-luxury-beige-500 uppercase mt-1">Días</p>
                            </div>
                            <div>
                              <p className="font-serif text-lg font-semibold text-luxury-beige-900 leading-none">{hours}</p>
                              <p className="font-sans text-[6px] text-luxury-beige-500 uppercase mt-1">Hrs</p>
                            </div>
                            <div>
                              <p className="font-serif text-lg font-semibold text-luxury-beige-900 leading-none">{minutes}</p>
                              <p className="font-sans text-[6px] text-luxury-beige-500 uppercase mt-1">Min</p>
                            </div>
                            <div>
                              <p className="font-serif text-lg font-semibold text-luxury-beige-900 leading-none">{seconds}</p>
                              <p className="font-sans text-[6px] text-luxury-beige-500 uppercase mt-1">Seg</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Small visual features notes */}
                      <p className="font-sans text-[8px] text-luxury-beige-400 uppercase tracking-widest mt-6">
                        ★ Ceremonia · Banquete · Brindis ★
                      </p>
                    </motion.div>
                  )}

                  {/* Tab 2: DETALLES CONTAINER */}
                  {activeTab === 'detalles' && (
                    <motion.div
                      key="detalles-tab"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 py-2"
                    >
                      {/* Ceremonia Block */}
                      <div className="bg-white p-3 border border-luxury-beige-200/50 rounded-lg text-left">
                        <div className="flex items-center space-x-2 text-luxury-beige-900 font-serif text-xs font-semibold pb-1.5 border-b border-luxury-beige-100">
                          <MapPin className="w-3.5 h-3.5 text-luxury-beige-600" />
                          <span>Misa de Acción de Gracias</span>
                        </div>
                        <p className="font-sans text-[10px] text-luxury-beige-700 leading-relaxed font-light mt-1.5">
                          <strong>Hora:</strong> 18:00 hrs. <br />
                          <strong>Lugar:</strong> Catedral Metropolitana de San Luis Potosí, Centro Histórico.
                        </p>
                        <button
                          onClick={() => showToast("Ubicación GPS: Abre Google Maps con la ruta hacia la Catedral de San Luis Potosí (Simulado).")}
                          className="mt-2 text-[9px] font-sans font-medium uppercase tracking-wider text-luxury-beige-700 hover:text-luxury-beige-900 flex items-center space-x-1"
                        >
                          <span>📍 Ver en Google Maps</span>
                        </button>
                      </div>

                      {/* Recepcion Block */}
                      <div className="bg-white p-3 border border-luxury-beige-200/50 rounded-lg text-left">
                        <div className="flex items-center space-x-2 text-luxury-beige-900 font-serif text-xs font-semibold pb-1.5 border-b border-luxury-beige-100">
                          <Users className="w-3.5 h-3.5 text-luxury-beige-600" />
                          <span>Banquete & Fiesta</span>
                        </div>
                        <p className="font-sans text-[10px] text-luxury-beige-700 leading-relaxed font-light mt-1.5">
                          <strong>Hora:</strong> 20:00 hrs (Siguiente). <br />
                          <strong>Lugar:</strong> Jardín de Eventos Quinta Hermosa, San Luis Potosí, S.L.P.
                        </p>
                        <button
                          onClick={() => showToast("Ubicación GPS: Abre Google Maps con la ruta hacia la Quinta Hermosa en San Luis Potosí (Simulado).")}
                          className="mt-2 text-[9px] font-sans font-medium uppercase tracking-wider text-luxury-beige-700 hover:text-luxury-beige-900 flex items-center space-x-1"
                        >
                          <span>📍 Ver Recepción GPS</span>
                        </button>
                      </div>

                      {/* Dress Code & Gifts */}
                      <div className="grid grid-cols-2 gap-2 text-left">
                        <div className="bg-white p-2.5 border border-luxury-beige-100 rounded-lg">
                          <p className="font-serif text-[10px] font-semibold text-luxury-beige-900">Vestimenta</p>
                          <p className="font-sans text-[9px] text-luxury-beige-600 mt-1 font-light leading-snug">Rigurosa Etiqueta. Hombres de traje, mujeres vestido largo.</p>
                        </div>
                        <div className="bg-white p-2.5 border border-luxury-beige-100 rounded-lg">
                          <p className="font-serif text-[10px] font-semibold text-luxury-beige-900">Regalos</p>
                          <p className="font-sans text-[9px] text-luxury-beige-600 mt-1 font-light leading-snug">Mesa Liverpool #54832 o Clabe BBVA 0124 5849 5214 (Para lluvia de sobres).</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab 3: CONFIRMAR CONTAINER */}
                  {activeTab === 'confirmar' && (
                    <motion.div
                      key="confirmar-tab"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col justify-between py-1"
                    >
                      {!rsvpCompleted ? (
                        <form onSubmit={handleSimulateRsvp} className="space-y-3.5 text-left flex-1">
                          <div>
                            <label className="font-serif text-[10px] font-semibold text-luxury-beige-900 block mb-1">
                              Nombre Completo de Invitados:
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Ej. Sr. Juan Pérez y Sra."
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              className="w-full p-2 border border-luxury-beige-300 rounded bg-white text-[11px] focus:outline-none focus:border-luxury-beige-600 font-sans"
                            />
                          </div>

                          <div>
                            <label className="font-serif text-[10px] font-semibold text-luxury-beige-900 block mb-1">
                              Número de boletos confirmados:
                            </label>
                            <select
                              value={passesCount}
                              onChange={(e) => setPassesCount(e.target.value)}
                              className="w-full p-2 border border-luxury-beige-300 rounded bg-white text-[11px] focus:outline-none focus:border-luxury-beige-600 font-sans"
                            >
                              <option value="1">1 Persona</option>
                              <option value="2">2 Personas (Pase de Pareja)</option>
                              <option value="3">3 Personas (Familiar)</option>
                              <option value="4">4 Personas (Familiar)</option>
                              <option value="5">5 Personas (Completo)</option>
                            </select>
                          </div>

                          <div className="pt-2">
                            <button
                              type="submit"
                              disabled={submittingRsvp}
                              className={`w-full py-2.5 rounded text-white font-sans text-[10px] uppercase tracking-widest flex items-center justify-center space-x-1.5 cursor-pointer ${themeColors.primary}`}
                            >
                              <span>{submittingRsvp ? 'Enviando...' : 'Confirmar Asistencia'}</span>
                            </button>
                          </div>

                          <p className="text-[8px] font-sans text-luxury-beige-400 text-center leading-normal">
                            Al hacer clic, el botón simulará el formateo del link directo a la cuenta de WhatsApp autorizada.
                          </p>
                        </form>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-3 text-center space-y-4">
                          <CheckCircle className="w-10 h-10 text-emerald-600 animate-bounce" />
                          <div>
                            <p className="font-serif text-sm font-semibold text-luxury-beige-900 leading-none">¡Asistencia Confirmada!</p>
                            <p className="font-sans text-[10px] text-luxury-beige-500 mt-1">El mensaje pre-formateado está listo para enviarse por canal de chat simulado:</p>
                          </div>
                          
                          <div className="bg-luxury-beige-100 p-2.5 border border-luxury-beige-200 text-left rounded w-full">
                            <pre className="font-sans text-[8px] text-luxury-beige-700 leading-relaxed whitespace-pre-wrap">
                              {simulatedPayload}
                            </pre>
                          </div>

                          <div className="flex gap-2 w-full">
                            <button
                              onClick={() => {
                                setRsvpCompleted(false);
                                setGuestName('');
                              }}
                              className="flex-1 py-2 border border-luxury-beige-300 bg-white font-sans text-[9px] uppercase tracking-wider text-luxury-beige-700 cursor-pointer"
                            >
                              Reiniciar
                            </button>
                            <button
                              onClick={handleOpenWhatsAppSim}
                              className={`flex-grow py-2 rounded text-white font-sans text-[9px] uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer bg-emerald-600 hover:bg-emerald-700`}
                            >
                              <Send className="w-2.5 h-2.5" />
                              <span>Enviar WhatsApp</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Simulated Device Bot Nav bar tabs indicator */}
              <div className="bg-white border-t border-luxury-beige-200/50 py-2.5 px-4 flex justify-around shrink-0 relative z-20">
                <button
                  onClick={() => {
                    setActiveTab('inicio');
                    setRsvpCompleted(false);
                  }}
                  className={`flex flex-col items-center cursor-pointer transition-colors ${
                    activeTab === 'inicio' ? themeColors.accent : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-[8px] font-sans uppercase mt-1 tracking-wider leading-none">Inicio</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('detalles');
                    setRsvpCompleted(false);
                  }}
                  className={`flex flex-col items-center cursor-pointer transition-colors ${
                    activeTab === 'detalles' ? themeColors.accent : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-[8px] font-sans uppercase mt-1 tracking-wider leading-none">Ubicación</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('confirmar');
                  }}
                  className={`flex flex-col items-center cursor-pointer transition-colors ${
                    activeTab === 'confirmar' ? themeColors.accent : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-[8px] font-sans uppercase mt-1 tracking-wider leading-none">R.S.V.P</span>
                </button>
              </div>

            </div>

          </div>

          {/* Underlay glowing rings in smartphone backplate */}
          <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-luxury-beige-400/20 animate-spin -z-10" style={{ animationDuration: '60s' }} />
        </div>

      </motion.div>

      {/* Elegant overlay Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-55 bg-neutral-900/95 backdrop-blur-md text-white border border-neutral-800 px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 font-sans text-xs max-w-sm text-center"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-beige-400 animate-ping shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
