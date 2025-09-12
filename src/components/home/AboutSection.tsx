import React from 'react';
import { Code, Telescope, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background relative">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left column - Text content */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-secondary/40 border border-secondary/50 text-secondary backdrop-blur-sm drop-shadow-sm">
              <Telescope className="w-3.5 h-3.5 mr-1.5" />
              <span className="drop-shadow-sm">About Our Studio</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-[Press_Start_2P] mb-6 leading-tight">
              Creating digital experiences that 
              <span className="text-primary"> transcend </span> 
              ordinary boundaries
            </h2>
            
            <p className="text-muted-foreground mb-6">
              We are a team of passionate designers, developers, and digital strategists dedicated to crafting immersive digital experiences that push the boundaries of creativity and functionality.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-lg bg-primary/10 text-primary">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Expert Development</h3>
                  <p className="text-muted-foreground">Clean, efficient code that powers exceptional experiences</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Creative Design</h3>
                  <p className="text-muted-foreground">Bold, innovative designs that captivate and inspire</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div>
                <p className="text-4xl font-bold font-[Press_Start_2P] text-primary">7+</p>
                <p className="text-muted-foreground text-sm">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold font-[Press_Start_2P] text-primary">120+</p>
                <p className="text-muted-foreground text-sm">Projects Completed</p>
              </div>
              <div>
                <p className="text-4xl font-bold font-[Press_Start_2P] text-primary">98%</p>
                <p className="text-muted-foreground text-sm">Client Satisfaction</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Visual element */}
          <div className="w-full lg:w-1/2 relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 border border-primary/20 rounded-lg"></div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 border border-accent/20 rounded-lg"></div>
            
            {/* Main visual container */}
            <div className="relative p-1 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-sm border border-white/10">
              <div className="p-6 rounded-xl bg-card/30 backdrop-blur-sm h-full">
                {/* Grid layout for abstract representation of work */}
                <div className="grid grid-cols-2 gap-4 relative">
                  <div className="aspect-square rounded-lg bg-primary/20 animate-float" style={{ animationDelay: '0s' }}></div>
                  <div className="aspect-square rounded-lg bg-secondary/20 animate-float" style={{ animationDelay: '1s' }}></div>
                  <div className="aspect-square rounded-lg bg-accent/20 animate-float" style={{ animationDelay: '1.5s' }}></div>
                  <div className="aspect-square rounded-lg bg-primary/20 animate-float" style={{ animationDelay: '0.5s' }}></div>
                  
                  {/* Central element */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary via-secondary to-accent p-1">
                      <div className="w-full h-full rounded-full bg-background/80 flex items-center justify-center backdrop-blur-sm">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}