'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CounterState {
  devs: number;
  roles: number;
  hires: number;
}

const TARGETS: CounterState = {
  devs: 84312,
  roles: 2847,
  hires: 193,
};

const START: CounterState = {
  devs: 83900,
  roles: 2840,
  hires: 186,
};

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

const HeroSection: React.FC = () => {
  const [counts, setCounts] = useState<CounterState>(START);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
    // Animate counters to target
    const duration = 2400;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    intervalRef.current = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts({
        devs: Math.floor(START.devs + (TARGETS.devs - START.devs) * ease),
        roles: Math.floor(START.roles + (TARGETS.roles - START.roles) * ease),
        hires: Math.floor(START.hires + (TARGETS.hires - START.hires) * ease),
      });
      if (step >= steps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCounts(TARGETS);
        // Then slowly tick up
        startLiveTick();
      }
    }, stepTime);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startLiveTick = () => {
    intervalRef.current = setInterval(() => {
      setCounts(prev => ({
        devs: prev.devs + (Math.random() < 0.3 ? 1 : 0),
        roles: prev.roles + (Math.random() < 0.05 ? 1 : 0),
        hires: prev.hires + (Math.random() < 0.08 ? 1 : 0),
      }));
    }, 3200);
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 grid-tech overflow-hidden"
      style={{ backgroundColor: '#0D1117' }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Scan line */}
      <div className="scan-line" />

      {/* Teal glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '300px',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(0, 201, 167, 0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        {/* Status badge */}
        <div
          className="flex items-center gap-2 mb-10 px-3 py-1.5 rounded border font-mono text-xs"
          style={{
            borderColor: 'rgba(0, 201, 167, 0.25)',
            backgroundColor: 'rgba(0, 201, 167, 0.06)',
            color: '#00C9A7',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: '#00C9A7' }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: '#00C9A7' }}
            />
          </span>
          live · {mounted ? formatNumber(counts.roles) : '2,847'} open roles right now
        </div>

        {/* Scoreboard counters */}
        <div className="w-full mb-12 relative bracket-corner">
          <div
            className="grid grid-cols-3 gap-0 rounded-lg overflow-hidden border"
            style={{
              borderColor: 'rgba(0, 201, 167, 0.15)',
              backgroundColor: '#161B22',
            }}
          >
            {/* Devs */}
            <div
              className="flex flex-col items-center justify-center py-10 px-4 relative"
              style={{ borderRight: '1px solid rgba(0, 201, 167, 0.1)' }}
            >
              <div
                className="font-mono font-extrabold leading-none mb-3 tabular-nums"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  color: '#00C9A7',
                  textShadow: '0 0 40px rgba(0, 201, 167, 0.3)',
                  letterSpacing: '-0.03em',
                }}
              >
                {mounted ? formatNumber(counts.devs) : '84,312'}
                <span className="cursor-blink" />
              </div>
              <div
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: '#8B949E' }}
              >
                Devs on Platform
              </div>
            </div>

            {/* Roles */}
            <div
              className="flex flex-col items-center justify-center py-10 px-4 relative"
              style={{ borderRight: '1px solid rgba(0, 201, 167, 0.1)' }}
            >
              <div
                className="font-mono font-extrabold leading-none mb-3 tabular-nums"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  color: '#00C9A7',
                  textShadow: '0 0 40px rgba(0, 201, 167, 0.3)',
                  letterSpacing: '-0.03em',
                }}
              >
                {mounted ? formatNumber(counts.roles) : '2,847'}
              </div>
              <div
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: '#8B949E' }}
              >
                Open Roles
              </div>
            </div>

            {/* Hires */}
            <div className="flex flex-col items-center justify-center py-10 px-4">
              <div
                className="font-mono font-extrabold leading-none mb-3 tabular-nums"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  color: '#00C9A7',
                  textShadow: '0 0 40px rgba(0, 201, 167, 0.3)',
                  letterSpacing: '-0.03em',
                }}
              >
                {mounted ? formatNumber(counts.hires) : '193'}
              </div>
              <div
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: '#8B949E' }}
              >
                Hires This Week
              </div>
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="font-sans font-bold leading-tight mb-4"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.75rem)',
            color: '#F0F6FC',
            letterSpacing: '-0.02em',
            maxWidth: '720px',
          }}
        >
          The market is moving.{' '}
          <span className="teal-gradient-text">Are you?</span>
        </h1>

        <p
          className="mb-10 max-w-xl"
          style={{
            color: '#8B949E',
            fontSize: '1.1rem',
            lineHeight: '1.7',
          }}
        >
          Stop refreshing LinkedIn. Deploy surfaces real roles with real salary ranges — filtered by your stack, your level, your terms. No ghost listings. No agency gatekeeping.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#apply"
            className="btn-shimmer px-8 py-3.5 rounded text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{
              color: '#0D1117',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Start Applying Today →
          </a>
          <a
            href="#roles"
            className="px-8 py-3.5 rounded text-sm font-medium border transition-all duration-200 hover:bg-white/5"
            style={{
              borderColor: 'rgba(139, 148, 158, 0.3)',
              color: '#8B949E',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            Browse Roles First
          </a>
        </div>

        {/* Subtext */}
        <p className="mt-6 font-mono text-xs" style={{ color: '#3D444D' }}>
          $ deploy --stack react,typescript --remote true --min-salary 150000
        </p>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0D1117)',
        }}
      />
    </section>
  );
};

export default HeroSection;