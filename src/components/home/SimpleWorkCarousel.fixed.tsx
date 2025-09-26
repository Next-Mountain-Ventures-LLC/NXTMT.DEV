import React, { useRef, useState } from 'react';
import signMeImg from '@/assets/img_4110_nw_d534e0f5.jpeg';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import twistAfterImg from '@/assets/img_6920_nw_8e13ea06.png';
import twistBeforeImg from '@/assets/img_6913_nw_fd8ed4ae.png';

// Simplified component to avoid any issues
export default function SimpleWorkCarousel() {
  // Define basic project data
  const projects = [
    {
      image: signMeImg.src,
      title: 'SignMe™',
      category: 'Product Prototyping'
    },
    {
      image: twistBeforeImg.src,
      title: 'Twist N\'Turn Dryer Vent',
      category: 'Website Redesign',
      hoverImage: twistAfterImg.src
    },
    {
      image: twistBeforeImg.src,
      title: 'Tech Startup Branding',
      category: 'Branding & Identity'
    },
    {
      image: 'https://images.unsplash.com/photo-1611328573001-13cf452dd8a9?w=1024&h=768&fit=crop&q=80',
      title: 'Mobile App for Fitness',
      category: 'App Development'
    }
  ];

  // Simple carousel functionality
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Simple scroll functions without animations
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 300;
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 300;
    }
  };

  return (
    <section className="py-12 bg-background">
      {/* Section title */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground">
            <span>Our Portfolio</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Brands We've Helped Launch
          </h2>
          
          <p className="text-muted-foreground">
            From web development and brand design to mobile apps and custom solutions, we deliver diverse services.
          </p>
        </div>
      </div>
      
      {/* Simple carousel without animations */}
      <div className="relative w-full mb-10">
        <button 
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full text-white"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button 
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full text-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        
        <div 
          ref={carouselRef}
          className="flex py-8 overflow-x-auto px-6"
          style={{ scrollbarWidth: 'none' }}
        >
          {projects.map((project, index) => (
            <div key={index}>
              <div 
                className="flex-shrink-0 w-56 h-64 mx-5 rounded-xl overflow-hidden relative"
                onClick={() => setActiveIndex(index)}
              >
                <div className="absolute inset-0 bg-black/50 opacity-70"></div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/80 text-white inline-block mb-2">{project.category}</span>
                  <h3 className="text-white text-base font-bold font-display">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Simple project details without animations */}
      <div className="container mx-auto px-4 max-w-4xl mb-16">
        <div className="bg-card p-6 rounded-xl border border-border">
          <h3 className="text-2xl font-bold font-display mb-4">{projects[activeIndex].title}</h3>
          <p className="text-muted-foreground">
            {activeIndex === 0 && "SignMe™ is a digital smart sign featuring a scrolling LED matrix display in a sleek wooden enclosure."}
            {activeIndex === 1 && "Twist N'Turn is a leading dryer vent cleaning company based in Tulsa, Oklahoma. We redesigned their website with modern features."}
            {activeIndex === 2 && "We created a complete brand identity for a tech startup entering the competitive SaaS market, including logo design, color palette, and typography."}
            {activeIndex === 3 && "A cutting-edge fitness application that tracks workouts and provides personalized training plans."}
          </p>
        </div>
      </div>
    </section>
  );
}