import React, { useState, useRef } from 'react';
import { Search, ArrowUpRight, Check, BarChart3, Globe, Target, TrendingUp, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SEOService {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  icon: React.ReactNode;
  popular?: boolean;
  link: string;
}

const SEOServiceCard: React.FC<{ service: SEOService; isActive: boolean; onSelect: () => void }> = ({ 
  service, 
  isActive,
  onSelect 
}) => {
  return (
    <div 
      className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
        isActive 
          ? "border-2 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          : "border border-white/10 hover:border-white/30"
      }`}
      onClick={onSelect}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-background/10 backdrop-blur-sm -z-10"></div>
      
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
            {service.icon}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
            {service.popular && (
              <div className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 mt-1">
                Popular Choice
              </div>
            )}
          </div>
        </div>
        
        <p className="text-white/70 text-sm mb-6">{service.description}</p>
        
        <div className="mb-6 space-y-2">
          {service.features.slice(0, 4).map((feature, idx) => (
            <div key={idx} className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-white/80">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-xl font-bold text-green-500">{service.price}</div>
          
          <Button
            asChild
            size="sm"
            variant="outline"
            className="gap-1 border-green-500/40 hover:bg-green-500/10 text-green-400"
          >
            <a href={service.link} target="_blank" rel="noopener noreferrer">
              Get Started
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

const SEOServices: React.FC = () => {
  const [activeService, setActiveService] = useState<string>("seo-audit");
  
  const services: SEOService[] = [
    {
      id: "seo-audit",
      title: "SEO Audit & Analysis",
      description: "Comprehensive analysis of your website's SEO performance with actionable recommendations.",
      features: [
        "Technical SEO audit",
        "Keyword ranking analysis",
        "Competitor analysis",
        "Content gap identification",
        "Mobile optimization assessment",
        "Page speed analysis",
        "Detailed recommendations report"
      ],
      price: "$1,499",
      icon: <BarChart3 className="h-5 w-5 text-green-400" />,
      link: "https://nxtmt.com/schedule",
      popular: true
    },
    {
      id: "local-seo",
      title: "Local SEO Package",
      description: "Boost your local search visibility and attract more customers in your area.",
      features: [
        "Google Business Profile optimization",
        "Local citation building",
        "Local keyword research",
        "Review management strategy",
        "Local link building",
        "Local content optimization",
        "Monthly performance reporting"
      ],
      price: "$999/mo",
      icon: <Globe className="h-5 w-5 text-green-400" />,
      link: "https://nxtmt.com/schedule"
    },
    {
      id: "seo-content",
      title: "SEO Content Creation",
      description: "High-quality, keyword-optimized content designed to improve rankings and engage users.",
      features: [
        "Keyword research & strategy",
        "SEO-optimized blog posts",
        "Landing page content",
        "Content calendar development",
        "Content gap analysis",
        "Competitor content analysis",
        "Monthly content production"
      ],
      price: "$1,299/mo",
      icon: <LineChart className="h-5 w-5 text-green-400" />,
      link: "https://nxtmt.com/schedule"
    },
    {
      id: "seo-campaign",
      title: "Comprehensive SEO Campaign",
      description: "Full-service SEO campaign to significantly improve your search engine rankings and traffic.",
      features: [
        "Technical SEO optimization",
        "On-page SEO implementation",
        "Content strategy & creation",
        "Link building campaign",
        "Monthly keyword tracking",
        "Competitor monitoring",
        "Detailed monthly reporting"
      ],
      price: "$2,499/mo",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      link: "https://nxtmt.com/schedule"
    },
    {
      id: "ecommerce-seo",
      title: "E-commerce SEO Package",
      description: "Specialized SEO strategies for online stores to increase product visibility and sales.",
      features: [
        "Product page optimization",
        "Category page optimization",
        "Product schema markup",
        "Shopping feed optimization",
        "Conversion rate optimization",
        "Competitor price monitoring",
        "Shopping campaign integration"
      ],
      price: "$1,999/mo",
      icon: <Target className="h-5 w-5 text-green-400" />,
      link: "https://nxtmt.com/schedule"
    }
  ];

  return (
    <section id="seo-services" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-green-500/5 rounded-full blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-green-500/20 border border-green-500/30 text-green-400 backdrop-blur-sm">
            <Search className="h-3 w-3 mr-1" />
            <span>Search Engine Optimization</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            SEO Services That Drive Results
          </h2>
          
          <p className="text-muted-foreground">
            Improve your online visibility, drive organic traffic, and outrank your 
            competitors with our data-driven SEO strategies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <SEOServiceCard
              key={service.id}
              service={service}
              isActive={activeService === service.id}
              onSelect={() => setActiveService(service.id)}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-white/60 mb-6">
            Not sure which SEO service is right for your business? 
            Schedule a free consultation to discuss your specific needs.
          </p>
          
          <Button asChild variant="default" className="bg-green-600 hover:bg-green-700">
            <a href="https://nxtmt.com/schedule" target="_blank" rel="noopener noreferrer">
              Get a Free SEO Consultation
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SEOServices;