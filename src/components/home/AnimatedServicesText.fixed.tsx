import React, { useEffect, useRef } from 'react';

// Define service categories
const serviceLines = [
  [
    "Custom Web Development", 
    "Brand New Website Builds", 
    "Brand Story", 
    "Logo Design", 
    "Custom Mobile Apps", 
    "Brand Creation", 
    "Customer Portals",
    "Brand Strategy",
    "Customer Review Gathering",
    "Industry Positioning",
    "Social Media Management",
    "Website Redesigns",
    "Employee Portals",
    "CRM Solutions",
    "Brand Colors and Fonts",
    "Consultation",
    "Coaching",
    "Mobile Optimization"
  ],
  [
    "Online Scheduling Systems", 
    "Custom Payment & Invoicing Solutions", 
    "E-commerce Stores", 
    "Service Company Websites", 
    "Employee Management Solutions", 
    "Search Engine Optimization", 
    "Google Local Services", 
    "Custom GPT Creation",
    "Product Prototyping",
    "Product Packaging",
    "Shipping & Fulfillment Solutions",
    "Email Marketing Lists",
    "Email Marketing Campaigns",
    "Custom SMS Development",
    "Mass Text Marketing",
    "LLC Filing & Company Formation",
    "Launch Sites"
  ]
];

const AnimatedServicesText: React.FC = () => {
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const animationRef1 = useRef<Animation | null>(null);
  const animationRef2 = useRef<Animation | null>(null);
  
  // Clean implementation using Web Animations API instead of CSS
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === line1Ref.current) {
              line1Ref.current.style.opacity = '1';
              line1Ref.current.style.transform = 'translateX(0)';
              
              // Using Web Animations API for more reliable animation
              if (line1Ref.current && 'animate' in line1Ref.current) {
                // Cancel any existing animation
                if (animationRef1.current) {
                  animationRef1.current.cancel();
                }
                
                // Create new animation
                animationRef1.current = line1Ref.current.animate(
                  [
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(calc(-50% - 1rem))' }
                  ],
                  {
                    duration: 40000,
                    iterations: Infinity,
                    easing: 'linear'
                  }
                );
              }
            }
            
            if (entry.target === line2Ref.current) {
              line2Ref.current.style.opacity = '1';
              line2Ref.current.style.transform = 'translateX(0)';
              
              if (line2Ref.current && 'animate' in line2Ref.current) {
                // Cancel any existing animation
                if (animationRef2.current) {
                  animationRef2.current.cancel();
                }
                
                // Create new animation
                animationRef2.current = line2Ref.current.animate(
                  [
                    { transform: 'translateX(calc(-50% - 1rem))' },
                    { transform: 'translateX(0)' }
                  ],
                  {
                    duration: 40000,
                    iterations: Infinity,
                    easing: 'linear'
                  }
                );
              }
            }
          } else {
            // Pause animations when not visible to save resources
            if (entry.target === line1Ref.current && animationRef1.current) {
              animationRef1.current.pause();
            }
            if (entry.target === line2Ref.current && animationRef2.current) {
              animationRef2.current.pause();
            }
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
      // Clean up animations and observers
      if (line1Ref.current) observer.unobserve(line1Ref.current);
      if (line2Ref.current) observer.unobserve(line2Ref.current);
      
      if (animationRef1.current) animationRef1.current.cancel();
      if (animationRef2.current) animationRef2.current.cancel();
    };
  }, []);

  // Render with optimizations to prevent reloads
  return (
    <section className="pt-0 pb-12 overflow-hidden bg-gradient-to-b from-background/90 to-background relative">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-secondary/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="w-full px-4">
        <div className="overflow-hidden w-full">
          {/* First line of services */}
          <div 
            ref={line1Ref}
            className="flex space-x-6 mb-4 opacity-0 translate-x-8 transition-opacity duration-1000 ease-out"
            style={{ willChange: 'transform' }} // Performance optimization
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
            className="flex space-x-6 opacity-0 -translate-x-8 transition-opacity duration-1000 ease-out"
            style={{ willChange: 'transform' }} // Performance optimization
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
    </section>
  );
};

export default AnimatedServicesText;