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
        'sans': ['VT323', 'monospace'],
        'mono': ['"Source Code Pro"', 'monospace'],
        'retro': ['VT323', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cosmic-glow': 'cosmic-glow 8s infinite',
        'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
        'scan-line': 'scan-line 4s linear infinite',
        'blink': 'blink 1.2s infinite',
        'pixelate': 'pixelate 2s steps(10) infinite',
        'flicker': 'flicker 0.15s infinite',
        'crt-on': 'crt-on 2s',
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
        'glitch': {
          '0%': {
            transform: 'translate(0)',
            textShadow: '0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '5%': {
            transform: 'translate(0.5px, 0.2px)',
            textShadow: '2.7928974010788217px 0 1px rgba(0,30,255,0.5), -2.7928974010788217px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '10%': {
            transform: 'translate(0, -0.5px)',
            textShadow: '-0.02956275843481219px 0 1px rgba(0,30,255,0.5), 0.02956275843481219px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '15%': {
            transform: 'translate(-0.5px, -0.1px)',
            textShadow: '0.40218538552878136px 0 1px rgba(0,30,255,0.5), -0.40218538552878136px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '20%': {
            transform: 'translate(0.3px, 1px)',
            textShadow: '1.7718014761134232px 0 1px rgba(0,30,255,0.5), -1.7718014761134232px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '25%': {
            transform: 'translate(1px, -0.5px)',
            textShadow: '-0.7706252817559187px 0 1px rgba(0,30,255,0.5), 0.7706252817559187px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '30%': {
            transform: 'translate(-0.1px, -0.3px)',
            textShadow: '-1.637306482990575px 0 1px rgba(0,30,255,0.5), 1.637306482990575px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '35%': {
            transform: 'translate(-1.5px, 0.2px)',
            filter: 'blur(0)'
          },
          '40%': {
            transform: 'translate(0, 0)',
            filter: 'blur(0)'
          },
          '45%': {
            transform: 'translate(0, 0)',
            filter: 'blur(0)'
          },
          '50%': {
            transform: 'translate(0, 0)',
            filter: 'blur(0)'
          },
          '55%': {
            transform: 'translate(0, 0)',
            filter: 'blur(0)'
          },
          '60%': {
            transform: 'translate(0, 0)',
            textShadow: '0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '65%': {
            transform: 'translate(0, 0)',
            textShadow: '0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '70%': {
            transform: 'translate(0, 0)',
            textShadow: '0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '75%': {
            transform: 'translate(0, 0)',
            textShadow: '0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '80%': {
            transform: 'translate(-0.2px, -0.5px)',
            textShadow: '2.7928974010788217px 0 1px rgba(0,30,255,0.5), -2.7928974010788217px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '85%': {
            transform: 'translate(0.1px, 0.2px)',
            textShadow: '-0.02956275843481219px 0 1px rgba(0,30,255,0.5), 0.02956275843481219px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '90%': {
            transform: 'translate(0.4px, -0.1px)',
            textShadow: '0.40218538552878136px 0 1px rgba(0,30,255,0.5), -0.40218538552878136px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '95%': {
            transform: 'translate(-0.2px, 0.2px)',
            textShadow: '1.7718014761134232px 0 1px rgba(0,30,255,0.5), -1.7718014761134232px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          },
          '100%': {
            transform: 'translate(0)',
            textShadow: '0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px'
          }
        },
        'scan-line': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'blink': {
          '0%': { opacity: '1' },
          '49%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
        'pixelate': {
          '0%': { filter: 'pixelate(1px)' },
          '50%': { filter: 'pixelate(4px)' },
          '100%': { filter: 'pixelate(1px)' },
        },
        'flicker': {
          '0%': { opacity: '0.7' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.7' }
        },
        'crt-on': {
          '0%': { transform: 'scale(0, 0.1)', opacity: '0' },
          '50%': { transform: 'scale(1, 0.1)', opacity: '0.5' },
          '100%': { transform: 'scale(1, 1)', opacity: '1' }
        },
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(180deg, #000000, #150505)',
        'hero-stars': 'radial-gradient(circle, transparent 20%, #150505 80%), radial-gradient(circle, white 0.5px, transparent 0.5px)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #FF0000 0deg, #FF3300 72deg, #FFCC00 144deg, #FF6600 216deg, #FF0000 288deg, #FF0000 360deg)',
        'nxtmt-gradient': 'linear-gradient(to right, #FF0000, #FFCC00, #FF6600, #CC0000)',
        'pixel-grid': 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.11), rgba(0, 0, 0, 0.11) 1px, transparent 1px, transparent 2px)',
        'scan-lines': 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) 1px, transparent 1px, transparent 2px)',
        'crt-screen': 'radial-gradient(ellipse at center, rgba(25, 0, 0, 0.7) 0%, rgba(0, 0, 0, 1) 90%)',
        'retro-grid': 'linear-gradient(90deg, rgba(80, 0, 0, 0.2) 1px, transparent 0px), linear-gradient(0deg, rgba(80, 0, 0, 0.2) 1px, transparent 0px)',
      },
      backdropBlur: {
        'cosmic': '8px',
      },
    },
  },
} satisfies Config;