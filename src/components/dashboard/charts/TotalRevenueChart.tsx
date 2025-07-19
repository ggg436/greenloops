
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const revenueData = [
  { day: 'Monday', onlineSales: 15, offlineSales: 14 },
  { day: 'Tuesday', onlineSales: 18, offlineSales: 12 },
  { day: 'Wednesday', onlineSales: 6, offlineSales: 22 },
  { day: 'Thursday', onlineSales: 16, offlineSales: 7 },
  { day: 'Friday', onlineSales: 13, offlineSales: 12 },
  { day: 'Saturday', onlineSales: 17, offlineSales: 15 },
  { day: 'Sunday', onlineSales: 21, offlineSales: 11 },
];

export const TotalRevenueChart = () => {
  return (
    <Card className="bg-white border border-gray-200 rounded-xl">
      <CardHeader className="pb-1 px-3 pt-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">Total Revenue</CardTitle>
          <select className="text-sm border border-gray-200 rounded-md px-3 py-1">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart 
            data={revenueData} 
            barCategoryGap={20}
            margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
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
              tickFormatter={(value) => `${value}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value) => [`${value}k`, '']}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '10px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="onlineSales" 
              fill="#3b82f6" 
              name="Online Sales"
              radius={[2, 2, 0, 0]}
              barSize={15}
            />
            <Bar 
              dataKey="offlineSales" 
              fill="#10b981" 
              name="Offline Sales"
              radius={[2, 2, 0, 0]}
              barSize={15}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
