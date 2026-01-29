import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import PromiseSection from './components/PromiseSection';
import ImpactsSection from './components/ImpactsSection';
import PartnerSection from './components/PartnerSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';
import DarkModeToggle from './components/DarkModeToggle';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <NoiseOverlay />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <PromiseSection />
        <ImpactsSection />
        <PartnerSection />
        <ContactSection />
      </main>
      <Footer />
      <DarkModeToggle />
    </div>
  );
};

export default App;