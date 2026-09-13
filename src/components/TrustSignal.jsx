import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Zap, Layers, Globe, Code2 } from 'lucide-react';

export default function TrustSignal() {
  const capabilities = [
    { label: 'Autonomous AI Agents', icon: Cpu },
    { label: 'Cloud-Native SaaS', icon: Globe },
    { label: 'Framer Motion Systems', icon: Zap },
    { label: 'Enterprise Security', icon: ShieldCheck },
    { label: 'Distributed Systems', icon: Layers },
    { label: 'Full-Stack Engineering', icon: Code2 },
  ];

  return (
    <section className="py-12 border-y border-[var(--primary-border)]/20 bg-[var(--primary-slate)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

          {/* Signal Headline */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[var(--primary-circuit)]"></span>
            <p className="text-xs font-mono tracking-widest text-[var(--primary-text)]/60 uppercase">
              TRUSTED BY HIGH-GROWTH ENTERPRISES & VISIONARY FOUNDERS
            </p>
          </div>

          {/* Capability Marquee Pills */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary-black)]/10 border border-[var(--primary-border)] text-[var(--primary-text)]/60 font-medium whitespace-nowrap hover:border-[var(--primary-circuit)]/40 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-[var(--primary-circuit)]" />
                  <span>{cap.label}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
