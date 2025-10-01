import React, { useEffect, useRef } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShopHero: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  const handleScrollDown = () => {
    const servicesSection = document.getElementById('web-services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center px-4 pt-24 pb-36 overflow-hidden"
    >
      <div className="container mx-auto relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm transform transition-all duration-700 opacity-0 translate-y-8 delay-300 group-hover:opacity-100 group-hover:translate-y-0">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            <span>Premium Digital Services</span>
          </div>
          
          <h1
            ref={textRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-foreground to-white opacity-0 transform -translate-y-10 transition-all duration-700 ease-out delay-150"
          >
            Digital Solutions <span className="text-primary">Crafted</span> for Your Success
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0 transform translate-y-10 transition-all duration-700 ease-out delay-300">
            Elevate your brand with our comprehensive suite of digital services. 
            From stunning websites to powerful marketing strategies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 transition-opacity duration-700 ease-out delay-500">
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
              See Services
            </Button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .animate-in > * {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default ShopHero;