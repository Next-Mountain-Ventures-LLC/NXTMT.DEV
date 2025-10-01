/**
 * WordPress Authentication Utilities
 * Handles API calls to the WordPress JSON USER API for authentication
 */

const API_URL = 'https://www.nxtmt.com/api';

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
 * Login a user with WordPress credentials
 */
export const loginUser = async (credentials: LoginCredentials): Promise<UserProfile> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });

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
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
      }),
    });

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
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    // Clear local storage and cookies related to authentication
    localStorage.removeItem('wordpressUser');
    
    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Get the current logged in user's profile
 */
export const getCurrentUser = async (token: string): Promise<UserProfile | null> => {
  try {
    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

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
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
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
  try {
    const response = await fetch(`${API_URL}/validate-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};