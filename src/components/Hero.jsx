import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Compass, Sparkles, Activity } from 'lucide-react';
import PolarisLogo from './PolarisLogo';
import MagneticButton from './MagneticButton';

export default function Hero({ onOpenInquiry }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();

  // Scroll transformation calculations
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.1]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.94]);
  const heroY = useTransform(scrollY, [0, 500], [0, -60]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate normalized coords (-1 to +1)
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      className="relative min-h-[92vh] pt-36 pb-20 px-4 sm:px-8 flex flex-col justify-between overflow-hidden"
    >
      {/* Layer 1: Background Ambient Glow & Parallax (2-5px shift) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-glow pointer-events-none opacity-60 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mousePosition.x * 4}px), ${mousePosition.y * 4}px)`
        }}
      ></div>
      
      {/* Background grid mesh */}
      <div className="absolute inset-0 bg-grid-mesh opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Narrative — Layer 3: Foreground (1-3px shift) */}
          <div
            className="lg:col-span-7 space-y-8 transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`
            }}
          >
            
            {/* Top Signal Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-polaris-blue animate-pulse"></div>
              <span className="text-xs font-mono tracking-wider text-polaris-muted uppercase">
                POLARIS DIGITAL ENGINEERING TECHNOLOGIES
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white">
                We build <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-polaris-muted">intelligent</span> digital products.
              </h1>
              <p className="text-lg sm:text-xl text-polaris-muted font-normal max-w-2xl leading-relaxed">
                AI automation, SaaS platforms, custom software, and digital experiences engineered for the next stage of growth.
              </p>
            </motion.div>

            {/* CTAs with Magnetic Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton
                onClick={onOpenInquiry}
                className="px-7 py-4 rounded-full bg-white text-black font-semibold text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(79,140,255,0.4)]"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  const element = document.getElementById('work');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-4 rounded-full bg-white/[0.04] border border-white/[0.1] hover:border-white/20 text-white font-medium text-sm flex items-center gap-2 transition-all duration-300 hover:bg-white/[0.08]"
              >
                <span>Explore Our Work</span>
                <ChevronRight className="w-4 h-4 text-polaris-muted" />
              </MagneticButton>
            </motion.div>

            {/* Micro Capability Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-6 border-t border-white/[0.06] grid grid-cols-3 gap-4 max-w-lg"
            >
              <div>
                <div className="text-xs font-mono text-polaris-muted uppercase">SPECIALIZATION</div>
                <div className="text-sm font-medium text-white mt-1">AI & SaaS Systems</div>
              </div>
              <div>
                <div className="text-xs font-mono text-polaris-muted uppercase">DELIVERY</div>
                <div className="text-sm font-medium text-white mt-1">Framer-Grade Motion</div>
              </div>
              <div>
                <div className="text-xs font-mono text-polaris-muted uppercase">PRECISION</div>
                <div className="text-sm font-medium text-white mt-1">Full-Stack Core</div>
              </div>
            </motion.div>

          </div>

          {/* Right Hero Visual Anchor — Layer 2: Midground Vector Matrix (5-10px shift) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full max-w-[440px] aspect-square flex items-center justify-center"
            >
              {/* Outer Vector Coordinate Ring */}
              <div 
                className="absolute inset-0 rounded-full border border-white/10 transition-transform duration-500 ease-out"
                style={{
                  transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 w-3 h-3 rounded-full bg-polaris-blue/40 border border-polaris-blue"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1.5 w-3 h-3 rounded-full bg-polaris-cyan/40 border border-polaris-cyan"></div>
              </div>

              {/* Middle Dotted Ring */}
              <div 
                className="absolute inset-8 rounded-full border border-dashed border-white/15 transition-transform duration-300 ease-out"
                style={{
                  transform: `translate(${mousePosition.x * -7}px, ${mousePosition.y * -7}px)`
                }}
              ></div>

              {/* Core Polaris Orbital Centerpiece */}
              <div className="relative w-64 h-64 rounded-3xl bg-[#0B0B10] border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-polaris-blue/10 via-transparent to-polaris-cyan/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Header coordinates */}
                <div className="flex items-center justify-between text-[10px] font-mono text-polaris-muted relative z-10">
                  <span className="flex items-center gap-1">
                    <Compass className="w-3 h-3 text-polaris-blue" />
                    SYS.NORTH
                  </span>
                  <span>99.98% PRECISION</span>
                </div>

                {/* Interactive Center Vector Symbol with Official Polaris Arrow Emblem */}
                <div className="my-auto text-center relative z-10 flex flex-col items-center justify-center">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Rotating outer ring */}
                    <div className="absolute inset-0 rounded-full border border-polaris-blue/30 border-t-polaris-blue animate-spin-slow"></div>
                    {/* Official Emblem */}
                    <PolarisLogo variant="icon" size="xl" />
                  </div>
                  <span className="text-[11px] font-mono text-polaris-muted mt-3 tracking-widest uppercase">
                    POLARIS DIRECTIONAL CORE
                  </span>
                </div>

                {/* Live Real-Time Coordinates Display */}
                <div className="flex items-center justify-between text-[11px] font-mono text-white/70 relative z-10 pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-polaris-cyan" />
                    X: {(mousePosition.x * 100).toFixed(1)}
                  </span>
                  <span>Y: {(mousePosition.y * 100).toFixed(1)}</span>
                </div>
              </div>

              {/* Floating Signal Badges */}
              <div 
                className="absolute -top-4 -right-2 px-3 py-1.5 rounded-lg bg-[#14141E] border border-white/10 text-xs font-mono text-white flex items-center gap-2 shadow-lg transition-transform duration-300"
                style={{ transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)` }}
              >
                <Sparkles className="w-3.5 h-3.5 text-polaris-blue" />
                <span>AI Agents & Workflows</span>
              </div>

              <div 
                className="absolute -bottom-4 -left-2 px-3 py-1.5 rounded-lg bg-[#14141E] border border-white/10 text-xs font-mono text-white flex items-center gap-2 shadow-lg transition-transform duration-300"
                style={{ transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * -12}px)` }}
              >
                <span className="w-2 h-2 rounded-full bg-polaris-cyan"></span>
                <span>Production Ready</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}