
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import ChatBot from '@/components/ChatBot';

const DashboardLayout = () => {
  const location = useLocation();
  const isMarketplace = location.pathname.includes('/marketplace');
  
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Only show the header when NOT on marketplace page */}
        {!isMarketplace && <DashboardHeader />}
        <main className={`flex-1 transition-all duration-300 ${isMarketplace ? 'mt-0' : ''}`}>
          <Outlet />
        </main>
      </div>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default DashboardLayout;
