import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, UserCircle, LogOut, Settings, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { getNotifications } from '@/services/notificationService';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import NotificationCenter from '@/components/layout/NotificationCenter';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/context/AuthContext';
import { useTheme } from "next-themes";

const Header = ({ pageTitle }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  
  const { user, logout } = useAuth();
  const { setTheme, resolvedTheme } = useTheme(); 

  const updateUnreadCount = () => {
    const unread = getNotifications().filter(n => !n.read).length;
    setUnreadCount(unread);
  };

  useEffect(() => {
    updateUnreadCount();
    window.addEventListener('notifications_updated', updateUnreadCount);
    return () => {
        window.removeEventListener('notifications_updated', updateUnreadCount);
    }
  }, []);

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-card text-card-foreground p-4 border-b border-border flex justify-between items-center shadow-sm"
    >
      <h1 className="text-xl font-semibold text-primary">{pageTitle || "Dashboard"}</h1>
      <div className="flex items-center space-x-4">
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <NotificationCenter />
            </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <UserCircle className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            
            {/* THIS IS THE SAFETY CHECK */}
            {user && user.name ? (
              <DropdownMenuLabel>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground font-normal">
                  {user.email}
                </p>
              </DropdownMenuLabel>
            ) : (
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </motion.header>
  );
};

export default Header;