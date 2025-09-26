import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPosts, getFeaturedImageUrl, formatDate } from '@/utils/wordpress';

interface BlogPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  _embedded?: any;
}

interface BlogCarouselProps {
  postsPerPage?: number;
  showViewAll?: boolean;
}

// Blog post card component
const BlogPostCard = ({ post, isActive, onHover }) => {
  const imageUrl = getFeaturedImageUrl(post, 'medium') || 'https://via.placeholder.com/300x200';
  const title = post.title.rendered || 'Untitled';
  const excerpt = post.excerpt.rendered || '';
  const date = formatDate(post.date);
  const postUrl = `/blog/${post.slug}`;
  
  // Extract author name if available
  const authorName = post._embedded?.author?.[0]?.name || 'NXTMT Team';
  
  // Extract categories if available
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const primaryCategory = categories.length > 0 ? categories[0] : null;

  return (
    <div 
      className={`flex-shrink-0 w-80 mx-3 transition-all duration-300 group rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm border ${isActive ? 'border-primary scale-[1.02]' : 'border-border/40'} hover:border-primary/40`}
      onMouseEnter={onHover}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-5">
        {primaryCategory && (
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm mb-3">
            {primaryCategory.name}
          </span>
        )}
        
        <h3 className="text-lg font-bold font-display mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          <a href={postUrl}>
            {title}
          </a>
        </h3>
        
        <div 
          className="text-sm text-muted-foreground mb-4 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </span>
          
          <span className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {authorName}
          </span>
        </div>
      </div>
    </div>
  );
};

// Main carousel component
export default function BlogCarousel({ postsPerPage = 6, showViewAll = true }: BlogCarouselProps) {
  const carouselRef = useRef(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState(null);
  const [error, setError] = useState('');
  
  // Fetch posts from WordPress
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const response = await getPosts({ per_page: postsPerPage });
        setPosts(response.posts);
        
        // Set the first post as active by default
        if (response.posts.length > 0) {
          setActivePost(response.posts[0]);
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, [postsPerPage]);
  
  // Scroll functions
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <section id="blog" className="py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
        </div>
      </section>
    );
  }
  
  // Error state
  if (error) {
    return (
      <section id="blog" className="py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }
  
  // No posts found
  if (posts.length === 0) {
    return (
      <section id="blog" className="py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-background/80">
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      
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
          
          {showViewAll && (
            <Button 
              variant="ghost" 
              className="group text-foreground hover:text-primary"
              asChild
            >
              <a href="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          )}
        </div>
        
        <div className="relative w-full mb-8">
          {/* Scroll buttons */}
          <button 
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-primary/80 p-2 rounded-full text-white transition-colors duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-primary/80 p-2 rounded-full text-white transition-colors duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Scrollable container */}
          <div 
            ref={carouselRef}
            className="no-scrollbar flex py-6 overflow-x-auto snap-x snap-mandatory scroll-pl-6 px-6"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {posts.map((post) => (
              <div key={post.id} className="snap-center">
                <BlogPostCard 
                  post={post}
                  isActive={activePost?.id === post.id}
                  onHover={() => setActivePost(post)}
                />
              </div>
            ))}
          </div>
          
          {/* Gradient fades at the edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
        </div>
      </div>
    </section>
  );
}