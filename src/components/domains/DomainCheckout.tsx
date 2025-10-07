import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Trash, ShoppingCart, CreditCard, Loader2 } from 'lucide-react';
import { redirectToCheckout } from '@/utils/stripe-client';

interface DomainCheckoutProps {
  selectedDomains: Array<{
    name: string;
    extension: string;
    price: number;
    domain: string;
  }>;
  onRemoveDomain: (domain: string) => void;
  onClose: () => void;
}

const DomainCheckout: React.FC<DomainCheckoutProps> = ({ 
  selectedDomains, 
  onRemoveDomain,
  onClose
}) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate totals
  const subtotal = selectedDomains.reduce((sum, domain) => sum + domain.price, 0);
  const tax = 0; // Would be calculated based on location in a real implementation
  const total = subtotal + tax;
  
  const handleCheckout = async () => {
    // Validate email
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Make sure there are domains to purchase
    if (selectedDomains.length === 0) {
      setError('Please select at least one domain to purchase');
      return;
    }
    
    setError(null);
    setIsProcessing(true);
    
    try {
      // Format domains for checkout
      const domains = selectedDomains.map(d => ({
        name: d.domain,
        price: d.price
      }));
      
      // Redirect to Stripe checkout
      const result = await redirectToCheckout(domains, email);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to process checkout');
      }
      
      // NOTE: On success, the page will redirect to Stripe Checkout
      // so we won't actually reach this point
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process checkout');
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Domain Checkout</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ✕
        </Button>
      </div>
      
      {selectedDomains.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-4">Add domains to your cart to proceed with checkout</p>
          <Button onClick={onClose}>Continue Shopping</Button>
        </div>
      ) : (
        <>
          {/* Domain List */}
          <div className="border rounded-md mb-6">
            <div className="flex items-center p-3 bg-gray-50 border-b">
              <span className="font-medium flex-grow">Domain Name</span>
              <span className="font-medium w-24 text-right">Price</span>
              <span className="w-10"></span>
            </div>
            
            <div className="divide-y">
              {selectedDomains.map((domain) => (
                <div key={domain.domain} className="flex items-center p-3">
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>{domain.name}<span className="font-bold">{domain.extension}</span></span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      1 Year Registration • Free Privacy Protection
                    </div>
                  </div>
                  
                  <span className="w-24 font-medium text-right">
                    ${domain.price.toFixed(2)}
                  </span>
                  
                  <button 
                    onClick={() => onRemoveDomain(domain.domain)}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-md p-4 mb-6">
            <h3 className="text-lg font-medium mb-3">Order Summary</h3>
            
            <div className="space-y-2 mb-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2"
              required
            />
            <p className="text-xs text-gray-500">
              Order confirmation and domain management details will be sent to this email
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}
          
          {/* Checkout Button */}
          <Button
            onClick={handleCheckout}
            className="w-full py-6 text-lg"
            disabled={isProcessing || selectedDomains.length === 0}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Complete Purchase
              </>
            )}
          </Button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            By completing your purchase, you agree to our Terms of Service and Privacy Policy.
          </p>
        </>
      )}
    </div>
  );
};

export default DomainCheckout;