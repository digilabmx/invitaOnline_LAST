/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Gallery from './components/Gallery';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import { InvitationExample } from './types';
import { EXAMPLES } from './data';

// Lazily load massive fullscreen template components to keep index bundle extremely lightweight
const TemplateBoda = lazy(() => import('./components/TemplateBoda'));
const TemplateBoda2 = lazy(() => import('./components/templateboda2/TemplateBoda2'));
const TemplateBoda4 = lazy(() => import('./components/TemplateBoda4'));
const TemplateBoda5 = lazy(() => import('./components/TemplateBoda5'));
const TemplateBoda6 = lazy(() => import('./components/TemplateBoda6'));
const TemplateBoda7 = lazy(() => import('./components/TemplateBoda7'));
const TemplateBoda8 = lazy(() => import('./components/TemplateBoda8'));
const TemplateBoda9 = lazy(() => import('./components/TemplateBoda9'));

export default function App() {
  const [selectedExample, setSelectedExample] = useState<InvitationExample | null>(null);
  const [route, setRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash || window.location.pathname;
    }
    return '';
  });

  useEffect(() => {
    const handleNavigation = () => {
      setRoute(window.location.hash || window.location.pathname);
    };
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Sync hashes like #demo-xv, #demo-bautizo, #demo-cumpleanos to automatically trigger the simulation modal
  useEffect(() => {
    const handleHashCheck = () => {
      const currentHash = window.location.hash;
      if (currentHash === '#demo-xv') {
        const found = EXAMPLES.find(ex => ex.id === 'ex-2');
        if (found) setSelectedExample(found);
      } else if (currentHash === '#demo-bautizo') {
        const found = EXAMPLES.find(ex => ex.id === 'ex-3');
        if (found) setSelectedExample(found);
      } else if (currentHash === '#demo-cumpleanos') {
        const found = EXAMPLES.find(ex => ex.id === 'ex-4');
        if (found) setSelectedExample(found);
      } else {
        // Only close if we are not on one of the custom fullscreens
        if (!['#templateboda', '#templateboda2', '#templateboda4', '#templateboda5', '#templateboda6', '#templateboda7', '#templateboda8', '#templateboda9'].includes(currentHash)) {
          setSelectedExample(null);
        }
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const isTemplateBoda9 = route.toLowerCase().includes('templateboda9');
  const isTemplateBoda8 = route.toLowerCase().includes('templateboda8') && !isTemplateBoda9;
  const isTemplateBoda7 = route.toLowerCase().includes('templateboda7') && !isTemplateBoda8 && !isTemplateBoda9;
  const isTemplateBoda6 = route.toLowerCase().includes('templateboda6') && !isTemplateBoda7 && !isTemplateBoda8 && !isTemplateBoda9;
  const isTemplateBoda5 = route.toLowerCase().includes('templateboda5') && !isTemplateBoda6 && !isTemplateBoda7 && !isTemplateBoda8 && !isTemplateBoda9;
  const isTemplateBoda4 = route.toLowerCase().includes('templateboda4') && !isTemplateBoda5 && !isTemplateBoda6 && !isTemplateBoda7 && !isTemplateBoda8 && !isTemplateBoda9;
  const isTemplateBoda2 = route.toLowerCase().includes('templateboda2') && !isTemplateBoda4 && !isTemplateBoda5 && !isTemplateBoda6 && !isTemplateBoda7 && !isTemplateBoda8 && !isTemplateBoda9;
  const isTemplateBoda = (route.toLowerCase().includes('templateboda') || route.toLowerCase().includes('demo-boda')) && !isTemplateBoda2 && !isTemplateBoda4 && !isTemplateBoda5 && !isTemplateBoda6 && !isTemplateBoda7 && !isTemplateBoda8 && !isTemplateBoda9;

  if (isTemplateBoda9) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center font-serif text-cyan-200">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-300 animate-spin mb-4" />
          <p className="text-xs uppercase tracking-[0.25em]">Cargando Bóveda Celestial...</p>
        </div>
      }>
        <TemplateBoda9 />
      </Suspense>
    );
  }

  if (isTemplateBoda8) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#F8F4EE] flex flex-col items-center justify-center font-serif text-[#C96A45]">
          <div className="w-12 h-12 rounded-full border border-[#C96A45]/25 border-t-[#C96A45] animate-spin mb-4" />
          <p className="text-xs uppercase tracking-[0.25em]">Abriendo pliego heráldico...</p>
        </div>
      }>
        <TemplateBoda8 />
      </Suspense>
    );
  }

  if (isTemplateBoda7) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center font-serif text-stone-700">
          <div className="w-12 h-12 rounded-full border border-[#A8BBA2]/25 border-t-[#A8BBA2] animate-spin mb-4" />
          <p className="text-xs uppercase tracking-[0.25em]">Cargando Isabella & Mateo...</p>
        </div>
      }>
        <TemplateBoda7 />
      </Suspense>
    );
  }

  if (isTemplateBoda6) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center font-serif text-[#C8C8C8]">
          <div className="w-12 h-12 rounded-full border border-[#C8C8C8]/20 border-t-[#C8C8C8] animate-spin mb-4" />
          <p className="text-xs uppercase tracking-[0.25em]">Cargando Victoria & Sebastián...</p>
        </div>
      }>
        <TemplateBoda6 />
      </Suspense>
    );
  }

  if (isTemplateBoda5) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center font-serif text-[#D4AF37]">
          <div className="w-12 h-12 rounded-full border border-[#D4AF37]/25 border-t-[#D4AF37] animate-spin mb-4" />
          <p className="text-xs uppercase tracking-[0.25em]">Cargando Alta Costura Sofía & Alejandro...</p>
        </div>
      }>
        <TemplateBoda5 />
      </Suspense>
    );
  }

  if (isTemplateBoda4) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#F5F5F3] flex flex-col items-center justify-center font-serif text-stone-800">
          <div className="w-12 h-12 rounded-full border-2 border-stone-300 border-t-stone-800 animate-spin mb-4" />
          <p className="text-xs uppercase tracking-widest">Cargando Andrés & Paulete...</p>
        </div>
      }>
        <TemplateBoda4 />
      </Suspense>
    );
  }

  if (isTemplateBoda2) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#1c1917] flex flex-col items-center justify-center font-serif text-[#d4af37]">
          <div className="w-12 h-12 rounded-full border-2 border-[#d4af37]/20 border-t-[#d4af37] animate-spin mb-4" />
          <p className="text-xs uppercase tracking-widest">Cargando Black & Gold Gala...</p>
        </div>
      }>
        <TemplateBoda2 />
      </Suspense>
    );
  }

  if (isTemplateBoda) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center font-serif text-stone-800">
          <div className="w-12 h-12 rounded-full border-2 border-[#A68966]/20 border-t-[#A68966] animate-spin mb-4" />
          <p className="text-xs uppercase tracking-widest">Cargando Classic Rose...</p>
        </div>
      }>
        <TemplateBoda />
      </Suspense>
    );
  }

  const handleVerEjemplos = () => {
    const el = document.getElementById('galeria');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSolicitar = () => {
    const el = document.getElementById('precios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenDefaultDemo = () => {
    // Open Sofia & Alejandro Wedding template by default
    if (EXAMPLES.length > 0) {
      setSelectedExample(EXAMPLES[0]);
    }
  };

  return (
    <div className="relative min-h-screen bg-luxury-beige-50 font-sans selection:bg-luxury-beige-300 selection:text-luxury-beige-900 leading-normal antialiased">
      
      {/* Upper Progress line or ambient elements */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-luxury-beige-300 via-luxury-beige-500 to-luxury-beige-300 z-50 pointer-events-none" />

      {/* Main Header navigation */}
      <Header />

      {/* Hero Module with callback offsets */}
      <Hero
        onVerEjemplosClick={handleVerEjemplos}
        onSolicitarClick={handleSolicitar}
      />

      {/* Benefits Module */}
      <Benefits />

      {/* Active High-Fashion Gallery Grid */}
      <Gallery />

      {/* 4 Steps Tutorial */}
      <HowItWorks />

      {/* Pricing and service packaging tiers */}
      <Pricing />

      {/* Testimonials and slider */}
      <Testimonials />

      {/* FAQ Modern Accordion layout */}
      <FAQ />

      {/* Final Conversion Pitch */}
      <CTA />

      {/* Luxury Footer with Privacy notice drawer */}
      <Footer />

      {/* Floating Sticky helper WhatsApp button */}
      <WhatsAppFloatingButton />

      {/* Live-action Interactive Simulation Modal */}
      <AnimatePresence>
        {selectedExample && (
          <DemoModal
            example={selectedExample}
            onClose={() => {
              setSelectedExample(null);
              if (['#demo-xv', '#demo-bautizo', '#demo-cumpleanos'].includes(window.location.hash)) {
                window.location.hash = '';
              }
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

