
import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const statsData = [
  {
    title: "TODAY'S YIELD",
    value: "12,426",
    change: "+36%",
    isPositive: true
  },
  {
    title: "TOTAL REVENUE",
    value: "$2,38,485",
    change: "-14%",
    isPositive: false
  },
  {
    title: "TOTAL ORDERS",
    value: "84,382",
    change: "+36%",
    isPositive: true
  },
  {
    title: "TOTAL FARMERS",
    value: "33,493",
    change: "+36%",
    isPositive: true
  }
];

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <Card key={index} className="bg-white border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
              <span className={`text-xs font-medium flex items-center ${
                stat.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`w-3 h-3 mr-1 ${!stat.isPositive ? 'rotate-180' : ''}`} />
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-zinc-900">{stat.value}</div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
