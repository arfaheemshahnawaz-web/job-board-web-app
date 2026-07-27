'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { createAccount, setSession } from '@/lib/store';

type Role = 'jobseeker' | 'employer' | null;

export default function SignUpPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [step, setStep] = useState<'role' | 'form'>('role');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    title: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) setStep('form');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (!agreed) {
      setError('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);
    try {
      const account = createAccount({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: selectedRole as 'jobseeker' | 'employer',
        company: formData.company || undefined,
        title: formData.title || undefined,
      });
      setSession(account);
      router.push('/home');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setLoading(false);
    }
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
          <span
            className="ml-3 font-mono text-xs"
            style={{ color: '#8B949E' }}
          >
            {step === 'role' ? '~/deploy/register — select role' : `~/deploy/register — ${selectedRole}`}
          </span>
        </div>

        {step === 'role' ? (
          <>
            <h1
              className="font-mono text-lg font-semibold mb-1"
              style={{ color: '#F0F6FC' }}
            >
              Create your account
            </h1>
            <p className="text-sm mb-6" style={{ color: '#8B949E' }}>
              Choose how you want to use Deploy
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {/* Job Seeker */}
              <button
                onClick={() => handleRoleSelect('jobseeker')}
                className="w-full text-left p-4 rounded transition-all duration-200"
                style={{
                  backgroundColor: selectedRole === 'jobseeker' ? 'rgba(0, 201, 167, 0.08)' : '#1C2128',
                  border: selectedRole === 'jobseeker' ?'1px solid rgba(0, 201, 167, 0.5)' :'1px solid rgba(139, 148, 158, 0.15)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 w-8 h-8 rounded flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold"
                    style={{
                      backgroundColor: selectedRole === 'jobseeker' ? 'rgba(0, 201, 167, 0.15)' : 'rgba(139, 148, 158, 0.08)',
                      color: selectedRole === 'jobseeker' ? '#00C9A7' : '#8B949E',
                    }}
                  >
                    JS
                  </div>
                  <div>
                    <p
                      className="font-mono text-sm font-semibold"
                      style={{ color: selectedRole === 'jobseeker' ? '#00C9A7' : '#F0F6FC' }}
                    >
                      Job Seeker
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#8B949E' }}>
                      Browse roles, apply to positions, track your applications
                    </p>
                  </div>
                  <div className="ml-auto mt-1">
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: selectedRole === 'jobseeker' ? '#00C9A7' : 'rgba(139, 148, 158, 0.4)',
                      }}
                    >
                      {selectedRole === 'jobseeker' && (
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00C9A7' }} />
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Employer */}
              <button
                onClick={() => handleRoleSelect('employer')}
                className="w-full text-left p-4 rounded transition-all duration-200"
                style={{
                  backgroundColor: selectedRole === 'employer' ? 'rgba(0, 201, 167, 0.08)' : '#1C2128',
                  border: selectedRole === 'employer' ?'1px solid rgba(0, 201, 167, 0.5)' :'1px solid rgba(139, 148, 158, 0.15)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="mt-0.5 w-8 h-8 rounded flex items-center justify-center flex-shrink-0 font-mono text-sm font-bold"
                    style={{
                      backgroundColor: selectedRole === 'employer' ? 'rgba(0, 201, 167, 0.15)' : 'rgba(139, 148, 158, 0.08)',
                      color: selectedRole === 'employer' ? '#00C9A7' : '#8B949E',
                    }}
                  >
                    EM
                  </div>
                  <div>
                    <p
                      className="font-mono text-sm font-semibold"
                      style={{ color: selectedRole === 'employer' ? '#00C9A7' : '#F0F6FC' }}
                    >
                      Employer
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#8B949E' }}>
                      Post roles, review applicants, build your team
                    </p>
                  </div>
                  <div className="ml-auto mt-1">
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: selectedRole === 'employer' ? '#00C9A7' : 'rgba(139, 148, 158, 0.4)',
                      }}
                    >
                      {selectedRole === 'employer' && (
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00C9A7' }} />
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className="w-full py-2.5 rounded font-mono text-sm font-semibold tracking-wide transition-all duration-200"
              style={{
                backgroundColor: selectedRole ? '#00C9A7' : 'rgba(139, 148, 158, 0.1)',
                color: selectedRole ? '#0D1117' : '#8B949E',
                cursor: selectedRole ? 'pointer' : 'not-allowed',
              }}
            >
              Continue →
            </button>

            <p className="text-center text-xs mt-4" style={{ color: '#8B949E' }}>
              Already have an account?{' '}
              <Link
                href="/signin"
                className="font-mono transition-colors"
                style={{ color: '#00C9A7' }}
              >
                Sign in
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setStep('role')}
                className="font-mono text-xs transition-colors"
                style={{ color: '#8B949E' }}
              >
                ← back
              </button>
              <span className="font-mono text-xs" style={{ color: '#3D444D' }}>/</span>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded"
                style={{
                  backgroundColor: 'rgba(0, 201, 167, 0.1)',
                  color: '#00C9A7',
                  border: '1px solid rgba(0, 201, 167, 0.2)',
                }}
              >
                {selectedRole === 'jobseeker' ? 'job_seeker' : 'employer'}
              </span>
            </div>

            <h1
              className="font-mono text-lg font-semibold mb-1"
              style={{ color: '#F0F6FC' }}
            >
              {selectedRole === 'jobseeker' ? 'Find your next role' : 'Start hiring talent'}
            </h1>
            <p className="text-sm mb-5" style={{ color: '#8B949E' }}>
              {selectedRole === 'jobseeker' ?'Create your profile and get discovered by top companies' :'Post roles and connect with vetted engineers'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block font-mono text-xs mb-1.5" style={{ color: '#8B949E' }}>
                  {selectedRole === 'employer' ? 'Your name' : 'Full name'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={selectedRole === 'employer' ? 'Jane Smith' : 'Alex Johnson'}
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

              {selectedRole === 'employer' && (
                <>
                  <div>
                    <label className="block font-mono text-xs mb-1.5" style={{ color: '#8B949E' }}>
                      Company name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
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
                    <label className="block font-mono text-xs mb-1.5" style={{ color: '#8B949E' }}>
                      Your title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Head of Engineering"
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
                </>
              )}

              <div>
                <label className="block font-mono text-xs mb-1.5" style={{ color: '#8B949E' }}>
                  Work email
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
                <label className="block font-mono text-xs mb-1.5" style={{ color: '#8B949E' }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="min. 8 characters"
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
                <label className="block font-mono text-xs mb-1.5" style={{ color: '#8B949E' }}>
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="repeat password"
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

              <label className="flex items-start gap-2.5 cursor-pointer mt-1">
                <div
                  onClick={() => setAgreed(!agreed)}
                  className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: agreed ? '#00C9A7' : 'transparent',
                    border: agreed ? '1px solid #00C9A7' : '1px solid rgba(139, 148, 158, 0.4)',
                  }}
                >
                  {agreed && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#0D1117" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-xs" style={{ color: '#8B949E' }}>
                  I agree to the{' '}
                  <span className="font-mono" style={{ color: '#00C9A7' }}>Terms of Service</span>
                  {' '}and{' '}
                  <span className="font-mono" style={{ color: '#00C9A7' }}>Privacy Policy</span>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded font-mono text-sm font-semibold tracking-wide transition-all duration-200 mt-1 btn-shimmer"
                style={{ color: '#0D1117', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? 'Creating account…' : selectedRole === 'jobseeker' ? 'Create seeker account' : 'Create employer account'}
              </button>

              {error && (
                <p className="font-mono text-xs text-center mt-1" style={{ color: '#FF5F57' }}>
                  {error}
                </p>
              )}
            </form>

            <p className="text-center text-xs mt-4" style={{ color: '#8B949E' }}>
              Already have an account?{' '}
              <Link
                href="/signin"
                className="font-mono transition-colors"
                style={{ color: '#00C9A7' }}
              >
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>

      {/* Footer note */}
      <p className="mt-6 font-mono text-xs" style={{ color: '#3D444D' }}>
        © 2025 Deploy · Built for engineers
      </p>
    </main>
  );
}
