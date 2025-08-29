
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import ChatBot from '@/components/ChatBot';
import { useSidebar } from '@/context/SidebarContext';

const DashboardLayout = () => {
  const location = useLocation();
  const isMarketplace = location.pathname.includes('/marketplace');
  const isWeather = location.pathname.includes('/weather');
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="min-h-screen flex w-full bg-gray-50 overflow-x-hidden">
      <AppSidebar />
      
      {/* Main content with responsive left margin for YouTube-style sidebar */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-out ${
          isCollapsed 
            ? 'ml-0 lg:ml-[80px]' 
            : 'ml-0 lg:ml-[280px]'
        }`}
      >
        {/* Only show the header when NOT on marketplace page */}
        {!isMarketplace && <DashboardHeader />}
        <main className={`flex-1 ${isMarketplace ? 'mt-0' : ''} relative ${
          isWeather 
            ? 'scale-75 origin-top-left w-[130%]' 
            : 'scale-90 origin-top-left w-[110%]'
        }`}>
          <Outlet />
        </main>
      </div>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default DashboardLayout;
