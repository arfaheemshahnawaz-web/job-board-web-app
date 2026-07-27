/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deploy-bg': '#0D1117',
        'deploy-bg-secondary': '#161B22',
        'deploy-bg-card': '#1C2128',
        'deploy-teal': '#00C9A7',
        'deploy-teal-dim': 'rgba(0, 201, 167, 0.12)',
        'deploy-white': '#F0F6FC',
        'deploy-slate': '#8B949E',
        'deploy-slate-dim': '#3D444D',
        'deploy-border': 'rgba(139, 148, 158, 0.15)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'teal-pulse': 'teal-pulse 3s ease-in-out infinite',
        'marquee': 'marquee-scroll 30s linear infinite',
      },
    },
  },
  plugins: [],
};