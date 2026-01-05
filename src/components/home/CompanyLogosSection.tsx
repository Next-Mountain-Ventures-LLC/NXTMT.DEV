import React from 'react';
import astroLogo from '../../assets/img_0562_nw_e507d3a0.png';
import acuityLogo from '../../assets/img_0554_nw_162f879e.png';
import twilioLogo from '../../assets/img_0558_nw_a452dfbf.png';
import stripeLogo from '../../assets/img_0553_nw_b750080b.png';
import squareLogo from '../../assets/img_0555_nw_531214a0.png';
import chatgptLogo from '../../assets/img_0556_nw_85450984.png';
import wordpressLogo from '../../assets/img_0559_nw_3d59bc4b.png';
import elementorLogo from '../../assets/img_0567_nw_b8fb2713.png';
import woocommerceLogo from '../../assets/img_0564_nw_e35222cf.png';
import pressableLogo from '../../assets/img_0569_nw_4fd13c49.jpeg';
import css5Logo from '../../assets/img_0563_nw_b242d7cf.jpeg';

interface LogoItemProps {
  name: string;
  icon: React.ReactNode;
  delay: number;
}

const LogoItem: React.FC<LogoItemProps> = ({ name, icon, delay }) => {
  return (
    <div
      className="logo-item flex items-center bg-gradient-to-r from-primary/30 to-primary/20 backdrop-blur-sm border border-primary/60 rounded-lg p-3 gap-3 transform hover:scale-105 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` } as React.CSSProperties}
    >
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="logo-name font-bold text-sm text-white">{name}</div>
    </div>
  );
};

// Logo components for each company/service
const AcuityIcon = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
    <img src={acuityLogo.src} alt="Acuity" className="w-6 h-6 object-contain" />
  </div>
);

const TwilioIcon = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
    <img src={twilioLogo.src} alt="Twilio" className="w-6 h-6 object-contain" />
  </div>
);

const StripeIcon = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
    <img src={stripeLogo.src} alt="Stripe" className="w-6 h-6 object-contain" />
  </div>
);

const SquareIcon = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
    <img src={squareLogo.src} alt="Square" className="w-6 h-6 object-contain" />
  </div>
);

const ChatGPTIcon = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
    <img src={chatgptLogo.src} alt="ChatGPT" className="w-6 h-6 object-contain" />
  </div>
);

const AstroIcon = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
    <img src={astroLogo.src} alt="Astro" className="w-6 h-6 object-contain" />
  </div>
);

const WordPressIcon = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
    <img src={wordpressLogo.src} alt="WordPress" className="w-6 h-6 object-contain" />
  </div>
);

const ElementorIcon = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
    <img src={elementorLogo.src} alt="Elementor" className="w-6 h-6 object-contain" />
  </div>
);

const WooCommerceIcon = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
    <img src={woocommerceLogo.src} alt="WooCommerce" className="w-6 h-6 object-contain" />
  </div>
);


const PressableIcon = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
    <img src={pressableLogo.src} alt="Pressable" className="w-6 h-6 object-contain" />
  </div>
);

const CSS5Icon = () => (
  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
    <img src={css5Logo.src} alt="CSS5" className="w-6 h-6 object-contain" />
  </div>
);

const CompanyLogosSection: React.FC = () => {
  const logos: LogoItemProps[] = [
    { name: 'Acuity Scheduling', icon: <AcuityIcon />, delay: 0 },
    { name: 'Twilio API', icon: <TwilioIcon />, delay: 50 },
    { name: 'Stripe Payments', icon: <StripeIcon />, delay: 100 },
    { name: 'Square Payments', icon: <SquareIcon />, delay: 150 },
    { name: 'ChatGPT', icon: <ChatGPTIcon />, delay: 200 },
    { name: 'Astro Framework', icon: <AstroIcon />, delay: 250 },
    { name: 'WordPress', icon: <WordPressIcon />, delay: 300 },
    { name: 'Elementor', icon: <ElementorIcon />, delay: 350 },
    { name: 'WooCommerce', icon: <WooCommerceIcon />, delay: 400 },
    { name: 'Pressable', icon: <PressableIcon />, delay: 450 },
    { name: 'CSS5', icon: <CSS5Icon />, delay: 500 } // This has specific styling with strong contrast
  ];

  return (
    <section className="py-10 relative overflow-hidden bg-black border-t border-b border-primary/20">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-36 h-36 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-black/95 backdrop-blur-md -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/30 border border-primary/50 text-white backdrop-blur-sm">
            <span>Our Partners</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-3 leading-tight text-white">
            Technologies We Partner With
          </h2>
          
          <p className="text-white/80 text-sm">
            We leverage these industry-leading tools and platforms to create powerful, integrated solutions for your business needs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 max-w-6xl mx-auto logos-container">
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
      
      <style>{`
        .logos-container > div {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.5s ease forwards;
        }

        .logo-item {
          text-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
        }

        .logo-name {
          filter: brightness(1.2);
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
