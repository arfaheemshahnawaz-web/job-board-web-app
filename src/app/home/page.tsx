import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import PainSection from './components/PainSection';
import RolesSection from './components/RolesSection';
import TestimonialsSection from './components/TestimonialsSection';
import DualCTASection from './components/DualCTASection';

export default function HomePage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: '#0D1117', color: '#F0F6FC' }}
    >
      <Header />
      <HeroSection />
      <PainSection />
      <RolesSection />
      <TestimonialsSection />
      <DualCTASection />
      <Footer />
    </main>
  );
}