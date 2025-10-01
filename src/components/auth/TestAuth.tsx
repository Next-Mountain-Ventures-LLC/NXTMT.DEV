import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * TestAuth component - Used to test direct WordPress API communication
 * This component bypasses the AuthContext to directly test API endpoints
 */
const TestAuth: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const API_BASE_URL = 'https://www.nxtmt.com/api';

  // Test function to check if the API is reachable
  const testApiConnection = async () => {
    setIsLoading(true);
    setResult('Testing API connection...');
    
    try {
      // Try to fetch from the base API URL
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
      });
      
      const status = response.status;
      const text = await response.text();
      const shortText = text.substring(0, 200) + (text.length > 200 ? '...' : '');
      
      setResult(`API responded with status: ${status}\nResponse (truncated): ${shortText}`);
    } catch (error) {
      setResult(`Error connecting to API: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Test WordPress login API
  const testLogin = async () => {
    setIsLoading(true);
    setResult('Testing WordPress login API...');
    
    try {
      // Try different endpoint paths to find the correct one
      const testEndpoints = [
        '/user/v1/auth',
        '/wp-json/jwt-auth/v1/token',
        '/wp-json/api/v1/token',
        '/wp-json/simple-jwt-login/v1/auth'
      ];
      
      // Test credential (never use in production)
      const testCreds = {
        username: 'test_user',
        password: 'test_password'
      };
      
      let results = '';
      
      for (const endpoint of testEndpoints) {
        try {
          results += `Testing endpoint: ${endpoint}\n`;
          
          const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(testCreds),
          });
          
          results += `Status: ${response.status}\n`;
          
          // Try to parse response as JSON
          try {
            const data = await response.json();
            results += `Response: ${JSON.stringify(data).substring(0, 100)}...\n\n`;
          } catch {
            const text = await response.text();
            results += `Response: ${text.substring(0, 100)}...\n\n`;
          }
        } catch (err) {
          results += `Error: ${err instanceof Error ? err.message : String(err)}\n\n`;
        }
      }
      
      setResult(results);
    } catch (error) {
      setResult(`Error testing login API: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="border border-white/10 p-4 rounded-lg bg-black/30 max-w-3xl mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">WordPress API Test</h2>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button 
            onClick={testApiConnection}
            disabled={isLoading}
          >
            Test API Connection
          </Button>
          
          <Button 
            onClick={testLogin}
            disabled={isLoading}
            variant="secondary"
          >
            Test Login Endpoints
          </Button>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Test Results:</h3>
          <pre className="bg-black/50 p-4 rounded overflow-auto max-h-60 text-xs">
            {result || 'No tests run yet'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default TestAuth;