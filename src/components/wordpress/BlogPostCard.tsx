import React from 'react';
import { formatDate, getFeaturedImageUrl } from '@/utils/wordpress';

interface BlogPostCardProps {
  post: any;
  compact?: boolean;
}

export default function BlogPostCard({ post, compact = false }: BlogPostCardProps) {
  const imageUrl = getFeaturedImageUrl(post, compact ? 'medium' : 'large');
  const title = post.title.rendered || 'Untitled';
  const excerpt = post.excerpt.rendered || '';
  const date = formatDate(post.date);
  const postUrl = `/blog/${post.slug}`;
  
  // Extract author name if available
  const authorName = post._embedded?.author?.[0]?.name || 'Unknown Author';
  
  // Extract categories if available
  const categories = post._embedded?.['wp:term']?.[0] || [];
  const primaryCategory = categories.length > 0 ? categories[0] : null;
  
  if (compact) {
    return (
      <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-card/50 transition-colors">
        {imageUrl && (
          <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-grow">
          <h3 className="text-base font-bold font-display line-clamp-1">
            <a href={postUrl} className="hover:text-primary transition-colors">
              {title}
            </a>
          </h3>
          <p className="text-xs text-muted-foreground">
            {date} • {authorName}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm border border-border/40 hover:border-primary/40 transition-colors h-full">
      {imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="flex-grow p-5">
        {primaryCategory && (
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm mb-3">
            {primaryCategory.name}
          </span>
        )}
        
        <h3 className="text-xl font-bold font-display mb-2 line-clamp-2">
          <a href={postUrl} className="hover:text-primary transition-colors">
            {title}
          </a>
        </h3>
        
        <div 
          className="text-sm text-muted-foreground mb-4 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
          <span className="text-xs text-muted-foreground">
            {date}
          </span>
          
          <a 
            href={postUrl}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}