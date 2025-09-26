import React, { useRef, useState } from 'react';
import signMeImg from '@/assets/img_4110_nw_d534e0f5.jpeg';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import twistAfterImg from '@/assets/img_6920_nw_8e13ea06.png';
import twistBeforeImg from '@/assets/img_6913_nw_fd8ed4ae.png';

// Define types
interface WorkItemProps {
  image: string;
  hoverImage?: string;
  title: string;
  category: string;
  description?: string;
  client?: string;
  year?: string;
  services?: string[];
}

// Project item component
const WorkItem = ({ 
  image, 
  hoverImage, 
  title, 
  category,
  isActive,
  onHover
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover();
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <div 
      className="flex-shrink-0 w-56 h-64 mx-5 transition-all duration-300 group rounded-xl overflow-hidden relative"
      style={{ transform: isActive ? 'scale(1.05)' : 'none' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 opacity-70"></div>
      
      {hoverImage ? (
        <>
          <img 
            src={isHovered ? hoverImage : image} 
            alt={title}
            className="w-full h-full object-cover object-center transition-all duration-500"
          />
          {isHovered ? (
            <div className="absolute top-4 right-4 px-2 py-1 bg-primary/80 text-white text-xs rounded-md z-20 shadow-lg">
              After
            </div>
          ) : isActive && (
            <div className="absolute top-4 right-4 px-2 py-1 bg-black/80 text-white text-xs rounded-md z-20 shadow-lg">
              Before
            </div>
          )}
        </>
      ) : (
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-500"
        />
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/80 text-white
          backdrop-blur-sm inline-block mb-2">{category}</span>
        <h3 className="text-white text-base font-bold font-display">{title}</h3>
      </div>
      
      {isActive && (
        <div className="absolute inset-0 ring-2 ring-primary rounded-xl pointer-events-none"></div>
      )}
    </div>
  );
};

// Project details component
const ProjectDetails = ({ project }) => {
  if (!project) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <p className="text-center">Hover over a project to see details</p>
      </div>
    );
  }

  return (
    <div className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/40 transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-2xl font-bold font-display mb-2">{project.title}</h3>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground">
              {project.category}
            </span>
            {project.year && (
              <span className="text-sm text-muted-foreground">
                {project.year}
              </span>
            )}
            {project.client && (
              <span className="text-sm text-muted-foreground">
                • Client: {project.client}
              </span>
            )}
          </div>
        </div>
        
        {project.description && (
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        )}
        
        {project.services && project.services.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Services Provided</h4>
            <div className="flex flex-wrap gap-2">
              {project.services.map((service, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 text-xs rounded-md bg-secondary/10 text-secondary-foreground"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main component
export default function WorkCarousel() {
  const carouselRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  
  // Define projects
  const workItems = [
    {
      image: signMeImg.src,
      title: 'SignMe™',
      category: 'Product Prototyping',
      description: 'SignMe™ is a digital smart sign featuring a scrolling LED matrix display in a sleek wooden enclosure. We prototyped, designed, and manufactured this innovative product from concept to market-ready solution.',
      client: 'NXTMT Labs',
      year: '2023',
      services: ['Industrial Design', 'Hardware Prototyping', 'PCB Design', 'Manufacturing']
    },
    {
      image: twistBeforeImg.src,
      hoverImage: twistAfterImg.src,
      title: 'Twist N\'Turn Dryer Vent',
      category: 'Website Redesign',
      description: 'Twist N\'Turn is a leading dryer vent cleaning company based in Tulsa, Oklahoma. We redesigned their website from the ground up, creating a modern, responsive design that highlights their services. We moved them to a faster, more secure WordPress hosting platform, saving them money while improving performance. We also added blog capabilities to help them establish themselves as industry leaders through content and training materials.',
      client: 'Twist N\'Turn Dryer Vent',
      year: '2025',
      services: ['Website Redesign', 'Mockup Creation', 'WordPress Development', 'Fast Hosting with Backup & Security', 'Blog Capabilities', 'Search Engine Optimization', 'Content Management']
    },
    {
      image: 'https://images.unsplash.com/photo-1611328573001-13cf452dd8a9?w=1024&h=768&fit=crop&q=80',
      title: 'Mobile App for Fitness',
      category: 'App Development',
      description: 'A cutting-edge fitness application that tracks workouts, provides personalized training plans, and incorporates social features. The app uses AI to adapt to user progress and preferences, making each workout optimally effective.',
      client: 'FitTech Inc.',
      year: '2023',
      services: ['UI/UX Design', 'iOS Development', 'Android Development', 'Backend Architecture']
    }
  ];
  
  // Initialize activeProject
  React.useEffect(() => {
    if (workItems.length > 0 && !activeProject) {
      setActiveProject(workItems[0]);
    }
  }, []);
  
  // Scroll functions
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
    <section id="work-showcase" className="py-12 relative overflow-hidden bg-gradient-to-b from-background to-background/80">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm">
            <span>Our Portfolio</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            Brands We've Helped Launch
          </h2>
          
          <p className="text-muted-foreground">
            From web development and brand design to mobile apps and custom solutions, we deliver diverse services tailored to help businesses thrive in the digital landscape.
          </p>
        </div>
      </div>
      
      <div className="relative w-full mb-10">
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
          {workItems.map((item, index) => (
            <div key={index} className="snap-center">
              <WorkItem 
                {...item}
                isActive={activeProject?.title === item.title}
                onHover={() => setActiveProject(item)}
              />
            </div>
          ))}
        </div>
        
        {/* Gradient fades at the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
      </div>
      
      {/* Project details section */}
      <div className="container mx-auto px-4 max-w-4xl mb-16 min-h-[300px] transition-all duration-500">
        <ProjectDetails project={activeProject} />
      </div>
    </section>
  );
}