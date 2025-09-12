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
        'sans': ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        'serif': ['"IBM Plex Serif"', 'Georgia', 'serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'fade-in-down': 'fadeInDown 0.7s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'bounce-in': 'bounceIn 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000)',
        'text-focus-in': 'textFocusIn 1s ease-out',
        'color-cycle': 'colorCycle 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '20%': { transform: 'scale(1.1)' },
          '40%': { transform: 'scale(0.9)' },
          '60%': { transform: 'scale(1.03)', opacity: '1' },
          '80%': { transform: 'scale(0.97)' },
          '100%': { transform: 'scale(1)' },
        },
        textFocusIn: {
          '0%': { filter: 'blur(12px)', opacity: '0' },
          '100%': { filter: 'blur(0)', opacity: '1' },
        },
        colorCycle: {
          '0%, 100%': { color: 'hsl(var(--primary))' },
          '25%': { color: 'hsl(var(--secondary))' },
          '50%': { color: 'hsl(var(--accent))' },
          '75%': { color: 'hsl(var(--success))' },
        },
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #0070F3 0%, #00C8FF 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0E182A 0%, #091019 100%)',
        'hero-pattern': 'radial-gradient(circle 800px at 50% 50%, rgba(0, 112, 243, 0.1) 0%, transparent 100%)',
        'dots-pattern': 'radial-gradient(circle 1px at center, rgba(0, 0, 0, 0.2) 0%, transparent 1px)',
        'soft-grid': 'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
        'brand-gradient': 'linear-gradient(to right, #0070F3, #00C8FF, #84cc16, #fbbf24)',
        'card-highlight': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), transparent)',
        'button-gradient': 'linear-gradient(to right, #0070F3, #00C8FF)',
        'section-divider': 'linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1), transparent)',
      },
      backdropBlur: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
    },
  },
} satisfies Config;