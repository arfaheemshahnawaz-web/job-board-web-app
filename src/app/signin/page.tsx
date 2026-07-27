'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { validateCredentials, setSession } from '../../lib/store';

type Role = 'jobseeker' | 'employer';

export default function SignInPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>('jobseeker');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const account = validateCredentials(formData.email, formData.password);

    if (!account) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
      return;
    }

    if (account.role !== selectedRole) {
      setError(`This account is registered as a ${account.role === 'employer' ? 'Employer' : 'Job Seeker'}. Please select the correct role.`);
      setLoading(false);
      return;
    }

    setSession(account);
    router.push('/home');
  };

  return (
    <main
      className="min-h-screen grid-tech flex flex-col items-center justify-center px-4 py-16"
      style={{ backgroundColor: '#0D1117', color: '#F0F6FC' }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Logo */}
      <div className="mb-8">
        <Link href="/home">
          <AppLogo
            size={28}
            text="Deploy"
            iconName="BoltIcon"
            className="text-deploy-white"
          />
        </Link>
      </div>

      <div
        className="w-full max-w-md relative bracket-corner"
        style={{
          backgroundColor: '#161B22',
          border: '1px solid rgba(139, 148, 158, 0.15)',
          borderRadius: '8px',
          padding: '2rem',
        }}
      >
        {/* Terminal header bar */}
        <div
          className="flex items-center gap-2 mb-6 pb-4"
          style={{ borderBottom: '1px solid rgba(139, 148, 158, 0.1)' }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28C840' }} />
          <span className="ml-3 font-mono text-xs" style={{ color: '#8B949E' }}>
            ~/deploy/auth — sign_in
          </span>
        </div>

        <h1 className="font-mono text-lg font-semibold mb-1" style={{ color: '#F0F6FC' }}>
          Welcome back
        </h1>
        <p className="text-sm mb-5" style={{ color: '#8B949E' }}>
          Sign in to your Deploy account
        </p>

        {/* Role toggle */}
        <div
          className="flex p-1 rounded mb-5"
          style={{ backgroundColor: '#1C2128', border: '1px solid rgba(139, 148, 158, 0.12)' }}
        >
          <button
            onClick={() => setSelectedRole('jobseeker')}
            className="flex-1 py-1.5 rounded font-mono text-xs font-semibold transition-all duration-200"
            style={{
              backgroundColor: selectedRole === 'jobseeker' ? 'rgba(0, 201, 167, 0.12)' : 'transparent',
              color: selectedRole === 'jobseeker' ? '#00C9A7' : '#8B949E',
              border: selectedRole === 'jobseeker' ? '1px solid rgba(0, 201, 167, 0.3)' : '1px solid transparent',
            }}
          >
            Job Seeker
          </button>
          <button
            onClick={() => setSelectedRole('employer')}
            className="flex-1 py-1.5 rounded font-mono text-xs font-semibold transition-all duration-200"
            style={{
              backgroundColor: selectedRole === 'employer' ? 'rgba(0, 201, 167, 0.12)' : 'transparent',
              color: selectedRole === 'employer' ? '#00C9A7' : '#8B949E',
              border: selectedRole === 'employer' ? '1px solid rgba(0, 201, 167, 0.3)' : '1px solid transparent',
            }}
          >
            Employer
          </button>
        </div>

        {/* Context hint */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded mb-5"
          style={{
            backgroundColor: 'rgba(0, 201, 167, 0.05)',
            border: '1px solid rgba(0, 201, 167, 0.15)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: '#00C9A7' }}
          />
          <p className="font-mono text-xs" style={{ color: '#8B949E' }}>
            {selectedRole === 'jobseeker' ?'Signing in as a job seeker — access your applications & saved roles' :'Signing in as an employer — manage your postings & applicants'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-mono text-xs mb-1.5" style={{ color: '#8B949E' }}>
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={selectedRole === 'employer' ? 'jane@company.com' : 'alex@email.com'}
              required
              className="w-full px-3 py-2 rounded font-mono text-sm outline-none transition-all duration-200"
              style={{
                backgroundColor: '#1C2128',
                border: '1px solid rgba(139, 148, 158, 0.2)',
                color: '#F0F6FC',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(0, 201, 167, 0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(139, 148, 158, 0.2)')}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-mono text-xs" style={{ color: '#8B949E' }}>
                Password
              </label>
              <Link
                href="/forgot-password"
                className="font-mono text-xs transition-colors"
                style={{ color: '#00C9A7' }}
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 rounded font-mono text-sm outline-none transition-all duration-200"
              style={{
                backgroundColor: '#1C2128',
                border: '1px solid rgba(139, 148, 158, 0.2)',
                color: '#F0F6FC',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(0, 201, 167, 0.5)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(139, 148, 158, 0.2)')}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded font-mono text-sm font-semibold tracking-wide transition-all duration-200 btn-shimmer"
            style={{ color: '#0D1117', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Signing in…' : selectedRole === 'jobseeker' ? 'Sign in as Job Seeker' : 'Sign in as Employer'}
          </button>

          {error && (
            <p className="font-mono text-xs text-center mt-1" style={{ color: '#FF5F57' }}>
              {error}
            </p>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(139, 148, 158, 0.12)' }} />
          <span className="font-mono text-xs" style={{ color: '#3D444D' }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(139, 148, 158, 0.12)' }} />
        </div>

        <p className="text-center text-xs" style={{ color: '#8B949E' }}>
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-mono transition-colors"
            style={{ color: '#00C9A7' }}
          >
            Create one
          </Link>
        </p>
      </div>

      {/* Footer note */}
      <p className="mt-6 font-mono text-xs" style={{ color: '#3D444D' }}>
        © 2025 Deploy · Built for engineers
      </p>
    </main>
  );
}
