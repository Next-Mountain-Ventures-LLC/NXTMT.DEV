import React, { useRef, useState } from 'react';
import signMeImg from '@/assets/img_4110_nw_d534e0f5.jpeg';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WorkItemProps {
  image: string;
  title: string;
  category: string;
  offset?: 'up' | 'down' | 'none';
  description?: string;
  client?: string;
  year?: string;
  services?: string[];
}

interface WorkItemComponentProps extends WorkItemProps {
  onHover: (item: WorkItemProps) => void;
  isActive: boolean;
}

const WorkItem: React.FC<WorkItemComponentProps> = ({ 
  image, 
  title, 
  category, 
  offset = 'none', 
  onHover,
  isActive,
  ...rest
}) => {
  const offsetClass = 
    offset === 'up' ? '-translate-y-4' : 
    offset === 'down' ? 'translate-y-4' : '';

  const handleMouseEnter = () => {
    onHover({ image, title, category, offset, ...rest });
  };

  return (
    <div 
      className={`flex-shrink-0 w-56 h-64 mx-5 ${offsetClass} transition-all duration-300 
      group rounded-xl overflow-hidden relative ${isActive ? 'ring-2 ring-primary scale-105' : ''}`}
      onMouseEnter={handleMouseEnter}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 opacity-70"></div>
      
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover object-center transition-transform duration-500"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/80 text-white
          backdrop-blur-sm inline-block mb-2">{category}</span>
        <h3 className="text-white text-base font-bold font-display">{title}</h3>
      </div>
    </div>
  );
};

const ProjectDetails: React.FC<{ project: WorkItemProps | null }> = ({ project }) => {
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
          <div className="flex items-center gap-2 mb-4">
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

export default function WorkCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<WorkItemProps | null>(null);
  
  // Sample work items - replace with actual content
  const workItems: WorkItemProps[] = [
    {
      image: signMeImg.src,
      title: 'SignMe™',
      category: 'Product Prototyping',
      offset: 'up',
      description: 'SignMe™ is a digital smart sign featuring a scrolling LED matrix display in a sleek wooden enclosure. We prototyped, designed, and manufactured this innovative product from concept to market-ready solution.',
      client: 'NXTMT Labs',
      year: '2023',
      services: ['Industrial Design', 'Hardware Prototyping', 'PCB Design', 'Manufacturing']
    },
    {
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1024',
      title: 'Tech Startup Branding',
      category: 'Branding & Identity',
      offset: 'none',
      description: 'We created a complete brand identity for a tech startup entering the competitive SaaS market. The branding included logo design, color palette, typography, and a comprehensive style guide to ensure consistent brand application.',
      client: 'SkyData Technologies',
      year: '2022',
      services: ['Logo Design', 'Brand Strategy', 'Visual Identity', 'Style Guidelines']
    },
    {
      image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1024',
      title: 'Mobile App for Fitness',
      category: 'App Development',
      offset: 'down',
      description: 'A cutting-edge fitness application that tracks workouts, provides personalized training plans, and incorporates social features. The app uses AI to adapt to user progress and preferences, making each workout optimally effective.',
      client: 'FitTech Inc.',
      year: '2023',
      services: ['UI/UX Design', 'iOS Development', 'Android Development', 'Backend Architecture']
    },
    {
      image: 'https://images.unsplash.com/photo-1610986603166-f78428624e76?q=80&w=1024',
      title: 'SaaS Dashboard Design',
      category: 'UI/UX Design',
      offset: 'up',
      description: 'We designed an intuitive, data-rich dashboard for a complex enterprise SaaS product. The interface elegantly handles large volumes of data while maintaining clarity and simplicity for users of all technical backgrounds.',
      client: 'Enterprise Solutions Corp',
      year: '2022',
      services: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing']
    },
    {
      image: 'https://images.unsplash.com/photo-1634942536996-e466e247a1ef?q=80&w=1024',
      title: 'NFT Marketplace',
      category: 'Blockchain Development',
      offset: 'none',
      description: 'A complete NFT marketplace allowing artists and creators to mint, sell, and auction digital assets. The platform includes robust smart contracts, secure payment processing, and an engaging gallery interface.',
      client: 'CryptoCreatives',
      year: '2023',
      services: ['Smart Contract Development', 'Blockchain Integration', 'Frontend Development', 'Security Auditing']
    },
    {
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1024',
      title: 'Healthcare Platform',
      category: 'Web Application',
      offset: 'down',
      description: 'A comprehensive healthcare platform connecting patients with providers through secure video consultations, appointment scheduling, and medical record management. HIPAA-compliant and built for seamless integration with existing systems.',
      client: 'MedConnect Health',
      year: '2021',
      services: ['HIPAA Compliance', 'API Development', 'Frontend Engineering', 'Database Architecture']
    },
    {
      image: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=1024',
      title: 'Fashion Brand Identity',
      category: 'Logo & Branding',
      offset: 'up',
      description: 'We created a distinctive brand identity for a sustainable fashion label, emphasizing eco-conscious values while maintaining a premium, high-fashion aesthetic. The visual language conveys both luxury and environmental responsibility.',
      client: 'EcoLuxe Fashion',
      year: '2022',
      services: ['Brand Strategy', 'Logo Design', 'Packaging Design', 'Brand Guidelines']
    },
    {
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1024',
      title: 'IoT Smart Home System',
      category: 'Product Development',
      offset: 'none',
      description: 'An integrated smart home ecosystem of connected devices controlled through a single, intuitive interface. The system includes custom hardware design, secure cloud infrastructure, and a user-friendly mobile application.',
      client: 'SmartSpace Technologies',
      year: '2023',
      services: ['Hardware Design', 'Embedded Systems', 'Cloud Infrastructure', 'Mobile App Development']
    },
    {
      image: 'https://images.unsplash.com/photo-1583508915901-b5f84c1dcde1?q=80&w=1024',
      title: 'Financial Analytics Dashboard',
      category: 'FinTech Solution',
      offset: 'down',
      description: 'A powerful financial analytics dashboard providing real-time insights, predictive modeling, and comprehensive reporting for investment portfolios. The platform processes enormous volumes of data to deliver actionable intelligence.',
      client: 'CapitalInsight Partners',
      year: '2021',
      services: ['Data Visualization', 'Algorithm Development', 'Real-time Analytics', 'Security Implementation']
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1024',
      title: 'Marketing Campaign',
      category: 'Digital Marketing',
      offset: 'up',
      description: 'A comprehensive digital marketing campaign spanning multiple channels to launch a new product. The strategy included content creation, social media marketing, influencer partnerships, and targeted advertising.',
      client: 'Innovations Inc.',
      year: '2022',
      services: ['Content Strategy', 'Social Media Marketing', 'Analytics & Reporting', 'Conversion Optimization']
    },
  ];
  
  // We don't need to duplicate items anymore since we're using a scrollable container
  const allItems = workItems;
  
  // Set first project as active by default
  React.useEffect(() => {
    if (workItems.length > 0 && !activeProject) {
      setActiveProject(workItems[0]);
    }
  }, []);
  
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
  
  // Handler for item hover
  const handleProjectHover = (project: WorkItemProps) => {
    setActiveProject(project);
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
          {allItems.map((item, index) => (
            <div key={index} className="snap-center">
              <WorkItem 
                {...item}
                onHover={handleProjectHover}
                isActive={activeProject?.title === item.title}
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