import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PolarisLogo from './PolarisLogo';

export default function Preloader({ onComplete }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 1300);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 bg-[var(--primary-black)] flex flex-col items-center justify-center pointer-events-none select-none"
        >
          <div className="relative flex flex-col items-center space-y-6">

            {/* Animated Logo Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <PolarisLogo variant="icon" size="xl" />
            </motion.div>

            {/* Drawing Directional Line */}
            <div className="w-48 h-[2px] bg-[var(--primary-text)]/[0.1] rounded-full overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-[var(--primary-circuit)] to-[var(--primary-data)]"
              />
            </div>

            {/* Subtitle Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-[11px] font-mono tracking-[0.3em] text-[var(--primary-muted)] uppercase"
            >
              POLARIS // DIRECTIONAL ENGINE
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
