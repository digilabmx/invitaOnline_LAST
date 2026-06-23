import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '../data';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#FAF9F6] relative overflow-hidden">
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-luxury-beige-200/20 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-beige-500 block mb-3">
            Atención al detalle
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-beige-900 tracking-tight leading-tight">
            Preguntas Frecuentes <br />
            <span className="font-serif italic font-light text-luxury-beige-500">sobre bodas e invitaciones web</span>
          </h2>
          <div className="h-[1px] w-16 bg-luxury-beige-300 mx-auto mt-6" />
        </div>

        {/* Accordions */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-luxury-beige-200/50 hover:border-luxury-beige-300 transition-colors duration-300 rounded-none shadow-sm"
              >
                {/* Trigger Row */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between text-left p-6 cursor-pointer focus:outline-none group"
                >
                  <span className="font-serif text-base text-luxury-beige-900 font-medium tracking-wide group-hover:text-luxury-beige-600 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <span className="shrink-0 p-1.5 rounded-full bg-luxury-beige-100 text-luxury-beige-600 group-hover:bg-luxury-beige-900 group-hover:text-white transition-all duration-300">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </span>
                </button>

                {/* Animated Inner Text Box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-luxury-beige-100 font-sans text-xs text-luxury-beige-700 leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Final auxiliary contact prompt */}
        <div className="text-center mt-16 max-w-md mx-auto">
          <p className="font-sans text-xs text-luxury-beige-600 font-light">
            ¿Tienes otra duda que no esté enlistada aquí?
          </p>
          <button
            onClick={() => {
              const text = encodeURIComponent("Hola, tengo dudas adicionales sobre los paquetes de invitaciones.");
              try {
                window.open(`https://wa.me/524446500910?text=${text}`, '_blank');
              } catch (e) {
                console.warn("Popup blocked:", e);
              }
            }}
            className="font-sans text-[11px] font-medium tracking-widest text-luxury-beige-900 uppercase border-b border-luxury-beige-900 hover:text-luxury-beige-600 hover:border-luxury-beige-500 pb-0.5 mt-3 inline-block transition-colors cursor-pointer"
          >
            Preguntar directo por WhatsApp
          </button>
        </div>

      </div>
    </section>
  );
}
