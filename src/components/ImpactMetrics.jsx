import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Layers, Trophy } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function ImpactMetrics() {
  const metrics = [
    {
      title: 'Built for Scale',
      subtitle: 'Cloud-native infrastructure engineered to handle millions of requests without degradation.',
      badge: 'ENTERPRISE STABILITY',
      icon: Layers
    },
    {
      title: 'Engineered for Automation',
      subtitle: 'Eliminating repetitive human operational tasks through bespoke AI agent workflows.',
      badge: 'EFFICIENCY GAIN',
      icon: Zap
    },
    {
      title: 'Optimized for Growth',
      subtitle: 'Framer-grade design systems built to maximize user retention and executive conversion.',
      badge: 'MEASURABLE LIFT',
      icon: Trophy
    },
    {
      title: 'Zero Security Compromise',
      subtitle: 'SOC2 compliant data isolation, post-quantum readiness, and end-to-end encryption.',
      badge: 'SECURITY FIRST',
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-8 bg-[var(--primary-slate)] border-y border-white/[0.04] relative">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Animated Section Header */}
        <SectionHeader
          badge="08 // GUARANTEES"
          title="Qualitative Impact & Standards"
          highlightWord="Standards"
          description="No invented marketing fluff. Pure engineering discipline, strategic clarity, and measurable business impact."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-[var(--primary-black)]/20 border border-[var(--primary-border)]/10 space-y-4 hover:border-[var(--primary-circuit)]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--primary-circuit)]/10 border border-[var(--primary-circuit)]/20 flex items-center justify-center text-[var(--primary-circuit)]">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[var(--primary-signal)] bg-[var(--primary-signal)]/10 px-2.5 py-0.5 rounded border border-[var(--primary-signal)]/20 inline-block">
                  {m.badge}
                </span>
                <h3 className="font-display font-bold text-xl text-[var(--primary-text)]">
                  {m.title}
                </h3>
                <p className="text-sm text-[var(--primary-text)]/60 leading-relaxed">
                  {m.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
