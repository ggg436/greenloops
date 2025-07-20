
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import ChatBot from '@/components/ChatBot';
import { useSidebar } from '@/context/SidebarContext';

const DashboardLayout = () => {
  const location = useLocation();
  const isMarketplace = location.pathname.includes('/marketplace');
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      
      {/* Main content with left padding to accommodate fixed sidebar */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-[90px]' : 'ml-[320px]'}`}>
        {/* Only show the header when NOT on marketplace page */}
        {!isMarketplace && <DashboardHeader />}
        <main className={`flex-1 transition-all duration-300 ${isMarketplace ? 'mt-0' : ''} relative`}>
          <Outlet />
        </main>
      </div>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default DashboardLayout;
