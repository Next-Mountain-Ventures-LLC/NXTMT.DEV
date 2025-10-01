import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingCart, Tag, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProducts, getFeaturedImageUrl } from '@/utils/wordpress';
import { generateProductImage, generateProductDescription, updateProductWithEnhancements } from '@/utils/productEnhancer';

interface Product {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  date: string;
  _embedded?: any;
  acf?: {
    price?: string;
    sale_price?: string;
    product_type?: string;
  };
}

interface EnhancedProductCarouselProps {
  productsPerPage?: number;
  showViewAll?: boolean;
  title?: string;
  subtitle?: string;
  generatePlaceholders?: boolean;
  updateWordPress?: boolean;
}

// Product card component
const ProductCard = ({ product, isActive, onHover, isEnhanced, isEnhancing }) => {
  const title = product.title.rendered || 'Untitled Product';
  
  // Get image URL from WordPress or generate one
  let imageUrl = getFeaturedImageUrl(product, 'medium');
  const generatedImageUrl = generateProductImage(title, 800, 600);
  
  if (!imageUrl) {
    imageUrl = generatedImageUrl;
  }
  
  // Create a product excerpt (either from existing content or generated)
  const hasContent = product.content?.rendered && product.content.rendered.length > 20;
  const excerpt = hasContent 
    ? product.content.rendered.substring(0, 120) + '...' 
    : generateProductDescription(title).substring(0, 120) + '...';
  
  const productUrl = `/products/${product.slug}`;
  
  // Extract price if available (from ACF fields or custom meta)
  const price = product.acf?.price || '';
  const salePrice = product.acf?.sale_price || '';
  const productType = product.acf?.product_type || '';

  return (
    <div 
      className={`flex-shrink-0 w-80 mx-3 transition-all duration-300 group rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm border ${isActive ? 'border-primary scale-[1.02]' : 'border-border/40'} hover:border-primary/40`}
      onMouseEnter={onHover}
    >
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {salePrice && price && (
          <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
            Sale
          </div>
        )}
        {isEnhancing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-black/80 text-white text-xs px-3 py-2 rounded-md flex items-center">
              <span className="animate-spin mr-2 h-3 w-3 border-2 border-primary border-r-transparent rounded-full"></span>
              Enhancing...
            </div>
          </div>
        )}
      </div>
      
      <div className="p-5">
        {productType && (
          <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground backdrop-blur-sm mb-3">
            {productType}
          </span>
        )}
        
        <h3 className="text-lg font-bold font-display mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          <a href={productUrl}>
            {title}
          </a>
        </h3>
        
        <div 
          className="text-sm text-muted-foreground mb-4 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-1 text-primary" />
            <span className="text-lg font-semibold">
              {salePrice ? (
                <>
                  <span className="line-through text-sm text-muted-foreground mr-2">${price}</span>
                  <span className="text-accent">${salePrice}</span>
                </>
              ) : price ? (
                <span>${price}</span>
              ) : (
                <span>Contact for price</span>
              )}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="gap-1 text-xs"
            asChild
          >
            <a href={productUrl}>
              Details
              <ArrowRight className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main carousel component
export default function EnhancedProductCarousel({ 
  productsPerPage = 6, 
  showViewAll = true,
  title = "Featured Products",
  subtitle = "Discover our latest offerings",
  generatePlaceholders = true,
  updateWordPress = true
}: EnhancedProductCarouselProps) {
  const carouselRef = useRef(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeProduct, setActiveProduct] = useState(null);
  const [error, setError] = useState('');
  const [enhancedProducts, setEnhancedProducts] = useState<Set<number>>(new Set());
  const [enhancingProduct, setEnhancingProduct] = useState<number | null>(null);
  const [enhancementStatus, setEnhancementStatus] = useState<string | null>(null);
  
  // Fetch products from WordPress and enhance them automatically
  useEffect(() => {
    const fetchAndEnhanceProducts = async () => {
      setLoading(true);
      try {
        // First, fetch the products
        const response = await getProducts({ per_page: productsPerPage });
        setProducts(response.products);
        
        // Set the first product as active by default
        if (response.products.length > 0) {
          setActiveProduct(response.products[0]);
        }
        
        // Automatically enhance products that need it
        if (generatePlaceholders && updateWordPress && response.products.length > 0) {
          console.log('Automatically enhancing products...');
          
          // Process products sequentially to avoid overwhelming the API
          for (const product of response.products) {
            // Check if this product needs enhancement
            const hasContent = product.content?.rendered && product.content.rendered.length > 20;
            const hasImage = !!getFeaturedImageUrl(product, 'medium');
            
            // Only enhance products that need it
            if (!hasContent || !hasImage) {
              await enhanceProduct(product);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching or enhancing products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAndEnhanceProducts();
  }, [productsPerPage, generatePlaceholders, updateWordPress]);
  
  // Function to enhance a single product
  const enhanceProduct = async (product: Product) => {
    if (enhancedProducts.has(product.id) || enhancingProduct === product.id) {
      return;
    }
    
    setEnhancingProduct(product.id);
    setEnhancementStatus(`Enhancing product: ${product.title.rendered}`);
    
    try {
      // Generate image and description
      const title = product.title.rendered;
      const imageUrl = generateProductImage(title, 800, 600);
      const description = generateProductDescription(title);
      
      // Update the product in WordPress
      const updatedProduct = await updateProductWithEnhancements(
        product.id,
        imageUrl,
        description
      );
      
      if (updatedProduct) {
        // Update local products array with the enhanced product
        setProducts(prevProducts => 
          prevProducts.map(p => 
            p.id === product.id ? { ...p, ...updatedProduct } : p
          )
        );
        
        setEnhancementStatus(`Enhanced: ${title}`);
        
        // Add to enhanced products set
        setEnhancedProducts(prev => new Set([...prev, product.id]));
      } else {
        console.error(`Failed to enhance product: ${title}`);
        setEnhancementStatus(`Failed to enhance: ${title}`);
      }
    } catch (err) {
      console.error('Error enhancing product:', err);
      setEnhancementStatus(`Error enhancing: ${product.title.rendered}`);
    } finally {
      setTimeout(() => {
        if (enhancementStatus?.includes(product.title.rendered)) {
          setEnhancementStatus(null);
        }
      }, 3000);
      
      setEnhancingProduct(null);
    }
    
    // Return a promise to allow sequential processing
    return Promise.resolve();
  };
  
  
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
      <section id="products" className="py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
      </section>
    );
  }
  
  // Error state
  if (error) {
    return (
      <section id="products" className="py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }
  
  // No products found
  if (products.length === 0) {
    return (
      <section id="products" className="py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section id="products" className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-background/80">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4">
        {/* Section heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-secondary/20 border border-secondary/30 text-secondary-foreground backdrop-blur-sm">
              <span>{title}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 md:mb-0 leading-tight">
              {subtitle}
            </h2>
          </div>
          
          {showViewAll && (
            <Button 
              variant="ghost" 
              className="group text-foreground hover:text-primary"
              asChild
            >
              <a href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          )}
        </div>
        
        {/* Enhancement status message */}
        {enhancementStatus && (
          <div className="mb-6 flex justify-center">
            <div className="bg-primary/10 border border-primary/30 text-primary-foreground px-4 py-2 rounded-md flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {enhancementStatus}
            </div>
          </div>
        )}
        
        {/* Product carousel */}
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
            {products.map((product) => (
              <div key={product.id} className="snap-center">
                <ProductCard 
                  product={product}
                  isActive={activeProduct?.id === product.id}
                  onHover={() => setActiveProduct(product)}
                  isEnhanced={enhancedProducts.has(product.id)}
                  isEnhancing={enhancingProduct === product.id}
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