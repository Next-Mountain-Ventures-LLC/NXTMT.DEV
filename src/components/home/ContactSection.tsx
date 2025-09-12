import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 relative">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-cosmic-gradient opacity-30 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm">
              <span>Get In Touch</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6 leading-tight">
              Ready to Start Your Digital Journey?
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-lg">
              Let's discuss how we can help transform your digital presence and create experiences that captivate your audience.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Us</h3>
                  <p className="text-muted-foreground">hello@cosmicstudio.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-lg bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Visit Us</h3>
                  <p className="text-muted-foreground">123 Cosmic Way, Digital Galaxy, Universe 42</p>
                </div>
              </div>
            </div>
            
            {/* Social icons would go here */}
            <div className="flex space-x-4">
              {/* Social media icons would be real components in a production site */}
              <div className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors duration-300 cursor-pointer">
                <span className="text-primary text-lg font-bold">f</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors duration-300 cursor-pointer">
                <span className="text-primary text-lg font-bold">in</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors duration-300 cursor-pointer">
                <span className="text-primary text-lg font-bold">ig</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors duration-300 cursor-pointer">
                <span className="text-primary text-lg font-bold">x</span>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            {/* Form border glow effect */}
            <div className="p-1 rounded-2xl bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30">
              <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-white/10">
                {/* Used the existing ContactForm component with updated styling */}
                <ContactForm client:load />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}