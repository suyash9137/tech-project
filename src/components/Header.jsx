import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import PolarisLogo from './PolarisLogo';

export default function Header({ onOpenInquiry }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ['work', 'services', 'ai-systems', 'process', 'capabilities', 'about'];
      const scrollPos = window.scrollY + 200;

      for (let sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'AI Architecture', href: '#ai-systems', id: 'ai-systems' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'Capabilities', href: '#capabilities', id: 'capabilities' },
    { name: 'About', href: '#about', id: 'about' },
  ];

  return (
    <>
      {/* Announcement Micro-Bar */}
      <div className="bg-[#0A0A0F] border-b border-white/[0.06] text-xs font-mono py-2 px-4 text-center text-polaris-muted flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-polaris-blue/10 text-polaris-blue border border-polaris-blue/20">
          <span className="w-1.5 h-1.5 rounded-full bg-polaris-blue animate-pulse"></span>
          STATUS
        </span>
        <span>Available for Q3/Q4 Enterprise & Product Engineering</span>
        <span className="hidden sm:inline text-white/20">|</span>
        <a 
          href="#contact" 
          onClick={(e) => { e.preventDefault(); onOpenInquiry(); }}
          className="hidden sm:inline-flex items-center gap-1 text-white hover:text-polaris-blue transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-polaris-blue"
        >
          Book Consultation <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-500 px-4 sm:px-8`}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`flex items-center justify-between py-3.5 px-5 sm:px-7 rounded-2xl transition-all duration-500 ${
              scrolled
                ? 'bg-[#0A0A0E]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                : 'bg-transparent border border-transparent'
            }`}
          >
            {/* Official Navbar Polaris Logo */}
            <a href="#" className="flex items-center group">
              <PolarisLogo variant="navbar" size="md" />
            </a>

            {/* Desktop Navigation Links with Active Highlighting */}
            <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] p-1.5 rounded-full backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-white/10 text-polaris-cyan font-semibold border border-white/10 shadow-sm'
                        : 'text-polaris-muted hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Header Right Action CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenInquiry}
                className="relative group overflow-hidden rounded-full bg-white text-black px-5 py-2 text-xs font-semibold transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(79,140,255,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Start a Project
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-polaris-blue to-polaris-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 rounded-xl bg-white/[0.05] border border-white/10 hover:border-polaris-blue/40"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#060608]/95 backdrop-blur-2xl pt-32 px-6 pb-12 flex flex-col justify-between md:hidden"
          >
            <div className="space-y-6">
              <span className="text-xs font-mono text-polaris-muted tracking-widest uppercase">
                Navigation
              </span>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-display font-semibold text-white/80 hover:text-polaris-blue transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-40" />
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-4 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="text-xs font-mono text-center text-polaris-muted">
                hello@polaristechnologies.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
