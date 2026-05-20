/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        battle: {
          bg: '#080b12',
          surface: '#0d1117',
          card: '#111827',
          border: '#1f2937',
          accent: '#f97316',
          accentHover: '#ea6708',
          neon: '#22d3ee',
          neonDim: '#164e63',
          gold: '#fbbf24',
          red: '#ef4444',
          green: '#22c55e',
          purple: '#a855f7',
          muted: '#6b7280',
          text: '#f1f5f9',
          textDim: '#94a3b8',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #f97316, 0 0 10px #f97316' },
          '100%': { boxShadow: '0 0 15px #f97316, 0 0 30px #f97316, 0 0 50px #f97316' },
        },
      },
    },
  },
  plugins: [],
}
