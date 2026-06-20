/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { InvitationExample } from './types';
import { EXAMPLES } from './data';

export default function App() {
  const [selectedExample, setSelectedExample] = useState<InvitationExample | null>(null);

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
      <Gallery onSelectExample={(ex) => setSelectedExample(ex)} />

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

      {/* Live-action Interactive Simulation Modal */}
      <AnimatePresence>
        {selectedExample && (
          <DemoModal
            example={selectedExample}
            onClose={() => setSelectedExample(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

