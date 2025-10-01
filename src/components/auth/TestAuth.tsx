import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * TestAuth component - Used to test direct WordPress API communication
 * This component bypasses the AuthContext to directly test API endpoints
 */
const TestAuth: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const API_BASE_URL = 'https://nxtmt.com/api';

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
    setResult('Testing WordPress login API for nxtmt.com...');
    
    try {
      // Try endpoints based on the WordPress API screenshot
      const testEndpoints = [
        '/users/login',
        '/users/logout',
        '/users/is_user_logged_in',
        '/users/create_user',
        '/users/add_user_meta',
        '/users/update_user',
        '/users/update_user_meta',
        '/users/delete_user',
        '/users/delete_user_meta',
        '/users/get_userdata',
        '/users/get_user_meta',
        '/users/get_userinfo',
        '/users/get_currentuserinfo',
        '/users/validate_auth_cookie'
      ];
      
      // Test credential (never use in production)
      const testCreds = {
        username: 'test_user',
        password: 'test_password',
        remember: true
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
  
  // Test direct create user endpoint
  const testCreateUser = async () => {
    setIsLoading(true);
    setResult('Testing direct create_user endpoint...');
    
    try {
      // Test user data (never use in production)
      const testUser = {
        username: 'test_user_' + Date.now().toString().slice(-4),
        email: `test${Date.now().toString().slice(-4)}@example.com`,
        password: 'Test@password123',
        first_name: 'Test',
        last_name: 'User',
        send_welcome_email: false
      };
      
      const response = await fetch(`${API_BASE_URL}/users/create_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testUser),
      });
      
      let resultText = `Status: ${response.status}\n`;
      
      // Try to parse response as JSON
      try {
        const data = await response.json();
        resultText += `Response: ${JSON.stringify(data, null, 2)}`;
      } catch {
        const text = await response.text();
        resultText += `Response Text: ${text}`;
      }
      
      setResult(resultText);
    } catch (error) {
      setResult(`Error testing create_user: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="border border-white/10 p-4 rounded-lg bg-black/30 max-w-3xl mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">NXTMT API Test</h2>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
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
            Test All Endpoints
          </Button>
          
          <Button 
            onClick={testCreateUser}
            disabled={isLoading}
            variant="outline"
          >
            Test Create User
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