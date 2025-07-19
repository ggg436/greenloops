import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const targetVsRealityData = [
  { month: 'Jan', reality: 6.2, target: 8.5 },
  { month: 'Feb', reality: 5.8, target: 7.2 },
  { month: 'Mar', reality: 4.9, target: 9.1 },
  { month: 'Apr', reality: 6.8, target: 7.3 },
  { month: 'May', reality: 8.2, target: 11.8 },
  { month: 'Jun', reality: 7.9, target: 12.5 },
  { month: 'Jul', reality: 8.8, target: 12.1 },
];

export const TargetVsRealityChart = () => {
  return (
    <Card className="bg-white border border-gray-200 rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">Target vs Reality</CardTitle>
          <select className="text-sm border border-gray-200 rounded-md px-3 py-1">
            <option>This Year</option>
            <option>Last Year</option>
            <option>Last 6 Months</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={targetVsRealityData} barCategoryGap={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
              tick={{ fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="reality" 
              fill="#10b981" 
              name="Reality Sales"
              radius={[2, 2, 0, 0]}
              barSize={15}
            />
            <Bar 
              dataKey="target" 
              fill="#fbbf24" 
              name="Target Sales"
              radius={[2, 2, 0, 0]}
              barSize={15}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Reality Sales</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900">8.823</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Target Sales</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900">12.122</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
