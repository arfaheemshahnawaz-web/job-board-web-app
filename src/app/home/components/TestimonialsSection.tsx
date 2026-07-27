'use client';

import React, { useEffect, useRef } from 'react';

interface Testimonial {
  hash: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  prevRole: string;
  daysToOffer: number;
  salary: string;
  quote: string;
  timestamp: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    hash: 'a3f9c2',
    name: 'Marcus Webb',
    role: 'Staff Engineer → Principal Engineer',
    company: 'Stripe',
    initials: 'MW',
    prevRole: 'Senior SWE @ Amazon',
    daysToOffer: 8,
    salary: '$285k + 0.12% equity',
    quote: 'I was mid-stealth-hunt — couldn\'t post on LinkedIn, couldn\'t tell my manager. Deploy let me filter by exact stack and salary floor before I touched a single application. Offer in 8 days.',
    timestamp: '3 days ago',
  },
  {
    hash: 'b7e4a1',
    name: 'Priya Nair',
    role: 'Product Designer',
    company: 'Linear',
    initials: 'PN',
    prevRole: 'Bootcamp Grad (General Assembly)',
    daysToOffer: 14,
    salary: '$145k + equity',
    quote: 'Fresh out of bootcamp, I was drowning in ghosted applications. Deploy showed me which companies actually hired junior designers with equity. Signed my first offer in 14 days.',
    timestamp: '1 week ago',
  },
  {
    hash: 'c1d8f5',
    name: 'Jordan Osei',
    role: 'Senior PM → Director of Product',
    company: 'Notion',
    initials: 'JO',
    prevRole: 'PM @ Meta',
    daysToOffer: 11,
    salary: '$210k + 0.06%',
    quote: 'The salary transparency alone was worth it. I knew exactly what Notion was paying before my first screen. No negotiation games, no lowball anchoring. 11 days start to finish.',
    timestamp: '2 weeks ago',
  },
  {
    hash: 'd4b2e9',
    name: 'Sofia Kowalczyk',
    role: 'ML Engineer',
    company: 'Cohere',
    initials: 'SK',
    prevRole: 'Research Engineer @ Google Brain',
    daysToOffer: 7,
    salary: '$245k + 0.09%',
    quote: 'Filtered to PyTorch + remote + $200k+ and got 12 qualified results. Applied to 6 on Monday, had three first-rounds by Wednesday, offer by Friday. This is what job search should feel like.',
    timestamp: '3 weeks ago',
  },
];

const TestimonialsSection: React.FC = () => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('is-visible');
              }, i * 120);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section
      id="placed"
      className="py-28 px-6"
      style={{ backgroundColor: '#0D1117' }}
    >
      <div className="section-divider mb-20" />
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#00C9A7' }}>
            Act 03 — The Return
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0, 201, 167, 0.15)' }} />
        </div>

        <h2
          className="font-sans font-bold mb-4"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#F0F6FC', letterSpacing: '-0.02em' }}
        >
          Shipped to production.
        </h2>
        <p className="mb-14 max-w-2xl" style={{ color: '#8B949E', lineHeight: '1.7' }}>
          Real people. Real offers. Days from signup, not months.
        </p>

        {/* Git log */}
        <div className="space-y-0">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.hash}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="git-log-line scroll-reveal pb-10"
            >
              <div className="git-dot" />
              <div
                className="card-teal-hover rounded-lg p-6 ml-2"
                style={{ backgroundColor: '#161B22' }}
              >
                {/* Commit header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs flex-shrink-0"
                      style={{
                        backgroundColor: 'rgba(0, 201, 167, 0.1)',
                        border: '1px solid rgba(0, 201, 167, 0.2)',
                        color: '#00C9A7',
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <span className="font-sans font-semibold text-sm" style={{ color: '#F0F6FC' }}>
                        {t.name}
                      </span>
                      <span className="font-mono text-xs ml-2" style={{ color: '#3D444D' }}>
                        {t.hash}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs px-2 py-1 rounded font-bold"
                      style={{
                        backgroundColor: 'rgba(0, 201, 167, 0.12)',
                        color: '#00C9A7',
                      }}
                    >
                      {t.daysToOffer}d to offer
                    </span>
                    <span className="font-mono text-xs" style={{ color: '#3D444D' }}>
                      {t.timestamp}
                    </span>
                  </div>
                </div>

                {/* Role transition */}
                <div
                  className="font-mono text-xs mb-3 flex flex-wrap items-center gap-2"
                  style={{ color: '#8B949E' }}
                >
                  <span style={{ color: '#3D444D' }}>from:</span>
                  <span>{t.prevRole}</span>
                  <span style={{ color: '#00C9A7' }}>→</span>
                  <span style={{ color: '#F0F6FC' }}>{t.role} @ {t.company}</span>
                </div>

                {/* Quote */}
                <p
                  className="font-sans text-sm mb-4 leading-relaxed"
                  style={{ color: '#8B949E', fontStyle: 'italic' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Salary */}
                <div
                  className="font-mono text-xs"
                  style={{ color: '#00C9A7' }}
                >
                  $ {t.salary}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More hires CTA */}
        <div className="mt-8 text-center">
          <button
            className="font-mono text-xs transition-colors"
            style={{ color: '#3D444D' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#8B949E')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#3D444D')}
          >
            $ git log --all  # 12,847 more placed engineers ↓
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;