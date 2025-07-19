import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const cropDistribution = [
  { name: 'Wheat', value: 35, color: '#8884d8' },
  { name: 'Corn', value: 28, color: '#82ca9d' },
  { name: 'Rice', value: 20, color: '#ffc658' },
  { name: 'Barley', value: 12, color: '#ff7300' },
  { name: 'Others', value: 5, color: '#8dd1e1' },
];

export const CropDistributionChart = () => {
  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm">
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">Crop Distribution</CardTitle>
          <select className="text-sm border border-gray-100 rounded-md px-3 py-1 bg-gray-50">
            <option>Current Season</option>
            <option>Last Season</option>
            <option>Yearly Average</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-4">
        <div className="w-full" style={{ height: '260px' }}>
          <ResponsiveContainer width="99%" height="100%">
            <PieChart>
              <Pie
                data={cropDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {cropDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, 'Distribution']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 space-y-1 px-2">
          {cropDistribution.map((crop, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded mr-3" 
                  style={{ backgroundColor: crop.color }}
                ></div>
                <span className="text-sm text-gray-700">{crop.name}</span>
              </div>
              <span className="text-sm font-medium text-zinc-900">{crop.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
