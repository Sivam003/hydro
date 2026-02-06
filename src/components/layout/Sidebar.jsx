import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, PlusSquare, Droplets, Bell, Settings, BookOpen } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/add-plant', icon: PlusSquare, label: 'Add Plant' },
  { to: '/fertilizer-log', icon: Droplets, label: 'Fertilizer Log' },
  { to: '/irrigation', icon: Droplets, label: 'Irrigation' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/guidelines', icon: BookOpen, label: 'Guidelines' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar = () => {
  const location = useLocation(); // Get current location

  return (
    <aside className="w-16 flex-shrink-0 flex flex-col items-center space-y-4 py-4 bg-card border-r border-border shadow-lg">
      
      {/* 1. Logo */}
      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-2xl">
        H
      </div>

      <nav className="flex-1 flex flex-col items-center space-y-2">
        {navItems.map((item) => {
          
          // 2. Fix for the 'isActive' bug
          const isActive = (item.to === '/') 
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to);

          return (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.to}
                  className={
                    `p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'text-primary' // Active: Use primary color
                        : 'text-muted-foreground hover:text-primary' // Inactive
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;