import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, Settings, CreditCard } from 'lucide-react';

const UserMenu: React.FC = () => {
  const { user, logout, isLoading, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  const getInitials = () => {
    if (!user) return 'U';
    return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || user.username.charAt(0)}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <a href="/login">
          <Button variant="ghost" className="text-white">Sign In</Button>
        </a>
        <a href="/signup">
          <Button className="bg-primary hover:bg-primary/90 text-white">Sign Up</Button>
        </a>
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9 border border-primary/30">
            <AvatarImage src={user?.avatar} alt={user?.username} />
            <AvatarFallback className="bg-black/40 text-white text-sm">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-sm border border-white/10" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-white">{user?.firstName ? `${user.firstName} ${user.lastName}` : user?.username}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer" asChild>
            <a href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer" asChild>
            <a href="/profile/billing">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer" asChild>
            <a href="/profile/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem 
          className="text-red-400 hover:bg-red-500/10 cursor-pointer" 
          onClick={handleLogout}
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;