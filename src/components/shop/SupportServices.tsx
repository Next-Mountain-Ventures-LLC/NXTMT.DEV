import React, { useEffect, useRef } from 'react';
import { Headphones, Shield, ArrowUpRight, Clock, CalendarClock, Wrench, Gauge, Monitor, HelpCircle, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SupportPlan {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  period: string;
  responseTime: string;
  supportHours: string;
  features: string[];
  popular?: boolean;
  link: string;
  color: string;
  delay: number;
}

const SupportPlanCard: React.FC<SupportPlan> = ({
  title,
  description,
  icon,
  price,
  period,
  responseTime,
  supportHours,
  features,
  popular,
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
              entry.target.classList.add('flip-in');
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
      className={`relative rounded-xl overflow-hidden backdrop-blur-sm opacity-0 transform rotate-y-10 transition-all duration-700 ease-out ${color} group`}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/60 to-background/20 -z-10"></div>
      
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center`}>
            {icon}
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-white/70 text-sm mt-1">{description}</p>
          </div>
        </div>
        
        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline">
            <div className="text-2xl font-bold text-rose-500">{price}</div>
            <div className="text-white/60 text-xs ml-1">/{period}</div>
          </div>
        </div>
        
        {/* Response time & support hours */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3 text-center">
            <div className="flex justify-center mb-1">
              <Clock className="h-4 w-4 text-rose-400" />
            </div>
            <div className="text-xs text-white/60">Response Time</div>
            <div className="text-sm font-medium text-white/90">{responseTime}</div>
          </div>
          
          <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3 text-center">
            <div className="flex justify-center mb-1">
              <CalendarClock className="h-4 w-4 text-rose-400" />
            </div>
            <div className="text-xs text-white/60">Support Hours</div>
            <div className="text-sm font-medium text-white/90">{supportHours}</div>
          </div>
        </div>
        
        {/* Features list */}
        <div className="mb-6">
          <div className="text-xs uppercase text-white/60 mb-3">Includes:</div>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-rose-500/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <span className="text-rose-500 text-xs">✓</span>
                </div>
                <span className="text-sm text-white/80">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* CTA Button */}
        <Button
          asChild
          className={`w-full ${
            popular 
              ? "bg-rose-600 hover:bg-rose-700" 
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
        .flip-in {
          opacity: 1;
          transform: rotateY(0);
        }
        
        @keyframes rotate-y {
          from {
            transform: rotateY(10deg);
            opacity: 0;
          }
          to {
            transform: rotateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

const SupportServices: React.FC = () => {
  const supportPlans: SupportPlan[] = [
    {
      title: "Basic Support",
      description: "Essential support for small businesses and startups.",
      icon: <HelpCircle className="h-6 w-6 text-rose-400" />,
      price: "$499",
      period: "month",
      responseTime: "Within 24 hours",
      supportHours: "Business hours",
      features: [
        "Email support",
        "Bug fixes",
        "Basic technical support",
        "Monthly system health check",
        "Documentation access",
        "Basic security monitoring"
      ],
      link: "https://nxtmt.com/schedule",
      color: "border border-rose-500/40 hover:border-rose-500/70",
      delay: 100
    },
    {
      title: "Standard Support",
      description: "Comprehensive support package for growing businesses.",
      icon: <Headphones className="h-6 w-6 text-rose-400" />,
      price: "$999",
      period: "month",
      responseTime: "Within 8 hours",
      supportHours: "Extended hours",
      features: [
        "Email & phone support",
        "Priority bug fixes",
        "Technical consultation",
        "Weekly system health check",
        "Remote troubleshooting",
        "Security monitoring & alerts",
        "Minor feature updates",
        "Monthly performance reports"
      ],
      popular: true,
      link: "https://nxtmt.com/schedule",
      color: "border-2 border-rose-500/60 hover:border-rose-500/90",
      delay: 200
    },
    {
      title: "Premium Support",
      description: "Comprehensive support with dedicated assistance for enterprise clients.",
      icon: <Shield className="h-6 w-6 text-rose-400" />,
      price: "$1,999",
      period: "month",
      responseTime: "Within 4 hours",
      supportHours: "24/7/365",
      features: [
        "24/7 email, phone & chat support",
        "Dedicated support representative",
        "Emergency bug fixes",
        "Advanced technical consultation",
        "Daily system health checks",
        "Proactive monitoring & optimization",
        "Feature enhancements",
        "Quarterly strategy meetings",
        "Training & documentation"
      ],
      link: "https://nxtmt.com/schedule",
      color: "border border-rose-500/40 hover:border-rose-500/70",
      delay: 300
    }
  ];
  
  const additionalServices = [
    {
      title: "Emergency Support",
      description: "24/7 emergency technical support for critical issues.",
      icon: <Wrench className="h-5 w-5 text-rose-400" />,
      price: "$249/hour"
    },
    {
      title: "Performance Optimization",
      description: "Identify and resolve performance bottlenecks in your systems.",
      icon: <Gauge className="h-5 w-5 text-rose-400" />,
      price: "From $1,499"
    },
    {
      title: "System Monitoring",
      description: "Proactive monitoring and alerting for your applications and infrastructure.",
      icon: <Monitor className="h-5 w-5 text-rose-400" />,
      price: "From $399/month"
    },
    {
      title: "Server Maintenance",
      description: "Regular maintenance, updates, and security patches for your servers.",
      icon: <Server className="h-5 w-5 text-rose-400" />,
      price: "From $599/month"
    }
  ];

  return (
    <section id="support-services" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 backdrop-blur-sm">
            <Headphones className="h-3 w-3 mr-1" />
            <span>Technical Support</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            Ongoing Support Services
          </h2>
          
          <p className="text-muted-foreground">
            Reliable technical support and maintenance services to keep your digital 
            assets running smoothly and securely.
          </p>
        </div>
        
        {/* Support plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {supportPlans.map((plan, index) => (
            <SupportPlanCard
              key={index}
              title={plan.title}
              description={plan.description}
              icon={plan.icon}
              price={plan.price}
              period={plan.period}
              responseTime={plan.responseTime}
              supportHours={plan.supportHours}
              features={plan.features}
              popular={plan.popular}
              link={plan.link}
              color={plan.color}
              delay={plan.delay}
            />
          ))}
        </div>
        
        {/* Additional services */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold font-display mb-8 text-center">Additional Support Services</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10 hover:border-rose-500/30 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center mr-3">
                    {service.icon}
                  </div>
                  <h4 className="font-medium text-white">{service.title}</h4>
                </div>
                
                <p className="text-white/70 text-sm mb-4">{service.description}</p>
                
                <div className="text-rose-500 font-bold">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-block max-w-3xl mx-auto bg-gradient-to-br from-rose-900/30 to-rose-800/10 rounded-xl p-8 backdrop-blur-sm border border-rose-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Support Plan?</h3>
            <p className="text-white/70 mb-6">
              We understand that every business has unique support requirements. Contact us 
              to discuss a tailored support solution designed specifically for your needs.
            </p>
            
            <Button asChild className="bg-rose-600 hover:bg-rose-700 px-8">
              <a href="https://nxtmt.com/schedule" target="_blank" rel="noopener noreferrer">
                Contact Us for Custom Support
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportServices;