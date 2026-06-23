import React, { useState } from 'react';
import { MessageCircle, Instagram, Facebook, Compass, ChevronUp, Shield, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    const timeoutId = setTimeout(() => {
      setToastMessage((prev) => prev === message ? null : prev);
    }, 4000);
    return () => clearTimeout(timeoutId);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSocialClick = (platform: string) => {
    showToast(`Redireccionando a nuestra cuenta oficial de ${platform} (Simulado para fines estáticos).`);
  };

  return (
    <footer className="bg-luxury-beige-100 border-t border-luxury-beige-200/50 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Upper row: Brand & Nav Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-luxury-beige-200/50">
          
          {/* Col 1: Brand details */}
          <div className="flex flex-col space-y-6">
            <a href="#" className="flex self-start group">
              <Logo variant="compact" />
            </a>
            <p className="font-sans text-xs text-luxury-beige-700 font-light leading-relaxed max-w-xs">
              Marca premium dedicada a la creación artistica y desarrollo tecnológico de invitaciones digitales inteligentes para los momentos más hermosos de la vida.
            </p>
            {/* Social icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleSocialClick('Instagram')}
                className="w-8 h-8 rounded-full border border-luxury-beige-300 flex items-center justify-center text-luxury-beige-700 hover:text-white hover:bg-luxury-beige-900 hover:border-luxury-beige-900 transition-all duration-300 cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSocialClick('Facebook')}
                className="w-8 h-8 rounded-full border border-luxury-beige-300 flex items-center justify-center text-luxury-beige-700 hover:text-white hover:bg-luxury-beige-900 hover:border-luxury-beige-900 transition-all duration-300 cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSocialClick('Pinterest')}
                className="w-8 h-8 rounded-full border border-luxury-beige-300 flex items-center justify-center text-luxury-beige-700 hover:text-white hover:bg-luxury-beige-900 hover:border-luxury-beige-900 transition-all duration-300 cursor-pointer"
                aria-label="Pinterest"
              >
                <Compass className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-sm font-semibold text-luxury-beige-900 uppercase tracking-wider">
              Explorar
            </h4>
            <ul className="space-y-3 font-sans text-xs font-light text-luxury-beige-700">
              <li><a href="#" className="hover:text-luxury-beige-500 transition-colors">Inicio</a></li>
              <li><a href="#beneficios" className="hover:text-luxury-beige-500 transition-colors">Beneficios Premium</a></li>
              <li><a href="#galeria" className="hover:text-luxury-beige-500 transition-colors">Galería de Ejemplos</a></li>
              <li><a href="#precios" className="hover:text-luxury-beige-500 transition-colors">Precios y Servicios</a></li>
            </ul>
          </div>

          {/* Col 3: Event Categories */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-sm font-semibold text-luxury-beige-900 uppercase tracking-wider">
              Categorías
            </h4>
            <ul className="space-y-3 font-sans text-xs font-light text-luxury-beige-700">
              <li><a href="#galeria" className="hover:text-luxury-beige-500 transition-colors">Bodas de Gala</a></li>
              <li><a href="#galeria" className="hover:text-luxury-beige-500 transition-colors">XV Años de Ensueño</a></li>
              <li><a href="#galeria" className="hover:text-luxury-beige-500 transition-colors">Baptismos y Presentaciones</a></li>
              <li><a href="#galeria" className="hover:text-luxury-beige-500 transition-colors">Aniversarios & Cumpleaños</a></li>
            </ul>
          </div>

          {/* Col 4: Contacts & Address */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-serif text-sm font-semibold text-luxury-beige-900 uppercase tracking-wider">
              Contacto
            </h4>
            <div className="space-y-3 font-sans text-xs font-light text-luxury-beige-700 leading-relaxed">
              <p>San Luis Potosí, SLP, México.</p>
              <p className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-luxury-beige-500" />
                <span>+52 444 650 0910</span>
              </p>
              <p>soporte@invitaonline.mx</p>
              <p className="text-[10px] uppercase tracking-wider font-medium text-luxury-beige-500">
                Atendemos de Lunes a Sábado · 09:00 - 18:00 hrs
              </p>
            </div>
          </div>

        </div>

        {/* Lower row: Copy notes & Scroll To Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 font-sans text-[11px] text-luxury-beige-500 font-light">
            <p>© {new Date().getFullYear()} InvitaOnline. Todos los derechos reservados.</p>
            <div className="h-3 w-[1px] bg-luxury-beige-200 hidden sm:block" />
            <button
              onClick={() => setShowPrivacy(true)}
              className="hover:text-luxury-beige-900 underline transition-colors cursor-pointer"
            >
              Aviso de Privacidad
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-beige-700 hover:text-luxury-beige-500 transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Slide-out Overlay panel for Aviso de Privacidad */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white max-w-xl w-full p-8 rounded-none border border-luxury-beige-300 font-sans text-xs text-luxury-beige-800 leading-relaxed max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-luxury-beige-200 mb-6">
                <div className="flex items-center space-x-2 text-luxury-beige-900 font-serif text-lg font-medium">
                  <Shield className="w-5 h-5 text-luxury-beige-600" />
                  <span>Aviso de Privacidad Simplificado</span>
                </div>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="p-1 px-2.5 bg-luxury-beige-150 rounded-none bg-luxury-beige-100 hover:bg-luxury-beige-200 uppercase tracking-widest text-[9px]"
                >
                  Cerrar
                </button>
              </div>

              <div className="space-y-4 font-light text-justify">
                <p>
                  <strong>InvitaOnline S.A. de C.V.</strong>, con domicilio en San Luis Potosí, SLP, es responsable del tratamiento y salvaguarda de los datos personales proporcionados por los usuarios.
                </p>
                <p>
                  <strong>¿Qué datos recabamos?</strong> Únicamente recabamos información de contacto, imágenes y logotipos del evento, nombres de contrayentes o cumpleañeros, ubicaciones de Google Maps y detalles de mesa de regalos estrictamente con la finalidad comercial elegida por el cliente para adaptarlos a su plantilla.
                </p>
                <p>
                  <strong>Finalidad de tratamiento:</strong> Los datos proporcionados se usarán únicamente para: los fines de personalización, publicación segura y temporal del enlace web contratado, y servicio post-venta.
                </p>
                <p>
                  <strong>Vigencia y Eliminación:</strong> Los datos y enlaces publicados estarán vigentes en internet de manera pública únicamente hasta 30 días posteriores al evento. Pasados estos días, el link queda inactivo y se borran permanentemente todas las imágenes y datos personales de nuestros servidores para garantizar su completa privacidad y evitar filtraciones o spam.
                </p>
                <p>
                  <strong>Derechos ARCO:</strong> En todo momento usted puede solicitar la cancelación adelantada del enlace web o la rectificación inmediata de sus datos enviándonos un mensaje directo a nuestra casilla de soporte.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-luxury-beige-100 flex justify-end">
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="px-6 py-2.5 bg-luxury-beige-900 text-white hover:bg-luxury-beige-800 uppercase tracking-widest text-[10px]"
                >
                  Entendido y Aceptar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

    </footer>
  );
}
