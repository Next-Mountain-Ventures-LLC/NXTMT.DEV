import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Star, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background with stars */}
      <div 
        className="absolute inset-0 bg-cosmic-gradient bg-hero-stars bg-[size:50px_50px] z-0"
        style={{ backgroundSize: '50px 50px' }}
      >
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
          <span>Venture Studio & Web Agency</span>
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl font-display">
          <span className="block text-white">A new kind of</span>
          <span className="block font-bold text-primary animate-pulse-slow">
            Venture Studio
          </span>
        </h1>

        <p className="max-w-lg mx-auto mb-8 text-lg text-muted-foreground md:text-xl">
          Building businesses together
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-primary/90 hover:bg-primary shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.8)] transition-all duration-300 font-medium rounded-full px-6 py-4 text-sm"
          >
            Start Your Project
            <Rocket className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary/50 bg-background/50 hover:bg-background/80 backdrop-blur-sm text-foreground transition-all duration-300 font-medium rounded-full px-6 py-4 text-sm"
          >
            See Our Work
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