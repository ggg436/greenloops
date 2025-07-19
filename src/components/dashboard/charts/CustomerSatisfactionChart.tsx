import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const customerSatisfactionData = [
  { month: 'Jan', lastMonth: 65, thisMonth: 72 },
  { month: 'Feb', lastMonth: 70, thisMonth: 68 },
  { month: 'Mar', lastMonth: 58, thisMonth: 78 },
  { month: 'Apr', lastMonth: 62, thisMonth: 65 },
  { month: 'May', lastMonth: 68, thisMonth: 82 },
  { month: 'Jun', lastMonth: 64, thisMonth: 58 },
  { month: 'Jul', lastMonth: 72, thisMonth: 85 },
];

export const CustomerSatisfactionChart = () => {
  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm">
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">Customer Satisfaction</CardTitle>
          <select className="text-sm border border-gray-100 rounded-md px-3 py-1 bg-gray-50">
            <option>Last 7 Months</option>
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <div className="w-full" style={{ height: '280px' }}>
          <ResponsiveContainer width="99%" height="100%">
            <AreaChart 
              data={customerSatisfactionData}
              margin={{ top: 10, right: 10, bottom: 20, left: 0 }}
            >
              <defs>
                <linearGradient id="colorLastMonth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorThisMonth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                className="text-sm text-gray-600"
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                className="text-sm text-gray-600"
                domain={[0, 100]}
                width={30}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, '']}
              />
              <Area
                type="monotone"
                dataKey="lastMonth"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLastMonth)"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Area
                type="monotone"
                dataKey="thisMonth"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorThisMonth)"
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600 mr-1">Last Month</span>
            <span className="text-sm font-semibold text-zinc-900">$3,004</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600 mr-1">This Month</span>
            <span className="text-sm font-semibold text-zinc-900">$4,504</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
