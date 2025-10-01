import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShopHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Direct DOM manipulation approach for more reliable animation
  useEffect(() => {
    // Elements to animate in
    if (containerRef.current) {
      const container = containerRef.current;
      const badge = container.querySelector('.hero-badge');
      const heading = container.querySelector('.hero-heading');
      const paragraph = container.querySelector('.hero-paragraph');
      const buttons = container.querySelector('.hero-buttons');
      
      // Apply animations sequentially with timeouts
      setTimeout(() => {
        if (badge) {
          badge.classList.remove('opacity-0');
          badge.classList.remove('translate-y-8');
        }
      }, 100);
      
      setTimeout(() => {
        if (heading) {
          heading.classList.remove('opacity-0');
          heading.classList.remove('-translate-y-10');
        }
      }, 300);
      
      setTimeout(() => {
        if (paragraph) {
          paragraph.classList.remove('opacity-0');
          paragraph.classList.remove('translate-y-10');
        }
      }, 500);
      
      setTimeout(() => {
        if (buttons) {
          buttons.classList.remove('opacity-0');
        }
      }, 700);
    }
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleScrollDown = () => {
    const servicesSection = document.getElementById('service-categories');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center px-4 py-24 overflow-hidden"
    >
      <div className="container mx-auto relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="hero-badge inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm opacity-0 translate-y-8 transition-all duration-700">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            <span>Premium Digital Services</span>
          </div>
          
          <h1
            className="hero-heading text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight text-white opacity-0 -translate-y-10 transition-all duration-700 ease-out"
          >
            Digital Solutions <span className="text-primary">Crafted</span> for Your Success
          </h1>
          
          <p className="hero-paragraph text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out">
            Elevate your brand with our comprehensive suite of digital services. 
            From stunning websites to powerful marketing strategies.
          </p>
          
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center opacity-0 transition-opacity duration-700 ease-out">
            <Button 
              size="lg" 
              className="group bg-primary hover:bg-primary/90 text-white py-6 px-8 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-300"
            >
              Explore Services
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="py-6 px-8 rounded-lg border-white/20 hover:border-white/50 transition-all duration-300"
              onClick={handleScrollDown}
            >
              <ArrowDown className="mr-2 h-4 w-4 animate-bounce" />
              See All Categories
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHero;