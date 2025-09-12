import React from 'react';
import { ArrowRight, MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortfolioItemProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  index: number;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ category, title, description, imageUrl, link, index }) => {
  // Generate a gradient background based on index for demo
  const getBgClass = (idx: number) => {
    const gradients = [
      'bg-gradient-to-br from-primary/20 to-secondary/20',
      'bg-gradient-to-br from-secondary/20 to-accent/20',
      'bg-gradient-to-br from-accent/20 to-primary/20',
      'bg-gradient-to-br from-primary/20 to-accent/20',
      'bg-gradient-to-br from-secondary/20 to-primary/20',
      'bg-gradient-to-br from-accent/20 to-secondary/20',
    ];
    return gradients[idx % gradients.length];
  };

  return (
    <div className="relative group">
      <div className={`aspect-square ${getBgClass(index)} rounded-xl overflow-hidden p-1`}>
        <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full border-white/50 bg-background/50 hover:bg-background/70 backdrop-blur-sm"
            >
              View Project <MoveUpRight className="ml-1 h-3 w-3" />
            </Button>
          </a>
        </div>
        
        {/* Actual project image */}
        <div className="h-full w-full rounded-lg overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
      </div>
      
      <div className="mt-4">
        <span className="text-xs text-primary font-medium">{category}</span>
        <h3 className="text-lg font-bold font-display mt-1 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default function PortfolioSection() {
  const portfolioItems = [
    { 
      category: "Healthcare", 
      title: "Express Care",
      description: "Medical services provider website with online appointment booking, patient portal, and healthcare resources.",
      imageUrl: "https://images.unsplash.com/photo-1631507623121-eaaba8d4e7dc?w=600&h=600&auto=format&fit=crop&q=80",
      link: "#"
    },
    { 
      category: "Construction", 
      title: "Patriot Roofer",
      description: "Roofing contractor website featuring service details, project gallery, and client testimonials.",
      imageUrl: "https://images.unsplash.com/photo-1640476750068-72c645e653cd?w=600&h=600&auto=format&fit=crop&q=80",
      link: "#"
    },
    { 
      category: "Home Services", 
      title: "Milam Plumbing",
      description: "Plumbing services website with emergency booking, service area maps, and maintenance tips.",
      imageUrl: "https://images.unsplash.com/photo-1687184464107-3804b88644c9?w=600&h=600&auto=format&fit=crop&q=80",
      link: "#"
    },
    { 
      category: "Real Estate", 
      title: "Welcome Lane",
      description: "Property management website with listing search, virtual tours, and neighborhood information.",
      imageUrl: "https://images.unsplash.com/photo-1652878530627-cc6f063e3947?w=600&h=600&auto=format&fit=crop&q=80",
      link: "#"
    },
    { 
      category: "Business Services", 
      title: "The Entrepreneurs Source",
      description: "Business coaching platform offering entrepreneurship resources, consultation services, and success stories.",
      imageUrl: "https://images.unsplash.com/photo-1752118464988-2914fb27d0f0?w=600&h=600&auto=format&fit=crop&q=80",
      link: "#"
    },
    { 
      category: "Pet Services", 
      title: "GoDoghq",
      description: "Dog training and pet services website with appointment scheduling, training resources, and success stories.",
      imageUrl: "https://images.unsplash.com/photo-1562400972-7b2955ee2d10?w=600&h=600&auto=format&fit=crop&q=80",
      link: "#"
    },
    { 
      category: "Home Improvement", 
      title: "Mehrs Garage Doors",
      description: "Garage door installation and repair website with service catalog, warranty information, and emergency services.",
      imageUrl: "https://images.unsplash.com/photo-1657490017761-381bdf660ff4?w=600&h=600&auto=format&fit=crop&q=80",
      link: "#"
    },
    { 
      category: "Hospitality", 
      title: "Wrightsville Ave",
      description: "Restaurant website featuring menu offerings, reservation system, and special events calendar.",
      imageUrl: "https://images.unsplash.com/photo-1745211212207-54b6eadd26c1?w=600&h=600&auto=format&fit=crop&q=80",
      link: "#"
    }
  ];

  return (
    <section id="portfolio" className="py-24 relative">
      {/* Background gradient accent */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background/80 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm">
              <span>Our Work</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 md:mb-0 leading-tight">
              Featured Projects
            </h2>
          </div>
          
          <Button 
            variant="ghost" 
            className="group text-foreground hover:text-primary"
          >
            View All Projects 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioItem 
              key={index}
              category={item.category}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              link={item.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}