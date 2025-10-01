import React, { useRef, useEffect } from 'react';
import { RefreshCcw, ArrowUpRight, Check, PlugZap, Shield, Database, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntegrationServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  price: string;
  link: string;
  color: string;
  delay: number;
}

const IntegrationService: React.FC<IntegrationServiceProps> = ({
  icon,
  title,
  description,
  features,
  price,
  link,
  color,
  delay
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fade-in');
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
      className={`relative rounded-xl overflow-hidden backdrop-blur-sm border ${color} opacity-0 translate-y-10 transition-all duration-700 ease-out`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-background/10 -z-10"></div>
      
      <div className="p-6">
        <div className="mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-white/70 text-sm mb-6">{description}</p>
        
        <div className="mb-6">
          <div className="text-sm font-medium text-white/50 mb-2">Features:</div>
          <div className="space-y-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div className="text-xl font-bold text-primary">
            {price}
          </div>
          
          <Button
            asChild
            size="sm"
            variant="outline"
            className="gap-1 border-white/20 hover:bg-white/10"
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              Get Started
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
      
      <style jsx>{`
        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

const IntegrationServices: React.FC = () => {
  const services: IntegrationServiceProps[] = [
    {
      icon: <PlugZap className="h-8 w-8 text-blue-400" />,
      title: "API Integration",
      description: "Connect your systems with third-party services through robust API integrations.",
      features: [
        "Custom API development",
        "Third-party API integration",
        "Webhooks implementation",
        "Secure authentication",
        "Performance optimization"
      ],
      price: "Starting at $2,499",
      link: "https://nxtmt.com/schedule",
      color: "border-blue-500/40 hover:border-blue-500/70",
      delay: 100
    },
    {
      icon: <Shield className="h-8 w-8 text-green-400" />,
      title: "Payment Gateway Integration",
      description: "Securely integrate payment processors into your website or application.",
      features: [
        "Stripe integration",
        "PayPal implementation",
        "Square processing",
        "Secure checkout flow",
        "PCI compliance"
      ],
      price: "Starting at $1,999",
      link: "https://nxtmt.com/schedule",
      color: "border-green-500/40 hover:border-green-500/70",
      delay: 200
    },
    {
      icon: <Database className="h-8 w-8 text-purple-400" />,
      title: "CRM Integration",
      description: "Connect your customer relationship management tools with your website and other systems.",
      features: [
        "Data synchronization",
        "Automated workflows",
        "Custom field mapping",
        "Lead capture integration",
        "Analytics setup"
      ],
      price: "Starting at $2,999",
      link: "https://nxtmt.com/schedule",
      color: "border-purple-500/40 hover:border-purple-500/70",
      delay: 300
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-amber-400" />,
      title: "Messaging & Communication",
      description: "Implement SMS, email, and chat capabilities into your digital platforms.",
      features: [
        "Twilio SMS integration",
        "Email service setup",
        "Live chat implementation",
        "Notification systems",
        "Automated messaging"
      ],
      price: "Starting at $1,799",
      link: "https://nxtmt.com/schedule",
      color: "border-amber-500/40 hover:border-amber-500/70",
      delay: 400
    }
  ];

  return (
    <section id="integration-services" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 backdrop-blur-sm">
            <RefreshCcw className="h-3 w-3 mr-1" />
            <span>Seamless Connections</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            Powerful Integration Services
          </h2>
          
          <p className="text-muted-foreground">
            Connect your business systems and third-party services for streamlined operations 
            and enhanced functionality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <IntegrationService
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              price={service.price}
              link={service.link}
              color={service.color}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationServices;