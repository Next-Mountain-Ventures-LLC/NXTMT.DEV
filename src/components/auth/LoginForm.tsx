import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Mail, Key } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { login, isLoading, error, clearError } = useAuth();

  useEffect(() => {
    // Reset form state when the component mounts
    clearError();
    setIsSubmitted(false);
  }, [clearError]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsSubmitted(true);
    
    if (!email || !password) {
      return;
    }

    console.log('Login form submitting with:', { email });
    try {
      // Pass email as username since the API supports both formats
      await login({ username: email, password });
      console.log('Login form submission completed');
    } catch (error) {
      console.error('Login form submission error:', error);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-background border border-white/10 rounded-lg shadow-lg backdrop-blur-sm">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
        <p className="text-gray-400 text-sm">Access your account and member benefits</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center text-white">
          <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} data-form-type="utility">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200 block text-sm">
              Email Address
            </Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-black/30 border-white/20 placeholder:text-gray-500 pl-10"
                disabled={isLoading}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            {isSubmitted && !email && (
              <p className="text-red-500 text-xs mt-1">Email is required</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-gray-200 block text-sm">
                Password
              </Label>
              <a href="/reset-password" className="text-primary/80 hover:text-primary text-xs transition">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full bg-black/30 border-white/20 placeholder:text-gray-500 pl-10"
                disabled={isLoading}
              />
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            {isSubmitted && !password && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{' '}
        <a href="/signup" className="text-primary/80 hover:text-primary font-medium transition">
          Sign Up
        </a>
      </div>
      
      <div className="mt-4 border-t border-white/10 pt-4 text-xs text-center text-gray-500">
        <p>Using WordPress authentication</p>
      </div>
    </div>
  );
};

export default LoginForm;