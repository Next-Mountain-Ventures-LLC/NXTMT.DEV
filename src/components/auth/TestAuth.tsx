import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * TestAuth component - Used to test direct WordPress API communication
 * This component bypasses the AuthContext to directly test API endpoints
 */
const TestAuth: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const API_BASE_URL = 'https://nxtmt.com/wp-json';  // Base API URL for WordPress REST API
  
  // WordPress application password credentials
  const WP_USERNAME = 'admin'; // This should be the WordPress username
  const WP_APP_PASSWORD = 'zfOH QAHW dWVP QE0j z2c8 s2Os'; // Application password provided
  
  // Create base64 encoded authentication string for HTTP Basic Auth
  const getAuthHeader = () => {
    const credentials = `${WP_USERNAME}:${WP_APP_PASSWORD}`;
    const encodedCredentials = btoa(credentials);
    return `Basic ${encodedCredentials}`;
  };
  
  // Display component mounted message on load
  useEffect(() => {
    console.log('TestAuth component mounted');
    setResult('TestAuth component mounted. Click a button to run tests.');
  }, []);

  // Test authenticated API connection
  const testAuthenticatedApiConnection = async () => {
    setIsLoading(true);
    setResult('Testing authenticated WordPress REST API connection...');
    console.log('Testing authenticated connection to', API_BASE_URL);
    
    try {
      const authHeader = getAuthHeader();
      console.log('Using authentication header (credentials hidden)');
      
      // Try to fetch from the WordPress REST API with authentication
      const response = await fetch(`${API_BASE_URL}/wp/v2/users/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': authHeader,
          'Origin': window.location.origin,
        },
        mode: 'cors',
        credentials: 'include',
      });
      
      const status = response.status;
      console.log('Authenticated API response status:', status);
      
      let responseText;
      try {
        const json = await response.json();
        responseText = JSON.stringify(json, null, 2);
        console.log('Authenticated API response:', json);
      } catch (e) {
        const text = await response.text();
        responseText = text.substring(0, 500) + (text.length > 500 ? '...' : '');
        console.log('Authenticated API text response:', responseText);
      }
      
      setResult(`Authenticated API responded with status: ${status}\nEndpoint: ${API_BASE_URL}/wp/v2/users/me\nResponse:\n${responseText}`);
    } catch (error) {
      console.error('Authenticated API connection error:', error);
      setResult(`Error connecting to authenticated API: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
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
      // Try WordPress REST API standard endpoints and custom endpoints
      const testEndpoints = [
        // Core WP REST API endpoints
        '/wp/v2/users',
        '/wp/v2/users/me',
        
        // WP JSON User API endpoints from the screenshot
        '/json-user-api/v1/users/login',
        '/json-user-api/v1/users/logout',
        '/json-user-api/v1/users/is_user_logged_in',
        '/json-user-api/v1/users/create_user',
        '/json-user-api/v1/users/add_user_meta',
        '/json-user-api/v1/users/update_user',
        '/json-user-api/v1/users/update_user_meta',
        '/json-user-api/v1/users/delete_user',
        '/json-user-api/v1/users/delete_user_meta',
        '/json-user-api/v1/users/get_userdata',
        '/json-user-api/v1/users/get_user_meta',
        '/json-user-api/v1/users/get_userinfo',
        '/json-user-api/v1/users/get_currentuserinfo',
        '/json-user-api/v1/users/validate_auth_cookie',
        
        // Try direct API endpoints as shown in screenshot
        '/api/users/login',
        '/api/users/create_user'
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
          
          // Use authentication for WP REST API endpoints
          const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
            'Origin': window.location.origin,
          };
          
          // Add authentication header for WordPress REST API endpoints
          if (endpoint.startsWith('/wp/v2/')) {
            headers['Authorization'] = getAuthHeader();
            console.log('Using authentication for WordPress REST API endpoint');
          }
          
          const response = await fetch(url, {
            method: endpoint.startsWith('/wp/v2/') ? 'GET' : 'POST',
            headers,
            body: endpoint.startsWith('/wp/v2/') ? undefined : JSON.stringify(testCreds),
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
      
      // Try multiple possible URL patterns for user creation
      const urls = [
        `${API_BASE_URL}/wp/v2/users`,                   // Core WP API
        `${API_BASE_URL}/json-user-api/v1/users/create_user`,  // Custom namespaced API
        'https://nxtmt.com/api/users/create_user'             // Direct API
      ];
      
      let url = urls[0]; // Default to first URL
      let finalResult = '';
      
      for (const testUrl of urls) {
        try {
          console.log(`Trying URL: ${testUrl}`);
          finalResult += `Testing URL: ${testUrl}\n`;
          
          // Use authentication for WP REST API endpoints
          const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*',
            'Origin': window.location.origin,
          };
          
          // Add authentication header for WordPress REST API endpoints
          if (testUrl.includes('/wp/v2/')) {
            headers['Authorization'] = getAuthHeader();
            console.log('Using authentication for WordPress REST API endpoint');
          }
          
          const response = await fetch(testUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(testUser),
            mode: 'cors',
            credentials: 'include',
          });
          
          console.log(`${testUrl} status:`, response.status);
          finalResult += `Status: ${response.status}\n`;
          
          // Try to parse response as JSON
          try {
            const data = await response.json();
            console.log(`${testUrl} response:`, data);
            finalResult += `Response: ${JSON.stringify(data, null, 2)}\n\n`;
            
            if (response.ok) {
              // We found a working URL, store it for reference
              url = testUrl;
              break;
            }
          } catch (parseError) {
            console.log(`${testUrl} response not JSON, reading text`);
            const text = await response.text();
            console.log(`${testUrl} text response:`, text.substring(0, 200));
            finalResult += `Response (text): ${text.substring(0, 200)}${text.length > 200 ? '...' : ''}\n\n`;
          }
        } catch (err) {
          console.error(`${testUrl} error:`, err);
          finalResult += `Error with ${testUrl}: ${err instanceof Error ? err.message : String(err)}\n\n`;
        }
      }
      
      // Add a summary of all attempts
      finalResult += `\nSummary: Attempted ${urls.length} different URL patterns for user creation\n`;
      finalResult += `Most likely endpoint URL format: ${url}\n`;
      
      setResult(finalResult);
      return;
    } catch (error) {
      console.error('create_user error:', error);
      setResult(`Error testing create_user: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Test creating a user with authentication
  const testAuthenticatedCreateUser = async () => {
    setIsLoading(true);
    setResult('Testing authenticated user creation...');
    console.log('Testing authenticated user creation');
    
    try {
      // Test user data
      const uniqueSuffix = Date.now().toString().slice(-4);
      const testUser = {
        username: 'test_user_' + uniqueSuffix,
        email: `test${uniqueSuffix}@example.com`,
        password: 'Test@password123',
        name: 'Test User',
        roles: ['subscriber']
      };
      
      console.log('Test user data:', { ...testUser, password: '[REDACTED]' });
      
      // Using the standard WordPress REST API endpoint with authentication
      const url = `${API_BASE_URL}/wp/v2/users`;
      console.log('Making authenticated request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': getAuthHeader(),
          'Origin': window.location.origin,
        },
        body: JSON.stringify(testUser),
        mode: 'cors',
        credentials: 'include',
      });
      
      console.log('Authenticated create user status:', response.status);
      let resultText = `Status: ${response.status}\n`;
      resultText += `Request URL: ${url}\n`;
      resultText += `Request Data: ${JSON.stringify({...testUser, password: '[REDACTED]'}, null, 2)}\n\n`;
      
      // Try to parse response as JSON
      try {
        const data = await response.json();
        console.log('Authenticated create user response:', data);
        resultText += `Response (JSON):\n${JSON.stringify(data, null, 2)}`;
      } catch (parseError) {
        console.log('Response not JSON, reading text');
        const text = await response.text();
        console.log('Text response:', text.substring(0, 200));
        resultText += `Response (Text):\n${text}`;
      }
      
      setResult(resultText);
    } catch (error) {
      console.error('Authenticated create user error:', error);
      setResult(`Error testing authenticated create user: ${error instanceof Error ? error.message : String(error)}`);
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
            onClick={testAuthenticatedApiConnection}
            disabled={isLoading}
            variant="outline"
          >
            Test Auth Connection
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
          
          <Button 
            onClick={testAuthenticatedCreateUser}
            disabled={isLoading}
            variant="default"
            className="bg-green-700 hover:bg-green-800"
          >
            Create User (Auth)
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