import React, { useState } from 'react';

interface PlanetProps {
  name: string;
  description: string;
  color: string;
  size: string;
  orbitRadius: string;
  animationClass: string;
  link: string;
  icon?: React.ReactNode;
}

const planets: PlanetProps[] = [
  {
    name: 'Web Design',
    description: 'Crafting beautiful, responsive interfaces that engage users and reflect your brand identity.',
    color: 'bg-primary shadow-[0_0_10px_rgba(0,112,243,0.7)]',
    size: 'w-6 h-6 md:w-8 md:h-8',
    orbitRadius: '110px',
    animationClass: 'animate-orbit',
    link: '/#services'
  },
  {
    name: 'Development',
    description: 'Building robust, scalable web applications with modern technologies and best practices.',
    color: 'bg-secondary shadow-[0_0_10px_rgba(171,255,46,0.7)]',
    size: 'w-5 h-5 md:w-7 md:h-7',
    orbitRadius: '160px',
    animationClass: 'animate-orbit-reverse',
    link: '/#services'
  },
  {
    name: 'Branding',
    description: 'Developing cohesive brand identities that resonate with your target audience and stand out in the market.',
    color: 'bg-accent shadow-[0_0_10px_rgba(255,187,138,0.7)]',
    size: 'w-4 h-4 md:w-6 md:h-6',
    orbitRadius: '210px',
    animationClass: 'animate-orbit-slow',
    link: '/#services'
  },
  {
    name: 'SEO',
    description: 'Optimizing your digital presence to increase visibility and attract qualified traffic.',
    color: 'bg-primary/80 shadow-[0_0_10px_rgba(0,112,243,0.5)]',
    size: 'w-5 h-5 md:w-6 md:h-6',
    orbitRadius: '260px',
    animationClass: 'animate-orbit-slower',
    link: '/#services'
  },
  {
    name: 'Analytics',
    description: 'Tracking and analyzing user behavior to make data-driven decisions and improve performance.',
    color: 'bg-secondary/80 shadow-[0_0_10px_rgba(171,255,46,0.5)]',
    size: 'w-4 h-4 md:w-5 md:h-5',
    orbitRadius: '310px',
    animationClass: 'animate-orbit-slowest',
    link: '/#services'
  }
];

interface ExtendedPlanetProps extends PlanetProps {
  systemActive: boolean;
}

const Planet: React.FC<ExtendedPlanetProps> = ({ 
  name, 
  description, 
  color, 
  size, 
  orbitRadius, 
  animationClass,
  link,
  icon,
  systemActive
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${isHovered || !systemActive ? 'animate-none' : animationClass} transition-all duration-300`}
      style={{ '--orbit-radius': orbitRadius } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a 
        href={link}
        className={`${size} ${color} rounded-full flex items-center justify-center shadow-lg z-10 transition-transform duration-300 ${isHovered ? 'scale-150' : ''}`}
        aria-label={name}
      >
        {icon}
      </a>
      
      {isHovered && (
        <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 w-48 bg-background/90 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-primary/20 z-20 animate-fade-in">
          <h3 className="font-bold text-sm text-primary">{name}</h3>
          <p className="text-xs text-foreground/80 mt-1">{description}</p>
        </div>
      )}
    </div>
  );
};

export default function SolarSystem() {
  const [systemActive, setSystemActive] = useState(true);

  return (
    <div 
      className="relative h-[400px] max-w-[600px] mx-auto my-12"
      onMouseEnter={() => setSystemActive(false)}
      onMouseLeave={() => setSystemActive(true)}
    >
      {/* Sun/Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-primary via-secondary to-accent rounded-full shadow-xl z-10 flex items-center justify-center">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full animate-pulse-slow"></div>
      </div>
      
      {/* Orbits */}
      {planets.map((planet, index) => (
        <div 
          key={`orbit-${index}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full"
          style={{ 
            width: `calc(2 * ${planet.orbitRadius})`,
            height: `calc(2 * ${planet.orbitRadius})`,
            boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05)'
          }}
        ></div>
      ))}
      
      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet 
          key={`planet-${index}`}
          {...planet}
          systemActive={systemActive}
        />
      ))}
    </div>
  );
}