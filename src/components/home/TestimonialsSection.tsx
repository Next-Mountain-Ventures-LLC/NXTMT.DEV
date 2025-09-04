import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, title, rating }) => {
  return (
    <div className="p-1 rounded-xl bg-gradient-to-br from-primary/30 via-transparent to-accent/30">
      <div className="p-6 h-full rounded-lg bg-card/30 backdrop-blur-sm border border-white/10 flex flex-col">
        <div className="mb-4 flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'text-primary fill-primary' : 'text-muted'}`} 
            />
          ))}
        </div>
        
        <Quote className="h-8 w-8 text-primary/30 mb-2" />
        
        <p className="text-muted-foreground mb-6 flex-grow">"{quote}"</p>
        
        <div className="flex items-center mt-auto">
          {/* Avatar placeholder - would be an actual image in a real implementation */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/70 to-accent/70 flex items-center justify-center text-sm font-bold text-white mr-3">
            {name.charAt(0)}
          </div>
          
          <div>
            <h4 className="font-bold text-foreground">{name}</h4>
            <p className="text-xs text-muted-foreground">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "The team at COSMIC transformed our online presence. Their design work is truly out of this world!",
      name: "Alex Johnson",
      title: "CEO, Stellar Innovations",
      rating: 5
    },
    {
      quote: "Working with this creative studio was an incredible experience. They delivered beyond our expectations.",
      name: "Samantha Lee",
      title: "Marketing Director, Orbit Tech",
      rating: 5
    },
    {
      quote: "Their attention to detail and creative approach helped us stand out in a crowded market.",
      name: "David Chen",
      title: "Founder, Eclipse Software",
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-secondary/20 border border-secondary/30 text-secondary-foreground backdrop-blur-sm">
            <span>Testimonials</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
            What Our Clients Say
          </h2>
          
          <p className="text-muted-foreground">
            Don't take our word for it — hear what our clients have to say about their experiences working with our creative team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}