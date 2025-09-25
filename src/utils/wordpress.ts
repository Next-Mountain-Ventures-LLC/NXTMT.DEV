/**
 * WordPress API integration utilities
 * 
 * This file contains functions to connect to a WordPress site's REST API
 * and fetch content for use within the Astro site.
 */

// The base URL of your WordPress site
const WORDPRESS_API_URL = 'https://your-wordpress-site.com/wp-json/wp/v2';

/**
 * Fetches posts from WordPress
 * 
 * @param {Object} options - Query parameters
 * @param {number} options.page - Page number
 * @param {number} options.per_page - Posts per page
 * @param {Array} options.categories - Category IDs to filter by
 * @param {string} options.search - Search term
 * @returns {Promise<Array>} - WordPress posts
 */
export async function getPosts(options = {}) {
  const queryParams = new URLSearchParams();
  
  // Add options to query parameters
  Object.entries(options).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle arrays like categories
      queryParams.append(key, value.join(','));
    } else if (value !== undefined) {
      queryParams.append(key, value.toString());
    }
  });

  // Add _embed to include featured images and author info
  queryParams.append('_embed', 'true');
  
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    
    // Parse the WordPress posts
    const posts = await response.json();
    
    // Extract the total posts and pages from headers
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);
    
    return {
      posts,
      totalPosts,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return {
      posts: [],
      totalPosts: 0,
      totalPages: 0
    };
  }
}

/**
 * Fetches a single post by slug
 * 
 * @param {string} slug - The post slug
 * @returns {Promise<Object|null>} - WordPress post
 */
export async function getPostBySlug(slug: string) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed=true`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    
    const posts = await response.json();
    
    // Return the first post (slug should be unique)
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error fetching WordPress post by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetches categories from WordPress
 * 
 * @returns {Promise<Array>} - WordPress categories
 */
export async function getCategories() {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress categories:', error);
    return [];
  }
}

/**
 * Helper function to extract the featured image URL from a WordPress post
 * 
 * @param {Object} post - WordPress post with _embedded data
 * @param {string} size - Image size (thumbnail, medium, large, full)
 * @returns {string|null} - Featured image URL
 */
export function getFeaturedImageUrl(post: any, size: string = 'medium') {
  if (!post._embedded || !post._embedded['wp:featuredmedia']) {
    return null;
  }
  
  const media = post._embedded['wp:featuredmedia'][0];
  
  if (!media) {
    return null;
  }
  
  // If the requested size exists, return it
  if (media.media_details && 
      media.media_details.sizes && 
      media.media_details.sizes[size]) {
    return media.media_details.sizes[size].source_url;
  }
  
  // Fallback to the full size
  return media.source_url || null;
}

/**
 * Formats a WordPress date string
 * 
 * @param {string} dateString - WordPress date string
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} - Formatted date
 */
export function formatDate(dateString: string, options: Intl.DateTimeFormatOptions = {}) {
  const date = new Date(dateString);
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(date);
}

/**
 * Sanitizes WordPress content by removing WordPress-specific elements
 * 
 * @param {string} content - WordPress content HTML
 * @returns {string} - Sanitized HTML content
 */
export function sanitizeContent(content: string) {
  // This is a simple example - you might need more complex processing
  // depending on your WordPress content
  
  // Remove WordPress embed blocks that won't work in Astro
  let sanitized = content.replace(
    /<figure class="wp-block-embed.*?<\/figure>/gs,
    ''
  );
  
  return sanitized;
}