'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RaceBar {
  label: string;
  days: number;
  maxDays: number;
  color: string;
  isLegacy: boolean;
}

const BOARDS: RaceBar[] = [
  { label: 'LinkedIn', days: 47, maxDays: 60, color: '#3D444D', isLegacy: true },
  { label: 'Indeed', days: 52, maxDays: 60, color: '#3D444D', isLegacy: true },
  { label: 'Glassdoor', days: 38, maxDays: 60, color: '#3D444D', isLegacy: true },
  { label: 'Dice', days: 61, maxDays: 60, color: '#3D444D', isLegacy: true },
  { label: 'Deploy', days: 9, maxDays: 60, color: '#00C9A7', isLegacy: false },
];

const PainSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            setAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-28 px-6 relative"
      style={{ backgroundColor: '#0D1117' }}
    >
      <div className="section-divider mb-20" />
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: '#00C9A7' }}
          >
            Act 01 — The Problem
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0, 201, 167, 0.15)' }} />
        </div>

        <h2
          className="font-sans font-bold mb-4"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            color: '#F0F6FC',
            letterSpacing: '-0.02em',
          }}
        >
          Every day you wait costs you leverage.
        </h2>
        <p className="mb-16 max-w-2xl" style={{ color: '#8B949E', lineHeight: '1.7' }}>
          Legacy boards are optimized for enterprise HR workflows, not for engineers. Average time from first application to offer — measured across 12,000 placements.
        </p>

        {/* Race bars */}
        <div className="space-y-5">
          {BOARDS.map((board, i) => (
            <div key={board.label} className="flex items-center gap-4">
              <div
                className="font-mono text-xs w-24 text-right flex-shrink-0"
                style={{ color: board.isLegacy ? '#8B949E' : '#00C9A7' }}
              >
                {board.label}
              </div>
              <div className="flex-1 relative h-9 rounded overflow-hidden"
                style={{ backgroundColor: '#161B22' }}
              >
                <div
                  className="h-full rounded transition-all"
                  style={{
                    width: animated ? `${(board.days / 65) * 100}%` : '0%',
                    backgroundColor: board.isLegacy ? '#3D444D' : '#00C9A7',
                    transitionDuration: board.isLegacy ? `${1.2 + i * 0.1}s` : '0.5s',
                    transitionDelay: board.isLegacy ? `${i * 0.08}s` : '0.8s',
                    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    boxShadow: !board.isLegacy ? '0 0 16px rgba(0, 201, 167, 0.4)' : 'none',
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center px-3 font-mono text-xs font-semibold"
                  style={{ color: board.isLegacy ? '#8B949E' : '#0D1117' }}
                >
                  {board.days} days avg.
                </div>
              </div>
              {!board.isLegacy && (
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded font-bold flex-shrink-0"
                  style={{
                    backgroundColor: 'rgba(0, 201, 167, 0.15)',
                    color: '#00C9A7',
                  }}
                >
                  5× faster
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-lg overflow-hidden"
          style={{ backgroundColor: 'rgba(0, 201, 167, 0.1)' }}
        >
          {[
            { value: '9 days', label: 'Median days to offer' },
            { value: '0%', label: 'Ghost listings' },
            { value: '94%', label: 'Roles with salary range' },
            { value: '$0', label: 'Candidate cost' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
              style={{ backgroundColor: '#161B22' }}
            >
              <div
                className="font-mono font-bold mb-2"
                style={{ fontSize: '1.75rem', color: '#00C9A7', letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </div>
              <div className="font-mono text-xs uppercase tracking-wide" style={{ color: '#8B949E' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainSection;