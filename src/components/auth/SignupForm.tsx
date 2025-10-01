import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Mail, User, Key } from 'lucide-react';
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { signup, isLoading, error, clearError } = useAuth();
  
  useEffect(() => {
    // Reset form state when the component mounts
    clearError();
    setIsSubmitted(false);
  }, [clearError]);

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
    setIsSubmitted(true);
    
    console.log('Signup form submitting with data:', {
      username: formData.username, 
      email: formData.email,
      passwordLength: formData.password?.length || 0,
      confirmPasswordLength: formData.confirmPassword?.length || 0,
      hasFirstName: !!formData.firstName,
      hasLastName: !!formData.lastName,
      agreeTerms: formData.agreeTerms
    });
    
    // Validation checks
    if (!formData.agreeTerms) {
      console.warn('User must agree to terms');
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      console.warn('Passwords do not match');
      setPasswordMatch(false);
      setError('Passwords do not match');
      return;
    }
    
    // If any required fields are missing, don't proceed
    if (!formData.email || !formData.password || !formData.username) {
      console.warn('Required fields missing:', {
        hasEmail: !!formData.email,
        hasPassword: !!formData.password,
        hasUsername: !!formData.username
      });
      setError('Please fill in all required fields');
      return;
    }

    try {
      console.log('Attempting signup with:', { 
        username: formData.username, 
        email: formData.email,
        hasFirstName: !!formData.firstName,
        hasLastName: !!formData.lastName 
      });
      
      const result = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      
      console.log('Signup form submission completed with result:', result);
      
      // Provide success feedback
      alert('Account created successfully! You are now logged in.');
      
      // Optionally redirect to a welcome or dashboard page
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
      
    } catch (error) {
      // Error is already handled in the context
      console.error('Signup error in component:', error instanceof Error ? error.message : String(error));
      
      // Ensure the error is displayed to the user
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Registration failed. Please try again later.');
      }
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

      <form onSubmit={handleSubmit}>
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
            <div className="relative">
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="w-full bg-black/30 border-white/20 placeholder:text-gray-500 pl-10"
                disabled={isLoading}
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            {isSubmitted && !formData.username && (
              <p className="text-red-500 text-xs mt-1">Username is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200 block text-sm">Email</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-black/30 border-white/20 placeholder:text-gray-500 pl-10"
                disabled={isLoading}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            {isSubmitted && !formData.email && (
              <p className="text-red-500 text-xs mt-1">Email is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200 block text-sm">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={`w-full bg-black/30 border-white/20 placeholder:text-gray-500 pl-10 ${!passwordMatch ? 'border-red-500' : ''}`}
                disabled={isLoading}
              />
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            {isSubmitted && !formData.password && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-200 block text-sm">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full bg-black/30 border-white/20 placeholder:text-gray-500 pl-10 ${!passwordMatch ? 'border-red-500' : ''}`}
                disabled={isLoading}
              />
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            {!passwordMatch && (
              <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
            )}
            {isSubmitted && !formData.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">Please confirm your password</p>
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
      
      <div className="mt-4 border-t border-white/10 pt-4 text-xs text-center text-gray-500">
        <p>Using WordPress authentication</p>
      </div>
    </div>
  );
};

export default SignupForm;