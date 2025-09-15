import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cosmic-glow': 'cosmic-glow 8s infinite',
        'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit 25s linear infinite reverse',
        'orbit-slow': 'orbit 30s linear infinite',
        'orbit-slower': 'orbit 40s linear infinite',
        'orbit-slowest': 'orbit 50s linear infinite',
        'bounce-on-hover': 'bounce 0.5s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'cosmic-glow': {
          '0%, 100%': { boxShadow: '0 0 15px 0 rgba(239, 68, 68, 0.5)' },
          '50%': { boxShadow: '0 0 25px 5px rgba(239, 68, 68, 0.8)' },
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(var(--orbit-radius, 100px)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--orbit-radius, 100px)) rotate(-360deg)' },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to bottom right, hsl(5, 90%, 25%), hsl(0, 0%, 8%), hsl(0, 0%, 5%))',
        'hero-stars': 'radial-gradient(circle, transparent 20%, hsl(0, 0%, 8%) 80%), radial-gradient(circle, white 0.5px, transparent 0.5px)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, hsl(5, 90%, 55%) 0deg, hsl(50, 100%, 55%) 72deg, hsl(330, 85%, 65%) 144deg, hsl(135, 80%, 45%) 216deg, hsl(0, 0%, 40%) 288deg, hsl(5, 90%, 55%) 360deg)',
        'nxtmt-gradient': 'linear-gradient(to right, hsl(5, 90%, 55%), hsl(50, 100%, 55%), hsl(135, 80%, 45%), hsl(330, 85%, 65%))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backdropBlur: {
        'cosmic': '8px',
      },
    },
  },
} satisfies Config;