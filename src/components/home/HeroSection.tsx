import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Star, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background with stars */}
      <div 
        className="absolute inset-0 bg-cosmic-gradient bg-retro-grid bg-[size:40px_40px] z-0"
      >
        {/* CRT screen gradient overlay */}
        <div className="absolute inset-0 bg-crt-screen opacity-50"></div>
        {/* Animated floating elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-star-twinkle" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-secondary rounded-full animate-star-twinkle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-star-twinkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-star-twinkle" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-accent rounded-full animate-star-twinkle" style={{ animationDelay: '2s' }}></div>
        
        {/* Larger glowing elements */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container relative z-10 px-4 py-32 mx-auto text-center">
        <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm">
          <Star className="w-3.5 h-3.5 mr-1.5" />
          <span>Creative Studio & Web Agency</span>
        </div>

        <div className="mb-6 animate-crt-on">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl">
            <div className="mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text">
              <span className="animate-flicker inline-block text-foreground" 
                  style={{ textShadow: '0 0 5px #FF33A8, 0 0 10px #FF33A8' }}>
                WE BUILD DIGITAL
              </span>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <span className="text-foreground inline-block" 
                  style={{ textShadow: '0 0 5px currentColor' }}>
                &lt;EXPERIENCES
              </span>
              <span className="animate-blink inline-block">_</span>
              <span className="text-foreground inline-block"
                  style={{ textShadow: '0 0 5px currentColor' }}>
                THAT
              </span>
              <span className="relative inline-block font-bold">
                <span className="animate-glitch px-2" style={{
                  background: 'linear-gradient(to right, #FF33A8, #FFCC00, #00FFCC, #33FF00)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                  display: 'inline-block',
                  letterSpacing: '0.1em',
                  filter: 'drop-shadow(0 0 8px rgba(255, 51, 168, 0.7))'
                }}>
                  INSPIRE
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-nxtmt-gradient rounded-sm"></span>
              </span>
              <span className="text-foreground inline-block" 
                  style={{ textShadow: '0 0 5px currentColor' }}>
                /&gt;
              </span>
            </div>
          </h1>
        </div>

        <p className="max-w-lg mx-auto mb-8 text-lg text-muted-foreground md:text-xl">
          We craft stunning websites, powerful brands, and innovative digital solutions that help businesses stand out in the digital cosmos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(255,51,168,0.7)] hover:shadow-[0_0_25px_rgba(255,51,168,0.9)] transition-all duration-300 font-medium px-6 py-3 text-sm border-2 border-primary/70"
          >
            Start_Your_Project.exe
            <Rocket className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-accent bg-background/30 backdrop-blur-sm text-accent hover:text-accent-foreground hover:bg-accent/90 transition-all duration-300 font-mono uppercase tracking-widest px-6 py-3 text-sm"
          >
            See_Our_Work.exe
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-foreground/70" />
        </div>
      </div>
    </section>
  );
}