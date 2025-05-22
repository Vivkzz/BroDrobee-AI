/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF2E63',    // Vibrant coral pink
        secondary: '#08D9D6',  // Electric teal
        accent: '#FF9A8B',     // Soft peach
        background: '#F8F9FF', // Cool white
        surface: '#FFFFFF',    // Pure white
        text: '#252A34',       // Deep slate
        muted: '#9BA4B4',      // Cool gray
        success: '#00F5A0',    // Mint green
        warning: '#FFB86C',    // Warm orange
      },
      borderRadius: {
        'xl': '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 