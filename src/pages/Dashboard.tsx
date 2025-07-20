
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
      <div className="pl-4 pr-2 pt-4 pb-2 w-full">
        {/* Sales Summary Section */}
        <SalesSummarySection />

        {/* Charts Section */}
        <ChartsSection />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2 w-full">
          <TransactionsSection />
          <RecentFarmersSection />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
