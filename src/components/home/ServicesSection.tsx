import React from 'react';
import { 
  Monitor, 
  PenTool, 
  Code, 
  Smartphone, 
  Megaphone, 
  BarChart3
} from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, color, delay }) => (
  <div 
    className="group relative p-1 rounded-xl bg-gradient-to-br from-transparent to-transparent hover:from-primary/20 hover:to-accent/20 transition-all duration-500"
    style={{ transitionDelay: delay }}
  >
    <div className="relative p-6 h-full rounded-lg bg-card/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:translate-y-[-5px]">
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
    
    {/* Glowing effect on hover */}
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/10 to-accent/10 blur-xl transition-opacity duration-500"></div>
  </div>
);

export default function ServicesSection() {
  const services = [
    {
      title: "Web Design",
      description: "Creating responsive, intuitive, and visually stunning websites that engage and convert visitors.",
      icon: <Monitor className="h-6 w-6 text-white" />,
      color: "bg-primary",
      delay: "0ms"
    },
    {
      title: "Branding",
      description: "Developing cohesive brand identities that communicate your values and resonate with your audience.",
      icon: <PenTool className="h-6 w-6 text-white" />,
      color: "bg-secondary",
      delay: "50ms"
    },
    {
      title: "Development",
      description: "Building robust, scalable applications and websites with clean, efficient code and modern technologies.",
      icon: <Code className="h-6 w-6 text-white" />,
      color: "bg-accent",
      delay: "100ms"
    },
    {
      title: "Mobile Apps",
      description: "Crafting native and cross-platform mobile applications with intuitive UX and seamless performance.",
      icon: <Smartphone className="h-6 w-6 text-white" />,
      color: "bg-primary",
      delay: "150ms"
    },
    {
      title: "Digital Marketing",
      description: "Implementing strategic campaigns that increase visibility, engagement, and conversion across platforms.",
      icon: <Megaphone className="h-6 w-6 text-white" />,
      color: "bg-secondary",
      delay: "200ms"
    },
    {
      title: "Analytics",
      description: "Providing data-driven insights and optimization strategies to maximize your digital performance.",
      icon: <BarChart3 className="h-6 w-6 text-white" />,
      color: "bg-accent",
      delay: "250ms"
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-r from-accent/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-accent/20 border border-accent/30 text-accent-foreground backdrop-blur-sm">
            <span>Our Expertise</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            Comprehensive Digital Services
          </h2>
          
          <p className="text-muted-foreground">
            We offer a full spectrum of digital services to elevate your brand and create meaningful connections with your audience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              color={service.color}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}