import React from 'react';

/**
 * Polaris Technologies Official Brand Logo Component
 * - variant="navbar": Uses the exact transparent navbar logo image (/polaris-logo-navbar.png) exclusively for the Header navbar.
 * - variant="icon": Uses /polaris-logo-icon.png for Hero / Preloader matrix anchors.
 * - variant="horizontal" | "stacked": Uses /polaris-logo-full.png for Footer / general branding.
 */
export default function PolarisLogo({
  variant = 'horizontal', // 'navbar' | 'horizontal' | 'stacked' | 'icon'
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = ''
}) {
  // Size dimensions for navbar logo
  const navbarSizes = {
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-10 sm:h-12 w-auto',
    lg: 'h-12 sm:h-15 w-auto',
    xl: 'h-16 sm:h-20 w-auto',
  };

  const iconSizes = {
    sm: 'h-8 w-auto',
    md: 'h-11 sm:h-12 w-auto',
    lg: 'h-14 sm:h-16 w-auto',
    xl: 'h-20 sm:h-24 w-auto',
  };

  const fullSizes = {
    sm: 'h-8 sm:h-9 w-auto',
    md: 'h-11 sm:h-13 w-auto',
    lg: 'h-14 sm:h-18 w-auto',
    xl: 'h-24 sm:h-32 w-auto',
  };

  if (variant === 'navbar') {
    const sizeClass = navbarSizes[size] || navbarSizes.md;
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src="/polaris-logo-navbar.png"
          alt="POLARIS TECHNOLOGIES"
          className={`${sizeClass} object-contain drop-shadow-[var(--shadow-circuit-0-0-20px-0-4)] transition-transform duration-300 hover:scale-[1.02]`}
        />
      </div>
    );
  }

  if (variant === 'icon') {
    const sizeClass = iconSizes[size] || iconSizes.md;
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <img
          src="/polaris-logo-icon.png"
          alt="Polaris Emblem"
          className={`${sizeClass} object-contain mix-blend-screen drop-shadow-[var(--shadow-circuit-0-0-15px-0-5)]`}
        />
      </div>
    );
  }

  const sizeClass = fullSizes[size] || fullSizes.md;

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src="/polaris-logo-full.png"
        alt="POLARIS TECHNOLOGIES"
        className={`${sizeClass} object-contain mix-blend-screen drop-shadow-[var(--shadow-circuit-0-0-20px-0-4)] transition-transform duration-300 hover:scale-[1.02]`}
      />
    </div>
  );
}
