'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const STACKS = [
  'React', 'TypeScript', 'Python', 'Go', 'Rust', 'Node.js',
  'Swift', 'Kotlin', 'Java', 'Ruby', 'PHP', 'C++',
  'Kubernetes', 'AWS', 'GCP', 'Figma', 'Product Management',
];

const DualCTASection: React.FC = () => {
  // Candidate form
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateStack, setCandidateStack] = useState('');
  const [candidateSubmitted, setCandidateSubmitted] = useState(false);
  const [candidateLoading, setCandidateLoading] = useState(false);

  // Hiring manager form
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [hiringSubmitted, setHiringSubmitted] = useState(false);
  const [hiringLoading, setHiringLoading] = useState(false);

  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateEmail || !candidateStack) return;
    setCandidateLoading(true);
    setTimeout(() => {
      setCandidateLoading(false);
      setCandidateSubmitted(true);
    }, 1200);
  };

  const handleHiringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !workEmail) return;
    setHiringLoading(true);
    setTimeout(() => {
      setHiringLoading(false);
      setHiringSubmitted(true);
    }, 1200);
  };

  return (
    <>
      {/* Candidate CTA */}
      <section
        id="apply"
        className="py-28 px-6 relative overflow-hidden"
        style={{ backgroundColor: '#161B22' }}
      >
        <div className="noise-overlay" />
        {/* Teal glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '500px',
            height: '300px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(ellipse, rgba(0, 201, 167, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#00C9A7' }}>
              For Candidates
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0, 201, 167, 0.15)' }} />
          </div>

          <h2
            className="font-sans font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#F0F6FC', letterSpacing: '-0.02em' }}
          >
            Start applying today.
          </h2>
          <p className="mb-10" style={{ color: '#8B949E', lineHeight: '1.7', maxWidth: '520px' }}>
            Two fields. No resume upload. No cover letter. Just your email and your primary stack — we surface the roles, you pick the ones worth your time.
          </p>

          {!candidateSubmitted ? (
            <form onSubmit={handleCandidateSubmit}>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="deploy-input flex-1 px-4 py-3 rounded text-sm"
                />
                <select
                  value={candidateStack}
                  onChange={(e) => setCandidateStack(e.target.value)}
                  required
                  className="deploy-input px-4 py-3 rounded text-sm appearance-none cursor-pointer"
                  style={{ minWidth: '180px' }}
                >
                  <option value="" disabled>Primary Stack</option>
                  {STACKS.map((s) => (
                    <option key={s} value={s} style={{ backgroundColor: '#161B22' }}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={candidateLoading}
                  className="btn-shimmer px-6 py-3 rounded text-sm font-semibold whitespace-nowrap transition-opacity"
                  style={{
                    color: '#0D1117',
                    opacity: candidateLoading ? 0.7 : 1,
                    fontFamily: '"DM Sans", sans-serif',
                    minWidth: '160px',
                  }}
                >
                  {candidateLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 rounded-full animate-spin" style={{ borderColor: '#0D1117', borderTopColor: 'transparent' }} />
                      Deploying...
                    </span>
                  ) : (
                    'Start Applying Today →'
                  )}
                </button>
              </div>
              <p className="mt-4 font-mono text-xs" style={{ color: '#3D444D' }}>
                No spam. Unsubscribe anytime. Free forever for candidates.
              </p>
            </form>
          ) : (
            <div
              className="flex items-center gap-4 p-5 rounded-lg border"
              style={{
                borderColor: 'rgba(0, 201, 167, 0.3)',
                backgroundColor: 'rgba(0, 201, 167, 0.06)',
              }}
            >
              <Icon name="CheckCircleIcon" size={24} className="flex-shrink-0" style={{ color: '#00C9A7' } as React.CSSProperties} />
              <div>
                <div className="font-sans font-semibold text-sm mb-1" style={{ color: '#00C9A7' }}>
                  ✓ deploy --status: queued
                </div>
                <div className="font-mono text-xs" style={{ color: '#8B949E' }}>
                  We&apos;re matching your stack to open roles. Check your inbox in the next 5 minutes.
                </div>
              </div>
            </div>
          )}

          {/* Social proof row */}
          <div className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t" style={{ borderColor: 'rgba(139, 148, 158, 0.1)' }}>
            {[
              { value: '84k+', label: 'Engineers joined' },
              { value: '9 days', label: 'Median time to offer' },
              { value: '$0', label: 'Cost to candidates' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm" style={{ color: '#00C9A7' }}>
                  {stat.value}
                </span>
                <span className="font-sans text-xs" style={{ color: '#8B949E' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Manager CTA */}
      <section
        id="post-role"
        className="py-28 px-6 relative"
        style={{ backgroundColor: '#0D1117' }}
      >
        <div className="section-divider mb-20" />
        <div className="max-w-3xl mx-auto">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#8B949E' }}>
              For Hiring Teams
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: 'rgba(139, 148, 158, 0.1)' }} />
          </div>

          <h2
            className="font-sans font-bold mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#F0F6FC', letterSpacing: '-0.02em' }}
          >
            Hire senior engineers.
            <br />
            <span className="teal-gradient-text">No agency fees.</span>
          </h2>
          <p className="mb-10 max-w-xl" style={{ color: '#8B949E', lineHeight: '1.7' }}>
            Post directly to 84,000+ engineers actively searching. Every candidate has opted in, filtered their own preferences, and is actively looking. Average time to first qualified applicant: 4 hours.
          </p>

          {/* Comparison */}
          <div
            className="grid grid-cols-2 gap-px mb-10 rounded-lg overflow-hidden"
            style={{ backgroundColor: 'rgba(139, 148, 158, 0.1)' }}
          >
            <div className="p-5" style={{ backgroundColor: '#161B22' }}>
              <div className="font-mono text-xs mb-3" style={{ color: '#3D444D' }}>Agency / Recruiter</div>
              {['15–25% of first-year salary', '60–90 day fill time', 'Candidates you didn\'t choose', 'Recurring fees per hire'].map((item) => (
                <div key={item} className="flex items-center gap-2 mb-2">
                  <Icon name="XMarkIcon" size={12} style={{ color: '#3D444D' } as React.CSSProperties} />
                  <span className="font-sans text-xs" style={{ color: '#3D444D' }}>{item}</span>
                </div>
              ))}
            </div>
            <div className="p-5" style={{ backgroundColor: '#161B22' }}>
              <div className="font-mono text-xs mb-3" style={{ color: '#00C9A7' }}>Deploy</div>
              {['Flat $499/role posted', '4-hour first applicant', 'Self-filtered candidates', 'No per-hire fees ever'].map((item) => (
                <div key={item} className="flex items-center gap-2 mb-2">
                  <Icon name="CheckIcon" size={12} style={{ color: '#00C9A7' } as React.CSSProperties} />
                  <span className="font-sans text-xs" style={{ color: '#F0F6FC' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {!hiringSubmitted ? (
            <form onSubmit={handleHiringSubmit}>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company name"
                  required
                  className="deploy-input flex-1 px-4 py-3 rounded text-sm"
                />
                <input
                  type="email"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  placeholder="Work email"
                  required
                  className="deploy-input flex-1 px-4 py-3 rounded text-sm"
                />
                <button
                  type="submit"
                  disabled={hiringLoading}
                  className="px-6 py-3 rounded text-sm font-semibold whitespace-nowrap border transition-all duration-200"
                  style={{
                    borderColor: 'rgba(0, 201, 167, 0.4)',
                    color: '#00C9A7',
                    backgroundColor: hiringLoading ? 'rgba(0, 201, 167, 0.1)' : 'transparent',
                    fontFamily: '"DM Sans", sans-serif',
                    minWidth: '140px',
                  }}
                  onMouseEnter={(e) => { if (!hiringLoading) e.currentTarget.style.backgroundColor = 'rgba(0, 201, 167, 0.1)'; }}
                  onMouseLeave={(e) => { if (!hiringLoading) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {hiringLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 rounded-full animate-spin" style={{ borderColor: '#00C9A7', borderTopColor: 'transparent' }} />
                      Posting...
                    </span>
                  ) : (
                    'Post a Role →'
                  )}
                </button>
              </div>
              <p className="mt-4 font-mono text-xs" style={{ color: '#3D444D' }}>
                $499 flat fee per role. Cancel anytime. No contracts.
              </p>
            </form>
          ) : (
            <div
              className="flex items-center gap-4 p-5 rounded-lg border"
              style={{
                borderColor: 'rgba(0, 201, 167, 0.3)',
                backgroundColor: 'rgba(0, 201, 167, 0.06)',
              }}
            >
              <Icon name="CheckCircleIcon" size={24} className="flex-shrink-0" style={{ color: '#00C9A7' } as React.CSSProperties} />
              <div>
                <div className="font-sans font-semibold text-sm mb-1" style={{ color: '#00C9A7' }}>
                  ✓ Role queued for review
                </div>
                <div className="font-mono text-xs" style={{ color: '#8B949E' }}>
                  We&apos;ll email you a setup link within 15 minutes. First applicants typically arrive within 4 hours of going live.
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DualCTASection;