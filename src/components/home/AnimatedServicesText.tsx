import React, { useEffect, useRef } from 'react';

// Define service categories
const serviceLines = [
  [
    "Custom Web Development", 
    "Brand New Website Builds", 
    "Brand Story and Design", 
    "Logo Design", 
    "Custom Mobile Apps", 
    "Brand Creation", 
    "Customer Portals"
  ],
  [
    "Online Scheduling", 
    "Invoicing", 
    "E-commerce Stores", 
    "Service Company Websites", 
    "Employee Management Solutions", 
    "Search Engine Optimization", 
    "Google Local Services", 
    "Custom GPT Creation"
  ]
];

const AnimatedServicesText: React.FC = () => {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

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

    if (line1Ref.current) {
      observer.observe(line1Ref.current);
    }
    if (line2Ref.current) {
      observer.observe(line2Ref.current);
    }

    return () => {
      if (line1Ref.current) observer.unobserve(line1Ref.current);
      if (line2Ref.current) observer.unobserve(line2Ref.current);
    };
  }, []);

  return (
    <section className="pt-0 pb-12 overflow-hidden bg-gradient-to-b from-background/90 to-background relative">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-secondary/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">

        <div className="overflow-hidden max-w-6xl mx-auto">
          {/* First line of services */}
          <div 
            ref={line1Ref}
            className="flex space-x-6 mb-4 opacity-0 translate-x-8 transition-all duration-1000 ease-out"
          >
            {serviceLines[0].map((service, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-4 py-2 bg-primary/10 text-primary-foreground rounded-lg border border-primary/20 backdrop-blur-sm font-medium whitespace-nowrap"
              >
                {service}
              </div>
            ))}
            {/* Duplicate items for infinite scroll effect */}
            {serviceLines[0].map((service, index) => (
              <div 
                key={`dup-${index}`} 
                className="flex-shrink-0 px-4 py-2 bg-primary/10 text-primary-foreground rounded-lg border border-primary/20 backdrop-blur-sm font-medium whitespace-nowrap"
              >
                {service}
              </div>
            ))}
          </div>
          
          {/* Second line of services - opposite direction */}
          <div 
            ref={line2Ref}
            className="flex space-x-6 opacity-0 -translate-x-8 transition-all duration-1000 ease-out delay-300"
          >
            {serviceLines[1].map((service, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-4 py-2 bg-secondary/10 text-secondary-foreground rounded-lg border border-secondary/20 backdrop-blur-sm font-medium whitespace-nowrap"
              >
                {service}
              </div>
            ))}
            {/* Duplicate items for infinite scroll effect */}
            {serviceLines[1].map((service, index) => (
              <div 
                key={`dup-${index}`} 
                className="flex-shrink-0 px-4 py-2 bg-secondary/10 text-secondary-foreground rounded-lg border border-secondary/20 backdrop-blur-sm font-medium whitespace-nowrap"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CSS animations for marquee effect */}
      <style jsx>{`
        .animate-in {
          opacity: 1;
          transform: translateX(0);
          animation: scroll-right 30s linear infinite;
        }
        
        .animate-in + div {
          animation: scroll-left 30s linear infinite;
        }
        
        @keyframes scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes scroll-left {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};

export default AnimatedServicesText;