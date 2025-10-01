/**
 * Product Enhancement Utilities
 * 
 * This file contains utilities for enhancing products with generated images and descriptions.
 */

import { WP_USERNAME, WP_APP_PASSWORD, getAuthHeader } from './wordpressAuth';

// API endpoints
const WP_API_URL = 'https://nxtmt.com/wp-json/wp/v2';

/**
 * Generate a placeholder image URL based on product title
 * This uses the DiceBear API to create unique avatars
 * 
 * @param title Product title
 * @param width Width of the image
 * @param height Height of the image
 * @returns Image URL
 */
export function generateProductImage(title: string, width = 800, height = 600): string {
  // Clean the title to create a consistent seed
  const seed = title.trim().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
  
  // Choose a style from DiceBear (avataaars, bottts, identicon, etc.)
  const style = 'thumbs';
  
  // Generate different colors based on the first character of the seed
  const firstChar = seed.charCodeAt(0) || 65;
  const hue = (firstChar * 137) % 360; // Using a prime number to get good distribution
  
  // Create the API URL with parameters
  const imageUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=gradient&backgroundRotation=${hue},${(hue + 60) % 360},${(hue + 180) % 360}&backgroundType=gradientLinear&size=${width}x${height}`;
  
  return imageUrl;
}

/**
 * Generate a product description based on the title
 * 
 * @param title Product title
 * @returns Generated description
 */
export function generateProductDescription(title: string): string {
  const cleanTitle = title.replace(/&[^;]+;/g, '').trim();
  
  // Extract key words from title
  const keywords = cleanTitle.split(' ').filter(word => word.length > 3);
  
  // Base templates for descriptions
  const templates = [
    `Introducing our premium ${cleanTitle}. This exceptional product offers unmatched quality and performance to elevate your experience. Designed with your needs in mind, it provides both style and functionality.`,
    `Experience the difference with our ${cleanTitle}. Meticulously crafted to deliver superior results, this innovative solution will transform how you approach your daily tasks. Enjoy its seamless integration and robust features.`,
    `Discover the versatility of our ${cleanTitle}. Created to provide exceptional value, this product combines cutting-edge technology with intuitive design. Explore the possibilities and enhance your capabilities today.`,
    `Meet the revolutionary ${cleanTitle}. This state-of-the-art product delivers outstanding performance while maintaining ease of use. Perfect for professionals and enthusiasts alike, it sets a new standard in the industry.`,
    `Enhance your toolkit with our ${cleanTitle}. Developed through extensive research and testing, this reliable solution offers consistent results and long-lasting durability. Invest in quality that speaks for itself.`
  ];
  
  // Select a template based on title length to add variety
  const templateIndex = cleanTitle.length % templates.length;
  let description = templates[templateIndex];
  
  // Add benefits section
  description += `\n\n<h3>Key Benefits:</h3>\n<ul>`;
  
  // Generate benefits based on keywords
  const benefits = [
    'Enhanced productivity',
    'Superior quality',
    'User-friendly design',
    'Exceptional durability',
    'Advanced technology integration',
    'Streamlined performance',
    'Versatile functionality',
    'Professional-grade results',
    'Time-saving features',
    'Intuitive user interface'
  ];
  
  // Add 3-5 benefits
  const benefitCount = 3 + (cleanTitle.length % 3);
  const selectedBenefits = [];
  
  for (let i = 0; i < benefitCount; i++) {
    const index = (cleanTitle.charCodeAt(i % cleanTitle.length) + i) % benefits.length;
    if (!selectedBenefits.includes(benefits[index])) {
      selectedBenefits.push(benefits[index]);
      description += `\n  <li>${benefits[index]}</li>`;
    }
  }
  
  description += `\n</ul>`;
  
  // Add specification or feature section
  description += `\n\n<h3>Features:</h3>\n<p>The ${cleanTitle} includes a range of features designed to maximize your experience. Each component has been carefully selected to ensure optimal performance and reliability.</p>`;
  
  return description;
}

/**
 * Update product with generated image and description
 * 
 * @param productId WordPress product ID
 * @param imageUrl URL of the generated image
 * @param description Generated description
 * @returns Updated product data or null on error
 */
export async function updateProductWithEnhancements(productId: number, imageUrl: string, description: string) {
  try {
    console.log(`Updating product ${productId} with enhancements...`);
    
    // First, create a media item from the image URL
    const mediaId = await createMediaFromUrl(imageUrl, `product-${productId}-image`);
    
    if (!mediaId) {
      console.error('Failed to create media item');
      return null;
    }
    
    // Now update the product with the new media and description
    const response = await fetch(`${WP_API_URL}/product/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthHeader()
      },
      body: JSON.stringify({
        content: description,
        featured_media: mediaId
      })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

/**
 * Create a media item in WordPress from a URL
 * 
 * @param imageUrl URL of the image
 * @param title Title for the media item
 * @returns Media ID or null on error
 */
async function createMediaFromUrl(imageUrl: string, title: string): Promise<number | null> {
  try {
    // First, fetch the image data
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }
    
    // Get the image data as blob
    const imageBlob = await imageResponse.blob();
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', imageBlob, `${title}.svg`);
    formData.append('title', title);
    formData.append('caption', `Generated image for ${title}`);
    formData.append('alt_text', title);
    
    // Upload the image to WordPress
    const uploadResponse = await fetch(`${WP_API_URL}/media`, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader()
      },
      body: formData
    });
    
    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload media: ${uploadResponse.statusText}`);
    }
    
    const mediaData = await uploadResponse.json();
    return mediaData.id;
  } catch (error) {
    console.error('Error creating media from URL:', error);
    return null;
  }
}