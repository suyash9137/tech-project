import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

export default function PolarisDirection() {
  const pillars = [
    {
      title: 'DIRECTION',
      tagline: 'GUIDING INNOVATION',
      desc: 'We help executive founders navigate technology decisions with strategic direction, clarity, and forward momentum.',
      icon: (
        <svg className="w-6 h-6 text-[var(--primary-circuit)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'INNOVATION',
      tagline: 'BUILDING FUTURES',
      desc: 'AI automation, intelligent multi-agent workflows, and next-generation SaaS architectures built for market leadership.',
      icon: (
        <svg className="w-6 h-6 text-[var(--primary-circuit)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="5" r="2" fill="currentColor" />
          <circle cx="5" cy="12" r="2" fill="currentColor" />
          <circle cx="19" cy="12" r="2" fill="currentColor" />
          <circle cx="8" cy="19" r="2" fill="currentColor" />
          <circle cx="16" cy="19" r="2" fill="currentColor" />
          <line x1="12" y1="7" x2="5" y2="10" />
          <line x1="12" y1="7" x2="19" y2="10" />
          <line x1="5" y1="14" x2="8" y2="17" />
          <line x1="19" y1="14" x2="16" y2="17" />
          <line x1="8" y1="19" x2="16" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )
    },
    {
      title: 'PRECISION',
      tagline: 'EXCELLENCE IN CODE',
      desc: 'Pixel-perfect Framer-grade motion UI paired with zero-defect, production-tested backend systems.',
      icon: (
        <svg className="w-6 h-6 text-[var(--primary-circuit)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L20 20 L4 20 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 9L16 17 L8 17 Z" fill="currentColor" opacity="0.6" />
        </svg>
      )
    },
    {
      title: 'GROWTH',
      tagline: 'SCALABLE PRODUCTS',
      desc: 'Architectures engineered specifically to handle exponential user traffic, data pipelines, and business expansion.',
      icon: (
        <svg className="w-6 h-6 text-[var(--primary-circuit)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" strokeDasharray="4 2" />
          <path d="M12 3 C 17 3 21 7 21 12" stroke="var(--primary-circuit)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="21" cy="12" r="2" fill="var(--primary-circuit)" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-28 px-4 sm:px-8 bg-[var(--primary-black)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Animated Section Header */}
        <SectionHeader
          badge="05 // BRAND PHILOSOPHY"
          title="Technology should give businesses direction."
          highlightWord="direction"
          description="Polaris Technologies is a digital agency focused on AI automation, SaaS, and cutting-edge web solutions. We transform ideas into intelligent products that scale."
        />

        {/* 4 Pillars Grid Matching Brand Identity */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[var(--primary-black)]/20 border border-[var(--primary-text)]/10 space-y-4 hover:border-[var(--primary-circuit)]/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--primary-black)]/10 border border-[var(--primary-text)]/10 flex items-center justify-center group-hover:bg-[var(--primary-circuit)]/10 group-hover:border-[var(--primary-circuit)]/30 transition-all">
                {pillar.icon}
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[var(--primary-circuit)] uppercase">
                  {pillar.tagline}
                </span>
                <h3 className="font-display font-bold text-xl text-[var(--primary-text)] mt-1">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-xs text-[var(--primary-text)]/60 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}