import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, Shield, Award } from 'lucide-react';

export default function AboutPolaris({ onOpenInquiry }) {
  return (
    <section id="about" className="py-28 px-4 sm:px-8 bg-[var(--primary-black)] relative">
      <div className="max-w-7xl mx-auto space-y-16">

        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-circuit)]/10 text-[var(--primary-circuit)] border border-[var(--primary-circuit)]/20 text-xs font-mono backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary-signal)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary-circuit)]"></span>
              </span>
              <span>09 // ABOUT POLARIS</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold text-3xl sm:text-5xl text-[var(--primary-text)] leading-tight"
            >
              We combine strategy, design, engineering, and AI to build <span className="text-[var(--primary-text)]/[0] bg-clip-text bg-gradient-to-r from-[var(--primary-text)] via-[var(--primary-signal)] to-[var(--primary-circuit)] font-extrabold">systems that move businesses forward</span>.
            </motion.h2>

            <div className="space-y-4 text-[var(--primary-text)]/60 text-base leading-relaxed">
              <p>
                Polaris Technologies was founded on a simple principle: digital products should be built with intention, technical excellence, and clear direction. We reject the bloated agency models and generic off-the-shelf templates that leave enterprise clients with sluggish, uninspired software.
              </p>
              <p>
                Our team operates at the intersection of modern AI engineering and Framer-grade design. From high-throughput distributed backends to fluid user interfaces, every line of code and pixel we craft serves a distinct strategic purpose.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <button
                onClick={onOpenInquiry}
                className="px-6 py-3 rounded-full bg-[var(--primary-text)] text-[var(--primary-black)] font-semibold text-xs flex items-center gap-2 hover:bg-[var(--primary-circuit)] hover:text-[var(--primary-black)] transition-colors"
              >
                <span>Partner With Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Stats Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[var(--primary-black)]/20 border border-[var(--primary-border)]/10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--primary-circuit)]">POLARIS TECHNOLOGIES STANDARDS</span>
              <h3 className="font-display font-bold text-2xl text-[var(--primary-text)]">Our Engineering Codex</h3>
            </div>

            <div className="space-y-4 pt-4 border-t border-[var(--primary-border)]/10 text-[var(--primary-text)]/60">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary-circuit)] mt-2 shrink-0"></div>
                <div>
                  <span className="font-semibold text-[var(--primary-text)]">No Slop Code:</span> Clean, maintainable, modular React & Python/Go codebases with zero bloat.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary-signal)] mt-2 shrink-0"></div>
                <div>
                  <span className="font-semibold text-[var(--primary-text)]">Continuous Motion:</span> Motion design that feels weighty, smooth, and natural — never gimmicky.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--primary-text)] mt-2 shrink-0"></div>
                <div>
                  <span className="font-semibold text-[var(--primary-text)]">Security-First:</span> Strict data privacy, zero unauthorized LLM training on client data.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--primary-black)]/10 border border-[var(--primary-border)]/20 flex items-center justify-between text-xs font-mono text-[var(--primary-text)]/60">
              <span>LOCATION: GLOBAL / REMOTE</span>
              <span>EST. 2024</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
