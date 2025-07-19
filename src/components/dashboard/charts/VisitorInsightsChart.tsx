
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const visitorData = [
  { month: 'Jan', loyalCustomers: 280, newCustomers: 250, uniqueCustomers: 320 },
  { month: 'Feb', loyalCustomers: 290, newCustomers: 220, uniqueCustomers: 340 },
  { month: 'Mar', loyalCustomers: 310, newCustomers: 200, uniqueCustomers: 350 },
  { month: 'Apr', loyalCustomers: 285, newCustomers: 180, uniqueCustomers: 330 },
  { month: 'May', loyalCustomers: 270, newCustomers: 160, uniqueCustomers: 310 },
  { month: 'Jun', loyalCustomers: 255, newCustomers: 170, uniqueCustomers: 290 },
  { month: 'Jul', loyalCustomers: 280, newCustomers: 380, uniqueCustomers: 320 },
  { month: 'Aug', loyalCustomers: 300, newCustomers: 350, uniqueCustomers: 310 },
  { month: 'Sep', loyalCustomers: 320, newCustomers: 330, uniqueCustomers: 290 },
  { month: 'Oct', loyalCustomers: 290, newCustomers: 310, uniqueCustomers: 270 },
  { month: 'Nov', loyalCustomers: 260, newCustomers: 280, uniqueCustomers: 250 },
  { month: 'Dec', loyalCustomers: 240, newCustomers: 260, uniqueCustomers: 230 },
];

export const VisitorInsightsChart = () => {
  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full">
      <CardHeader className="pb-3 px-4 pt-4">
        <CardTitle className="text-lg font-semibold text-zinc-900">Visitor Insights</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-4 flex-1 flex flex-col">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={visitorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              className="text-sm text-gray-600"
              domain={[0, 400]}
            />
            <Line
              type="monotone"
              dataKey="loyalCustomers"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="newCustomers"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="uniqueCustomers"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">Loyal Customers</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">New Customers</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">Unique Customers</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
