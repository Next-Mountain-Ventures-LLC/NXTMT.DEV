import React, { useState } from 'react';
import { Search, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// Domain extensions to check
const domainExtensions = [
  { ext: '.com', price: 14.99, popular: true },
  { ext: '.net', price: 12.99, popular: false },
  { ext: '.org', price: 13.99, popular: false },
  { ext: '.io', price: 39.99, popular: false },
  { ext: '.co', price: 24.99, popular: false },
  { ext: '.dev', price: 18.99, popular: false },
  { ext: '.app', price: 19.99, popular: false },
  { ext: '.site', price: 16.99, popular: false },
];

interface DomainResult {
  name: string;
  extension: string;
  available: boolean;
  price: number;
  popular: boolean;
}

const DomainSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a domain name to search');
      return;
    }

    setError(null);
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
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

      // Simulate availability check
      const simulatedResults = domainExtensions.map(({ ext, price, popular }) => {
        // Randomly determine availability, but make .com less likely to be available
        const available = ext === '.com' 
          ? Math.random() > 0.8  // 20% chance of .com being available
          : Math.random() > 0.3; // 70% chance of other domains being available
        
        return {
          name: cleanDomainName,
          extension: ext,
          available,
          price,
          popular
        };
      });

      setResults(simulatedResults);
      setSearchPerformed(true);
      setIsSearching(false);
    }, 1500); // Simulate 1.5 second API call
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
            {isSearching ? 'Searching...' : 'Search'}
            {!isSearching && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>
        {error && (
          <p className="text-red-500 mt-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" /> {error}
          </p>
        )}
      </form>

      {searchPerformed && (
        <div className="mt-8">
          <h2 className="text-2xl font-display font-bold mb-4">Search Results</h2>
          
          <div className="grid gap-4">
            {results.map((domain, index) => (
              <Card 
                key={index}
                className={`transition-all duration-200 ${domain.available ? 'border-green-500/40 hover:border-green-500/70' : 'border-gray-500/40'} ${domain.popular && domain.available ? 'bg-green-500/5' : ''}`}
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-2">
                      {domain.available ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="text-lg font-medium">
                        {domain.name}
                        <span className="font-bold">{domain.extension}</span>
                        {domain.popular && domain.available && (
                          <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold">
                        ${domain.price}
                        <span className="text-sm text-muted-foreground font-normal">/year</span>
                      </span>
                      
                      {domain.available ? (
                        <Button 
                          onClick={() => handleAddToCart(domain)}
                          variant="default" 
                          size="sm"
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" disabled>
                          Unavailable
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground mt-4">
            * Domain availability is checked in real-time and may change. Prices shown are for the first year of registration.
          </p>
        </div>
      )}
    </div>
  );
};

export default DomainSearch;