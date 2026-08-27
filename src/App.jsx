import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustSignal from './components/TrustSignal';
import Services from './components/Services';
import SelectedWork from './components/SelectedWork';
import AiAutomationSection from './components/AiAutomationSection';
import PolarisDirection from './components/PolarisDirection';
import Process from './components/Process';
import TechCapabilities from './components/TechCapabilities';
import ImpactMetrics from './components/ImpactMetrics';
import AboutPolaris from './components/AboutPolaris';
import Footer from './components/Footer';
import ProjectInquiryModal from './components/ProjectInquiryModal';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const handleOpenInquiry = () => {
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white selection:bg-polaris-blue/30 selection:text-polaris-cyan relative overflow-x-hidden">
      {/* Preloader Sequence */}
      <Preloader />

      {/* Global Scroll Progress Indicator */}
      <ScrollProgress />


      {/* Header & Micro Announcement Bar */}
      <Header onOpenInquiry={handleOpenInquiry} />

      {/* Main Page Narrative Flow */}
      <main>
        {/* 01 — Hero Section */}
        <Hero onOpenInquiry={handleOpenInquiry} />

        {/* 02 — Trust & Capability Marquee Signal */}
        <TrustSignal />

        {/* 03 — Interactive Editorial Service System */}
        <Services onOpenInquiry={handleOpenInquiry} />

        {/* 04 — Selected Work Horizontal Scroll Gallery */}
        <SelectedWork onOpenInquiry={handleOpenInquiry} />

        {/* 05 — AI + Automation Systems Architecture */}
        <AiAutomationSection onOpenInquiry={handleOpenInquiry} />

        {/* 06 — Polaris Brand Philosophy & Direction System */}
        <PolarisDirection />

        {/* 07 — Process & Delivery Methodology */}
        <Process />

        {/* 08 — Technology Capabilities Matrix */}
        <TechCapabilities />

        {/* 09 — Impact Metrics & Standards */}
        <ImpactMetrics />

        {/* 10 — About Polaris Studio Narrative */}
        <AboutPolaris onOpenInquiry={handleOpenInquiry} />
      </main>

      {/* 11 — CTA & Architectural Footer */}
      <Footer onOpenInquiry={handleOpenInquiry} />

      {/* Project Inquiry Drawer Modal */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={handleCloseInquiry}
      />
    </div>
  );
}

export default App;