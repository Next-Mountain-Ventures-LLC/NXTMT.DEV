import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!username || !password) {
      return;
    }

    await login({ username, password });
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
            <Label htmlFor="username" className="text-gray-200 block text-sm">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full bg-black/30 border-white/20 placeholder:text-gray-500"
              disabled={isLoading}
            />
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
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-black/30 border-white/20 placeholder:text-gray-500"
              disabled={isLoading}
            />
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
    </div>
  );
};

export default LoginForm;