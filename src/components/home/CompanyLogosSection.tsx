import React from 'react';
import { MessageSquare } from 'lucide-react';

interface LogoItemProps {
  name: string;
  icon: React.ReactNode;
  delay: number;
}

const LogoItem: React.FC<LogoItemProps> = ({ name, icon, delay }) => {
  return (
    <div 
      className="flex items-center bg-card/40 backdrop-blur-sm border border-border/50 rounded-lg p-3 gap-3 transform hover:scale-105 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="font-medium text-sm">{name}</div>
    </div>
  );
};

// Custom icons for each company/service
const AcuityIcon = () => (
  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
    Ac
  </div>
);

const TwilioIcon = () => (
  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-xs">
    Tw
  </div>
);

const StripeIcon = () => (
  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
    St
  </div>
);

const SquareIcon = () => (
  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-black to-gray-700 flex items-center justify-center text-white font-bold text-xs">
    Sq
  </div>
);

const GPTIcon = () => (
  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
    <MessageSquare className="w-4 h-4 text-white" />
  </div>
);

const CompanyLogosSection: React.FC = () => {
  const logos: LogoItemProps[] = [
    { name: 'Acuity Scheduling', icon: <AcuityIcon />, delay: 0 },
    { name: 'Twilio API', icon: <TwilioIcon />, delay: 100 },
    { name: 'Stripe Payments', icon: <StripeIcon />, delay: 200 },
    { name: 'Square Payments', icon: <SquareIcon />, delay: 300 },
    { name: 'Custom GPT Creation', icon: <GPTIcon />, delay: 400 }
  ];

  return (
    <section className="py-10 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-36 h-36 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm">
            <span>Our Partners</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-3 leading-tight">
            Companies We Develop With
          </h2>
          
          <p className="text-muted-foreground text-sm">
            We leverage industry-leading tools and platforms to create powerful, integrated solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto logos-container">
          {logos.map((logo, index) => (
            <LogoItem
              key={index}
              name={logo.name}
              icon={logo.icon}
              delay={logo.delay}
            />
          ))}
        </div>
      </div>
      
      {/* CSS for the animation */}
      <style jsx>{`
        .logos-container > div {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.5s ease forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default CompanyLogosSection;