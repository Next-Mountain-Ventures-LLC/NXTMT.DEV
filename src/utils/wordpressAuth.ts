/**
 * WordPress API Authentication Credentials
 * Contains the authentication credentials and helper function for WordPress API
 * 
 * Note: User authentication functionality has been removed but application password
 * is preserved for potential WordPress API operations that require authentication.
 */

// Define base API URL
export const API_BASE = 'https://nxtmt.com/wp-json';

// WordPress application password credentials
export const WP_USERNAME = 'josh@nextmountain.dev';
export const WP_APP_PASSWORD = 'zfOH QAHW dWVP QE0j z2c8 s2Os';

// Create base64 encoded authentication string for HTTP Basic Auth
export const getAuthHeader = () => {
  const credentials = `${WP_USERNAME}:${WP_APP_PASSWORD}`;
  const encodedCredentials = btoa(credentials);
  return `Basic ${encodedCredentials}`;
};

// All user authentication functionality has been removed as requested
// Only keeping the authentication credentials and getAuthHeader function
// for WordPress API operations that might require authentication