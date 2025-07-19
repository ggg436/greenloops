import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const trafficSources = [
  { name: 'Direct', color: 'bg-blue-600', percentage: 80, value: '1,43,382' },
  { name: 'Referral', color: 'bg-blue-500', percentage: 60, value: '87,974' },
  { name: 'Social Media', color: 'bg-blue-400', percentage: 30, value: '45,211' },
  { name: 'Twitter', color: 'bg-blue-300', percentage: 15, value: '21,893' },
];

export const TrafficSourcesChart = () => {
  return (
    <Card className="bg-white border border-gray-200 rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">Traffic Sources</CardTitle>
          <select className="text-sm border border-gray-200 rounded-md px-3 py-1">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trafficSources.map((source, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 ${source.color} rounded mr-3`}></div>
                <span className="text-sm text-gray-700">{source.name}</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div className={`${source.color} h-2 rounded-full`} style={{ width: `${source.percentage}%` }}></div>
                </div>
                <span className="text-sm font-medium text-zinc-900">{source.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
