
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, ChevronDown, Bell } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardHeader: React.FC = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path.includes('/settings')) return 'Settings';
    if (path.includes('/feed')) return 'Feed';
    if (path.includes('/dr-plant')) return 'Dr Plant';
    if (path.includes('/marketplace')) return 'Marketplace';
    if (path.includes('/transactions')) return 'Transactions';
    if (path.includes('/weather')) return 'Weather';
    if (path.includes('/pricing')) return 'Pricing';
    if (path.includes('/help')) return 'Help';
    return 'Dashboard';
  };

  return (
    <header className="w-full h-16 px-6 border-b flex items-center justify-between bg-white">
      {/* Left section */}
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
      </div>

      {/* Center section */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
          <Input 
            type="text"
            placeholder="Search here..."
            className="w-full pl-12 pr-4 py-3 text-sm bg-gray-50 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <span>Eng (US)</span>
          <ChevronDown size={12} />
        </Button>
        
        <Button variant="ghost" className="relative p-2">
          <Bell size={18} className="text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>MQ</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Musfiq</span>
            <ChevronDown size={12} className="text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
