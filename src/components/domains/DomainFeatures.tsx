import React from 'react';
import { 
  Shield, 
  Rocket, 
  Lock, 
  RefreshCw, 
  Server, 
  Globe 
} from 'lucide-react';

const features = [
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Global Reach",
    description: "Secure a domain that makes your business accessible worldwide with instant registration."
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Privacy Protection",
    description: "All domains come with free WHOIS privacy protection to safeguard your personal information."
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: "Quick Setup",
    description: "Get your domain live within minutes with our streamlined registration process."
  },
  {
    icon: <Lock className="h-10 w-10 text-primary" />,
    title: "Domain Security",
    description: "Advanced security features to prevent unauthorized domain transfers and hijacking."
  },
  {
    icon: <RefreshCw className="h-10 w-10 text-primary" />,
    title: "Auto-Renewal",
    description: "Never lose your domain with optional automatic renewal service for peace of mind."
  },
  {
    icon: <Server className="h-10 w-10 text-primary" />,
    title: "DNS Management",
    description: "Easy-to-use DNS management tools for complete control over your domain settings."
  }
];

const DomainFeatures: React.FC = () => {
  return (
    <section className="py-16 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Everything You Need for Your Domain
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide all the tools and features necessary to manage your domains effectively and securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card p-6 rounded-xl border border-border transition-all duration-300 hover:shadow-md hover:border-primary/20"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainFeatures;