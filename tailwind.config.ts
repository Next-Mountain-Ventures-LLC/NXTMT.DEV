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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'cosmic-glow': {
          '0%, 100%': { boxShadow: '0 0 15px 0 rgba(147, 51, 234, 0.5)' },
          '50%': { boxShadow: '0 0 25px 5px rgba(147, 51, 234, 0.8)' },
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to bottom right, hsl(265, 89%, 10%), hsl(230, 25%, 5%), hsl(265, 89%, 5%))',
        'hero-stars': 'radial-gradient(circle, transparent 20%, hsl(230, 25%, 5%) 80%), radial-gradient(circle, white 0.5px, transparent 0.5px)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, hsl(265, 89%, 62%) 0deg, hsl(220, 89%, 57%) 72deg, hsl(330, 100%, 65%) 144deg, hsl(120, 95%, 55%) 216deg, hsl(170, 75%, 50%) 288deg, hsl(265, 89%, 62%) 360deg)',
      },
      backdropBlur: {
        'cosmic': '8px',
      },
    },
  },
} satisfies Config;