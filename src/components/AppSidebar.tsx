
import React, { useState } from 'react';
import { 
  Home, 
  BarChart3, 
  Users,
  Wheat,
  ShoppingCart, 
  CreditCard, 
  FileText,
  Calendar,
  Bell,
  Settings, 
  HelpCircle, 
  Stethoscope, 
  Rss,
  DollarSign,
  CloudSun,
  Star,
  LogOut,
  Trophy,
  Package,
  MessageSquare,
  Box,
  ShoppingBag
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SidebarSlider } from '@/components/ui/sidebar-slider';

const navigationItems = [
  { 
    title: 'Dashboard', 
    url: '/dashboard', 
    icon: BarChart3
  },
  { 
    title: 'Feed', 
    url: '/dashboard/feed', 
    icon: Rss 
  },
  { 
    title: 'Dr. Plant', 
    url: '/dashboard/dr-plant', 
    icon: Stethoscope 
  },
  { 
    title: 'Marketplace', 
    url: '/dashboard/marketplace', 
    icon: ShoppingCart 
  },
  { 
    title: 'Orders', 
    url: '/dashboard/orders', 
    icon: ShoppingBag 
  },
  { 
    title: 'Transactions', 
    url: '/dashboard/transactions', 
    icon: CreditCard 
  },
  { 
    title: 'Weather Forecast', 
    url: '/dashboard/weather', 
    icon: CloudSun 
  },
  { 
    title: 'Pricing', 
    url: '/dashboard/pricing', 
    icon: DollarSign 
  },
  { 
    title: 'Settings', 
    url: '/dashboard/settings', 
    icon: Settings 
  },
  { 
    title: 'Help', 
    url: '/dashboard/help', 
    icon: HelpCircle 
  },
];

export const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (url: string) => {
    if (url === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(url);
  };

  return (
    <div className={`${isCollapsed ? 'w-[90px]' : 'w-[320px]'} h-screen bg-white border-r border-gray-100 flex flex-col relative transition-all duration-300`}>
      <SidebarSlider 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Brand Section */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Box className="w-6 h-6 text-white" />
          </div>
          <span className={`text-2xl font-semibold transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            {!isCollapsed && 'AgriDash'}
          </span>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'gap-4 px-5'} py-4 rounded-2xl cursor-pointer transition-colors ${
                isActive(item.url)
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              title={isCollapsed ? item.title : ''}
            >
              <item.icon className={`w-6 h-6 flex-shrink-0 ${isActive(item.url) ? 'text-white' : 'text-gray-400'}`} />
              <span className={`text-base font-medium transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                {!isCollapsed && item.title}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Pro Version Card */}
      <div className={`p-5 ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="bg-indigo-600 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-5 h-5 text-yellow-300" />
            <span className="text-lg font-semibold">AgriDash Pro</span>
          </div>
          <p className="text-base text-indigo-100 mb-4">
            Get access to all features and benefits
          </p>
          <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 rounded-2xl text-base py-3">
            Get Pro
          </Button>
        </div>
      </div>

      {/* Sign Out */}
      <div className="p-5 border-t">
        <div className={`flex items-center ${isCollapsed ? 'justify-center px-3' : 'gap-4 px-5'} py-4 text-gray-600 rounded-2xl cursor-pointer hover:bg-gray-50`}
             title={isCollapsed ? 'Sign Out' : ''}>
          <LogOut className="w-6 h-6 flex-shrink-0 text-gray-400" />
          <span className={`text-base font-medium transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            {!isCollapsed && 'Sign Out'}
          </span>
        </div>
      </div>
    </div>
  );
};
