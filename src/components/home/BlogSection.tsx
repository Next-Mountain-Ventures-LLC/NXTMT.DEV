import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  index: number;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, excerpt, date, category, index }) => {
  // Generate a gradient background based on index for demo
  const getBgClass = (idx: number) => {
    const gradients = [
      'bg-gradient-to-br from-primary/20 to-secondary/20',
      'bg-gradient-to-br from-secondary/20 to-accent/20',
      'bg-gradient-to-br from-accent/20 to-primary/20',
    ];
    return gradients[idx % gradients.length];
  };

  return (
    <article className="group rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-5px]">
      {/* Image placeholder - in a real site this would be an actual image */}
      <div className={`aspect-video ${getBgClass(index)} rounded-xl mb-4 overflow-hidden`}>
        <div className="h-full w-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
          <span className="text-3xl text-white/10 font-bold">Blog {index + 1}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary-foreground">{category}</span>
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </span>
        </div>
        
        <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{excerpt}</p>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="p-0 text-primary group-hover:text-primary/90"
        >
          Read more
          <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </article>
  );
};

export default function BlogSection() {
  const blogPosts = [
    {
      title: "10 Web Design Trends Shaping the Digital Universe in 2023",
      excerpt: "Explore the latest design innovations that are transforming the digital landscape and setting new standards for web experiences.",
      date: "June 12, 2023",
      category: "Design"
    },
    {
      title: "The Future of Interactive User Experiences in Digital Products",
      excerpt: "How emerging technologies and design philosophies are creating more immersive and engaging digital products.",
      date: "May 28, 2023",
      category: "UX/UI"
    },
    {
      title: "Optimizing Website Performance: Speed, SEO and Conversions",
      excerpt: "Practical strategies for improving your website's performance metrics and boosting business outcomes.",
      date: "May 15, 2023",
      category: "Development"
    }
  ];

  return (
    <section id="blog" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-accent/20 border border-accent/30 text-accent backdrop-blur-sm">
              <span>Our Blog</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 md:mb-0 leading-tight">
              Latest Insights
            </h2>
          </div>
          
          <Button 
            variant="ghost" 
            className="group text-foreground hover:text-primary"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPost 
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              category={post.category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}