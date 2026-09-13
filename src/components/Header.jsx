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
      <div className="bg-[var(--primary-black)] border-b border-[var(--primary-border)] text-xs font-mono py-2 px-4 text-center text-[var(--primary-muted)] flex items-center justify-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--primary-circuit)]/10 text-[var(--primary-circuit)] border border-[var(--primary-circuit)]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-circuit)] animate-pulse"></span>
          STATUS
        </span>
        <span>Available for Q3/Q4 Enterprise & Product Engineering</span>
        <span className="hidden sm:inline text-[var(--primary-text)]/20">|</span>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); onOpenInquiry(); }}
          className="hidden sm:inline-flex items-center gap-1 text-[var(--primary-text)] hover:text-[var(--primary-circuit)] transition-colors underline underline-offset-4 decoration-[var(--primary-text)]/20 hover:decoration-[var(--primary-circuit)]"
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
                ? 'bg-[var(--primary-black)]/80 backdrop-blur-xl border border-[var(--primary-border)] shadow-[var(--shadow-black-0-0-30px-0-5)]'
                : 'bg-[var(--primary-transparent)] border-[var(--primary-transparent)]'
            }`}
          >
            {/* Official Navbar Polaris Logo */}
            <a href="#" className="flex items-center group">
              <PolarisLogo variant="navbar" size="md" />
            </a>

            {/* Desktop Navigation Links with Active Highlighting */}
            <nav className="hidden md:flex items-center gap-1 bg-[var(--primary-black)]/10 border border-[var(--primary-border)] p-1.5 rounded-full backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[var(--primary-text)]/10 text-[var(--primary-circuit)] font-semibold border border-[var(--primary-text)]/10 shadow-sm'
                        : 'text-[var(--primary-text)]/65 hover:text-[var(--primary-text)] hover:bg-[var(--primary-black)]/20'
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
                className="relative group overflow-hidden rounded-full bg-[var(--primary-circuit)] text-[var(--primary-black)] px-5 py-2 text-xs font-semibold transition-transform active:scale-95 shadow-[var(--shadow-text-0-0-20px-0-1)] hover:shadow-[var(--shadow-circuit-0-0-25px-0-3)]"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Start a Project
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-circuit)] to-[var(--primary-signal)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[var(--primary-text)] p-2 rounded-xl bg-[var(--primary-black)]/20 border border-[var(--primary-border)] hover:border-[var(--primary-circuit)]/40"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[var(--primary-text)]" /> : <Menu className="w-5 h-5 text-[var(--primary-text)]" />}
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
            className="fixed inset-0 z-30 bg-[var(--primary-black)]/95 backdrop-blur-2xl pt-32 px-6 pb-12 flex flex-col justify-between md:hidden"
          >
            <div className="space-y-6">
              <span className="text-xs font-mono text-[var(--primary-muted)] tracking-widest uppercase">
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
                    className="text-2xl font-display font-semibold text-[var(--primary-text)]/80 hover:text-[var(--primary-circuit)] transition-colors flex items-center justify-between"
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
                className="w-full py-4 rounded-xl bg-[var(--primary-circuit)] text-[var(--primary-black)] font-semibold text-sm flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="text-xs font-mono text-center text-[var(--primary-text)]/60">
                hello@polaristechnologies.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
