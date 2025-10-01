import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-gray-900/50 to-background -z-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-70 -z-10"></div>
      
      <div 
        ref={containerRef}
        className="container mx-auto px-4"
      >
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-900/20 backdrop-blur-md -z-10"></div>
          
          {/* Border */}
          <div className="absolute inset-0 border border-white/10 rounded-2xl -z-10"></div>
          
          {/* Content */}
          <div className="px-6 py-16 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left column */}
              <div className="transform transition-all duration-700 opacity-0 translate-y-8 delay-100">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 leading-tight text-white">
                  Ready to Elevate Your Digital Presence?
                </h2>
                
                <p className="text-white/70 mb-8 text-lg">
                  Our team of experts is ready to help you transform your business 
                  with cutting-edge digital solutions tailored to your specific needs.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Email Us</h3>
                      <a href="mailto:info@nxtmt.com" className="text-white/70 hover:text-white transition-colors">
                        info@nxtmt.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Call Us</h3>
                      <a href="tel:+18003876427" className="text-white/70 hover:text-white transition-colors">
                        1-800-387-6427
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Schedule a Consultation</h3>
                      <a href="https://nxtmt.com/schedule" className="text-white/70 hover:text-white transition-colors">
                        Book a free 15-minute discovery call
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right column - Contact form or CTA */}
              <div className="transform transition-all duration-700 opacity-0 translate-y-8 delay-300">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6">Get a Custom Quote</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                        placeholder="Your email address"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Services Interested In</label>
                      <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent">
                        <option value="" className="bg-gray-900">Select a service</option>
                        <option value="web-development" className="bg-gray-900">Web Development</option>
                        <option value="branding" className="bg-gray-900">Branding & Identity</option>
                        <option value="integration" className="bg-gray-900">Integration Services</option>
                        <option value="consultation" className="bg-gray-900">Consultation Services</option>
                        <option value="package" className="bg-gray-900">Premium Package</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">Message</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent h-24"
                        placeholder="Tell us about your project"
                      ></textarea>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full py-6 bg-primary hover:bg-primary/90 text-white transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
                    >
                      Send Inquiry
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .animate-in > div {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default ContactCTA;