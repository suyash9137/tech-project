import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, Shield, Award } from 'lucide-react';

export default function AboutPolaris({ onOpenInquiry }) {
  return (
    <section id="about" className="py-28 px-4 sm:px-8 bg-[#060608] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-polaris-blue/10 text-polaris-blue border border-polaris-blue/20 text-xs font-mono backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-polaris-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-polaris-blue"></span>
              </span>
              <span>09 // ABOUT POLARIS</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold text-3xl sm:text-5xl text-white leading-tight"
            >
              We combine strategy, design, engineering, and AI to build <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-polaris-cyan to-polaris-blue font-extrabold">systems that move businesses forward</span>.
            </motion.h2>

            <div className="space-y-4 text-polaris-muted text-base leading-relaxed">
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
                className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-polaris-blue hover:text-white transition-colors"
              >
                <span>Partner With Us</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Stats Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0D0D14] border border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <span className="text-xs font-mono text-polaris-blue">POLARIS STUDIO STANDARDS</span>
              <h3 className="font-display font-bold text-2xl text-white">Our Engineering Codex</h3>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-polaris-blue mt-2 shrink-0"></div>
                <div>
                  <span className="font-semibold text-white">No Slop Code:</span> Clean, maintainable, modular React & Python/Go codebases with zero bloat.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-polaris-cyan mt-2 shrink-0"></div>
                <div>
                  <span className="font-semibold text-white">Continuous Motion:</span> Motion design that feels weighty, smooth, and natural — never gimmicky.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0"></div>
                <div>
                  <span className="font-semibold text-white">Security-First:</span> Strict data privacy, zero unauthorized LLM training on client data.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between text-xs font-mono text-polaris-muted">
              <span>LOCATION: GLOBAL / REMOTE</span>
              <span>EST. 2024</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
