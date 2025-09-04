import React from 'react';
import { ArrowRight, MoveUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortfolioItemProps {
  category: string;
  title: string;
  index: number;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ category, title, index }) => {
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
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full border-white/50 bg-background/50 hover:bg-background/70 backdrop-blur-sm"
          >
            View Project <MoveUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
        
        {/* Placeholder for project thumbnail - in a real site this would be an actual image */}
        <div className="h-full w-full rounded-lg bg-background/30 backdrop-blur-sm flex items-center justify-center">
          <div className="text-4xl font-bold text-white/10">P{index + 1}</div>
        </div>
      </div>
      
      <div className="mt-4">
        <span className="text-xs text-primary font-medium">{category}</span>
        <h3 className="text-lg font-bold font-[Press_Start_2P] mt-1 group-hover:text-primary transition-colors duration-300">{title}</h3>
      </div>
    </div>
  );
};

export default function PortfolioSection() {
  const portfolioItems = [
    { category: "Web Design", title: "Cosmic Apparel E-commerce" },
    { category: "Mobile App", title: "Stellar Navigation App" },
    { category: "Branding", title: "Nebula Coffee House" },
    { category: "Web Development", title: "Galaxy Finance Dashboard" },
    { category: "UI/UX", title: "Aurora Social Network" },
    { category: "Digital Marketing", title: "Orbit Analytics Platform" }
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
            
            <h2 className="text-3xl md:text-4xl font-bold font-[Press_Start_2P] mb-4 md:mb-0 leading-tight">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioItem 
              key={index}
              category={item.category}
              title={item.title}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}