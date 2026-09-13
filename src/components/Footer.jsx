import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import PolarisLogo from './PolarisLogo';

export default function Footer({ onOpenInquiry }) {
  return (
    <footer className="bg-[var(--primary-black)] pt-24 pb-12 px-4 sm:px-8 border-t border-[var(--primary-border)]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Top CTA Banner */}
        <div className="p-10 sm:p-16 rounded-3xl bg-[var(--primary-black)]/20 border border-[var(--primary-border)]/10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="space-y-4 max-w-xl relative z-10">
            <span className="text-xs font-mono text-[var(--primary-circuit)] bg-[var(--primary-circuit)]/10 px-3 py-1 rounded-full border border-[var(--primary-circuit)]/20">
              READY TO BUILD WHAT'S NEXT?
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--primary-text)] tracking-tight">
              Tell us what you're building. We'll figure out the technology.
            </h2>
          </div>
          <button
            onClick={onOpenInquiry}
            className="px-8 py-5 rounded-full bg-[var(--primary-text)] text-[var(--primary-black)] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[var(--primary-circuit)] hover:text-[var(--primary-black)] transition-colors shrink-0 shadow-xl"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-8">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <PolarisLogo variant="horizontal" size="lg" />
            <p className="text-[var(--primary-text)]/60 max-w-sm leading-relaxed pt-2">
              Premium digital technology agency specializing in AI automation, SaaS development, web platforms, and digital transformation.
            </p>
          </div>

          {/* Navigation Link Column */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-[var(--primary-text)]/60 uppercase tracking-widest block">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-xs font-medium text-[var(--primary-text)]/80">
              <li><a href="#work" className="hover:text-[var(--primary-circuit)] transition-colors">Work</a></li>
              <li><a href="#services" className="hover:text-[var(--primary-circuit)] transition-colors">Services</a></li>
              <li><a href="#ai-systems" className="hover:text-[var(--primary-circuit)] transition-colors">AI Architecture</a></li>
              <li><a href="#process" className="hover:text-[var(--primary-circuit)] transition-colors">Process</a></li>
              <li><a href="#capabilities" className="hover:text-[var(--primary-circuit)] transition-colors">Capabilities</a></li>
              <li><a href="#about" className="hover:text-[var(--primary-circuit)] transition-colors">About</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-[var(--primary-text)]/65 uppercase tracking-widest block">
              SOLUTIONS
            </span>
            <ul className="space-y-2 text-xs font-medium text-[var(--primary-text)]/[0.8]">
              <li>AI & Automation</li>
              <li>SaaS Development</li>
              <li>Web Experiences</li>
              <li>UI/UX Product Design</li>
              <li>Custom Enterprise Core</li>
              <li>Digital Transformation</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-[var(--primary-text)]/65 uppercase tracking-widest block">
              CONTACT & SOCIAL
            </span>
            <ul className="space-y-2 text-xs font-medium text-[var(--primary-text)]/80">
              <li>
                <a href="mailto:hello@polaristechnologies.com" className="hover:text-[var(--primary-circuit)] transition-colors underline">
                  hello@polaristechnologies.com
                </a>
              </li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[var(--primary-circuit)] transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[var(--primary-circuit)] transition-colors">GitHub</a></li>
              <li><a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-[var(--primary-circuit)] transition-colors">X / Twitter</a></li>
            </ul>
          </div>

        </div>

        {/* Massive Editorial Wordmark */}
        <div className="py-12 border-t border-[var(--primary-border)]/10 text-center select-none overflow-hidden">
          <div className="font-display font-extrabold text-[12vw] sm:text-[14vw] leading-none tracking-tighter text-[var(--primary-text)]/[0.03] uppercase">
            POLARIS
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-[var(--primary-border)]/10 text-[var(--primary-text)]/65 font-mono">
          <div>
            © {new Date().getFullYear()} POLARIS TECHNOLOGIES INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>37.7749° N, 122.4194° W</span>
            <span>•</span>
            <span className="text-[var(--primary-signal)]">SYSTEM OPERATIONAL</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
