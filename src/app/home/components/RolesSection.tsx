'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Role {
  id: number;
  title: string;
  company: string;
  location: string;
  remote: 'Remote' | 'Hybrid' | 'On-site';
  salary: string;
  salaryMin: number;
  equity: string;
  stack: string[];
  level: 'Senior' | 'Mid' | 'Staff' | 'Principal';
  postedDays: number;
  applicants: number;
  hot: boolean;
}

const ROLES: Role[] = [
  {
    id: 1,
    title: 'Staff Software Engineer',
    company: 'Vercel',
    location: 'San Francisco, CA',
    remote: 'Remote',
    salary: '$220k–$280k',
    salaryMin: 220000,
    equity: '0.08–0.15%',
    stack: ['React', 'TypeScript', 'Rust', 'Go'],
    level: 'Staff',
    postedDays: 1,
    applicants: 41,
    hot: true,
  },
  {
    id: 2,
    title: 'Senior Backend Engineer',
    company: 'Linear',
    location: 'Remote',
    remote: 'Remote',
    salary: '$180k–$220k',
    salaryMin: 180000,
    equity: '0.05–0.10%',
    stack: ['TypeScript', 'PostgreSQL', 'GraphQL'],
    level: 'Senior',
    postedDays: 2,
    applicants: 87,
    hot: true,
  },
  {
    id: 3,
    title: 'Principal Product Designer',
    company: 'Figma',
    location: 'New York, NY',
    remote: 'Hybrid',
    salary: '$195k–$240k',
    salaryMin: 195000,
    equity: '0.04–0.08%',
    stack: ['Figma', 'Prototyping', 'Design Systems'],
    level: 'Principal',
    postedDays: 3,
    applicants: 62,
    hot: false,
  },
  {
    id: 4,
    title: 'Senior Product Manager',
    company: 'Notion',
    location: 'San Francisco, CA',
    remote: 'Hybrid',
    salary: '$170k–$210k',
    salaryMin: 170000,
    equity: '0.03–0.06%',
    stack: ['Product Strategy', 'Analytics', 'SQL'],
    level: 'Senior',
    postedDays: 1,
    applicants: 124,
    hot: true,
  },
  {
    id: 5,
    title: 'Senior Full-Stack Engineer',
    company: 'Loom',
    location: 'Remote',
    remote: 'Remote',
    salary: '$160k–$200k',
    salaryMin: 160000,
    equity: '0.02–0.05%',
    stack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    level: 'Senior',
    postedDays: 4,
    applicants: 53,
    hot: false,
  },
  {
    id: 6,
    title: 'Mid-Level iOS Engineer',
    company: 'Superhuman',
    location: 'Remote',
    remote: 'Remote',
    salary: '$140k–$170k',
    salaryMin: 140000,
    equity: '0.01–0.04%',
    stack: ['Swift', 'SwiftUI', 'Objective-C'],
    level: 'Mid',
    postedDays: 2,
    applicants: 38,
    hot: false,
  },
  {
    id: 7,
    title: 'Staff ML Engineer',
    company: 'Cohere',
    location: 'Toronto, ON',
    remote: 'Remote',
    salary: '$200k–$260k',
    salaryMin: 200000,
    equity: '0.06–0.12%',
    stack: ['Python', 'PyTorch', 'CUDA', 'Kubernetes'],
    level: 'Staff',
    postedDays: 1,
    applicants: 29,
    hot: true,
  },
  {
    id: 8,
    title: 'Senior DevOps Engineer',
    company: 'PlanetScale',
    location: 'Remote',
    remote: 'Remote',
    salary: '$165k–$195k',
    salaryMin: 165000,
    equity: '0.02–0.05%',
    stack: ['Kubernetes', 'Terraform', 'Go', 'MySQL'],
    level: 'Senior',
    postedDays: 5,
    applicants: 44,
    hot: false,
  },
];

const STACK_FILTERS = ['All', 'React', 'TypeScript', 'Python', 'Go', 'Swift', 'Kubernetes'];
const REMOTE_FILTERS = ['All', 'Remote', 'Hybrid', 'On-site'];
const SALARY_FILTERS = ['All', '$140k+', '$160k+', '$180k+', '$200k+'];

const SALARY_MAP: Record<string, number> = {
  'All': 0,
  '$140k+': 140000,
  '$160k+': 160000,
  '$180k+': 180000,
  '$200k+': 200000,
};

const RolesSection: React.FC = () => {
  const [stackFilter, setStackFilter] = useState('All');
  const [remoteFilter, setRemoteFilter] = useState('All');
  const [salaryFilter, setSalaryFilter] = useState('All');

  const filtered = useMemo(() => {
    return ROLES.filter((role) => {
      const stackMatch = stackFilter === 'All' || role.stack.includes(stackFilter);
      const remoteMatch = remoteFilter === 'All' || role.remote === remoteFilter;
      const salaryMatch = role.salaryMin >= SALARY_MAP[salaryFilter];
      return stackMatch && remoteMatch && salaryMatch;
    });
  }, [stackFilter, remoteFilter, salaryFilter]);

  return (
    <section
      id="roles"
      className="py-28 px-6 relative"
      style={{ backgroundColor: '#161B22' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#00C9A7' }}>
            Act 02 — The Transformation
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(0, 201, 167, 0.15)' }} />
        </div>

        <h2
          className="font-sans font-bold mb-4"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#F0F6FC', letterSpacing: '-0.02em' }}
        >
          Real roles. Real salary ranges. Right now.
        </h2>
        <p className="mb-10 max-w-2xl" style={{ color: '#8B949E', lineHeight: '1.7' }}>
          Filter by what matters to you. Every role verified in the last 7 days.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-y-3 gap-x-6 mb-8">
          {/* Stack */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono text-xs" style={{ color: '#3D444D' }}>stack:</span>
            {STACK_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setStackFilter(f)}
                className={`filter-btn ${stackFilter === f ? 'active' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
          {/* Remote */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono text-xs" style={{ color: '#3D444D' }}>remote:</span>
            {REMOTE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setRemoteFilter(f)}
                className={`filter-btn ${remoteFilter === f ? 'active' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
          {/* Salary */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono text-xs" style={{ color: '#3D444D' }}>salary:</span>
            {SALARY_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setSalaryFilter(f)}
                className={`filter-btn ${salaryFilter === f ? 'active' : ''}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs" style={{ color: '#8B949E' }}>
            {filtered.length} role{filtered.length !== 1 ? 's' : ''} match
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(139, 148, 158, 0.1)' }} />
        </div>

        {/* Role cards */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div
              className="text-center py-16 font-mono text-sm"
              style={{ color: '#3D444D' }}
            >
              no roles match — try adjusting filters
            </div>
          )}
          {filtered.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RoleCard: React.FC<{ role: Role }> = ({ role }) => {
  const levelColors: Record<string, string> = {
    'Staff': '#00C9A7',
    'Principal': '#00C9A7',
    'Senior': '#8B949E',
    'Mid': '#3D444D',
  };

  return (
    <div
      className="card-teal-hover rounded-lg px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
      style={{ backgroundColor: '#1C2128' }}
    >
      {/* Company dot + info */}
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-mono font-bold text-xs mt-0.5"
          style={{
            backgroundColor: 'rgba(0, 201, 167, 0.08)',
            border: '1px solid rgba(0, 201, 167, 0.15)',
            color: '#00C9A7',
          }}
        >
          {role.company.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-sans font-semibold text-sm"
              style={{ color: '#F0F6FC' }}
            >
              {role.title}
            </span>
            {role.hot && (
              <span
                className="font-mono text-xs px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: 'rgba(0, 201, 167, 0.12)',
                  color: '#00C9A7',
                  fontSize: '10px',
                }}
              >
                HOT
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="font-sans text-xs" style={{ color: '#8B949E' }}>
              {role.company}
            </span>
            <span style={{ color: '#3D444D' }}>·</span>
            <span className="font-sans text-xs" style={{ color: '#8B949E' }}>
              {role.location}
            </span>
            <span style={{ color: '#3D444D' }}>·</span>
            <span
              className="font-mono text-xs"
              style={{ color: role.remote === 'Remote' ? '#00C9A7' : '#8B949E' }}
            >
              {role.remote}
            </span>
          </div>
          {/* Stack tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {role.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="font-mono text-xs px-2 py-0.5 rounded"
                style={{
                  backgroundColor: '#0D1117',
                  color: '#8B949E',
                  border: '1px solid rgba(139, 148, 158, 0.15)',
                  fontSize: '10px',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: salary + meta */}
      <div className="flex flex-row md:flex-col items-start md:items-end gap-3 md:gap-1 flex-shrink-0">
        <div
          className="font-mono font-semibold text-sm"
          style={{ color: '#F0F6FC' }}
        >
          {role.salary}
        </div>
        <div className="font-mono text-xs" style={{ color: '#00C9A7' }}>
          {role.equity} equity
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span
            className="font-mono text-xs"
            style={{ color: levelColors[role.level] }}
          >
            {role.level}
          </span>
          <span className="font-mono text-xs" style={{ color: '#3D444D' }}>
            {role.postedDays}d ago · {role.applicants} applied
          </span>
        </div>
      </div>

      {/* Arrow */}
      <div
        className="hidden md:flex items-center justify-center w-8 h-8 rounded flex-shrink-0 transition-all duration-200 group-hover:bg-deploy-teal-dim"
        style={{ color: '#3D444D' }}
      >
        <Icon name="ArrowRightIcon" size={16} />
      </div>
    </div>
  );
};

export default RolesSection;