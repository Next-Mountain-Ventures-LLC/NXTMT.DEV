/**
 * WordPress Authentication Utilities
 * Handles API calls to the WordPress JSON USER API for authentication
 */

// Define base API URL
const API_BASE = 'https://nxtmt.com/api';

// WordPress API endpoints specific to nxtmt.com based on the provided screenshot
const API_ENDPOINTS = {
  // User API endpoints
  login: [
    '/users/login'
  ],
  logout: [
    '/users/logout'
  ],
  register: [
    '/users/create_user'
  ],
  me: [
    '/users/is_user_logged_in', 
    '/users/get_userdata'
  ],
  validate: [
    '/users/validate_auth_cookie'
  ],
  update: [
    '/users/update_user'
  ],
  meta: [
    '/users/get_user_meta',
    '/users/add_user_meta',
    '/users/update_user_meta',
    '/users/delete_user_meta'
  ],
  delete: [
    '/users/delete_user'
  ],
  info: [
    '/users/get_userinfo'
  ],
  current: [
    '/users/get_currentuserinfo'
  ]
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
    // Format request body according to nxtmt.com API requirements
    const requestBody = {
      username: credentials.username,
      password: credentials.password,
      remember: true
    };
    
    const response = await tryEndpoints(API_ENDPOINTS.login, 'POST', requestBody);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const responseData = await response.json();
    
    // Handle possible response formats from nxtmt.com API
    const userData = responseData.user || responseData.data || responseData;
    
    return {
      id: userData.id || userData.ID || 0,
      username: userData.username || userData.user_login || '',
      email: userData.email || userData.user_email || '',
      firstName: userData.first_name || userData.user_firstname || '',
      lastName: userData.last_name || userData.user_lastname || '',
      avatar: userData.avatar || userData.user_avatar || '',
      roles: userData.roles || [],
      token: userData.token || responseData.token || token,
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
    // Format request body according to nxtmt.com API requirements
    const requestBody = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      first_name: userData.firstName || '',
      last_name: userData.lastName || '',
      send_welcome_email: true
    };
    
    const response = await tryEndpoints(API_ENDPOINTS.register, 'POST', requestBody);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const responseData = await response.json();
    
    // Handle possible response formats from nxtmt.com API
    const userData = responseData.user || responseData.data || responseData;
    
    return {
      id: userData.id || userData.ID || 0,
      username: userData.username || userData.user_login || '',
      email: userData.email || userData.user_email || '',
      firstName: userData.first_name || userData.user_firstname || '',
      lastName: userData.last_name || userData.user_lastname || '',
      avatar: userData.avatar || userData.user_avatar || '',
      roles: userData.roles || [],
      token: userData.token || responseData.token || '',
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
    // For nxtmt.com, we need to send the token in the body for user data retrieval
    const requestBody = {
      token: token
    };
    
    const response = await tryEndpoints(API_ENDPOINTS.me, 'POST', requestBody);

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
    const requestBody = {
      user_id: userId,
      email: profileData.email,
      first_name: profileData.firstName,
      last_name: profileData.lastName,
      token: token
    };
    
    const response = await tryEndpoints(API_ENDPOINTS.update, 'POST', requestBody, token);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Profile update failed');
    }

    const responseData = await response.json();
    
    // Handle possible response formats from nxtmt.com API
    const userData = responseData.user || responseData.data || responseData;
    
    return {
      id: userData.id || userData.ID || 0,
      username: userData.username || userData.user_login || '',
      email: userData.email || userData.user_email || '',
      firstName: userData.first_name || userData.user_firstname || '',
      lastName: userData.last_name || userData.user_lastname || '',
      avatar: userData.avatar || userData.user_avatar || '',
      roles: userData.roles || [],
      token: userData.token || responseData.token || token,
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
    // Try to use the dedicated token validation endpoint
    try {
      const response = await tryEndpoints(API_ENDPOINTS.validate, 'POST', { token });
      return response.ok;
    } catch {
      // Fallback to getting user data to validate token
      try {
        const userData = await getCurrentUser(token);
        return !!userData;
      } catch {
        return false;
      }
    }
    
    // Old implementation for reference:
    /*
    const response = await fetch(`${API_BASE}/users/validate_token`, {
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