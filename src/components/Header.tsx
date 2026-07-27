'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(13, 17, 23, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(139, 148, 158, 0.1)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <AppLogo
            size={28}
            text="Deploy"
            iconName="BoltIcon"
            className="text-deploy-white"
          />
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a
  href="#roles"
  className="text-deploy-slate hover:text-deploy-white text-sm transition-colors font-mono tracking-wide"
>
  Browse Roles
</a>

<a
  href="#how-it-works"
  className="text-deploy-slate hover:text-deploy-white text-sm transition-colors font-mono tracking-wide"
>
  How It Works
</a>

<a
  href="#placed"
  className="text-deploy-slate hover:text-deploy-white text-sm transition-colors font-mono tracking-wide"
>
  Placed
</a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="/signin"
            className="font-mono text-xs tracking-wide transition-colors"
            style={{ color: '#8B949E' }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#F0F6FC')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#8B949E')}
          >
            Sign in
          </a>
          <a
            href="/signup"
            className="flex items-center gap-2 px-4 py-2 rounded border text-xs font-mono tracking-wide transition-all duration-200 hover:bg-deploy-teal-dim"
            style={{
              borderColor: 'rgba(0, 201, 167, 0.4)',
              color: '#00C9A7',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#00C9A7' }}
            />
            Get started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;