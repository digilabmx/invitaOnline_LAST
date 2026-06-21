import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Inicio', href: '#' },
    { label: 'Beneficios', href: '#beneficios' },
    { label: 'Ejemplos', href: '#galeria' },
    { label: 'Cómo Funciona', href: '#como-funciona' },
    { label: 'Precios', href: '#precios' },
    { label: 'F.A.Q.', href: '#faq' },
  ];

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Hola InvitaOnline. Vi su sitio web y me gustaría obtener información sobre sus invitaciones digitales premium.");
    window.open(`https://wa.me/524446500910?text=${message}`, '_blank');
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-luxury-beige-50/80 backdrop-blur-xl border-b border-luxury-beige-200/40 py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Logo variant="compact" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans text-xs tracking-widest text-luxury-beige-800 hover:text-luxury-beige-500 uppercase transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-luxury-beige-500 after:transition-all after:duration-300 pb-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={handleWhatsAppContact}
              className="flex items-center space-x-2 bg-luxury-beige-900 hover:bg-luxury-beige-800 text-luxury-beige-100 font-sans text-xs uppercase tracking-widest px-6 py-2.5 rounded-full outline-none group border border-luxury-beige-900 transition-all duration-300 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-luxury-beige-300 group-hover:text-luxury-beige-100 transition-colors" />
              <span>Solicitar por WhatsApp</span>
              <ArrowRight className="w-3 h-3 text-luxury-beige-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-luxury-beige-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 top-[73px] bg-luxury-beige-50 z-40 lg:hidden flex flex-col px-8 py-12 border-t border-luxury-beige-200/50"
          >
            <nav className="flex flex-col space-y-6 mb-12">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="font-sans text-lg tracking-widest text-luxury-beige-900 hover:text-luxury-beige-600 uppercase"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-auto"
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleWhatsAppContact();
                }}
                className="w-full flex items-center justify-center space-x-3 bg-luxury-beige-900 hover:bg-luxury-beige-800 text-luxury-beige-100 font-sans text-xs uppercase tracking-widest py-3.5 rounded-full transition-all"
              >
                <MessageCircle className="w-5 h-5 text-luxury-beige-300" />
                <span>Solicitar por WhatsApp</span>
              </button>
              <p className="text-center text-[10px] text-luxury-beige-400 mt-4 tracking-widest font-sans uppercase">
                InvitaOnline © 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
