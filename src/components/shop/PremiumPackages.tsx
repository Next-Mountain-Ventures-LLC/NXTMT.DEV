import React, { useRef, useEffect } from 'react';
import { Star, Check, ArrowUpRight, Package, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PackageFeature {
  text: string;
  included: boolean;
}

interface PremiumPackageProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: PackageFeature[];
  mostPopular?: boolean;
  link: string;
  gradient: string;
  delay: number;
}

const PremiumPackage: React.FC<PremiumPackageProps> = ({
  title,
  description,
  price,
  period,
  features,
  mostPopular,
  link,
  gradient,
  delay
}) => {
  const packageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('show');
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (packageRef.current) {
      observer.observe(packageRef.current);
    }

    return () => {
      if (packageRef.current) observer.unobserve(packageRef.current);
    };
  }, [delay]);

  return (
    <div 
      ref={packageRef}
      className={`relative rounded-xl overflow-hidden backdrop-blur-sm opacity-0 scale-95 transition-all duration-700 ease-out ${
        mostPopular 
          ? "border-2 border-primary" 
          : "border border-white/20 hover:border-white/40"
      } group`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 ${gradient} -z-10 opacity-20`}></div>
      
      {/* Popular badge */}
      {mostPopular && (
        <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-xs font-bold">
          MOST POPULAR
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-white/70 text-sm mb-6">{description}</p>
        
        <div className="mb-6">
          <div className="text-3xl font-bold text-white">{price}</div>
          <div className="text-white/60 text-sm">{period}</div>
        </div>
        
        <div className="mb-6 space-y-3">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`flex items-start ${feature.included ? "text-white/90" : "text-white/40 line-through"}`}
            >
              <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${feature.included ? "text-primary" : "text-white/30"}`} />
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
        
        <Button
          asChild
          className={`w-full ${
            mostPopular 
              ? "bg-primary hover:bg-primary/90" 
              : "bg-white/10 hover:bg-white/20 text-white"
          } transition-all duration-300 group-hover:translate-y-[-2px]`}
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            Get Started
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
      
      <style jsx>{`
        .show {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </div>
  );
};

const PremiumPackages: React.FC = () => {
  const packages: PremiumPackageProps[] = [
    {
      title: "Startup Package",
      description: "Essential digital solutions for new businesses and startups.",
      price: "$6,999",
      period: "One-time package",
      features: [
        { text: "Custom Website Design (5 pages)", included: true },
        { text: "Logo Design & Brand Identity", included: true },
        { text: "Social Media Setup", included: true },
        { text: "Basic SEO Implementation", included: true },
        { text: "Google Analytics Setup", included: true },
        { text: "Email Newsletter Setup", included: true },
        { text: "1 Month of Support", included: true },
        { text: "Content Creation", included: false },
        { text: "Advanced SEO Optimization", included: false },
        { text: "Custom App Development", included: false }
      ],
      link: "https://nxtmt.com/schedule",
      gradient: "bg-gradient-to-br from-blue-600 to-purple-600",
      delay: 100
    },
    {
      title: "Growth Package",
      description: "Comprehensive digital solutions for growing businesses.",
      price: "$12,999",
      period: "One-time package",
      features: [
        { text: "Custom Website Design (10 pages)", included: true },
        { text: "Complete Brand Identity Package", included: true },
        { text: "Social Media Strategy & Setup", included: true },
        { text: "Advanced SEO Implementation", included: true },
        { text: "Google Business Profile Optimization", included: true },
        { text: "Email Marketing Automation", included: true },
        { text: "3 Months of Support", included: true },
        { text: "Monthly Content Calendar", included: true },
        { text: "Basic CRM Integration", included: true },
        { text: "Custom App Development", included: false }
      ],
      mostPopular: true,
      link: "https://nxtmt.com/schedule",
      gradient: "bg-gradient-to-br from-red-600 to-amber-600",
      delay: 200
    },
    {
      title: "Enterprise Package",
      description: "Advanced digital ecosystem for established businesses.",
      price: "$24,999",
      period: "One-time package",
      features: [
        { text: "Custom Website Design (Unlimited)", included: true },
        { text: "Complete Brand Identity System", included: true },
        { text: "Full-Scale Digital Marketing", included: true },
        { text: "Enterprise SEO Strategy", included: true },
        { text: "Custom CRM Integration", included: true },
        { text: "Advanced Analytics Dashboard", included: true },
        { text: "6 Months of Support", included: true },
        { text: "Content Strategy & Creation", included: true },
        { text: "Social Media Management", included: true },
        { text: "Custom Web Application", included: true }
      ],
      link: "https://nxtmt.com/schedule",
      gradient: "bg-gradient-to-br from-indigo-600 to-cyan-600",
      delay: 300
    }
  ];

  return (
    <section id="premium-packages" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background via-gray-900/50 to-background -z-20"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-70 -z-10"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl opacity-70 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 backdrop-blur-sm">
            <Package className="h-3 w-3 mr-1" />
            <span>All-Inclusive Solutions</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            Premium Service Packages
          </h2>
          
          <p className="text-muted-foreground">
            Comprehensive packages designed to provide everything your business 
            needs to succeed in the digital landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <PremiumPackage
              key={index}
              title={pkg.title}
              description={pkg.description}
              price={pkg.price}
              period={pkg.period}
              features={pkg.features}
              mostPopular={pkg.mostPopular}
              link={pkg.link}
              gradient={pkg.gradient}
              delay={pkg.delay}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-bold text-white">Need a Custom Package?</h3>
            </div>
            
            <p className="text-white/70 mb-6">
              We understand that every business is unique. Contact us for a tailored 
              solution designed specifically for your business needs.
            </p>
            
            <Button asChild variant="outline" className="border-white/20 hover:bg-white/10">
              <a href="https://nxtmt.com/schedule" target="_blank" rel="noopener noreferrer">
                Request Custom Quote
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumPackages;