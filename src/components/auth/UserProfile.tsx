import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Cog, 
  User, 
  LogOut, 
  Star,
  CreditCard, 
  MessageSquare, 
  FileClock 
} from 'lucide-react';
import { updateUserProfile } from '@/utils/wordpressAuth';

const UserProfile: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      await updateUserProfile(user.id, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      }, user.token);
      
      setIsEditMode(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred while saving your profile');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/'; // Redirect to homepage after logout
  };

  const getInitials = () => {
    return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || user.username.charAt(0)}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-background border border-white/10 rounded-lg shadow-lg backdrop-blur-sm">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar */}
        <div className="md:w-64 flex flex-col items-center md:items-start">
          <Avatar className="h-24 w-24 border-2 border-primary/30">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="bg-black/40 text-white text-xl">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          
          <h2 className="text-xl font-bold mt-4 mb-1 text-white">
            {user.firstName ? `${user.firstName} ${user.lastName}` : user.username}
          </h2>
          <p className="text-gray-400 text-sm mb-6">{user.email}</p>
          
          <nav className="w-full space-y-1">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-primary/10">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-primary/10">
              <Star className="mr-2 h-4 w-4" />
              Membership
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-primary/10">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-primary/10">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-primary/10">
              <FileClock className="mr-2 h-4 w-4" />
              History
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-primary/10">
              <Cog className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={handleLogout}
              disabled={isLoading}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </nav>
        </div>
        
        {/* Main content area */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-medium text-white">Profile Information</h3>
            {!isEditMode ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditMode(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-white text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  First Name
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/20 rounded-md px-3 py-2 text-white"
                  />
                ) : (
                  <p className="text-white">{user.firstName || 'Not provided'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Last Name
                </label>
                {isEditMode ? (
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className="w-full bg-black/30 border border-white/20 rounded-md px-3 py-2 text-white"
                  />
                ) : (
                  <p className="text-white">{user.lastName || 'Not provided'}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email Address
              </label>
              {isEditMode ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full bg-black/30 border border-white/20 rounded-md px-3 py-2 text-white"
                />
              ) : (
                <p className="text-white">{user.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Username
              </label>
              <p className="text-white">{user.username}</p>
              <p className="text-xs text-gray-500 mt-1">Usernames cannot be changed</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Member Since
              </label>
              <p className="text-white">{new Date().toLocaleDateString()}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Membership Status
              </label>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;