import React, { useEffect, useRef } from 'react';
import { MessageSquare, Clock, Calendar, Lightbulb, PieChart, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConsultationServiceProps {
  title: string;
  description: string;
  duration: string;
  price: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
  link: string;
  delay: number;
}

const ConsultationService: React.FC<ConsultationServiceProps> = ({
  title,
  description,
  duration,
  price,
  features,
  icon,
  color,
  popular,
  link,
  delay
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('slide-up');
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
      className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-background/60 to-background/30 backdrop-blur-sm border ${color} group opacity-0 translate-y-12 transition-all duration-700 ease-out`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${color.replace('border-', 'bg-').replace('/40', '/10')} border-2 ${color.replace('/40', '/30')}`}>
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        
        <p className="text-white/70 text-sm mb-4">{description}</p>
        
        <div className="flex items-center mb-4 text-white/60 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration}</span>
        </div>
        
        <ul className="mb-6 space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                <span className="text-primary text-xs">✓</span>
              </div>
              <span className="text-white/80">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="pt-4 mt-auto border-t border-white/10 flex items-center justify-between">
          <div className="text-xl font-bold text-primary">{price}</div>
          
          <Button
            asChild
            size="sm"
            variant="default"
            className="gap-1 transition-transform duration-300 group-hover:translate-y-[-2px]"
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              Schedule Now
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
      
      <style jsx>{`
        .slide-up {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

const ConsultationServices: React.FC = () => {
  const services: ConsultationServiceProps[] = [
    {
      title: "Digital Strategy Session",
      description: "One-on-one consultation to develop a comprehensive digital strategy for your business.",
      duration: "90-minute session",
      price: "$499",
      features: [
        "Digital presence assessment",
        "Competitor analysis",
        "Strategic recommendations",
        "Action plan development",
        "30-day email support"
      ],
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      color: "border-sky-500/40 hover:border-sky-500/70",
      popular: true,
      link: "https://nxtmt.com/schedule",
      delay: 100
    },
    {
      title: "SEO Audit & Strategy",
      description: "In-depth analysis of your website's search engine performance and optimization strategy.",
      duration: "2-hour consultation",
      price: "$699",
      features: [
        "Technical SEO audit",
        "Keyword strategy development",
        "Content optimization plan",
        "Backlink profile analysis",
        "3-month roadmap"
      ],
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      color: "border-green-500/40 hover:border-green-500/70",
      link: "https://nxtmt.com/schedule",
      delay: 200
    },
    {
      title: "UX/UI Assessment",
      description: "Expert evaluation of your website or application's user experience and interface design.",
      duration: "2-hour session",
      price: "$599",
      features: [
        "User journey mapping",
        "Usability evaluation",
        "Conversion optimization",
        "Mobile experience review",
        "Prioritized improvements list"
      ],
      icon: <PieChart className="h-6 w-6 text-white" />,
      color: "border-purple-500/40 hover:border-purple-500/70",
      link: "https://nxtmt.com/schedule",
      delay: 300
    },
    {
      title: "Website Roadmapping",
      description: "Strategic planning session for your website redesign or new website development project.",
      duration: "Half-day workshop",
      price: "$1,299",
      features: [
        "Project scope definition",
        "Feature prioritization",
        "Technical requirements",
        "Timeline development",
        "Budget planning"
      ],
      icon: <Calendar className="h-6 w-6 text-white" />,
      color: "border-amber-500/40 hover:border-amber-500/70",
      link: "https://nxtmt.com/schedule",
      delay: 400
    }
  ];

  return (
    <section id="consultation-services" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-400 backdrop-blur-sm">
            <MessageSquare className="h-3 w-3 mr-1" />
            <span>Expert Guidance</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            Professional Consulting Services
          </h2>
          
          <p className="text-muted-foreground">
            Get expert advice and strategic guidance to help your business navigate 
            the digital landscape and achieve your goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ConsultationService
              key={index}
              title={service.title}
              description={service.description}
              duration={service.duration}
              price={service.price}
              features={service.features}
              icon={service.icon}
              color={service.color}
              popular={service.popular}
              link={service.link}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsultationServices;