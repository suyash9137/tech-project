import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState(null); // null | 'button' | 'link' | 'view' | 'explore'
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on mobile / touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const projectCard = target.closest('#work .group') || target.closest('[data-cursor="view"]');
      const ctaBtn = target.closest('[data-cursor="explore"]') || target.closest('button.bg-white');

      if (projectCard) {
        setHoverState('view');
      } else if (ctaBtn) {
        setHoverState('explore');
      } else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.group')
      ) {
        setHoverState('button');
      } else {
        setHoverState(null);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isExpanded = hoverState !== null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference hidden md:flex items-center justify-center rounded-full border border-polaris-blue/80 text-white font-mono text-[9px] tracking-widest uppercase font-bold overflow-hidden"
      animate={{
        x: position.x - (hoverState === 'view' || hoverState === 'explore' ? 24 : 16),
        y: position.y - (hoverState === 'view' || hoverState === 'explore' ? 24 : 16),
        width: hoverState === 'view' || hoverState === 'explore' ? 52 : isExpanded ? 36 : 28,
        height: hoverState === 'view' || hoverState === 'explore' ? 52 : isExpanded ? 36 : 28,
        borderColor: hoverState ? 'rgba(76, 201, 240, 1)' : 'rgba(79, 140, 255, 0.6)',
        backgroundColor: hoverState === 'view' || hoverState === 'explore' ? 'rgba(79, 140, 255, 0.2)' : 'rgba(0, 0, 0, 0)',
      }}
      transition={{ type: 'spring', stiffness: 450, damping: 25, mass: 0.15 }}
    >
      {hoverState === 'view' && <span>VIEW</span>}
      {hoverState === 'explore' && <span>GO</span>}
      {!hoverState && (
        <div className="w-1.5 h-1.5 rounded-full bg-polaris-cyan"></div>
      )}
    </motion.div>
  );
}
