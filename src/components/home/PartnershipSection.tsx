import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, TreeDeciduous, Handshake, ChevronRight } from 'lucide-react';

interface PartnershipTierProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  buttonText: string;
  buttonLink: string;
  primaryColor: string;
  secondaryColor: string;
}

const PartnershipTier: React.FC<PartnershipTierProps> = ({
  title,
  description,
  features,
  icon,
  buttonText,
  buttonLink,
  primaryColor,
  secondaryColor
}) => {
  return (
    <div className="flex flex-col h-full bg-card/30 backdrop-blur-sm rounded-xl border border-border/40 overflow-hidden transition-all hover:shadow-lg hover:shadow-[var(--color-primary)]">
      <div className={`p-6 ${primaryColor}`}>
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-2xl font-bold font-display text-white drop-shadow-sm">{title}</h3>
        </div>
        <p className="text-white drop-shadow-sm">{description}</p>
      </div>
      
      <div className={`flex-grow p-6 bg-card/50 ${secondaryColor}`}>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <ChevronRight className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto">
          <Button
            className="w-full bg-background/90 hover:bg-primary text-foreground hover:text-white border border-border transition-colors"
            onClick={() => window.open(buttonLink, '_blank')}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

const PartnershipSection: React.FC = () => {
  const partnershipTiers = [
    {
      title: "Launch",
      description: "Get your idea off the ground with our affordable starter package",
      features: [
        "Custom built website for only $299",
        "Quick deployment with designer support",
        "'First 100 Days' Notion brand template",
        "Essential features to get you started",
        "Perfect for new businesses and MVPs"
      ],
      icon: <Rocket className="h-8 w-8 text-white" />,
      buttonText: "Launch Your Site",
      buttonLink: "/#contact",
      primaryColor: "bg-primary",
      secondaryColor: "text-primary-foreground/80"
    },
    {
      title: "Grow",
      description: "Scale your existing business with custom solutions and services",
      features: [
        "Custom WordPress websites starting at $1,500",
        "Advanced features including backups & security",
        "Search Engine Optimization services",
        "Logo design and website redesigns",
        "Marketing consultation services"
      ],
      icon: <TreeDeciduous className="h-8 w-8 text-white" />,
      buttonText: "Grow Your Business",
      buttonLink: "/#contact",
      primaryColor: "bg-secondary",
      secondaryColor: "text-secondary-foreground/80"
    },
    {
      title: "Partner",
      description: "Join forces with our venture studio for long-term collaboration",
      features: [
        "Full creative studio resources at your disposal",
        "Equity or profit-sharing arrangements",
        "Apply-only exclusive program",
        "Strategic business planning and execution",
        "Ongoing support and development"
      ],
      icon: <Handshake className="h-8 w-8 text-white" />,
      buttonText: "Apply for Partnership",
      buttonLink: "/#contact",
      primaryColor: "bg-accent",
      secondaryColor: "text-accent-foreground/80"
    }
  ];

  return (
    <section id="partnerships" className="py-24 relative overflow-hidden bg-gradient-to-t from-background/80 to-background">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-r from-secondary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-3/4 right-1/4 w-1/4 h-1/4 bg-gradient-to-l from-accent/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm">
            <span>How We Work</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            Partner With Us at Any Stage
          </h2>
          
          <p className="text-muted-foreground">
            We offer three distinct ways to work together, designed to meet your business needs wherever you are in your journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {partnershipTiers.map((tier, index) => (
            <PartnershipTier
              key={index}
              title={tier.title}
              description={tier.description}
              features={tier.features}
              icon={tier.icon}
              buttonText={tier.buttonText}
              buttonLink={tier.buttonLink}
              primaryColor={tier.primaryColor}
              secondaryColor={tier.secondaryColor}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            From launching a new brand to growing your existing business or forming a long-term partnership,
            we're here to help take things to the next level.
          </p>
          
          <Button 
            size="lg"
            className="bg-primary/90 hover:bg-primary shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.8)] transition-all duration-300 font-medium rounded-full px-6 py-4 text-sm"
            onClick={() => window.open("https://api.new.website/api/submit-form/?form=contact", "_blank")}
          >
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
