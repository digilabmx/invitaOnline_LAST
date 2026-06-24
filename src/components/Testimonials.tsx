import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Autoplay
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' }
    })
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-luxury-beige-200/20">
      {/* Visual delicate framing line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-luxury-beige-200 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium text-luxury-beige-500 block mb-3">
            Opiniones de nuestros anfitriones
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-beige-900 tracking-tight leading-tight">
            Momentos Inolvidables <br />
            <span className="font-serif italic font-light text-luxury-beige-500">compartidos por nuestros clientes</span>
          </h2>
          <div className="h-[1px] w-16 bg-luxury-beige-300 mx-auto mt-6" />
        </div>

        {/* Carousel Framework */}
        <div className="relative min-h-[360px] flex flex-col items-center justify-center bg-luxury-beige-100/30 border border-luxury-beige-200/40 p-10 md:p-14 rounded-none">
          
          <Quote className="absolute top-8 left-8 w-14 h-14 text-luxury-beige-200/50 -z-0 pointer-events-none stroke-[1px]" />

          {/* Slider Animation Wrapper */}
          <div className="w-full relative overflow-hidden z-10 text-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col items-center"
              >
                {/* 5 Stars row */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-luxury-gold-400 text-luxury-gold-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="font-serif text-lg md:text-xl text-luxury-beige-900 font-light leading-relaxed mb-8 max-w-2xl px-4">
                  {current.text}
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4 mt-2">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-12 h-12 rounded-full border border-luxury-beige-300 object-cover select-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="text-left">
                    <p className="font-serif text-sm font-medium text-luxury-beige-900">{current.name}</p>
                    <p className="font-sans text-[10px] text-luxury-beige-500 uppercase tracking-widest mt-0.5">
                      {current.role} · <span className="italic normal-case font-serif">{current.date}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Arrow button */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-luxury-beige-200/60 hover:border-luxury-beige-400/80 bg-white/80 text-luxury-beige-800 transition-colors cursor-pointer z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow button */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-luxury-beige-200/60 hover:border-luxury-beige-400/80 bg-white/80 text-luxury-beige-800 transition-colors cursor-pointer z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Dots Indicators */}
        <div className="flex items-center justify-center space-x-2.5 mt-8">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === index
                  ? 'w-8 bg-luxury-beige-850 bg-luxury-beige-800'
                  : 'w-2 bg-luxury-beige-300 hover:bg-luxury-beige-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
