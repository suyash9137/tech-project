/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'], // Body/UI
        display: ['"Orbitron"', '"Plus Jakarta Sans"', 'sans-serif'], // Headlines/Data
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Polariss Technologies Token System - Exact values from Phase 1 design
        polarisBlack: '#0A0A0F',        // --polaris-black: Deep space black
        polarisSlate: '#121220',        // --polaris-slate: Dark slate for sections
        polarisCircuit: '#00F5FF',      // --polaris-circuit: Electric cyan (primary accent)
        polarisSignal: '#00FF88',       // --polaris-signal: Signal green
        polarisData: '#60EFFF',         // --polaris-data: Light cyan (secondary accent)
        polarisText: '#E0E6ED',         // --polaris-text: Soft white (primary text)
        polarisBorder: 'rgba(255, 255, 255, 0.08)',
        polarisBorderHover: 'rgba(255, 255, 255, 0.18)',
        // Additional colors for Tailwind utility classes
        polarisMuted: '#60EFFF80',      // --polaris-data with 50% opacity for muted text
        polarisCyan: '#00F5FF',         // --polaris-circuit: Electric cyan
        polarisBlue: '#60EFFF',         // --polaris-data: Light cyan (used as blue in UI)
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)', // Subtle orthographic grid
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 245, 255, 0.08) 0%, rgba(10, 10, 15, 0) 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'data-pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      spacing: {
        // 8px-based grid system from Phase 1 design
        '1': '0.25rem', // 4px
        '2': '0.5rem',  // 8px
        '3': '0.75rem', // 12px
        '4': '1rem',    // 16px
        '5': '1.25rem', // 20px
        '6': '1.5rem',  // 24px
        '7': '1.75rem', // 28px
        '8': '2rem',    // 32px
        '9': '2.25rem', // 36px
        '10': '2.5rem', // 40px
        '11': '2.75rem',// 44px
        '12': '3rem',   // 48px
        '14': '3.5rem', // 56px
        '16': '4rem',   // 64px
        '20': '5rem',   // 80px
        '24': '6rem',   // 96px
        '28': '7rem',   // 112px
        '32': '8rem',   // 128px
      },
    },
  },
  plugins: [],
}