import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Globe, ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  popular?: boolean;
  link: string;
}

const WebServiceCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);
  
  const services: Service[] = [
    {
      id: "service-1",
      title: "Custom Website Development",
      description: "Fully custom website designed and developed to your exact specifications. Includes responsive design, content management system, and SEO optimization.",
      price: "Starting at $4,999",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3", // New image URL
      features: [
        "Custom design & development",
        "Responsive across all devices",
        "Content Management System",
        "SEO optimization",
        "Performance optimization",
        "Analytics integration"
      ],
      popular: true,
      link: "https://nxtmt.com/schedule"
    },
    {
      id: "service-2",
      title: "E-commerce Website",
      description: "Powerful e-commerce platform to sell your products online. Includes product management, secure checkout, and customer account functionality.",
      price: "Starting at $6,999",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
      features: [
        "Product catalog management",
        "Secure payment processing",
        "Customer accounts",
        "Order management",
        "Inventory tracking",
        "Marketing tools integration"
      ],
      link: "https://nxtmt.com/schedule"
    },
    {
      id: "service-3",
      title: "Website Redesign",
      description: "Revamp your existing website with modern design trends, improved user experience, and enhanced performance.",
      price: "Starting at $3,499",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYnNpdGUlMjByZWRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
      features: [
        "Modern design refresh",
        "User experience optimization",
        "Speed optimization",
        "Mobile responsiveness",
        "SEO enhancement",
        "Analytics & tracking setup"
      ],
      link: "https://nxtmt.com/schedule"
    },
    {
      id: "service-4",
      title: "Single Page Application",
      description: "Fast, interactive web application built with modern frameworks. Perfect for dashboards, tools, and specialized web applications.",
      price: "Starting at $7,999",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGFzaGJvYXJkfGVufDB8fDB8fHww",
      features: [
        "Modern framework (React, Vue, Angular)",
        "High performance",
        "Interactive UI/UX",
        "API integration",
        "Authentication & security",
        "Real-time capabilities"
      ],
      link: "https://nxtmt.com/schedule"
    },
    {
      id: "service-5",
      title: "WordPress Development",
      description: "Professional WordPress website with custom theme development, plugin integration, and performance optimization.",
      price: "Starting at $3,499",
      image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d29yZHByZXNzfGVufDB8fDB8fHww",
      features: [
        "Custom theme development",
        "Plugin integration & customization",
        "Content management setup",
        "Performance optimization",
        "SEO configuration",
        "Security hardening"
      ],
      link: "https://nxtmt.com/schedule"
    }
  ];

  // Initialize with the first service
  useEffect(() => {
    if (services.length > 0 && !activeService) {
      setActiveService(services[0].id);
    }
  }, []);

  // Handle scroll actions
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="web-services" className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-black to-background">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm">
              <Globe className="h-3 w-3 mr-1" />
              <span>Web Services</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 md:mb-0 leading-tight">
              Professional Web Development Solutions
            </h2>
          </div>
          
          <Button 
            variant="ghost" 
            className="group text-foreground hover:text-primary"
          >
            View All Web Services
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="relative w-full mb-8">
          {/* Scroll buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-primary/80 p-2 rounded-full text-white transition-colors duration-300"
            aria-label="Scroll left"
            type="button"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-primary/80 p-2 rounded-full text-white transition-colors duration-300"
            aria-label="Scroll right"
            type="button"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Scrollable container */}
          <div 
            ref={carouselRef}
            className="no-scrollbar flex py-8 overflow-x-auto snap-x snap-mandatory scroll-pl-6 px-6 gap-6"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {services.map((service) => (
              <div 
                key={service.id} 
                className="snap-center flex-shrink-0 w-full md:w-[350px] lg:w-[400px]"
                onClick={() => setActiveService(service.id)}
              >
                <div 
                  className={`h-full rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 group ${
                    activeService === service.id 
                      ? "border-2 border-primary/80 shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                      : "border border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.src = "https://images.unsplash.com/photo-1595844730298-b960ff98fee0?auto=format&fit=crop&q=80&w=1000";
                      }}
                    />
                    
                    {service.popular && (
                      <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Popular
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{service.description}</p>
                    
                    <div className="mb-6">
                      <div className="text-sm font-medium text-white/50 mb-2">Includes:</div>
                      <div className="grid grid-cols-1 gap-2">
                        {service.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-white/80">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-primary">
                        {service.price}
                      </div>
                      
                      <Button
                        asChild
                        size="sm"
                        className="gap-1"
                      >
                        <a href={service.link} target="_blank" rel="noopener noreferrer">
                          Get Started
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient fades at the edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default WebServiceCarousel;