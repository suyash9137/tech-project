import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top Directional Line */}
      <motion.div
        className="h-[2.5px] bg-gradient-to-r from-[var(--primary-circuit)] via-[var(--primary-signal)] to-[var(--primary-text)] origin-left shadow-[var(--shadow-glow-circuit-0-0-10px-0-8)]"
        style={{ scaleX }}
      />
      
      {/* Subtle Scroll Percentage Milestone Counter (Desktop right edge) */}
      <div className="hidden lg:flex items-center gap-1.5 absolute top-3 right-6 px-2.5 py-1 rounded-full bg-[var(--primary-black)]/[0.8] backdrop-blur-md border border-[var(--primary-text)]/[0.1] text-[10px] font-mono text-[var(--primary-muted)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-circuit)] animate-pulse"></span>
        <span>NAV {percentage}%</span>
      </div>
    </div>
  );
}
