
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sprout } from 'lucide-react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ChartsSection } from '@/components/dashboard/ChartsSection';
import { TransactionsSection } from '@/components/dashboard/TransactionsSection';
import { RecentFarmersSection } from '@/components/dashboard/RecentFarmersSection';
import { SalesSummarySection } from '@/components/dashboard/SalesSummarySection';

const Dashboard = () => {
  return (
    <>
      <div className="p-6">
        {/* Sales Summary Section */}
        <SalesSummarySection />

        {/* Charts Section */}
        <ChartsSection />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TransactionsSection />
          <RecentFarmersSection />
        </div>

        {/* Stats Cards */}
        <StatsCards />
      </div>
    </>
  );
};

export default Dashboard;
