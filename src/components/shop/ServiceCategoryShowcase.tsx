import React, { useEffect, useRef, useState } from 'react';
import { 
  Globe, 
  Code, 
  Palette, 
  RefreshCcw, 
  Headphones, 
  Cpu, 
  Search, 
  MessageSquare,
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  link: string;
  delay: number;
}

const ServiceCategory: React.FC<CategoryProps> = ({ icon, title, description, color, link, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('appear');
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl p-6 border opacity-0 translate-y-8 transition-all duration-700 ease-out ${color} group`}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-background/10 backdrop-blur-sm -z-10"></div>
      
      {/* Icon */}
      <div className="mb-4 text-white">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 transition-colors duration-300 group-hover:border-white/40">
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-white/80 mb-4 text-sm leading-relaxed">{description}</p>
      
      <Button 
        variant="link" 
        className="text-white/70 hover:text-white p-0 group-hover:underline"
        asChild
      >
        <a href={link}>
          Explore Services
          <ArrowRight className="ml-2 h-3 w-3 opacity-50 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </Button>

      <style jsx>{`
        .appear {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

const ServiceCategoryShowcase: React.FC = () => {
  const categories: CategoryProps[] = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Web Development",
      description: "Custom websites and applications designed to elevate your digital presence.",
      color: "border-primary/40 hover:border-primary/70",
      link: "#web-services",
      delay: 100
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Branding",
      description: "Comprehensive brand identity creation to make your business unforgettable.",
      color: "border-purple-500/40 hover:border-purple-500/70",
      link: "#branding-services",
      delay: 200
    },
    {
      icon: <RefreshCcw className="h-6 w-6" />,
      title: "Integration",
      description: "Seamless integration services to connect your platforms and increase efficiency.",
      color: "border-blue-500/40 hover:border-blue-500/70",
      link: "#integration-services",
      delay: 300
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "SEO",
      description: "Optimize your online visibility and drive organic traffic to your digital platforms.",
      color: "border-green-500/40 hover:border-green-500/70",
      link: "#seo-services",
      delay: 400
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Development",
      description: "Custom software and application development tailored to your specific needs.",
      color: "border-amber-500/40 hover:border-amber-500/70",
      link: "#development-services",
      delay: 500
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "API Solutions",
      description: "Connect your systems with powerful API integrations and development.",
      color: "border-teal-500/40 hover:border-teal-500/70",
      link: "#api-solutions",
      delay: 600
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Consulting",
      description: "Strategic guidance and expert advice to transform your digital strategy.",
      color: "border-sky-500/40 hover:border-sky-500/70",
      link: "#consultation-services",
      delay: 700
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "Support",
      description: "Ongoing technical support and maintenance for your digital assets.",
      color: "border-rose-500/40 hover:border-rose-500/70",
      link: "#support-services",
      delay: 800
    }
  ];

  return (
    <section id="service-categories" className="py-16 relative overflow-hidden backdrop-blur-sm bg-black/20 rounded-xl border border-white/10">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm">
            <span>Our Services</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-2 leading-tight">
            Find The Perfect Digital Solution
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <ServiceCategory
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              color={category.color}
              link={category.link}
              delay={category.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoryShowcase;