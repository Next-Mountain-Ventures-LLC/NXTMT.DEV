import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-pattern z-0 opacity-50"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-gradient/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main content */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-3/5 space-y-8 animate-fade-in-up">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-primary">Building</span> great products. <br />
                <span className="relative">
                  On repeat.
                  <span className="absolute -bottom-2 left-0 w-16 h-1 bg-secondary"></span>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                We help innovative companies design and develop 
                <span className="text-foreground font-medium"> digital products </span> 
                that make an impact.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 transition-all duration-300 font-medium"
                >
                  Let's Talk
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 hover:bg-secondary/10 text-foreground transition-all duration-300"
                >
                  See Our Work
                </Button>
              </div>
            </div>
            
            {/* Hero image */}
            <div className="w-full md:w-2/5 relative mt-8 md:mt-0 animate-fade-in">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1658967136188-415466c22b9c?w=1200&h=600&auto=format&fit=crop&q=80" 
                  alt="Digital product design" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
              
              {/* Stats overlay */}
              <div className="absolute -bottom-4 -right-4 bg-card shadow-lg rounded-lg p-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="text-2xl font-serif font-bold text-primary">50+</div>
                <div className="text-sm">Happy Clients</div>
              </div>
              
              <div className="absolute -top-4 -left-4 bg-card shadow-lg rounded-lg p-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="text-2xl font-serif font-bold text-secondary">100+</div>
                <div className="text-sm">Projects Delivered</div>
              </div>
            </div>
          </div>
          
          {/* Client logos */}
          <div className="mt-20 md:mt-32 text-center">
            <div className="text-sm uppercase tracking-wider text-muted-foreground mb-6">Trusted by innovative companies</div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
              {/* Company logos would go here */}
              <div className="h-6 w-24 bg-foreground/20 rounded"></div>
              <div className="h-6 w-24 bg-foreground/20 rounded"></div>
              <div className="h-6 w-24 bg-foreground/20 rounded"></div>
              <div className="h-6 w-24 bg-foreground/20 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <a href="#services" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <span className="text-xs mb-2">Scroll to explore</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}