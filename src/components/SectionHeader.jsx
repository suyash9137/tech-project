import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionHeader Component — Adds Framer-level live scroll animations to section headers:
 * - Animated signal badge with pulsing vector beacon
 * - Staggered headline word reveal on scroll (whileInView)
 * - Self-drawing gradient vector line (scaleX animation)
 * - Shimmering gradient text effects
 */
export default function SectionHeader({
  badge,
  title,
  highlightWord,
  titleSuffix = '',
  description,
  rightElement = null,
  className = ''
}) {
  const words = title ? title.split(' ') : [];

  return (
    <div className={`space-y-4 pb-8 border-b border-white/[0.08] relative ${className}`}>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Left Headline Column */}
        <div className="space-y-3 max-w-2xl">
          
          {/* Live Signal Badge */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-polaris-blue/10 text-polaris-blue border border-polaris-blue/20 text-xs font-mono backdrop-blur-md relative group overflow-hidden"
          >
            {/* Pulsing signal beacon dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-polaris-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-polaris-blue"></span>
            </span>
            <span className="tracking-wider uppercase">{badge}</span>
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
          </motion.div>

          {/* Staggered Word Reveal Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white leading-tight"
          >
            {words.map((word, idx) => {
              const isHighlight = highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());

              if (isHighlight) {
                return (
                  <span
                    key={idx}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-polaris-cyan to-polaris-blue animate-pulse-slow font-extrabold mr-2.5"
                  >
                    {word}{' '}
                  </span>
                );
              }

              return (
                <span key={idx} className="inline-block mr-2.5">
                  {word}{' '}
                </span>
              );
            })}
            {titleSuffix && <span className="text-white">{titleSuffix}</span>}
          </motion.h2>

        </div>

        {/* Right Column: Description or Right Element */}
        {description && (
          <motion.p
            initial={{ opacity: 0, opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-polaris-muted text-sm sm:text-base max-w-md leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {rightElement && (
          <div className="shrink-0">{rightElement}</div>
        )}

      </div>

      {/* Self-Drawing Animated Vector Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-polaris-blue/60 via-polaris-cyan/40 to-transparent origin-left pointer-events-none"
      />
    </div>
  );
}
