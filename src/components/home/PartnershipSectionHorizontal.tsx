import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  TreeDeciduous, 
  Handshake, 
  ChevronRight, 
  LayoutTemplate, 
  ShieldCheck, 
  Search, 
  Layers, 
  CheckCircle, 
  DollarSign, 
  Briefcase 
} from 'lucide-react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <div className="flex items-start gap-3 group">
    <div className="bg-card/50 p-2 rounded-lg group-hover:bg-primary/10 transition-colors duration-300">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-sm mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

interface PartnershipTierProps {
  number: string;
  title: string;
  description: string;
  features: FeatureItemProps[];
  icon: React.ReactNode;
  buttonText: string;
  buttonLink: string;
  color: string;
  price?: string;
}

const PartnershipTier: React.FC<PartnershipTierProps> = ({
  number,
  title,
  description,
  features,
  icon,
  buttonText,
  buttonLink,
  color,
  price
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center py-14 relative">
      {/* Left side - number and connector line */}
      <div className="flex flex-col items-center">
        <div className={`flex justify-center items-center w-16 h-16 rounded-full ${color} text-white font-bold text-xl shadow-lg`}>
          {number}
        </div>
        <div className="h-full w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block absolute top-[5.5rem] left-8 -bottom-4"></div>
      </div>

      {/* Middle - icon and title */}
      <div className="flex-shrink-0 lg:w-64">
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold font-display">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
        
        {price && (
          <div className="mt-3 inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{price}</span>
          </div>
        )}
      </div>

      {/* Right - features and button */}
      <div className="flex flex-col flex-grow gap-6 bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        <Button
          className={`self-start ${color} hover:bg-opacity-90 text-white font-medium transition-colors`}
          onClick={() => window.open(buttonLink, '_blank')}
        >
          {buttonText}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const PartnershipSectionHorizontal: React.FC = () => {
  const partnershipTiers = [
    {
      number: "01",
      title: "Launch",
      description: "Get your idea off the ground with our affordable starter package",
      features: [
        { 
          icon: <LayoutTemplate className="w-5 h-5 text-primary" />,
          title: "Custom Built Website",
          description: "Professional site designed specifically for your brand at only $299"
        },
        { 
          icon: <Rocket className="w-5 h-5 text-primary" />,
          title: "Quick Deployment",
          description: "Fast turnaround with dedicated designer support"
        },
        { 
          icon: <Briefcase className="w-5 h-5 text-primary" />,
          title: "'First 100 Days' Template",
          description: "Notion brand template to guide you through early growth"
        },
        { 
          icon: <CheckCircle className="w-5 h-5 text-primary" />,
          title: "Essential Features",
          description: "Everything you need to establish your online presence"
        }
      ],
      icon: <Rocket className="h-6 w-6 text-primary" />,
      buttonText: "Launch Your Site",
      buttonLink: "/#contact",
      color: "bg-primary",
      price: "Starting at $299"
    },
    {
      number: "02",
      title: "Grow",
      description: "Scale your existing business with custom solutions and services",
      features: [
        { 
          icon: <LayoutTemplate className="w-5 h-5 text-secondary" />,
          title: "Custom WordPress",
          description: "Advanced websites with premium features starting at $1,500"
        },
        { 
          icon: <ShieldCheck className="w-5 h-5 text-secondary" />,
          title: "Security & Backups",
          description: "Enterprise-grade protection and automatic backup systems"
        },
        { 
          icon: <Search className="w-5 h-5 text-secondary" />,
          title: "SEO Optimization",
          description: "Search engine optimization to improve visibility and traffic"
        },
        { 
          icon: <Layers className="w-5 h-5 text-secondary" />,
          title: "Design Services",
          description: "Logo creation, website redesigns, and marketing materials"
        }
      ],
      icon: <TreeDeciduous className="h-6 w-6 text-secondary" />,
      buttonText: "Grow Your Business",
      buttonLink: "/#contact",
      color: "bg-secondary",
      price: "Starting at $1,500"
    },
    {
      number: "03",
      title: "Partner",
      description: "Join forces with our venture studio for long-term collaboration",
      features: [
        { 
          icon: <Briefcase className="w-5 h-5 text-accent" />,
          title: "Full Studio Access",
          description: "Leverage our entire creative team and technical resources"
        },
        { 
          icon: <DollarSign className="w-5 h-5 text-accent" />,
          title: "Equity Arrangements",
          description: "Flexible compensation through equity or profit-sharing models"
        },
        { 
          icon: <Handshake className="w-5 h-5 text-accent" />,
          title: "Strategic Partnership",
          description: "Long-term collaboration focused on sustainable growth"
        },
        { 
          icon: <CheckCircle className="w-5 h-5 text-accent" />,
          title: "Ongoing Support",
          description: "Continuous development and business guidance at every step"
        }
      ],
      icon: <Handshake className="h-6 w-6 text-accent" />,
      buttonText: "Apply for Partnership",
      buttonLink: "/#contact",
      color: "bg-accent"
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
        
        <div className="flex flex-col divide-y divide-border/30">
          {partnershipTiers.map((tier, index) => (
            <PartnershipTier
              key={index}
              number={tier.number}
              title={tier.title}
              description={tier.description}
              features={tier.features}
              icon={tier.icon}
              buttonText={tier.buttonText}
              buttonLink={tier.buttonLink}
              color={tier.color}
              price={tier.price}
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
            onClick={() => window.location.href = "/#contact"}
          >
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSectionHorizontal;
