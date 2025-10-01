import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    agreeTerms: false
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { signup, isLoading, error, clearError } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Check password match when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      const otherField = name === 'password' ? 'confirmPassword' : 'password';
      setPasswordMatch(value === formData[otherField as keyof typeof formData] || value === '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    // Validation checks
    if (!formData.agreeTerms) {
      // You can handle this error in the UI
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
    } catch (error) {
      // Error is already handled in the context
      console.error('Signup error in component:', error);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-background border border-white/10 rounded-lg shadow-lg backdrop-blur-sm">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-gray-400 text-sm">Join our community and access exclusive features</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center text-white">
          <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} data-form-type="utility">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-200 block text-sm">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full bg-black/30 border-white/20 placeholder:text-gray-500"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-200 block text-sm">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full bg-black/30 border-white/20 placeholder:text-gray-500"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-200 block text-sm">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="w-full bg-black/30 border-white/20 placeholder:text-gray-500"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200 block text-sm">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full bg-black/30 border-white/20 placeholder:text-gray-500"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200 block text-sm">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={`w-full bg-black/30 border-white/20 placeholder:text-gray-500 ${!passwordMatch ? 'border-red-500' : ''}`}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-200 block text-sm">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full bg-black/30 border-white/20 placeholder:text-gray-500 ${!passwordMatch ? 'border-red-500' : ''}`}
              disabled={isLoading}
            />
            {!passwordMatch && (
              <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
            )}
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              id="agreeTerms" 
              name="agreeTerms" 
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => {
                setFormData(prev => ({
                  ...prev,
                  agreeTerms: checked === true
                }));
              }}
              className="mt-1"
            />
            <Label htmlFor="agreeTerms" className="text-gray-300 text-xs">
              I agree to the <a href="/terms" className="text-primary/80 hover:text-primary">Terms of Service</a> and <a href="/privacy" className="text-primary/80 hover:text-primary">Privacy Policy</a>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading || !formData.agreeTerms || !passwordMatch}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{' '}
        <a href="/login" className="text-primary/80 hover:text-primary font-medium transition">
          Sign In
        </a>
      </div>
    </div>
  );
};

export default SignupForm;