import React, { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';

interface PromoPopupProps {
  title?: string;
  description?: string;
  cta?: string;
}

export default function PromoPopup({
  title = "Limited Time Offer!",
  description = "Get $1,000 off your next website project. Start building your dream site today!",
  cta = "Claim Your Discount"
}: PromoPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the popup has been shown before
    const hasPopupBeenShown = localStorage.getItem('promoPopupShown');
    
    // If not, show it after a short delay
    if (!hasPopupBeenShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Mark that the popup has been shown
        localStorage.setItem('promoPopupShown', 'true');
      }, 2000); // 2-second delay before showing
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="relative max-w-md w-full mx-4 bg-background rounded-2xl overflow-hidden shadow-2xl animate-slide-in-up">
        {/* Decorative top border */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent"></div>
        
        {/* Close button */}
        <button 
          onClick={closePopup}
          className="absolute top-3 right-3 text-foreground/70 hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-foreground/10"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>
        
        <div className="p-6">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          
          {/* Content */}
          <h2 className="text-2xl font-bold font-display text-center mb-2">{title}</h2>
          
          <div className="mb-6 text-center">
            <p className="text-muted-foreground mb-2">{description}</p>
            <p className="text-3xl font-bold font-display text-primary">$1,000.00 OFF</p>
          </div>
          
          {/* Call to action */}
          <a 
            href="/#contact"
            onClick={closePopup}
            className="block w-full py-3 px-4 bg-primary text-white text-center font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            {cta}
          </a>
          
          {/* Fine print */}
          <p className="text-xs text-center text-muted-foreground mt-4">
            *Limited time offer. Must mention promo when contacting us. 
            Cannot be combined with other offers.
          </p>
        </div>
      </div>
    </div>
  );
}