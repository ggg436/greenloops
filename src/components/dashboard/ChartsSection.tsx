
import React from 'react';
import { CropYieldChart } from './charts/CropYieldChart';
import { CropDistributionChart } from './charts/CropDistributionChart';
import { CustomerSatisfactionChart } from './charts/CustomerSatisfactionChart';
import { TotalRevenueChart } from './charts/TotalRevenueChart';
import { TargetVsRealityChart } from './charts/TargetVsRealityChart';
import { TrafficSourcesChart } from './charts/TrafficSourcesChart';
import { TopProductsChart } from './charts/TopProductsChart';

export const ChartsSection = () => {
  return (
    <div className="space-y-6 mb-8">
      {/* Single Row - Three charts in requested order */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TotalRevenueChart />
        <CustomerSatisfactionChart />
        <TargetVsRealityChart />
      </div>

      {/* Single Row Layout - Sales and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CropYieldChart />
        <CropDistributionChart />
      </div>

      {/* Fifth Row - Traffic Sources and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficSourcesChart />
        <TopProductsChart />
      </div>
    </div>
  );
};
