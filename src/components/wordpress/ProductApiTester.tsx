import React, { useState, useEffect } from 'react';
import { getProducts, getFeaturedImageUrl } from '@/utils/wordpress';
import { generateProductImage, generateProductDescription, updateProductWithEnhancements } from '@/utils/productEnhancer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface Product {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  date: string;
  _embedded?: any;
  acf?: any;
  status?: string;
  featured_media?: number;
}

interface LogEntry {
  timestamp: Date;
  type: 'info' | 'success' | 'error';
  message: string;
  details?: any;
}

const ProductApiTester: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [enhancementResults, setEnhancementResults] = useState<Record<number, {success: boolean; message: string; before?: any; after?: any}>>({});
  
  // Function to add logs
  const addLog = (type: 'info' | 'success' | 'error', message: string, details?: any) => {
    setLogs(prev => [{
      timestamp: new Date(),
      type,
      message,
      details
    }, ...prev]);
  };
  
  // Function to fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    addLog('info', 'Fetching products from WordPress...');
    
    try {
      const response = await getProducts({ per_page: 10 });
      setProducts(response.products);
      addLog('success', `Successfully fetched ${response.products.length} products`, response.products);
      
      if (response.products.length > 0) {
        setSelectedProduct(response.products[0]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      addLog('error', 'Failed to fetch products', { error: errorMessage });
    } finally {
      setLoading(false);
    }
  };
  
  // Function to test image generation for a product
  const testImageGeneration = (product: Product) => {
    try {
      const title = product.title.rendered;
      const imageUrl = generateProductImage(title, 800, 600);
      addLog('success', `Generated image URL for "${title}"`, { imageUrl });
      return imageUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      addLog('error', `Failed to generate image for "${product.title.rendered}"`, { error: errorMessage });
      return null;
    }
  };
  
  // Function to test description generation for a product
  const testDescriptionGeneration = (product: Product) => {
    try {
      const title = product.title.rendered;
      const description = generateProductDescription(title);
      addLog('success', `Generated description for "${title}"`, { description });
      return description;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      addLog('error', `Failed to generate description for "${product.title.rendered}"`, { error: errorMessage });
      return null;
    }
  };
  
  // Function to test updating a product
  const testProductUpdate = async (product: Product) => {
    setLoading(true);
    addLog('info', `Testing product update for ID: ${product.id}`, product);
    
    try {
      // Generate image and description
      const imageUrl = testImageGeneration(product);
      const description = testDescriptionGeneration(product);
      
      if (!imageUrl || !description) {
        throw new Error('Failed to generate image or description');
      }
      
      // Store the "before" state
      const beforeState = {
        content: product.content?.rendered || '',
        featured_media: product.featured_media || 0,
        imageUrl: getFeaturedImageUrl(product, 'medium')
      };
      
      // Update the product
      addLog('info', 'Attempting to update product in WordPress...', { 
        productId: product.id,
        imageUrl,
        description: description.substring(0, 100) + '...'
      });
      
      const updatedProduct = await updateProductWithEnhancements(product.id, imageUrl, description);
      
      if (!updatedProduct) {
        throw new Error('Product update returned null or undefined');
      }
      
      // Store the "after" state
      const afterState = {
        content: updatedProduct.content?.rendered || '',
        featured_media: updatedProduct.featured_media || 0,
      };
      
      addLog('success', `Successfully updated product ID: ${product.id}`, updatedProduct);
      
      // Update the enhancement results
      setEnhancementResults(prev => ({
        ...prev,
        [product.id]: {
          success: true,
          message: 'Product successfully updated',
          before: beforeState,
          after: afterState
        }
      }));
      
      // Refresh the products list to show the updates
      fetchProducts();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      addLog('error', `Failed to update product ID: ${product.id}`, { error: errorMessage });
      
      // Update the enhancement results
      setEnhancementResults(prev => ({
        ...prev,
        [product.id]: {
          success: false,
          message: errorMessage
        }
      }));
    } finally {
      setLoading(false);
    }
  };
  
  // Function to test updating all products
  const testBatchUpdate = async () => {
    setLoading(true);
    addLog('info', `Starting batch update for ${products.length} products`);
    
    try {
      for (const product of products) {
        await testProductUpdate(product);
      }
      
      addLog('success', `Completed batch update for ${products.length} products`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      addLog('error', 'Batch update failed', { error: errorMessage });
    } finally {
      setLoading(false);
    }
  };
  
  // Load products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Format timestamp for logs
  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString();
  };
  
  return (
    <div>
      {/* Control Panel */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button 
          onClick={fetchProducts} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Refresh Products
        </Button>
        
        <Button 
          onClick={() => selectedProduct && testProductUpdate(selectedProduct)} 
          disabled={loading || !selectedProduct}
          variant="outline"
          className="flex items-center gap-2"
        >
          Test Update Selected Product
        </Button>
        
        <Button 
          onClick={testBatchUpdate} 
          disabled={loading || products.length === 0}
          variant="secondary"
          className="flex items-center gap-2"
        >
          Test Batch Update All Products
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Products ({products.length})</CardTitle>
              <CardDescription>Select a product to test</CardDescription>
            </CardHeader>
            <CardContent>
              {loading && <p className="text-center py-4">Loading...</p>}
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-700 p-4 rounded-md mb-4">
                  <div className="flex items-start">
                    <XCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Error</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {products.length === 0 && !loading && (
                <p className="text-center py-4 text-muted-foreground">No products found</p>
              )}
              
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {products.map((product) => {
                  const enhancementResult = enhancementResults[product.id];
                  
                  return (
                    <div 
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`p-3 border rounded-md cursor-pointer transition-colors ${
                        selectedProduct?.id === product.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium truncate" dangerouslySetInnerHTML={{ __html: product.title.rendered }} />
                          <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                        </div>
                        
                        {enhancementResult && (
                          <div className="flex-shrink-0 ml-2">
                            {enhancementResult.success ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Product Detail Panel */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="logs">API Logs ({logs.length})</TabsTrigger>
              <TabsTrigger value="debug">Debug Information</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedProduct ? (
                      <span dangerouslySetInnerHTML={{ __html: selectedProduct.title.rendered }} />
                    ) : 'No Product Selected'}
                  </CardTitle>
                  {selectedProduct && (
                    <CardDescription>
                      Product ID: {selectedProduct.id} | Slug: {selectedProduct.slug}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent>
                  {selectedProduct ? (
                    <div className="space-y-6">
                      {/* Featured Image */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Featured Image</h3>
                        <div className="border rounded-md overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800">
                          {getFeaturedImageUrl(selectedProduct, 'medium') ? (
                            <img 
                              src={getFeaturedImageUrl(selectedProduct, 'medium')} 
                              alt={selectedProduct.title.rendered} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                              No Featured Image
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Content</h3>
                        <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto">
                          {selectedProduct.content && selectedProduct.content.rendered ? (
                            <div dangerouslySetInnerHTML={{ __html: selectedProduct.content.rendered }} />
                          ) : (
                            <p className="text-sm text-muted-foreground">No content</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Generated Content Preview */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Generated Content Preview</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-xs font-medium mb-1">Generated Image</h4>
                            <div className="border rounded-md overflow-hidden aspect-video">
                              <img 
                                src={generateProductImage(selectedProduct.title.rendered, 800, 600)} 
                                alt={selectedProduct.title.rendered} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-medium mb-1">Generated Description Preview</h4>
                            <div className="border rounded-md p-2 h-[200px] overflow-y-auto text-xs">
                              <div dangerouslySetInnerHTML={{ 
                                __html: generateProductDescription(selectedProduct.title.rendered).substring(0, 300) + '...' 
                              }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      <p>Select a product from the list to view details</p>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  {selectedProduct && (
                    <Button
                      onClick={() => testProductUpdate(selectedProduct)}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? 'Processing...' : 'Update This Product'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="logs">
              <Card>
                <CardHeader>
                  <CardTitle>API Logs</CardTitle>
                  <CardDescription>Recent API activity and operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {logs.length === 0 ? (
                      <p className="text-center py-4 text-muted-foreground">No logs yet</p>
                    ) : (
                      logs.map((log, index) => (
                        <div 
                          key={index} 
                          className={`p-3 border rounded-md ${
                            log.type === 'error' ? 'border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900' : 
                            log.type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900' : 
                            'border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-900'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="mr-2 mt-0.5">
                              {log.type === 'error' ? (
                                <XCircle className="h-4 w-4 text-red-500" />
                              ) : log.type === 'success' ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-blue-500" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">
                                  {formatTimestamp(log.timestamp)}
                                </span>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                  log.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 
                                  log.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 
                                  'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                                }`}>
                                  {log.type}
                                </span>
                              </div>
                              <p className="text-sm">{log.message}</p>
                              
                              {log.details && (
                                <details className="mt-1">
                                  <summary className="text-xs cursor-pointer">View details</summary>
                                  <pre className="mt-2 text-xs p-2 bg-black/10 dark:bg-white/5 rounded-md overflow-auto max-h-[150px]">
                                    {JSON.stringify(log.details, null, 2)}
                                  </pre>
                                </details>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="debug">
              <Card>
                <CardHeader>
                  <CardTitle>Debug Information</CardTitle>
                  <CardDescription>Technical details and data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">WordPress API URLs</h3>
                      <pre className="bg-black/10 dark:bg-white/5 p-3 rounded-md overflow-auto text-xs">
                        {`
GET  https://nxtmt.com/wp-json/wp/v2/products?_embed=true
GET  https://nxtmt.com/wp-json/wp/v2/product?_embed=true
POST https://nxtmt.com/wp-json/wp/v2/media
POST https://nxtmt.com/wp-json/wp/v2/product/{id}
                        `}
                      </pre>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Authentication</h3>
                      <p className="text-sm mb-2">Using Basic Auth with WordPress application password:</p>
                      <pre className="bg-black/10 dark:bg-white/5 p-3 rounded-md overflow-auto text-xs">
                        {`
Username: ${process.env.NODE_ENV === 'production' ? '[Redacted in production]' : 'josh@nextmountain.dev'}
Password: ${process.env.NODE_ENV === 'production' ? '[Redacted in production]' : '[Application Password Hidden]'}
                        `}
                      </pre>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Raw Product Data</h3>
                      {selectedProduct ? (
                        <pre className="bg-black/10 dark:bg-white/5 p-3 rounded-md overflow-auto text-xs max-h-[300px]">
                          {JSON.stringify(selectedProduct, null, 2)}
                        </pre>
                      ) : (
                        <p className="text-sm text-muted-foreground">Select a product to view raw data</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductApiTester;