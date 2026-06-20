import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  const handleWhatsAppContact = () => {
    const text = `Hola InvitaOnline. Estoy listo para diseñar mi invitación digital premium. ¿Me podrían indicar los pasos iniciales?`;
    const message = encodeURIComponent(text);
    window.open(`https://wa.me/5215512345678?text=${message}`, '_blank');
  };

  return (
    <section className="relative py-28 overflow-hidden bg-luxury-beige-900 text-white text-center">
      {/* Decorative premium lights inside dark slate */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] rounded-full bg-luxury-beige-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-luxury-beige-700/15 blur-[120px] pointer-events-none" />

      {/* Floating Sparkles decorative */}
      <div className="absolute top-12 left-12 opacity-30 animate-pulse">
        <Sparkles className="w-5 h-5 text-luxury-beige-300" />
      </div>
      <div className="absolute bottom-12 right-12 opacity-30 animate-pulse">
        <Sparkles className="w-5 h-5 text-luxury-beige-300" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Spark decoration label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-light text-luxury-beige-200">
            Comienza hoy mismo
          </span>
        </motion.div>

        {/* Big Premium Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.15] mb-8"
        >
          Tu evento merece una <br />
          <span className="font-serif italic font-light text-luxury-beige-300">invitación extraordinaria</span>
        </motion.h2>

        {/* Dynamic micro-pitch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-sans text-xs sm:text-sm text-luxury-beige-200 font-light max-w-xl mx-auto leading-relaxed mb-12"
        >
          Únete a cientos de novios, quinceañeras y anfitriones que decidieron dar una primera impresión fascinante, ahorrando presupuesto de papelería sin restar elegancia.
        </motion.p>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button
            onClick={handleWhatsAppContact}
            className="inline-flex items-center space-x-3 bg-white hover:bg-luxury-beige-100 text-luxury-beige-950 px-10 py-4.5 rounded-full font-sans text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-xl shadow-black/30 hover:scale-[1.02] cursor-pointer group"
          >
            <MessageCircle className="w-4 h-4 fill-luxury-beige-900 text-luxury-beige-900 group-hover:scale-110 transition-transform" />
            <span>Solicitar por WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 text-luxury-beige-700 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Bottom security micro-assurance */}
        <div className="mt-12 text-center text-[10px] tracking-wider text-luxury-beige-300/60 uppercase font-sans">
          Asistencia Telefónica 100% personalizada · Alta disponibilidad certificada
        </div>

      </div>
    </section>
  );
}
