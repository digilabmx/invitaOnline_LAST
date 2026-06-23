import React from 'react';
import { motion } from 'motion/react';
import { PACKAGES } from '../data';
import { Check, X, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { PricingPackage } from '../types';

export default function Pricing() {
  const handleRequestPackage = (pkg: PricingPackage) => {
    const text = `Hola InvitaOnline. Estoy interesado en contratar el Paquete *${pkg.name}* (Precio: ${pkg.originalPrice ? `~~${pkg.originalPrice}~~ ${pkg.price}` : pkg.price}) para la invitación digital de mi evento. Me gustaría recibir los pasos para comenzar.`;
    const message = encodeURIComponent(text);
    try {
      window.open(`https://wa.me/524446500910?text=${message}`, '_blank');
    } catch (e) {
      console.warn("Popup blocked:", e);
    }
  };

  return (
    <section id="precios" className="py-24 bg-[#FAF9F6] border-t border-luxury-beige-200/50 relative overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-luxury-beige-200/20 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-luxury-beige-300/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-beige-500 block mb-3">
            Inversión para tu evento
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-beige-900 tracking-tight leading-tight">
            Tarifas Transparentes <br />
            <span className="font-serif italic font-light text-luxury-beige-500">sin cargos ocultos ni sorpresas</span>
          </h2>
          <div className="h-[1px] w-20 bg-luxury-beige-300 mx-auto mt-6" />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
          {PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`relative bg-white p-8 md:p-10 rounded-none transition-all duration-500 ${
                pkg.popular
                  ? 'border-[2px] border-luxury-beige-500 shadow-2xl shadow-luxury-beige-900/10 scale-100 lg:scale-105 z-10'
                  : 'border border-luxury-beige-200/60 shadow-sm hover:shadow-lg'
              }`}
            >
              {/* Highlight ribbon for popular package */}
              {pkg.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-luxury-beige-500 text-white font-sans text-[9px] uppercase tracking-[0.25em] font-medium px-4 py-1.5 shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3 h-3" />
                  <span>Nuestra Recomendación</span>
                </div>
              )}

              {/* Package Header */}
              <div className="text-center pb-8 border-b border-luxury-beige-100">
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] font-light text-luxury-beige-500 mb-1">
                  Paquete
                </p>
                <h3 className="font-serif text-2xl text-luxury-beige-900 font-medium tracking-wide">
                  {pkg.name}
                </h3>
                <p className="font-sans text-xs text-luxury-beige-500 font-light mt-2 min-h-[32px] md:min-h-[40px] px-2 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Price Label */}
                <div className="mt-6 flex flex-col items-center justify-center">
                  {pkg.hasDiscount && (
                    <span className="font-sans text-xs line-through text-luxury-beige-400 font-light tracking-wide">
                      {pkg.originalPrice} MXN
                    </span>
                  )}
                  <div className="flex items-baseline space-x-1">
                    <span className="font-serif text-5xl font-light text-luxury-beige-900">{pkg.price}</span>
                    <span className="font-sans text-xs text-luxury-beige-500 uppercase tracking-widest font-light">MXN</span>
                  </div>
                </div>

                {/* Delivery tagline */}
                <p className="font-sans text-[10px] text-luxury-beige-500 italic mt-3 uppercase tracking-wider bg-luxury-beige-50 py-1.5 rounded-md px-4 inline-block">
                  ⏱ {pkg.deliveryTime}
                </p>
              </div>

              {/* Features List */}
              <ul className="py-8 space-y-4 text-left min-h-[320px]">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-luxury-beige-500 mt-0.5 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />
                    )}
                    <span className={`font-sans leading-relaxed font-light ${
                      feature.included ? 'text-luxury-beige-800' : 'text-gray-400 line-through'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleRequestPackage(pkg)}
                  className={`w-full py-3.5 font-sans text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                    pkg.popular
                      ? 'bg-luxury-beige-900 text-white hover:bg-luxury-beige-800 shadow-md shadow-luxury-beige-900/10'
                      : 'bg-white hover:bg-luxury-beige-900 hover:text-white text-luxury-beige-900 border border-luxury-beige-300'
                  }`}
                >
                  <Send className="w-3.5 h-3.5 opacity-80" />
                  <span>{pkg.buttonText}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security / Quality guarantee banner */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 bg-white border border-luxury-beige-200/50 p-6 max-w-4xl mx-auto rounded-3xl">
          <div className="flex items-center space-x-3 text-luxury-beige-600">
            <ShieldCheck className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-serif text-sm font-medium text-luxury-beige-900">Satisfacción y Calidad Garantizada</p>
              <p className="font-sans text-xs text-luxury-beige-500 font-light mt-0.5">Revisas y autorizas el boceto antes de que el link final sea publicado en web.</p>
            </div>
          </div>
          <div className="h-[1px] md:h-10 w-full md:w-[1px] bg-luxury-beige-200" />
          <p className="font-sans text-[11px] text-luxury-beige-400 uppercase tracking-widest text-center md:text-left">
            Pagos Seguros por Spei, Oxxo Pay y Tarjetas
          </p>
        </div>

      </div>
    </section>
  );
}
