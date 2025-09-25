import React, { useRef } from 'react';
import signMeImg from '@/assets/img_4110_nw_d534e0f5.jpeg';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WorkItemProps {
  image: string;
  title: string;
  category: string;
  offset?: 'up' | 'down' | 'none';
}

const WorkItem: React.FC<WorkItemProps> = ({ image, title, category, offset = 'none' }) => {
  const offsetClass = 
    offset === 'up' ? '-translate-y-4' : 
    offset === 'down' ? 'translate-y-4' : '';

  return (
    <div 
      className={`flex-shrink-0 w-56 h-64 mx-5 ${offsetClass} transition-transform duration-300 
      group rounded-xl overflow-hidden relative`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 opacity-70"></div>
      
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover object-center"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/80 text-white
          backdrop-blur-sm inline-block mb-2">{category}</span>
        <h3 className="text-white text-base font-bold font-display">{title}</h3>
      </div>
    </div>
  );
};

export default function WorkCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Sample work items - replace with actual content
  const workItems: WorkItemProps[] = [
    {
      image: signMeImg.src,
      title: 'SignMe™',
      category: 'Product Prototyping',
      offset: 'up'
    },
    {
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1024',
      title: 'Tech Startup Branding',
      category: 'Branding & Identity',
      offset: 'none'
    },
    {
      image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1024',
      title: 'Mobile App for Fitness',
      category: 'App Development',
      offset: 'down'
    },
    {
      image: 'https://images.unsplash.com/photo-1610986603166-f78428624e76?q=80&w=1024',
      title: 'SaaS Dashboard Design',
      category: 'UI/UX Design',
      offset: 'up'
    },
    {
      image: 'https://images.unsplash.com/photo-1634942536996-e466e247a1ef?q=80&w=1024',
      title: 'NFT Marketplace',
      category: 'Blockchain Development',
      offset: 'none'
    },
    {
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1024',
      title: 'Healthcare Platform',
      category: 'Web Application',
      offset: 'down'
    },
    {
      image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=1024',
      title: 'Fashion Brand Identity',
      category: 'Logo & Branding',
      offset: 'up'
    },
    {
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1024',
      title: 'IoT Smart Home System',
      category: 'Product Development',
      offset: 'none'
    },
    {
      image: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=1024',
      title: 'Financial Analytics Dashboard',
      category: 'FinTech Solution',
      offset: 'down'
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1024',
      title: 'Marketing Campaign',
      category: 'Digital Marketing',
      offset: 'up'
    },
  ];
  
  // We don't need to duplicate items anymore since we're using a scrollable container
  const allItems = workItems;
  
  // Scroll handling functions
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section id="work-showcase" className="py-16 relative overflow-hidden bg-gradient-to-b from-background to-background/80">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm">
            <span>Our Portfolio</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            Showcasing Our Creative Work
          </h2>
          
          <p className="text-muted-foreground">
            From digital products to brand identities, explore our diverse portfolio of successful projects.
          </p>
        </div>
      </div>
      
      <div className="relative w-full">
        {/* Scroll buttons */}
        <button 
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-primary/80 p-2 rounded-full text-white transition-colors duration-300"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button 
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-primary/80 p-2 rounded-full text-white transition-colors duration-300"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        {/* Scrollable container */}
        <div 
          ref={carouselRef}
          className="no-scrollbar flex py-8 overflow-x-auto snap-x snap-mandatory scroll-pl-6 px-6"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {allItems.map((item, index) => (
            <div key={index} className="snap-center">
              <WorkItem 
                image={item.image}
                title={item.title}
                category={item.category}
                offset={item.offset}
              />
            </div>
          ))}
        </div>
        
        {/* Gradient fades at the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
}