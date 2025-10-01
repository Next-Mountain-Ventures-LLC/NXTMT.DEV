import React, { useRef, useEffect } from 'react';
import { Cpu, Code, ArrowUpRight, Check, Database, Bot, Smartphone, Server, CloudCog } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DevServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  technologies: string[];
  price: string;
  timeframe: string;
  link: string;
  delay: number;
}

const DevServiceCard: React.FC<DevServiceProps> = ({ 
  title, 
  description, 
  icon, 
  features, 
  technologies, 
  price, 
  timeframe,
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
      className="relative rounded-xl overflow-hidden border border-amber-500/30 opacity-0 translate-y-12 transition-all duration-700 ease-out hover:border-amber-500/60 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-background/10 backdrop-blur-sm -z-10"></div>
      
      {/* Card Header */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-white/70 mt-1">{description}</p>
          </div>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-6 space-y-6">
        {/* Features */}
        <div>
          <h4 className="text-sm font-medium text-amber-400 mb-3">Included Features:</h4>
          <div className="grid grid-cols-1 gap-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <Check className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Technologies */}
        <div>
          <h4 className="text-sm font-medium text-amber-400 mb-3">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, idx) => (
              <span 
                key={idx} 
                className="text-xs bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full px-2.5 py-1"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xl font-bold text-amber-500">{price}</div>
              <div className="text-white/50 text-xs">{timeframe}</div>
            </div>
            
            <Button
              asChild
              className="bg-amber-600 hover:bg-amber-700 group-hover:translate-y-[-2px] transition-all duration-300"
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                Get Started
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
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

const DevelopmentServices: React.FC = () => {
  const services: DevServiceProps[] = [
    {
      title: "Custom Web Application",
      description: "Tailored web applications built to solve your specific business needs.",
      icon: <Code className="h-6 w-6 text-amber-400" />,
      features: [
        "Custom frontend & backend development",
        "User authentication & permissions",
        "Database design & implementation",
        "API development & integration",
        "Responsive design across all devices"
      ],
      technologies: [
        "React", "Node.js", "Python", "Laravel", "MongoDB", "PostgreSQL"
      ],
      price: "Starting at $15,000",
      timeframe: "8-12 weeks",
      link: "https://nxtmt.com/schedule",
      delay: 100
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      icon: <Smartphone className="h-6 w-6 text-amber-400" />,
      features: [
        "Native iOS & Android development",
        "Cross-platform development",
        "UI/UX design",
        "Backend integration",
        "App Store & Play Store submission"
      ],
      technologies: [
        "React Native", "Flutter", "Swift", "Kotlin", "Firebase"
      ],
      price: "Starting at $20,000",
      timeframe: "10-14 weeks",
      link: "https://nxtmt.com/schedule",
      delay: 200
    },
    {
      title: "AI/ML Solution Development",
      description: "Artificial intelligence and machine learning solutions to automate and optimize business processes.",
      icon: <Bot className="h-6 w-6 text-amber-400" />,
      features: [
        "Custom AI model development",
        "Machine learning algorithm implementation",
        "Data processing & analysis",
        "AI integration with existing systems",
        "Performance monitoring & optimization"
      ],
      technologies: [
        "Python", "TensorFlow", "PyTorch", "OpenAI API", "Scikit-learn"
      ],
      price: "Starting at $25,000",
      timeframe: "12-16 weeks",
      link: "https://nxtmt.com/schedule",
      delay: 300
    },
    {
      title: "Database Design & Development",
      description: "Scalable database solutions designed for performance, security, and reliability.",
      icon: <Database className="h-6 w-6 text-amber-400" />,
      features: [
        "Database architecture design",
        "Data modeling & normalization",
        "Migration from legacy systems",
        "Performance optimization",
        "Security implementation"
      ],
      technologies: [
        "PostgreSQL", "MongoDB", "MySQL", "Redis", "AWS RDS", "Azure SQL"
      ],
      price: "Starting at $8,000",
      timeframe: "4-8 weeks",
      link: "https://nxtmt.com/schedule",
      delay: 400
    },
    {
      title: "Backend API Development",
      description: "Robust and scalable API development for your application's backend needs.",
      icon: <Server className="h-6 w-6 text-amber-400" />,
      features: [
        "RESTful API development",
        "GraphQL API implementation",
        "Authentication & authorization",
        "Data validation & error handling",
        "Documentation & testing"
      ],
      technologies: [
        "Node.js", "Express", "Django", "Ruby on Rails", "FastAPI"
      ],
      price: "Starting at $10,000",
      timeframe: "6-10 weeks",
      link: "https://nxtmt.com/schedule",
      delay: 500
    },
    {
      title: "Cloud Infrastructure Setup",
      description: "Secure and scalable cloud infrastructure tailored to your application needs.",
      icon: <CloudCog className="h-6 w-6 text-amber-400" />,
      features: [
        "Cloud architecture design",
        "Infrastructure as Code implementation",
        "CI/CD pipeline setup",
        "Monitoring & alerting configuration",
        "Security best practices"
      ],
      technologies: [
        "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"
      ],
      price: "Starting at $7,000",
      timeframe: "3-6 weeks",
      link: "https://nxtmt.com/schedule",
      delay: 600
    }
  ];

  return (
    <section id="development-services" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 backdrop-blur-sm">
            <Cpu className="h-3 w-3 mr-1" />
            <span>Software Development</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            Custom Development Solutions
          </h2>
          
          <p className="text-muted-foreground">
            Cutting-edge software development services to build custom solutions
            that drive innovation and efficiency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <DevServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              features={service.features}
              technologies={service.technologies}
              price={service.price}
              timeframe={service.timeframe}
              link={service.link}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentServices;