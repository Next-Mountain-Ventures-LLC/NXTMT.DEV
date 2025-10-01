import React, { useState, useEffect, useRef } from 'react';
import { Code, ArrowUpRight, Check, CodeXml, PlugZap, SatelliteDish, ServerCog, Network, Infinity, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface APIFeature {
  name: string;
  included: boolean;
}

interface APISolution {
  id: string;
  title: string;
  description: string;
  features: APIFeature[];
  price: string;
  supportedPlatforms: string[];
  icon: React.ReactNode;
  link: string;
  color?: string;
  popular?: boolean;
}

const APIComparisonTable: React.FC<{ solutions: APISolution[], activeTab: string }> = ({ solutions, activeTab }) => {
  const activeService = solutions.find(s => s.id === activeTab) || solutions[0];
  const tableRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.classList.add('fade-out');
      
      setTimeout(() => {
        tableRef.current?.classList.remove('fade-out');
      }, 50);
    }
  }, [activeTab]);
  
  return (
    <div 
      ref={tableRef}
      className="transition-opacity duration-300 bg-white/5 backdrop-blur-sm rounded-xl border border-teal-500/30 overflow-hidden"
    >
      <div className="p-6 border-b border-teal-500/20">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
            {activeService.icon}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{activeService.title}</h3>
            <p className="text-white/70">{activeService.description}</p>
          </div>
          
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold text-teal-500">{activeService.price}</div>
          </div>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Features</h4>
          <div className="space-y-3">
            {activeService.features.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                {feature.included ? (
                  <Check className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-white/30 mr-2 mt-0.5 flex-shrink-0" />
                )}
                <span className={`text-sm ${feature.included ? 'text-white/90' : 'text-white/50'}`}>
                  {feature.name}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <Button
              asChild
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              <a href={activeService.link} target="_blank" rel="noopener noreferrer">
                Get Started
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Supported Platforms & Technologies</h4>
          <div className="grid grid-cols-2 gap-2">
            {activeService.supportedPlatforms.map((platform, idx) => (
              <div key={idx} className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
                <span className="text-sm text-white/80">{platform}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-teal-500/10 rounded-lg border border-teal-500/20">
            <h5 className="text-sm font-medium text-teal-400 mb-2">Not sure which API solution is right for you?</h5>
            <p className="text-xs text-white/70 mb-3">
              Schedule a consultation with our API specialists to discuss your specific integration needs.
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-teal-500/40 hover:bg-teal-500/10 text-teal-400"
            >
              <a href="https://nxtmt.com/schedule" target="_blank" rel="noopener noreferrer">
                Book a Free Consultation
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .fade-out {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

const APISolutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("restful-api");
  
  const solutions: APISolution[] = [
    {
      id: "restful-api",
      title: "RESTful API Development",
      description: "Custom REST API development for seamless system integration and data exchange.",
      features: [
        { name: "Custom API endpoints", included: true },
        { name: "Authentication & authorization", included: true },
        { name: "Rate limiting & throttling", included: true },
        { name: "Versioning support", included: true },
        { name: "OpenAPI/Swagger documentation", included: true },
        { name: "Response caching", included: true },
        { name: "Monitoring & analytics", included: true },
        { name: "Load balancing", included: true },
        { name: "Custom middleware", included: true },
        { name: "API gateway integration", included: false }
      ],
      price: "$12,000+",
      supportedPlatforms: [
        "Node.js", "Python", "Java", "PHP", ".NET Core",
        "Express", "Django", "Spring Boot", "Laravel", "AWS API Gateway"
      ],
      icon: <CodeXml className="h-6 w-6 text-teal-400" />,
      link: "https://nxtmt.com/schedule",
      popular: true
    },
    {
      id: "graphql-api",
      title: "GraphQL API Development",
      description: "Efficient, flexible GraphQL API development for precise data fetching and manipulation.",
      features: [
        { name: "Schema design & development", included: true },
        { name: "Resolver implementation", included: true },
        { name: "Type system definition", included: true },
        { name: "Query complexity analysis", included: true },
        { name: "Authentication & authorization", included: true },
        { name: "GraphQL Playground/GraphiQL", included: true },
        { name: "Data loader optimization", included: true },
        { name: "Subscription support", included: true },
        { name: "Federation capability", included: false },
        { name: "Custom directives", included: false }
      ],
      price: "$15,000+",
      supportedPlatforms: [
        "Apollo Server", "Express GraphQL", "GraphQL Yoga", "Hasura",
        "Node.js", "Python", "Ruby", "TypeScript", "AWS AppSync", "Prisma"
      ],
      icon: <SatelliteDish className="h-6 w-6 text-teal-400" />,
      link: "https://nxtmt.com/schedule"
    },
    {
      id: "third-party-integration",
      title: "Third-Party API Integration",
      description: "Seamless integration of third-party APIs and services into your existing systems.",
      features: [
        { name: "API authentication setup", included: true },
        { name: "Endpoint mapping", included: true },
        { name: "Data transformation", included: true },
        { name: "Webhook implementation", included: true },
        { name: "Error handling & retry logic", included: true },
        { name: "Rate limit management", included: true },
        { name: "Analytics & monitoring", included: true },
        { name: "Multi-API orchestration", included: true },
        { name: "Custom connector development", included: true },
        { name: "Legacy system integration", included: true }
      ],
      price: "$8,000+",
      supportedPlatforms: [
        "Payment APIs (Stripe, PayPal, Square)", "CRM (Salesforce, HubSpot)",
        "Marketing (Mailchimp, SendGrid)", "Social Media APIs",
        "E-commerce (Shopify, WooCommerce)", "ERP Systems", 
        "Cloud Services (AWS, Google, Azure)", "Authentication (OAuth, OpenID)"
      ],
      icon: <PlugZap className="h-6 w-6 text-teal-400" />,
      link: "https://nxtmt.com/schedule"
    },
    {
      id: "microservices",
      title: "Microservices Architecture",
      description: "Design and implementation of scalable microservices for complex distributed systems.",
      features: [
        { name: "Service decomposition", included: true },
        { name: "API gateway implementation", included: true },
        { name: "Service discovery", included: true },
        { name: "Message queue integration", included: true },
        { name: "Circuit breaker pattern", included: true },
        { name: "Container orchestration", included: true },
        { name: "Distributed tracing", included: true },
        { name: "Service mesh implementation", included: false },
        { name: "CQRS pattern implementation", included: false },
        { name: "Event sourcing", included: false }
      ],
      price: "$25,000+",
      supportedPlatforms: [
        "Docker", "Kubernetes", "AWS ECS/EKS", "Google Cloud Run",
        "RabbitMQ", "Kafka", "Redis", "Node.js", "Go", "Python",
        "Java Spring Boot", "Kong/Nginx API Gateway"
      ],
      icon: <Network className="h-6 w-6 text-teal-400" />,
      link: "https://nxtmt.com/schedule"
    },
    {
      id: "webhook-api",
      title: "Webhook API Development",
      description: "Real-time data sharing through custom webhook implementation and management.",
      features: [
        { name: "Event-based triggers", included: true },
        { name: "Secure payload delivery", included: true },
        { name: "Retry mechanism", included: true },
        { name: "Signature verification", included: true },
        { name: "Rate limiting", included: true },
        { name: "Webhook management UI", included: true },
        { name: "Event filtering", included: true },
        { name: "Payload transformation", included: true },
        { name: "Event logging & history", included: true },
        { name: "Batch webhook processing", included: false }
      ],
      price: "$10,000+",
      supportedPlatforms: [
        "Node.js", "Python", "PHP", "Ruby", ".NET",
        "AWS Lambda", "Google Cloud Functions", "Azure Functions",
        "Express", "Django", "Laravel", "Serverless Framework"
      ],
      icon: <ServerCog className="h-6 w-6 text-teal-400" />,
      link: "https://nxtmt.com/schedule"
    },
    {
      id: "api-maintenance",
      title: "API Maintenance & Evolution",
      description: "Ongoing support, maintenance, and enhancement of existing APIs to ensure optimal performance.",
      features: [
        { name: "Performance optimization", included: true },
        { name: "Security patching", included: true },
        { name: "Backward compatibility", included: true },
        { name: "Documentation updates", included: true },
        { name: "Feature enhancements", included: true },
        { name: "Monitoring & alerting", included: true },
        { name: "Bug fixes & troubleshooting", included: true },
        { name: "API versioning management", included: true },
        { name: "Deprecation handling", included: true },
        { name: "Load testing & scaling", included: true }
      ],
      price: "$3,000+/mo",
      supportedPlatforms: [
        "REST APIs", "GraphQL", "SOAP", "RPC", "WebSockets",
        "Legacy APIs", "Cloud Services", "Microservices",
        "All major programming languages and frameworks"
      ],
      icon: <Infinity className="h-6 w-6 text-teal-400" />,
      link: "https://nxtmt.com/schedule"
    }
  ];
  
  return (
    <section id="api-solutions" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-400 backdrop-blur-sm">
            <Code className="h-3 w-3 mr-1" />
            <span>API Development</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            Powerful API Solutions
          </h2>
          
          <p className="text-muted-foreground">
            Connect your systems and services with custom API solutions built for 
            performance, security, and scalability.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto no-scrollbar mb-10">
          <div className="flex space-x-2 mx-auto p-1 bg-background/20 backdrop-blur-md rounded-lg border border-white/10">
            {solutions.map((solution) => (
              <button
                key={solution.id}
                onClick={() => setActiveTab(solution.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === solution.id
                    ? "bg-teal-500/20 text-teal-400 shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {solution.icon}
                <span className="ml-2">{solution.title}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="w-full">
          <APIComparisonTable solutions={solutions} activeTab={activeTab} />
        </div>
        
        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-3">Customized for Your Business</h3>
            <p className="text-white/70 text-sm">
              Our API solutions are tailored to your specific business needs, with customized 
              endpoints, authentication mechanisms, and data models.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-3">Secure & Scalable</h3>
            <p className="text-white/70 text-sm">
              We build APIs with security and scalability in mind, implementing best practices 
              for authentication, encryption, and performance optimization.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-3">Comprehensive Documentation</h3>
            <p className="text-white/70 text-sm">
              All our API solutions come with comprehensive documentation, including OpenAPI/Swagger 
              specifications, example requests, and integration guides.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default APISolutions;