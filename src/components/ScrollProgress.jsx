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
        className="h-[2.5px] bg-gradient-to-r from-polaris-blue via-polaris-cyan to-white origin-left shadow-[0_0_10px_rgba(79,140,255,0.8)]"
        style={{ scaleX }}
      />
      
      {/* Subtle Scroll Percentage Milestone Counter (Desktop right edge) */}
      <div className="hidden lg:flex items-center gap-1.5 absolute top-3 right-6 px-2.5 py-1 rounded-full bg-[#0A0A0E]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-polaris-muted">
        <span className="w-1.5 h-1.5 rounded-full bg-polaris-cyan animate-pulse"></span>
        <span>NAV {percentage}%</span>
      </div>
    </div>
  );
}
