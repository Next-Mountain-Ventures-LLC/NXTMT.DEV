import React, { useState } from 'react';
import { Search, ArrowRight, Check, AlertCircle, Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { 
  simulateCheckDomainAvailability,
  POPULAR_TLDS
} from '@/utils/namecheap';

// Define domain availability interface locally
interface DomainAvailability {
  domain: string;
  available: boolean;
  errorMessage?: string;
  price?: number;
}

// Define popular TLDs
const POPULAR_EXTENSIONS = ['.com', '.net', '.org'];

interface DomainResult {
  domain: string;
  name: string;
  extension: string;
  available: boolean;
  price: number;
  popular: boolean;
  errorMessage?: string;
}

const DomainSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Track whether we're searching for all TLDs
  const [searchAllTlds, setSearchAllTlds] = useState(true);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a domain name to search');
      return;
    }

    setError(null);
    setIsSearching(true);
    setSearchPerformed(false);
    
    try {
      // Clean the domain name (remove spaces, special characters, etc)
      const cleanDomainName = searchQuery.trim().toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      if (!cleanDomainName) {
        setError('Please enter a valid domain name');
        setIsSearching(false);
        return;
      }

      // Use our Namecheap API utility (simulation for now)
      const apiResults = await simulateCheckDomainAvailability([cleanDomainName], searchAllTlds);
      
      // Transform API results to our component's format
      const transformedResults = apiResults.map((result: DomainAvailability): DomainResult => {
        const domain = result.domain;
        const lastDotIndex = domain.lastIndexOf('.');
        const name = domain.substring(0, lastDotIndex);
        const extension = domain.substring(lastDotIndex);
        
        return {
          domain,
          name,
          extension,
          available: result.available,
          price: result.price || 19.99,
          popular: POPULAR_EXTENSIONS.includes(extension),
          errorMessage: result.errorMessage
        };
      });

      // Sort results: available first, then popular TLDs, then alphabetically
      transformedResults.sort((a, b) => {
        // Available domains first
        if (a.available !== b.available) return a.available ? -1 : 1;
        
        // Popular domains next
        if (a.popular !== b.popular) return a.popular ? -1 : 1;
        
        // .com, .net, .org in that order
        if (POPULAR_EXTENSIONS.includes(a.extension) && POPULAR_EXTENSIONS.includes(b.extension)) {
          return POPULAR_EXTENSIONS.indexOf(a.extension) - POPULAR_EXTENSIONS.indexOf(b.extension);
        }
        
        // Alphabetical order for the rest
        return a.extension.localeCompare(b.extension);
      });

      setResults(transformedResults);
      setSearchPerformed(true);
    } catch (err) {
      console.error('Domain search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching for domains');
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddToCart = (domain: DomainResult) => {
    // In a real implementation, this would add the domain to a shopping cart
    alert(`Added ${domain.name}${domain.extension} to cart for $${domain.price}/year`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              className="pl-10 py-6 text-lg"
              type="text"
              placeholder="Search for your perfect domain name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            type="submit" 
            size="lg" 
            disabled={isSearching}
            className="bg-primary hover:bg-primary/90 text-white py-6 px-8"
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                Search
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-4 flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={searchAllTlds}
              onChange={() => setSearchAllTlds(!searchAllTlds)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            <span className="ml-3 text-sm font-medium">
              Search all available domain extensions
            </span>
          </label>
          <div className="ml-2 text-muted-foreground text-xs">
            <Globe className="h-3 w-3 inline-block mr-1" />
            {searchAllTlds 
              ? `Includes all ${POPULAR_TLDS.length} popular domain extensions` 
              : "Only searches for the extension you type"}
          </div>
        </div>
        
        {error && (
          <p className="text-red-500 mt-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" /> {error}
          </p>
        )}
      </form>

      {isSearching && (
        <div className="mt-12 text-center py-12">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium">Searching for available domains...</p>
          <p className="text-muted-foreground">Checking {searchAllTlds ? 'multiple extensions' : 'availability'} for "{searchQuery}"</p>
        </div>
      )}

      {searchPerformed && !isSearching && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-display font-bold">Search Results</h2>
            <p className="text-sm text-muted-foreground">
              Found {results.filter(d => d.available).length} available domains
            </p>
          </div>
          
          <div className="grid gap-4">
            {results.map((domain, index) => (
              <Card 
                key={index}
                className={`transition-all duration-200 ${
                  domain.available 
                    ? 'border-green-500/40 hover:border-green-500/70 hover:shadow-md' 
                    : 'border-gray-500/40'
                } ${
                  domain.popular && domain.available 
                    ? 'bg-green-500/5' 
                    : ''
                }`}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
                    <div className="flex items-center space-x-3 mb-3 md:mb-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        domain.available 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {domain.available ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <AlertCircle className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <span className="text-lg font-medium block">
                          {domain.name}
                          <span className="font-bold">{domain.extension}</span>
                          {domain.popular && (
                            <span className={`ml-2 text-xs ${
                              domain.available 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-gray-200 text-gray-500'
                            } px-2 py-1 rounded-full`}>
                              Popular
                            </span>
                          )}
                        </span>
                        {domain.errorMessage && (
                          <p className="text-sm text-red-500">{domain.errorMessage}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end md:space-x-4">
                      <div className="flex flex-col items-end">
                        <span className="text-lg font-bold">
                          ${domain.price}
                        </span>
                        <span className="text-xs text-muted-foreground">/year</span>
                      </div>
                      
                      {domain.available ? (
                        <Button 
                          onClick={() => handleAddToCart(domain)}
                          variant="default" 
                          size="sm"
                          className="ml-4 md:ml-0"
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled 
                          className="ml-4 md:ml-0"
                        >
                          Unavailable
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {results.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-2 flex items-center">
                <Globe className="h-5 w-5 mr-2" /> Domain Registration Information
              </h3>
              <ul className="text-sm text-blue-700 space-y-1 ml-7 list-disc">
                <li>Domain availability is checked in real-time and may change.</li>
                <li>Prices shown are for the first year of registration.</li>
                <li>All domains come with free WHOIS privacy and DNS management.</li>
                <li>Registration is instant and domains are active within minutes.</li>
              </ul>
            </div>
          )}
          
          {results.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-orange-500" />
              <h3 className="text-xl font-bold mb-2">No Results Found</h3>
              <p className="text-muted-foreground">
                We couldn't find any domains matching your search. Please try a different name or contact our support team for assistance.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DomainSearch;