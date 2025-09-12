import React from 'react';
import { 
  Rocket, 
  Code, 
  Globe, 
  Smartphone, 
  Paintbrush, 
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, index }) => (
  <div 
    className="group bg-card hover:bg-card/80 border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="mb-4">
      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </div>
    
    <h3 className="text-xl font-serif font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground mb-4">{description}</p>
    
    <a href="#" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
      Learn more <ArrowRight className="ml-2 h-4 w-4" />
    </a>
  </div>
);

export default function ServicesSection() {
  const services = [
    {
      title: "Product Strategy",
      description: "We help you identify opportunities, define your vision, and create a roadmap for your digital product.",
      icon: <Rocket className="h-6 w-6" />
    },
    {
      title: "Web Development",
      description: "Building modern, fast, and scalable web applications with the latest technologies and best practices.",
      icon: <Code className="h-6 w-6" />
    },
    {
      title: "UX/UI Design",
      description: "Creating intuitive, engaging user experiences and beautiful interfaces that align with your brand.",
      icon: <Paintbrush className="h-6 w-6" />
    },
    {
      title: "Mobile Development",
      description: "Crafting native and cross-platform mobile applications with seamless performance and user experience.",
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      title: "Growth Strategy",
      description: "Developing strategies to acquire users, boost engagement, and scale your digital product.",
      icon: <Globe className="h-6 w-6" />
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dots-pattern bg-[size:20px_20px] z-0 opacity-50"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-16 mb-16">
            {/* Left column - Heading */}
            <div className="w-full lg:w-1/3">
              <div className="text-primary font-medium mb-3">Our Services</div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                How we help you build great products
              </h2>
            </div>
            
            {/* Right column - Description */}
            <div className="w-full lg:w-2/3">
              <p className="text-lg text-muted-foreground mb-6">
                Our team brings expertise across the entire product development lifecycle. 
                From initial strategy to design, development, and growth, we help you create 
                digital products that solve real problems.
              </p>
              <Button variant="outline" className="inline-flex items-center gap-2">
                View all services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}