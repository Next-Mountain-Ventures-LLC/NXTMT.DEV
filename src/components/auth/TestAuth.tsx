import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * TestAuth component - Used to test direct WordPress API communication
 * This component bypasses the AuthContext to directly test API endpoints
 */
const TestAuth: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const API_BASE_URL = 'https://nxtmt.com/api';  // Base API URL
  
  // Display component mounted message on load
  useEffect(() => {
    console.log('TestAuth component mounted');
    setResult('TestAuth component mounted. Click a button to run tests.');
  }, []);

  // Test function to check if the API is reachable
  const testApiConnection = async () => {
    setIsLoading(true);
    setResult('Testing API connection...');
    console.log('Testing API connection to', API_BASE_URL);
    
    try {
      // Try to fetch from the base API URL
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Origin': window.location.origin,
        },
        mode: 'cors',
      });
      
      const status = response.status;
      console.log('API connection response status:', status);
      
      let responseText;
      try {
        const json = await response.json();
        responseText = JSON.stringify(json, null, 2);
      } catch (e) {
        const text = await response.text();
        responseText = text.substring(0, 500) + (text.length > 500 ? '...' : '');
      }
      
      setResult(`API responded with status: ${status}\nResponse:\n${responseText}`);
    } catch (error) {
      console.error('API connection error:', error);
      setResult(`Error connecting to API: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Test WordPress login API
  const testLogin = async () => {
    setIsLoading(true);
    setResult('Testing WordPress login API for nxtmt.com...');
    console.log('Starting API endpoints test');
    
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
          console.log(`Testing endpoint: ${endpoint}`);
          results += `Testing endpoint: ${endpoint}\n`;
          
          const url = `${API_BASE_URL}${endpoint}`;
          console.log(`Request URL: ${url}`);
          
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/plain, */*',
              'Origin': window.location.origin,
            },
            body: JSON.stringify(testCreds),
            mode: 'cors',
            credentials: 'include',
          });
          
          console.log(`${endpoint} status:`, response.status);
          results += `Status: ${response.status}\n`;
          
          // Try to parse response as JSON
          try {
            const data = await response.json();
            const dataStr = JSON.stringify(data, null, 2);
            console.log(`${endpoint} response:`, data);
            results += `Response: ${dataStr.substring(0, 150)}${dataStr.length > 150 ? '...' : ''}\n\n`;
          } catch (parseError) {
            console.log(`${endpoint} not JSON, reading text`);
            const text = await response.text();
            console.log(`${endpoint} text response:`, text.substring(0, 100));
            results += `Response (text): ${text.substring(0, 150)}${text.length > 150 ? '...' : ''}\n\n`;
          }
        } catch (err) {
          console.error(`${endpoint} error:`, err);
          results += `Error: ${err instanceof Error ? err.message : String(err)}\n\n`;
        }
      }
      
      setResult(results);
    } catch (error) {
      console.error('Test login error:', error);
      setResult(`Error testing login API: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Test direct create user endpoint
  const testCreateUser = async () => {
    setIsLoading(true);
    setResult('Testing direct create_user endpoint...');
    console.log('Testing create_user endpoint');
    
    try {
      // Test user data (never use in production)
      const uniqueSuffix = Date.now().toString().slice(-4);
      const testUser = {
        username: 'test_user_' + uniqueSuffix,
        email: `test${uniqueSuffix}@example.com`,
        password: 'Test@password123',
        first_name: 'Test',
        last_name: 'User',
        send_welcome_email: false,
        nonce: 'test_nonce'  // Many WordPress APIs require nonces
      };
      
      console.log('Test user data:', { ...testUser, password: '[REDACTED]' });
      
      const url = `${API_BASE_URL}/users/create_user`;
      console.log('Making request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Origin': window.location.origin,
        },
        body: JSON.stringify(testUser),
        mode: 'cors',
        credentials: 'include',
      });
      
      console.log('create_user status:', response.status);
      let resultText = `Status: ${response.status}\n`;
      resultText += `Request URL: ${url}\n`;
      resultText += `Request Data: ${JSON.stringify({...testUser, password: '[REDACTED]'}, null, 2)}\n\n`;
      
      // Try to parse response as JSON
      try {
        const data = await response.json();
        console.log('create_user response:', data);
        resultText += `Response (JSON):\n${JSON.stringify(data, null, 2)}`;
      } catch (parseError) {
        console.log('create_user response not JSON, reading text');
        const text = await response.text();
        console.log('create_user text response:', text.substring(0, 200));
        resultText += `Response (Text):\n${text}`;
      }
      
      setResult(resultText);
    } catch (error) {
      console.error('create_user error:', error);
      setResult(`Error testing create_user: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="border border-white/10 p-4 rounded-lg bg-black/30 max-w-3xl mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">NXTMT API Test</h2>
      <p className="text-sm text-gray-400 mb-4">
        Testing WordPress API endpoints at: <code className="bg-black/50 px-2 py-1 rounded">{API_BASE_URL}</code>
      </p>
      
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
          <pre className="bg-black/50 p-4 rounded overflow-auto max-h-80 text-xs whitespace-pre-wrap">
            {result || 'No tests run yet'}
          </pre>
          
          {isLoading && (
            <div className="mt-4 text-center text-sm text-yellow-400">
              Running tests... Please check browser console for detailed logs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestAuth;