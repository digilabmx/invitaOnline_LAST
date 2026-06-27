import React from 'react';
import { motion } from 'motion/react';
import { Palette, Share2, FileText, Settings } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Eliges tu diseño',
    description: 'Explora nuestra cuidada galería premium y selecciona la plantilla elegante que mejor coincida con el estilo de tu celebración.',
    icon: Palette
  },
  {
    number: '02',
    title: 'Nos envías información',
    description: 'Llenas un formulario web optimizado y seguro con tus fechas, ubicaciones de Google Maps, mesa de regalos, playlist y fotos.',
    icon: FileText
  },
  {
    number: '03',
    title: 'Personalizamos para ti',
    description: 'Un diseñador senior ajusta la tipografía, adapta los colores a tu paleta del evento y monta los elementos para lograr un look impecable.',
    icon: Settings
  },
  {
    number: '04',
    title: 'Compartes por WhatsApp',
    description: 'Te enviamos tu enlace definitivo de sitio seguro. Compártelo en segundos a todos tus invitados por WhatsApp, Messenger o correo.',
    icon: Share2
  }
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  } as const;

  const stepVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  } as const;

  return (
    <section id="como-funciona" className="py-24 bg-white relative overflow-hidden">
      {/* Visual luxury grid panel background */}
      <div className="absolute inset-0 bg-[radial-gradient(#eadecc_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-beige-500 block mb-3">
            El proceso refinado
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-beige-900 tracking-tight leading-tight">
            Cómo Creamos Tu Invitación <br />
            <span className="font-serif italic font-light text-luxury-beige-500">en solo cuatro sencillos pasos</span>
          </h2>
          <div className="h-[1px] w-20 bg-luxury-beige-300 mx-auto mt-6" />
        </div>

        {/* Desktop Step Flow Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-150px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative"
        >
          {/* Connecting line for screens lg */}
          <div className="hidden lg:block absolute top-[65px] left-[12%] right-[12%] h-[0.5px] border-t border-dashed border-luxury-beige-300/60 -z-0" />

          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="group relative flex flex-col items-center text-center z-10"
            >
              {/* Floating Number Accent */}
              <div className="font-display text-6xl md:text-7xl font-extralight tracking-tighter text-luxury-beige-100 group-hover:text-luxury-beige-200 transition-colors duration-300 select-none pb-2">
                {step.number}
              </div>

              {/* Icon Container with gold ring */}
              <div className="w-14 h-14 rounded-full bg-luxury-beige-50 border border-luxury-beige-200 flex items-center justify-center mb-6 shadow-sm group-hover:border-luxury-beige-500 group-hover:bg-luxury-beige-900 group-hover:text-white transition-all duration-300 -mt-8">
                <step.icon className="w-5 h-5 text-luxury-beige-600 group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Step Title & Desc */}
              <h3 className="font-serif text-lg text-luxury-beige-900 font-medium tracking-wide mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-xs text-luxury-beige-600 leading-relaxed font-light max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Micro-Helpful Guarantee tag */}
        <div className="text-center mt-20 pt-6 border-t border-luxury-beige-100 max-w-lg mx-auto">
          <p className="font-sans text-[11px] font-medium text-luxury-beige-700 uppercase tracking-widest">
            ¿Tienes dudas sobre los datos o fotos?
          </p>
          <p className="font-sans text-[10px] text-luxury-beige-400 mt-2">
            No te preocupes. Puedes adquirirlos hoy y enviarnos tu información después, una vez que la tengas consolidada.
          </p>
        </div>

      </div>
    </section>
  );
}
