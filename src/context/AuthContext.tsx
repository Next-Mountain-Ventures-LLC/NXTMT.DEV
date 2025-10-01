import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  LoginCredentials, 
  SignupData,
  loginUser, 
  registerUser, 
  logoutUser, 
  getCurrentUser,
  validateToken
} from '../utils/wordpressAuth';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing authentication on component mount
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('wordpressUser');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as UserProfile;
          
          // Validate the stored token
          const isValid = await validateToken(parsedUser.token);
          
          if (isValid) {
            // Get fresh user data
            const currentUser = await getCurrentUser(parsedUser.token);
            if (currentUser) {
              setUser(currentUser);
            } else {
              // Token is valid but user fetch failed, clear storage
              localStorage.removeItem('wordpressUser');
            }
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('wordpressUser');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const loggedInUser = await loginUser(credentials);
      setUser(loggedInUser);
      
      // Store user data in localStorage
      localStorage.setItem('wordpressUser', JSON.stringify(loggedInUser));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred during login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newUser = await registerUser(userData);
      setUser(newUser);
      
      // Store user data in localStorage
      localStorage.setItem('wordpressUser', JSON.stringify(newUser));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred during signup');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('wordpressUser');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;