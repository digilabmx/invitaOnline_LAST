import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloatingButton() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '524446500910';
  const defaultMessage = 'Hola! Me interesa conocer más sobre los diseños y precios para mis invitaciones digitales.';
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white/95 backdrop-blur-sm text-neutral-800 text-xs font-sans font-medium px-4 py-2.5 rounded-full border border-luxury-beige-200/60 shadow-lg shadow-neutral-900/5 hover:text-emerald-600 transition-colors cursor-pointer hidden md:flex items-center gap-2"
            id="whatsapp-tooltip"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            ¿Dudas? Chatea con nosotros
          </motion.a>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        id="whatsapp-floating-button"
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-950/20 hover:shadow-emerald-500/30 transition-shadow relative cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      >
        {/* Soft breathing pulse effect */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
        
        {/* Decorative inner circular gold border indicating high-end luxury feel */}
        <span className="absolute inset-1 rounded-full border border-emerald-400/20 pointer-events-none" />

        <MessageCircle className="w-6 h-6 transition-transform group-hover:rotate-12" />
      </motion.a>
    </div>
  );
}
