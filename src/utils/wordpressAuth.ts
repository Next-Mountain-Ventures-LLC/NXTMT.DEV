/**
 * WordPress Authentication Utilities
 * Handles API calls to the WordPress JSON USER API for authentication
 */

// Define base API URL
const API_BASE = 'https://www.nxtmt.com/api';

// WordPress REST API endpoints may vary depending on plugin implementation
// These are common endpoint paths for different WordPress auth plugins
const API_ENDPOINTS = {
  // JSON USER API
  login: [
    '/user/v1/auth',
    '/wp-json/jwt-auth/v1/token',
    '/wp-json/simple-jwt-login/v1/auth'
  ],
  register: [
    '/user/v1/users/register',
    '/wp-json/wp/v2/users',
    '/wp-json/simple-jwt-login/v1/users'
  ],
  me: [
    '/user/v1/users/me',
    '/wp-json/wp/v2/users/me'
  ],
  // Other endpoints...
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  roles: string[];
  token: string;
}

/**
 * Try multiple API endpoints until one works
 */
async function tryEndpoints(endpoints: string[], method: string, body?: object, token?: string): Promise<Response> {
  console.log(`Trying ${endpoints.length} possible endpoints for ${method} request`);
  
  const errors: string[] = [];
  
  // Try each endpoint until one succeeds
  for (const endpoint of endpoints) {
    try {
      const url = `${API_BASE}${endpoint}`;
      console.log(`Attempting request to: ${url}`);
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
      });
      
      console.log(`Response status from ${endpoint}: ${response.status}`);
      
      // Check if we got a successful response
      if (response.ok) {
        console.log(`Found working endpoint: ${endpoint}`);
        return response;
      }
      
      // Store error for debugging
      const errorText = await response.text();
      errors.push(`${endpoint} (${response.status}): ${errorText.substring(0, 100)}...`);
    } catch (error) {
      errors.push(`${endpoint} (network): ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  // If we get here, all endpoints failed
  console.error('All endpoints failed:', errors);
  throw new Error(`API request failed. Tried ${endpoints.length} endpoints. Errors: ${errors.join(' | ')}`);
}

/**
 * Login a user with WordPress credentials
 */
export const loginUser = async (credentials: LoginCredentials): Promise<UserProfile> => {
  console.log('Attempting login with:', { username: credentials.username, passwordLength: credentials.password.length });
  try {
    const response = await tryEndpoints(API_ENDPOINTS.login, 'POST', credentials);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const userData = await response.json();
    return {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      avatar: userData.avatar,
      roles: userData.roles || [],
      token: userData.token,
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Register a new WordPress user
 */
export const registerUser = async (userData: SignupData): Promise<UserProfile> => {
  console.log('Attempting registration with:', { username: userData.username, email: userData.email });
  try {
    const requestBody = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      first_name: userData.firstName,
      last_name: userData.lastName
    };
    
    const response = await tryEndpoints(API_ENDPOINTS.register, 'POST', requestBody);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const newUser = await response.json();
    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      avatar: newUser.avatar,
      roles: newUser.roles || [],
      token: newUser.token,
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Logout the current user
 */
export const logoutUser = async (): Promise<void> => {
  console.log('Attempting logout');
  try {
    // For logout, we just clear local storage since the WordPress API may not have a standard logout endpoint
    localStorage.removeItem('wordpressUser');
    return;
    
    // Uncomment below to attempt server-side logout if needed
    /*
    const response = await fetch(`${API_BASE}/wp-json/simple-jwt-login/v1/auth/revoke`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    // Clear local storage and cookies related to authentication
    localStorage.removeItem('wordpressUser');
    
    return await response.json();
    */
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Get the current logged in user's profile
 */
export const getCurrentUser = async (token: string): Promise<UserProfile | null> => {
  console.log('Fetching current user data with token');
  try {
    const response = await tryEndpoints(API_ENDPOINTS.me, 'GET', undefined, token);

    if (!response.ok) {
      if (response.status === 401) {
        return null; // User is not authenticated
      }
      throw new Error('Failed to get current user');
    }

    const userData = await response.json();
    return {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name,
      avatar: userData.avatar,
      roles: userData.roles || [],
      token: token,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId: number, profileData: Partial<UserProfile>, token: string): Promise<UserProfile> => {
  console.log('Updating user profile:', profileData);
  try {
    // For now, we'll use a direct fetch since we don't have this endpoint in our API_ENDPOINTS
    const response = await fetch(`${API_BASE}/user/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: profileData.email,
        first_name: profileData.firstName,
        last_name: profileData.lastName,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Profile update failed');
    }

    const updatedUser = await response.json();
    return {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      firstName: updatedUser.first_name,
      lastName: updatedUser.last_name,
      avatar: updatedUser.avatar,
      roles: updatedUser.roles || [],
      token: token,
    };
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

/**
 * Validate authentication token
 */
export const validateToken = async (token: string): Promise<boolean> => {
  console.log('Validating token');
  try {
    // Use the /me endpoint to validate the token
    // If we can get the user info, the token is valid
    try {
      const userData = await getCurrentUser(token);
      return !!userData;
    } catch {
      return false;
    }
    
    // Alternate implementation that could be used instead:
    /*
    const response = await fetch(`${API_BASE}/wp-json/jwt-auth/v1/token/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.ok;
    */
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};