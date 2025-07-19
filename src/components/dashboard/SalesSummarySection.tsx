
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Package, CheckCircle, Users } from 'lucide-react';
import { VisitorInsightsChart } from './charts/VisitorInsightsChart';

const salesData = [
  {
    title: "Total Sales",
    value: "$1k",
    change: "+5% from yesterday",
    icon: ShoppingBag,
    bgColor: "bg-pink-200",
    iconColor: "text-pink-700"
  },
  {
    title: "Total Order",
    value: "300",
    change: "+5% from yesterday",
    icon: Package,
    bgColor: "bg-orange-200",
    iconColor: "text-orange-700"
  },
  {
    title: "Product Sold",
    value: "5",
    change: "+12% from yesterday",
    icon: CheckCircle,
    bgColor: "bg-green-200",
    iconColor: "text-green-700"
  },
  {
    title: "New Customers",
    value: "8",
    change: "0.5% from yesterday",
    icon: Users,
    bgColor: "bg-purple-200",
    iconColor: "text-purple-700"
  }
];

export const SalesSummarySection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Visitor Insights */}
      <VisitorInsightsChart />

      {/* Today's Sales */}
      <Card className="bg-white border border-gray-200 rounded-xl h-full">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-zinc-900">Today's Sales</CardTitle>
            <button className="text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1 hover:bg-gray-50">
              Export
            </button>
          </div>
          <p className="text-sm text-gray-600">Sales Summary</p>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {salesData.map((item, index) => (
              <div key={index} className={`${item.bgColor} rounded-lg p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                    <item.icon className={`w-4 h-4 ${item.iconColor}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-zinc-900 mb-1">{item.value}</div>
                <div className="text-sm text-gray-600 mb-1">{item.title}</div>
                <div className="text-xs text-blue-600">{item.change}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
