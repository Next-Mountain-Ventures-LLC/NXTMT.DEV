/**
 * Product Enhancement Utilities
 * 
 * This file contains utilities for generating product images and descriptions.
 */

// Import authentication details (preserved for reference but not used for updates)
import { getAuthHeader } from './wordpressAuth';

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

// Note: WordPress product update functionality has been removed as requested
// Only keeping the image and description generation functionality