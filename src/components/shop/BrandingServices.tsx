import React, { useRef, useState } from 'react';
import { Palette, ArrowUpRight, Check, ArrowRight, Bookmark, Target, LayoutGrid, PenTool, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BrandingService {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  price: string;
  deliverables: string[];
  link: string;
}

const BrandingServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("brand-identity");
  
  const services: Record<string, BrandingService> = {
    "brand-identity": {
      id: "brand-identity",
      title: "Brand Identity Package",
      description: "Complete brand identity development including logo design, color palette, typography, and brand guidelines.",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJhbmRpbmd8ZW58MHx8MHx8fDA%3D",
      features: [
        "Logo design (primary & variations)",
        "Color palette selection",
        "Typography system",
        "Brand guidelines document",
        "Business card design",
        "Social media assets"
      ],
      price: "$3,999",
      deliverables: [
        "Logo files in multiple formats (AI, EPS, PNG, JPG, SVG)",
        "Brand guidelines PDF",
        "Color palette with HEX, RGB, CMYK values",
        "Typography license information",
        "Business card print-ready files",
        "Social media templates"
      ],
      link: "https://nxtmt.com/schedule"
    },
    "logo-design": {
      id: "logo-design",
      title: "Professional Logo Design",
      description: "Custom logo design service with unlimited revisions until you're completely satisfied with the final design.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZ28lMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
      features: [
        "3-5 initial concepts",
        "Unlimited revisions",
        "Multiple file formats",
        "Black & white versions",
        "Color variations",
        "Transparent backgrounds"
      ],
      price: "$1,499",
      deliverables: [
        "Final logo in AI, EPS, PNG, JPG, SVG formats",
        "Black & white versions",
        "Color variations",
        "Style guide for logo usage",
        "Font information",
        "Copyright transfer document"
      ],
      link: "https://nxtmt.com/schedule"
    },
    "packaging-design": {
      id: "packaging-design",
      title: "Product Packaging Design",
      description: "Eye-catching packaging design that helps your product stand out on shelves and reflects your brand identity.",
      image: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFja2FnaW5nfGVufDB8fDB8fHww",
      features: [
        "Custom packaging design",
        "Label design",
        "Structural considerations",
        "Material recommendations",
        "Print-ready files",
        "3D mockups"
      ],
      price: "$2,999",
      deliverables: [
        "Print-ready files",
        "Digital mockups",
        "3D renderings",
        "Specification sheets",
        "Print vendor recommendations",
        "Production guidelines"
      ],
      link: "https://nxtmt.com/schedule"
    },
    "brand-strategy": {
      id: "brand-strategy",
      title: "Strategic Brand Positioning",
      description: "Comprehensive brand strategy development to position your company effectively in the market and connect with your target audience.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RyYXRlZ3l8ZW58MHx8MHx8fDA%3D",
      features: [
        "Market research",
        "Competitor analysis",
        "Brand positioning",
        "Value proposition development",
        "Target audience definition",
        "Brand voice & messaging"
      ],
      price: "$4,999",
      deliverables: [
        "Brand strategy document",
        "Market research report",
        "Competitor analysis",
        "Brand positioning statement",
        "Brand messaging framework",
        "Implementation roadmap"
      ],
      link: "https://nxtmt.com/schedule"
    },
    "marketing-materials": {
      id: "marketing-materials",
      title: "Marketing Collateral Design",
      description: "Professional design of your marketing materials including brochures, flyers, presentations, and digital assets.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFya2V0aW5nJTIwbWF0ZXJpYWxzfGVufDB8fDB8fHww",
      features: [
        "Brochure design",
        "Flyer & poster design",
        "Presentation templates",
        "Digital ad designs",
        "Email templates",
        "Social media graphics"
      ],
      price: "Starting at $1,999",
      deliverables: [
        "Print-ready files",
        "Editable templates",
        "Digital assets",
        "Style guide",
        "Font files & instructions",
        "Image assets"
      ],
      link: "https://nxtmt.com/schedule"
    }
  };

  const tabs = [
    {
      id: "brand-identity",
      label: "Brand Identity",
      icon: <Bookmark className="h-4 w-4" />
    },
    {
      id: "logo-design",
      label: "Logo Design",
      icon: <PenTool className="h-4 w-4" />
    },
    {
      id: "packaging-design",
      label: "Packaging",
      icon: <LayoutGrid className="h-4 w-4" />
    },
    {
      id: "brand-strategy",
      label: "Strategy",
      icon: <Target className="h-4 w-4" />
    },
    {
      id: "marketing-materials",
      label: "Marketing Materials",
      icon: <ImageIcon className="h-4 w-4" />
    }
  ];

  const activeService = services[activeTab];
  
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const handleTabChange = (tabId: string) => {
    // Add exit animation classes
    if (imageRef.current) imageRef.current.classList.add('fade-out');
    if (contentRef.current) contentRef.current.classList.add('fade-out');
    
    // Wait for exit animation, then change tab and trigger entrance animation
    setTimeout(() => {
      setActiveTab(tabId);
      
      setTimeout(() => {
        if (imageRef.current) imageRef.current.classList.remove('fade-out');
        if (contentRef.current) contentRef.current.classList.remove('fade-out');
      }, 50);
    }, 200);
  };

  return (
    <section id="branding-services" className="py-24 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 left-0 w-1/2 h-1/2 bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-2/3 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 backdrop-blur-sm">
            <Palette className="h-3 w-3 mr-1" />
            <span>Brand Development</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            Branding & Identity Services
          </h2>
          
          <p className="text-muted-foreground">
            Establish a memorable brand identity that resonates with your audience 
            and differentiates your business from competitors.
          </p>
        </div>
        
        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto no-scrollbar mb-10 max-w-2xl mx-auto">
          <div className="flex space-x-2 mx-auto p-1 bg-background/20 backdrop-blur-md rounded-lg border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div 
            ref={imageRef}
            className="rounded-xl overflow-hidden transition-opacity duration-300"
          >
            <img 
              src={activeService.image} 
              alt={activeService.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          {/* Content */}
          <div 
            ref={contentRef}
            className="transition-all duration-300"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              {activeService.title}
            </h3>
            
            <p className="text-white/70 mb-6">
              {activeService.description}
            </p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-white">What's Included:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {activeService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 text-white">Deliverables:</h4>
              <ul className="list-disc list-inside text-sm text-white/80 ml-4 space-y-1">
                {activeService.deliverables.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">
                {activeService.price}
              </div>
              
              <div className="space-x-3">
                <Button 
                  variant="outline" 
                  className="border-white/20 hover:bg-white/10"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button asChild>
                  <a href={activeService.link} target="_blank" rel="noopener noreferrer">
                    Get Started
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .fade-out {
          opacity: 0;
          transform: translateY(10px);
        }
      `}</style>
    </section>
  );
};

export default BrandingServices;