
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import ChatBot from '@/components/ChatBot';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col transition-all duration-300">
        <DashboardHeader />
        <main className="flex-1 transition-all duration-300">
          <Outlet />
        </main>
      </div>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default DashboardLayout;
