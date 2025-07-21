
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
    <div className="space-y-6 mb-6 w-full">
      {/* Single Row - Three charts in requested order */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="h-[340px] w-full bg-white rounded-lg shadow-sm border border-gray-100">
          <TotalRevenueChart />
        </div>
        <div className="h-[340px] w-full bg-white rounded-lg shadow-sm border border-gray-100">
          <CustomerSatisfactionChart />
        </div>
        <div className="h-[340px] w-full bg-white rounded-lg shadow-sm border border-gray-100">
          <TargetVsRealityChart />
        </div>
      </div>

      {/* Second Row - Crop Yield and Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div className="h-[420px] w-full bg-white rounded-lg shadow-sm border border-gray-100">
          <CropYieldChart />
        </div>
        <div className="h-[420px] w-full bg-white rounded-lg shadow-sm border border-gray-100">
          <CropDistributionChart />
        </div>
      </div>

      {/* Third Row - Traffic Sources and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div className="h-[450px] w-full bg-white rounded-lg shadow-sm border border-gray-100">
          <TrafficSourcesChart />
        </div>
        <div className="h-[450px] w-full bg-white rounded-lg shadow-sm border border-gray-100">
          <TopProductsChart />
        </div>
      </div>
    </div>
  );
};
