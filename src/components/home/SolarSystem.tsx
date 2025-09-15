import React, { useState } from 'react';

interface PlanetProps {
  name: string;
  description: string;
  color: string;
  size: string;
  orbitRadius: string;
  animationClass: string;
  orbitTilt?: string;
  orbitSpeed: number; // Days to orbit the sun (for relative speeds)
  link: string;
  icon?: React.ReactNode;
  hasRings?: boolean;
}

// Real astronomical data (scaled for UI)
const planets: PlanetProps[] = [
  {
    name: 'Mercury',
    description: 'The smallest planet in our solar system and closest to the Sun with a rocky, cratered surface.',
    color: 'bg-gradient-to-r from-gray-400 to-gray-500 shadow-[0_0_8px_rgba(160,160,160,0.5)]',
    size: 'w-2.5 h-2.5 md:w-3.5 md:h-3.5',
    orbitRadius: '80px',
    animationClass: 'animate-orbit',
    orbitSpeed: 88, // days to orbit
    link: '/#services'
  },
  {
    name: 'Venus',
    description: 'Venus has a thick, toxic atmosphere with clouds of sulfuric acid and a volcano-covered surface.',
    color: 'bg-gradient-to-r from-yellow-200 to-yellow-300 shadow-[0_0_8px_rgba(254,240,138,0.5)]',
    size: 'w-4 h-4 md:w-5 md:h-5',
    orbitRadius: '110px',
    animationClass: 'animate-orbit-reverse', // Venus rotates in opposite direction
    orbitSpeed: 225,
    link: '/#services'
  },
  {
    name: 'Earth',
    description: 'Our home planet, with liquid water, oxygen and the perfect conditions for life as we know it.',
    color: 'bg-gradient-to-r from-blue-500 to-green-400 shadow-[0_0_10px_rgba(59,130,246,0.7)]',
    size: 'w-4 h-4 md:w-5.5 md:h-5.5',
    orbitRadius: '150px',
    animationClass: 'animate-orbit',
    orbitSpeed: 365,
    link: '/#services'
  },
  {
    name: 'Mars',
    description: 'The "Red Planet" with a thin atmosphere, known for its reddish appearance due to iron oxide.',
    color: 'bg-gradient-to-r from-red-500 to-red-600 shadow-[0_0_10px_rgba(239,68,68,0.6)]',
    size: 'w-3 h-3 md:w-4.5 md:h-4.5',
    orbitRadius: '190px',
    animationClass: 'animate-orbit',
    orbitSpeed: 687,
    link: '/#services'
  },
  {
    name: 'Jupiter',
    description: 'The largest planet in our solar system, a gas giant with a distinctive Great Red Spot.',
    color: 'bg-gradient-to-r from-yellow-600 to-orange-300 shadow-[0_0_12px_rgba(245,158,11,0.7)]',
    size: 'w-8 h-8 md:w-11 md:h-11',
    orbitRadius: '240px',
    animationClass: 'animate-orbit',
    orbitSpeed: 4333,
    link: '/#services'
  },
  {
    name: 'Saturn',
    description: 'Famous for its stunning rings, Saturn is a gas giant with complex ring system made of ice particles.',
    color: 'bg-gradient-to-r from-yellow-300 to-yellow-400 shadow-[0_0_10px_rgba(252,211,77,0.7)]',
    size: 'w-7 h-7 md:w-10 md:h-10',
    orbitRadius: '290px',
    animationClass: 'animate-orbit',
    orbitSpeed: 10759,
    hasRings: true,
    link: '/#services'
  },
  {
    name: 'Uranus',
    description: 'An ice giant that rotates on its side, with a blue-green color due to methane in its atmosphere.',
    color: 'bg-gradient-to-r from-cyan-300 to-teal-300 shadow-[0_0_10px_rgba(103,232,249,0.6)]',
    size: 'w-5 h-5 md:w-7 md:h-7',
    orbitRadius: '330px',
    animationClass: 'animate-orbit',
    orbitSpeed: 30687,
    orbitTilt: 'rotate-[97deg]', // Uranus rotates on its side
    link: '/#services'
  },
  {
    name: 'Neptune',
    description: 'A distant ice giant with a deep blue color and the strongest winds in the solar system.',
    color: 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.6)]',
    size: 'w-5 h-5 md:w-7 md:h-7',
    orbitRadius: '370px',
    animationClass: 'animate-orbit',
    orbitSpeed: 60190,
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
  systemActive,
  orbitTilt,
  hasRings
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${isHovered || !systemActive ? 'animate-none' : animationClass} transition-all duration-300 ${orbitTilt || ''}`}
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
      {hasRings && (
        <div className="absolute inset-0 -m-1.5 border-2 border-yellow-200/30 rounded-full transform scale-[1.4] rotate-12"></div>
      )}
      
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
      className="relative h-[500px] max-w-[800px] mx-auto my-12 overflow-hidden"
      onMouseEnter={() => setSystemActive(false)}
      onMouseLeave={() => setSystemActive(true)}
    >
      {/* Sun/Center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-yellow-300 via-yellow-500 to-red-500 rounded-full shadow-xl z-10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-radial from-yellow-300 via-transparent to-transparent opacity-70"></div>
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